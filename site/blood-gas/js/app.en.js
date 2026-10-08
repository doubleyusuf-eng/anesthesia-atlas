/* Otomatik üretildi: node tools/i18n.cjs apply — elle düzenlemeyin. Kaynak: js/app.js + content-src/i18n/en */
'use strict';
/* Kan Gazı Atlası · yönlendirici ve görünümler
   Rotalar: #/ · #/degerlendir[/<olgu>] · #/ogren/<ders> · #/olgular · #/olgu/<id> · #/formuller[/girdiler|/kurallar] · #/kaynaklar[/<n>]
   Hesaplar yalnız js/engine.js içindedir; bu dosya sonuçları gösterir, hesap ya da etiket üretmez. */
(() => {
  const C = window.KG_CONTENT, TESTS = window.KG_TESTS || null;
  const {t, tf, esc, num, dec} = KGI;
  const view = document.getElementById('view');
  const SRC = Object.fromEntries(C.sources.map(s => [s.id, s]));
  /* İkinci tur formülleri aynı biçime getirilir (koşul ve sınır alanları) */
  const PFORM = C.ped.formulas.map(f => ({id: f.id, ad: f.ad, ifade: f.ifade, sonuc_birimi: f.sonuc, uygulama_kosullari: f.kosullar.join('; '), sinirlamalar: f.sonuc, kaynak_ids: f.kaynaklar, durum: "Research definition (second round)"}));
  const FORM = Object.fromEntries([...C.formulas, ...PFORM].map(f => [f.id, f]));
  /* [R18-01] Ca oranı gösterimi: 2 basamakta 2,5'e yuvarlanıp karar tersine düşüyorsa yeterli basamak ve açıklama gösterilir */
  const caFmt = m => { const r2 = n2(m.ratio), looksBoundary = Math.abs(Math.round(m.ratio * 100) - 250) === 0;
    return looksBoundary && !m.exactly2_5 ? `${num(m.ratio, 6)} (relative to 2.5: ${m.atOrAbove2_5 ? "above" : "below"}; the display rounded to two digits does not enter the decision)` : r2; };
  /* Yüzde: Türkçede işaret önde (%94–98), İngilizcede sonda (94–98%), İspanyolcada boşlukla sonda (94–98 %) */
  const pct = (a, b) => { const v = b == null ? a : `${a}–${b}`; return KGI.lang === 'tr' ? '%' + v : KGI.lang === 'es' ? v + ' %' : v + '%'; };
  const R8FORM = Object.fromEntries(C.r810.formulas.map(f => [f.id, f]));
  const R8G = {renal: "Kidney and dialysis (round 8)", tox: "Toxicology (round 9)", mixed: "Mixed acid–base disorders (round 10)"};
  const cite = ids => [...new Set(ids)].sort((a, b) => a - b).map(n => `<a class="cite" href="#/kaynaklar/${n}" title="${esc(SRC[n] ? SRC[n].baslik : '')}">[${n}]</a>`).join(' ');
  const n1 = v => num(v, 1), n2 = v => num(v, 2);

  /* ================= Alanlar ================= */
  const YN = [['unknown', "Unknown"], ['yes', "Yes"], ['no', "No"]];
  const OPT = {
    sample_type: [['unknown', "Select (unknown)"], ['arterial', "Arterial"], ['peripheral_venous', "Peripheral venous"], ['central_venous', "Central venous"], ['mixed_venous', "Mixed venous"], ['capillary', "Capillary"], ['cord_artery', "Cord artery"], ['cord_vein', "Cord vein"], ['cord_unknown', "Cord, vessel uncertain"], ['circuit', "Circuit (ECMO/bypass)"]],
    age_group: [['', "Select"], ['adult', "Adult"], ['pediatric', "Child"], ['neonatal', "Neonate"]],
    care_context: [['unknown', "Unknown"], ['delivery', "Delivery room"], ['nicu', "Neonatal intensive care"], ['picu', "Pediatric intensive care"], ['other', "Other"]],
    sample_site: [['unknown', "Unknown"], ['right_radial', "Right radial (preductal)"], ['umbilical_artery', "Umbilical artery (postductal)"], ['other', "Other"]],
    perfusion: [['unknown', "Unknown"], ['good', "Good"], ['poor', "Impaired"]],
    pregnancy: [['unknown', "Unknown"], ['no', "None"], ['yes', "Present"]],
    temperature_reporting: [['unknown', "Unknown"], ['37C_uncorrected', "37 °C, uncorrected"], ['temperature_corrected', "Corrected to patient temperature"], ['mixed', "Mixed (corrected + uncorrected)"]],
    be_type: [['unknown', "Unknown"], ['BE_blood', "BE, blood (actual BE)"], ['BE_ECF', "BE, extracellular fluid (standard BE, SBE)"], ['BD_blood', "BD (base deficit), blood"], ['BD_ECF', "BD (base deficit), extracellular fluid"]],
    chem_same: [['unknown', "Unknown"], ['yes', "Yes, same time"], ['no', "No, different time/sample"]],
    fio2_quality: [['unknown', "Unknown"], ['known', "Known (measured/set)"], ['estimated', "Estimated"]],
    o2_support: [['unknown', "Unknown"], ['room_air', "Room air"], ['supplemental', "Supplemental oxygen / respiratory support"]],
    normothermia: YN,
    saturation_type: [['unknown', "Unknown"], ['coox_functional', "Co-oximetry, functional"], ['coox_fractional', "Co-oximetry, fractional"], ['calculated', "Calculated by the device"], ['spo2', "SpO₂ (pulse oximetry)"]],
    dyshb: [['unknown', "Unknown"], ['no', "None"], ['yes', "Present / suspected"]],
    urine_ketones: [['unknown', "Unknown"], ['negative', "Negative"], ['trace', "Trace"], ['1+', '1+'], ['2+', '2+'], ['3+', '3+'], ['4+', '4+'], ['small', "Small"], ['moderate', "Moderate"], ['large', "Large"]],
    diabetes_history: [['unknown', "Unknown"], ['yes', "Present"], ['no', "None"]],
    vent_type: [['unknown', "Unknown"], ['invasive', "Invasive"], ['noninvasive', "Noninvasive"], ['other', "Other / none"]],
    spo2_site: [['unknown', "Unknown"], ['right_hand', "Right hand (preductal)"], ['right_wrist', "Right wrist (preductal)"], ['foot', "Foot (postductal)"], ['other', "Other"]],
    signal: [['unknown', "Unknown"], ['good', "Good"], ['poor', "Poor"]],
    maternal_context: [['unknown', "Unknown"], ['not_pregnant', "Not pregnant / not applicable"], ['pregnant', "Pregnant"], ['labor', "Labor"], ['postpartum', "Postpartum"], ['breastfeeding', "Breastfeeding"]],
    sample_owner: [['unknown', "Unknown"], ['mother', "Mother"], ['fetus', "Fetus (scalp)"], ['cord', "Cord"]],
    labor_stage: [['unknown', "Unknown"], ['none', "Not in labor"], ['1', "Stage 1"], ['2', "Stage 2"], ['3', "Stage 3"]],
    position: [['unknown', "Unknown"], ['sitting', "Sitting"], ['supine', "Supine"], ['left_lateral', "Left lateral"], ['other', "Other"]],
    o2_profile: [['none', "Not selected"], ['institution', "Institution-approved profile"], ['bts', "BTS 2017"], ['expert', "Set by the specialist"]],
    diabetes_type: [['unknown', "Unknown"], ['none', "None"], ['t1', "Type 1"], ['t2', "Type 2"], ['gestational', "Gestational"]],
    fetal_assessment: [['unknown', "Unknown"], ['not_done', "Not done"], ['reassuring', "Reassuring"], ['concern', "Concern (e.g., category II/III tracing)"]],
    pushing: YN, hypercapnia_risk: YN, pump_issue: YN, poor_intake: YN, vomiting: YN, steroid: YN, feels_unwell: YN, infection: YN, organ_dysfunction: YN, sepsis_high_risk: YN, maternal_hypoxia: YN, bleeding: YN, resp_symptoms: YN, pe_suspected: YN,
    q_bubble: [['unknown', "Unknown"], ['no', "Not seen"], ['yes', "Seen"]], q_heparin: [['unknown', "Unknown"], ['dry_balanced', "Dry, electrolyte-balanced"], ['liquid', "Liquid heparin"]],
    q_clot: [['unknown', "Unknown"], ['no', "Not seen"], ['yes', "Seen"]], q_hemolysis: [['unknown', "Unknown"], ['not_measured', "Not measured"], ['device_unknown', "Device specification unknown"], ['negative', "Negative"], ['positive', "Positive"]],
    q_catheter: YN, q_flush: [['unknown', "Unknown"], ['saline', "0.9% NaCl"], ['glucose', "Glucose-containing fluid"], ['other', "Other"]],
    q_transport: [['unknown', "Unknown"], ['hand', "By hand"], ['pneumatic_validated', "Pneumatic tube, locally validated"], ['pneumatic_unvalidated', "Pneumatic tube, not validated"], ['pneumatic_unknown', "Pneumatic tube, validation unknown"]],
    q_storage: [['unknown', "Unknown"], ['room', "Room temperature"], ['ice', "Cooled / on ice"]], q_device_error: YN, q_manual: YN, q_hydroxocobalamin: YN, q_leukocytosis: YN,
    stable: YN, support_concurrent: YN, pards_confirmed: YN, nards_confirmed: YN, cyanotic_chd: YN, baseline_imv: YN, perinatal_event: YN, neuro: YN, dka_confirmed: YN, rds_confirmed: YN, copd_confirmed: YN, prior_arterial: YN, prior_stable: YN, hc_renal: YN, hc_diuretic: YN, hc_alkali_vomit: YN, hc_chronic_confirmed: YN,
    hc_phase: [['unknown', "Unknown"], ['exacerbation', "Acute exacerbation / acute phase"], ['stable', "Stable phase"]],
    /* 8–10. tur: böbrek, kalsiyum/sitrat, toksikoloji (varsayılan hep "bilinmiyor"/"seçilmedi") */
    renal_context: [['unknown', "Unknown"], ['AKI', "AKI (clinically confirmed)"], ['CKD', "CKD (clinically confirmed)"], ['AKI_on_CKD', "AKI on CKD"], ['unspecified', "Kidney disease present, type not specified"], ['none', "None"]],
    krt_modality: [['unknown', "Unknown"], ['none', "No KRT"], ['IHD', "Intermittent hemodialysis (IHD)"], ['CKRT', "Continuous KRT (CKRT)"], ['prolonged', "Prolonged session"], ['PD', "Peritoneal dialysis"]],
    urine_same_sample: YN, diuretic_recent: YN, alkali_given: YN, urine_infection: YN, k_drug_context: YN, rca_confirmed: YN, ca_concurrent: YN, osm_concurrent: YN, lactate_methods_concurrent: YN, tox_suspicion: YN, clinical_worsening: YN,
    calcium_need_trend: [['unknown', "Unknown"], ['rising', "Increasing"], ['not_rising', "Not increasing"]],
    total_ca_site: [['unknown', "Unknown"], ['systemic', "Systemic (patient)"], ['postfilter', "Post-filter (circuit)"]], ionized_ca_site: [['unknown', "Unknown"], ['systemic', "Systemic (patient)"], ['postfilter', "Post-filter (circuit)"]],
    tox_agent: [['unknown', "Unknown / not selected"], ['methanol', "Methanol"], ['ethylene_glycol', "Ethylene glycol"], ['toxic_alcohol', "Toxic alcohol, type uncertain"], ['salicylate', "Salicylate"], ['metformin', "Metformin"], ['isopropanol', "Isopropanol"], ['co', "Carbon monoxide"], ['smoke', "Smoke inhalation"], ['propylene_glycol', "Propylene glycol (solvent)"], ['other', "Other"]],
    tox_acute_chronic: [['unknown', "Unknown"], ['acute', "Acute"], ['chronic', "Chronic"], ['acute_on_chronic', "Acute on chronic"]],
    tox_antidote: [['unknown', "Unknown"], ['none', "Not given"], ['fomepizole', "Fomepizole given"], ['ethanol', "Ethanol (antidote) given"], ['other', "Other"]],
    organic_acid_context: [['unknown', "Unknown"], ['none', "None"], ['short_bowel', "Short bowel (D-lactate risk)"], ['oxoproline', "5-oxoproline risk (drug/malnutrition)"], ['propylene_glycol', "Propylene glycol-containing infusion"]],
    acetone: [['unknown', "Unknown"], ['not_measured', "Not measured"], ['negative', "Negative"], ['positive', "Positive"]],
    og_profile: [['none', "Not selected"], ['ideal_4_6', "Ideal: ethanol ÷ 4.6"], ['purssell', "Empirical Purssell: ethanol ÷ 3.7 − 0.35"]],
    salicylate_unit: [['', "unit?"], ['mg/dL', 'mg/dL'], ['mg/L', 'mg/L']]
  };
  const U = {pco2: ['mmHg', 'kPa'], pao2: ['mmHg', 'kPa'], fio2: [['fraction', "fraction"], ['percent', '%']], albumin: ['g/dL', 'g/L'], hb: ['g/dL', 'g/L'], saturation: [['percent', '%'], ['fraction', "fraction"]], glucose: ['mg/dL', 'mmol/L'], cord_pco2_art: ['kPa', 'mmHg'],
    total_ca: [['', "unit?"], 'mmol/L', 'mg/dL'], ionized_ca: [['', "unit?"], 'mmol/L', 'mg/dL'], salicylate_value: [['', "unit?"], 'mg/dL', 'mg/L']};
  const LBL = {
    sample_type: "Sample type", age_group: "Age group", care_context: "Care setting", sample_site: "Blood gas sampling site", perfusion: "Peripheral perfusion (capillary)", pregnancy: "Pregnancy", temperature_reporting: "Temperature reporting", sample_time: "Sample time", analysis_time: "Analysis time",
    ph: 'pH', pco2: 'PCO₂', hco3_actual: "Actual HCO₃ (mmol/L)", hco3_standard: "Standard HCO₃ (mmol/L)", be: "BE / BD value (mmol/L, with sign)", be_type: "BE / BD algorithm",
    na: "Na⁺ (mmol/L)", cl: "Cl⁻ (mmol/L)", tco2: "Chemistry TCO₂ (mmol/L)", k: "K⁺ (mmol/L)", albumin: "Albumin", chem_same: "Chemistry drawn at the same time as the blood gas?", chem_time: "Chemistry time",
    gas_hco3_for_ag: "If TCO₂ is unavailable, use blood gas HCO₃ for AG (labeled as a separate method; delta is not calculated)",
    ag_ref_low: "AG reference range, lower", ag_ref_high: "AG reference range, upper", ag_reference: "AG reference value (for delta)", albumin_reference: "Albumin reference (g/dL)", hco3_reference: "Baseline HCO₃ (for delta)", hh_tolerance: "HH tolerance (pH units)",
    pao2: 'PO₂', fio2: 'FiO₂', fio2_quality: "FiO₂ source", o2_support: "Oxygen support", oxygen_device: "Device and flow (free text)", normothermia: "Normothermia", barometric_mmhg: "Barometric pressure (mmHg)",
    baro_sealevel: "I do not know the barometric pressure; I explicitly choose the sea-level assumption of 760 mmHg", hb: "Hemoglobin", saturation: "Saturation", saturation_type: "Saturation type", dyshb: "Elevated or suspected COHb/MetHb", cohb: "COHb (%)", methb: "MetHb (%)",
    lactate: "Lactate (mmol/L)", glucose: "Glucose", beta_hydroxybutyrate: "β-hydroxybutyrate (mmol/L)", urine_ketones: "Urine ketones", diabetes_history: "History of diabetes", dka_followup: "This sample is a monitoring sample during DKA treatment (show resolution criteria)",
    dka_confirmed: "Clinically confirmed DKA (for the severity table)",
    clinical_context: "Clinical context (your note only; does not enter the calculations)", support_change_time: "Time of last support change",
    birth_time: "Time of birth", ga_weeks: "Gestation at birth, weeks", ga_days: "Gestation at birth, days (0–6)", postnatal_days: "Postnatal age, completed days (if time of birth unavailable)", postnatal_minutes: "Minutes after birth (if time of birth unavailable)",
    perinatal_event: "History of perinatal event", neuro: "Neurological impairment / seizure",
    local_ref_source: "Local reference source (age, sample type, analyzer, year)", ref_ph_low: "Local pH reference, lower", ref_ph_high: "Local pH reference, upper", ref_pco2_low: "Local PCO₂ reference, lower (mmHg)", ref_pco2_high: "Local PCO₂ reference, upper (mmHg)",
    paw: "Mean AIRWAY pressure (cmH₂O)", support_concurrent: "FiO₂ and airway pressure concurrent with the sample?", spo2: "SpO₂ (%)", spo2_site: "Oximeter site", signal: "Oximeter signal quality", stable: "Stable reading (not a transient desaturation)",
    vent_type: "Ventilation type", pards_confirmed: "Clinical PARDS diagnosis confirmed?", pards_hours: "Hours since PARDS diagnosis", cyanotic_chd: "Cyanotic congenital heart disease", baseline_imv: "Invasive ventilation since baseline (chronic lung disease)",
    nards_confirmed: "NARDS context confirmed? (RDS, transient tachypnea, anomalies excluded)",
    rds_confirmed: "Clinical RDS diagnosis confirmed?",
    copd_confirmed: "COPD diagnosis confirmed by spirometry?", hc_phase: "Clinical phase", prior_pco2: "PCO₂ on previous gas (mmHg)", prior_hco3: "HCO₃ on previous gas (mmol/L)",
    prior_arterial: "Was the previous gas arterial?", prior_stable: "Was the previous gas taken in a stable phase?", hc_renal: "Kidney failure / dialysis", hc_diuretic: "Diuretic use", hc_alkali_vomit: "Alkali intake or vomiting", hc_chronic_confirmed: "Prior chronic hypercapnia clinically confirmed?",
    maternal_context: "Pregnancy context", sample_owner: "Whose sample is it?", labor_stage: "Stage of labor", pushing: "Pushing", postpartum_hours: "Hours since delivery", position: "Position", altitude_m: "Altitude (m)",
    resp_symptoms: "Respiratory symptom (dyspnea, etc.)", pe_suspected: "Suspected pulmonary embolism", maternal_hypoxia: "Maternal hypoxia", fetal_assessment: "Fetal assessment", bleeding: "Bleeding",
    o2_profile: "Oxygen target profile", hypercapnia_risk: "Risk of hypercapnic respiratory failure", o2_target_low: "Profile target SpO₂ lower (%)", o2_target_high: "Profile target SpO₂ upper (%)",
    infection: "Suspected infection", organ_dysfunction: "Unexplained organ dysfunction", sepsis_high_risk: "Clinical high risk (sepsis)", sbp: "Systolic pressure (mmHg)",
    diabetes_type: "Diabetes type", pump_issue: "Insulin pump problem / insulin interruption", poor_intake: "Reduced intake / fasting", vomiting: "Vomiting", steroid: "Steroid exposure", feels_unwell: "Feeling unwell",
    q_bubble: "Air bubble", q_heparin: "Heparin type", q_clot: "Clot", q_hemolysis: "Hemolysis", q_catheter: "Was the sample drawn from a catheter?", q_flush: "Catheter flush fluid",
    q_transport: "Transport", q_storage: "Waiting / storage", protocol_minutes: "Institution-approved analysis time (min; from your protocol)", q_device_error: "Device error code / result outside measurement range",
    q_manual: "Values transcribed by hand", q_hydroxocobalamin: "Hydroxocobalamin administered", q_leukocytosis: "Marked leukocytosis", cord_clamp_time: "Cord clamping time",
    cord_ph_art: "Cord artery pH", cord_ph_ven: "Cord vein pH", cord_pco2_art: "Cord artery PCO₂", cord_pco2_ven: "Cord vein PCO₂",
    hco3_actual_not_standard: "Actual HCO₃ (not used in place of standard HCO₃)", ag: "Anion gap", ref_ph: "Local, age- and sample-specific pH reference", oi: 'OI',
    renal_context: "Kidney context (clinically confirmed)", krt_modality: "KRT (dialysis) status", k_drug_context: "History of medications that may affect potassium",
    urine_na: "Urine Na⁺ (mmol/L)", urine_k: "Urine K⁺ (mmol/L)", urine_cl: "Urine Cl⁻ (mmol/L)", urine_same_sample: "Are all three urine electrolytes from the same sample?", urine_ph: "Urine pH", diuretic_recent: "Recent diuretic", alkali_given: "Alkali given", urine_infection: "Urinary infection context",
    total_ca: "Total Ca", ionized_ca: "Ionized Ca (iCa)", total_ca_unit: "Total Ca unit", ionized_ca_unit: "iCa unit", total_ca_site: "Total Ca sampling site", ionized_ca_site: "iCa sampling site", ca_concurrent: "Total Ca and iCa concurrent?",
    rca_confirmed: "Is regional citrate anticoagulation (RCA) in use?", calcium_need_trend: "Calcium requirement trend",
    tox_suspicion: "Suspected toxic exposure", tox_agent: "Suspected substance", tox_acute_chronic: "Exposure: acute / chronic", tox_antidote: "Antidote status", clinical_worsening: "Clinical deterioration (consciousness, breathing, etc.)",
    measured_osmolality: "Measured serum osmolality (mOsm/kg)", bun: "BUN (mg/dL)", urea: "Urea (mmol/L) — do not enter together with BUN", ethanol: "Ethanol (mg/dL; leave blank if not measured)", osm_concurrent: "Osmolality and components concurrent?", og_profile: "Ethanol contribution profile (per your laboratory)",
    glucose_unit: "Glucose unit", salicylate_value: "Salicylate level", salicylate_unit: "Salicylate unit", lactate_method_a: "Lactate, method A (mmol/L)", lactate_method_b: "Lactate, method B (mmol/L)", lactate_methods_concurrent: "Are the two lactates from the same/concurrent sample?",
    organic_acid_context: "Rare organic acid context", acetone: "Acetone", age_missing: "Age group"
  };
  /* Görünürlük: yaş grubu ve örnek türüne göre */
  const isPed = () => S.age_group === 'pediatric' || S.age_group === 'neonatal', isNeo = () => S.age_group === 'neonatal', isAdult = () => S.age_group === 'adult' || !S.age_group;
  const isCord = () => String(S.sample_type).startsWith('cord') || S.sample_owner === 'cord';
  const isPregCtx = () => !isPed() && ['pregnant', 'labor', 'postpartum', 'breastfeeding'].includes(S.maternal_context), isPregLike = () => isPregCtx() && S.maternal_context !== 'breastfeeding';
  const W = (id, when, kind, wide) => ({id, when, kind, wide});
  const GROUPS = [
    {id: 'g1', title: "Sample and patient", open: true, hint: "Select the age group first; adult is not preselected. An unknown sample is not assumed to be arterial.",
      f: ['age_group', W('care_context', isPed), 'sample_type', W('sample_site', isPed), W('perfusion', () => S.sample_type === 'capillary'), W('maternal_context', () => S.age_group !== 'neonatal'), W('sample_owner', () => ['pregnant', 'labor', 'postpartum'].includes(S.maternal_context)), 'temperature_reporting', W('sample_time', null, 'dt'), W('analysis_time', null, 'dt')]},
    {id: 'gP', title: "Neonatal and pediatric context", open: true, when: () => isPed() || isCord(), hint: "There is no universal pediatric normal value. The \"normal\" label is not given unless a local, age-, sample- and analyzer-specific reference is entered. Ranges from studies (e.g., CALIPER venous) are not assigned automatically.",
      f: [W('birth_time', null, 'dt'), W('ga_weeks', () => isNeo() || isCord()), W('ga_days', () => isNeo() || isCord()), W('postnatal_days', isNeo), W('postnatal_minutes', () => isNeo() && S.care_context === 'delivery'), W('perinatal_event', () => isNeo() || isCord()), 'neuro',
        W('local_ref_source', () => isPed() && !isCord(), 'text', true), W('ref_ph_low', () => isPed() && !isCord()), W('ref_ph_high', () => isPed() && !isCord()), W('ref_pco2_low', () => isPed() && !isCord()), W('ref_pco2_high', () => isPed() && !isCord())]},
    {id: 'gG', title: "Pregnancy, labor and postpartum", open: true, when: () => isPregCtx() && !isCord(), hint: "Pregnancy review ranges are not universal normal values. An oxygen target is not produced unless an institutional or specialist profile is selected. The maternal result is not the fetal result.",
      f: [W('ga_weeks', isPregLike), W('ga_days', isPregLike), W('labor_stage', () => S.maternal_context === 'labor'), W('pushing', () => S.maternal_context === 'labor'), W('postpartum_hours', () => S.maternal_context === 'postpartum'), W('position', isPregLike), W('altitude_m', isPregLike),
        W('resp_symptoms', isPregLike), W('pe_suspected', isPregLike), W('maternal_hypoxia', isPregLike), W('fetal_assessment', () => S.maternal_context === 'pregnant' || S.maternal_context === 'labor'), W('bleeding', isPregLike), W('spo2', isPregLike),
        W('o2_profile', isPregLike), W('hypercapnia_risk', isPregLike), W('o2_target_low', () => isPregLike() && ['institution', 'expert'].includes(S.o2_profile)), W('o2_target_high', () => isPregLike() && ['institution', 'expert'].includes(S.o2_profile)),
        W('infection', isPregLike), W('organ_dysfunction', isPregLike), W('sepsis_high_risk', isPregLike), W('sbp', isPregLike)]},
    {id: 'gK', title: "Cord artery–vein pair", open: true, when: isCord, hint: "Artery and vein are entered with separate identities. The paired difference is a quality check; it does not determine the vessel and does not relabel the samples.", f: ['cord_ph_art', 'cord_ph_ven', 'cord_pco2_art', 'cord_pco2_ven']},
    {id: 'gH', title: "Hypercapnia context (adult, optional)", when: () => isAdult() && !isPregCtx() && !isCord(), hint: "All can be left \"unknown\". COPD is not diagnosed from a blood gas; these fields only show the limit of the interpretation. In the previous-gas fields, enter a known gas from a stable phase; temperature and unit (mmHg) must be the same as for this sample.",
      f: ['copd_confirmed', 'hc_phase', 'hc_chronic_confirmed', 'prior_pco2', 'prior_hco3', 'prior_arterial', 'prior_stable', 'hc_renal', 'hc_diuretic', 'hc_alkali_vomit', 'spo2']},
    {id: 'g2', title: "Acid–base", open: true, hint: "Use actual HCO₃; standard HCO₃ and chemistry TCO₂ are separate fields. BE/BD is entered with its sign and its algorithm.", f: ['ph', 'pco2', W('hco3_actual', () => !isCord()), W('hco3_standard', isAdult), 'be', 'be_type']},
    {id: 'g3', title: "Electrolytes and anion gap", when: () => !isCord(), f: ['na', 'cl', 'tco2', 'k', W('albumin', isAdult), 'chem_same', W('chem_time', null, 'dt'), W('gas_hco3_for_ag', null, 'check')]},
    {id: 'g4', title: "Local references", when: () => !isCord(), hint: "Enter your own laboratory's values. The site does not fill empty fields with a default \"normal\" value; if there is no reference, the related classification and delta remain off.", f: ['ag_ref_low', 'ag_ref_high', W('ag_reference', isAdult), W('albumin_reference', isAdult), W('hco3_reference', isAdult), 'hh_tolerance']},
    {id: 'g5', title: "Oxygenation", when: () => !isCord(), hint: "PaO₂/FiO₂, OI, A–a and CaO₂ are calculated only for an arterial sample. FiO₂ must be the value at the time of sampling; select its unit explicitly.",
      f: ['pao2', 'fio2', 'fio2_quality', W('o2_support', isAdult), W('oxygen_device', null, 'text', true), W('normothermia', isAdult), W('barometric_mmhg', isAdult), W('baro_sealevel', isAdult, 'check'), W('hb', isAdult), W('saturation', isAdult), W('saturation_type', isAdult), W('dyshb', isAdult), 'cohb', 'methb']},
    {id: 'gO', title: "OI / OSI and respiratory support", open: true, when: () => isPed() && !isCord(), hint: "OI requires arterial PO₂ and mean AIRWAY pressure (not mean arterial pressure). For OSI, SpO₂ is entered as a percentage (95; not 0.95). The PALICC-2 (pediatric) and Montreux (neonatal) tables are separate.",
      f: ['paw', 'support_concurrent', 'spo2', 'spo2_site', 'signal', 'stable', W('vent_type', isPed), W('rds_confirmed', isNeo), W('pards_confirmed', () => S.age_group === 'pediatric'), W('pards_hours', () => S.age_group === 'pediatric'),
        W('cyanotic_chd', () => S.age_group === 'pediatric'), W('baseline_imv', () => S.age_group === 'pediatric'), W('nards_confirmed', isNeo)]},
    {id: 'gR', title: "Kidney context, KRT and urine (optional)", when: () => !isCord(), hint: "Kidney context is clinically confirmed information; it is not filled in from the blood gas, and \"unknown\" is not counted as CKD or as normal kidneys. Urine electrolytes are entered from the same urine sample; missing K is not counted as zero. The site does not produce an AKI stage, RTA subtype, dialysis decision or prescription.",
      f: ['renal_context', 'krt_modality', 'k_drug_context', 'urine_na', 'urine_k', 'urine_cl', 'urine_same_sample', 'urine_ph', 'diuretic_recent', 'alkali_given', 'urine_infection']},
    {id: 'gC', title: "Calcium and citrate (RCA, optional)", when: () => !isCord(), hint: "The ratio is calculated only from two systemic values explicitly entered in mmol/L. If they are not concurrent, it is not calculated; if concurrency is unknown, arithmetic only is shown and it is not interpreted in the citrate context. Post-filter (circuit) iCa does not enter the patient ratio; no unit conversion is performed. RCA use is confirmed separately; RCA is not assumed just because KRT is present.",
      f: ['total_ca', 'total_ca_site', 'ionized_ca', 'ionized_ca_site', 'ca_concurrent', 'rca_confirmed', 'calcium_need_trend']},
    {id: 'gT', title: "Toxicology and osmolal gap (optional)", when: () => !isCord(), hint: "Suspicion is not a diagnosis; \"unknown\" does not mean no exposure. Clinical/toxicology evaluation does not wait for this form to be completed. For OG, glucose (with its unit) is taken from the Diabetic ketoacidosis section; if ethanol was not measured, leave it blank (it is not counted as 0). Enter only one of BUN or urea. The site does not produce \"normal OG\", \"excluded\", antidote or dialysis decisions.",
      f: ['tox_suspicion', 'tox_agent', 'tox_acute_chronic', 'tox_antidote', 'clinical_worsening', 'measured_osmolality', 'bun', 'urea', 'ethanol', 'osm_concurrent', 'og_profile', 'salicylate_value', 'lactate_method_a', 'lactate_method_b', 'lactate_methods_concurrent', 'organic_acid_context', 'acetone']},
    {id: 'g6', title: "Lactate", when: () => !isCord(), hint: "For serial measurement, add each value with its time.", f: [W('lactate_series', null, 'series')]},
    {id: 'g7', title: "Diabetic ketoacidosis", when: () => !isNeo() && !isCord(), hint: "The DKA card is separate from the acid–base classification; it also works on a venous sample. In children the ISPAD 2022 profile is used; missing ketones are not counted as negative.",
      f: ['glucose', 'beta_hydroxybutyrate', 'urine_ketones', W('diabetes_history', () => isAdult() && !isPregCtx()), W('diabetes_type', isPregCtx), W('feels_unwell', isPregCtx), W('poor_intake', isPregCtx), W('vomiting', isPregCtx), W('pump_issue', isPregCtx), W('steroid', isPregCtx),
        W('dka_confirmed', () => S.age_group === 'pediatric'), W('dka_followup', () => isAdult() && !isPregCtx(), 'check')]},
    {id: 'gQ', title: "Specimen and measurement quality", hint: "Unknown information is not counted as \"acceptable\"; it is listed as missing quality information. The site does not give a score, does not automatically reject the sample and does not correct values. For analysis time, enter your institution's approved protocol; no universal time is applied.",
      f: ['q_bubble', 'q_heparin', 'q_clot', 'q_hemolysis', 'q_catheter', W('q_flush', () => S.q_catheter === 'yes'), 'q_transport', 'q_storage', 'protocol_minutes', W('cord_clamp_time', isCord, 'dt'), 'q_device_error', 'q_manual', 'q_hydroxocobalamin', 'q_leukocytosis']},
    {id: 'g8', title: "Clinical context", hint: "Do not enter a name, ID number or record number. These fields do not enter the calculations and are not sent anywhere.", f: [W('clinical_context', null, 'textarea', true), W('support_change_time', null, 'dt')]}
  ];
  const specOf = sp => typeof sp === 'string' ? {id: sp} : sp;
  const visible = sp => { const x = specOf(sp); return !x.when || x.when(); };
  const DEFAULTS = () => ({sample_type: 'unknown', age_group: '', maternal_context: 'unknown', temperature_reporting: 'unknown', lactate_series: [{value: '', time: ''}]});
  let S = DEFAULTS(), lastR = null, resTab = 'short';

  function fieldHTML(sp) {
    const x = specOf(sp), id = x.id, kind = x.kind || (OPT[id] ? 'sel' : 'num');
    if (!visible(sp)) return '';
    const lab = `<label for="f-${id}">${esc(LBL[id] || id)}</label>`;
    const val = S[id] ?? '';
    if (kind === 'check') return `<div class="fld check"><input type="checkbox" id="f-${id}" data-f="${id}"${S[id] ? " checked" : ''}><label for="f-${id}">${esc(LBL[id])}</label></div>`;
    if (kind === 'series') return `<div class="lac" id="lac">${(S.lactate_series || []).map((e, i) => `<div class="lac-row"><div class="fld"><label for="lac-v${i}">Lactate ${i + 1} (mmol/L)</label><input id="lac-v${i}" inputmode="decimal" data-lac="${i}" data-k="value" value="${esc(e.value)}"></div><div class="fld"><label for="lac-t${i}">Time</label><input id="lac-t${i}" type="time" data-lac="${i}" data-k="time" value="${esc(e.time)}"></div><button type="button" data-lacdel="${i}" aria-label="Lactate ${i + 1} – delete" title="Delete">×</button></div>`).join('')}<button type="button" class="btn ghost sm" data-lacadd>+ Add lactate value</button></div>`;
    let ctl;
    if (kind === 'sel') ctl = `<select id="f-${id}" data-f="${id}">${OPT[id].map(([v, l]) => `<option value="${v}"${String(val) === v ? " selected" : ''}>${esc(l)}</option>`).join('')}</select>`;
    else if (kind === 'dt') ctl = `<input id="f-${id}" type="datetime-local" data-f="${id}" value="${esc(val)}">`;
    else if (kind === 'text') ctl = `<input id="f-${id}" type="text" data-f="${id}" value="${esc(val)}" autocomplete="off">`;
    else if (kind === 'textarea') ctl = `<textarea id="f-${id}" data-f="${id}" rows="3">${esc(val)}</textarea>`;
    else {
      ctl = `<input id="f-${id}" inputmode="decimal" autocomplete="off" data-f="${id}" value="${esc(val)}">`;
      const ukey = id === 'cord_pco2_art' ? 'cord_pco2' : id === 'salicylate_value' ? 'salicylate' : id, units = id === 'cord_pco2_ven' ? null : U[id];
      if (units) {
        /* Çocukta FiO2 birimi açıkça seçilir [P-R23]; erişkinde görünen varsayılan motora da aynen gönderilir */
        const opts = units.map(u => Array.isArray(u) ? u : [u, u]);
        if (id === 'fio2' && isPed()) opts.unshift(['', "unit?"]);
        if (S[ukey + '_unit'] == null) S[ukey + '_unit'] = opts[0][0];
        ctl += `<select class="unit" data-f="${ukey}_unit" aria-label="${esc(LBL[id])} unit">${opts.map(([v, l]) => `<option value="${v}"${S[ukey + '_unit'] === v ? " selected" : ''}>${esc(l)}</option>`).join('')}</select>`;
      }
      if (id === 'cord_pco2_ven') ctl += `<span class="chip">${esc(S.cord_pco2_unit || 'kPa')}</span>`;
    }
    return `<div class="fld${x.wide ? " wide" : ''}" data-fld="${id}">${lab}<div class="ctl">${ctl}</div><div class="msg" hidden></div></div>`;
  }
  const groupCount = g => g.f.filter(visible).map(sp => specOf(sp).id).filter(k => k === 'lactate_series' ? (S.lactate_series || []).some(e => String(e.value).trim()) : S[k] != null && S[k] !== '' && S[k] !== 'unknown' && S[k] !== false).length;
  const groupBody = g => (g.hint ? `<p class="hint">${esc(g.hint)}</p>` : '') + g.f.map(fieldHTML).join('');
  function formHTML() {
    const caseOpts = C.cases.map(c => `<option value="${c.id}">${c.id} · ${esc(c.baslik)}</option>`).join('');
    return `<div class="toolbar">
        <select class="case-pick" id="casePick" aria-label="Load synthetic case"><option value="">Load synthetic case…</option><optgroup label="Adult cases">${caseOpts}</optgroup><optgroup label="Hypercapnia cases (round 7)">${C.koah.cases.filter(k => k.mode === 'eval').map(k => `<option value="${k.id}">${k.id} · ${esc(k.baslik)}</option>`).join('')}</optgroup>${Object.keys(R8G).map(g => `<optgroup label="${esc(R8G[g])}">${C.r810.cases.filter(k => k.grup === g && k.mode === 'eval').map(k => `<option value="${k.id}">${k.id} · ${esc(k.baslik)}</option>`).join('')}</optgroup>`).join('')}<optgroup label="Pediatric and neonatal examples">${PED_DEMOS.filter(d => !d.g).map(d => `<option value="${d.id}">${d.id} · ${esc(d.title)}</option>`).join('')}</optgroup><optgroup label="Pregnancy examples">${PED_DEMOS.filter(d => d.g).map(d => `<option value="${d.id}">${d.id} · ${esc(d.title)}</option>`).join('')}</optgroup></select>
        <button type="button" class="btn ghost sm" id="clearForm">Clear</button>
      </div>
      ${GROUPS.filter(g => !g.when || g.when()).map((g, i) => `<details class="fs" data-g="${g.id}"${g.open || openGroups.has(g.id) ? " open" : ''}><summary><span class="n">${i + 1}</span>${esc(g.title)}<span class="cnt">${groupCount(g) || ''}</span></summary><div class="body">${groupBody(g)}</div></details>`).join('')}`;
  }
  const openGroups = new Set();
  /* Pediatri/yenidoğan örnek girişleri: ikinci tur senaryolarından türetilmiş sentetik veriler (tam hasta olgusu değildir) */
  const PED_DEMOS = [
    {id: 'P-C02', title: "Child, invasive ventilation: OI and PALICC-2", v: {age_group: 'pediatric', care_context: 'picu', sample_type: 'arterial', fio2: "0.8", fio2_unit: 'fraction', paw: '12', pao2: '60', vent_type: 'invasive', pards_confirmed: 'yes', pards_hours: '4', support_concurrent: 'yes'}},
    {id: 'P-C05', title: "Child: OSI and SpO₂ ceiling", v: {age_group: 'pediatric', care_context: 'picu', sample_type: 'peripheral_venous', fio2: "0.6", fio2_unit: 'fraction', paw: '12', spo2: '98', signal: 'good', stable: 'yes', vent_type: 'invasive'}},
    {id: 'P-C09', title: "Neonate: Montreux moderate threshold", v: {age_group: 'neonatal', care_context: 'nicu', sample_type: 'arterial', fio2: "0.5", fio2_unit: 'fraction', paw: '8', pao2: '50', nards_confirmed: 'yes', ga_weeks: '34', ga_days: '2', postnatal_days: '3'}},
    {id: 'P-C15', title: "Pediatric DKA: pH and HCO₃ severity mismatch", v: {age_group: 'pediatric', sample_type: 'peripheral_venous', ph: "7.2", tco2: "4.9", glucose: '25', glucose_unit: 'mmol/L', beta_hydroxybutyrate: '5', dka_confirmed: 'yes'}},
    {id: 'P-C17', title: "Child: euglycemic possibility", v: {age_group: 'pediatric', sample_type: 'peripheral_venous', ph: "7.2", glucose: '10', glucose_unit: 'mmol/L', beta_hydroxybutyrate: '4'}},
    {id: 'P-C19', title: "Neonate: postmenstrual age", v: {age_group: 'neonatal', care_context: 'nicu', sample_type: 'capillary', ga_weeks: '30', ga_days: '4', postnatal_days: '14'}},
    {id: 'P-C20', title: "Suspicious cord pair", v: {age_group: 'neonatal', sample_type: 'cord_artery', cord_ph_art: "7.2", cord_ph_ven: "7.215", cord_pco2_art: '7', cord_pco2_ven: '6', cord_pco2_unit: 'kPa'}},
    {id: 'P-C22', title: "Neurological impairment at 35 weeks", v: {age_group: 'neonatal', care_context: 'nicu', sample_type: 'arterial', ga_weeks: '35', ga_days: '0', neuro: 'yes', perinatal_event: 'yes'}},
    {id: 'G-C01', title: "Pregnant: pattern resembling physiological adaptation", g: 1, v: {age_group: 'adult', maternal_context: 'pregnant', sample_owner: 'mother', sample_type: 'arterial', temperature_reporting: '37C_uncorrected', ph: "7.44", pco2: '30', hco3_actual: "19.69", ga_weeks: '32', ga_days: '0'}},
    {id: 'G-C02', title: "Pregnant: PaCO₂ 40 with dyspnea", g: 1, v: {age_group: 'adult', maternal_context: 'pregnant', sample_owner: 'mother', sample_type: 'arterial', ph: "7.4", pco2: '40', hco3_actual: '24', resp_symptoms: 'yes', o2_profile: 'bts', hypercapnia_risk: 'no', spo2: '93'}},
    {id: 'G-C05', title: "Pregnant: suspected euglycemic ketoacidosis", g: 1, v: {age_group: 'adult', maternal_context: 'pregnant', sample_owner: 'mother', sample_type: 'peripheral_venous', ph: "7.22", tco2: '10', glucose: '8', glucose_unit: 'mmol/L', beta_hydroxybutyrate: '4', diabetes_type: 't1'}},
    {id: 'G-C11', title: "Pregnant: NICE high-risk branch", g: 1, v: {age_group: 'adult', maternal_context: 'pregnant', sample_owner: 'mother', sample_type: 'arterial', lactate_series: [{value: "4.01", time: ''}], infection: 'yes', sepsis_high_risk: 'yes', sbp: '100'}},
    {id: 'G-C14', title: "Mother well oxygenated, fetal concern", g: 1, v: {age_group: 'adult', maternal_context: 'labor', sample_owner: 'mother', sample_type: 'arterial', spo2: '98', maternal_hypoxia: 'no', fetal_assessment: 'concern', labor_stage: '1'}},
    {id: 'P-R17', title: "Delivery room: SpO₂ target at minute 3", v: {age_group: 'neonatal', care_context: 'delivery', sample_type: 'unknown', postnatal_minutes: '3', spo2: '72', spo2_site: 'right_hand'}}
  ];

  /* ================= Sonuç ================= */
  const ORDER = ['quality', 'sample', 'cord', 'cordpair', 'hie', 'hh', 'ph', 'proc', 'hcap', 'ag', 'agk', 'agc', 'delta', 'tox', 'og', 'salicylate', 'lacgap', 'renal', 'uag', 'urine', 'caratio', 'pf', 'aa', 'cao2', 'oi', 'osi', 'pards', 'nards', 'rds', 'delivery', 'preg', 'co2rel', 'o2target', 'fetal', 'pe', 'o2delivery', 'sepsis', 'dyshb', 'lactate', 'dka', 'dkares', 'base', 'age'];
  const MCTX = Object.fromEntries(OPT.maternal_context);
  const AGE = {adult: "adult", pediatric: "child", neonatal: "neonate"};
  const SEV = {mild: "mild", moderate: "moderate", severe: "severe", not_severe: "below the severe threshold"};
  const BETYPE = Object.fromEntries(OPT.be_type);
  const SAMPLE = Object.fromEntries(OPT.sample_type);
  const stChip = s => `<span class="st ${s}">${esc(t('status.' + s))}</span>`;
  // Genel ürün kapsamı ayrıntıda; klinik uyarılar ve uygulanabilirlik koşulları görünür kalır.
  const SCOPE_NOTES = new Set(['hc_no_treatment', 'renal_no_treatment', 'tox_no_treatment', 'no_fluid_order']);
  const msgs = list => {
    if (!list || !list.length) return '';
    const render = items => items.length ? `<ul class="msgs">${items.map(m => `<li>${esc(t('m.' + m))}</li>`).join('')}</ul>` : '';
    const scope = list.filter(m => SCOPE_NOTES.has(m));
    return render(list.filter(m => !SCOPE_NOTES.has(m))) + (scope.length ? `<details class="small"><summary>Scope notes</summary>${render(scope)}</details>` : '');
  };
  const needs = list => list && list.length ? `<p class="need">Required: ${list.map(f => esc(LBL[f] || f)).join(' · ')}</p>` : '';
  function calc(fid, lines) {
    const F = FORM[fid] || R8FORM[fid];
    return `<details class="calc"><summary>Show calculation · ${esc(F.ad)}</summary><div class="f"><b>${esc(fid)}</b>: ${esc(F.ifade)}\n${lines.map(esc).join('\n')}</div>
      <p class="small"><b>Condition:</b> ${esc(F.uygulama_kosullari)}. <b>Limit:</b> ${esc(F.sinirlamalar)} ${cite(F.kaynak_ids)}</p></details>`;
  }
  const card = (m, title, body) => `<section class="card ${m.status}" id="mod-${m.id}"><div class="card-h"><h3>${esc(title || t('mod.' + m.id))}</h3>${stChip(m.status)}</div>${body}${m.src && m.src.length ? `<p class="srcs">Source: ${cite(m.src)}</p>` : ''}</section>`;

  function hypHTML(h, R) {
    const n = R.n;
    const why = tf('h.why.' + h.id, {h: n1(n.hco3_actual), p: n1(n.pco2)});
    let body = '';
    if (h.id === 'met_acid' || h.id === 'met_alk') {
      const key = h.pos === 'within' ? 'h.met.within' : `h.met.${h.pos}.${h.id}`;
      body = `<p>${esc(tf(key, {m: n1(h.measured), lo: n1(h.exp.lo), hi: n1(h.exp.hi)}))}</p>` + KGC.range({lo: h.exp.lo, hi: h.exp.hi, center: h.exp.center, measured: h.measured, unit: 'mmHg', title: "Expected PaCO₂ range"}) +
        calc(h.formula, [`= ${h.formula === 'winter' ? "1.5" : "0.7"} × ${n1(n.hco3_actual)} + ${h.formula === 'winter' ? 8 : 20} = ${n2(h.exp.center)} mmHg`, `range ${n2(h.exp.lo)}–${n2(h.exp.hi)} mmHg (limits inclusive) · measured ${n1(h.measured)} mmHg`]);
    } else {
      body = `<p>${esc(tf('h.resp.est', {a: n2(h.acute), c: n2(h.chronic), m: n1(h.measured)}))}</p><p>${esc(h.pos === 'between' ? (h.nearer === 'equal' ? t('h.resp.equidistant') : tf('h.resp.between', {near: t('h.near.' + h.nearer)})) : t('h.resp.' + h.pos))} ${esc(t('h.resp.chronicity'))}</p>` +
        KGC.points({acute: h.acute, chronic: h.chronic, measured: h.measured, unit: 'mmol/L'}) +
        calc(h.formula[0], [`acute: 24 ${h.id === 'resp_acid' ? "+ 0.1 × (" + n1(n.pco2) + ' − 40)' : "− 0.2 × (40 − " + n1(n.pco2) + ')'} = ${n2(h.acute)} mmol/L`]) +
        calc(h.formula[1], [`chronic: 24 ${h.id === 'resp_acid' ? "+ 0.35 × (" + n1(n.pco2) + ' − 40)' : "− 0.41 × (40 − " + n1(n.pco2) + ')'} = ${n2(h.chronic)} mmol/L`]);
    }
    return `<div class="hyp"><h4>${esc(t('h.' + h.id))}</h4><p class="why">${esc(why)}</p><p class="al">${esc(t('h.align.' + h.align))}</p>${body}<p class="srcs small">Source: ${cite(h.src)}</p></div>`;
  }

  function moduleHTML(m, R) {
    const n = R.n;
    switch (m.id) {
      case 'quality': {
        const rows = [["Sample", SAMPLE[m.sample]], ...(R.scope === 'adult' ? [["Pregnancy context", n.maternal_context === 'unknown' ? "unknown (non-pregnant adult reference)" : MCTX[n.maternal_context]], ...(n.pregnancy === 'yes' ? [["Sample owner", OPT.sample_owner.find(o => o[0] === n.sample_owner)[1]]] : [])] : [["Age group", AGE[n.age_group]]]),
          ["Temperature reporting", (OPT.temperature_reporting.find(o => o[0] === m.temp) || [])[1]], ["Sample / analysis time", [m.times.sample, m.times.analysis].map(x => x || '–').join(' / ')],
          ["Pressure unit", `PCO₂ ${m.units.pco2}, PO₂ ${m.units.pao2}${m.units.pco2 === 'kPa' || m.units.pao2 === 'kPa' ? " (for the calculation, mmHg = kPa / 0.1333224)" : ''}`]];
        return card(m, null, `<dl class="kv">${rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>${msgs(m.msgs)}${R.errors.length ? `<ul class="msgs">${R.errors.map(e => `<li><b>${esc(LBL[e.field] || e.field)}</b>: ${esc(t('err.' + e.code))}</li>`).join('')}</ul>` : ''}`);
      }
      case 'hh':
        if (m.status === 'veri_eksik' || m.status === 'uygulanamaz') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n2(m.calc))}<small>pH calculated by HH</small></p><p>Entered pH ${esc(num(n.ph, 3))} · difference ${esc(Math.abs(m.diff) < 0.0005 ? "0.000" : (m.diff > 0 ? '+' : '−') + num(Math.abs(m.diff), 3))}</p>${msgs(m.msgs)}` +
          calc('hh-ph', [`= 6.1 + log10(${n1(n.hco3_actual)} / (0.03 × ${n1(n.pco2)})) = ${num(m.calc, 3)}`, `possible range with rounding margin: ${num(m.range[0], 3)}–${num(m.range[1], 3)}${m.tol != null ? ` · laboratory tolerance ±${num(m.tol, 3)}` : " · laboratory tolerance not defined"}`, "The range covers the rounding margin of the digits entered and two sets of constants: the atlas formula (pK 6.1; 0.03) and the IFCC constants used by blood gas analyzers (pK 6.095; 0.0307 mmol/L/mmHg; HCO₃ = 0.0307 × PCO₂ × 10^(pH − 6.095)). This is a product decision; it is not a clinical tolerance."]));
      case 'ph':
        if (m.local) return card(m, null, `<p class="big">${esc(num(m.value, 3))}<small>${esc({below: "below the local reference", within: "within the local reference range", above: "above the local reference"}[m.cls])} (${esc(num(m.ref[0], 2))}–${esc(num(m.ref[1], 2))})</small></p>${m.pco2Cls ? `<p>PCO₂ ${esc(n1(n.pco2))} mmHg: ${esc({below: "below the local reference", within: "within the local reference range", above: "above the local reference"}[m.pco2Cls])} (${esc(num(m.pco2Ref[0], 0))}–${esc(num(m.pco2Ref[1], 0))})</p>` : ''}${m.refSrc ? `<p class="small">Reference: ${esc(m.refSrc)}</p>` : ''}${msgs(m.msgs)}`);
        if (!m.dir) return card(m, null, (m.value != null ? `<p class="big">${esc(num(m.value, 3))}</p>` : '') + needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(num(m.value, 3))}<small>${esc({acidemia: "acidemia", alkalemia: "alkalemia", within: "within the reference range"}[m.dir])}</small></p><p class="small">Adult arterial educational reference pH 7.35–7.45. The direction of pH is an observation; acid–base processes are separate hypotheses.</p>${msgs(m.msgs)}` +
          (has(n.pco2) ? KGC.map([{ph: m.value, pco2: n.pco2, label: "this sample"}]) : ''));
      case 'proc':
        if (!m.hyps) return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, msgs(m.msgs) + m.hyps.map(h => hypHTML(h, R)).join(''));
      case 'ag': {
        if (m.status === 'veri_eksik') return card(m, null, needs(m.need));
        const cls = m.cls ? tf('ag.cls.' + m.cls, {lo: num(m.interval[0], 0), hi: num(m.interval[1], 0)}) : m.vsRef ? tf('ag.vs.' + m.vsRef, {r: num(n.ag_reference, 0)}) : '';
        const bic = m.method === 'tco2' ? n.tco2 : n.hco3_actual;
        return card(m, null, `<p class="big">${esc(n1(m.value))}<small>mmol/L · ${m.method === 'tco2' ? "with TCO₂" : "with blood gas HCO₃"}</small></p>${cls ? `<p><b>${esc(cls)}</b></p>` : ''}${msgs(m.msgs)}` +
          calc('anion-gap', [`= ${n1(n.na)} − ${n1(n.cl)} − ${n1(bic)} = ${n1(m.value)} mmol/L`, "Potassium not included."]));
      }
      case 'agc':
        if (m.status !== 'hesaplandi') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n1(m.value))}<small>mmol/L</small></p>${KGC.ag({measured: m.measured, corrected: m.value, ref: n.ag_reference, interval: has(n.ag_ref_low) && has(n.ag_ref_high) ? [n.ag_ref_low, n.ag_ref_high] : null})}${msgs(m.msgs)}` +
          calc('ag-albumin', [`= ${n1(m.measured)} + 2.5 × (${n1(m.albRef)} − ${n2(m.albumin)}) = ${n1(m.value)} mmol/L`, "Albumin was used in g/dL (divided by 10 if entered in g/L)."]));
      case 'delta':
        if (m.status === 'veri_eksik') return card(m, null, needs(m.need) + msgs(m.msgs));
        if (m.status === 'uygulanamaz') return card(m, null, `<ul class="msgs">${m.msgs.map(c => `<li>${esc(tf('m.' + c, {ag: n1(m.agUse), r: num(m.agRef, 0)}))}</li>`).join('')}</ul>`);
        return card(m, null, `<p class="big">${esc((m.gap > 0 ? '+' : '') + n1(m.gap))}<small>delta gap, mmol/L</small></p><p>Delta ratio: <b>${m.ratio == null ? "not calculated" : esc(n2(m.ratio))}</b> (${esc(n1(m.num))} / ${esc(n1(m.den))})</p>${msgs(m.msgs)}` +
          calc('delta-gap', [`= (${n1(m.agUse)} − ${n1(m.agRef)}) − (${n1(m.hco3Ref)} − ${n1(m.tco2)}) = ${n1(m.gap)}`, `AG ${m.corrected ? "albumin-corrected" : "measured (no correction)"} · references are user input`]) +
          (m.ratio != null ? calc('delta-ratio', [`= (${n1(m.agUse)} − ${n1(m.agRef)}) / (${n1(m.hco3Ref)} − ${n1(m.tco2)}) = ${n2(m.ratio)}`, "With a small denominator the ratio is unstable."]) : ''));
      case 'pf':
        if (m.status !== 'hesaplandi') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(num(m.value, 0))}<small>mmHg</small>${m.approx ? "<span class=\"approx\">approximate</span>" : ''}</p>${msgs(m.msgs)}` +
          calc('pf', [`= ${n1(m.pao2)} / ${n2(m.fio2)} = ${num(m.value, 0)} mmHg`, "FiO₂ was used as a fraction."]));
      case 'aa':
        if (m.status !== 'hesaplandi') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n1(m.value))}<small>mmHg</small></p>${msgs(m.msgs)}${m.sealevel ? "<p class=\"small\">Barometric pressure: sea-level assumption (760 mmHg) selected by the user.</p>" : ''}` +
          calc('aa-roomair', [`= 0.21 × (${num(m.baro, 0)} − 47) − ${n1(n.pco2)} / 0.8 − ${n1(n.pao2)} = ${n1(m.value)} mmHg`]));
      case 'cao2':
        if (m.status !== 'hesaplandi') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n1(m.value))}<small>mL O₂/dL</small></p><p class="small">Saturation type: ${esc(OPT.saturation_type.find(o => o[0] === m.satType)[1])}</p>` +
          calc('cao2', [`= 1.34 × ${n1(m.hb)} × ${n2(m.sat)} + 0.0031 × ${n1(n.pao2)} = ${num(m.value, 2)} mL/dL`]));
      case 'dyshb':
        return card(m, null, `${has(m.cohb) ? `<p>COHb: <b>${esc(n1(m.cohb))} %</b></p>` : ''}${has(m.methb) ? `<p>MetHb: <b>${esc(n1(m.methb))} %</b></p>` : ''}${msgs(m.msgs)}<p class="small">Evaluate with the local reference and the clinical exposure history; this site has no threshold or severity classification.</p>`);
      case 'lactate':
        if (m.status === 'veri_eksik') return card(m, null, needs(m.need));
        return card(m, null, (m.change != null ? `<p class="big">${esc((m.change > 0 ? '−' : m.change < 0 ? '+' : '') + n1(Math.abs(m.change)))}<small>% (first → last value)</small></p>` : '') + KGC.lactate(m.series) + msgs(m.msgs) +
          (m.change != null ? calc('lactate-change', [`= 100 × (${n1(m.series[0].v)} − ${n1(m.series[m.series.length - 1].v)}) / ${n1(m.series[0].v)} = ${n1(m.change)} %`, "A positive result means a decrease; a negative result means an increase."]) : ''));
      case 'dka': if (!m.comp) return card(m, null, needs(m.need) + msgs(m.msgs)); if (m.ped) return pedDkaHTML(m, R); if (m.preg) return pregDkaHTML(m, R);
      {
        const S3 = {yes: "met", no: "not met", missing: "data missing"};
        const sub = (v, l) => `${esc(l)}: ${v === true ? "met" : v === false ? "not met" : "no data"}`;
        const c = m.comp, glu = n.glucose_unit === 'mmol/L' ? "≥11.1 mmol/L" : "≥200 mg/dL";
        const rows = [
          ["History of diabetes or hyperglycemia", c.diabetes.state, [sub(c.diabetes.dm, "history of diabetes"), sub(c.diabetes.glucose, "glucose " + glu)]],
          ["Ketone criterion", c.ketosis.state, [sub(c.ketosis.bhb, "β-hydroxybutyrate ≥3.0 mmol/L"), sub(c.ketosis.uk, "urine ketones ≥2+")]],
          ["Acidosis", c.acidosis.state, [sub(c.acidosis.ph, "pH <7.3"), sub(c.acidosis.bic, (c.acidosis.bicSrc === 'gas_hco3' ? "blood gas HCO₃" : "HCO₃ (TCO₂)") + ' <18 mmol/L')]]
        ];
        return card(m, null, `<div class="tbl"><table><thead><tr><th>Component</th><th>Status</th><th>Subcriteria</th></tr></thead><tbody>${rows.map(([k, s, subs]) => `<tr><td>${esc(k)}</td><td><b>${esc(S3[s])}</b></td><td class="small">${subs.join('<br>')}</td></tr>`).join('')}</tbody></table></div>
          <p>Components numerically met: <b>${m.met} / 3</b></p>${msgs(m.msgs)}`);
      }
      case 'dkares': {
        const yn = v => v === true ? "met" : v === false ? "not met" : "no data";
        return card(m, null, `<ul class="msgs"><li>Plasma ketones (β-hydroxybutyrate) &lt;0.6 mmol/L: <b>${yn(m.ket)}</b></li><li>${m.phVenous ? "Venous " : ''}pH ≥7.3: <b>${yn(m.phr)}</b>${m.phVenous ? '' : " (the criterion is defined by venous pH)"} · or HCO₃ ≥18 mmol/L: <b>${yn(m.br)}</b></li><li>Glucose ideally &lt;200 mg/dL: <b>${m.glucoseBelow == null ? "no data" : m.glucoseBelow ? "yes" : "no"}</b></li></ul>
          <p>Resolution criteria (ketone <b>and</b> acidosis component): <b>${{yes: "numerically met", no: "not met", missing: "data missing"}[m.all]}</b></p>${msgs(m.msgs)}`);
      }
      case 'preg': {
        const P = {below: "below", within: "within", above: "above"};
        const cell = (rng, c, d) => rng ? `${num(rng[0], d)}–${num(rng[1], d)}${c ? ` <span class="muted">(${P[c]})</span>` : ''}` : '–';
        const tbl = m.rows ? `<div class="tbl"><table><thead><tr><th>Review</th><th>pH</th><th>PaCO₂ (mmHg)</th><th>HCO₃ (mmol/L)</th></tr></thead><tbody>${m.rows.map(r => `<tr><td>${cite([r.src])}</td><td>${cell(r.ph, r.cph, 2)}</td><td>${cell(r.pco2, r.cpco2, 0)}</td><td>${cell(r.hco3, r.chco3, 0)}</td></tr>`).join('')}</tbody></table></div><p class="small muted">In parentheses: the position of the entered value relative to that review's range. Data type: review physiology; not an automatic normal label.</p>` : '';
        return card(m, null, msgs(m.msgs) + tbl);
      }
      case 'co2rel': return card(m, null, `<p class="big">${esc(n1(m.pco2))}<small>mmHg PaCO₂</small></p>${msgs(m.msgs)}`);
      case 'o2target': {
        const KIND = {kilavuz: "Guideline recommendation", ozel_kilavuz: "Guideline, specific context", derleme: "Review target", gorus: "Clinical opinion"};
        const COND = {bts_general: "most acutely ill pregnant patients", bts_hypercapnic: "risk of hypercapnic failure", covid: "COVID-19, selected patient, reassuring fetal status"};
        const sel = m.target ? `<p>Selected profile: <b>${esc(OPT.o2_profile.find(o => o[0] === m.profile)[1])}</b> · target SpO₂ <b>${pct(m.target[0], m.target[1])}</b>${m.pos ? ` · measured ${pct(esc(n1(m.spo2)))}: <b>${{below: "below target", within: "within target range", above: "above target"}[m.pos]}</b>` : ''}</p>` : "<p><b>No target selected.</b></p>";
        return card(m, null, sel + msgs(m.msgs) + `<div class="tbl"><table><thead><tr><th>Source</th><th>Data type</th><th>Target</th><th>Context</th></tr></thead><tbody>${m.sources.map(x => `<tr><td>${cite([x.src])}</td><td>${esc(KIND[x.kind])}</td><td>${x.spo2 ? `SpO₂ ${pct(x.spo2[0], x.spo2[1])}` : esc(x.text)}</td><td class="small">${esc(COND[x.cond] || "not a single threshold validated for all pregnant patients")}</td></tr>`).join('')}</tbody></table></div><p class="small muted">The sources are not at the same level of evidence; they are not averaged and not merged into a combined range.</p>`);
      }
      case 'fetal': case 'pe': case 'o2delivery': return card(m, null, msgs(m.msgs));
      case 'sepsis':
        return card(m, null, `${m.branch ? `<p>NICE high-risk branch (lactate &gt;4 mmol/L or systolic ≤90 mmHg): <b>${{met: "met", not_met: "not met", missing: "data missing"}[m.branch]}</b>${m.lac != null ? ` · lactate ${esc(n1(m.lac))}` : ''}${m.sbp != null ? ` · systolic ${esc(num(m.sbp, 0))}` : ''}</p>` : ''}${msgs(m.msgs)}`);
      case 'sample': {
        const PRM = {po2: 'PO₂', pco2: 'PCO₂', ph: 'pH', hco3: 'HCO₃', lytes: "electrolytes", glucose: "glucose", sat: "saturation/co-oximetry", thb: 'tHb', lactate: "lactate", be: 'BE'};
        const li = w => `<li>${esc(t('qw.' + w.code))}${w.params.length ? ` <span class="small muted">· may be affected: ${w.params.map(p => PRM[p]).join(', ')}</span>` : ''} <span class="small muted">· triggering field: ${esc(LBL[w.field] || w.field)}</span> ${cite(w.src)}</li>`;
        const mm = v => v == null ? '–' : num(v, 0) + " min";
        const times = `<dl class="kv"><dt>Sample → analysis</dt><dd>${mm(m.delay)}${m.protocol != null ? ` · institutional protocol ${num(m.protocol, 0)} min` : " · institutional protocol not entered"}</dd>${m.supportMin != null && m.supportMin >= 0 ? `<dt>Last support change → sample</dt><dd>${mm(m.supportMin)}</dd>` : ''}${m.cord ? `<dt>Birth → clamping</dt><dd>${mm(m.cord.birthToClamp)}</dd><dt>Clamping → sample</dt><dd>${mm(m.cord.clampToSample)}</dd>` : ''}</dl>`;
        const notes = [m.protocol == null && m.delay != null ? `<li>Sources report different times (e.g., AARC 2013, ANZSRS 2024, AARC 2022 capillary); this site applies no universal time, and the absence of a protocol does not mean "acceptable". ${cite([1, 21, 59, 70])}</li>` : '',
          m.supportMin != null && m.supportMin >= 0 ? `<li>The Croatian national recommendation recommends waiting 20–30 minutes after a ventilation change for steady state; in an emergency the blood gas is drawn immediately. An early sample may reflect the transition period; it is not counted as "impaired". ${cite([58])}</li>` : '',
          m.cord ? `<li>Delay in the cord may affect lactate and base excess in particular; values at the moment of birth are not back-calculated. ${cite([76])}</li>` : ''].join('');
        return card(m, null, times + (notes ? `<ul class="msgs">${notes}</ul>` : '') +
          `<h4 style="margin-top:6px">Known error (${m.known.length})</h4>${m.known.length ? `<ul class="msgs">${m.known.map(li).join('')}</ul>` : "<p class=\"small\">No known specimen error in the entered information. This does not mean the specimen is acceptable.</p>"}
          <h4 style="margin-top:6px">Possible effect (${m.possible.length})</h4>${m.possible.length ? `<ul class="msgs">${m.possible.map(li).join('')}</ul>` : '<p class="small">–</p>'}
          <h4 style="margin-top:6px">Missing quality information (${m.unknown.length})</h4>${m.unknown.length ? `<p class="small">${m.unknown.map(f => esc(LBL[f] || f)).join(' · ')}</p>` : '<p class="small">–</p>'}` + msgs(m.msgs));
      }
      case 'base':
        return card(m, null, `<p class="big">${esc((m.value > 0 ? '+' : '') + n1(m.value))}<small>mmol/L · ${esc(BETYPE[m.type])}</small></p>${msgs(m.msgs)}`);
      case 'age':
        if (m.status !== 'hesaplandi') return card(m, null, (m.ga ? `<p>Gestation at birth: <b>${m.ga[0]} weeks ${m.ga[1]} days</b></p>` : '') + needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${m.pmaW} weeks ${m.pmaD} days<small>postmenstrual age</small></p><p>Gestation at birth ${m.ga[0]} weeks ${m.ga[1]} days${m.gaDaysGiven ? '' : " (days not entered, taken as 0)"} + postnatal ${m.pnd} completed days</p>${msgs(m.msgs)}` +
          calc('P-F03', [`= 7 × ${m.ga[0]} + ${m.ga[1]} + ${m.pnd} = ${m.pma} days = ${m.pmaW} weeks ${m.pmaD} days`]));
      case 'oi':
        if (m.status === 'veri_eksik' || m.status === 'uygulanamaz') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n1(m.value))}</p>${msgs(m.msgs)}` + calc('P-F01', [`= 100 × ${n2(m.fio2)} × ${n1(m.paw)} cmH₂O / ${n1(m.pao2)} mmHg = ${n1(m.value)}`, "FiO₂ as a fraction; mean airway pressure in cmH₂O; PaO₂ in mmHg."]));
      case 'osi':
        if (m.status === 'veri_eksik') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n1(m.value))}<small>${m.classifiable ? "Measurement eligible for PALICC-2 classification" : "arithmetic only; classification halted"}</small></p>${msgs(m.msgs)}` + calc('P-F02', [`= 100 × ${n2(n.fio2)} × ${n1(n.paw)} / ${n1(m.spo2)} = ${n1(m.value)}`, "SpO₂ is used as a percentage (e.g., 90)."]));
      case 'pards': {
        if (m.status === 'veri_eksik' && !m.crit) return card(m, null, needs(m.need) + msgs(m.msgs));
        if (m.status === 'uygulanamaz') return card(m, null, msgs(m.msgs));
        const crit = {met: "met", not_met: "not met", missing: "could not be evaluated", unverified: "measurement validity not confirmed"}[m.crit];
        return card(m, null, `<p>Oxygenation criterion (OI ≥4 or OSI ≥5): <b>${crit}</b>${m.basis ? ` · basis ${m.basis.toUpperCase()}` : ''}</p>
          <p>Severity (≥4 hours from diagnosis; OI ≥16 or OSI ≥12 severe): <b>${m.sev ? esc(SEV[m.sev]) : "no label given"}</b></p>${msgs(m.msgs)}<p class="small muted">Profile: PALICC-2 2023, invasive ventilation. The Montreux NARDS table is separate.</p>`);
      }
      case 'nards':
        if (m.status === 'veri_eksik') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p>OI ${esc(n1(m.oi))} · Montreux oxygenation severity: <b>${m.sev ? esc(SEV[m.sev]) : "no label given"}</b></p>${msgs(m.msgs)}`);
      case 'hcap': {
        const b = m.base, sg = v => (v > 0 ? '+' : '') + n1(v);
        const tb = b ? `<div class="tbl"><table><thead><tr><th></th><th>Previous gas (entered)</th><th>This sample</th><th>Difference</th></tr></thead><tbody><tr><td>PCO₂ (mmHg)</td><td>${esc(n1(b.pco2))}</td><td>${esc(n1(m.pco2))}</td><td>${esc(sg(b.dpco2))}</td></tr><tr><td>HCO₃ (mmol/L)</td><td>${esc(n1(b.hco3))}</td><td>${b.dhco3 == null ? '–' : esc(n1(b.hco3 + b.dhco3))}</td><td>${b.dhco3 == null ? '–' : esc(sg(b.dhco3))}</td></tr></tbody></table></div>` : '';
        return card(m, null, tb + msgs(m.msgs) + "<p class=\"small muted\">Educational card (round 7): does not produce a diagnosis, treatment, NIV/intubation, device setting or home device recommendation. Details: <a href=\"#/ogren/k-co2-neden-artar\">hypercapnia lessons</a>.</p>");
      }
      case 'rds':
        return card(m, null, msgs(m.msgs) + "<p class=\"small muted\">Data type: treatment target and treatment condition (European RDS consensus); not a reference range.</p>");
      /* ---------- 8–10. tur kartları: değer yalnız modül durumu izin veriyorsa gösterilir ---------- */
      case 'renal': {
        const RC = Object.fromEntries(OPT.renal_context), KM = Object.fromEntries(OPT.krt_modality);
        return card(m, null, `<dl class="kv"><dt>Kidney context</dt><dd>${esc(RC[m.ctx])}</dd><dt>KRT</dt><dd>${esc(KM[m.krt])}</dd></dl>${msgs(m.msgs)}` +
          (m.msgs.includes('renal_bicarb_evidence') ? "<p class=\"small\">Lessons: <a href=\"#/ogren/b03\">Bicarbonate evidence</a> · <a href=\"#/ogren/b04\">Gas before and after dialysis</a></p>" : '') +
          "<p class=\"small muted\">Educational card (round 8). Details: <a href=\"#/ogren/b01\">kidney and dialysis lessons</a>.</p>");
      }
      case 'uag':
        if (m.value == null) return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc((m.value > 0 ? '+' : '') + n1(m.value))}<small>mmol/L · ${m.status === 'hesaplandi' ? "same urine sample" : "arithmetic only"}</small></p>${msgs(m.msgs)}` +
          calc('uag', [`= ${n1(m.una)} + ${n1(m.uk)} − ${n1(m.ucl)} = ${n1(m.value)} mmol/L`, "It is not a measurement of urine ammonium."]));
      case 'urine': {
        const rows = [m.uph != null ? ["Urine pH", num(m.uph, 2)] : null, m.ucl != null ? ["Urine Cl⁻", n1(m.ucl) + ' mmol/L'] : null].filter(Boolean);
        return card(m, null, `<dl class="kv">${rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>${msgs(m.msgs)}${needs(m.need)}`);
      }
      case 'caratio':
        if (m.ratio == null) return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(caFmt(m))}<small>total Ca / iCa · ${m.status === 'gozden_gecirilmeli' && m.msgs.includes('ca_concurrency_unknown') ? "arithmetic only" : "systemic, concurrent, mmol/L"}</small></p>${msgs(m.msgs)}` +
          (m.assume ? "<p class=\"small\">Pregnancy context not selected: the note is shown assuming a non-pregnant adult.</p>" : '') +
          calc('systemic_total_ica_ratio', [`= ${num(m.tca, 6)} / ${num(m.ica, 6)} = ${num(m.ratio, 6)}`, "The source threshold is compared with the entered values; on-screen rounding does not enter the decision.", "Source profiles: 2026 Delphi ≥2.5 (used on the site) · 2023 expert opinion >2.5 or rising trend (in the lesson). The profiles are not merged."]) +
          "<p class=\"small muted\">Details: <a href=\"#/ogren/b05\">Citrate: accumulation or alkali load?</a></p>");
      case 'agk':
        if (m.value == null) return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n1(m.value))}<small>mmol/L · potassium-including · ${m.method === 'tco2' ? "with TCO₂" : "with blood gas HCO₃"}</small></p>${msgs(m.msgs)}` +
          calc('ag_with_k', [`= ${n1(R.n.na)} + ${n1(R.n.k)} − ${n1(R.n.cl)} − ${n1(m.method === 'tco2' ? R.n.tco2 : R.n.hco3_actual)} = ${n1(m.value)} mmol/L`, "The potassium-free AG is on a separate card (anion-gap)."]));
      case 'og': {
        if (m.ideal == null) return card(m, null, needs(m.need) + msgs(m.msgs));
        const nl = m.nitKind === 'bun' ? `BUN ${n1(R.n.bun)}/2.8` : `urea ${n1(R.n.urea)}`, gl = m.gluUnit === 'mmol/L' ? `glucose ${n1(R.n.glucose)}` : `glucose ${n1(R.n.glucose)}/18`;
        const head = m.value != null ? `<p class="big">${esc(n1(m.value))}<small>mOsm/kg · ${m.used === 'ethanol_zero' ? "ethanol 0 (measured)" : m.used === 'ideal_4_6' ? "ideal profile" : "Purssell profile"}${m.status === 'gozden_gecirilmeli' ? " · interpretation limited" : ''}</small></p>` : "<p><b>No definitive corrected OG given</b> (no profile selected).</p>";
        return card(m, null, head + `<div class="tbl"><table><thead><tr><th>Profile</th><th>Ethanol contribution</th><th>OG (mOsm/kg)</th></tr></thead><tbody>
          <tr${m.used === 'ideal_4_6' ? " style=\"background:var(--accent-soft)\"" : ''}><td>Ideal (÷ 4.6)</td><td>${esc(n2(KG.F2.ethanol_ideal_term(m.ethanol)))}</td><td>${esc(n2(m.ideal))}</td></tr>
          <tr${m.used === 'purssell' ? " style=\"background:var(--accent-soft)\"" : ''}><td>Purssell (÷ 3.7 − 0.35)</td><td>${esc(n2(KG.F2.ethanol_purssell_term(m.ethanol)))}</td><td>${esc(n2(m.purssell))}</td></tr></tbody></table></div>${msgs(m.msgs)}${needs(m.need)}` +
          calc('serum_osm_calculated', [`= 2 × ${n1(R.n.na)} + ${gl} + ${nl} = ${n2(m.calc)} mOsm/kg`, `measured ${n1(m.measured)} mOsm/kg · ethanol ${n1(m.ethanol)} mg/dL`]) +
          calc(m.used === 'purssell' ? 'serum_og_purssell_regression' : 'serum_og_ideal_ethanol', [`ideal: ${n1(m.measured)} − (${n2(m.calc)} + ${n1(m.ethanol)}/4.6) = ${n2(m.ideal)}`, `Purssell: ${n1(m.measured)} − (${n2(m.calc)} + (${n1(m.ethanol)}/3.7 − 0.35)) = ${n2(m.purssell)}${m.ethanol === 0 ? " (ethanol 0: contribution 0)" : ''}`]) +
          "<p class=\"small muted\">Details: <a href=\"#/ogren/t02\">Calculating the osmolal gap and the ethanol problem</a></p>");
      }
      case 'tox': {
        const TA = Object.fromEntries(OPT.tox_agent);
        return card(m, null, `<dl class="kv"><dt>Suspicion</dt><dd>${esc({yes: "present", no: "none (entered)", unknown: "unknown"}[m.suspicion])}</dd><dt>Substance</dt><dd>${esc(TA[m.agent])}</dd></dl>${msgs(m.msgs)}<p class="small muted">Education card (round 9). EXTRIP tables are not a personal treatment algorithm; they are not applied to the patient automatically. Details: <a href="#/ogren/t01">toxicology lessons</a>.</p>`);
      }
      case 'salicylate':
        if (m.mgdl == null) return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n1(m.mgdl))}<small>mg/dL · ${esc(n1(m.mgl))} mg/L (entered: ${esc(n1(m.input))} ${esc(m.unit)})</small></p>${msgs(m.msgs)}` +
          calc('salicylate_mg_l_to_mg_dl', [m.unit === 'mg/L' ? `= ${n1(m.input)} mg/L ÷ 10 = ${n1(m.mgdl)} mg/dL` : `entered unit mg/dL; ${n1(m.mgdl)} mg/dL = ${n1(m.mgl)} mg/L`]));
      case 'lacgap':
        if (m.diff == null) return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc((m.diff > 0 ? '+' : '') + n1(m.diff))}<small>mmol/L · method A − method B${m.status === 'hesaplandi' ? '' : " · arithmetic only"}</small></p>${msgs(m.msgs)}${needs(m.need)}` +
          calc('lactate_method_gap', [`= ${n1(m.a)} − ${n1(m.b)} = ${n1(m.diff)} mmol/L`]));
      case 'hie':
        return card(m, null, msgs(m.msgs));
      case 'delivery':
        if (m.status === 'veri_eksik') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p>Minute after birth: <b>${m.minute}</b>${m.row ? ` · preductal SpO₂ target <b>${pct(m.row[0], m.row[1])}</b>` : ''}${m.pos ? ` · measured ${pct(esc(n1(m.spo2)))}: <b>${{below: "below target", within: "within target range", above: "above target"}[m.pos]}</b>` : ''}</p>
          <div class="tbl"><table><thead><tr><th>Minute</th><th>Target SpO₂</th></tr></thead><tbody>${[2, 3, 4, 5, 10].map(k => `<tr${m.row && m.minute === k ? " style=\"background:var(--accent-soft)\"" : ''}><td>${k}</td><td>${pct(...{2: [65, 70], 3: [70, 75], 4: [75, 80], 5: [80, 85], 10: [85, 95]}[k])}</td></tr>`).join('')}</tbody></table></div>${msgs(m.msgs)}`);
      case 'cord':
        return card(m, null, `<p class="big">${esc(SAMPLE[m.vessel])}${m.ph != null ? `<small>pH ${esc(num(m.ph, 3))}${m.pco2 != null ? ` · PCO₂ ${esc(n1(m.pco2))} mmHg` : ''}</small>` : ''}</p>${msgs(m.msgs)}`);
      case 'cordpair':
        if (m.status === 'veri_eksik') return card(m, null, msgs(m.msgs));
        return card(m, null, `<p>ΔpH (vein − artery): <b>${m.dph == null ? '–' : esc(num(m.dph, 3))}</b> · ΔPCO₂ (artery − vein): <b>${m.dpco2 == null ? '–' : esc(num(m.dpco2, 2)) + ' kPa'}</b></p>${msgs(m.msgs)}` +
          calc('P-F04', ["ΔpH = pH vein − pH artery; ΔPCO₂ = PCO₂ artery − PCO₂ vein (kPa; × 0.1333224 if entered in mmHg)", "Quality rule: ΔpH <0.02 or ΔPCO₂ <0.5 kPa → warning (equality does not trigger a warning)"]));
      default: return '';
    }
  }
  const has = v => v != null;
  function pregDkaHTML(m, R) {
    const S3 = {yes: "met", no: "not met", missing: "data missing"}, c = m.comp;
    const sub = (v, l) => `${esc(l)}: ${v === true ? "met" : v === false ? "not met" : "no data"}`;
    const rows = [["DKA ketone criterion", c.dkaKetone.state, [sub(c.dkaKetone.bhb, "β-hydroxybutyrate ≥3.0 mmol/L") + (m.bhbValue != null ? ` (measured ${num(m.bhbValue, 1)})` : ''), sub(c.dkaKetone.uk, "urine ketones ≥2+ or moderate/large")]],
      ["Acidosis", c.acidosis.state, [sub(c.acidosis.ph, "pH <7.3"), sub(c.acidosis.bic, (c.acidosis.bicSrc === 'gas_hco3' ? "blood gas HCO₃" : "HCO₃ (TCO₂)") + ' <18 mmol/L')]]];
    return card(m, "Ketoacidosis evaluation (pregnancy / breastfeeding)", `<div class="tbl"><table><thead><tr><th>Component</th><th>Status</th><th>Subcriteria</th></tr></thead><tbody>${rows.map(([k, s, subs]) => `<tr><td>${esc(k)}</td><td><b>${esc(S3[s])}</b></td><td class="small">${subs.join('<br>')}</td></tr>`).join('')}</tbody></table></div>
      <p class="small">Glucose was not used as a component or as an exclusion gate.</p>${msgs(m.msgs)}${m.diff.length ? `<h4 style="margin-top:6px">Visible in the differential evaluation</h4>${msgs(m.diff)}` : ''}`);
  }
  function pedDkaHTML(m, R) {
    const S3 = {yes: "met", no: "not met", missing: "data missing"}, c = m.comp;
    const sub = (v, l) => `${esc(l)}: ${v === true ? "met" : v === false ? "not met" : "no data"}`;
    const rows = [
      ["Hyperglycemia", c.glucose.state, [sub(c.glucose.glucose, "glucose >11 mmol/L") + (c.glucose.mmol != null ? ` (${num(c.glucose.mmol, 1)} mmol/L)` : '')]],
      ["Acidosis", c.acidosis.state, [sub(c.acidosis.ph, "venous pH <7.3"), sub(c.acidosis.bic, (c.acidosis.bicSrc === 'gas_hco3' ? "blood gas HCO₃" : "serum HCO₃ (TCO₂)") + ' <18 mmol/L')]],
      ["Ketone criterion", c.ketosis.state, [sub(c.ketosis.bhb, "β-hydroxybutyrate ≥3 mmol/L"), sub(c.ketosis.uk, "urine ketones moderate/large")]]
    ];
    const sev = m.sev ? `<div class="tbl"><table><thead><tr><th>Severity (ISPAD 2022)</th><th>By pH</th><th>By HCO₃</th><th>Shown</th></tr></thead><tbody><tr><td>severe: pH &lt;7.1 or HCO₃ &lt;5 · moderate: &lt;7.2 or &lt;10 · mild: &lt;7.3 or &lt;18</td><td>${esc(m.sev.ph ? SEV[m.sev.ph] : "outside threshold / no data")}</td><td>${esc(m.sev.hco3 ? SEV[m.sev.hco3] : "outside threshold / no data")}</td><td><b>${esc(m.sev.overall ? SEV[m.sev.overall] : '–')}</b></td></tr></tbody></table></div>` : "<p class=\"small\">The severity table is shown only when all three components are met or clinical DKA is confirmed.</p>";
    return card(m, "Pediatric DKA criteria (ISPAD 2022)", `<div class="tbl"><table><thead><tr><th>Component</th><th>Status</th><th>Subcriteria</th></tr></thead><tbody>${rows.map(([k, s, subs]) => `<tr><td>${esc(k)}</td><td><b>${esc(S3[s])}</b></td><td class="small">${subs.join('<br>')}</td></tr>`).join('')}</tbody></table></div>
      <p>Components met numerically: <b>${m.met} / 3</b></p>${sev}${msgs(m.msgs)}`);
  }

  /* Kısa sonuç: modüllerden türetilen tek satırlar; yeni yorum üretilmez */
  function shortHTML(R) {
    const L = [], n = R.n, Mo = R.modules;
    const sample = SAMPLE[n.sample_type];
    L.push(`<b>Sample:</b> ${esc(sample)} · ${esc(AGE[n.age_group])}${n.age_group === 'adult' && R.scope !== 'cord' ? ' · ' + esc(n.maternal_context === 'unknown' ? "pregnancy unknown (non-pregnant adult reference)" : MCTX[n.maternal_context].toLowerCase()) : ''}`);
    if (R.scope === 'pediatric' || R.scope === 'neonatal') L.push(`<b>Scope:</b> ${esc(t(R.scope === 'neonatal' ? 'm.scope_neonatal' : 'm.scope_pediatric'))}`);
    if (Mo.cord) L.push(`<b>Cord blood:</b> separate flow · ${esc(SAMPLE[Mo.cord.vessel])}${Mo.cord.ph != null ? ` · pH ${esc(num(Mo.cord.ph, 3))}` : ''}`);
    if (Mo.cordpair && Mo.cordpair.status !== 'veri_eksik') L.push(`<b>Cord pair:</b> ${Mo.cordpair.flag ? "quality warning (may be the same vessel); no relabeling" : "no warning under this quality rule; not proof of definite correctness"}`);
    if (Mo.hie) L.push(`<b>Neonatologist evaluation:</b> ${esc(t('m.hie_expert'))} ${esc(t('m.hie_no_cooling'))}`);
    if (Mo.ph && Mo.ph.local) L.push(`<b>pH ${esc(num(Mo.ph.value, 3))}:</b> ${esc({below: "below the local reference", within: "within the local reference range", above: "above the local reference"}[Mo.ph.cls])}`);
    else if (Mo.ph && Mo.ph.status === 'veri_eksik' && Mo.ph.value != null) L.push(`<b>pH ${esc(num(Mo.ph.value, 3))}:</b> no local reference entered; no normal/abnormal label`);
    if (R.errors.length) L.push(`<b>Input to correct:</b> ${R.errors.map(e => esc(LBL[e.field] || e.field)).join(', ')}`);
    if (R.suspended) L.push(`<b>Integrated interpretation suspended.</b> ${esc(Mo.hh && Mo.hh.status === 'gozden_gecirilmeli' ? "The entered pH, PCO₂ and HCO₃ are not consistent with each other." : t('m.temp_mixed'))}`);
    if (Mo.ph && Mo.ph.dir && !Mo.ph.local) L.push(`<b>pH ${esc(num(Mo.ph.value, 3))}:</b> ${esc({acidemia: "acidemia", alkalemia: "alkalemia", within: "within reference range; evaluation continues"}[Mo.ph.dir])}${Mo.ph.assume ? " · assuming a non-pregnant adult" : ''}`);
    if (Mo.proc && Mo.proc.hyps) {
      if (!Mo.proc.hyps.length) L.push(esc(t('m.proc_none')));
      for (const h of Mo.proc.hyps) {
        let s;
        if (h.exp) s = `expected PaCO₂ ${n1(h.exp.lo)}–${n1(h.exp.hi)}, measured ${n1(h.measured)}: ${h.pos === 'within' ? "consistent with the expected response" : h.pos === 'above' ? "higher than expected, additional respiratory acidosis possible" : "lower than expected, additional respiratory alkalosis possible"}`;
        else s = `acute estimate ${n2(h.acute)}, chronic ${n2(h.chronic)}, measured HCO₃ ${n1(h.measured)}${h.pos === 'between' ? `; ${h.nearer === 'equal' ? t('h.near.equal') : tf('h.resp.nearer', {near: t('h.near.' + h.nearer)})}` : `; for both estimates ${h.pos === 'below' ? "below" : "above"}`}`;
        L.push(`<b>${esc(t('h.' + h.id))}</b> (${esc(t('h.align.' + h.align))}): ${esc(s)}`);
      }
    } else if (Mo.proc) L.push(`<b>Process and compensation:</b> ${esc(t('status.' + Mo.proc.status).toLowerCase())}${Mo.proc.msgs[0] ? ' · ' + esc(t('m.' + Mo.proc.msgs[0])) : ''}`);
    if (Mo.hcap && Mo.hcap.status !== 'veri_eksik') {
      const keyM = Mo.hcap.msgs.filter(x => ['hc_venous', 'hc_sample_other', 'hc_scope_ped', 'hc_scope_preg', 'hc_acidemia', 'hc_normal_ph', 'hc_acute_possible', 'hc_chronic_possible', 'hc_hco3_above', 'hc_hco3_below', 'hc_spo2_separate', 'hc_no_baseline', 'hc_baseline_limited'].includes(x));
      L.push(`<b>Hypercapnia context (education card):</b> ${keyM.map(x => esc(t('m.' + x))).join(' ')} <span class="muted">Details and limits: Steps tab.</span>`);
    }
    /* 8–10. tur: kısa satırlar kart durumundan türetilir (kapalı kartın değeri burada da görünmez) */
    if (Mo.tox) L.push(`<b>Exposure context:</b> ${esc(t('m.' + Mo.tox.msgs[0]))}`);
    if (Mo.og) L.push(`<b>Osmolal gap:</b> ${Mo.og.value != null ? `${esc(n1(Mo.og.value))} mOsm/kg (${Mo.og.used === 'ethanol_zero' ? "ethanol 0" : Mo.og.used === 'ideal_4_6' ? "ideal profile" : "Purssell profile"})${Mo.og.status === 'gozden_gecirilmeli' ? " · interpretation limited" : ''}` : Mo.og.ideal != null ? `no profile selected; ideal ${esc(n1(Mo.og.ideal))}, Purssell ${esc(n1(Mo.og.purssell))} shown separately` : esc(t('status.' + Mo.og.status).toLowerCase())} · no normal/excluded label is given`);
    if (Mo.salicylate) L.push(`<b>Salicylate:</b> ${Mo.salicylate.mgdl != null ? `${esc(n1(Mo.salicylate.mgdl))} mg/dL (${esc(n1(Mo.salicylate.mgl))} mg/L) · no automatic threshold class` : "no unit selected; no comparison made"}`);
    if (Mo.lacgap) L.push(`<b>Lactate method difference:</b> ${Mo.lacgap.diff != null ? `${esc(n1(Mo.lacgap.diff))} mmol/L${Mo.lacgap.status === 'hesaplandi' ? '' : " (arithmetic only)"} · no universal threshold` : "data missing"}`);
    if (Mo.renal) L.push(`<b>Kidney context:</b> ${esc(Object.fromEntries(OPT.renal_context)[Mo.renal.ctx])} (user input) · no stage/diagnosis from the gas${Mo.renal.msgs.includes('krt_under_treatment') ? " · sample on KRT" : ''}`);
    if (Mo.uag) L.push(`<b>Urine AG:</b> ${Mo.uag.value != null ? `${esc((Mo.uag.value > 0 ? '+' : '') + n1(Mo.uag.value))} mmol/L${Mo.uag.status === 'hesaplandi' ? '' : " (arithmetic only)"} · not an ammonium measurement` : esc(t('status.' + Mo.uag.status).toLowerCase())}`);
    if (Mo.caratio) L.push(`<b>Total Ca / iCa:</b> ${Mo.caratio.ratio != null ? `${esc(caFmt(Mo.caratio))}${Mo.caratio.msgs.includes('rca_2026_met') ? " · RCA confirmed, 2026 profile condition met (suspicion context, not a diagnosis)" : Mo.caratio.msgs.includes('ca_concurrency_unknown') ? " · arithmetic only" : ''}` : "patient ratio not calculated · " + esc(t('m.' + Mo.caratio.msgs[0]))}`);
    if (Mo.ag && Mo.ag.status !== 'veri_eksik') L.push(`<b>AG ${esc(n1(Mo.ag.value))} mmol/L</b>${Mo.agc && Mo.agc.status === 'hesaplandi' ? ` · albumin-corrected ${esc(n1(Mo.agc.value))}` : ''}${Mo.delta && Mo.delta.gap != null ? ` · delta gap ${esc(n1(Mo.delta.gap))}${Mo.delta.ratio != null ? `, ratio ${esc(n2(Mo.delta.ratio))}` : ''}` : ''}${Mo.ag.cls ? ' · ' + esc(tf('ag.cls.' + Mo.ag.cls, {lo: num(Mo.ag.interval[0], 0), hi: num(Mo.ag.interval[1], 0)})) : " · no local reference range, no definite classification made"}${Mo.agk && Mo.agk.value != null ? ` · potassium-including AG_K ${esc(n1(Mo.agk.value))} (separate formula)` : ''}`);
    if (Mo.pf && Mo.pf.status === 'hesaplandi') L.push(`<b>PaO₂/FiO₂ ${esc(num(Mo.pf.value, 0))} mmHg</b>${Mo.pf.approx ? " (approximate)" : ''} · no ARDS classification is made`);
    if (Mo.aa && Mo.aa.status === 'hesaplandi') L.push(`<b>A–a gradient (room air) ${esc(n1(Mo.aa.value))} mmHg</b>`);
    if (Mo.cao2 && Mo.cao2.status === 'hesaplandi') L.push(`<b>CaO₂ ${esc(n1(Mo.cao2.value))} mL/dL</b>`);
    if (Mo.dyshb) L.push(`<b>Dyshemoglobin context:</b> ${esc(t('m.spo2_unreliable'))} Co-oximetry result and exposure history required.`);
    if (Mo.lactate && Mo.lactate.status !== 'veri_eksik') L.push(`<b>Lactate:</b> ${Mo.lactate.series.map(s => esc(n1(s.v))).join(' → ')} mmol/L${Mo.lactate.change != null ? ` (relative change ${esc(n1(Mo.lactate.change))} %)` : ''}`);
    if (Mo.dka && !Mo.dka.ped && !Mo.dka.preg && Mo.dka.anyInput) L.push(`<b>DKA criteria:</b> ${Mo.dka.met}/3 components met numerically${Object.values(Mo.dka.comp).some(c => c.state === 'missing') ? ", at least one has missing data" : ''} · is not a clinical diagnosis`);
    if (Mo.dkares) L.push(`<b>DKA resolution:</b> ${esc({yes: "numerical criteria met", no: "criteria not met", missing: "data missing"}[Mo.dkares.all])}`);
    if (Mo.oi && Mo.oi.value != null) L.push(`<b>OI ${esc(n1(Mo.oi.value))}</b> · index; not a diagnosis on its own${Mo.oi.classifiable ? '' : " · not used for classification (validity not confirmed)"}`);
    if (Mo.osi && Mo.osi.value != null) L.push(`<b>OSI ${esc(n1(Mo.osi.value))}</b> · ${Mo.osi.classifiable ? "measurement eligible for classification" : "classification stopped (SpO₂ range, signal or stability)"}`);
    if (Mo.pards && Mo.pards.crit) L.push(`<b>PALICC-2:</b> oxygenation criterion ${({met: "met", not_met: "not met", missing: "could not be evaluated", unverified: "not evaluated (measurement validity not confirmed)"})[Mo.pards.crit]} · severity ${Mo.pards.sev ? esc(SEV[Mo.pards.sev]) : "no label given"}`);
    if (Mo.nards && Mo.nards.oi != null) L.push(`<b>Montreux:</b> ${Mo.nards.sev ? esc(SEV[Mo.nards.sev]) : "no severity label given"}`);
    if (Mo.delivery && Mo.delivery.minute != null) L.push(`<b>Delivery room, ${Mo.delivery.minute}-min:</b> ${Mo.delivery.row ? `preductal target ${pct(Mo.delivery.row[0], Mo.delivery.row[1])}` : "no target in the table for this minute"}`);
    if (Mo.age && Mo.age.pma != null) L.push(`<b>Postmenstrual age:</b> ${Mo.age.pmaW} weeks ${Mo.age.pmaD} days`);
    if (Mo.base) L.push(`<b>BE/BD ${esc((Mo.base.value > 0 ? '+' : '') + n1(Mo.base.value))}</b> · ${esc(BETYPE[Mo.base.type])}${Mo.base.type === 'unknown' ? "; threshold and sign conversion stopped" : ''}`);
    if (Mo.dka && Mo.dka.ped && Mo.dka.anyInput) L.push(`<b>Pediatric DKA (ISPAD 2022):</b> ${Mo.dka.met}/3 components${Mo.dka.sev ? ` · severity ${esc(SEV[Mo.dka.sev.overall] || '–')}${Mo.dka.sev.mismatch ? " (pH and HCO₃ indicate different severities)" : ''}` : ''}${Mo.dka.euglycemic ? " · clinical review including euglycemic DKA" : ''}`);
    if (Mo.sample) L.push(`<b>Specimen:</b> ${Mo.sample.known.length} known error · ${Mo.sample.possible.length} possible effect · ${Mo.sample.unknown.length} missing quality information${Mo.sample.delay != null ? ` · sample→analysis ${num(Mo.sample.delay, 0)} min${Mo.sample.protocol != null ? (Mo.sample.known.some(w => w.code === 'q_delay_protocol') ? " (institutional protocol exceeded)" : '') : " (no protocol entered)"}` : ''}`);
    if (Mo.co2rel) L.push(`<b>Relative CO₂ rise:</b> PaCO₂ ${esc(n1(Mo.co2rel.pco2))} mmHg, with respiratory signs; not a diagnosis or intubation threshold on its own`);
    if (Mo.o2target) L.push(`<b>Oxygen target:</b> ${Mo.o2target.target ? `selected profile ${pct(Mo.o2target.target[0], Mo.o2target.target[1])}` : "no profile selected; no single default target generated"}`);
    if (Mo.fetal && Mo.fetal.msgs[0] === 'fetal_no_routine_o2') L.push(`<b>Fetal concern, no maternal hypoxia:</b> routine maternal oxygen is not recommended; obstetric evaluation`);
    if (Mo.pe) L.push(`<b>Suspected PE:</b> blood gas does not exclude it`);
    if (Mo.o2delivery) L.push(`<b>Oxygen delivery:</b> even if PaO₂ is good, the effect of anemia/bleeding is not excluded`);
    if (Mo.sepsis) L.push(`<b>Sepsis context:</b> ${Mo.sepsis.branch === 'met' ? "NICE high-risk branch met; evaluation for higher-level care" : Mo.sepsis.branch === 'not_met' ? "NICE branch not met; this does not mean low risk" : "risk context missing; thresholds are not used as a complete algorithm"}${Mo.sepsis.msgs.includes('sepsis_consider_smfm') ? " · organ dysfunction: sepsis is considered even without fever" : ''}`);
    if (Mo.dka && Mo.dka.preg && Mo.dka.anyInput) L.push(`<b>Ketoacidosis (pregnancy/breastfeeding):</b> DKA ketone criterion ${({yes: "met", no: "not met", missing: "data missing"})[Mo.dka.comp.dkaKetone.state]}${Mo.dka.ketDetected && Mo.dka.comp.dkaKetone.state === 'no' ? " (ketones measured; this does not mean there is no ketosis)" : ''}, acidosis ${({yes: "present", no: "absent", missing: "data missing"})[Mo.dka.comp.acidosis.state]}; glucose is not an exclusion gate${Mo.dka.diff.length ? " · differential diagnoses in the step-by-step section" : ''}`);
    if (Mo.preg && n.pregnancy === 'yes') L.push(`<b>${esc(MCTX[n.maternal_context])}:</b> standard adult classification stopped; review physiology ranges are in the step-by-step section, not as a normal label.`);
    const counts = {}; Object.values(Mo).forEach(m => { counts[m.status] = (counts[m.status] || 0) + 1; });
    return `<ul class="summary">${L.map(x => `<li>${x}</li>`).join('')}</ul>
      <p class="small muted">${Object.entries(counts).map(([k, v]) => `${esc(t('status.' + k))}: ${v}`).join(' · ')} · rule version ${esc(R.version)}</p>
      ${askHTML(R)}`;
  }
  /* Klinikle ilişkilendir: tamamlayıcı sorular (tedavi emri değil). Örnek yönlendirmeler 03_ASIT_BAZ_ORUNTULERI tablosundan [3] */
  function askHTML(R) {
    const Q = [], Mo = R.modules, ids = Mo.proc && Mo.proc.hyps ? Mo.proc.hyps.map(h => h.id) : [];
    if (ids.includes('met_acid')) Q.push("For low HCO₃: is there clinical and laboratory information on lactate, ketones, kidney function and bicarbonate loss? [3]");
    if (ids.includes('met_alk')) Q.push("For high HCO₃: is there gastrointestinal loss or diuretic use? [3]");
    if (ids.includes('resp_acid')) Q.push("For high PaCO₂: is there a condition reducing alveolar ventilation? Are the duration and a previous blood gas known? [3]");
    if (ids.includes('resp_alk')) Q.push("For low PaCO₂: has a cause increasing respiratory drive been investigated? Are the duration and a previous blood gas known? [3]");
    if (Mo.pf && Mo.pf.status === 'hesaplandi') Q.push("Was FiO₂ recorded at the moment of sampling? How long has it been since the last change in support?");
    if (Mo.agc && Mo.agc.status === 'hesaplandi') Q.push("Was lactate measured directly? Corrected AG does not exclude hyperlactatemia. [19]");
    Q.push("Has context information been evaluated, such as previous measurements, dialysis timing, diuretic use and the last ventilation change?");
    return `<div class="panel"><h3 class="h-sm">Correlate with the clinical picture</h3><ul class="ask">${Q.map(q => `<li>${esc(q).replace(/\[(\d+)\]/g, (m, d) => cite([+d]))}</li>`).join('')}</ul><p class="small muted">These questions are complementary; the site does not generate intubation, ventilator setting, drug dose, sepsis or ARDS decisions.</p></div>`;
  }
  function missingHTML(R) {
    const Mo = R.modules, by = {};
    R.missing.forEach(x => { (by[x.field] = by[x.field] || new Set()).add(x.mod); });
    const na = Object.values(Mo).filter(m => m.status === 'uygulanamaz');
    return `<div class="missing-list">${Object.keys(by).length ? `<h3 class="h-sm">Calculations unlocked if entered</h3><ul>${Object.entries(by).map(([f, ms]) => `<li><b>${esc(LBL[f] || f)}</b> → ${[...ms].map(m => esc(t('mod.' + m))).join(', ')}</li>`).join('')}</ul>` : "<p>No calculation is locked due to a missing field.</p>"}
      ${na.length ? `<h3 class="h-sm">Calculations not applied to this sample</h3><ul>${na.map(m => `<li><b>${esc(t('mod.' + m.id))}</b>: ${esc(m.msgs && m.msgs[0] ? tf('m.' + m.msgs[0], {ag: n1(m.agUse), r: num(m.agRef, 0)}) : '')}</li>`).join('')}</ul>` : ''}
      <p class="note">Missing values are not filled in by estimation. If one card cannot be calculated, this does not prevent the other valid cards from being shown.</p></div>`;
  }
  function srcHTML(R) {
    const ids = new Set(); Object.values(R.modules).forEach(m => (m.src || []).forEach(i => ids.add(i)));
    (R.modules.proc && R.modules.proc.hyps || []).forEach(h => h.src.forEach(i => ids.add(i)));
    return `<ol class="srclist">${[...ids].sort((a, b) => a - b).map(srcItem).join('')}</ol>`;
  }
  function renderResults() {
    const box = document.getElementById('results'); if (!box) return;
    const R = lastR = KG.evaluate(collect());
    /* Alan hataları */
    document.querySelectorAll('.fld[data-fld]').forEach(el => { el.classList.remove('err'); const m = el.querySelector('.msg'); if (m) m.hidden = true; });
    R.errors.forEach(e => { const el = document.querySelector(`.fld[data-fld="${e.field}"]`); if (el) { el.classList.add('err'); const m = el.querySelector('.msg'); m.textContent = t('err.' + e.code); m.hidden = false; } });
    document.querySelectorAll('.fs').forEach(d => { const g = GROUPS.find(x => x.id === d.dataset.g); d.querySelector('.cnt').textContent = groupCount(g) || ''; });
    if (R.scope === 'age_missing' || R.scope === 'sample_out') {
      box.innerHTML = `<div class="banner stop"><span class="ic">!</span><div><b>${esc(t('mod.scope'))}</b><p>${esc(t('m.' + R.modules.scope.msgs[0]))}</p></div></div>`;
      return;
    }
    const nMiss = new Set(R.missing.map(x => x.field)).size;
    const srcN = new Set(Object.values(R.modules).flatMap(m => m.src || [])).size;
    const tabs = [['short', "Summary"], ['steps', "Step by step"], ['missing', "Missing information", nMiss], ['src', "Sources", srcN]];
    const urgent = [R.modules.dka && R.modules.dka.urgent ? t(R.modules.dka.preg ? 'm.preg_dka_urgent' : 'm.dka_neuro_urgent') : null, R.modules.hie && R.modules.hie.urgent ? t('m.hie_expert') : null, R.modules.tox && R.modules.tox.urgent ? t('m.tox_worsening_urgent') : null].filter(Boolean)
      .map(x => `<div class="banner stop"><span class="ic">!</span><div><b>Time-sensitive clinical evaluation</b><p>${esc(x)}</p></div></div>`).join('');
    const assume = (R.assumptions || []).includes('not_pregnant') ? `<div class="banner info"><span class="ic">?</span><div><b>Pregnancy context not selected</b><p>${esc(t('m.assume_not_pregnant'))}</p></div></div>` : '';
    const banner = urgent + assume + (R.suspended ? `<div class="banner stop"><span class="ic">!</span><div><b>Integrated interpretation suspended</b><p>${esc(R.modules.hh && R.modules.hh.status === 'gozden_gecirilmeli' ? t('m.hh_inconsistent') : t('m.temp_mixed'))}</p></div></div>` : '');
    box.innerHTML = `<div class="res-head"><h2 class="h-sm">Result</h2><span class="chip">rule ${esc(R.version)} · calculated in the browser</span></div>${banner}
      <div class="res-tabs" role="tablist">${tabs.map(([k, l, c]) => `<button type="button" role="tab" data-rt="${k}" aria-selected="${resTab === k}">${esc(l)}${c ? `<span class="badge">${c}</span>` : ''}</button>`).join('')}</div>
      <div class="res-body">${resTab === 'short' ? shortHTML(R) : resTab === 'steps' ? ORDER.filter(k => R.modules[k] && !(R.modules[k].msgs || []).includes('ped_not_validated')).map(k => moduleHTML(R.modules[k], R)).join('') : resTab === 'missing' ? missingHTML(R) : srcHTML(R)}</div>`;
  }
  /* Form durumu → motor girdisi */
  function collect() {
    const o = {...S};
    o.lactate_series = (S.lactate_series || []).filter(e => String(e.value).trim() !== '');
    return o;
  }
  function loadCase(id) {
    const c = C.cases.find(x => x.id === id) || C.koah.cases.find(x => x.id === id && x.mode === 'eval') || C.r810.cases.find(x => x.id === id && x.mode === 'eval'), d = PED_DEMOS.find(x => x.id === id);
    if (!c && !d) return;
    S = DEFAULTS();
    if (c) for (const [k, v] of Object.entries(c.girdiler)) if (v != null) S[k] = typeof v === 'number' ? dec(v) : v;
    if (S.pregnancy) { S.maternal_context = {yes: 'pregnant', no: 'not_pregnant'}[S.pregnancy] || 'unknown'; delete S.pregnancy; }
    if (d) Object.assign(S, JSON.parse(JSON.stringify(d.v)));
    resTab = 'short';
  }

  /* 7. tur sentetik hiperkapni olgusu: bağlam, beklenen ve üretilmemesi gereken yorum görünür biçimde ayrılır */
  const koahCaseHTML = k => `<div class="wrap" style="margin-bottom:14px"><div class="panel"><span class="synthetic">Synthetic data · not a real patient</span>
      <p style="margin-top:8px"><b>${esc(k.id)} · ${esc(k.baslik)}.</b> ${esc(k.baglam)}</p>
      <details style="margin-top:8px"><summary><b>Expected interpretation in the package</b></summary><p style="margin-top:6px">${k.beklenen_html}</p><p class="small"><b>Should not be generated:</b> ${esc(k.uretilmemeli)}</p><p class="small muted">Basis: ${cite(k.kaynaklar)}</p></details></div></div>`;
  /* 8–10. tur olgusu: bağlam metni, görünür alanlara açıkça eşlenen bilgi, beklenen ve üretilmemesi gereken yorum ayrı gösterilir */
  const r8MapHTML = k => { const e = k.eslesme, rows = [...e.ek.map(f => [f, k.mode === 'eval' ? k.girdiler[f] : k.points[0].values[f]]), ...Object.entries(e.nokta || {}).flatMap(([pid, o]) => Object.entries(o).map(([f, v]) => [f + ' (' + pid + ')', v]))];
    const val = (f, v) => { const key = f.replace(/ \(.*\)$/, ''); return v === true ? "flagged" : OPT[key] ? (OPT[key].find(o => o[0] === v) || [0, v])[1] : String(v); };
    return `<p class="small" style="margin-top:6px"><b>Mapped from context to visible fields:</b> ${rows.length ? rows.map(([f, v]) => `${esc(LBL[f.replace(/ \(.*\)$/, '')] || f)}${/ \(/.test(f) ? ' ' + esc(f.match(/\(.*\)$/)[0]) : ''} = <b>${esc(val(f, v))}</b>`).join(' · ') : "none (only the point fields in the package)"}${e.olaylar.length ? ` · event: ${e.olaylar.map(o => esc((SER_EV.find(x => x[0] === o.type) || [0, o.type])[1]) + (o.between ? ` (${esc(o.between.join(' → '))} interval)` : '')).join(', ')}` : ''}</p>` +
      (e.kaynak_ifade ? `<p class="small muted">Mapping basis: ${esc(e.kaynak_ifade)}</p>` : '') + (k.atlas_notu ? `<p class="note" style="margin-top:6px">${esc(k.atlas_notu)}</p>` : ''); };
  const r8CaseHTML = k => `<div class="wrap" style="margin-bottom:14px"><div class="panel" data-r8case="${esc(k.id)}"><span class="synthetic">Synthetic data · not a real patient</span>
      <p style="margin-top:8px"><b>${esc(k.id)} · ${esc(k.baslik)}.</b> ${esc(k.baglam)}</p>${r8MapHTML(k)}
      <details style="margin-top:8px"><summary><b>Expected interpretation in the package</b></summary><p style="margin-top:6px">${k.beklenen_html}</p><p class="small"><b>Should not be generated:</b> ${esc(k.uretilmemeli)}</p><p class="small muted">Rules: ${k.kurallar.map(esc).join(', ')} · Basis: ${cite(k.kaynaklar)}</p></details></div></div>`;
  function viewEval(caseId, tab) {
    if (caseId === 'yeni') caseId = null;     // KGAPP.load ile gelen durum korunur
    if (caseId) loadCase(caseId);
    if (tab && ['short', 'steps', 'missing', 'src'].includes(tab)) resTab = tab;
    view.innerHTML = `<div class="wrap page-head"><p class="eyebrow">Evaluate the blood gas</p><h1>Evaluate</h1>
      <p class="lede">Calculations update as you enter values. Each calculation is performed once its conditions are met; missing data are not filled in by estimation. Results are for education, not a clinical decision.</p></div>
      ${(() => { const k = caseId && C.koah.cases.find(x => x.id === caseId); if (k) return koahCaseHTML(k); const r = caseId && C.r810.cases.find(x => x.id === caseId && x.mode === 'eval'); return r ? r8CaseHTML(r) : ''; })()}
      <div class="wrap eval"><form class="form" id="form" autocomplete="off" onsubmit="return false">${formHTML()}</form><div class="results" id="results" aria-live="polite"></div></div>`;
    const form = document.getElementById('form');
    if (caseId) form.querySelector('#casePick').value = caseId;
    let timer = null;
    const update = () => { clearTimeout(timer); timer = setTimeout(renderResults, 120); };
    form.addEventListener('input', e => {
      const el = e.target;
      if (el.dataset.f) { S[el.dataset.f] = el.type === 'checkbox' ? el.checked : el.value; update(); }
      if (el.dataset.lac != null) { S.lactate_series[+el.dataset.lac][el.dataset.k] = el.value; update(); }
    });
    form.addEventListener('change', e => {
      const el = e.target;
      if (el.id === 'casePick' && el.value) { location.hash = '#/degerlendir/' + el.value; return; }
      if (el.dataset.f) {
        S[el.dataset.f] = el.type === 'checkbox' ? el.checked : el.value;
        /* Yaş grubu, örnek türü ya da bakım bağlamı değişince görünen alanlar değişir */
        if (['age_group', 'sample_type', 'care_context', 'cord_pco2_unit', 'maternal_context', 'sample_owner', 'o2_profile', 'dyshb', 'q_catheter'].includes(el.dataset.f)) { if (el.dataset.f === 'age_group' && isPed() && !S.fio2) delete S.fio2_unit; rebuildForm(el.dataset.f); }
        renderResults();
      }
    });
    form.addEventListener('toggle', e => { const d = e.target; if (d.classList && d.classList.contains('fs')) { if (d.open) openGroups.add(d.dataset.g); else openGroups.delete(d.dataset.g); } }, true);
    form.addEventListener('click', e => {
      if (e.target.id === 'clearForm') { S = DEFAULTS(); resTab = 'short'; if (location.hash !== '#/degerlendir') location.hash = '#/degerlendir'; else viewEval(); }
      if (e.target.dataset.lacadd != null) { S.lactate_series.push({value: '', time: ''}); refreshGroup('g6'); }
      if (e.target.dataset.lacdel != null) { S.lactate_series.splice(+e.target.dataset.lacdel, 1); if (!S.lactate_series.length) S.lactate_series.push({value: '', time: ''}); refreshGroup('g6'); renderResults(); }
    });
    document.getElementById('results').addEventListener('click', e => { const b = e.target.closest('[data-rt]'); if (b) { resTab = b.dataset.rt; renderResults(); } });
    /* Yüklenen olguda doldurulmuş grupları aç */
    if (caseId) form.querySelectorAll('.fs').forEach(d => { const g = GROUPS.find(x => x.id === d.dataset.g); if (groupCount(g)) d.open = true; });
    renderResults();
  }
  function rebuildForm(focusId) {
    const form = document.getElementById('form'); form.innerHTML = formHTML();
    const el = form.querySelector(`[data-f="${focusId}"]`); if (el) el.focus();
  }
  function refreshGroup(id) {
    const d = document.querySelector(`.fs[data-g="${id}"] .body`), g = GROUPS.find(x => x.id === id);
    d.innerHTML = groupBody(g);
  }

  /* ================= Giriş ================= */
  function viewHome() {
    const cases = ['kg-02', 'kg-04', 'kg-06', 'kg-08'].map(id => { const g = C.cases.find(c => c.id === id).girdiler; return {ph: g.ph, pco2: g.pco2, label: id}; });
    const steps = [["Identify the sample", "Arterial or venous? Time, unit, temperature", '#/ogren/ornek'], ["Check consistency", "Are pH, PCO₂ and HCO₃ consistent with each other?", '#/ogren/ornek'], ["pH direction", "Acidemia, alkalemia or within reference", '#/ogren/temeller'],
      ["Possible processes", "Four processes as separate hypotheses", '#/ogren/oruntuler'], ["Compensation", "Expected response and deviation", '#/ogren/oruntuler'], ["Anion gap", "Albumin and delta", '#/ogren/anyon'],
      ["Oxygenation", "A separate question: PF, A–a, content", '#/ogren/oksijen'], ["Missing information", "What don't we know?", '#/ogren/ozel']];
    view.innerHTML = `<section class="wrap hero">
      <div><p class="eyebrow">For anesthesia and intensive care</p><h1>Reading the blood gas step by step</h1>
        <p class="lede">Evaluate the blood gas in adults, pregnant women, children and neonates starting from the sample, with each step's rationale and source. See which calculations can be performed with the data you enter, and why the others cannot.</p>
        <ul class="facts"><li><b>${C.formulas.length + C.ped.formulas.length + C.r810.formulas.length}</b> calculation definitions</li><li><b>${C.rules.length + C.ped.rules.length + C.preg.rules.length + C.sample.rules.length + C.serial.rules.length + C.koah.rules.length + C.r810.rules.length}</b> rules</li><li><b>${C.cases.length + C.ped.cases.length + C.preg.cases.length + C.serial.cases.length + C.koah.cases.length + C.r810.cases.length}</b> synthetic cases and scenarios</li><li><b>${C.lessons.length}</b> lessons</li><li><b>${C.sources.length}</b> sources</li></ul>
        <div class="row"><a class="btn" href="#/degerlendir">Evaluate the blood gas</a><a class="btn ghost" href="#/ogren/temeller">Learn from scratch</a></div></div>
      <div class="panel">${KGC.map(cases, {aria: "Position of four synthetic cases on the pH–PCO₂ map"})}<p class="small muted">Four synthetic cases on the pH–PCO₂ map. The curves are iso-HCO₃ lines (Henderson–Hasselbalch); the gray band is the adult arterial pH reference (7.35–7.45) [2].</p></div>
    </section>
    <section class="wrap path"><h2 class="h-sm">Evaluation sequence</h2><ol class="steps">${steps.map(([b, s, h], i) => `<li><a href="${h}"><span class="n">${String(i + 1).padStart(2, '0')}</span><b>${esc(b)}</b><span>${esc(s)}</span></a></li>`).join('')}</ol>
      <p class="small muted" style="margin-top:10px">This sequence is a product design; it is not a single validated diagnostic scale.</p></section>
    <section class="wrap page"><div class="grid2">
      <div class="panel"><h3 class="h-sm">What does this site do?</h3><ul class="ask"><li>Applies formulas with their conditions; for every result it shows the values used, the formula and the source.</li><li>Shows multiple possible processes and uncertain chronicity together; does not end the analysis at a normal pH.</li><li>Lists missing information explicitly; does not fill in the unknown with a normal value.</li><li>Performs calculations only in your browser; no data are sent or stored.</li></ul></div>
      <div class="panel"><h3 class="h-sm">What does it not do?</h3><ul class="ask"><li>Does not diagnose; does not generate ARDS, sepsis or DKA diagnoses or a "definite diagnosis" badge.</li><li>Does not recommend intubation, ventilator settings, or insulin, potassium or bicarbonate doses.</li><li>Does not interpret pediatric, neonatal or cord samples with adult rules; does not say "normal" in children without a local reference. Does not decide on HIE or eligibility for cooling.</li></ul></div>
    </div></section>`;
  }

  /* ================= Öğren ================= */
  const LAB = {
    'p-pards': () => `<div class="lab" id="lab-oi"><h3>How do OI and OSI change?</h3>
      <p class="small">If PaO₂ or SpO₂ stays the same while FiO₂ and mean airway pressure increase, the index rises. Thresholds are shown in two separate profiles; the tables are not interchangeable. Numbers are examples.</p>
      <div class="sl"><label for="sl-f">FiO₂ (fraction)</label><input type="range" id="sl-f" min="0.21" max="1" step="0.01" value="0.6"><output id="o-f"></output></div>
      <div class="sl"><label for="sl-w">Mean airway pressure (cmH₂O)</label><input type="range" id="sl-w" min="4" max="30" step="1" value="12"><output id="o-w"></output></div>
      <div class="sl"><label for="sl-o">PaO₂ (mmHg)</label><input type="range" id="sl-o" min="30" max="150" step="1" value="60"><output id="o-o"></output></div>
      <div class="sl"><label for="sl-s">SpO₂ (%)</label><input type="range" id="sl-s" min="80" max="100" step="1" value="90"><output id="o-s"></output></div>
      <div id="lab-oi-out"></div></div>`,
    temeller: () => `<div class="lab" id="lab-scale"><h3>A two-pan balance: the pH is normal, the processes are not</h3>
      <p class="small">Change HCO₃ and PCO₂; pH is calculated with the Henderson–Hasselbalch relationship. Two opposing changes can keep pH within the reference range. This is an original teaching analogy; it is not a complete model of buffer systems.</p>
      <div class="sl"><label for="sl-h">HCO₃ (mmol/L)</label><input type="range" id="sl-h" min="6" max="45" step="1" value="12"><output id="o-h"></output></div>
      <div class="sl"><label for="sl-p">PCO₂ (mmHg)</label><input type="range" id="sl-p" min="12" max="90" step="1" value="18"><output id="o-p"></output></div>
      <div class="row">${[["Starting point", 24, 40], ["Two opposing processes", 12, 18], ["Two processes in the same direction", 12, 40], ["Only HCO₃ low", 12, 40]].slice(0, 3).map(([l, h, p]) => `<button type="button" class="btn ghost sm" data-preset="${h},${p}">${l}</button>`).join('')}</div>
      <p class="big" id="o-ph" style="font:800 26px var(--f-display)"></p><div id="lab-map"></div></div>`,
    oruntuler: () => `<div class="lab" id="lab-comp"><h3>Explore the expected response</h3>
      <p class="small">Select the primary change; the expected response is calculated with the formula the engine uses. The numbers are approximate relationships of the formulas, not definite biological limits.</p>
      <div class="row" role="radiogroup">${[['met_acid', "Metabolic acidosis"], ['met_alk', "Metabolic alkalosis"], ['resp_acid', "Respiratory acidosis"], ['resp_alk', "Respiratory alkalosis"]].map(([k, l], i) => `<label class="chip"><input type="radio" name="cp" value="${k}"${i ? '' : " checked"}> ${l}</label>`).join('')}</div>
      <div class="sl"><label for="sl-c" id="sl-c-l"></label><input type="range" id="sl-c"><output id="o-c"></output></div><div id="lab-comp-out"></div></div>`,
    anyon: () => `<div class="lab" id="lab-ag"><h3>How does albumin mask the anion gap?</h3>
      <p class="small">While the measured gap stays the same, the corrected gap rises as albumin falls. Reference values are examples; use your own laboratory's.</p>
      <div class="sl"><label for="sl-ag">Measured AG (mmol/L)</label><input type="range" id="sl-ag" min="0" max="30" step="1" value="12"><output id="o-ag"></output></div>
      <div class="sl"><label for="sl-alb">Albumin (g/dL)</label><input type="range" id="sl-alb" min="1" max="5" step=".1" value="2"><output id="o-alb"></output></div>
      <div class="sl"><label for="sl-ar">Albumin reference (g/dL)</label><input type="range" id="sl-ar" min="3.5" max="4.5" step=".1" value="4"><output id="o-ar"></output></div>
      <div id="lab-ag-out"></div></div>`
  };
  function bindLabs(id) {
    if (id === 'p-pards') {
      const ids = ['f', 'w', 'o', 's'], el = k => document.getElementById('sl-' + k);
      const draw = () => {
        ids.forEach(k => { document.getElementById('o-' + k).textContent = num(+el(k).value, k === 'f' ? 2 : 0); });
        const oi = KG.F['P-F01'](+el('f').value, +el('w').value, +el('o').value), osi = KG.F['P-F02'](+el('f').value, +el('w').value, +el('s').value), sp = +el('s').value, ok = sp >= 88 && sp <= 97;
        const mont = oi >= 16 ? "severe" : oi >= 8 ? "moderate" : oi >= 4 ? "mild" : "below range";
        document.getElementById('lab-oi-out').innerHTML = `<div class="grid2"><div class="panel"><p class="big" style="font:800 26px var(--f-display)">OI ${num(oi, 1)}</p><p class="small">PALICC-2 (pediatric, invasive): oxygenation criterion OI ≥4 → ${oi >= 4 ? "met" : "not met"}; severe threshold OI ≥16 → ${oi >= 16 ? "above" : "below"} ${cite([22])}</p><p class="small">Montreux (neonate, if NARDS is confirmed): ${mont} ${cite([33])}</p></div>
          <div class="panel"><p class="big" style="font:800 26px var(--f-display)">OSI ${num(osi, 1)}</p><p class="small">${ok ? `PALICC-2: OSI ≥5 criterion → ${osi >= 5 ? "met" : "not met"}; severe threshold OSI ≥12 → ${osi >= 12 ? "above" : "below"}` : "SpO₂ outside 88–97%: no PALICC-2 OSI classification is made"} ${cite([22])}</p><p class="small">There is no OSI in the Montreux table.</p></div></div>
          <p class="small muted">No threshold is a diagnosis on its own; a severity label is given together with the clinical diagnosis, duration and exclusion conditions.</p>`;
      };
      ids.forEach(k => { el(k).oninput = draw; }); draw();
    }
    if (id === 'temeller') {
      const h = document.getElementById('sl-h'), p = document.getElementById('sl-p');
      const draw = () => {
        const ph = KG.F['hh-ph'](+h.value, +p.value), within = ph >= 7.35 && ph <= 7.45;
        document.getElementById('o-h').textContent = h.value; document.getElementById('o-p').textContent = p.value;
        document.getElementById('o-ph').textContent = `pH ${num(ph, 2)} · ${ph < 7.35 ? "acidemia" : ph > 7.45 ? "alkalemia" : "within the reference range"}`;
        const tags = []; if (+h.value < 24) tags.push("HCO₃ toward low (acidifying)"); if (+h.value > 24) tags.push("HCO₃ toward high (alkalinizing)"); if (+p.value > 40) tags.push("PCO₂ toward high (acidifying)"); if (+p.value < 40) tags.push("PCO₂ toward low (alkalinizing)");
        document.getElementById('lab-map').innerHTML = KGC.map([{ph, pco2: +p.value, label: 'pH ' + num(ph, 2)}]) + `<p class="small">${tags.length ? esc(tags.join(' · ')) : "Both values are at the formula starting points."}${within && tags.length >= 2 ? " — even if pH is within reference, two processes may coexist." : ''}</p>`;
      };
      h.oninput = p.oninput = draw;
      document.querySelectorAll('#lab-scale [data-preset]').forEach(b => b.onclick = () => { const [a, c] = b.dataset.preset.split(','); h.value = a; p.value = c; draw(); });
      draw();
    }
    if (id === 'oruntuler') {
      const sl = document.getElementById('sl-c'), out = document.getElementById('lab-comp-out');
      const set = () => {
        const k = document.querySelector('input[name=cp]:checked').value, met = k.startsWith('met');
        const [mn, mx, def] = {met_acid: [6, 23, 12], met_alk: [25, 45, 36], resp_acid: [41, 90, 60], resp_alk: [15, 39, 25]}[k];
        sl.min = mn; sl.max = mx; sl.step = 1; if (+sl.value < mn || +sl.value > mx || sl.dataset.k !== k) sl.value = def; sl.dataset.k = k;
        document.getElementById('sl-c-l').textContent = met ? "HCO₃ (mmol/L)" : "PaCO₂ (mmHg)";
        document.getElementById('o-c').textContent = sl.value;
        const v = +sl.value;
        if (met) { const e = k === 'met_acid' ? KG.F.winter(v) : KG.F['met-alk'](v); const ph = KG.F['hh-ph'](v, e.center);
          out.innerHTML = `<p>Expected PaCO₂: <b>${n1(e.lo)}–${n1(e.hi)} mmHg</b> (${k === 'met_acid' ? "Winter: 1.5 × HCO₃ + 8 ± 2" : "0.7 × HCO₃ + 20 ± 5"}) ${cite(KG.FSRC[k === 'met_acid' ? 'winter' : 'met-alk'])}. If measured PaCO₂ is above the range, an additional acidifying respiratory effect is possible; if below, an additional alkalinizing respiratory effect is possible.</p>` +
            KGC.map([{ph, pco2: e.center, label: "expected center"}, {ph: KG.F['hh-ph'](v, e.lo), pco2: e.lo, hollow: true, r: 4}, {ph: KG.F['hh-ph'](v, e.hi), pco2: e.hi, hollow: true, r: 4}]); }
        else { const a = KG.F[k === 'resp_acid' ? 'resp-ac-acute' : 'resp-alk-acute'](v), c = KG.F[k === 'resp_acid' ? 'resp-ac-chronic' : 'resp-alk-chronic'](v);
          out.innerHTML = `<p>Expected HCO₃: acute model <b>${n2(a)}</b>, chronic model <b>${n2(c)} mmol/L</b> ${cite(KG.FSRC[k === 'resp_acid' ? 'resp-ac-acute' : 'resp-alk-acute'])}. These are point estimates; the blood gas alone does not determine duration, and an intermediate acute–chronic state is possible.</p>` +
            KGC.map([{ph: KG.F['hh-ph'](a, v), pco2: v, label: "acute"}, {ph: KG.F['hh-ph'](c, v), pco2: v, label: "chronic", hollow: true}]); }
      };
      sl.oninput = set; document.querySelectorAll('input[name=cp]').forEach(r => r.onchange = set); set();
    }
    if (id === 'anyon') {
      const a = document.getElementById('sl-ag'), b = document.getElementById('sl-alb'), r = document.getElementById('sl-ar');
      const draw = () => {
        ['ag', 'alb', 'ar'].forEach((k, i) => { document.getElementById('o-' + k).textContent = num(+[a, b, r][i].value, 1); });
        const c = KG.F['ag-albumin'](+a.value, +r.value, +b.value);
        document.getElementById('lab-ag-out').innerHTML = KGC.ag({measured: +a.value, corrected: c}) + `<p class="small">Corrected AG = ${num(+a.value, 1)} + 2.5 × (${num(+r.value, 1)} − ${num(+b.value, 1)}) = <b>${num(c, 1)}</b> mmol/L ${cite(KG.FSRC['ag-albumin'])}. Corrected AG does not replace measured lactate.</p>`;
      };
      a.oninput = b.oninput = r.oninput = draw; draw();
    }
  }
  function viewLearn(id) {
    const i = Math.max(0, C.lessons.findIndex(l => l.id === id)), L = C.lessons[i];
    const prev = C.lessons[i - 1], next = C.lessons[i + 1];
    view.innerHTML = `<div class="wrap page-head"><p class="eyebrow">${{ped: "Pediatrics and neonates", preg: "Pregnancy", sample: "Specimen and measurement", serial: "Serial evaluation", koah: "COPD and hypercapnia", renal: "Kidney and dialysis", tox: "Toxicology", mixed: "Mixed acid–base", adult: "Learn from scratch"}[L.group]} · ${i + 1} / ${C.lessons.length}</p><h1>${esc(L.title)}</h1></div>
      <div class="wrap learn"><nav aria-label="Lessons">${['adult', 'sample', 'serial', 'koah', 'renal', 'tox', 'mixed', 'ped', 'preg'].map(g => `<p class="eyebrow" style="margin:${g === 'adult' ? '0' : '16px'} 10px 6px">${{adult: "Basics (adult)", sample: "Specimen and measurement", serial: "Serial evaluation", koah: "COPD and hypercapnia (adult)", renal: "Kidney and dialysis", tox: "Toxicology", mixed: "Mixed acid–base disorders", ped: "Pediatrics and neonates", preg: "Pregnancy, labor, postpartum"}[g]}</p>` + C.lessons.map((l, k) => l.group !== g ? '' : `<a href="#/ogren/${l.id}" data-pid="l:${l.id}"${k === i ? " aria-current=\"page\"" : ''}><span class="n">${String(k + 1).padStart(2, '0')}</span>${esc(l.title)}${PROG.markHTML('l:' + l.id)}</a>`).join('')).join('')}</nav>
      <article class="lesson"><div class="doc">${L.html}</div>${LAB[L.id] ? LAB[L.id]() : ''}
        <div class="pager">${prev ? `<a href="#/ogren/${prev.id}">← ${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a href="#/ogren/${next.id}">${esc(next.title)} →</a>` : `<a href="#/olgular">Go to case solving →</a>`}</div></article></div>`;
    bindLabs(L.id);
    /* İlerleme: açıldı; sayfanın sonu (sayfa geçişi) görülünce tamamlandı */
    PROG.seen('l:' + L.id);
    const pager = view.querySelector('.lesson .pager');
    if (pager && 'IntersectionObserver' in window) { const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { PROG.done('l:' + L.id); io.disconnect(); } }); io.observe(pager); }
    else PROG.done('l:' + L.id);
  }

  /* ================= Olgular ================= */
  const SHOW = ['sample_type', 'age_group', 'pregnancy', 'ph', 'pco2', 'hco3_actual', 'na', 'cl', 'tco2', 'albumin', 'pao2', 'fio2', 'cohb', 'saturation', 'saturation_type'];
  const caseVals = g => SHOW.filter(k => g[k] != null).map(k => [(LBL[k] || k).replace(/ \(.*\)/, ''),
    (OPT[k] ? (OPT[k].find(o => o[0] === g[k]) || [0, g[k]])[1] : num(g[k], 3)) + (k === 'pco2' || k === 'pao2' ? ' ' + (g[k + '_unit'] || 'mmHg') : k === 'fio2' ? ` (${g.fio2_unit === 'percent' ? '%' : "fraction"})` : '')]);
  function viewCases() {
    view.innerHTML = `<div class="wrap page-head"><p class="eyebrow">Solve cases</p><h1>Cases</h1><p class="lede">${C.cases.length} synthetic teaching cases. First write your own interpretation, then open the reasoned answer and the engine output. The cases are not real patient data.</p></div>
      <div class="wrap"><h2 class="h-sm" style="margin-bottom:10px">Single-sample cases</h2></div>
      <div class="wrap cases" style="padding-bottom:20px">${C.cases.map(c => `<a class="case-card" href="#/olgu/${c.id}"><span class="id">${c.id} ${PROG.markHTML('c:' + c.id)}</span><b>${esc(c.baslik)}</b><span class="vals">${esc(caseVals(c.girdiler).slice(3, 7).map(([k, v]) => k + ' ' + v).join(' · '))}</span></a>`).join('')}</div>
      <div class="wrap"><h2 class="h-sm" style="margin-bottom:10px">Serial cases</h2><p class="small muted" style="margin-bottom:10px">Multiple time points; opens in the serial evaluation screen.</p></div>
      <div class="wrap cases">${C.serial.cases.map(c => `<a class="case-card" href="#/seri/${c.id}"><span class="id">${c.id}</span><b>${esc(c.baslik)}</b><span class="vals">${c.points.length} time points${c.events.length ? ' · ' + c.events.length + " events" : ''}</span></a>`).join('')}</div>
      <div class="wrap" style="margin-top:24px"><h2 class="h-sm" style="margin-bottom:10px">Hypercapnia cases (adult, round 7)</h2><p class="small muted" style="margin-bottom:10px">The numbers are teaching inputs, not targets. Single samples open in Evaluate, cases with two time points open in the Serial screen. Lessons: <a href="#/ogren/k-co2-neden-artar">COPD and hypercapnia</a>.</p></div>
      <div class="wrap cases">${C.koah.cases.map(k => `<a class="case-card" href="#/${k.mode === 'serial' ? 'seri' : 'degerlendir'}/${k.id}"><span class="id">${k.id}</span><b>${esc(k.baslik)}</b><span class="vals">${k.mode === 'serial' ? k.points.length + " time points" : esc(['pco2', 'hco3_actual', 'ph'].map(f => ({pco2: 'PCO₂', hco3_actual: 'HCO₃', ph: 'pH'})[f] + ' ' + num(k.girdiler[f], 6)).join(' · '))}</span></a>`).join('')}</div>
      ${Object.keys(R8G).map(g => `<div class="wrap" style="margin-top:24px" data-r8group="${g}"><h2 class="h-sm" style="margin-bottom:10px">${esc(R8G[g])}</h2><p class="small muted" style="margin-bottom:10px">Synthetic teaching cases; the numbers are not targets. Information in the context text enters the engine only through the visible fields it is explicitly mapped to. Lessons: <a href="#/ogren/${({renal: 'b01', tox: 't01', mixed: 'm01'})[g]}">${esc(R8G[g].replace(/ \(.*/, ''))}</a>.</p></div>
      <div class="wrap cases">${C.r810.cases.filter(k => k.grup === g).map(k => `<a class="case-card" href="#/${k.mode === 'serial' ? 'seri' : 'degerlendir'}/${k.id}"><span class="id">${k.id}</span><b>${esc(k.baslik)}</b><span class="vals">${k.mode === 'serial' ? k.points.length + " time points" + (k.events.length ? ' · ' + k.events.length + " events" : '') : esc(k.baglam)}</span></a>`).join('')}</div>`).join('')}`;
  }
  const HYP_PICK = [['met_acid', "Metabolic acidosis"], ['met_alk', "Metabolic alkalosis"], ['resp_acid', "Respiratory acidosis"], ['resp_alk', "Respiratory alkalosis"], ['none', "No marked deviation"], ['stop', "Calculation/interpretation should be stopped"]];
  function viewCase(id) {
    const c = C.cases.find(x => x.id === id); if (!c) return viewCases();
    const i = C.cases.indexOf(c), prev = C.cases[i - 1], next = C.cases[i + 1];
    view.innerHTML = `<div class="wrap page-head"><p class="eyebrow"><a href="#/olgular">Cases</a> · ${c.id}</p><h1>${esc(c.baslik)}</h1><p style="margin-top:12px"><span class="synthetic">Synthetic data · not a real patient</span></p></div>
      <div class="wrap case">
        <div class="panel"><h3 class="h-sm">Data</h3><dl class="kv">${caseVals(c.girdiler).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
          <p class="small muted" style="margin-top:10px">${esc(c.notu || '')}</p></div>
        <div class="panel"><h3 class="h-sm">Your interpretation</h3><p class="small">Which processes are you considering? (Stays on this page only; not saved.)</p>
          <div class="pick">${HYP_PICK.map(([k, l]) => `<label><input type="checkbox" value="${k}"> ${l}</label>`).join('')}</div>
          <textarea id="mine" placeholder="Briefly write your reasoning: pH direction, expected response, missing information…" style="margin-top:10px"></textarea>
          <div class="row" style="margin-top:10px"><button type="button" class="btn" id="reveal">Show reasoned answer</button><a class="btn ghost" href="#/degerlendir/${c.id}">Open in evaluator</a></div></div>
        <div id="answer" hidden style="grid-column:1/-1"></div>
        <div class="row" style="grid-column:1/-1;justify-content:space-between">${prev ? `<a href="#/olgu/${prev.id}">← ${prev.id}</a>` : '<span></span>'}${next ? `<a href="#/olgu/${next.id}">${next.id} →</a>` : ''}</div>
      </div>`;
    PROG.seen('c:' + c.id);
    document.getElementById('reveal').onclick = () => {
      PROG.done('c:' + c.id);
      const R = KG.evaluate(Object.fromEntries(Object.entries(c.girdiler).filter(([, v]) => v != null)));
      const a = document.getElementById('answer'); a.hidden = false;
      a.innerHTML = `<div class="grid2"><div class="panel"><h3 class="h-sm">Expected interpretation in the package</h3><p>${c.beklenen_html}</p><p class="small muted" style="margin-top:8px">Basis: ${cite(c.kaynak_ids)}</p></div>
        <div class="panel"><h3 class="h-sm">Engine summary</h3>${R.modules.scope ? `<p>${esc(t('m.' + R.modules.scope.msgs[0]))}</p>` : shortHTML(R).replace(/<div class="panel">[\s\S]*$/, '')}</div></div>`;
      a.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'});
    };
  }


  /* ================= Seri değerlendirme (6. tur) =================
     Her nokta kendi girdileriyle değerlendirilir (KG.serial). Bu görünüm yalnız aritmetik farkı, bayrakları ve notları gösterir. */
  const SPF = [  // [anahtar, etiket, tür, birim seçenekleri]
    ['label', "Anonymous episode label", 'text'], ['time', "Sample time", 'dt'], ['age_group', "Age group", 'sel'], ['sample_type', "Sample type", 'sel'], ['temperature_reporting', "Temperature reporting", 'sel'], ['method', "Device / method", 'text'],
    ['ph', 'pH'], ['pco2', "PCO₂ (mmHg)"], ['hco3_actual', "Actual HCO₃"], ['pao2', "PO₂ (mmHg)"], ['fio2', "FiO₂ (fraction)"], ['fio2_quality', "FiO₂ source", 'sel'],
    ['peep', "PEEP (cmH₂O)", 'sup'], ['paw', "Mean airway pressure"], ['support_type', "Support type", 'suptext'], ['support_concurrent', "Support concurrent?", 'sel'], ['stable', "Stable measurement", 'sel'],
    ['na', 'Na⁺'], ['cl', 'Cl⁻'], ['tco2', 'TCO₂'], ['albumin', "Albumin (g/dL)"], ['albumin_concurrent', "Albumin concurrent?", 'sel'],
    ['lactate', "Lactate"], ['glucose', "Glucose (mg/dL)"], ['beta_hydroxybutyrate', "β-hydroxybutyrate"], ['maternal_context', "Pregnancy context", 'sel'], ['hc_chronic_confirmed', "Prior chronic hypercapnia confirmed?", 'sel'], ['q_bubble', "Air bubble", 'sel'], ['q_heparin', "Heparin", 'sel']
  ];
  const SER_OPT = Object.assign({}, OPT, {albumin_concurrent: YN});
  const SER_EV = [['ventilation', "Ventilation / oxygen change"], ['fluid', "Fluids"], ['insulin', "Insulin"], ['vasopressor', "Vasopressor"], ['rrt_start', "KRT (RRT) started"], ['rrt_end', "KRT (RRT) ended"], ['rrt_change', "KRT change / interruption"], ['labor', "Labor / delivery"], ['other', "Other"]];
  /* [1.5-F03] Kimlik sayaçtan gelir; silme/ekleme sonrasında kimlik yinelenmez.
     [1.5-F07] Yeni nokta hiçbir şey miras almaz: örnek türü ve sıcaklık raporlaması "bilinmiyor" ile başlar. */
  /* [8–10. tur] Yaş grubu da noktaya aittir: yeni nokta "seçin" ile başlar (erişkin önceden seçili değildir) */
  const blankPoint = () => ({id: 'N' + (++SS.seq), label: '', time: '', method: '', albumin_concurrent: 'unknown', support: {}, values: {age_group: '', sample_type: 'unknown', temperature_reporting: 'unknown', fio2_unit: 'fraction'}});
  let SS = null;
  const serialDefault = () => { SS = {base: {}, points: [], events: [], caseId: null, seq: 0}; SS.points.push(blankPoint(), blankPoint()); return SS; };
  const serialCase = id => C.serial.cases.find(x => x.id === id) || C.koah.cases.find(x => x.id === id && x.mode === 'serial') || C.r810.cases.find(x => x.id === id && x.mode === 'serial');
  /* [1.5-F04] Gizli ortak bağlam yok: olgunun yaş grubu dışındaki tüm alanları her noktanın kendi değerlerine yazılır ve tabloda görünür/düzenlenebilir */
  function serialLoad(id) {
    const c = serialCase(id); if (!c) return false;
    const shared = c.base || {};
    SS = {base: {}, events: JSON.parse(JSON.stringify(c.events || [])), caseId: id, seq: c.points.length,
      points: c.points.map((p, i) => ({id: p.id || 'N' + (i + 1), label: p.label || '', time: (p.time || '').slice(0, 16), method: p.method || '', albumin_concurrent: p.albumin_concurrent || 'unknown',
        support: Object.assign({}, p.support || {}), values: Object.assign({fio2_unit: 'fraction', temperature_reporting: 'unknown'}, JSON.parse(JSON.stringify(shared)), JSON.parse(JSON.stringify(p.values || {})))}))};
    SS.caseSnapshot = JSON.stringify(serialInput());
    return true;
  }
  const spGet = (p, k) => k === 'label' ? p.label : k === 'time' ? p.time : k === 'method' ? p.method : k === 'albumin_concurrent' ? p.albumin_concurrent : k === 'peep' ? (p.support.peep ?? '') : k === 'support_type' ? (p.support.type ?? '') : (p.values[k] ?? (k === 'sample_type' ? 'unknown' : ''));
  function spSet(p, k, v) {
    if (k === 'label') p.label = v; else if (k === 'time') p.time = v; else if (k === 'method') p.method = v; else if (k === 'albumin_concurrent') p.albumin_concurrent = v;
    else if (k === 'peep') p.support.peep = v === '' ? undefined : +String(v).replace(',', '.'); else if (k === 'support_type') p.support.type = v || undefined;
    else { p.values[k] = v; if (k === 'fio2' || k === 'paw') p.support[k] = v === '' ? undefined : +String(v).replace(',', '.'); if (k === 'lactate') { p.values.lactate_series = v === '' ? [] : [{value: v, time: p.time}]; } }
  }
  function serialInput() {
    /* Zamanı ve aralığı olmayan olay da motora gider: hiçbir aralığa yerleştirilmez ve "yerleştirilmedi" diye bildirilir */
    return {base: SS.base, events: SS.events.map(e => e.between ? {type: e.type, note: e.note, between: e.between} : {type: e.type, note: e.note, time: e.time}),
      points: SS.points.map(p => ({id: p.id, label: p.label || undefined, time: p.time || undefined, method: p.method || undefined, albumin_concurrent: p.albumin_concurrent, support: p.support,
        values: Object.assign({}, p.values, p.values.lactate != null && p.values.lactate !== '' ? {lactate_series: [{value: p.values.lactate, time: p.time}]} : {})}))};
  }
  const SPF_KEYS = new Set(SPF.map(f => f[0]).concat(['fio2_unit', 'lactate_series']));
  /* Olgudan gelen ek alanlar (ör. gebelik haftası, RDS bağlamı) ayrı satırlarda görünür; gizli bağlam kalmaz */
  const extraRows = () => [...new Set(SS.points.flatMap(p => Object.keys(p.values)))].filter(k => !SPF_KEYS.has(k)).map(k => [k, LBL[k] || k, OPT[k] ? 'sel' : 'text']);
  const serialCasePickerHTML = () => `<select class="case-pick" id="serCase" aria-label="Load a synthetic serial case"><option value="">Load a synthetic serial case…</option>${[...C.serial.cases, ...C.koah.cases.filter(k => k.mode === 'serial'), ...C.r810.cases.filter(k => k.mode === 'serial')].map(c => `<option value="${c.id}"${SS.caseId === c.id ? " selected" : ''}>${c.id} · ${esc(c.baslik)}</option>`).join('')}</select>`;
  function serialEditorHTML() {
    const cell = (p, i, [k, l, kind]) => {
      const v = spGet(p, k), dk = `data-sp="${i}" data-k="${k}"`;
      if (kind === 'sel') return `<select ${dk}>${(SER_OPT[k] || YN).map(([o, lab]) => `<option value="${o}"${String(v) === o ? " selected" : ''}>${esc(lab)}</option>`).join('')}</select>`;
      if (kind === 'dt') return `<input type="datetime-local" ${dk} value="${esc(v)}">`;
      return `<input ${kind === 'text' || kind === 'suptext' ? 'type="text"' : 'inputmode="decimal"'} ${dk} value="${esc(v)}">`;
    };
    return `<div class="row" style="margin-bottom:10px">
        <button type="button" class="btn ghost sm" id="serAdd">+ Time point</button><button type="button" class="btn ghost sm" id="serClear">Clear</button></div>
      <div class="fs" style="padding:12px 16px"><div class="body" style="padding:0">
        <p class="hint" style="grid-column:1/-1">Enter sample, support and clinical details separately for each time point. Use a shared anonymous label for the same episode (e.g. "episode-1"); do not enter patient identifiers.</p></div></div>
      <div class="tbl" style="margin-top:10px"><table class="sertbl"><thead><tr><th>Field</th>${SS.points.map((p, i) => `<th>${esc(p.id)} <button type="button" class="linkbtn" data-sdel="${i}" aria-label="${esc(p.id)} delete">delete</button></th>`).join('')}</tr></thead>
        <tbody>${[...SPF, ...extraRows()].map(f => `<tr><td class="small">${esc(f[1])}</td>${SS.points.map((p, i) => `<td>${cell(p, i, f)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
      <h3 class="h-sm" style="margin:16px 0 8px">Events</h3>
      <p class="small muted" style="margin-bottom:6px">If the event time is known, enter it. If the time is unknown, place it between two points with "Interval"; an event is not assigned to a time or interval by estimation.</p>
      <div class="tbl"><table><thead><tr><th>Time</th><th>Interval (if no time)</th><th>Type</th><th>Note</th><th></th></tr></thead><tbody>${SS.events.map((e, i) => `<tr><td><input type="datetime-local" data-ev="${i}" data-k="time" value="${esc((e.time || '').slice(0, 16))}"${e.between ? " disabled" : ''}></td>
        <td><select data-ev="${i}" data-k="between"><option value="">—</option>${SS.points.slice(1).map((p, j) => { const v = SS.points[j].id + '|' + p.id; return `<option value="${esc(v)}"${e.between && e.between.join('|') === v ? " selected" : ''}>${esc(SS.points[j].id)} → ${esc(p.id)}</option>`; }).join('')}</select></td><td><select data-ev="${i}" data-k="type">${SER_EV.map(([o, l]) => `<option value="${o}"${e.type === o ? " selected" : ''}>${esc(l)}</option>`).join('')}</select></td><td><input type="text" data-ev="${i}" data-k="note" value="${esc(e.note || '')}"></td><td><button type="button" class="linkbtn" data-evdel="${i}">delete</button></td></tr>`).join('')}</tbody></table></div>
      <button type="button" class="btn ghost sm" id="evAdd" style="margin-top:8px">+ Event</button>`;
  }
  const SER_LBL = {ph: 'pH', pco2: 'PCO₂', hco3: 'HCO₃', pao2: 'PO₂', pf: 'PaO₂/FiO₂', oi: 'OI', osi: 'OSI', lactate: "Lactate", glucose: "Glucose", bhb: "β-hydroxybutyrate", na: 'Na⁺', cl: 'Cl⁻', ag: 'AG', agc: "Corrected AG", salicylate: "Salicylate"};
  const SER_UNIT = {pco2: 'mmHg', pao2: 'mmHg', pf: 'mmHg', hco3: 'mmol/L', lactate: 'mmol/L', glucose: 'mg/dL', bhb: 'mmol/L', na: 'mmol/L', cl: 'mmol/L', ag: 'mmol/L', agc: 'mmol/L', salicylate: 'mg/dL'};
  function serialResultHTML(S) {
    if (S.blocked) return `<div class="banner stop"><span class="ic">!</span><div><b>Series not built</b><p>${esc(t('so.' + S.blocked))}</p></div></div>`;
    if (S.points.length < 2) return "<p class=\"note\">At least two time points are needed for comparison.</p>";
    const tAll = S.order !== 'entry';
    const xOf = (p, i) => tAll ? Date.parse(p.time) : i, xs = S.points.map(xOf), xMin = Math.min(...xs), xMax = Math.max(...xs);
    const hm = s => s ? s.slice(11, 16) : '';
    const evs = tAll ? S.events.map(e => ({x: Date.parse(e.time), label: (SER_EV.find(x => x[0] === e.type) || [0, e.type])[1]})).filter(e => !Number.isNaN(e.x) && e.x >= xMin && e.x <= xMax) : [];
    const keys = ['ph', 'pco2', 'hco3', 'pao2', 'pf', 'oi', 'lactate', 'glucose', 'bhb', 'ag', 'agc', 'cl', 'salicylate'];
    const getV = (R, k) => ({ph: R.n.ph, pco2: R.n.pco2, hco3: R.n.hco3_actual, pao2: R.n.pao2, pf: R.modules.pf && R.modules.pf.status === 'hesaplandi' ? R.modules.pf.value : null, oi: R.modules.oi ? R.modules.oi.value : null,
      lactate: R.n.lactates.length ? R.n.lactates[R.n.lactates.length - 1].v : null, glucose: R.n.glucose, bhb: R.n.beta_hydroxybutyrate, ag: R.modules.ag ? R.modules.ag.value : null, agc: R.modules.agc && R.modules.agc.status === 'hesaplandi' ? R.modules.agc.value : null, cl: R.n.cl, salicylate: R.modules.salicylate && R.modules.salicylate.mgdl != null ? R.modules.salicylate.mgdl : null})[k];
    const oxy = new Set(['pao2', 'pf', 'oi']);
    /* [1.5-F02] Çizgi, ardışık karşılaştırmadaki parametre uygunluğundan türetilir */
    const LINK_LBL = {matrix_changed: "sample type changed", method_changed: "method changed", support_changed: "support changed", albumin_not_concurrent: "albumin not concurrent", index_not_classifiable: "no classification condition", sample_quality: "quality warning", hh_suspended: "acid–base interpretation suspended"};
    const linkOf = (i, k) => { if (i === 0) return {}; const c = S.comparisons[i - 1], P = c && c.params[k];
      if (!P || P.unavailable) return {link: 'none'};
      const fl = (P.flags || []).filter(f => f !== 'pct_undefined_zero');
      return fl.length ? {link: 'dash', linkLabel: fl.map(f => LINK_LBL[f] || "warning").join(' · ')} : {link: 'solid'}; };
    const panels = keys.map(k => {
      const pts = S.points.map((p, i) => ({x: xs[i], xl: tAll ? hm(p.time) : p.id, v: oxy.has(k) && p.sample !== 'arterial' ? null : getV(p.R, k), sample: p.sample,
        flag: (p.R.modules.sample && [...p.R.modules.sample.known, ...p.R.modules.sample.possible].length > 0), ...linkOf(i, k)}));
      return pts.filter(p => p.v != null).length ? KGC.serialPanel({title: SER_LBL[k], unit: SER_UNIT[k], pts, events: evs, xMin, xMax}) : '';
    }).filter(Boolean);
    const fmt = (k, v) => v == null ? '–' : num(v, k === 'ph' ? 3 : 2);
    /* Adım adım okuma rehberi: beş soru, her biri bu aralığın motor çıktısından (bayrak, parametre, olay, not) yanıtlanır; yeni klinik yorum üretmez */
    const NOTE_Q = {acidbase_matrix_not_equivalent: 1, po2_not_comparable: 1, events_no_causality: 2, pf_with_support: 2, krt_event_not_recovery: 2,
      ph_up_by_co2: 3, ph_up_components: 3, ph_same_components_changed: 3, co2_fall_not_success: 3, posthypercapnic_context: 3, co2_fall_alkalemia_general: 3,
      lactate_fall: 4, dka_params_separate: 4, chloride_rise_context: 4, salicylate_fall_not_recovery: 4, salicylate_fall_worsening: 4, salicylate_fall_ph_down: 4};
    const sgn = (k, v) => (v > 0 ? '+' : '') + fmt(k, v);
    const guideHTML = c => {
      const A = S.points.find(p => p.id === c.from), B = S.points.find(p => p.id === c.to), q = {1: [], 2: [], 3: [], 4: [], 5: []};
      const SN = x => (SAMPLE[x] || x).toLowerCase(), pr = c.params, ok = k => pr[k] && !pr[k].unavailable;
      /* 1 · Aynı şeyi mi ölçtüm? */
      if (A.sample !== B.sample) q[1].push(`No: the sample type changed (${SN(A.sample)} → ${SN(B.sample)}). The two values are not the same measurement; the acid–base difference is shown as raw arithmetic only.`);
      else if (A.sample === 'unknown') q[1].push("Sample type unknown: it cannot be confirmed that the two measurements are equivalent; no component interpretation is made.");
      else q[1].push(`Same sample type (both samples ${SN(A.sample)}).`);
      for (const f of c.flags) if (!['matrix_changed', 'assume_not_pregnant'].includes(f)) q[1].push(t('sf.' + f));
      if (Object.values(pr).some(p => (p.flags || []).includes('sample_quality'))) q[1].push(t('sf.sample_quality'));
      /* 2 · Araya ne girdi? */
      q[2].push(c.hours ? `Interval ${num(c.hours, 2)} h; the hourly change is an average and does not show the course in between.` : "Time information missing or both samples simultaneous: hourly change was not calculated.");
      if (c.events.length) q[2].push("Event recorded in this interval: " + c.events.map(e => `${e.between ? "time unknown" : hm(e.time)} ${(SER_EV.find(x => x[0] === e.type) || [0, e.type])[1]}${e.note ? ' (' + e.note + ')' : ''}`).join(' · ') + '.');
      else q[2].push("No events are recorded for this interval. Add any treatment or support changes.");
      if (c.flags.includes('support_changed') || Object.values(pr).some(p => (p.flags || []).includes('support_changed'))) q[2].push(t('sf.support_changed'));
      /* 3 · pH hangi bileşenle değişti? */
      if (ok('ph')) {
        q[3].push(`pH ${fmt('ph', pr.ph.a)} → ${fmt('ph', pr.ph.b)} (${sgn('ph', pr.ph.diff)})${ok('pco2') ? ` · PCO₂ ${sgn('pco2', pr.pco2.diff)} mmHg` : ''}${ok('hco3') ? ` · HCO₃ ${sgn('hco3', pr.hco3.diff)} mmol/L` : ''}.`);
        const abNote = c.notes.some(n => NOTE_Q[n] === 3);
        if (c.flags.includes('point_validity') || A.sample !== B.sample || A.sample === 'unknown') q[3].push("Component interpretation is closed (for the reason in question 1); only the raw difference is read.");
        else if (!abNote && pr.ph.diff < 0) q[3].push("pH fell: check whether a PCO₂ rise, an HCO₃ fall (or both) accompanied it; a single pH value does not tell the process.");
        else if (!abNote && pr.ph.diff > 0) q[3].push("pH rose: read the PCO₂ and HCO₃ changes together; pH improvement does not mean the underlying process has ended.");
      } else q[3].push("pH could not be compared in this interval (no valid value at both points).");
      /* 4 · Metabolik belirteçler */
      const MET = ['lactate', 'glucose', 'bhb', 'ag', 'agc', 'cl', 'na', 'salicylate'].filter(ok);
      if (MET.length) q[4].push(MET.map(k => `${SER_LBL[k]} ${fmt(k, pr[k].a)} → ${fmt(k, pr[k].b)}${SER_UNIT[k] ? ' ' + SER_UNIT[k] : ''}`).join(' · ') + ". Markers may change at different rates; read each one separately.");
      else q[4].push("No metabolic marker (lactate, glucose, ketone, AG, chloride) measured at both points in this interval.");
      /* Notlar ilgili soruya; geri kalanı 5. soruya */
      for (const n of c.notes) q[NOTE_Q[n] || 5].push(t('sn.' + n));
      if (c.flags.includes('assume_not_pregnant')) q[5].push(t('sf.assume_not_pregnant'));
      q[5].push("Compare these changes with trends in work of breathing, consciousness, circulation and support needs.");
      const TQ = {1: "Did I measure the same thing?", 2: "What happened in between?", 3: "Which component changed the pH?", 4: "Are the metabolic markers changing together?", 5: "How do I complete the assessment?"};
      return `<div class="serq" data-guide><h4>Let's read this interval step by step</h4><ol>${[1, 2, 3, 4, 5].map(i => `<li><b>${TQ[i]}</b><ul>${q[i].map(x => `<li>${esc(x)}</li>`).join('')}</ul></li>`).join('')}</ol></div>`;
    };
    const cmpHTML = c => `<div class="panel" style="margin-top:12px"><h3 class="h-sm">${esc(c.from)} → ${esc(c.to)}${c.hours ? ` · ${num(c.hours, 2)} h` : ''}</h3>
      <div class="tbl"><table><thead><tr><th>Parameter</th><th>Before</th><th>After</th><th>Absolute difference</th><th>% change</th><th>Mean hourly</th><th>Warning</th></tr></thead><tbody>${Object.entries(c.params).map(([k, p]) => `<tr><td>${esc(SER_LBL[k] || k)}</td><td>${fmt(k, p.a)}</td><td>${fmt(k, p.b)}</td><td>${p.unavailable ? '–' : (p.diff > 0 ? '+' : '') + fmt(k, p.diff)}</td><td>${p.pct == null ? '–' : (p.pct > 0 ? '+' : '') + num(p.pct, 1) + ' %'}</td><td>${p.rate == null ? '–' : (p.rate > 0 ? '+' : '') + fmt(k, p.rate) + "/h"}</td><td class="small">${(p.flags || []).map(f => esc(t('sf.' + f))).join('<br>')}</td></tr>`).join('')}</tbody></table></div>
      ${guideHTML(c)}</div>`;
    const ptLinks = S.points.map(p => `<button type="button" class="btn ghost sm" data-open="${p.entry}">${esc(p.id)}: open single-sample evaluation</button>`).join('');
    const bad = S.points.filter(p => p.validity.length), anyAb = S.points.some(p => p.abInvalid);
    return `${S.order && S.order !== 'time' ? `<p class="note">${esc(t('so.' + S.order))}</p>` : ''}
      ${(S.warnings || []).map(w => `<p class="note">${esc(t('sw.' + w))}${w === 'events_unplaced' && S.unplacedEvents ? ' ' + S.unplacedEvents.map(e => esc((SER_EV.find(x => x[0] === e.type) || [0, e.type])[1]) + (e.time ? ' ' + esc(e.time.slice(0, 16).replace('T', ' ')) : '')).join(' · ') : ''}</p>`).join('')}
      ${bad.length ? `<div class="banner stop" data-validity><span class="ic">!</span><div><b>Point with a basic validity problem</b><ul class="msgs">${bad.map(p => `<li>${esc(p.id)}: ${p.validity.map(v => esc(t('sv.' + v))).join('; ')}</li>`).join('')}</ul>${anyAb ? "<p class=\"small\">In intervals that include a point with an acid–base validity problem, the pH/PCO₂/HCO₃ difference is shown as raw arithmetic; no component-based or specific serial interpretation is produced.</p>" : "<p class=\"small\">The error is in non-acid–base fields; the related calculations are closed, and the acid–base notes are not affected by it.</p>"}</div></div>` : ''}
      ${(S.assumptions || []).map(a => `<div class="banner warn" data-assumption style="margin-top:10px"><span class="ic">?</span><div><b>Pregnancy context unknown: ${esc(a.points.join(', '))}</b><p class="small">These points were interpreted under the assumption of a non-pregnant adult. If pregnant, in labor or postpartum, select the context; in that case adult-specific notes are not produced.</p></div></div>`).join('')}
      <div class="panel"><p class="small muted" style="margin-bottom:6px">Marker: ● arterial · ■ venous · ▲ capillary · hollow = sample quality warning. Dashed vertical line: event. The line between points is a visual connection; intermediate values are not measurements. The line follows the comparison table: non-comparable values are not connected; a comparison with a warning is shown with a dashed line and a short label.</p>
        <div class="grid2">${panels.join('')}</div></div>
      ${S.comparisons.map(cmpHTML).join('')}
      <div class="row" style="margin-top:12px">${ptLinks}</div>
      <p class="small muted" style="margin-top:10px">Rule version ${esc(S.version)}.</p>`;
  }
  function serialTeachingHTML(c, edited) {
    const t = c.teaching;
    if (!t) return '';
    const titles = ["What changed in the patient?", "What do the values tell us?", "How should we assess this?"];
    const lesson = `<div class="serial-lesson" data-original-teaching>
      <div class="serial-lesson-steps">${t.sections.map((p, i) => `<section><h3 class="h-sm"><span class="step-number">${i + 1}</span>${titles[i]}</h3><p>${esc(p.text)}</p></section>`).join('')}</div>
      <div class="serial-question"><h3 class="h-sm">Test your understanding</h3><p>${esc(t.question.text)}</p><details data-teaching-answer><summary>Show answer</summary><p>${esc(t.answer.text)}</p></details></div>
      <p class="note" data-takeaway><b>Takeaway:</b> ${esc(t.takeaway.text)}</p>
      <p class="small muted">Sources: ${cite(t.kaynaklar)}</p></div>`;
    return `<div class="panel serial-teaching"><span class="synthetic">Synthetic teaching case</span><h2 class="h-sm" style="margin-top:10px">${esc(c.id)} · ${esc(c.baslik)}</h2>
      ${edited ? `<p class="note" data-case-edited>You changed the case data. The calculations below now use your inputs; the original case explanation refers to the initial data.</p><button type="button" class="btn ghost sm" id="serRestore">Restore original case</button><details class="original-case"><summary>Read original case explanation</summary>${lesson}</details>` : lesson}
      ${c.baglam || c.eslesme || c.atlas_notu ? `<details class="small"><summary>Notes on case data</summary>${c.baglam ? `<p>${esc(c.baglam)}</p>` : ''}${c.eslesme ? r8MapHTML(c) : ''}${c.atlas_notu ? `<p>${esc(c.atlas_notu)}</p>` : ''}</details>` : ''}</div>`;
  }
  function viewSerial(caseId) {
    if (caseId && !serialLoad(caseId)) caseId = null;
    if (!SS) SS = serialDefault();
    const c = SS.caseId && serialCase(SS.caseId);
    view.innerHTML = `<div class="wrap page-head"><p class="eyebrow">Serial assessment</p><h1>Serial blood gases</h1>
      <p class="lede">Choose a case to explore the patient’s changes, what the blood gas reveals and the next assessment step. Edit the values to compare new results. <a href="#/ogren/s-ayni-seyi-mi">Read lesson</a></p></div>
      <div class="wrap page"><div class="row" style="margin-bottom:16px">${serialCasePickerHTML()}</div><div id="serialTeaching">${c ? serialTeachingHTML(c, JSON.stringify(serialInput()) !== SS.caseSnapshot) : ''}</div>
<div id="serEd">${serialEditorHTML()}</div>
      <div id="serRes" style="margin-top:16px" aria-live="polite"></div></div>`;
    let lastIn = null, teachingEdited = JSON.stringify(serialInput()) !== SS.caseSnapshot;
    const teachingHost = document.getElementById('serialTeaching');
    const draw = () => {
      if (!teachingHost.isConnected) return;
      lastIn = serialInput();
      const edited = JSON.stringify(lastIn) !== SS.caseSnapshot;
      if (c && edited !== teachingEdited) { teachingHost.innerHTML = serialTeachingHTML(c, edited); teachingEdited = edited; }
      const S = KG.serial(lastIn); window.KG_LAST_SERIAL = S; document.getElementById('serRes').innerHTML = serialResultHTML(S);
    };
    teachingHost.addEventListener('click', e => { if (e.target.closest('#serRestore') && c) { clearTimeout(tm); viewSerial(c.id); } });
    document.getElementById('serCase').addEventListener('change', e => { if (e.target.value) location.hash = '#/seri/' + e.target.value; });
    const ed = document.getElementById('serEd');
    let tm = null;
    ed.addEventListener('input', e => { const el = e.target;
      if (el.dataset.sp != null) spSet(SS.points[+el.dataset.sp], el.dataset.k, el.value);
      else if (el.dataset.ev != null) { const E = SS.events[+el.dataset.ev]; if (el.dataset.k === 'between') { if (el.value) { E.between = el.value.split('|'); delete E.time; } else delete E.between; const ti = ed.querySelector(`[data-ev="${el.dataset.ev}"][data-k="time"]`); if (ti) { ti.disabled = !!E.between; if (E.between) ti.value = ''; } } else E[el.dataset.k] = el.value; }
      else if (el.dataset.sb) SS.base[el.dataset.sb] = el.value;
      clearTimeout(tm); tm = setTimeout(draw, 150); });
    /* Aralık seçimi hemen; diğer değerler input olayıyla kısa gecikmeyle güncellenir. */
    ed.addEventListener('change', e => { if (e.target.dataset.k === 'between') { clearTimeout(tm); draw(); } });
    ed.addEventListener('click', e => { const b = e.target;
      if (b.id === 'serAdd') { SS.points.push(blankPoint()); ed.innerHTML = serialEditorHTML(); draw(); }
      if (b.id === 'serClear') { SS = serialDefault(); if (location.hash !== '#/seri') location.hash = '#/seri'; else viewSerial(); }
      if (b.id === 'evAdd') { SS.events.push({time: '', type: 'other', note: ''}); ed.innerHTML = serialEditorHTML(); draw(); }
      if (b.dataset.sdel != null) { SS.points.splice(+b.dataset.sdel, 1); ed.innerHTML = serialEditorHTML(); draw(); }
      if (b.dataset.evdel != null) { SS.events.splice(+b.dataset.evdel, 1); ed.innerHTML = serialEditorHTML(); draw(); } });
    /* [1.5-F03] Düğme, sonuç çizildiğinde kullanılan girdideki kendi noktasını (giriş sırası) açar */
    document.getElementById('serRes').addEventListener('click', e => { const b = e.target.closest('[data-open]'); if (!b || !lastIn) return; const p = lastIn.points[+b.dataset.open]; if (!p) return; window.KGAPP.load(Object.assign({}, SS.base, p.values, {sample_time: p.time}), 'steps'); });
    draw();
  }

  /* ================= Formüller ================= */
  function viewFormulas(sub) {
    const tabs = [['', "Formulas"], ['profiller', "Threshold profiles"], ['girdiler', "Input dictionary"], ['kurallar', "Rules"], ['senaryolar', "Scenarios"]];
    const GVT = {derleme_fizyoloji: "Review physiology", baglamsal_uyari: "Contextual warning", kilavuz_hedefi: "Guideline target", ozel_kilavuz_hedefi: "Guideline target, specific context", derleme_hedefi: "Review target", klinik_gorus: "Clinical opinion", kohort_gozlemi: "Cohort observation", kosullu_risk_akisi: "Conditional risk flow"};
    /* Profil alan adları görünen etikete çevrilir (anahtar paketteki gibi kalır) */
    const PKL = {ph: 'pH', otomatik_normal: "Automatic normal label", paco2_mmHg: "PaCO₂ (mmHg)", hco3_mmol: "HCO₃ (mmol/L)", anlam: "Meaning", spo2_yuzde: "SpO₂ (%)", kosul: "Condition", pao2_mmHg: "PaO₂ (mmHg)",
      varsayilan: "Default", n: 'n', laktat_medyan: "Median lactate", laktat_ge2_yuzde: "Lactate ≥2 (%)", laktat_ge4_yuzde: "Lactate ≥4 (%)", normal_aralik_degil: "Not a normal range", ifade: "Expression", sonuc: "Result"};
    const YB = v => v === true ? "Yes" : v === false ? "No" : String(v);
    const gprof = x => Object.entries(x).filter(([k]) => !['id', 'tur', 'kaynaklar'].includes(k)).map(([k, v]) => `${esc(PKL[k] || k.replace(/_/g, ' '))}: ${esc(Array.isArray(v) ? v.join('–') : YB(v))}`).join('<br>');
    const tst = name => { const x = TESTS && TESTS.tests.find(y => y.name === name); return x ? (x.ok ? "✓ passed" : "✗ failed") : '–'; };
    const VT = {tani_oksijenasyon_bileseni: "Diagnostic criterion component", siddet: "Severity threshold", tedavi_hedefi: "Treatment target", tedavi_kosulu: "Treatment condition", tani_bilesenleri: "Diagnostic components", referans_araligi_ornegi: "Reference range (study sample)", kohort_ortalama_SD: "Cohort mean ± SD"};
    const profVal = x => x.ifade ? esc(x.ifade) : x.araliklar ? Object.entries(x.araliklar).map(([k, v]) => `${esc(k.replace(/_/g, ' '))}: ${v.join('–')}`).join('<br>') : x.dakika_spo2_yuzde ? Object.entries(x.dakika_spo2_yuzde).map(([k, v]) => `${k}-min: ${pct(v[0], v[1])}`).join('<br>') : [x.ph && `pH ${x.ph[0]} ± ${x.ph[1]}`, x.pco2_mmHg && `PCO₂ ${x.pco2_mmHg[0]} ± ${x.pco2_mmHg[1]} mmHg`].filter(Boolean).join('<br>');
    let body;
    if (sub === 'girdiler') body = `<div class="tbl"><table><thead><tr><th>ID</th><th>Label</th><th>Type</th><th>Unit / option</th><th>Use</th></tr></thead><tbody>${C.inputs.map(x => `<tr><td><code>${esc(x.id)}</code></td><td>${esc(x.etiket)}</td><td>${esc(x.tur)}</td><td class="small">${esc(x.birim_veya_secenekler)}</td><td class="small">${esc(x.gerekli_oldugu_modul)}</td></tr>`).join('')}</tbody></table></div>
      <p class="small muted" style="margin-top:8px">Identifiers and option lists are the package's original codes; they are not translated.</p><h2 class="h-sm" style="margin:28px 0 10px">Second-round additional fields (pediatrics and neonates)</h2><div class="tbl"><table><thead><tr><th>ID</th><th>Unit</th><th>Use</th><th>Rule</th></tr></thead><tbody>${C.ped.inputs.map(x => `<tr><td><code>${esc(x.id)}</code></td><td class="small">${esc(x.birim)}</td><td class="small">${esc(x.kullanim)}</td><td class="small">${esc(x.kural)}</td></tr>`).join('')}</tbody></table></div>
      <h2 class="h-sm" style="margin:28px 0 10px">Third-round additional fields (pregnancy)</h2><div class="tbl"><table><thead><tr><th>ID</th><th>Unit</th><th>Description</th></tr></thead><tbody>${C.preg.inputs.map(x => `<tr><td><code>${esc(x.id)}</code></td><td class="small">${esc(x.birim)}</td><td class="small">${esc(x.aciklama)}</td></tr>`).join('')}</tbody></table></div><p class="note" style="margin-top:12px">The site also has these product fields: AG reference range (lower/upper), biochemistry time and same-sample information, oxygen support type, normothermia, dyshemoglobin suspicion, DKA monitoring sample, optional HH tolerance. These were added to apply the conditions in the package.</p>`;
    else if (sub === 'profiller') body = `<p class="note" style="margin-bottom:12px">Reference range, cohort mean, treatment target and diagnostic/severity threshold are different data types. Study references and cohort values are never assigned to any patient as defaults.</p><div class="tbl"><table><thead><tr><th>ID</th><th>Data type</th><th>Profile</th><th>Value</th><th>Can be assigned as default?</th><th>Source</th></tr></thead><tbody>${C.ped.profiles.map(x => `<tr><td><code>${esc(x.id)}</code></td><td><b>${esc(VT[x.veri_turu] || x.veri_turu)}</b></td><td class="small">${esc(x.profil.replace(/_/g, ' '))}</td><td class="small">${profVal(x)}</td><td>${x.varsayilan_atanabilir === false ? "No" : '–'}</td><td>${cite(x.kaynaklar)}</td></tr>`).join('')}</tbody></table></div>
      <h2 class="h-sm" style="margin:28px 0 10px">Pregnancy profiles (third round)</h2><div class="tbl"><table><thead><tr><th>ID</th><th>Data type</th><th>Values and condition</th><th>Source</th></tr></thead><tbody>${C.preg.profiles.map(x => `<tr><td><code>${esc(x.id)}</code></td><td><b>${esc(GVT[x.tur] || x.tur)}</b></td><td class="small">${gprof(x)}${x.id === 'G-E03' ? "<br><b>Meaning in the application:</b> 35–40 mmHg is an example given in the source; it is not the upper limit of the warning. On the site, in a symptomatic pregnant patient 35–40 mmHg is shown as a \"relative rise\", and above 40 mmHg with a separate, more prominent message regardless of symptoms; this is not a new threshold." : ''}</td><td>${cite(x.kaynaklar)}</td></tr>`).join('')}</tbody></table></div>`;
    else if (sub === 'senaryolar') body = `<h2 class="h-sm" style="margin:0 0 10px">Rounds 8–10 data limit examples (E01–E30)</h2><p class="note" style="margin-bottom:12px">The package's acceptance proposals; each was converted into an engine test. The number of rows is not the number of tests.</p><div class="tbl" style="margin-bottom:28px"><table><thead><tr><th>ID</th><th>Input</th><th>Expected</th><th>Test</th></tr></thead><tbody>${C.r810.edges.map(x => `<tr><td><code>${esc(x.id)}</code></td><td class="small">${esc(x.girdi)}</td><td class="small">${esc(x.beklenen)}</td><td>${tst('8–10 sınır ' + x.id)}</td></tr>`).join('')}</tbody></table></div><p class="small muted" style="margin-bottom:8px">The input and expected columns are machine-readable codes from the package; field names and values are shown with their original (Turkish) codes.</p><p class="note" style="margin-bottom:12px">24 synthetic acceptance scenarios. Most are not complete blood gases but partial inputs that test the limit of a rule; missing variables are not assumed normal. Each was converted into an engine test.</p><div class="tbl"><table><thead><tr><th>ID</th><th>Scenario</th><th>Input</th><th>Expected</th><th>Source</th><th>Test</th></tr></thead><tbody>${C.ped.cases.map(x => `<tr><td><code>${esc(x.id)}</code></td><td>${esc(x.baslik)}</td><td class="small"><code>${esc(JSON.stringify(x.girdi))}</code></td><td class="small"><code>${esc(JSON.stringify(x.beklenen))}</code></td><td>${x.kaynaklar.length ? cite(x.kaynaklar) : "Arithmetic / data safety"}</td><td>${tst('senaryo ' + x.id)}</td></tr>`).join('')}${C.preg.cases.map(x => `<tr><td><code>${esc(x.id)}</code></td><td>${esc(x.baslik)}</td><td class="small"><code>${esc(JSON.stringify(x.girdi))}</code></td><td class="small"><code>${esc(JSON.stringify(x.beklenen))}</code></td><td>${x.kaynaklar.length ? cite(x.kaynaklar) : "Arithmetic / data safety"}</td><td>${tst('senaryo ' + x.id)}</td></tr>`).join('')}</tbody></table></div>`;
    else if (sub === 'kurallar') body = `<div class="tbl"><table><thead><tr><th>ID</th><th>Situation</th><th>Expected behavior</th><th>Type</th><th>Source</th><th>Test</th></tr></thead><tbody>${C.rules.map(r => { const tr = TESTS && TESTS.tests.find(x => x.name === 'kural ' + r.id); return `<tr><td><code>${esc(r.id)}</code></td><td>${esc(r.kosul)}</td><td>${esc(r.davranis)}</td><td class="small">${esc(r.tur)}</td><td>${r.kaynak_ids.length ? cite(r.kaynak_ids) : "Product decision"}</td><td>${tr ? (tr.ok ? "✓ passed" : "✗ failed") : '–'}</td></tr>`; }).join('')}</tbody></table></div>
      <h2 class="h-sm" style="margin:28px 0 10px">Pediatric and neonatal rules (second round)</h2><div class="tbl"><table><thead><tr><th>ID</th><th>Trigger</th><th>Behavior</th><th>Source</th><th>Test</th></tr></thead><tbody>${C.ped.rules.map(r => `<tr><td><code>${esc(r.id)}</code></td><td>${esc(r.tetik)}</td><td>${esc(r.sonuc)}</td><td>${r.kaynaklar.length ? cite(r.kaynaklar) : "Product decision"}</td><td>${tst('kural ' + r.id)}</td></tr>`).join('')}</tbody></table></div><p class="small muted" style="margin-top:8px">Nature: product rules that apply the limits of the sources.</p>
      <h2 class="h-sm" style="margin:28px 0 10px">Kidney/dialysis, toxicology and mixed disorder rules (rounds 8–10)</h2><p class="small muted" style="margin-bottom:8px">All are, per the label in the package, <b>implementation inferences</b>: product rules derived from the limits of the sources; they are not clinical algorithms validated by guidelines. Each rule was tested with a positive and a negative example.</p><div class="tbl"><table><thead><tr><th>ID</th><th>Condition</th><th>Shown</th><th>Not produced</th><th>Source</th><th>Test</th></tr></thead><tbody>${C.r810.rules.map(r => `<tr><td><code>${esc(r.id)}</code></td><td>${esc(r.kosul)}</td><td>${esc(r.goster)}</td><td>${esc(r.uretilmemeli)}</td><td>${cite(r.kaynaklar)}</td><td>${tst('8–10 kural ' + r.id)}</td></tr>`).join('')}</tbody></table></div>
      <h2 class="h-sm" style="margin:28px 0 10px">COPD and hypercapnia rules (seventh round, adult)</h2><p class="small muted" style="margin-bottom:8px">These are product rules. The chronic coefficient remained 0.35; the ERS/ATS and BTS conditions were not merged.</p><div class="tbl"><table><thead><tr><th>ID</th><th>Condition</th><th>Shown</th><th>Not produced</th><th>Source</th><th>Test</th></tr></thead><tbody>${C.koah.rules.map(r => `<tr><td><code>${esc(r.id)}</code></td><td>${esc(r.kosul)}</td><td>${esc(r.gosterilir)}</td><td>${esc(r.uretilmez)}</td><td>${r.kaynaklar.length ? cite(r.kaynaklar) : "Product rule"}</td><td>${tst('KOAH kural ' + r.id)}</td></tr>`).join('')}</tbody></table></div>
      <h2 class="h-sm" style="margin:28px 0 10px">Serial evaluation rules (sixth round)</h2><div class="tbl"><table><thead><tr><th>ID</th><th>Situation</th><th>Shown</th><th>Not produced</th><th>Source</th><th>Test</th></tr></thead><tbody>${C.serial.rules.map(r => `<tr><td><code>${esc(r.id)}</code></td><td>${esc(r.durum)}</td><td>${esc(r.gosterilir)}</td><td>${esc(r.uretilmez)}</td><td>${r.kaynaklar.length ? cite(r.kaynaklar) : "Arithmetic / product rule"}</td><td>${tst('seri kural ' + r.id)}</td></tr>`).join('')}</tbody></table></div>
      <h2 class="h-sm" style="margin:28px 0 10px">Sample and measurement rules (fifth round)</h2><div class="tbl"><table><thead><tr><th>ID</th><th>Trigger</th><th>Behavior</th><th>Nature</th><th>Source</th><th>Test</th></tr></thead><tbody>${C.sample.rules.map(r => `<tr><td><code>${esc(r.id)}</code></td><td>${esc(r.tetik)}</td><td>${esc(r.sonuc)}</td><td class="small">${esc(r.nitelik)}</td><td>${r.kaynaklar.length ? cite(r.kaynaklar) : "Product rule"}</td><td>${tst('numune ' + r.id)}</td></tr>`).join('')}</tbody></table></div>
      <h2 class="h-sm" style="margin:28px 0 10px">Pregnancy rules (third round)</h2><div class="tbl"><table><thead><tr><th>ID</th><th>Trigger</th><th>Behavior</th><th>Source</th><th>Test</th></tr></thead><tbody>${C.preg.rules.map(r => `<tr><td><code>${esc(r.id)}</code></td><td>${esc(r.tetik)}</td><td>${esc(r.sonuc)}</td><td>${r.kaynaklar.length ? cite(r.kaynaklar) : "Product decision"}</td><td>${tst('kural ' + r.id)}</td></tr>`).join('')}</tbody></table></div>`;
    else body = `<div class="panel" style="margin-bottom:14px"><h3 class="h-sm">Limits of use in pregnancy (third round)</h3><p class="small">The third round adds no new formula; it defines the limit of the four existing calculations in pregnancy.</p><ul class="ask">${C.preg.formulas.map(f => `<li><b>${esc(f.ad)}</b> <code>${esc(f.id)}</code>: ${esc(f.kisit)} ${cite(f.kaynaklar)}</li>`).join('')}<li class="small muted">Note: in the G-F03 statement the albumin reference is written as 4 g/dL; as in the first package, the site requires the reference to be entered by the laboratory and does not use a silent default.</li></ul></div><div class="flist">${[...C.formulas, ...PFORM, ...C.r810.formulas].map(f => `<article class="fcard" id="f-${f.id}"><h3>${esc(f.ad)} <code>${esc(f.id)}</code></h3><div class="expr">${esc(f.ifade)} <span class="muted">→ ${esc(f.sonuc_birimi)}</span></div>
      <div><h4>Condition of application</h4><p>${esc(f.uygulama_kosullari)}</p></div><div><h4>Limitation</h4><p>${esc(f.sinirlamalar)}</p></div>
      <p class="small muted" style="grid-column:1/-1">Source: ${cite(f.kaynak_ids)} · ${esc(f.durum)}</p></article>`).join('')}</div>`;
    view.innerHTML = `<div class="wrap page-head"><p class="eyebrow">Formulas and rules</p><h1>Formulas</h1><p class="lede">Every calculation the engine uses, with its conditions and limits. When a condition is not met, the calculation is not performed and the reason is shown. Compensation coefficients differ between sources.</p>
      <nav class="subtabs">${tabs.map(([k, l]) => `<a href="#/formuller${k ? '/' + k : ''}"${(sub || '') === k ? " aria-current=\"page\"" : ''}>${l}</a>`).join('')}</nav></div><div class="wrap page">${body}</div>`;
  }

  /* ================= Kaynaklar ================= */
  function srcItem(n) {
    const s = SRC[n]; if (!s) return '';
    return `<li id="src-${n}"><span class="no">${n}</span><span class="t">${esc(s.baslik)}</span><span class="m">${esc([s.yazarlar, s.yayin, s.yil].filter(Boolean).join(' · '))}${s.doi ? ` · DOI <a href="https://doi.org/${esc(s.doi)}" target="_blank" rel="noopener">${esc(s.doi)}</a>` : s.url ? ` · <a href="${esc(s.url)}" target="_blank" rel="noopener">official source</a>` : ''}${s.pmid ? ` · PMID ${esc(s.pmid)}` : ''}</span><span class="acc">${s.kanit_turu ? `Evidence type: ${esc(s.kanit_turu)} · ` : ''}Access: ${esc(s.erisim)}</span></li>`;
  }
  function viewSources(n) {
    view.innerHTML = `<div class="wrap page-head"><p class="eyebrow">Sources</p><h1>Sources</h1><p class="lede">${C.sources.length} sources: [1]–[20] first round, [21]–[40] pediatrics and neonates, [41]–[57] pregnancy, [58]–[78] sample and measurement, [79]–[88] serial evaluation, [89]–[103] COPD and hypercapnia, [104]–[132] kidney/dialysis, toxicology and mixed disorders; checked on 7 October 2026. The numbers belong to this atlas only; first-round records were not re-screened in the second round. Sources read in full text and those for which only the abstract was reviewed are marked separately; verifying a source's identity does not mean its full text was reviewed.</p></div>
      <div class="wrap"><h2 class="h-sm" style="margin-bottom:10px">First round: adult</h2><ol class="srclist" style="padding-bottom:20px">${C.sources.filter(s => s.id <= 20).map(s => srcItem(s.id)).join('')}</ol><h2 class="h-sm" style="margin-bottom:10px">Second round: pediatrics and neonates</h2><ol class="srclist" style="padding-bottom:20px">${C.sources.filter(s => s.id > 20 && s.id <= 40).map(s => srcItem(s.id)).join('')}</ol><h2 class="h-sm" style="margin-bottom:10px">Third round: pregnancy</h2><ol class="srclist" style="padding-bottom:20px">${C.sources.filter(s => s.id > 40 && s.id <= 57).map(s => srcItem(s.id)).join('')}</ol><h2 class="h-sm" style="margin-bottom:10px">Fifth round: sample and measurement</h2><p class="small muted" style="margin-bottom:10px">Of the 23 sources in the package, two were already in the atlas (package [1] = [1], package [2] = [21]); the remaining 21 sources were deduplicated by DOI and added as [58]–[78]. Manufacturer documents do not replace the IFU.</p><ol class="srclist" style="padding-bottom:20px">${C.sources.filter(s => s.id > 57 && s.id <= 78).map(s => srcItem(s.id)).join('')}</ol><h2 class="h-sm" style="margin-bottom:10px">Sixth round: serial evaluation</h2><p class="small muted" style="margin-bottom:10px">Of the 23 sources in the package, 13 were already in the atlas (matched by DOI, URL or title: SSC 2026 adult [10] and pediatric [34], European RDS 2025 [24], PALICC-2 [22], etc.); the remaining 10 sources were added as [79]–[88]. The KDIGO 2026 AKI/AKD document is a draft and was not used as a rule source.</p><ol class="srclist" style="padding-bottom:20px">${C.sources.filter(s => s.id > 78 && s.id <= 88).map(s => srcItem(s.id)).join('')}</ol><h2 class="h-sm" style="margin-bottom:10px">Seventh round: COPD and hypercapnia (adult)</h2><p class="small muted" style="margin-bottom:10px">Of the 18 sources in the package, 4 were already in the atlas and were matched by DOI (BTS/ICS hypercapnia [83], BTS oxygen [52], BTS NIV quality standard [88], McKeever venous gas [71]); the remaining 14 sources were added as [89]–[102]. [103] (Yi 2023, posthypercapnic alkalosis review) was added from the 1.6 independent check report and served as the basis for narrowing K-R09. GOLD 2026 [89] is only a record of publication currency; it is not shown as if its full text had been read and was not made a source for numerical rules.</p><ol class="srclist" style="padding-bottom:20px">${C.sources.filter(s => s.id > 88 && s.id <= 103).map(s => srcItem(s.id)).join('')}</ol><h2 class="h-sm" style="margin-bottom:10px">Rounds 8–10: kidney/dialysis, toxicology, mixed disorders</h2><p class="small muted" style="margin-bottom:10px">Of the 39 sources in the package, 10 were already in the atlas and were matched by DOI, URL or title (KDIGO 2012 AKI [84], KDIGO 2026 status page [85], CDC CO [13], methemoglobinemia [14], SRLF/SFMU (Jung) [79], Figge [7], Achanti &amp; Szerlip [3], González [91], Yi [103], Kraut [8]); the remaining 29 sources were added as [104]–[132]. The evidence type and access level of each record were written separately; abstract access is not shown as full text read. The KDIGO 2026 AKI/AKD document is still a draft and was not made a rule source.</p><ol class="srclist">${C.sources.filter(s => s.id > 103).map(s => srcItem(s.id)).join('')}</ol></div>`;
    if (n) { const el = document.getElementById('src-' + n); if (el) { location.replace('#/kaynaklar/' + n); el.scrollIntoView({block: 'center'}); el.focus && el.setAttribute('tabindex', '-1'); el.style.borderColor = "var(--accent)"; } }
  }

  /* ================= Yönlendirici ================= */
  const TAB = {'': 'home', seri: 'serial', degerlendir: 'eval', ogren: 'learn', olgular: 'cases', olgu: 'cases', formuller: 'formulas', kaynaklar: 'src'};
  function route() {
    const parts = location.hash.replace(/^#\/?/, '').split('/');
    const [a = '', b] = parts;
    document.querySelectorAll('.topnav a[data-tab]').forEach(x => { if (x.dataset.tab === TAB[a]) x.setAttribute('aria-current', 'page'); else x.removeAttribute('aria-current'); });
    if (a === 'degerlendir') viewEval(b, parts[2]);
    else if (a === 'seri') viewSerial(b);
    else if (a === 'ogren') viewLearn(b || 'temeller');
    else if (a === 'olgular') viewCases();
    else if (a === 'olgu') viewCase(b);
    else if (a === 'formuller') viewFormulas(b);
    else if (a === 'sinirlar') { location.replace('#/'); return; }   /* Sınırlar sayfası yayından kaldırıldı; eski bağlantılar ana sayfaya gider */
    else if (a === 'kaynaklar') viewSources(b);
    else viewHome();
    if (a !== 'kaynaklar' || !b) window.scrollTo(0, 0);
    const h1 = view.querySelector('h1'); document.title = (h1 && a ? h1.textContent + ' · ' : '') + t('site.name');
  }
  /* İlerleme değişince görünen işaretleri yenile */
  document.addEventListener('kg:progress', () => { view.querySelectorAll('[data-pid]').forEach(a => { const m = a.querySelector('.pmark'); if (m) m.remove(); a.insertAdjacentHTML('beforeend', PROG.markHTML(a.dataset.pid)); }); });
  /* Yerel test sayfaları (site/_*.html) için: hazır girdiyi forma yükler. Değerler yalnız bu sayfada kalır. */
  window.KGAPP = {load(v, tab) { S = Object.assign(DEFAULTS(), JSON.parse(JSON.stringify(v))); for (const k in S) if (typeof S[k] === 'number') S[k] = dec(S[k]); resTab = tab || 'short'; location.hash = '#/degerlendir/yeni'; viewEval(null, tab); }};
  KGI.applyStatic();
  addEventListener('hashchange', route);
  route();
})();
