'use strict';
/* Kan Gazı Atlası · hesap ve kural motoru
   Deterministik, arayüzden bağımsız. Metin üretmez: her modül bir durum, sayılar, ileti kodları ve kaynak kimlikleri döndürür;
   Türkçe cümleler locales/tr.js içindeki şablonlardan kurulur. Formüller ve koşullar content-src/paket/02_degerlendirme_kurallari
   (FORMULLER.md, ALGORITMA.md, KENAR_DURUMLAR.md) ile birebir tutulur. Kaynak numaraları bu projeye özeldir.
   Durumlar: hesaplandi · veri_eksik · uygulanamaz · gozden_gecirilmeli. Eksik değer hiçbir zaman sıfırla ya da "normal" değerle doldurulmaz. */
(function (root) {
  const VERSION = 'kg-kural-1.8.1';     // 1.1: pediatri, gebelik · 1.2: F01–F10 · 1.3: R01–R03 · 1.4: numune (5. tur) · 1.5: seri (6. tur) · 1.6: 1.5 kontrolü (F01–F07) ve KOAH/hiperkapni (7. tur) · 1.7: 1.6 kontrolü (V01–V05) · 1.8: böbrek/diyaliz, toksikoloji, karma bozukluk (8–10. tur)
  const KPA = 0.1333224;                       // mmHg = kPa / 0.1333224 [20]
  const PH_REF = [7.35, 7.45];                 // erişkin arteriyel eğitim referansı [2]
  const BASE = {hco3: 24, pco2: 40};           // kompansasyon formüllerinin başlangıç noktaları [2][3]
  const ARTERIAL = 'arterial', VENOUS = ['peripheral_venous', 'central_venous', 'mixed_venous'];
  const SAT_OK = ['coox_functional', 'coox_fractional', 'calculated'];

  /* ---------- Formüller (FORMULLER.md) ---------- */
  const F = {
    'hh-ph': (hco3, pco2) => 6.1 + Math.log10(hco3 / (0.03 * pco2)),
    'winter': hco3 => { const c = 1.5 * hco3 + 8; return {center: c, lo: c - 2, hi: c + 2}; },
    'met-alk': hco3 => { const c = 0.7 * hco3 + 20; return {center: c, lo: c - 5, hi: c + 5}; },
    'resp-ac-acute': pco2 => 24 + 0.1 * (pco2 - 40),
    'resp-ac-chronic': pco2 => 24 + 0.35 * (pco2 - 40),
    'resp-alk-acute': pco2 => 24 - 0.2 * (40 - pco2),
    'resp-alk-chronic': pco2 => 24 - 0.41 * (40 - pco2),
    'anion-gap': (na, cl, tco2) => na - cl - tco2,
    'ag-albumin': (ag, albRef, alb) => ag + 2.5 * (albRef - alb),
    'delta-gap': (agc, agRef, hco3Ref, tco2) => (agc - agRef) - (hco3Ref - tco2),
    'delta-ratio': (agc, agRef, hco3Ref, tco2) => (agc - agRef) / (hco3Ref - tco2),
    'pf': (pao2, fio2) => pao2 / fio2,
    'aa-roomair': (baro, paco2, pao2) => 0.21 * (baro - 47) - paco2 / 0.8 - pao2,
    'cao2': (hb, sao2, pao2) => 1.34 * hb * sao2 + 0.0031 * pao2,
    'pressure-conversion': kpa => kpa / KPA,
    'lactate-change': (a, b) => 100 * (a - b) / a,
    /* İkinci tur (pediatri ve yenidoğan) — formul_eki.json */
    'P-F01': (fio2, paw, pao2) => 100 * fio2 * paw / pao2,                  // OI
    'P-F02': (fio2, paw, spo2) => 100 * fio2 * paw / spo2,                  // OSI (SpO2 yüzde)
    'P-F03': (w, d, pnd) => 7 * w + d + pnd,                               // postmenstrüel yaş, gün
    'P-F04': (phA, phV, pA, pV) => ({dph: r4(phV - phA), dpco2: r4(pA - pV)})  // kordon çift farkı (kPa)
  };
  /* Eşik karşılaştırmalarında kayan nokta hatasını önlemek için (7,22 − 7,20 = 0,0199…) */
  function r4(v) { return Math.round(v * 1e4) / 1e4; }
  const FSRC = {
    'hh-ph': [2, 4], 'winter': [3], 'met-alk': [2], 'resp-ac-acute': [3], 'resp-ac-chronic': [3], 'resp-alk-acute': [2], 'resp-alk-chronic': [2],
    'anion-gap': [3, 8], 'ag-albumin': [7, 19], 'delta-gap': [4, 8], 'delta-ratio': [8], 'pf': [11], 'aa-roomair': [12], 'cao2': [12, 13, 14],
    'pressure-conversion': [20], 'lactate-change': [10], 'P-F01': [22, 33], 'P-F02': [22], 'P-F03': [], 'P-F04': [25]
  };
  /* 8–10. tur formülleri (paket ESIKLER_VE_FORMULLER.md "Formül kimlikleri"). Kimlikler paketteki önerilerdir; ilk turun 16 + 4 formülünden ayrı tutulur.
     ag_without_k = mevcut 'anion-gap', ag_albumin_corrected = mevcut 'ag-albumin' (yeniden tanımlanmaz). Hiçbiri sessizce birbirinin yerine kullanılmaz. */
  const F2 = {
    'ag_with_k': (na, k, cl, bic) => na + k - cl - bic,                                   // EXTRIP etilen glikol tanımı [117]
    'uag': (una, uk, ucl) => una + uk - ucl,                                             // aynı idrar örneği; amonyum miktarı değil [110][111]
    'serum_osm_calculated': (na, gluMmol, ureaMmol) => 2 * na + gluMmol + ureaMmol,      // glukoz mg/dL ÷ 18, BUN mg/dL ÷ 2,8 ya da SI mmol/L [119]–[121]
    'ethanol_ideal_term': e => e / 4.6,                                                  // etanol mg/dL ÷ 4,6 (ideal molar katkı) [120][121]
    'ethanol_purssell_term': e => e === 0 ? 0 : e / 3.7 - 0.35,                          // Purssell regresyonu; ölçülmüş 0 etanolde katkı 0 (−0,35 negatif katkı yapılmaz) [120]
    'serum_og_ideal_ethanol': (meas, calc, e) => meas - (calc + F2.ethanol_ideal_term(e)),
    'serum_og_purssell_regression': (meas, calc, e) => meas - (calc + F2.ethanol_purssell_term(e)),
    'systemic_total_ica_ratio': (tca, ica) => tca / ica,                                 // iki sistemik, eşzamanlı, mmol/L ölçüm [108][109]
    'salicylate_mg_l_to_mg_dl': v => v / 10,                                              // 1000 mg/L = 100 mg/dL [114]
    'lactate_method_gap': (a, b) => a - b                                                 // aynı örnek, iki yöntem; evrensel eşik yok [122]
  };
  const FSRC2 = {ag_with_k: [117], uag: [110, 111], serum_osm_calculated: [119, 120, 121], serum_og_ideal_ethanol: [120, 121], serum_og_purssell_regression: [120, 121],
    systemic_total_ica_ratio: [108, 109], salicylate_mg_l_to_mg_dl: [114], lactate_method_gap: [122]};
  /* Koşullu eşik profilleri (esik_profilleri.json); veri türleri ayrı tutulur */
  const DELIVERY_SPO2 = {2: [65, 70], 3: [70, 75], 4: [75, 80], 5: [80, 85], 10: [85, 95]};  // P-E10, tedavi hedefi, interpolasyon yok [40]
  const ISPAD = {ph: [[7.1, 'severe'], [7.2, 'moderate'], [7.3, 'mild']], hco3: [[5, 'severe'], [10, 'moderate'], [18, 'mild']]};  // P-E06 [23]
  const SEV_RANK = {mild: 1, moderate: 2, severe: 3};

  /* ---------- Sayı okuma (Türkçe ondalık virgül) ---------- */
  function parseNum(raw) {
    if (raw == null) return {v: null};
    if (typeof raw === 'number') return Number.isFinite(raw) ? {v: raw, dec: decimals(String(raw))} : {err: 'not_number'};
    const s = String(raw).trim().replace(/\s+/g, '');
    if (s === '') return {v: null};
    if (s.includes(',') && s.includes('.')) return {err: 'ambiguous_decimal'};
    const t = s.replace(',', '.');
    if (!/^[-+]?(\d+\.?\d*|\.\d+)$/.test(t)) return {err: 'not_number'};
    return {v: parseFloat(t), dec: decimals(t)};
  }
  function decimals(t) { const i = t.indexOf('.'); return i < 0 ? 0 : t.length - i - 1; }

  /* ---------- Normalleştirme (GIRDI_SOZLUGU.md · Birim işleme) ---------- */
  const NUM = ['ph', 'pco2', 'hco3_actual', 'hco3_standard', 'tco2', 'pao2', 'fio2', 'na', 'cl', 'k', 'albumin', 'ag_reference', 'ag_ref_low', 'ag_ref_high',
    'albumin_reference', 'hco3_reference', 'glucose', 'beta_hydroxybutyrate', 'hb', 'saturation', 'cohb', 'methb', 'be', 'barometric_mmhg', 'hh_tolerance',
    'paw', 'spo2', 'ga_weeks', 'ga_days', 'postnatal_days', 'postnatal_minutes', 'pards_hours', 'ref_ph_low', 'ref_ph_high', 'ref_pco2_low', 'ref_pco2_high',
    'cord_ph_art', 'cord_ph_ven', 'cord_pco2_art', 'cord_pco2_ven',
    'altitude_m', 'sbp', 'postpartum_hours', 'o2_target_low', 'o2_target_high', 'protocol_minutes', 'prior_pco2', 'prior_hco3',
    /* 8–10. tur: idrar, kalsiyum, osmolalite, madde düzeyi, iki yöntemli laktat */
    'urine_na', 'urine_k', 'urine_cl', 'urine_ph', 'total_ca', 'ionized_ca', 'measured_osmolality', 'bun', 'urea', 'ethanol', 'salicylate_value', 'lactate_method_a', 'lactate_method_b'];
  const CAN_NEG = ['be'];
  function normalize(raw) {
    const n = {}, num = {}, err = [], dec = {};
    for (const k of NUM) {
      const p = parseNum(raw[k]);
      if (p.err) { err.push({field: k, code: p.err}); n[k] = null; continue; }
      num[k] = p.v; dec[k] = p.dec; n[k] = p.v;
      if (p.v != null && p.v < 0 && !CAN_NEG.includes(k)) { err.push({field: k, code: 'negative'}); n[k] = null; }
    }
    const unit = (k, def) => raw[k + '_unit'] || def;
    /* Basınçlar: birim kullanıcı seçimi; büyüklükten tahmin edilmez */
    for (const k of ['pco2', 'pao2']) if (n[k] != null && unit(k, 'mmHg') === 'kPa') n[k] = F['pressure-conversion'](n[k]);
    if (n.pco2 === 0) { err.push({field: 'pco2', code: 'pco2_zero'}); n.pco2 = null; }
    if (n.pao2 === 0) { err.push({field: 'pao2', code: 'pao2_zero'}); n.pao2 = null; }
    if (n.hco3_actual === 0) { err.push({field: 'hco3_actual', code: 'hco3_zero'}); n.hco3_actual = null; }   // log10(0) tanımsız: HH hesaplanmaz [R02]     // payda: OI ve P/F sonlu olmalı [F01]
    if (n.paw === 0) { err.push({field: 'paw', code: 'paw_zero'}); n.paw = null; }
    /* [8–10. tur] Sıfır iCa oran paydası olamaz; sıfır total Ca ve ölçülen osmolalite fizyolojik ölçüm değildir: sonuç null, Infinity üretilmez [E03] */
    if (n.ionized_ca === 0) { err.push({field: 'ionized_ca', code: 'ica_zero'}); n.ionized_ca = null; }
    for (const k of ['total_ca', 'measured_osmolality']) if (n[k] === 0) { err.push({field: k, code: 'zero_invalid'}); n[k] = null; }
    /* FiO2: kesir alanına 40 girildiyse değiştirme, düzeltme iste [fio2-format] */
    if (n.fio2 != null) {
      const u = unit('fio2', 'fraction');
      if (u === 'percent') { if (n.fio2 > 100) { err.push({field: 'fio2', code: 'fio2_percent_gt100'}); n.fio2 = null; } else n.fio2 = n.fio2 / 100; }
      else if (n.fio2 > 1) { err.push({field: 'fio2', code: 'fio2_fraction_gt1'}); n.fio2 = null; }
      if (n.fio2 === 0) { err.push({field: 'fio2', code: 'fio2_zero'}); n.fio2 = null; }
    }
    for (const k of ['albumin', 'hb']) if (n[k] != null && unit(k, 'g/dL') === 'g/L') n[k] = n[k] / 10;
    if (n.saturation != null) {
      const u = unit('saturation', 'percent');
      if (u === 'percent') { if (n.saturation > 100) { err.push({field: 'saturation', code: 'sat_percent_gt100'}); n.saturation = null; } else n.saturation /= 100; }
      else if (n.saturation > 1) { err.push({field: 'saturation', code: 'sat_fraction_gt1'}); n.saturation = null; }
    }
    n.glucose_unit = unit('glucose', 'mg/dL');
    n.glucose_unit_given = ['mg/dL', 'mmol/L'].includes(raw.glucose_unit);      // OG yalnız açıkça seçilmiş glukoz birimiyle [8–10. tur]
    /* Kalsiyum: yalnız açıkça seçilmiş birim; dönüşüm yapılmaz. Salisilat: mg/dL ya da mg/L (mmol/L dönüşümü kaynaklandırılmadı) */
    n.total_ca_unit = ['mmol/L', 'mg/dL'].includes(raw.total_ca_unit) ? raw.total_ca_unit : 'unknown';
    n.ionized_ca_unit = ['mmol/L', 'mg/dL'].includes(raw.ionized_ca_unit) ? raw.ionized_ca_unit : 'unknown';
    n.salicylate_unit = ['mg/dL', 'mg/L'].includes(raw.salicylate_unit) ? raw.salicylate_unit : 'unknown';
    /* SpO2 yalnız yüzde: 0,95 yazıldıysa birim doğrulanmalı [P-R23] */
    if (n.spo2 != null) { if (n.spo2 <= 1) { err.push({field: 'spo2', code: 'spo2_fraction_like'}); n.spo2 = null; } else if (n.spo2 > 100) { err.push({field: 'spo2', code: 'sat_percent_gt100'}); n.spo2 = null; } }
    /* Gestasyon: hafta ve gün ayrı tam sayılar; 30,4 gibi ondalık hafta kabul edilmez */
    if (n.ga_weeks != null && !Number.isInteger(n.ga_weeks)) { err.push({field: 'ga_weeks', code: 'ga_decimal'}); n.ga_weeks = null; }
    if (n.ga_days != null && (!Number.isInteger(n.ga_days) || n.ga_days > 6)) { err.push({field: 'ga_days', code: 'ga_days_range'}); n.ga_days = null; }
    if (n.postnatal_days != null && !Number.isInteger(n.postnatal_days)) { err.push({field: 'postnatal_days', code: 'not_integer'}); n.postnatal_days = null; }
    /* Kordon PCO2 kuralı kPa ile tanımlı [25]; mmHg girildiyse kPa'ya çevrilir */
    n.cord_pco2_unit = unit('cord_pco2', 'kPa');
    for (const k of ['cord_pco2_art', 'cord_pco2_ven']) if (n[k] != null && n.cord_pco2_unit === 'mmHg') n[k] = n[k] * KPA;
    n.fio2_unit_given = !!raw.fio2_unit;
    /* Aralıklar: alt ≤ üst; yüzde hedefleri 0–100 (veri temsili denetimi, klinik normal değil) [F09] */
    for (const [lo, hi, pct] of [['ag_ref_low', 'ag_ref_high'], ['ref_ph_low', 'ref_ph_high'], ['ref_pco2_low', 'ref_pco2_high'], ['o2_target_low', 'o2_target_high', true]]) {
      if (pct) for (const k of [lo, hi]) if (n[k] != null && n[k] > 100) { err.push({field: k, code: 'sat_percent_gt100'}); n[k] = null; }
      if (n[lo] != null && n[hi] != null && n[lo] > n[hi]) { err.push({field: lo, code: 'range_reversed'}); err.push({field: hi, code: 'range_reversed'}); n[lo] = n[hi] = null; }
    }
    /* Zamanlar: analiz örnekten önce olamaz */
    const ts = v => { if (!v) return null; const t = Date.parse(v); return Number.isNaN(t) ? null : t; };
    n.t_birth = ts(raw.birth_time); n.t_sample = ts(raw.sample_time); n.t_analysis = ts(raw.analysis_time);
    n.t_support = ts(raw.support_change_time); n.t_clamp = ts(raw.cord_clamp_time);
    if (n.t_sample != null && n.t_analysis != null && n.t_analysis < n.t_sample) err.push({field: 'analysis_time', code: 'analysis_before_sample'});
    if (n.t_birth != null && n.t_sample != null && n.t_sample < n.t_birth) err.push({field: 'birth_time', code: 'sample_before_birth'});
    /* Laktat serisi: [{time, value}] veya tek değer */
    const lac = (Array.isArray(raw.lactate_series) ? raw.lactate_series : raw.lactate != null && raw.lactate !== '' ? [{value: raw.lactate, time: raw.sample_time}] : [])
      .map((e, i) => { const p = parseNum(e.value); if (p.err) err.push({field: 'lactate', code: p.err, index: i}); else if (p.v != null && p.v < 0) err.push({field: 'lactate', code: 'negative', index: i}); return {time: e.time || null, v: p.err || (p.v != null && p.v < 0) ? null : p.v}; })
      .filter(e => e.v != null);
    /* Zaman sırası [F07]: bütün değerlerin aynı biçimde zamanı varsa kronolojik sıralanır; eksik ya da karışık zamanda giriş sırası kullanılır ve öyle etiketlenir */
    const tkey = t => !t ? null : /^\d{2}:\d{2}$/.test(t) ? 'hm:' + t : Number.isNaN(Date.parse(t)) ? null : 'dt:' + new Date(Date.parse(t)).toISOString();
    const keys = lac.map(e => tkey(e.time)), kinds = new Set(keys.map(k => k && k.slice(0, 2)));
    n.lac_order = lac.length < 2 ? 'single' : keys.some(k => !k) || kinds.size > 1 ? 'entry' : new Set(keys).size < keys.length ? 'tie' : 'time';
    if (n.lac_order === 'time') { const sorted = lac.map((e, i) => ({e, k: keys[i]})).sort((a, b) => a.k < b.k ? -1 : 1).map(x => x.e); n.lac_resorted = sorted.some((e, i) => e !== lac[i]); lac.splice(0, lac.length, ...sorted); }
    n.lactates = lac;
    const pick = (k, opts, def = 'unknown') => opts.includes(raw[k]) ? raw[k] : def;
    Object.assign(n, {
      sample_type: raw.sample_type === 'cord' ? 'cord_unknown' : pick('sample_type', [ARTERIAL, ...VENOUS, 'capillary', 'cord_artery', 'cord_vein', 'cord_unknown', 'circuit', 'unknown']),
      age_group: pick('age_group', ['adult', 'pediatric', 'neonatal'], null),
      /* Üçüncü tur: maternal bağlam (gebe / eylem / doğum sonrası / emzirme); eski "gebelik var/yok" girişi eşlenir */
      maternal_context: pick('maternal_context', ['pregnant', 'labor', 'postpartum', 'breastfeeding', 'not_pregnant', 'unknown'], {yes: 'pregnant', no: 'not_pregnant'}[raw.pregnancy] || 'unknown'),
      sample_owner: pick('sample_owner', ['mother', 'fetus', 'cord', 'unknown']),
      labor_stage: pick('labor_stage', ['none', '1', '2', '3', 'unknown']), pushing: pick('pushing', ['yes', 'no', 'unknown']),
      position: pick('position', ['sitting', 'supine', 'left_lateral', 'other', 'unknown']),
      o2_profile: pick('o2_profile', ['institution', 'bts', 'expert', 'none'], 'none'), hypercapnia_risk: pick('hypercapnia_risk', ['yes', 'no', 'unknown']),
      diabetes_type: pick('diabetes_type', ['t1', 't2', 'gestational', 'none', 'unknown']), pump_issue: pick('pump_issue', ['yes', 'no', 'unknown']),
      poor_intake: pick('poor_intake', ['yes', 'no', 'unknown']), vomiting: pick('vomiting', ['yes', 'no', 'unknown']), steroid: pick('steroid', ['yes', 'no', 'unknown']),
      feels_unwell: pick('feels_unwell', ['yes', 'no', 'unknown']), infection: pick('infection', ['yes', 'no', 'unknown']), organ_dysfunction: pick('organ_dysfunction', ['yes', 'no', 'unknown']),
      sepsis_high_risk: pick('sepsis_high_risk', ['yes', 'no', 'unknown']), fetal_assessment: pick('fetal_assessment', ['not_done', 'reassuring', 'concern', 'unknown']),
      maternal_hypoxia: pick('maternal_hypoxia', ['yes', 'no', 'unknown']), bleeding: pick('bleeding', ['yes', 'no', 'unknown']), resp_symptoms: pick('resp_symptoms', ['yes', 'no', 'unknown']),
      pe_suspected: pick('pe_suspected', ['yes', 'no', 'unknown']),
      /* 5. tur: numune ve ölçüm kalitesi (üç durum; bilinmiyor hiçbir zaman "uygun" sayılmaz) */
      q_bubble: pick('q_bubble', ['yes', 'no', 'unknown']), q_heparin: pick('q_heparin', ['dry_balanced', 'liquid', 'unknown']), q_clot: pick('q_clot', ['yes', 'no', 'unknown']),
      q_hemolysis: pick('q_hemolysis', ['positive', 'negative', 'not_measured', 'device_unknown', 'unknown']),
      q_catheter: pick('q_catheter', ['yes', 'no', 'unknown']), q_flush: pick('q_flush', ['saline', 'glucose', 'other', 'unknown']),
      q_transport: pick('q_transport', ['hand', 'pneumatic_validated', 'pneumatic_unvalidated', 'pneumatic_unknown', 'unknown']), q_storage: pick('q_storage', ['room', 'ice', 'unknown']),
      q_device_error: pick('q_device_error', ['yes', 'no', 'unknown']), q_manual: pick('q_manual', ['yes', 'no', 'unknown']),
      q_hydroxocobalamin: pick('q_hydroxocobalamin', ['yes', 'no', 'unknown']), q_leukocytosis: pick('q_leukocytosis', ['yes', 'no', 'unknown']),
      temperature_reporting: pick('temperature_reporting', ['37C_uncorrected', 'temperature_corrected', 'mixed', 'unknown']),
      fio2_quality: pick('fio2_quality', ['known', 'estimated', 'unknown']),
      o2_support: pick('o2_support', ['room_air', 'supplemental', 'unknown']),
      copd_confirmed: pick('copd_confirmed', ['yes', 'no', 'unknown']), hc_phase: pick('hc_phase', ['exacerbation', 'stable', 'unknown']),
      prior_arterial: pick('prior_arterial', ['yes', 'no', 'unknown']), prior_stable: pick('prior_stable', ['yes', 'no', 'unknown']),
      hc_renal: pick('hc_renal', ['yes', 'no', 'unknown']), hc_diuretic: pick('hc_diuretic', ['yes', 'no', 'unknown']), hc_alkali_vomit: pick('hc_alkali_vomit', ['yes', 'no', 'unknown']), hc_chronic_confirmed: pick('hc_chronic_confirmed', ['yes', 'no', 'unknown']),
      normothermia: pick('normothermia', ['yes', 'no', 'unknown']),
      /* 8–10. tur: klinik olarak doğrulanmış bağlam girdileri (gazdan doldurulmaz; varsayılan bilinmiyor) */
      renal_context: pick('renal_context', ['AKI', 'CKD', 'AKI_on_CKD', 'unspecified', 'none', 'unknown']), krt_modality: pick('krt_modality', ['IHD', 'CKRT', 'prolonged', 'PD', 'none', 'unknown']),
      urine_same_sample: pick('urine_same_sample', ['yes', 'no', 'unknown']), diuretic_recent: pick('diuretic_recent', ['yes', 'no', 'unknown']), alkali_given: pick('alkali_given', ['yes', 'no', 'unknown']),
      urine_infection: pick('urine_infection', ['yes', 'no', 'unknown']), k_drug_context: pick('k_drug_context', ['yes', 'no', 'unknown']),
      rca_confirmed: pick('rca_confirmed', ['yes', 'no', 'unknown']), calcium_need_trend: pick('calcium_need_trend', ['rising', 'not_rising', 'unknown']),
      total_ca_site: pick('total_ca_site', ['systemic', 'postfilter', 'unknown']), ionized_ca_site: pick('ionized_ca_site', ['systemic', 'postfilter', 'unknown']), ca_concurrent: pick('ca_concurrent', ['yes', 'no', 'unknown']),
      tox_suspicion: pick('tox_suspicion', ['yes', 'no', 'unknown']),
      tox_agent: pick('tox_agent', ['methanol', 'ethylene_glycol', 'toxic_alcohol', 'salicylate', 'metformin', 'isopropanol', 'co', 'smoke', 'propylene_glycol', 'other', 'unknown']),
      tox_acute_chronic: pick('tox_acute_chronic', ['acute', 'chronic', 'acute_on_chronic', 'unknown']), tox_antidote: pick('tox_antidote', ['none', 'fomepizole', 'ethanol', 'other', 'unknown']),
      clinical_worsening: pick('clinical_worsening', ['yes', 'no', 'unknown']), organic_acid_context: pick('organic_acid_context', ['none', 'short_bowel', 'oxoproline', 'propylene_glycol', 'unknown']),
      acetone: pick('acetone', ['positive', 'negative', 'not_measured', 'unknown']), osm_concurrent: pick('osm_concurrent', ['yes', 'no', 'unknown']), og_profile: pick('og_profile', ['ideal_4_6', 'purssell', 'none'], 'none'),
      lactate_methods_concurrent: pick('lactate_methods_concurrent', ['yes', 'no', 'unknown']),
      saturation_type: pick('saturation_type', [...SAT_OK, 'spo2', 'unknown']),
      dyshb: pick('dyshb', ['yes', 'no', 'unknown']),
      be_type: {actual: 'BE_blood', standard: 'BE_ECF'}[raw.be_type] || pick('be_type', ['BE_blood', 'BE_ECF', 'BD_blood', 'BD_ECF', 'unknown']),
      urine_ketones: pick('urine_ketones', ['negative', 'trace', '1+', '2+', '3+', '4+', 'small', 'moderate', 'large', 'unknown']),
      care_context: pick('care_context', ['delivery', 'nicu', 'picu', 'other', 'unknown']),
      sample_site: pick('sample_site', ['right_radial', 'umbilical_artery', 'other', 'unknown']),
      perfusion: pick('perfusion', ['good', 'poor', 'unknown']),
      vent_type: pick('vent_type', ['invasive', 'noninvasive', 'other', 'unknown']),
      spo2_site: pick('spo2_site', ['right_hand', 'right_wrist', 'foot', 'other', 'unknown']),
      signal: pick('signal', ['good', 'poor', 'unknown']),
      stable: pick('stable', ['yes', 'no', 'unknown']),
      support_concurrent: pick('support_concurrent', ['yes', 'no', 'unknown']),
      pards_confirmed: pick('pards_confirmed', ['yes', 'no', 'unknown']),
      nards_confirmed: pick('nards_confirmed', ['yes', 'no', 'unknown']),
      cyanotic_chd: pick('cyanotic_chd', ['yes', 'no', 'unknown']),
      baseline_imv: pick('baseline_imv', ['yes', 'no', 'unknown']),
      perinatal_event: pick('perinatal_event', ['yes', 'no', 'unknown']),
      neuro: pick('neuro', ['yes', 'no', 'unknown']),
      dka_confirmed: pick('dka_confirmed', ['yes', 'no', 'unknown']), rds_confirmed: pick('rds_confirmed', ['yes', 'no', 'unknown']),
      local_ref_source: raw.local_ref_source || null,
      diabetes_history: pick('diabetes_history', ['yes', 'no', 'unknown']),
      chem_same: pick('chem_same', ['yes', 'no', 'unknown']),
      sample_time: raw.sample_time || null, analysis_time: raw.analysis_time || null, chem_time: raw.chem_time || null,
      gas_hco3_for_ag: !!raw.gas_hco3_for_ag, baro_sealevel: !!raw.baro_sealevel, dka_followup: !!raw.dka_followup
    });
    if (n.baro_sealevel && n.barometric_mmhg == null) n.barometric_mmhg = 760;
    n.pregnancy = ['pregnant', 'labor', 'postpartum'].includes(n.maternal_context) ? 'yes' : n.maternal_context === 'unknown' ? 'unknown' : 'no';
    return {n, err, dec, units: {pco2: unit('pco2', 'mmHg'), pao2: unit('pao2', 'mmHg')}};
  }
  const has = v => v != null;
  const errOf = (E, f) => E.find(e => e.field === f);

  /* ---------- Değerlendirme ---------- */
  function evaluate(raw, cfg = {}) {
    const {n, err, dec, units} = normalize(raw);
    const R = {version: VERSION, n, errors: err, rules: [], modules: {}, missing: [], scope: null};
    const rule = id => { if (!R.rules.includes(id)) R.rules.push(id); };
    const M = (id, status, o = {}) => (R.modules[id] = Object.assign({id, status, msgs: [], src: []}, o));
    const miss = (field, mod) => { R.missing.push({field, mod}); };

    /* 1 · Giriş kapısı */
    const st = n.sample_type, arterial = st === ARTERIAL, venous = VENOUS.includes(st);
    if (!n.age_group) { R.scope = 'age_missing'; M('scope', 'veri_eksik', {msgs: ['age_missing']}); return R; }
    if (st === 'circuit') { R.scope = 'sample_out'; M('scope', 'uygulanamaz', {msgs: ['sample_circuit'], src: [1, 6]}); return R; }
    /* Kordon kanı her yaş seçiminde ayrı akıştır [P-R09]; erişkin ya da çocuk motoru çalışmaz */
    if (st.startsWith('cord') || n.sample_owner === 'cord') { if (n.sample_owner === 'cord') rule('G-R01'); return cordFlow(n, err, R, rule, M); }
    /* Fetal örnek: maternal eşikler uygulanmaz; fetal skalp için otomatik yorum yok [G-R01] [50] */
    if (n.sample_owner === 'fetus') { rule('G-R01'); R.scope = 'sample_out'; M('scope', 'uygulanamaz', {msgs: ['sample_fetal'], src: [25, 50]}); return R; }
    const ped = n.age_group !== 'adult', neo = n.age_group === 'neonatal';
    if (ped) rule('underage');            // erişkin otomatik yorumu durdurulur; yalnız desteklenen modüller açılır
    if (ped && has(n.fio2) && !n.fio2_unit_given) { err.push({field: 'fio2', code: 'fio2_unit_missing'}); n.fio2 = null; rule('P-R23'); }
    if (errOf(err, 'spo2')) rule('P-R23');
    const preg = !ped && n.pregnancy === 'yes', mctx = n.maternal_context;
    if (ped && ['pregnant', 'labor', 'postpartum'].includes(mctx)) rule('teen-preg');
    if (preg) rule('pregnant');
    if (st === 'unknown') rule('sample-unknown');
    if (venous) rule('venous');
    if (st === 'capillary') rule('capillary');
    R.scope = n.age_group;
    /* Arteriyel erişkin sınıflaması yalnız arteriyel, gebelik dışı (ya da bilinmeyen) erişkinde */
    const classify = arterial && !preg && !ped;

    /* 2 · Örnek ve veri kalitesi */
    const q = M('quality', 'hesaplandi', {sample: st, pregnancy: n.pregnancy, temp: n.temperature_reporting, units, times: {sample: n.sample_time, analysis: n.analysis_time, chem: n.chem_time}, src: [1, 6]});
    if (err.length) { q.status = 'gozden_gecirilmeli'; q.msgs.push('input_errors'); }
    if (st === 'unknown') q.msgs.push('sample_unknown');
    if (venous) q.msgs.push('sample_venous');
    if (st === 'capillary') q.msgs.push('sample_capillary');
    if (ped) q.msgs.push(neo ? 'scope_neonatal' : 'scope_pediatric');
    if (ped && ['pregnant', 'labor', 'postpartum'].includes(mctx)) q.msgs.push('teen_preg');
    if (!ped && mctx === 'labor') q.msgs.push('ctx_labor');
    if (!ped && mctx === 'postpartum') { rule('G-R19'); q.msgs.push('ctx_postpartum'); }
    if (!ped && mctx === 'breastfeeding') q.msgs.push('ctx_breastfeeding');
    if (preg && n.sample_owner === 'unknown') q.msgs.push('owner_unknown');
    if (preg && !has(n.altitude_m)) q.msgs.push('altitude_unknown');
    if (!ped && n.pregnancy === 'unknown') q.msgs.push('preg_unknown');
    if (st === 'capillary' && n.perfusion === 'poor') { rule('P-R19'); q.status = 'gozden_gecirilmeli'; q.msgs.push('cap_perfusion'); }
    if (st === 'capillary' && n.t_sample != null && n.t_analysis != null && n.t_analysis - n.t_sample > 15 * 60000) q.msgs.push('cap_15min');
    if (neo && !has(n.ga_weeks)) { rule('P-R22'); q.msgs.push('neo_no_ga'); }
    if (ped && (has(n.hco3_actual) || has(n.tco2))) { rule('P-R21'); q.msgs.push('no_bicarb_dose'); }
    if (ped) q.src = [1, 6, 21];
    if (preg) q.msgs.push('preg_yes');
    if (n.temperature_reporting === 'unknown') q.msgs.push('temp_unknown');
    if (n.temperature_reporting === 'mixed') { rule('temp-mismatch'); q.status = 'gozden_gecirilmeli'; q.msgs.push('temp_mixed'); }
    if (!n.sample_time) q.msgs.push('time_missing');
    const chemVals = has(n.na) || has(n.cl) || has(n.tco2) || has(n.albumin);
    const mixedTimes = chemVals && (n.chem_same === 'no' || (n.chem_time && n.sample_time && n.chem_time !== n.sample_time));
    if (mixedTimes) { rule('mixed-times'); q.status = 'gozden_gecirilmeli'; q.msgs.push('mixed_times'); }
    if (has(n.hco3_standard) && !has(n.hco3_actual)) rule('standard-hco3');
    q.msgs.push('no_critical_alarm'); rule('unapproved-critical');

    /* 3 · Tutarlılık (Henderson–Hasselbalch) */
    let suspended = false;
    {
      const need = [];
      if (!has(n.ph)) need.push('ph'); if (!has(n.pco2)) need.push('pco2');
      if (!has(n.hco3_actual)) need.push(has(n.hco3_standard) ? 'hco3_actual_not_standard' : 'hco3_actual');
      if (n.temperature_reporting === 'mixed') M('hh', 'uygulanamaz', {msgs: ['temp_mixed'], src: [6]});
      else if (need.length) { M('hh', 'veri_eksik', {need, src: [2]}); need.forEach(f => miss(f, 'hh')); }
      else {
        const calc = F['hh-ph'](n.hco3_actual, n.pco2), diff = n.ph - calc;
        /* Yuvarlama sınırı: girilen basamak sayısına göre her değerin ±yarım birimi (ürün kararı; klinik tolerans değildir) */
        const half = k => 0.5 * Math.pow(10, -(dec[k] || 0));
        const dP = half('pco2') * (units.pco2 === 'kPa' ? 1 / KPA : 1), dH = half('hco3_actual'), dpH = half('ph');
        /* [1.8 sonrası] Kan gazı cihazları gerçek HCO₃'ü IFCC sabitleriyle hesaplar: pK 6,095 ve CO₂ çözünürlük katsayısı 0,0307 mmol/L/mmHg
           (0,230 mmol/L/kPa); atlas formülü pK 6,1 ve 0,03 kullanır. Bu fark pH'ta ≈0,015 sistematik kayma yaratır ve gerçek cihaz çıktılarını
           "uyumsuz" gösteriyordu (ör. gerçek rapor: pH 7,204 · PCO₂ 51,4 · cHCO₃⁻(P) 20,3 → IFCC sabitleriyle pH 7,204, atlas formülüyle 7,219).
           Tutarlılık kontrolü iki sabit takımının arasını kabul eder; gösterilen hesap ve yorum formülü değişmez. */
        const shift = Math.log10(0.0307 / 0.03) + (6.1 - 6.095);
        const lo = F['hh-ph'](Math.max(n.hco3_actual - dH, 1e-9), n.pco2 + dP) - shift, hi = F['hh-ph'](n.hco3_actual + dH, Math.max(n.pco2 - dP, 1e-9));
        const roundingOk = n.ph + dpH >= lo && n.ph - dpH <= hi;
        const tol = has(n.hh_tolerance) ? n.hh_tolerance : has(cfg.hhTolerance) ? cfg.hhTolerance : null;
        const tolOk = tol == null || Math.abs(diff) <= tol;
        const ok = roundingOk && tolOk;
        M('hh', ok ? 'hesaplandi' : 'gozden_gecirilmeli', {formula: 'hh-ph', calc, diff, range: [lo, hi], tol, roundingOk, tolOk,
          msgs: [ok ? 'hh_consistent' : 'hh_inconsistent', 'hh_not_validation'], src: FSRC['hh-ph']});
        if (!ok) { suspended = true; rule('hh-inconsistent'); }
      }
    }
    if (n.temperature_reporting === 'mixed') suspended = true;     // farklı sıcaklık raporlaması birleştirilemez [6]
    R.suspended = suspended;

    /* 4 · pH yönü */
    if (!has(n.ph)) { M('ph', 'veri_eksik', {need: ['ph']}); miss('ph', 'ph'); }
    else if (ped) {
      /* Çocuk/yenidoğan: evrensel normal yok; yalnız yerel, yaşa ve örneğe özgü referansla etiket [P-R18] */
      if (has(n.ref_ph_low) && has(n.ref_ph_high)) {
        const cls = (v, lo, hi) => v < lo ? 'below' : v > hi ? 'above' : 'within';
        const m = M('ph', n.local_ref_source ? 'hesaplandi' : 'gozden_gecirilmeli', {value: n.ph, local: true, cls: cls(n.ph, n.ref_ph_low, n.ref_ph_high), ref: [n.ref_ph_low, n.ref_ph_high], refSrc: n.local_ref_source,
          msgs: ['ph_local_ref'], src: [31]});
        if (has(n.pco2) && has(n.ref_pco2_low) && has(n.ref_pco2_high)) { m.pco2Cls = cls(n.pco2, n.ref_pco2_low, n.ref_pco2_high); m.pco2Ref = [n.ref_pco2_low, n.ref_pco2_high]; }
        if (!n.local_ref_source) m.msgs.push('ref_source_missing');
      } else { rule('P-R18'); M('ph', 'veri_eksik', {value: n.ph, need: ['ref_ph'], msgs: ['ph_ref_needed'], src: [31]}); miss('ref_ph', 'ph'); }
    }
    else if (!classify) M('ph', 'uygulanamaz', {value: n.ph, msgs: [preg ? 'ph_preg' : arterial ? '' : 'ph_not_arterial'].filter(Boolean), src: preg ? [15] : [1, 5]});
    else {
      const dir = n.ph < PH_REF[0] ? 'acidemia' : n.ph > PH_REF[1] ? 'alkalemia' : 'within';
      /* [F10] Gebelik bağlamı bilinmiyorsa sınıflama gösterilir ama "gebe olmayan varsayımıyla" etiketlenir; "gebe değil" ile eşdeğer sunulmaz */
      const assume = n.maternal_context === 'unknown';
      M('ph', assume ? 'gozden_gecirilmeli' : 'hesaplandi', {value: n.ph, dir, ref: PH_REF, assume, msgs: [...(assume ? ['assume_not_pregnant'] : []), ...(dir === 'within' ? ['ph_within_continue'] : [])], src: [2]});
      if (dir === 'within') rule('normal-ph');
    }

    /* 5–6 · Aday süreçler ve kompansasyon */
    const hyps = [];
    {
      const need = [];
      if (!has(n.pco2)) need.push('pco2');
      if (!has(n.hco3_actual)) need.push(has(n.hco3_standard) ? 'hco3_actual_not_standard' : 'hco3_actual');
      if (ped) M('proc', 'uygulanamaz', {msgs: ['proc_ped'], src: [2, 30]});
      else if (preg) { rule('G-R24'); M('proc', 'uygulanamaz', {msgs: [mctx === 'postpartum' ? 'proc_postpartum' : 'proc_preg'], src: [15, 41, 42]}); }
      else if (!classify) M('proc', 'uygulanamaz', {msgs: [preg ? 'proc_preg' : st === 'unknown' ? 'proc_sample_unknown' : 'proc_not_arterial'], src: preg ? [15] : [1, 5]});
      else if (suspended) M('proc', 'gozden_gecirilmeli', {msgs: ['proc_suspended']});
      else if (need.length) { M('proc', 'veri_eksik', {need}); need.forEach(f => miss(f, 'proc')); }
      else {
        const h = n.hco3_actual, p = n.pco2, dir = R.modules.ph && R.modules.ph.dir;
        const align = acidifying => !dir || dir === 'within' ? 'neutral' : (dir === 'acidemia') === acidifying ? 'same' : 'opposite';
        const place = (v, lo, hi) => v < lo ? 'below' : v > hi ? 'above' : 'within';
        if (h < BASE.hco3) { const w = F.winter(h); hyps.push({id: 'met_acid', formula: 'winter', exp: w, measured: p, pos: place(p, w.lo, w.hi), align: align(true), src: FSRC.winter}); }
        if (h > BASE.hco3) { const w = F['met-alk'](h); hyps.push({id: 'met_alk', formula: 'met-alk', exp: w, measured: p, pos: place(p, w.lo, w.hi), align: align(false), src: FSRC['met-alk']}); }
        const resp = (id, fa, fc, acid) => {
          const a = F[fa](p), c = F[fc](p), lo = Math.min(a, c), hi = Math.max(a, c);
          const nearer = Math.abs(h - a) === Math.abs(h - c) ? 'equal' : Math.abs(h - a) < Math.abs(h - c) ? 'acute' : 'chronic';
          hyps.push({id, formula: [fa, fc], acute: a, chronic: c, measured: h, pos: h < lo ? 'below' : h > hi ? 'above' : 'between', nearer, align: align(acid), src: [...new Set([...FSRC[fa], ...FSRC[fc]])]});
        };
        if (p > BASE.pco2) resp('resp_acid', 'resp-ac-acute', 'resp-ac-chronic', true);
        if (p < BASE.pco2) resp('resp_alk', 'resp-alk-acute', 'resp-alk-chronic', false);
        const assume = n.maternal_context === 'unknown';
        M('proc', assume ? 'gozden_gecirilmeli' : 'hesaplandi', {hyps, assume, msgs: [...(assume ? ['assume_not_pregnant'] : []), hyps.length ? 'proc_multi' : 'proc_none'], src: [2, 3]});
      }
    }

    /* 7 · Anyon açıklığı, albümin düzeltmesi, delta */
    let agv = null, agMethod = null;
    {
      const bic = has(n.tco2) ? n.tco2 : n.gas_hco3_for_ag && has(n.hco3_actual) ? n.hco3_actual : null;
      agMethod = has(n.tco2) ? 'tco2' : bic != null ? 'gas_hco3' : null;
      const need = [];
      if (!has(n.na)) need.push('na'); if (!has(n.cl)) need.push('cl'); if (bic == null) need.push('tco2');
      if (need.length) { M('ag', 'veri_eksik', {need, src: FSRC['anion-gap']}); need.forEach(f => miss(f, 'ag')); }
      else {
        agv = F['anion-gap'](n.na, n.cl, bic);
        const a = M('ag', 'hesaplandi', {value: agv, formula: 'anion-gap', method: agMethod, src: [...FSRC['anion-gap'], 18]});
        if (agMethod === 'gas_hco3') a.msgs.push('ag_gas_hco3');
        if (mixedTimes) { a.status = 'gozden_gecirilmeli'; a.msgs.push('mixed_times'); }
        if (agv < 0) { rule('negative-ag'); a.status = 'gozden_gecirilmeli'; a.msgs.push('ag_negative'); }
        if (has(n.ag_ref_low) && has(n.ag_ref_high)) {
          a.cls = agv > n.ag_ref_high ? 'high' : agv < n.ag_ref_low ? 'low' : 'within'; a.interval = [n.ag_ref_low, n.ag_ref_high];
          if (a.cls === 'low') a.msgs.push('ag_low_review');
        } else { rule('missing-ag-ref'); a.msgs.push('ag_no_interval'); if (has(n.ag_reference)) a.vsRef = agv > n.ag_reference ? 'above' : agv < n.ag_reference ? 'below' : 'equal'; }
      }
    }
    let agc = null;
    if (ped) M('agc', 'uygulanamaz', {msgs: ['ped_not_validated'], src: [7]});
    else if (agv == null) M('agc', 'veri_eksik', {need: ['ag'], src: [7]});
    else if (!has(n.albumin) || !has(n.albumin_reference)) {
      const need = []; if (!has(n.albumin)) need.push('albumin'); if (!has(n.albumin_reference)) need.push('albumin_reference');
      rule('missing-albumin'); M('agc', 'veri_eksik', {need, msgs: ['agc_missing'], src: [7]}); need.forEach(f => miss(f, 'agc'));
    } else {
      agc = F['ag-albumin'](agv, n.albumin_reference, n.albumin);
      M('agc', 'hesaplandi', {value: agc, measured: agv, albumin: n.albumin, albRef: n.albumin_reference, formula: 'ag-albumin', msgs: ['agc_not_lactate'], src: FSRC['ag-albumin']});
    }
    {
      const agUse = agc != null ? agc : agv, need = [];
      if (agUse == null) need.push('ag');
      if (!has(n.ag_reference)) need.push('ag_reference');
      if (!has(n.hco3_reference)) need.push('hco3_reference');
      if (ped) M('delta', 'uygulanamaz', {msgs: ['ped_not_validated'], src: FSRC['delta-gap']});
      else if (agMethod === 'gas_hco3') M('delta', 'uygulanamaz', {msgs: ['delta_needs_tco2'], src: FSRC['delta-gap']});
      else if (need.length) { if (need.includes('ag_reference')) rule('missing-ag-ref'); M('delta', 'veri_eksik', {need, src: FSRC['delta-gap']}); need.filter(f => f !== 'ag').forEach(f => miss(f, 'delta')); }
      else if (!(agUse > n.ag_reference)) M('delta', 'uygulanamaz', {msgs: ['delta_no_high_ag'], agUse, agRef: n.ag_reference, src: FSRC['delta-gap']});
      else {
        const gap = F['delta-gap'](agUse, n.ag_reference, n.hco3_reference, n.tco2), den = n.hco3_reference - n.tco2;
        const d = M('delta', mixedTimes ? 'gozden_gecirilmeli' : 'hesaplandi', {gap, agUse, corrected: agc != null, agRef: n.ag_reference, hco3Ref: n.hco3_reference, tco2: n.tco2,
          num: agUse - n.ag_reference, den, formula: ['delta-gap', 'delta-ratio'], msgs: [gap > 0 ? 'delta_pos' : gap < 0 ? 'delta_neg' : 'delta_zero_gap', 'delta_no_cutoffs'], src: [...FSRC['delta-gap']]});
        if (agc == null) d.msgs.push('delta_uncorrected');
        if (den <= 0) { rule('delta-zero'); d.ratio = null; d.msgs.push('delta_ratio_closed'); }
        else d.ratio = F['delta-ratio'](agUse, n.ag_reference, n.hco3_reference, n.tco2);
      }
    }

    /* 8 · Oksijenasyon */
    const oxyBlock = !arterial ? (venous ? 'ox_venous' : st === 'capillary' ? 'ox_capillary' : 'ox_sample_unknown') : null;
    if (oxyBlock && ped) rule('P-R01');
    if (oxyBlock) { M('pf', 'uygulanamaz', {msgs: [oxyBlock], src: [1, 5]}); M('aa', 'uygulanamaz', {msgs: [oxyBlock], src: [1, 5]}); M('cao2', 'uygulanamaz', {msgs: [oxyBlock], src: [1, 5]}); }
    else {
      /* PaO2/FiO2 */
      const need = [];
      if (!has(n.pao2)) need.push('pao2');
      if (!has(n.fio2)) { need.push('fio2'); if (!errOf(err, 'fio2')) rule('missing-fio2'); }
      if (errOf(err, 'fio2') && errOf(err, 'fio2').code === 'fio2_fraction_gt1') rule('fio2-format');
      if (need.length) { M('pf', errOf(err, 'fio2') ? 'gozden_gecirilmeli' : 'veri_eksik', {need, msgs: errOf(err, 'fio2') ? ['fio2_input_error'] : [], src: FSRC.pf}); need.forEach(f => miss(f, 'pf')); }
      else {
        const approx = n.fio2_quality !== 'known';
        if (approx) rule('estimated-fio2');
        M('pf', 'hesaplandi', {value: F.pf(n.pao2, n.fio2), pao2: n.pao2, fio2: n.fio2, approx, formula: 'pf', msgs: [approx ? 'pf_approx' : '', 'pf_not_ards'].filter(Boolean), src: FSRC.pf});
      }
      /* Oda havasında A–a */
      if (n.o2_support === 'supplemental') { rule('supplement-oxygen'); M('aa', 'uygulanamaz', {msgs: ['aa_supplemental'], src: FSRC['aa-roomair']}); }
      else {
        const nd = [];
        if (n.o2_support !== 'room_air') nd.push('o2_support');
        if (n.normothermia !== 'yes') nd.push('normothermia');
        if (!has(n.barometric_mmhg)) nd.push('barometric_mmhg');
        if (!has(n.pao2)) nd.push('pao2'); if (!has(n.pco2)) nd.push('pco2');
        if (nd.length) { M('aa', 'veri_eksik', {need: nd, src: FSRC['aa-roomair']}); nd.forEach(f => miss(f, 'aa')); }
        else M('aa', 'hesaplandi', {value: F['aa-roomair'](n.barometric_mmhg, n.pco2, n.pao2), baro: n.barometric_mmhg, sealevel: n.baro_sealevel, formula: 'aa-roomair', msgs: ['aa_assumptions'], src: FSRC['aa-roomair']});
      }
      /* Oksijen içeriği */
      const dysh = n.dyshb === 'yes' || ((has(n.cohb) || has(n.methb)) && n.dyshb !== 'no');
      /* [F04, R01] COHb/MetHb ölçülmüşse bu sürüm standart CaO2'yi (toplam Hb × satürasyon) hesaplamaz: dishemoglobin varlığında fonksiyonel
         satürasyon toplam Hb ile çarpılamaz; fraksiyonel O2Hb ile ayrı yol kaynaklandırılmadı. "Yok" seçimi ya da onay bu çelişkiyi çözmez. Yeni COHb eşiği yoktur. */
      const dyshConflict = !dysh && (has(n.cohb) || has(n.methb)) && n.dyshb === 'no';
      if (dysh) { rule('dyshemoglobin'); M('cao2', 'uygulanamaz', {msgs: ['cao2_dyshb'], src: [13, 14]}); }
      else if (dyshConflict) M('cao2', 'gozden_gecirilmeli', {msgs: ['cao2_dyshb_conflict', 'cao2_measured_policy'], src: [12, 13, 14]});
      else if (n.saturation_type === 'spo2') M('cao2', 'uygulanamaz', {msgs: ['cao2_spo2'], src: [12, 14]});
      else {
        const nd = [];
        if (!has(n.hb)) nd.push('hb'); if (!has(n.saturation)) nd.push('saturation');
        if (n.saturation_type === 'unknown') { nd.push('saturation_type'); rule('unknown-saturation'); }
        if (n.dyshb !== 'no') nd.push('dyshb');
        if (!has(n.pao2)) nd.push('pao2');
        if (nd.length) { M('cao2', 'veri_eksik', {need: nd, src: FSRC.cao2}); nd.forEach(f => miss(f, 'cao2')); }
        else M('cao2', 'hesaplandi', {value: F.cao2(n.hb, n.saturation, n.pao2), hb: n.hb, sat: n.saturation, satType: n.saturation_type, formula: 'cao2', src: FSRC.cao2});
      }
    }
    if (ped) { M('aa', 'uygulanamaz', {msgs: ['ped_not_validated'], src: [12]}); M('cao2', 'uygulanamaz', {msgs: ['ped_not_validated'], src: [12]}); }
    /* Dishemoglobin bağlamı (örnek türünden bağımsız: COHb venöz ya da arteriyel örnekte ölçülebilir [13]) */
    if (has(n.cohb) || has(n.methb) || n.dyshb === 'yes') {
      const m = M('dyshb', 'gozden_gecirilmeli', {cohb: n.cohb, methb: n.methb, msgs: [], src: [13, 14]});
      if (has(n.cohb) || n.dyshb === 'yes') m.msgs.push('cohb_context');
      if (has(n.methb) || n.dyshb === 'yes') m.msgs.push('methb_context');
      if (n.saturation_type === 'spo2') m.msgs.push('spo2_unreliable');
    }

    /* 9 · Bağlam modülleri: laktat ve DKA */
    {
      const L = n.lactates, extra = ped ? ['lac_ped'] : [], lsrc = ped ? [10, 34] : [10];
      if (preg && L.length) {
        const last = L[L.length - 1].v;
        if (mctx === 'labor' && last >= 2) { rule('G-R10'); extra.push('lac_labor'); }
        if (last < 4) { rule('G-R11'); extra.push('lac_lt4_not_exclude'); }
        extra.push('lac_preg_cohort'); lsrc.push(44, 46, 56);
      }
      if (ped && L.length) rule('P-R20');
      if (!L.length) M('lactate', 'veri_eksik', {need: ['lactate'], src: lsrc});
      else if (L.length === 1) M('lactate', 'hesaplandi', {series: L, msgs: ['lac_single', 'lac_not_sepsis', ...extra], src: lsrc});
      else {
        const first = L[0].v, last = L[L.length - 1].v;
        const ord = n.lac_order === 'time' ? (n.lac_resorted ? ['lac_resorted'] : []) : n.lac_order === 'tie' ? ['lac_time_tie'] : ['lac_entry_order'];
        if (first === 0) { rule('lactate-zero'); M('lactate', 'gozden_gecirilmeli', {series: L, order: n.lac_order, msgs: ['lac_zero', 'lac_not_sepsis', ...extra], src: lsrc}); }
        else if (n.lac_order === 'tie') M('lactate', 'gozden_gecirilmeli', {series: L, order: n.lac_order, msgs: [...ord, 'lac_not_sepsis', ...extra], src: lsrc});
        else M('lactate', 'hesaplandi', {series: L, order: n.lac_order, change: F['lactate-change'](first, last), formula: 'lactate-change', msgs: [...ord, 'lac_not_clearance', 'lac_not_sepsis', ...extra], src: lsrc});
      }
    }
    const tri = vals => vals.some(v => v === true) ? 'yes' : vals.every(v => v === false) ? 'no' : 'missing';
    const bic = has(n.tco2) ? n.tco2 : has(n.hco3_actual) ? n.hco3_actual : null, bicSrc = has(n.tco2) ? 'tco2' : has(n.hco3_actual) ? 'gas_hco3' : null;
    const PLUS = ['negative', 'trace', '1+', '2+', '3+', '4+'], WORD = ['negative', 'small', 'moderate', 'large'];
    if (neo) M('dka', 'uygulanamaz', {msgs: ['dka_neonatal'], src: [23]});
    else if (ped) pedDKA();
    else if (preg || mctx === 'breastfeeding') pregDKA();
    else {
      const gl = has(n.glucose) ? (n.glucose_unit === 'mmol/L' ? n.glucose >= 11.1 : n.glucose >= 200) : null;
      const dm = n.diabetes_history === 'yes' ? true : n.diabetes_history === 'no' ? false : null;
      const bhb = has(n.beta_hydroxybutyrate) ? n.beta_hydroxybutyrate >= 3.0 : null;
      /* Erişkin ölçütü + ölçeğiyle tanımlı (≥2+); küçük/orta/büyük ölçeği eşleştirilmez */
      const uk = PLUS.includes(n.urine_ketones) ? ['2+', '3+', '4+'].includes(n.urine_ketones) : null;
      const phc = has(n.ph) ? n.ph < 7.3 : null, bc = bic != null ? bic < 18 : null;
      const comp = {
        diabetes: {state: tri([dm, gl]), dm, glucose: gl},
        ketosis: {state: tri([bhb, uk]), bhb, uk},
        acidosis: {state: tri([phc, bc]), ph: phc, bic: bc, bicSrc}
      };
      const anyInput = has(n.glucose) || dm != null || has(n.beta_hydroxybutyrate) || n.urine_ketones !== 'unknown';
      const states = Object.values(comp).map(c => c.state);
      if (states.includes('missing')) rule('dka-missing');
      const msgs = ['dka_not_diagnosis', 'dka_euglycemic'];
      if (['small', 'moderate', 'large'].includes(n.urine_ketones)) msgs.push('uk_scale_adult');
      if (venous) msgs.push('dka_venous_ok');
      if (st === 'unknown') msgs.push('dka_sample_unknown');
      M('dka', !anyInput ? 'veri_eksik' : states.includes('missing') ? 'veri_eksik' : 'hesaplandi',
        {comp, anyInput, need: [comp.diabetes.state === 'missing' && 'glucose', comp.ketosis.state === 'missing' && 'beta_hydroxybutyrate', comp.acidosis.state === 'missing' && 'ph'].filter(Boolean), met: states.filter(s => s === 'yes').length, msgs, src: [9]});
      if (n.dka_followup) {
        rule('dka-resolution');
        const ket = has(n.beta_hydroxybutyrate) ? n.beta_hydroxybutyrate < 0.6 : null;
        const phr = has(n.ph) ? n.ph >= 7.3 : null, br = bic != null ? bic >= 18 : null;
        const acidRes = phr === true || br === true ? true : phr === false && br === false ? false : null;
        const all = ket === true && acidRes === true ? 'yes' : ket === false || acidRes === false ? 'no' : 'missing';
        M('dkares', all === 'missing' ? 'veri_eksik' : 'hesaplandi', {ket, phr, br, acidRes, all, phVenous: venous, glucoseBelow: gl == null ? null : !gl,
          msgs: ['dkares_not_ag', 'dkares_hyperchloremic'], src: [9]});
      }
    }
    if (ped && n.dka_followup) M('dkares', 'uygulanamaz', {msgs: ['dkares_ped'], src: [23, 37]});

    /* Gebe/emziren: glukoz dışlama kapısı değildir; ketoasidoz ayırıcı tanısı [G-R05–R09, G-R20] [43][48][51][54] */
    function pregDKA() {
      /* [F03] Keton ölçümü, seçilmiş DKA keton ölçütü ve açlık/laktasyon değerlendirmesi ayrı tutulur.
         "DKA keton ölçütü karşılanmadı" ile "ketoz yok" aynı değildir; asidoz incelemesi ≥3 değerine bağlı değildir. Yeni keton eşiği yoktur. */
      const bhb = has(n.beta_hydroxybutyrate) ? n.beta_hydroxybutyrate >= 3.0 : null;
      const uk = PLUS.includes(n.urine_ketones) ? ['2+', '3+', '4+'].includes(n.urine_ketones) : WORD.includes(n.urine_ketones) ? ['moderate', 'large'].includes(n.urine_ketones) : null;
      /* Ölçülen keton: değer ya da idrar sonucu (eşik değil, yalnız ölçümün varlığı) */
      const ketDetected = (has(n.beta_hydroxybutyrate) && n.beta_hydroxybutyrate > 0) || (n.urine_ketones !== 'unknown' && n.urine_ketones !== 'negative');
      const phc = has(n.ph) ? n.ph < 7.3 : null, bc = bic != null ? bic < 18 : null;
      const comp = {dkaKetone: {state: tri([bhb, uk]), bhb, uk}, acidosis: {state: tri([phc, bc]), ph: phc, bic: bc, bicSrc}};
      const dmKnown = ['t1', 't2', 'gestational'].includes(n.diabetes_type) || n.diabetes_history === 'yes';
      const glHigh = has(n.glucose) ? (n.glucose_unit === 'mmol/L' ? n.glucose >= 11.1 : n.glucose >= 200) : null;
      const anyInput = has(n.glucose) || has(n.beta_hydroxybutyrate) || n.urine_ketones !== 'unknown' || dmKnown || n.poor_intake !== 'unknown' || n.vomiting !== 'unknown';
      const msgs = ['preg_dka_no_glucose_gate', 'dka_not_diagnosis'];
      if (comp.dkaKetone.state === 'missing') { rule('G-R07'); msgs.push('dka_ketone_missing'); }
      if (comp.dkaKetone.state === 'no' && ketDetected) msgs.push('preg_ket_below_dka');
      if (dmKnown && (glHigh === true || n.feels_unwell === 'yes')) { rule('G-R06'); msgs.push('preg_ketone_assess'); }
      if (glHigh !== true && (comp.dkaKetone.state !== 'no' || ketDetected || comp.acidosis.state === 'yes')) { rule('G-R05'); msgs.push('preg_euglycemic'); }
      if ((comp.dkaKetone.state === 'yes' || ketDetected) && comp.acidosis.state === 'no') { rule('G-R08'); msgs.push('ketosis_not_ketoacidosis'); }
      const starvation = n.poor_intake === 'yes' || n.vomiting === 'yes';
      const diff = [];
      if (comp.acidosis.state === 'yes' || comp.dkaKetone.state === 'yes' || ketDetected) diff.push('dka_euglycemic_diff');
      if (starvation && comp.acidosis.state !== 'no') { rule('G-R09'); diff.push('starvation_diff'); }
      if (n.vomiting === 'yes') diff.push('vomiting_alkalosis');
      if (mctx === 'breastfeeding' && n.poor_intake === 'yes' && comp.acidosis.state !== 'no' && (comp.dkaKetone.state !== 'no' || ketDetected)) { rule('G-R20'); diff.push('lactation_diff'); }
      if (n.pump_issue === 'yes' || n.steroid === 'yes') diff.push('trigger_noted');
      /* Klinik değerlendirme gereği: asidoz ile birlikte ölçülen keton ya da açlık/kusma bağlamı (≥3 ölçütüne bağlı değil) */
      const urgent = comp.acidosis.state === 'yes' && (comp.dkaKetone.state === 'yes' || ketDetected || starvation);
      const review = comp.acidosis.state === 'yes';
      const m = M('dka', !anyInput ? 'veri_eksik' : urgent || review ? 'gozden_gecirilmeli' : 'hesaplandi', {preg: true, comp, ketDetected, bhbValue: n.beta_hydroxybutyrate, anyInput, urgent, diff, msgs, src: [9, 43, 48, 51, 54]});
      if (urgent) m.msgs.unshift('preg_dka_urgent'); else if (review) m.msgs.unshift('preg_acidosis_review');
    }

    /* Çocuk DKA: ISPAD 2022 profili (P-E06, P-E07) [23]; nörolojik kötüleşme uyarısı [37] */
    function pedDKA() {
      const gmmol = has(n.glucose) ? (n.glucose_unit === 'mmol/L' ? n.glucose : n.glucose / 18.016) : null;
      const gl = gmmol == null ? null : gmmol > 11;
      const bhb = has(n.beta_hydroxybutyrate) ? n.beta_hydroxybutyrate >= 3 : null;
      const uk = WORD.includes(n.urine_ketones) ? ['moderate', 'large'].includes(n.urine_ketones) : null;
      const phc = has(n.ph) ? n.ph < 7.3 : null, bc = bic != null ? bic < 18 : null;
      const comp = {glucose: {state: tri([gl]), glucose: gl, mmol: gmmol}, acidosis: {state: tri([phc, bc]), ph: phc, bic: bc, bicSrc}, ketosis: {state: tri([bhb, uk]), bhb, uk}};
      const anyInput = has(n.glucose) || has(n.beta_hydroxybutyrate) || n.urine_ketones !== 'unknown' || n.dka_confirmed === 'yes' || n.neuro === 'yes';
      const msgs = ['dka_ped_profile', 'dka_not_diagnosis'];
      if (comp.ketosis.state === 'missing') { rule('P-R12'); msgs.push('dka_ketone_missing'); }
      if (PLUS.slice(2).includes(n.urine_ketones)) msgs.push('uk_scale_ped');
      if (has(n.glucose) && n.glucose_unit !== 'mmol/L') msgs.push('dka_glucose_conv');
      if (has(n.ph) && st !== 'peripheral_venous' && st !== 'central_venous' && st !== 'mixed_venous') msgs.push('dka_ped_venous_ph');
      const euglycemic = gl === false && comp.acidosis.state === 'yes' && comp.ketosis.state === 'yes';
      if (euglycemic) { rule('P-R13'); msgs.push('dka_ped_euglycemic'); }
      const triad = Object.values(comp).every(c => c.state === 'yes');
      /* Şiddet: üç bileşen sayısal olarak karşılanınca ya da klinik DKA doğrulandıysa; pH ve HCO3 ayrı, ağır olan saklanmaz */
      let sev = null;
      if (triad || n.dka_confirmed === 'yes') {
        const grade = (v, T) => v == null ? null : (T.find(([th]) => v < th) || [0, null])[1];
        const sp = grade(n.ph, ISPAD.ph), sb = grade(bic, ISPAD.hco3);
        const worst = [sp, sb].filter(Boolean).sort((a, b) => SEV_RANK[b] - SEV_RANK[a])[0] || null;
        sev = {ph: sp, hco3: sb, overall: worst, mismatch: sp !== sb};
        if (sev.mismatch) { rule('P-R14'); msgs.push('dka_sev_mismatch'); }
        msgs.push('dka_sev_not_dx');
      }
      const m = M('dka', !anyInput ? 'veri_eksik' : 'hesaplandi', {ped: true, comp, anyInput, need: [comp.glucose.state === 'missing' && 'glucose', comp.ketosis.state === 'missing' && 'beta_hydroxybutyrate', comp.acidosis.state === 'missing' && 'ph'].filter(Boolean), triad, euglycemic, sev, met: Object.values(comp).filter(c => c.state === 'yes').length, msgs, src: [23]});
      if (euglycemic) m.status = 'gozden_gecirilmeli';
      if (n.neuro === 'yes') { rule('P-R15'); m.status = 'gozden_gecirilmeli'; m.urgent = true; m.msgs.unshift('dka_neuro_urgent'); m.src = [23, 37]; }
    }

    /* Gebelik: fizyoloji notu [15] */
    if (preg) pregModules(n, R, rule, M, {arterial, venous, mctx});
    else if (mctx === 'breastfeeding') M('preg', 'hesaplandi', {msgs: ['ctx_breastfeeding_note'], src: [54]});
    baseModule(n, R, rule, M);
    hcapModule(n, R, rule, M, {arterial, venous, ped, preg, st});
    r810Modules(n, R, rule, M, {ped, neo, preg, classify, arterial, agMethod, dec});
    if (ped) pedModules(n, R, rule, M, miss, {arterial, neo, st});
    if (classify && n.maternal_context === 'unknown') R.assumptions = ['not_pregnant'];
    sampleQuality(n, R, rule, M);
    finiteGuard(R);
    finalizeMissing(R);
    return R;
  }

  /* ---------- Gebelik, eylem ve doğum sonrası modülleri (üçüncü tur) ---------- */
  const PREG_REVIEW = [{src: 41, ph: [7.40, 7.47]}, {src: 42, ph: [7.40, 7.45], pco2: [27, 32], hco3: [17, 19]}];   // G-E01, G-E02: derleme fizyolojisi, otomatik normal değil
  const O2_SOURCES = [
    {id: 'G-E04', kind: 'kilavuz', src: 52, spo2: [94, 98], cond: 'bts_general'}, {id: 'G-E05', kind: 'ozel_kilavuz', src: 52, spo2: [88, 92], cond: 'bts_hypercapnic'},
    {id: 'G-E06', kind: 'derleme', src: 45, text: 'PaO₂ >75 mmHg, SpO₂ >%95'}, {id: 'G-E07', kind: 'gorus', src: 47, spo2: [92, 96], cond: 'covid'}];
  function pregModules(n, R, rule, M, {arterial, venous, mctx}) {
    /* Fizyoloji: derleme aralıkları yan yana, verdict yok */
    const cmp = (v, r) => v == null || !r ? null : v < r[0] ? 'below' : v > r[1] ? 'above' : 'within';
    const rows = PREG_REVIEW.map(x => ({src: x.src, ph: x.ph, pco2: x.pco2 || null, hco3: x.hco3 || null, cph: cmp(n.ph, x.ph), cpco2: cmp(n.pco2, x.pco2), chco3: cmp(n.hco3_actual, x.hco3)}));
    const msgs = ['preg_physiology_review', 'preg_not_healthy'];
    if (!arterial) msgs.push('preg_ranges_arterial_only');
    if (has(n.hco3_actual) || has(n.tco2)) { msgs.push('preg_low_hco3'); if ((n.hco3_actual ?? n.tco2) < 24) rule('G-R03'); }
    if (mctx === 'postpartum') msgs.push('ctx_postpartum');
    M('preg', 'gozden_gecirilmeli', {rows: arterial ? rows : null, msgs, src: [15, 41, 42]});
    /* Göreceli CO2 yükselişi: PaCO2 35–40 ve solunumsal belirti (G-E03) [42][49] */
    /* G-E03'teki 35–40 mmHg bir kaynak örneğidir, uyarının üst sınırı değildir [F05]: 40 üstü ayrı ve daha belirgin mesajla gösterilir (yeni eşik değil) */
    if (arterial && has(n.pco2) && n.pco2 > 40) { rule('G-R04'); M('co2rel', 'gozden_gecirilmeli', {pco2: n.pco2, level: 'above', msgs: ['preg_co2_above', 'no_intubation_order'], src: [42, 49]}); }
    else if (arterial && has(n.pco2) && n.pco2 >= 35 && n.resp_symptoms === 'yes') { rule('G-R04'); M('co2rel', 'gozden_gecirilmeli', {pco2: n.pco2, level: 'relative', msgs: ['preg_rel_co2', 'no_intubation_order'], src: [42, 49]}); }
    /* Oksijen hedefi profili: kaynaklar ortalanmaz, kurum/uzman seçmeden tek hedef yok [G-R16, G-R17] */
    {
      const prof = n.o2_profile, hc = n.hypercapnia_risk;
      let target = null, label = null, status = 'hesaplandi';
      const msgs = [];
      if (prof === 'none') { rule('G-R16'); msgs.push('o2_no_profile'); status = 'veri_eksik'; if (hc === 'yes') { rule('G-R17'); msgs.push('o2_hypercapnia_expert'); } }
      else if (prof === 'bts') {
        if (hc === 'yes') { rule('G-R17'); target = [88, 92]; label = 'G-E05'; msgs.push('o2_bts_hypercapnic'); status = 'gozden_gecirilmeli'; }
        else if (hc === 'no') { target = [94, 98]; label = 'G-E04'; msgs.push('o2_bts_general'); }
        else { msgs.push('o2_bts_hc_unknown'); status = 'veri_eksik'; }
      } else {
        if (has(n.o2_target_low) && has(n.o2_target_high)) { target = [n.o2_target_low, n.o2_target_high]; label = prof; msgs.push('o2_user_profile'); }
        else { msgs.push('o2_user_profile_missing'); status = 'veri_eksik'; }
        if (hc === 'yes') msgs.push('o2_hypercapnia_expert');
      }
      const pos = target && has(n.spo2) ? (n.spo2 < target[0] ? 'below' : n.spo2 > target[1] ? 'above' : 'within') : null;
      msgs.push('o2_no_vent_order');
      M('o2target', status, {profile: prof, target, label, pos, spo2: n.spo2, sources: O2_SOURCES, msgs, src: [45, 47, 52]});
    }
    /* Anne ve fetüs ayrımı [G-R13, G-R14] [50][55] */
    if (n.fetal_assessment !== 'unknown' || n.maternal_hypoxia !== 'unknown' || has(n.spo2) || has(n.pao2)) {
      const msgs = ['maternal_not_fetal', 'no_fetal_ph'];
      if (n.fetal_assessment === 'concern' && n.maternal_hypoxia === 'no') { rule('G-R13'); msgs.unshift('fetal_no_routine_o2'); }
      if (n.maternal_hypoxia === 'no' || (has(n.spo2) && n.spo2 >= 95)) rule('G-R14');
      M('fetal', n.fetal_assessment === 'concern' ? 'gozden_gecirilmeli' : 'hesaplandi', {fa: n.fetal_assessment, mh: n.maternal_hypoxia, msgs, src: [25, 50, 55]});
    }
    /* PE: kan gazı dışlamaz [G-R15] [53] */
    if (n.pe_suspected === 'yes') { rule('G-R15'); M('pe', 'gozden_gecirilmeli', {msgs: ['pe_not_excluded'], src: [53]}); }
    /* Oksijen basıncı ≠ oksijen sunumu [G-R18] [2][12] */
    if (n.bleeding === 'yes' || has(n.hb)) { if (n.bleeding === 'yes' || (has(n.pao2) && has(n.hb))) rule('G-R18'); M('o2delivery', 'gozden_gecirilmeli', {hb: n.hb, bleeding: n.bleeding, msgs: ['o2_delivery_not_pao2', 'no_transfusion_order'], src: [2, 12]}); }
    /* Sepsis: SMFM ve NICE yüksek risk dalı; tam algoritma değil [G-R11, G-R12, G-R23] [46][57] */
    if (n.infection !== 'unknown' || n.organ_dysfunction !== 'unknown' || n.sepsis_high_risk !== 'unknown' || has(n.sbp)) {
      const msgs = [];
      if (n.infection === 'yes' && n.organ_dysfunction === 'yes') { rule('G-R12'); msgs.push('sepsis_consider_smfm'); }
      /* En güncel ölçüm: kronolojik sıra varsa son zaman; yoksa son giriş (etiketlenir) [F07] */
      const lac = n.lactates.length && n.lac_order !== 'tie' ? n.lactates[n.lactates.length - 1].v : null;
      if (n.lactates.length > 1 && n.lac_order !== 'time') msgs.push('lac_latest_entry');
      let branch = null;
      if (n.sepsis_high_risk === 'yes' && n.infection === 'yes') {
        // NICE NG255 recommendation 1.7.4: systolic BP ≤90; the visual summary abbreviates this as <90.
        const lacHit = lac != null ? r4(lac) > 4 : null, sbpHit = has(n.sbp) ? r4(n.sbp) <= 90 : null;
        branch = lacHit === true || sbpHit === true ? 'met' : lacHit === false && sbpHit === false ? 'not_met' : 'missing';
        msgs.push(branch === 'met' ? 'nice_branch_met' : branch === 'not_met' ? 'nice_branch_not_met' : 'nice_branch_missing');
      } else { rule('G-R23'); msgs.push('nice_needs_context'); }
      msgs.push('sepsis_no_exclusion', 'no_fluid_order');
      M('sepsis', branch === 'met' ? 'gozden_gecirilmeli' : 'hesaplandi', {branch, lac, sbp: n.sbp, msgs, src: [46, 57]});
    }
  }

  /* Eksik bilgiler yalnız son durumu "veri eksik" olan modüllerin gereksinimlerinden toplanır [F08];
     uygulanamaz modüllerin eski kayıtları listeye girmez. Hiç veri girilmemiş bağlam modülleri (DKA, laktat) listelenmez. */
  /* ---------- Numune ve ölçüm kalitesi (5. tur) ----------
     Bilinen hata, olası etki ve eksik kalite bilgisi ayrı listelenir. Puan, otomatik ret, düzeltme formülü ya da evrensel süre sınırı yoktur.
     Hesaplar durdurulmaz; etkilenebilecek modüllere yalnız not eklenir (durumları değişmez). Kaynaklar atlas numaralarıyla. */
  const AFFECT = {
    po2: ['pf', 'aa', 'oi', 'cao2'], pco2: ['hh', 'ph', 'proc', 'co2rel', 'aa'], ph: ['hh', 'ph', 'proc', 'dka'], hco3: ['hh', 'proc', 'ag', 'agc', 'delta', 'agk', 'dka'],
    lytes: ['ag', 'agc', 'delta', 'agk', 'og'], glucose: ['dka', 'og'], sat: ['cao2', 'dyshb', 'osi', 'o2target'], thb: ['cao2', 'o2delivery'], lactate: ['lactate', 'sepsis', 'lacgap'], be: ['base']
  };
  function sampleQuality(n, R, rule, M) {
    const known = [], possible = [], unknown = [];
    const add = (list, code, field, params, src, rid) => { list.push({code, field, params, src}); if (rid) rule(rid); };
    if (n.q_bubble === 'yes') add(known, 'q_bubble', 'q_bubble', ['po2', 'pco2', 'ph', 'sat'], [60, 61], 'N-R01'); else if (n.q_bubble === 'unknown') unknown.push('q_bubble');
    if (n.q_heparin === 'liquid') add(known, 'q_heparin_liquid', 'q_heparin', ['pco2', 'hco3', 'lytes'], [60, 62, 63], 'N-R02'); else if (n.q_heparin === 'unknown') unknown.push('q_heparin');
    if (n.q_clot === 'yes') add(known, 'q_clot', 'q_clot', ['thb'], [60], 'N-R03'); else if (n.q_clot === 'unknown') unknown.push('q_clot');
    if (n.q_hemolysis === 'positive') add(known, 'q_hemolysis', 'q_hemolysis', [], [65, 66], 'N-R04');
    else if (n.q_hemolysis !== 'negative') { unknown.push('q_hemolysis'); if (has(n.k)) add(possible, 'q_hemolysis_unknown_k', 'q_hemolysis', [], [65, 66], 'N-R05'); }
    if (n.q_catheter === 'yes') {
      if (n.q_flush === 'glucose') add(known, 'q_flush_glucose', 'q_flush', ['glucose'], [64], 'N-R06');
      else if (n.q_flush !== 'saline') { unknown.push('q_flush'); add(possible, 'q_flush_unknown', 'q_flush', ['glucose'], [64], 'N-R07'); }
    } else if (n.q_catheter === 'unknown') unknown.push('q_catheter');
    /* Gecikme: süre gösterilir; kurum protokolü girildiyse yalnız onunla karşılaştırılır (evrensel süre yok) */
    const delay = n.t_sample != null && n.t_analysis != null && n.t_analysis >= n.t_sample ? (n.t_analysis - n.t_sample) / 6e4 : null;
    if (delay == null) unknown.push('analysis_time');
    else if (has(n.protocol_minutes)) { if (delay > n.protocol_minutes) add(known, 'q_delay_protocol', 'analysis_time', ['po2', 'pco2', 'ph', 'lactate', 'glucose'], [1, 21, 59, 70], 'N-R08'); }
    else { unknown.push('protocol_minutes'); rule('N-R09'); }
    if (n.q_storage === 'unknown' && delay != null) unknown.push('q_storage');
    if (['pneumatic_unvalidated', 'pneumatic_unknown'].includes(n.q_transport)) add(possible, 'q_transport', 'q_transport', ['po2'], [21, 59], 'N-R10');
    else if (n.q_transport === 'unknown') unknown.push('q_transport');
    /* Son destek değişikliği ile örnek arası: kaynak önerisi gösterilir, örnek "bozuk" sayılmaz */
    const supportMin = n.t_support != null && n.t_sample != null ? (n.t_sample - n.t_support) / 6e4 : null;
    if (supportMin != null && supportMin >= 0) rule('N-R11');
    if (n.q_hydroxocobalamin === 'yes') add(possible, 'q_hydroxo', 'q_hydroxocobalamin', ['sat'], [75], 'N-R12');
    if (n.q_leukocytosis === 'yes') add(possible, 'q_leuko', 'q_leukocytosis', ['po2'], [72], 'N-R13');
    if (has(n.tco2) && has(n.hco3_actual)) { rule('N-R14'); add(possible, 'q_tco2_hco3', 'tco2', ['hco3'], [74, 78]); }
    if (n.q_device_error === 'yes') add(known, 'q_device_error', 'q_device_error', [], [1, 58], 'N-R15');
    if (n.q_manual === 'yes') add(possible, 'q_manual', 'q_manual', [], [77], 'N-R16');
    let cord = null;
    if (R.scope === 'cord') {
      const mins = (a, b) => a != null && b != null && b >= a ? (b - a) / 6e4 : null;
      cord = {birthToClamp: mins(n.t_birth, n.t_clamp), clampToSample: mins(n.t_clamp, n.t_sample), sampleToAnalysis: delay};
      rule('N-R17'); if (n.t_clamp == null) unknown.push('cord_clamp_time');
    }
    rule('N-R18');
    const msgs = ['q_three_lists', 'q_no_score'];
    M('sample', known.length ? 'gozden_gecirilmeli' : 'hesaplandi', {known, possible, unknown, delay, protocol: n.protocol_minutes, supportMin, cord,
      hemolysis: n.q_hemolysis, msgs, src: [1, 21, 58, 59, 60, 77]});
    /* Etkilenebilecek modüllere not (durum değişmez) */
    for (const w of [...known, ...possible]) for (const prm of w.params) for (const mid of AFFECT[prm] || []) {
      const m = R.modules[mid]; if (!m) continue;
      const code = 'aff_' + w.code; if (!m.msgs.includes(code)) m.msgs.push(code);
      m.src = [...new Set([...(m.src || []), ...w.src])];
    }
  }

  /* [R02] Hiçbir modül sonlu olmayan sayı (NaN, ±Infinity) taşımaz: böyle bir değer bulunursa sayı kaldırılır,
     modül "gözden geçirilmeli" olur ve türeyen etiketler (şiddet, sınıf, konum) silinir. */
  function finiteGuard(R) {
    const bad = v => typeof v === 'number' && !Number.isFinite(v);
    const scan = o => o && typeof o === 'object' ? Object.values(o).some(v => bad(v) || scan(v)) : false;
    const strip = o => { for (const k of Object.keys(o)) { if (bad(o[k])) o[k] = null; else if (o[k] && typeof o[k] === 'object') strip(o[k]); } };
    for (const m of Object.values(R.modules)) if (scan(m)) {
      strip(m); m.status = 'gozden_gecirilmeli';
      for (const k of ['sev', 'cls', 'dir', 'pos', 'crit', 'hyps', 'ratio', 'gap', 'value', 'calc', 'diff']) if (k in m) m[k] = null;
      if (!m.msgs.includes('calc_not_finite')) m.msgs.unshift('calc_not_finite');
    }
  }
  function finalizeMissing(R) {
    const skip = m => (m.id === 'dka' && !m.anyInput) || m.id === 'lactate';
    R.missing = Object.values(R.modules).filter(m => (m.status === 'veri_eksik' || m.status === 'gozden_gecirilmeli') && m.need && m.need.length && !skip(m))
      .flatMap(m => m.need.map(f => ({field: f, mod: m.id})));
  }

  /* ---------- BE/BD: algoritma ve işaret saklanır [P-R11] [16][36] ---------- */
  /* ---------- 7. tur: erişkin hiperkapni bağlamı (K-R01–K-R12) ----------
     Eğitim kartıdır: tanı, tedavi, NIV/entübasyon, cihaz ayarı, ev NIV'si ya da ev oksijeni çıktısı üretmez.
     Açılış koşulu PCO₂'nin kompansasyon formüllerinin başlangıç noktasının (40 mmHg) üzerinde olmasıdır; bu bir hiperkapni ya da tedavi eşiği değildir.
     Kronik beklenti mevcut 0,35 katsayısıyla kalır; 0,48 eğimi yalnız öğretilir [91]. ERS/ATS [90] ve BTS [83] koşulları birleştirilmez. */
  function hcapModule(n, R, rule, M, {arterial, venous, ped, preg, st}) {
    const ctxGiven = n.copd_confirmed !== 'unknown' || n.hc_phase !== 'unknown' || has(n.prior_pco2) || has(n.prior_hco3);
    if (ped || preg) { if (ctxGiven) { rule('K-R12'); M('hcap', 'uygulanamaz', {msgs: [ped ? 'hc_scope_ped' : 'hc_scope_preg'], src: []}); } return; }
    if (!has(n.pco2) || n.pco2 <= 40) { if (ctxGiven) M('hcap', 'veri_eksik', {need: has(n.pco2) ? [] : ['pco2'], msgs: [has(n.pco2) ? 'hc_not_open' : 'hc_need_pco2'], src: []}); return; }
    const msgs = ['hc_open_note'], src = new Set([102]);
    /* K-R01: etiyoloji açık; kan gazından KOAH tanısı yok */
    rule('K-R01'); msgs.push(n.copd_confirmed === 'yes' ? 'hc_copd_user' : 'hc_etiology_open'); src.add(100);
    /* K-R02: örnek türü */
    if (!arterial) { rule('K-R02'); msgs.push(venous ? 'hc_venous' : 'hc_sample_other'); src.add(71);
      M('hcap', 'gozden_gecirilmeli', {arterial: false, pco2: n.pco2, msgs: [...msgs, 'hc_no_arterial_frame'], src: [...src]}); return; }
    const ph = R.modules.ph, dir = ph && ph.dir, susp = R.suspended;
    const hyp = R.modules.proc && R.modules.proc.hyps ? R.modules.proc.hyps.find(h => h.id === 'resp_acid') : null;
    /* K-R03: önceki stabil gaz */
    let base = null;
    if (has(n.prior_pco2) && has(n.prior_hco3)) {
      base = {pco2: n.prior_pco2, hco3: n.prior_hco3, dpco2: n.pco2 - n.prior_pco2, dhco3: has(n.hco3_actual) ? n.hco3_actual - n.prior_hco3 : null, arterial: n.prior_arterial, stable: n.prior_stable};
      msgs.push(n.prior_arterial === 'yes' && n.prior_stable === 'yes' ? 'hc_vs_baseline' : 'hc_baseline_limited');
    } else { rule('K-R03'); msgs.push('hc_no_baseline'); }
    src.add(91);
    if (susp) msgs.push('hc_suspended');
    else if (hyp) {
      /* Kronik uyum yalnız olasılık dilidir; ek metabolik süreç dışlanmaz */
      if (hyp.pos === 'below') msgs.push('hc_hco3_below');
      else if (hyp.pos === 'above') msgs.push('hc_chronic_possible', 'hc_hco3_above');
      else msgs.push(hyp.nearer === 'acute' ? 'hc_acute_possible' : 'hc_chronic_possible');
    }
    msgs.push('hc_coef_note');
    /* K-R04: böbrek / diüretik / alkali / kusma bağlamı */
    const mctx = [n.hc_renal, n.hc_diuretic, n.hc_alkali_vomit];
    if (mctx.includes('yes')) { msgs.push('hc_metab_ctx_present'); src.add(97); }
    if (mctx.includes('unknown')) { rule('K-R04'); msgs.push('hc_metab_ctx_unknown'); }
    /* K-R05 / K-R06: pH yönü (mevcut erişkin pH referansı) */
    if (!susp && dir === 'acidemia') { rule('K-R05'); msgs.push('hc_acidemia'); src.add(90); src.add(83); }
    if (!susp && dir === 'within') { rule('K-R06'); msgs.push('hc_normal_ph'); }
    /* K-R07: satürasyon ventilasyonu göstermez */
    if (has(n.spo2) || n.saturation_type === 'spo2' || n.o2_support === 'supplemental') { rule('K-R07'); msgs.push('hc_spo2_separate'); src.add(52); }
    /* K-R11: akut gazdan uzun dönem karar çıkmaz */
    if (n.hc_phase === 'exacerbation') { rule('K-R11'); msgs.push('hc_acute_not_longterm'); src.add(95); src.add(96); }
    msgs.push('hc_no_treatment');
    M('hcap', susp ? 'gozden_gecirilmeli' : 'hesaplandi', {arterial: true, pco2: n.pco2, dir, base, msgs, src: [...src].sort((a, b) => a - b)});
  }

  /* ---------- 8–10. tur: böbrek/diyaliz, toksikoloji, karma bozukluk (B-R, T-R, M-R) ----------
     Bütün kartlar eğitim kartıdır: AKI evresi, RTA alt tipi, sitrat toksisitesi, zehir tanısı, "normal OG" ya da "dışlandı" etiketi,
     antidot, diyaliz/KRT kararı, akış ayarı ya da doz üretmez. Bağlam alanları kullanıcının klinik olarak doğruladığı bilgidir; gazdan doldurulmaz.
     Sıra: geçerlilik (birim, örnek yeri, eşzamanlılık) → aritmetik → kaynak profili notu. "Bilinmiyor" hiçbir zaman "hayır" sayılmaz.
     Asit–baz alanında hata, HH uyumsuzluğu ya da karışık sıcaklık varsa asit–baza dayanan özel notlar üretilmez [M-R01]. Kaynaklar atlas numaralarıyla. */
  const AB_ERR_FIELDS = ['ph', 'pco2', 'hco3_actual'];
  function r810Modules(n, R, rule, M, {ped, neo, preg, classify, arterial, agMethod, dec = {}}) {
    const abBad = R.suspended || R.errors.some(e => AB_ERR_FIELDS.includes(e.field));
    const special = ped || preg;          // erişkin dışı ya da gebelik: yalnız aritmetik ve kapsam notu [B-R12, M-R10]
    const dir = !abBad && R.modules.ph && R.modules.ph.dir;
    const hypList = !abBad && R.modules.proc && R.modules.proc.hyps ? R.modules.proc.hyps : [], hyps = hypList.map(h => h.id);
    const metAcid = hypList.find(h => h.id === 'met_acid');
    const assume = classify && n.maternal_context === 'unknown';
    const r4 = v => Math.round(v * 1e4) / 1e4;

    /* B-R01, B-R02, B-R07, B-R12 · Renal bağlam */
    if (n.renal_context !== 'unknown' || n.krt_modality !== 'unknown') {
      const msgs = [], src = new Set([84, 104]);
      if (['AKI', 'CKD', 'AKI_on_CKD', 'unspecified'].includes(n.renal_context)) { rule('B-R01'); msgs.push('renal_ctx_user', 'renal_no_staging'); }
      else if (n.renal_context === 'none') msgs.push('renal_ctx_none');
      else msgs.push('renal_ctx_unknown');
      if (ped) { rule('B-R12'); msgs.push('renal_scope_ped'); src.add(111); src.add(113); }
      else if (preg) { rule('B-R12'); msgs.push('renal_preg_egfr'); src.add(112); }
      else if (n.renal_context !== 'none' && n.renal_context !== 'unknown') {
        /* pH yönü metabolik asidozla çelişiyorsa (alkalemi) aday notu yerine "düşük HCO₃ tek başına asidoz değildir" notu */
        if (metAcid && metAcid.align !== 'opposite') { rule('B-R02'); msgs.push('renal_met_acid_candidate'); src.add(3); }
        else if (metAcid) { rule('B-R02'); msgs.push('renal_hco3_not_alone'); src.add(3); }
        if (R.modules.ag && R.modules.ag.value != null) msgs.push('renal_ag_other_causes');
        if (['AKI', 'AKI_on_CKD'].includes(n.renal_context) && dir === 'acidemia') { rule('B-R07'); msgs.push('renal_bicarb_evidence'); src.add(105); src.add(106); }
        if (has(n.k) && n.k_drug_context === 'yes') { rule('B-R05'); msgs.push('renal_k_drug_context'); src.add(129); }
      }
      if (['IHD', 'CKRT', 'prolonged', 'PD'].includes(n.krt_modality)) { rule('B-R06'); msgs.push('krt_under_treatment'); src.add(107); }
      msgs.push('renal_info_needed', 'renal_no_treatment');
      M('renal', 'hesaplandi', {ctx: n.renal_context, krt: n.krt_modality, msgs, src: [...src].sort((a, b) => a - b)});
    }

    /* B-R03, B-R04 · İdrar anyon açıklığı: üç idrar elektroliti aynı örnekte; eksik K sıfır sayılmaz */
    if (has(n.urine_na) || has(n.urine_k) || has(n.urine_cl)) {
      rule('B-R03');
      const need = ['urine_na', 'urine_k', 'urine_cl'].filter(k => !has(n[k]));
      const src = [110, 111, 132];
      if (need.length) M('uag', 'veri_eksik', {need, msgs: ['uag_no_zero_fill'], src});
      else if (n.urine_same_sample === 'no') M('uag', 'uygulanamaz', {msgs: ['uag_not_same_sample'], src});
      else {
        const v = F2.uag(n.urine_na, n.urine_k, n.urine_cl), msgs = [];
        if (n.urine_same_sample !== 'yes') msgs.push('uag_same_unknown');
        msgs.push('uag_not_ammonium');
        if (['CKD', 'AKI_on_CKD'].includes(n.renal_context)) { rule('B-R04'); msgs.push('uag_ckd_limit'); }
        else if (n.renal_context === 'unknown') { rule('B-R04'); msgs.push('uag_renal_unknown'); }
        msgs.push('uag_no_subtype');
        M('uag', n.urine_same_sample === 'yes' ? 'hesaplandi' : 'gozden_gecirilmeli', {value: v, una: n.urine_na, uk: n.urine_k, ucl: n.urine_cl, formula: 'uag', msgs,
          need: n.urine_same_sample === 'yes' ? undefined : ['urine_same_sample'], src});
      }
    }
    /* B-R05 · İdrar pH ya da klorür: örnek zamanı, diüretik, alkali ve enfeksiyon bağlamı; "bilinmiyor" yok sayılmaz */
    if (has(n.urine_ph) || has(n.urine_cl)) {
      rule('B-R05');
      const msgs = [], unknown = ['diuretic_recent', 'alkali_given', 'urine_infection'].filter(k => n[k] === 'unknown');
      if (has(n.urine_ph)) msgs.push('urine_ph_not_rta');
      if (has(n.urine_cl)) msgs.push('urine_cl_no_class');
      if (n.diuretic_recent === 'yes') msgs.push('urine_diuretic_limit');
      if (n.alkali_given === 'yes') msgs.push('urine_alkali_limit');
      if (n.urine_infection === 'yes') msgs.push('urine_infection_limit');
      if (unknown.length) msgs.push('urine_ctx_unknown');
      msgs.push('urine_no_prescription');
      M('urine', unknown.length ? 'gozden_gecirilmeli' : 'hesaplandi', {uph: n.urine_ph, ucl: n.urine_cl, need: unknown.length ? unknown : undefined, msgs, src: [111, 127, 132]});
    }

    /* B-R08–B-R11 · Sistemik total Ca / iCa: iki sistemik, eşzamanlı, açıkça mmol/L; filtre sonrası iCa hasta oranına girmez.
       2026 Delphi profili (≥2,5) yalnız RCA doğrulanmışsa bağlamsal şüphe notu; 2023 ifadesi (>2,5) derste ayrı tutulur. */
    if (has(n.total_ca) || has(n.ionized_ca) || n.rca_confirmed === 'yes' || R.errors.some(e => e.field === 'ionized_ca' || e.field === 'total_ca')) {
      rule('B-R08');
      const src = [108, 109], need = [];
      if (!has(n.total_ca)) need.push('total_ca'); if (!has(n.ionized_ca)) need.push('ionized_ca');
      const icaErr = R.errors.some(e => e.field === 'ionized_ca');
      if (icaErr) rule('B-R09');
      if (need.length) M('caratio', icaErr ? 'gozden_gecirilmeli' : 'veri_eksik', {ratio: null, need, msgs: [...(icaErr ? ['ca_ica_invalid'] : []), 'ca_need_pair'], src});
      else if (n.total_ca_site === 'postfilter' || n.ionized_ca_site === 'postfilter') M('caratio', 'uygulanamaz', {ratio: null, msgs: ['ca_postfilter'], src});
      else if (n.total_ca_site !== 'systemic' || n.ionized_ca_site !== 'systemic') M('caratio', 'veri_eksik', {ratio: null, need: ['total_ca_site', 'ionized_ca_site'].filter(k => n[k] !== 'systemic'), msgs: ['ca_site_unknown'], src});
      else if (n.total_ca_unit === 'unknown' || n.ionized_ca_unit === 'unknown') { rule('B-R09'); M('caratio', 'veri_eksik', {ratio: null, need: ['total_ca_unit', 'ionized_ca_unit'].filter(k => n[k] === 'unknown'), msgs: ['ca_unit_unknown'], src}); }
      else if (n.total_ca_unit !== 'mmol/L' || n.ionized_ca_unit !== 'mmol/L') { rule('B-R09'); M('caratio', 'uygulanamaz', {ratio: null, msgs: [n.total_ca_unit !== n.ionized_ca_unit ? 'ca_unit_mismatch' : 'ca_unit_not_mmol'], src}); }
      else if (n.ca_concurrent === 'no') M('caratio', 'uygulanamaz', {ratio: null, msgs: ['ca_not_concurrent'], src});
      else {
        /* [1.8 kontrolü R18-01] Kaynak sınırı (≥2,5; tam 2,5) yuvarlanmış oranla değil, girilen değerlerin kendisiyle karşılaştırılır.
           Kayan nokta bölmesi (ör. 2,75 / 1,1) yerine girilen ondalık basamaklarla tam sayı karşılaştırması: total/iCa ≥ 5/2 ⇔ 2·total ≥ 5·iCa.
           Bu yeni bir tolerans değildir; yuvarlama yalnız ekrandadır. */
        const ratio = F2.systemic_total_ica_ratio(n.total_ca, n.ionized_ca), msgs = [];
        const dp = Math.min(12, Math.max(dec.total_ca || 0, dec.ionized_ca || 0)), sc = 10 ** dp;
        const lhs = 2 * Math.round(n.total_ca * sc), rhs = 5 * Math.round(n.ionized_ca * sc);
        const atOrAbove = lhs >= rhs, exactly = lhs === rhs;
        let status = 'hesaplandi';
        if (n.ca_concurrent !== 'yes') { status = 'gozden_gecirilmeli'; msgs.push('ca_concurrency_unknown'); }
        else if (special) msgs.push('rca_scope_special');
        else if (n.rca_confirmed !== 'yes') { rule('B-R10'); msgs.push('rca_not_confirmed'); }
        else {
          rule('B-R10');
          if (atOrAbove) { msgs.push('rca_2026_met'); status = 'gozden_gecirilmeli'; } else msgs.push('rca_2026_not_met');
          if (exactly) msgs.push('rca_2023_boundary');
          if (n.calcium_need_trend === 'rising') msgs.push('rca_ca_need_rising');
          else if (n.calcium_need_trend === 'unknown') msgs.push('rca_trend_unknown');
          if (dir === 'alkalemia') { rule('B-R11'); msgs.push('rca_alkalemia_ddx'); src.push(131); }
        }
        msgs.push('ca_ratio_not_dx');
        M('caratio', status, {ratio, atOrAbove2_5: atOrAbove, exactly2_5: exactly, tca: n.total_ca, ica: n.ionized_ca, rca: n.rca_confirmed, assume: assume && msgs.includes('rca_2026_met'), formula: 'systemic_total_ica_ratio', msgs, need: n.ca_concurrent !== 'yes' ? ['ca_concurrent'] : undefined, src});
      }
    }

    /* T-R05 · Potasyumlu AG (EXTRIP etilen glikol tanımı); potasyumsuz AG ve albümin düzeltilmiş AG ile aynı alan değildir */
    const egCtx = n.tox_agent === 'ethylene_glycol' || n.tox_agent === 'toxic_alcohol';
    if (has(n.k) || egCtx) {
      const ag = R.modules.ag, bic = agMethod === 'tco2' ? n.tco2 : agMethod === 'gas_hco3' ? n.hco3_actual : null;
      if (!has(n.k)) { if (ag && ag.value != null) { rule('T-R05'); M('agk', 'veri_eksik', {need: ['k'], msgs: ['agk_k_missing'], src: [117]}); } }
      else if (ag && ag.value != null && bic != null) {
        rule('T-R05');
        const v = F2.ag_with_k(n.na, n.k, n.cl, bic), msgs = ['agk_definition', 'agk_not_interchangeable'];
        if (agMethod === 'gas_hco3') msgs.push('ag_gas_hco3');
        M('agk', ag.status === 'gozden_gecirilmeli' && ag.msgs.includes('mixed_times') ? 'gozden_gecirilmeli' : 'hesaplandi', {value: v, method: agMethod, formula: 'ag_with_k', msgs, src: [116, 117]});
      }
    }

    /* T-R02, T-R03, T-R04 · Osmolal açıklık: profil, birim ve eşzamanlılık açık; etanol bilinmiyorsa 0 sayılmaz; tek azot analiti.
       Evrensel OG normal aralığı yoktur: "normal" ya da "dışlandı" etiketi hiçbir koşulda üretilmez. */
    if (has(n.measured_osmolality) || has(n.ethanol) || has(n.bun) || has(n.urea) || n.og_profile !== 'none' || R.errors.some(e => e.field === 'measured_osmolality')) {
      rule('T-R02');
      const src = [119, 120, 121], need = [];
      if (has(n.bun) && has(n.urea)) M('og', 'gozden_gecirilmeli', {value: null, msgs: ['og_two_nitrogen', 'og_not_exclude'], src});
      else {
        if (!has(n.na)) need.push('na');
        if (!has(n.glucose)) need.push('glucose'); else if (!n.glucose_unit_given) need.push('glucose_unit');
        if (!has(n.bun) && !has(n.urea)) need.push('bun');
        if (!has(n.measured_osmolality)) need.push('measured_osmolality');
        if (!has(n.ethanol)) need.push('ethanol');
        if (n.osm_concurrent === 'no') M('og', 'uygulanamaz', {value: null, msgs: ['og_not_concurrent', 'og_not_exclude'], src});
        else if (need.length) { const noEth = need.includes('ethanol'); M('og', 'veri_eksik', {value: null, need, msgs: [...(noEth ? ['og_ethanol_unknown'] : []), 'og_no_zero_fill', 'og_not_exclude'], src}); }
        else {
          const glu = n.glucose_unit === 'mmol/L' ? n.glucose : n.glucose / 18, nit = has(n.bun) ? n.bun / 2.8 : n.urea;
          const calc = F2.serum_osm_calculated(n.na, glu, nit), e = n.ethanol;
          const ideal = F2.serum_og_ideal_ethanol(n.measured_osmolality, calc, e), purs = F2.serum_og_purssell_regression(n.measured_osmolality, calc, e);
          const msgs = [];
          let status = n.osm_concurrent === 'yes' ? 'hesaplandi' : 'gozden_gecirilmeli', value = null, used = null;
          if (n.osm_concurrent !== 'yes') msgs.push('og_concurrency_unknown');
          if (e === 0) { value = ideal; used = 'ethanol_zero'; msgs.push('og_ethanol_zero'); }
          else {
            rule('T-R03');
            if (n.og_profile === 'none') { status = 'gozden_gecirilmeli'; msgs.push('og_profile_needed'); }
            else { used = n.og_profile; value = n.og_profile === 'ideal_4_6' ? ideal : purs; msgs.push(n.og_profile === 'ideal_4_6' ? 'og_profile_ideal' : 'og_profile_purssell'); }
            if (F2.ethanol_purssell_term(e) < 0) msgs.push('og_purssell_negative');
          }
          if (value != null && value < 0) { status = 'gozden_gecirilmeli'; msgs.push('og_negative'); }
          rule('T-R04');
          if (n.tox_suspicion === 'yes') msgs.push('og_suspicion_not_excluded');
          if (special) msgs.push('og_scope_special');
          msgs.push('og_no_normal', 'og_not_exclude');
          M('og', status, {value, used, calc, ideal, purssell: purs, measured: n.measured_osmolality, ethanol: e, glu, nit, nitKind: has(n.bun) ? 'bun' : 'urea', gluUnit: n.glucose_unit,
            formula: ['serum_osm_calculated', 'serum_og_ideal_ethanol', 'serum_og_purssell_regression'], need: n.osm_concurrent !== 'yes' ? ['osm_concurrent'] : undefined, msgs, src});
        }
      }
    }

    /* T-R07 · Salisilat düzeyi: birim zorunlu; mg/L ÷ 10 = mg/dL. EXTRIP eşikleriyle otomatik sınıflama yok */
    if (has(n.salicylate_value)) {
      rule('T-R07');
      if (n.salicylate_unit === 'unknown') M('salicylate', 'veri_eksik', {mgdl: null, need: ['salicylate_unit'], msgs: ['sal_unit_needed'], src: [114]});
      else {
        const mgdl = n.salicylate_unit === 'mg/L' ? F2.salicylate_mg_l_to_mg_dl(n.salicylate_value) : n.salicylate_value, msgs = ['sal_units_shown'];
        if (dir === 'acidemia') msgs.push('sal_acidemia_context');
        if (dir === 'within') msgs.push('sal_normal_ph_not_normal');
        msgs.push('sal_level_not_alone', 'sal_no_threshold_class');
        if (special) msgs.push('tox_scope_special');
        M('salicylate', 'hesaplandi', {mgdl, mgl: mgdl * 10, input: n.salicylate_value, unit: n.salicylate_unit, formula: 'salicylate_mg_l_to_mg_dl', msgs, src: [114, 115]});
      }
    }

    /* T-R09 · İki yöntemli laktat farkı: eşzamanlılık doğrulanmadan analitik girişim denmez; evrensel fark eşiği yok */
    if (has(n.lactate_method_a) || has(n.lactate_method_b)) {
      rule('T-R09');
      const need = ['lactate_method_a', 'lactate_method_b'].filter(k => !has(n[k]));
      if (need.length) M('lacgap', 'veri_eksik', {need, src: [122]});
      else {
        const diff = F2.lactate_method_gap(n.lactate_method_a, n.lactate_method_b);
        const msgs = [n.lactate_methods_concurrent === 'yes' ? 'lacgap_method_note' : n.lactate_methods_concurrent === 'no' ? 'lacgap_not_concurrent' : 'lacgap_concurrency_unknown', 'lacgap_no_threshold'];
        M('lacgap', n.lactate_methods_concurrent === 'yes' ? 'hesaplandi' : 'gozden_gecirilmeli', {diff, a: n.lactate_method_a, b: n.lactate_method_b, formula: 'lactate_method_gap',
          need: n.lactate_methods_concurrent === 'yes' ? undefined : ['lactate_methods_concurrent'], msgs, src: [122]});
      }
    }

    /* T-R01, T-R06, T-R10–T-R12 · Maruziyet bağlamı: şüphe tanı değildir; "bilinmiyor" maruziyet yok demek değildir.
       Şüphe varsa klinik/toksikoloji değerlendirmesi bu formun tamamlanmasını beklemez [T01]. */
    if (n.tox_suspicion !== 'unknown' || n.tox_agent !== 'unknown' || n.organic_acid_context !== 'unknown' || n.acetone !== 'unknown' || n.tox_antidote !== 'unknown') {
      rule('T-R01');
      const msgs = [], src = new Set([114, 116, 117]);
      let urgent = false;
      if (n.tox_suspicion === 'yes') { msgs.push('tox_no_delay'); if (n.clinical_worsening === 'yes') { urgent = true; msgs.unshift('tox_worsening_urgent'); } }
      else if (n.tox_suspicion === 'unknown') msgs.push('tox_unknown_not_negative');
      else msgs.push('tox_no_reported');
      const A = n.tox_agent;
      if (A === 'methanol') { msgs.push('tox_methanol_ag_def'); src.add(116); }
      if (A === 'ethylene_glycol') { msgs.push('tox_eg_ag_def'); src.add(117); }
      if (A === 'toxic_alcohol') msgs.push('tox_alcohol_unspecified');
      if (['methanol', 'ethylene_glycol', 'toxic_alcohol'].includes(A) && n.tox_antidote === 'unknown') msgs.push('tox_antidote_unknown');
      if (A === 'salicylate') { msgs.push('tox_salicylate_context'); src.add(115); if (n.tox_acute_chronic === 'chronic' || n.tox_acute_chronic === 'acute_on_chronic') msgs.push('tox_salicylate_chronic'); }
      if (A === 'metformin') { rule('T-R11'); msgs.push('tox_metformin_context'); src.add(118); }
      if (A === 'isopropanol' || n.acetone === 'positive') {
        rule('T-R12'); msgs.push('tox_isopropanol_context'); src.add(130);
        if (!has(n.beta_hydroxybutyrate)) msgs.push('tox_bhb_not_measured');
      }
      if (A === 'co' || A === 'smoke') { rule('T-R10'); msgs.push('tox_co_spo2'); src.add(13); if (!has(n.cohb)) msgs.push('tox_coox_needed'); if (preg) msgs.push('tox_co_preg'); }
      if (A === 'smoke') { rule('T-R11'); msgs.push('tox_smoke_context'); src.add(123); if (n.lactates.length) msgs.push('tox_lactate_not_cyanide'); }
      if (A === 'propylene_glycol' || n.organic_acid_context === 'propylene_glycol') { rule('T-R11'); msgs.push('tox_pg_context'); src.add(124); }
      if (n.organic_acid_context === 'short_bowel') { rule('T-R11'); msgs.push('oa_dlactate'); src.add(126); }
      if (n.organic_acid_context === 'oxoproline') { rule('T-R11'); msgs.push('oa_oxoproline'); src.add(125); }
      if (A === 'other') msgs.push('tox_other');
      if (['fomepizole', 'ethanol', 'other'].includes(n.tox_antidote)) msgs.push('tox_antidote_context');
      if (special) msgs.push('tox_scope_special');
      rule('T-R06'); msgs.push('tox_no_treatment');
      M('tox', n.tox_suspicion === 'yes' || urgent ? 'gozden_gecirilmeli' : 'hesaplandi', {agent: A, suspicion: n.tox_suspicion, urgent, msgs, src: [...src].sort((a, b) => a - b)});
    }
    /* T-R10: normal görünen SpO₂ CO/MetHb'yi dışlamaz (mevcut CaO₂ kapatma politikası değişmez) */
    if (R.modules.dyshb && has(n.spo2) && !R.modules.dyshb.msgs.includes('spo2_unreliable')) { rule('T-R10'); R.modules.dyshb.msgs.push('spo2_unreliable'); }
  }

  function baseModule(n, R, rule, M) {
    if (!has(n.be)) return;
    const known = n.be_type !== 'unknown';
    if (!known) rule('P-R11');
    M('base', known ? 'hesaplandi' : 'gozden_gecirilmeli', {value: n.be, type: n.be_type, msgs: [known ? 'base_known' : 'base_unknown', 'base_no_threshold', 'no_bicarb_dose'], src: [16, 17, 36]});
  }

  /* ---------- Yaş aritmetiği (P-F03) ----------
     Eksik ya da geçersiz gestasyon günü 0 sayılmaz [F06]; doğum/örnek zamanından hesaplanan gün ile elle girilen gün çelişirse hesap yapılmaz. */
  function ageCalc(n, err) {
    /* [R03] Örnek zamanı doğumdan önceyse tarihten yaş üretilmez; doğum anı (0 gün) geçerlidir */
    const timeOk = n.t_birth != null && n.t_sample != null && n.t_sample >= n.t_birth, timeBad = n.t_birth != null && n.t_sample != null && n.t_sample < n.t_birth;
    const fromTimes = timeOk ? Math.floor((n.t_sample - n.t_birth) / 864e5) : null;
    let pnd = has(n.postnatal_days) ? n.postnatal_days : fromTimes, conflict = false;
    if (has(n.postnatal_days) && fromTimes != null && fromTimes !== n.postnatal_days) { conflict = true; pnd = null; if (!errOf(err, 'postnatal_days')) err.push({field: 'postnatal_days', code: 'pnd_conflict'}); }
    const mins = has(n.postnatal_minutes) ? n.postnatal_minutes : timeOk ? (n.t_sample - n.t_birth) / 6e4 : null;
    const gaOk = has(n.ga_weeks) && has(n.ga_days);
    if (timeBad) { pnd = null; conflict = true; }
    const pma = gaOk && pnd != null && !timeBad ? F['P-F03'](n.ga_weeks, n.ga_days, pnd) : null;
    return {pnd, mins: timeBad ? null : mins, pma, conflict, timeBad, pmaW: pma == null ? null : Math.floor(pma / 7), pmaD: pma == null ? null : pma % 7};
  }

  /* ---------- Çocuk ve yenidoğan modülleri ---------- */
  function pedModules(n, R, rule, M, miss, {arterial, neo, st}) {
    const A = ageCalc(n, R.errors);
    if (neo || has(n.ga_weeks)) {
      const need = A.pma == null ? [has(n.ga_weeks) ? null : 'ga_weeks', has(n.ga_days) ? null : 'ga_days', A.pnd == null && !A.conflict ? 'postnatal_days' : null].filter(Boolean) : undefined;
      M('age', A.pma != null ? 'hesaplandi' : A.conflict ? 'gozden_gecirilmeli' : 'veri_eksik', {ga: has(n.ga_weeks) && has(n.ga_days) ? [n.ga_weeks, n.ga_days] : null, pnd: A.pnd, pma: A.pma, pmaW: A.pmaW, pmaD: A.pmaD,
        need, msgs: [A.timeBad ? 'age_time_invalid' : A.conflict ? 'pnd_conflict' : null, 'age_not_threshold'].filter(Boolean), formula: 'P-F03', src: []});
    }
    /* Ölçüm geçerliliği: hesaplanabilirlik ile sınıflamaya uygunluk ayrı taşınır [F02].
       Sınıflama için destek değerleri örnekle eşzamanlı ve ölçüm kararlı olarak doğrulanmalı; "bilinmiyor" doğrulanmış sayılmaz. */
    const valid = n.support_concurrent === 'yes' && n.stable === 'yes';
    const validMsg = n.support_concurrent === 'no' ? 'oi_not_concurrent' : n.stable === 'no' ? 'index_unstable' : 'index_validity_unverified';
    /* OI: arteriyel PO2 > 0 ve ortalama HAVA YOLU basıncı; ortalama arter basıncıyla doldurulmaz [P-R01, P-R02, F01] */
    let oi = null, oiOk = false;
    if (!arterial) M('oi', 'uygulanamaz', {msgs: ['oi_not_arterial'], src: [21, 22]});
    else {
      const need = [];
      if (!has(n.paw)) { need.push('paw'); rule('P-R02'); }
      if (!has(n.fio2)) need.push('fio2'); if (!has(n.pao2)) need.push('pao2');
      if (need.length) { M('oi', 'veri_eksik', {need, msgs: need.includes('paw') ? ['oi_paw_not_map'] : [], src: FSRC['P-F01']}); }
      else {
        const v = F['P-F01'](n.fio2, n.paw, n.pao2);
        if (!Number.isFinite(v)) M('oi', 'gozden_gecirilmeli', {msgs: ['calc_not_finite'], src: FSRC['P-F01']});
        else {
          oi = v; oiOk = valid;
          const m = M('oi', valid ? 'hesaplandi' : 'gozden_gecirilmeli', {value: oi, classifiable: valid, fio2: n.fio2, paw: n.paw, pao2: n.pao2, formula: 'P-F01', msgs: ['oi_index_not_dx'], src: FSRC['P-F01']});
          if (!valid) { m.msgs.push(validMsg); if (n.support_concurrent === 'no') rule('P-R24'); }
        }
      }
    }
    /* OSI: SpO2 yüzde; PALICC-2 sınıflaması yalnız SpO2 %88–97, iyi sinyal, kararlı ve eşzamanlı ölçümde [P-R03, P-R04, F02] */
    let osi = null, osiOk = false;
    {
      const need = [];
      if (!has(n.spo2)) need.push('spo2'); if (!has(n.fio2)) need.push('fio2'); if (!has(n.paw)) need.push('paw');
      if (need.length) { M('osi', 'veri_eksik', {need, src: FSRC['P-F02']}); }
      else {
        const v = F['P-F02'](n.fio2, n.paw, n.spo2);
        if (!Number.isFinite(v)) M('osi', 'gozden_gecirilmeli', {msgs: ['calc_not_finite'], src: FSRC['P-F02']});
        else {
          osi = v;
          const msgs = ['osi_palicc_only'];
          const inRange = n.spo2 >= 88 && n.spo2 <= 97, sig = n.signal === 'good';
          if (!inRange) { rule('P-R03'); msgs.push('osi_spo2_range'); }
          if (!sig || n.stable !== 'yes') { rule('P-R04'); msgs.push('osi_signal'); }
          if (n.support_concurrent !== 'yes') msgs.push(n.support_concurrent === 'no' ? 'oi_not_concurrent' : 'index_validity_unverified');
          osiOk = inRange && sig && valid;
          if (oi != null) msgs.push(oiOk ? 'oi_preferred' : 'oi_invalid_osi_separate');
          M('osi', osiOk ? 'hesaplandi' : 'gozden_gecirilmeli', {value: osi, classifiable: osiOk, spo2: n.spo2, formula: 'P-F02', msgs, src: FSRC['P-F02']});
        }
      }
    }
    /* Ölçüm bölgesi: preduktal SpO2 ile postduktal (umbilikal arter) PaO2 birleşimi [P-R24] [29][32] */
    if ((n.spo2_site === 'right_hand' || n.spo2_site === 'right_wrist') && n.sample_site === 'umbilical_artery' && has(n.spo2) && has(n.pao2)) {
      rule('P-R24'); for (const k of ['oi', 'osi']) if (R.modules[k] && R.modules[k].value != null) R.modules[k].msgs.push('site_mismatch');
    }
    /* Sınıflamada kullanılacak indeks: geçerli OI öncelikli; OI geçersizse geçerli OSI ayrıca kullanılabilir */
    const basis = oiOk ? 'oi' : osiOk ? 'osi' : null;
    /* PARDS (PALICC-2, invaziv ventilasyon) [22] */
    if (!neo) {
      if (n.vent_type !== 'invasive') M('pards', n.vent_type === 'unknown' ? 'veri_eksik' : 'uygulanamaz', {need: n.vent_type === 'unknown' ? ['vent_type'] : undefined, msgs: [n.vent_type === 'unknown' ? 'pards_need_vent' : 'pards_imv_only'], src: [22]});
      else {
        const anyIndex = oi != null || osi != null;
        const crit = basis === 'oi' ? (oi >= 4 ? 'met' : 'not_met') : basis === 'osi' ? (osi >= 5 ? 'met' : 'not_met') : anyIndex ? 'unverified' : 'missing';
        const msgs = [{met: 'pards_crit_met', not_met: 'pards_crit_not_met', unverified: 'pards_crit_unverified', missing: 'pards_crit_missing'}[crit], 'pards_not_dx'];
        if (basis === 'osi' && oi != null) msgs.push('osi_used_oi_invalid');
        let sev = null, hold = null;
        if (!basis) hold = anyIndex ? 'pards_index_invalid' : null;
        else if (n.pards_confirmed !== 'yes') { rule('P-R05'); hold = 'pards_not_confirmed'; }
        else if (!has(n.pards_hours) || n.pards_hours < 4) { rule('P-R06'); hold = 'pards_wait_4h'; }
        else if (n.cyanotic_chd === 'yes' || n.baseline_imv === 'yes') { rule('P-R07'); hold = 'pards_special_group'; }
        else if (n.cyanotic_chd !== 'no' || n.baseline_imv !== 'no') hold = 'pards_special_unknown';
        else if (basis === 'oi') sev = oi >= 16 ? 'severe' : oi >= 4 ? 'not_severe' : null;
        else sev = osi >= 12 ? 'severe' : osi >= 5 ? 'not_severe' : null;
        if (hold) msgs.push(hold);
        M('pards', crit === 'missing' ? 'veri_eksik' : hold ? 'gozden_gecirilmeli' : 'hesaplandi', {crit, sev, hold, basis, msgs, need: crit === 'missing' ? ['oi'] : undefined, src: [22]});
      }
    }
    /* NARDS (Montreux) yalnız geçerli OI ile; RDS ≠ NARDS [P-R08] [33] */
    if (neo) {
      if (oi == null) M('nards', 'veri_eksik', {need: ['oi'], msgs: ['nards_oi_only'], src: [33]});
      else if (!oiOk) M('nards', 'gozden_gecirilmeli', {oi, sev: null, msgs: ['nards_index_invalid', 'nards_oi_only'], src: [33]});
      else if (n.nards_confirmed !== 'yes') { rule('P-R08'); M('nards', 'gozden_gecirilmeli', {oi, sev: null, msgs: ['nards_not_confirmed', 'nards_oi_only'], src: [33]}); }
      else M('nards', 'hesaplandi', {oi, sev: oi >= 16 ? 'severe' : oi >= 8 ? 'moderate' : oi >= 4 ? 'mild' : null, msgs: [oi < 4 ? 'nards_below' : 'nards_table', 'nards_oi_only'], src: [33]});
      /* Avrupa RDS uzlaşısı profili: <28 hafta, oksijen alan — tedavi hedefi, normal aralık değil (P-E04, P-E05) [24] */
      /* [1.5-F05] RDS uzlaşısı profili: oksijen hedefi <28 hafta; ayırma ve hipokapni önerileri yalnız doğrulanmış RDS + invaziv ventilasyonda.
         Bağlam doğrulanmadan PCO2 <35 ise yalnız koşullu eğitim notu (35 mmHg kaynaktaki öneridir, değiştirilmedi) [24] */
      const rdsCtx = n.rds_confirmed === 'yes' && n.vent_type === 'invasive';
      const lowCO2 = has(n.pco2) && n.pco2 < 35 && st === 'arterial';
      if ((has(n.ga_weeks) && n.ga_weeks < 28) || n.rds_confirmed === 'yes' || lowCO2) {
        const msgs = [];
        if (has(n.ga_weeks) && n.ga_weeks < 28) msgs.push('rds_target');
        if (rdsCtx) { msgs.push('rds_weaning'); if (lowCO2) msgs.push('rds_hypocapnia'); }
        else if (lowCO2) msgs.push('rds_hypocapnia_unverified');
        msgs.push('rds_not_normal');
        M('rds', 'hesaplandi', {ctx: rdsCtx, msgs, src: [24]});
      }
    }
    hieModule(n, R, rule, M, neo);
    /* Doğum salonu: dakikaya özgü preduktal SpO2 hedefi; ara dakika için hedef üretilmez [P-R17] [40] */
    if (neo && n.care_context === 'delivery') {
      const A2 = A.mins;
      if (A2 == null) { rule('P-R17'); M('delivery', 'veri_eksik', {need: ['postnatal_minutes'], msgs: ['delivery_minute_needed'], src: [29, 40]}); }
      else {
        const minute = Math.floor(A2 + 1e-9), row = DELIVERY_SPO2[minute] || null;
        const msgs = [row ? 'delivery_target' : 'delivery_no_row', 'delivery_room_only'];
        if (!(n.spo2_site === 'right_hand' || n.spo2_site === 'right_wrist')) msgs.push('delivery_preductal');
        const pos = row && has(n.spo2) ? (n.spo2 < row[0] ? 'below' : n.spo2 > row[1] ? 'above' : 'within') : null;
        M('delivery', 'hesaplandi', {minute, row, pos, spo2: n.spo2, msgs, src: [29, 40]});
      }
    }
  }
  /* HIE: kan gazından uygunluk ya da soğutma kararı yok [P-R16] [27][28] */
  function hieModule(n, R, rule, M, neo) {
    if (!(neo && (n.neuro === 'yes' || n.perinatal_event === 'yes'))) return;
    const msgs = ['hie_expert', 'hie_no_cooling'];
    if (n.neuro === 'yes' && n.perinatal_event === 'yes') rule('P-R16');
    if (has(n.ga_weeks)) msgs.push(n.ga_weeks >= 36 ? 'hie_ga36' : n.ga_weeks === 35 ? 'hie_ga35' : n.ga_weeks >= 33 ? 'hie_ga33' : 'hie_ga_lt33');
    else msgs.push('hie_ga_unknown');
    M('hie', 'gozden_gecirilmeli', {urgent: n.neuro === 'yes', msgs, src: [27, 28, 35]});
  }

  /* ---------- Kordon kanı akışı [P-R09, P-R10] [25][35] ---------- */
  function cordFlow(n, err, R, rule, M) {
    rule('P-R09');
    R.scope = 'cord';
    const st = n.sample_type;
    const q = M('quality', err.length ? 'gozden_gecirilmeli' : 'hesaplandi', {sample: st, pregnancy: 'unknown', temp: n.temperature_reporting, units: {pco2: 'mmHg', pao2: 'mmHg'}, times: {sample: n.sample_time, analysis: n.analysis_time, chem: null},
      msgs: ['cord_separate', 'no_critical_alarm'], src: [25]});
    if (err.length) q.msgs.unshift('input_errors');
    if (st === 'cord_unknown') q.msgs.push('cord_vessel_unknown');
    M('cord', 'hesaplandi', {vessel: st, ph: n.ph, pco2: n.pco2, msgs: [st === 'cord_unknown' ? 'cord_no_arterial' : 'cord_single', 'cord_no_asphyxia', 'cord_ph_not_prognosis'], src: [25, 35]});
    const pairPh = has(n.cord_ph_art) && has(n.cord_ph_ven), pairP = has(n.cord_pco2_art) && has(n.cord_pco2_ven);
    if (!pairPh && !pairP) M('cordpair', 'veri_eksik', {need: ['cord_ph_art', 'cord_ph_ven', 'cord_pco2_art', 'cord_pco2_ven'], msgs: ['cord_pair_needed'], src: [25]});
    else {
      const dph = pairPh ? r4(n.cord_ph_ven - n.cord_ph_art) : null, dpco2 = pairP ? r4(n.cord_pco2_art - n.cord_pco2_ven) : null;
      const flag = (dph != null && dph < 0.02) || (dpco2 != null && dpco2 < 0.5);
      if (flag) rule('P-R10');
      M('cordpair', flag ? 'gozden_gecirilmeli' : 'hesaplandi', {dph, dpco2, flag, relabel: false, formula: 'P-F04',
        msgs: [flag ? 'cord_pair_suspect' : 'cord_pair_no_flag', 'cord_no_relabel', 'cord_not_proof', ...(!pairPh || !pairP ? ['cord_pair_partial'] : [])], src: [25]});
    }
    baseModule(n, R, rule, M);
    hieModule(n, R, rule, M, true);
    sampleQuality(n, R, rule, M);
    finiteGuard(R);
    return R;
  }

  /* ---------- Seri değerlendirme (6. tur, S-R01–S-R16) ----------
     Her zaman noktası kendi girdileriyle ayrı değerlendirilir (bağlam, onay ve kalite bilgisi bir noktadan ötekine taşınmaz).
     Ardışık noktalar arasında yalnız aritmetik fark, yüzde değişim ve geçerli zamanla ortalama saatlik değişim verilir; bunlar klinik eşik değildir.
     İyileşme puanı, otomatik tedavi önerisi, örnek alma sayacı ya da evrensel laktat hedefi üretilmez. Kaynaklar atlas numaralarıyla. */
  const SER_PARAMS = [
    {k: 'ph', get: R => R.n.ph, pct: false, matrix: 'acidbase'}, {k: 'pco2', get: R => R.n.pco2, matrix: 'acidbase'}, {k: 'hco3', get: R => R.n.hco3_actual, matrix: 'acidbase'},
    {k: 'pao2', get: R => R.n.pao2, matrix: 'oxy'}, {k: 'pf', get: R => R.modules.pf && R.modules.pf.status === 'hesaplandi' ? R.modules.pf.value : null, matrix: 'oxy', support: true},
    {k: 'oi', get: R => R.modules.oi ? R.modules.oi.value : null, matrix: 'oxy', support: true}, {k: 'osi', get: R => R.modules.osi ? R.modules.osi.value : null, support: true},
    {k: 'lactate', get: R => R.n.lactates.length ? R.n.lactates[R.n.lactates.length - 1].v : null, method: true}, {k: 'glucose', get: R => R.n.glucose, method: true},
    {k: 'bhb', get: R => R.n.beta_hydroxybutyrate, method: true}, {k: 'na', get: R => R.n.na, method: true}, {k: 'cl', get: R => R.n.cl, method: true},
    {k: 'ag', get: R => R.modules.ag && R.modules.ag.value != null ? R.modules.ag.value : null}, {k: 'agc', get: R => R.modules.agc && R.modules.agc.status === 'hesaplandi' ? R.modules.agc.value : null, albumin: true},
    /* 8–10. tur: salisilat (iç temsil mg/dL; birimsiz değer karşılaştırılmaz) */
    {k: 'salicylate', get: R => R.modules.salicylate && R.modules.salicylate.mgdl != null ? R.modules.salicylate.mgdl : null}
  ];
  const AFF_PARAM = {po2: ['pao2', 'pf', 'oi'], pco2: ['pco2'], ph: ['ph'], hco3: ['hco3', 'ag', 'agc'], lytes: ['na', 'cl', 'ag', 'agc'], glucose: ['glucose'], sat: ['osi'], lactate: ['lactate']};
  const AB_FIELDS = ['ph', 'pco2', 'hco3_actual'];
  function serial(input, cfg = {}) {
    const base = input.base || {}, ev = input.events || [];
    const fin = v => typeof v === 'number' && Number.isFinite(v);
    const out = {version: VERSION, rules: [], points: [], comparisons: [], events: [], order: null, blocked: null};
    const rule = id => { if (!out.rules.includes(id)) out.rules.push(id); };
    /* Noktalar: girdi sırası (id) korunur; zaman ayrıştırılır */
    /* [1.5-F03] Nokta kimlikleri tekil olmalı: yinelenen kimlik ayrıştırılır ve bildirilir */
    /* [1.6-V05] Üretilen ek, girdideki ve önceden üretilmiş bütün kimliklere karşı sınanır */
    const rawIds = (input.points || []).map((p, i) => p.id || 'N' + (i + 1)), used = new Set();
    const pts = (input.points || []).map((p, i) => {
      const t = p.time ? Date.parse(p.time) : NaN;
      let id = rawIds[i];
      if (used.has(id)) { let k = 2; while (used.has(id + '·' + k) || rawIds.includes(id + '·' + k)) k++; id = id + '·' + k; rule('S-dup-id'); if (!(out.warnings || []).includes('duplicate_id')) out.warnings = [...(out.warnings || []), 'duplicate_id']; }
      used.add(id);
      const R = evaluate(Object.assign({}, base, p.values || {}, {sample_time: p.time || undefined}), cfg);
      /* [1.5-F01] Noktanın temel geçerliliği: HH uyumsuzluğu, sıcaklık karışıklığı, giriş hataları */
      /* [1.6-V03] Asit–baz alanlarındaki giriş hatası (ör. HCO₃ = 0) asit–baz yorum uygunluğunu kapatır; diğer alan hataları kapatmaz */
      const abErr = R.errors.some(e => AB_FIELDS.includes(e.field)), otherErr = R.errors.some(e => !AB_FIELDS.includes(e.field));
      /* [8–10. tur] Yaş grubu noktaya aittir; yaşı seçilmemiş ya da kapsam dışı örnek seri yorumuna girmez (yalnız ham fark) */
      const scopeBad = R.scope === 'age_missing' ? 'age_missing' : R.scope === 'sample_out' ? 'sample_out' : null;
      const validity = [...(scopeBad ? [scopeBad] : []), ...(R.suspended ? [R.modules.hh && R.modules.hh.status === 'gozden_gecirilmeli' ? 'hh_inconsistent' : 'temp_mixed'] : []), ...(abErr ? ['acidbase_input_error'] : []), ...(otherErr ? ['input_errors'] : [])];
      const abInvalid = !!(R.suspended || abErr || scopeBad);
      /* [1.6-V04] Gebelik bağlamı bilinmeyen erişkin nokta, gebe olmayan erişkin varsayımıyla yorumlanır; seri sonucunda açıkça gösterilir */
      const assumeNP = R.scope === 'adult' && R.n.maternal_context === 'unknown';
      return {id, validity, abInvalid, assumeNP, entry: i, time: p.time || null, t: Number.isNaN(t) ? null : t, label: p.label || null, sample: R.n.sample_type,
        method: p.method || null, support: p.support || {}, albuminConcurrent: p.albumin_concurrent || 'unknown', R};
    });
    /* S-R01: olgu etiketi uyuşmuyorsa ortak seri kurulmaz (hasta kimliği istenmez; etiket yalnız sentetik/eğitim ayırıcısıdır) */
    const labels = new Set(pts.map(p => p.label).filter(Boolean));
    /* [1.5-F06] Etiket yokluğu ya da kısmi etiket, aynı olgu/epizot doğrulaması sayılmaz */
    out.identity = labels.size === 1 && pts.every(p => p.label) ? 'labels_match' : labels.size > 1 ? 'mismatch' : pts.some(p => p.label) ? 'partial' : 'unverified';
    if (labels.size > 1) { rule('S-R01'); out.blocked = 'identity_mismatch'; out.points = pts.map(p => ({id: p.id, time: p.time, sample: p.sample})); return out; }
    /* S-R02/03/04: sıra */
    const allTimes = pts.every(p => p.t != null);
    let ordered = pts.slice();
    if (allTimes) { ordered.sort((a, b) => a.t - b.t || a.entry - b.entry); out.order = ordered.some((p, i) => p !== pts[i]) ? 'resorted' : 'time'; if (out.order === 'resorted') rule('S-R03'); }
    else { out.order = 'entry'; rule('S-R02'); }
    out.points = ordered.map(p => ({id: p.id, entry: p.entry, time: p.time, label: p.label, sample: p.sample, method: p.method, support: p.support, validity: p.validity, abInvalid: p.abInvalid, assumeNP: p.assumeNP, R: p.R}));
    out.assumptions = ordered.some(p => p.assumeNP) ? [{kind: 'not_pregnant_assumed', points: ordered.filter(p => p.assumeNP).map(p => p.id)}] : [];
    const placed = new Set();
    for (let i = 1; i < ordered.length; i++) {
      const A = ordered[i - 1], B = ordered[i];
      const hours = allTimes ? (B.t - A.t) / 36e5 : null;
      const c = {from: A.id, to: B.id, hours: hours != null && hours > 0 ? hours : null, sameTime: hours === 0, flags: [], notes: [], params: {}, events: []};
      if (hours === 0) { rule('S-R04'); c.flags.push('same_time'); }
      /* [1.5-F01] Askıya alınmış noktayı içeren aralıkta bileşene dayalı klinik not üretilmez; ham fark gösterilebilir */
      const suspendedPair = A.abInvalid || B.abInvalid;
      if (suspendedPair) c.flags.push('point_validity');
      else if (A.validity.length || B.validity.length) c.flags.push('point_input_errors');
      const matrixChanged = A.sample !== B.sample, methodChanged = (A.method || '') !== (B.method || '') && (A.method || B.method);
      if (matrixChanged) { rule('S-R07'); c.flags.push('matrix_changed'); }
      if (methodChanged) { rule('S-R08'); c.flags.push('method_changed'); }
      const sk = ['type', 'fio2', 'peep', 'paw'], supportChanged = sk.some(k => (A.support[k] ?? null) !== (B.support[k] ?? null)) || A.R.n.fio2 !== B.R.n.fio2;
      if (supportChanged) { rule('S-R09'); c.flags.push('support_changed'); }
      const arterialBoth = A.sample === 'arterial' && B.sample === 'arterial';
      /* S-R15: numune kalite uyarısı ilgili parametreye bağlanır (her noktanın kendisi; miras yok) */
      const qp = R => { const set = new Set(); if (R.modules.sample) for (const w of [...R.modules.sample.known, ...R.modules.sample.possible]) for (const pr of w.params) (AFF_PARAM[pr] || []).forEach(x => set.add(x)); return set; };
      const qa = qp(A.R), qb = qp(B.R);
      for (const P of SER_PARAMS) {
        const a = P.get(A.R), b = P.get(B.R), flags = [];
        if (!fin(a) || !fin(b)) { if (a != null || b != null) { c.params[P.k] = {a: fin(a) ? a : null, b: fin(b) ? b : null, unavailable: true, flags: ['value_missing_or_invalid']}; rule('S-R06'); } continue; }
        /* S-R07: oksijenasyon parametreleri yalnız iki arteriyel örnekte karşılaştırılır; asit–baz parametrelerinde örnek türü değişimi bayraklanır */
        if (P.matrix === 'oxy' && !arterialBoth) { c.params[P.k] = {a, b, unavailable: true, flags: ['not_arterial_both']}; continue; }
        if (P.matrix === 'acidbase' && matrixChanged) flags.push('matrix_changed');
        if (P.matrix === 'acidbase' && suspendedPair) flags.push('hh_suspended');
        if (P.method && methodChanged) flags.push('method_changed');
        if (P.support && supportChanged) flags.push('support_changed');
        if (P.albumin && (A.albuminConcurrent !== 'yes' || B.albuminConcurrent !== 'yes')) { rule('S-R13'); c.params[P.k] = {a, b, unavailable: true, flags: ['albumin_not_concurrent']}; continue; }
        if ((P.k === 'oi' || P.k === 'osi') && !(A.R.modules[P.k] && A.R.modules[P.k].classifiable && B.R.modules[P.k] && B.R.modules[P.k].classifiable)) { rule('S-R14'); flags.push('index_not_classifiable'); }
        if (qa.has(P.k) || qb.has(P.k)) { rule('S-R15'); flags.push('sample_quality'); }
        const diff = r4(b - a);
        const pct = P.pct === false ? null : a === 0 ? null : 100 * (b - a) / a;
        if (P.pct !== false && a === 0) { rule('S-R05'); flags.push('pct_undefined_zero'); }
        const rate = c.hours ? diff / c.hours : null;
        c.params[P.k] = {a, b, diff, pct: pct != null && fin(pct) ? pct : null, rate: rate != null && fin(rate) ? rate : null, flags};
      }
      /* S-R10: pH yükseldiyse bileşenler birlikte gösterilir; metabolik sürecin bittiği söylenmez */
      const ph = c.params.ph, hc = c.params.hco3, pc = c.params.pco2;
      /* [1.6-V02] Bileşen yorumu için iki nokta aynı ve bilinen örnek türünde olmalı; değişmiş/bilinmeyen matrikste yalnız ham fark ve uyarı */
      const sameMatrix = !matrixChanged && A.sample !== 'unknown' && B.sample !== 'unknown';
      const abOk = !suspendedPair && sameMatrix;
      if (!sameMatrix && (ph || hc || pc)) { rule('S-R07'); c.notes.push('acidbase_matrix_not_equivalent'); }
      /* [M-R12] pH değişmediyse bile bileşen değişimi ayrı gösterilir ("değişiklik yok" denmez; tolerans tanımlanmadı, yalnız tam eşitlik) */
      if (ph && !ph.unavailable && ph.diff === 0 && abOk && ((pc && !pc.unavailable && pc.diff !== 0) || (hc && !hc.unavailable && hc.diff !== 0))) { rule('M-R12'); c.notes.push('ph_same_components_changed'); }
      if (ph && !ph.unavailable && ph.diff > 0 && abOk) { rule('S-R10'); c.notes.push(hc && !hc.unavailable && hc.diff <= 0 && pc && !pc.unavailable && pc.diff < 0 ? 'ph_up_by_co2' : 'ph_up_components'); }
      /* S-R11: laktat düşüşü konsantrasyon değişimidir; klirens, şokun bitmesi ya da sıvı önerisi değildir */
      if (c.params.lactate && !c.params.lactate.unavailable && c.params.lactate.diff < 0) { rule('S-R11'); c.notes.push('lactate_fall'); }
      /* S-R12: glukoz, keton ve AG ayrı gösterilir */
      const pg = c.params.glucose, pk = c.params.bhb, pa = c.params.ag;
      if ([pg, pk, pa].filter(x => x && !x.unavailable).length >= 2) { rule('S-R12'); c.notes.push('dka_params_separate'); }
      /* Klorür artışı: hiperkloremik bileşen olabilir; tek neden olarak sıvı gösterilmez (eşik yok) */
      if (c.params.cl && !c.params.cl.unavailable && c.params.cl.diff > 0 && abOk) c.notes.push('chloride_rise_context');
      /* 7. tur K-R08 / K-R09 (yalnız erişkin; gebelik ve çocuk bağlamına taşınmaz) */
      const adultPair = [A, B].every(P => P.R.scope === 'adult' && P.R.n.pregnancy !== 'yes');
      /* [8–10. tur, E22] Farklı ya da bilinmeyen örnek türünde PCO₂ farkı "düşüş" olarak yorumlanmaz: K-R08 notu da aynı bilinen matris ister */
      if (adultPair && sameMatrix && pc && !pc.unavailable && pc.diff < 0 && pc.a > 40 && !suspendedPair) { rule('K-R08'); c.notes.push('co2_fall_not_success'); }
      /* [1.6-V01] K-R09 daraltıldı: özel posthiperkapnik bağlam yalnız iki arteriyel, geçerli noktada ve önceki noktada klinik olarak doğrulanmış
         kronik hiperkapni girildiğinde. PCO₂ değeri (40 mmHg dahil) kroniklik ya da tanı eşiği olarak kullanılmaz [97][103].
         Doğrulama yoksa yalnız genel asit–baz açıklaması verilir. */
      if (adultPair && abOk && arterialBoth && pc && !pc.unavailable && pc.diff < 0 && ph && !ph.unavailable && ph.diff > 0 && hc && !hc.unavailable && hc.diff >= 0
        && B.R.modules.ph && B.R.modules.ph.dir === 'alkalemia') {
        if (A.R.n.hc_chronic_confirmed === 'yes') { rule('K-R09'); c.notes.push('posthypercapnic_context'); }
        else c.notes.push('co2_fall_alkalemia_general');
      }
      /* [1.6-V04] Erişkine özgü not, gebelik bağlamı bilinmeyen noktaya dayanıyorsa karşılaştırmada varsayım bayrağı */
      if ((A.assumeNP || B.assumeNP) && c.notes.some(x => ['co2_fall_not_success', 'posthypercapnic_context', 'co2_fall_alkalemia_general'].includes(x))) c.flags.push('assume_not_pregnant');
      if (c.params.pf && !c.params.pf.unavailable && supportChanged) c.notes.push('pf_with_support');
      if (A.sample === 'arterial' && B.sample !== 'arterial' && (A.R.n.pao2 != null || B.R.n.pao2 != null)) c.notes.push('po2_not_comparable');
      /* [8–10. tur] T-R08: salisilat düzeyinin düşmesi iyileşme değildir; pH ve klinik gidiş ayrı */
      const sal = c.params.salicylate;
      if (sal && !sal.unavailable && sal.diff < 0) {
        rule('T-R08'); c.notes.push('salicylate_fall_not_recovery');
        if (B.R.n.clinical_worsening === 'yes') c.notes.push('salicylate_fall_worsening');
        if (ph && !ph.unavailable && ph.diff < 0 && abOk) c.notes.push('salicylate_fall_ph_down');
      }
      /* S-R16: aradaki olaylar; nedensellik yok. [B-R06] Zamanı bilinmeyen olay yalnız açıkça seçilen iki nokta arasına ("between") yerleştirilir;
         zaman eksikse olay tahminle bir aralığa atanmaz */
      c.events = ev.map((e, j) => [e, j]).filter(([e]) => Array.isArray(e.between) ? e.between[0] === A.id && e.between[1] === B.id
        : allTimes && !Number.isNaN(Date.parse(e.time)) && Date.parse(e.time) >= A.t && Date.parse(e.time) <= B.t).map(([e, j]) => { placed.add(j); return {...e}; });
      if (c.events.length) { rule('S-R16'); c.notes.push('events_no_causality'); }
      if (c.events.some(e => ['rrt_start', 'rrt_end', 'rrt_change'].includes(e.type))) { rule('B-R06'); c.notes.push('krt_event_not_recovery'); }
      out.comparisons.push(c);
    }
    out.events = ev.map(e => ({...e}));
    /* Hiçbir aralığa yerleşmeyen olay (zaman eksik, aralık dışında ya da seçilen noktalar ardışık değil) ayrıca bildirilir */
    out.unplacedEvents = ev.filter((e, i) => !placed.has(i)).map(e => ({...e}));
    if (out.unplacedEvents.length) out.warnings = [...(out.warnings || []), 'events_unplaced'];
    return out;
  }

  const api = {VERSION, F, FSRC, F2, FSRC2, PH_REF, BASE, KPA, parseNum, normalize, evaluate, serial};
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.KG = api;
})(typeof window !== 'undefined' ? window : globalThis);
