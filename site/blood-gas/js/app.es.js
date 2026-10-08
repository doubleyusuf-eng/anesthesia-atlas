/* Otomatik üretildi: node tools/i18n.cjs apply — elle düzenlemeyin. Kaynak: js/app.js + content-src/i18n/es */
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
  const PFORM = C.ped.formulas.map(f => ({id: f.id, ad: f.ad, ifade: f.ifade, sonuc_birimi: f.sonuc, uygulama_kosullari: f.kosullar.join('; '), sinirlamalar: f.sonuc, kaynak_ids: f.kaynaklar, durum: "Definición de investigación (segunda ronda)"}));
  const FORM = Object.fromEntries([...C.formulas, ...PFORM].map(f => [f.id, f]));
  /* [R18-01] Ca oranı gösterimi: 2 basamakta 2,5'e yuvarlanıp karar tersine düşüyorsa yeterli basamak ve açıklama gösterilir */
  const caFmt = m => { const r2 = n2(m.ratio), looksBoundary = Math.abs(Math.round(m.ratio * 100) - 250) === 0;
    return looksBoundary && !m.exactly2_5 ? `${num(m.ratio, 6)} (respecto a 2,5: ${m.atOrAbove2_5 ? "por encima" : "por debajo"}; la visualización redondeada a dos dígitos no interviene en la decisión)` : r2; };
  /* Yüzde: Türkçede işaret önde (%94–98), İngilizcede sonda (94–98%), İspanyolcada boşlukla sonda (94–98 %) */
  const pct = (a, b) => { const v = b == null ? a : `${a}–${b}`; return KGI.lang === 'tr' ? '%' + v : KGI.lang === 'es' ? v + ' %' : v + '%'; };
  const R8FORM = Object.fromEntries(C.r810.formulas.map(f => [f.id, f]));
  const R8G = {renal: "Riñón y diálisis (ronda 8)", tox: "Toxicología (ronda 9)", mixed: "Trastornos ácido–base mixtos (ronda 10)"};
  const cite = ids => [...new Set(ids)].sort((a, b) => a - b).map(n => `<a class="cite" href="#/kaynaklar/${n}" title="${esc(SRC[n] ? SRC[n].baslik : '')}">[${n}]</a>`).join(' ');
  const n1 = v => num(v, 1), n2 = v => num(v, 2);

  /* ================= Alanlar ================= */
  const YN = [['unknown', "Desconocido"], ['yes', "Sí"], ['no', "No"]];
  const OPT = {
    sample_type: [['unknown', "Seleccionar (desconocido)"], ['arterial', "Arterial"], ['peripheral_venous', "Venosa periférica"], ['central_venous', "Venosa central"], ['mixed_venous', "Venosa mixta"], ['capillary', "Capilar"], ['cord_artery', "Arteria del cordón"], ['cord_vein', "Vena del cordón"], ['cord_unknown', "Cordón, vaso incierto"], ['circuit', "Circuito (ECMO/bypass)"]],
    age_group: [['', "Seleccionar"], ['adult', "Adulto"], ['pediatric', "Niño"], ['neonatal', "Neonato"]],
    care_context: [['unknown', "Desconocido"], ['delivery', "Sala de partos"], ['nicu', "Cuidados intensivos neonatales"], ['picu', "Cuidados intensivos pediátricos"], ['other', "Otro"]],
    sample_site: [['unknown', "Desconocido"], ['right_radial', "Radial derecha (preductal)"], ['umbilical_artery', "Arteria umbilical (posductal)"], ['other', "Otro"]],
    perfusion: [['unknown', "Desconocido"], ['good', "Buena"], ['poor', "Alterada"]],
    pregnancy: [['unknown', "Desconocido"], ['no', "No"], ['yes', "Presente"]],
    temperature_reporting: [['unknown', "Desconocido"], ['37C_uncorrected', "37 °C, sin corregir"], ['temperature_corrected', "Corregido a la temperatura del paciente"], ['mixed', "Mixto (corregido + sin corregir)"]],
    be_type: [['unknown', "Desconocido"], ['BE_blood', "BE, sangre (BE real)"], ['BE_ECF', "BE, líquido extracelular (BE estándar, SBE)"], ['BD_blood', "BD (déficit de base), sangre"], ['BD_ECF', "BD (déficit de base), líquido extracelular"]],
    chem_same: [['unknown', "Desconocido"], ['yes', "Sí, al mismo tiempo"], ['no', "No, distinto momento/muestra"]],
    fio2_quality: [['unknown', "Desconocido"], ['known', "Conocida (medida/ajustada)"], ['estimated', "Estimada"]],
    o2_support: [['unknown', "Desconocido"], ['room_air', "Aire ambiente"], ['supplemental', "Oxígeno suplementario / soporte respiratorio"]],
    normothermia: YN,
    saturation_type: [['unknown', "Desconocido"], ['coox_functional', "Cooximetría, funcional"], ['coox_fractional', "Cooximetría, fraccional"], ['calculated', "Calculada por el equipo"], ['spo2', "SpO₂ (pulsioximetría)"]],
    dyshb: [['unknown', "Desconocido"], ['no', "No"], ['yes', "Presente / sospechada"]],
    urine_ketones: [['unknown', "Desconocido"], ['negative', "Negativo"], ['trace', "Trazas"], ['1+', '1+'], ['2+', '2+'], ['3+', '3+'], ['4+', '4+'], ['small', "Pequeño"], ['moderate', "Moderado"], ['large', "Grande"]],
    diabetes_history: [['unknown', "Desconocido"], ['yes', "Presente"], ['no', "No"]],
    vent_type: [['unknown', "Desconocido"], ['invasive', "Invasiva"], ['noninvasive', "No invasiva"], ['other', "Otra / ninguna"]],
    spo2_site: [['unknown', "Desconocido"], ['right_hand', "Mano derecha (preductal)"], ['right_wrist', "Muñeca derecha (preductal)"], ['foot', "Pie (posductal)"], ['other', "Otro"]],
    signal: [['unknown', "Desconocido"], ['good', "Buena"], ['poor', "Mala"]],
    maternal_context: [['unknown', "Desconocido"], ['not_pregnant', "No embarazada / no aplicable"], ['pregnant', "Embarazada"], ['labor', "Trabajo de parto"], ['postpartum', "Posparto"], ['breastfeeding', "Lactancia"]],
    sample_owner: [['unknown', "Desconocido"], ['mother', "Madre"], ['fetus', "Feto (cuero cabelludo)"], ['cord', "Cordón"]],
    labor_stage: [['unknown', "Desconocido"], ['none', "Sin trabajo de parto"], ['1', "1.ª fase"], ['2', "2.ª fase"], ['3', "3.ª fase"]],
    position: [['unknown', "Desconocido"], ['sitting', "Sentada"], ['supine', "Decúbito supino"], ['left_lateral', "Decúbito lateral izquierdo"], ['other', "Otro"]],
    o2_profile: [['none', "No seleccionado"], ['institution', "Perfil aprobado por la institución"], ['bts', "BTS 2017"], ['expert', "Definido por el especialista"]],
    diabetes_type: [['unknown', "Desconocido"], ['none', "No"], ['t1', "Tipo 1"], ['t2', "Tipo 2"], ['gestational', "Gestacional"]],
    fetal_assessment: [['unknown', "Desconocido"], ['not_done', "No realizada"], ['reassuring', "Tranquilizadora"], ['concern', "Preocupación (p. ej., trazado de categoría II/III)"]],
    pushing: YN, hypercapnia_risk: YN, pump_issue: YN, poor_intake: YN, vomiting: YN, steroid: YN, feels_unwell: YN, infection: YN, organ_dysfunction: YN, sepsis_high_risk: YN, maternal_hypoxia: YN, bleeding: YN, resp_symptoms: YN, pe_suspected: YN,
    q_bubble: [['unknown', "Desconocido"], ['no', "No observado"], ['yes', "Observado"]], q_heparin: [['unknown', "Desconocido"], ['dry_balanced', "Seca, con electrolitos equilibrados"], ['liquid', "Heparina líquida"]],
    q_clot: [['unknown', "Desconocido"], ['no', "No observado"], ['yes', "Observado"]], q_hemolysis: [['unknown', "Desconocido"], ['not_measured', "No medido"], ['device_unknown', "Especificación del equipo desconocida"], ['negative', "Negativo"], ['positive', "Positivo"]],
    q_catheter: YN, q_flush: [['unknown', "Desconocido"], ['saline', "NaCl al 0,9 %"], ['glucose', "Líquido con glucosa"], ['other', "Otro"]],
    q_transport: [['unknown', "Desconocido"], ['hand', "A mano"], ['pneumatic_validated', "Tubo neumático, validado localmente"], ['pneumatic_unvalidated', "Tubo neumático, no validado"], ['pneumatic_unknown', "Tubo neumático, validación desconocida"]],
    q_storage: [['unknown', "Desconocido"], ['room', "Temperatura ambiente"], ['ice', "Enfriada / en hielo"]], q_device_error: YN, q_manual: YN, q_hydroxocobalamin: YN, q_leukocytosis: YN,
    stable: YN, support_concurrent: YN, pards_confirmed: YN, nards_confirmed: YN, cyanotic_chd: YN, baseline_imv: YN, perinatal_event: YN, neuro: YN, dka_confirmed: YN, rds_confirmed: YN, copd_confirmed: YN, prior_arterial: YN, prior_stable: YN, hc_renal: YN, hc_diuretic: YN, hc_alkali_vomit: YN, hc_chronic_confirmed: YN,
    hc_phase: [['unknown', "Desconocido"], ['exacerbation', "Exacerbación aguda / fase aguda"], ['stable', "Fase estable"]],
    /* 8–10. tur: böbrek, kalsiyum/sitrat, toksikoloji (varsayılan hep "bilinmiyor"/"seçilmedi") */
    renal_context: [['unknown', "Desconocido"], ['AKI', "IRA (AKI) (confirmada clínicamente)"], ['CKD', "ERC (CKD) (confirmada clínicamente)"], ['AKI_on_CKD', "IRA (AKI) sobre ERC (CKD)"], ['unspecified', "Enfermedad renal presente, tipo no especificado"], ['none', "No"]],
    krt_modality: [['unknown', "Desconocido"], ['none', "Sin TRR"], ['IHD', "Hemodiálisis intermitente (HDI)"], ['CKRT', "TRR continua (TRRC)"], ['prolonged', "Sesión prolongada"], ['PD', "Diálisis peritoneal"]],
    urine_same_sample: YN, diuretic_recent: YN, alkali_given: YN, urine_infection: YN, k_drug_context: YN, rca_confirmed: YN, ca_concurrent: YN, osm_concurrent: YN, lactate_methods_concurrent: YN, tox_suspicion: YN, clinical_worsening: YN,
    calcium_need_trend: [['unknown', "Desconocido"], ['rising', "En aumento"], ['not_rising', "Sin aumento"]],
    total_ca_site: [['unknown', "Desconocido"], ['systemic', "Sistémico (paciente)"], ['postfilter', "Posfiltro (circuito)"]], ionized_ca_site: [['unknown', "Desconocido"], ['systemic', "Sistémico (paciente)"], ['postfilter', "Posfiltro (circuito)"]],
    tox_agent: [['unknown', "Desconocido / no seleccionado"], ['methanol', "Metanol"], ['ethylene_glycol', "Etilenglicol"], ['toxic_alcohol', "Alcohol tóxico, tipo incierto"], ['salicylate', "Salicilato"], ['metformin', "Metformina"], ['isopropanol', "Isopropanol"], ['co', "Monóxido de carbono"], ['smoke', "Inhalación de humo"], ['propylene_glycol', "Propilenglicol (disolvente)"], ['other', "Otro"]],
    tox_acute_chronic: [['unknown', "Desconocido"], ['acute', "Aguda"], ['chronic', "Crónica"], ['acute_on_chronic', "Aguda sobre crónica"]],
    tox_antidote: [['unknown', "Desconocido"], ['none', "No administrado"], ['fomepizole', "Fomepizol administrado"], ['ethanol', "Etanol (antídoto) administrado"], ['other', "Otro"]],
    organic_acid_context: [['unknown', "Desconocido"], ['none', "No"], ['short_bowel', "Intestino corto (riesgo de D-lactato)"], ['oxoproline', "Riesgo de 5-oxoprolina (fármaco/desnutrición)"], ['propylene_glycol', "Infusión con propilenglicol"]],
    acetone: [['unknown', "Desconocido"], ['not_measured', "No medido"], ['negative', "Negativo"], ['positive', "Positivo"]],
    og_profile: [['none', "No seleccionado"], ['ideal_4_6', "Ideal: etanol ÷ 4,6"], ['purssell', "Purssell empírico: etanol ÷ 3,7 − 0,35"]],
    salicylate_unit: [['', "¿unidad?"], ['mg/dL', 'mg/dL'], ['mg/L', 'mg/L']]
  };
  const U = {pco2: ['mmHg', 'kPa'], pao2: ['mmHg', 'kPa'], fio2: [['fraction', 'kesir'], ['percent', '%']], albumin: ['g/dL', 'g/L'], hb: ['g/dL', 'g/L'], saturation: [['percent', '%'], ['fraction', 'kesir']], glucose: ['mg/dL', 'mmol/L'], cord_pco2_art: ['kPa', 'mmHg'],
    total_ca: [['', "¿unidad?"], 'mmol/L', 'mg/dL'], ionized_ca: [['', "¿unidad?"], 'mmol/L', 'mg/dL'], salicylate_value: [['', "¿unidad?"], 'mg/dL', 'mg/L']};
  const LBL = {
    sample_type: "Tipo de muestra", age_group: "Grupo de edad", care_context: "Contexto asistencial", sample_site: "Sitio de extracción de la gasometría", perfusion: "Perfusión periférica (capilar)", pregnancy: "Embarazo", temperature_reporting: "Informe de temperatura", sample_time: "Momento de la muestra", analysis_time: "Momento del análisis",
    ph: 'pH', pco2: 'PCO₂', hco3_actual: "HCO₃ real (mmol/L)", hco3_standard: "HCO₃ estándar (mmol/L)", be: "Valor de BE / BD (mmol/L, con signo)", be_type: "Algoritmo de BE / BD",
    na: "Na⁺ (mmol/L)", cl: "Cl⁻ (mmol/L)", tco2: "TCO₂ de bioquímica (mmol/L)", k: "K⁺ (mmol/L)", albumin: "Albúmina", chem_same: "¿Bioquímica extraída al mismo tiempo que la gasometría?", chem_time: "Hora de la bioquímica",
    gas_hco3_for_ag: "Si no hay TCO₂, usar el HCO₃ de la gasometría para la AG (se etiqueta como método distinto; no se calcula el delta)",
    ag_ref_low: "Intervalo de referencia de la AG, inferior", ag_ref_high: "Intervalo de referencia de la AG, superior", ag_reference: "Valor de referencia de la AG (para el delta)", albumin_reference: "Referencia de albúmina (g/dL)", hco3_reference: "HCO₃ basal (para el delta)", hh_tolerance: "Tolerancia HH (unidades de pH)",
    pao2: 'PO₂', fio2: 'FiO₂', fio2_quality: "Fuente de la FiO₂", o2_support: "Soporte de oxígeno", oxygen_device: "Dispositivo y flujo (texto libre)", normothermia: "Normotermia", barometric_mmhg: "Presión barométrica (mmHg)",
    baro_sealevel: "No conozco la presión barométrica; elijo explícitamente el supuesto de nivel del mar de 760 mmHg", hb: "Hemoglobina", saturation: "Saturación", saturation_type: "Tipo de saturación", dyshb: "COHb/MetHb elevada o sospechada", cohb: "COHb (%)", methb: "MetHb (%)",
    lactate: "Lactato (mmol/L)", glucose: "Glucosa", beta_hydroxybutyrate: "β-hidroxibutirato (mmol/L)", urine_ketones: "Cetonas en orina", diabetes_history: "Antecedente de diabetes", dka_followup: "Esta muestra es de seguimiento durante el tratamiento de la CAD (mostrar criterios de resolución)",
    dka_confirmed: "CAD confirmada clínicamente (para la tabla de gravedad)",
    clinical_context: "Contexto clínico (solo tu nota; no entra en los cálculos)", support_change_time: "Hora del último cambio de soporte",
    birth_time: "Hora del nacimiento", ga_weeks: "Gestación al nacer, semanas", ga_days: "Gestación al nacer, días (0–6)", postnatal_days: "Edad posnatal, días completos (si no hay hora de nacimiento)", postnatal_minutes: "Minutos tras el nacimiento (si no hay hora de nacimiento)",
    perinatal_event: "Antecedente de evento perinatal", neuro: "Alteración neurológica / convulsión",
    local_ref_source: "Fuente de la referencia local (edad, tipo de muestra, analizador, año)", ref_ph_low: "Referencia local de pH, inferior", ref_ph_high: "Referencia local de pH, superior", ref_pco2_low: "Referencia local de PCO₂, inferior (mmHg)", ref_pco2_high: "Referencia local de PCO₂, superior (mmHg)",
    paw: "Presión media de la VÍA AÉREA (cmH₂O)", support_concurrent: "¿FiO₂ y presión de vía aérea simultáneas con la muestra?", spo2: "SpO₂ (%)", spo2_site: "Sitio del oxímetro", signal: "Calidad de la señal del oxímetro", stable: "Medición estable (no una desaturación transitoria)",
    vent_type: "Tipo de ventilación", pards_confirmed: "¿Diagnóstico clínico de PARDS confirmado?", pards_hours: "Horas desde el diagnóstico de PARDS", cyanotic_chd: "Cardiopatía congénita cianótica", baseline_imv: "Ventilación invasiva desde el inicio (enfermedad pulmonar crónica)",
    nards_confirmed: "¿Contexto de NARDS confirmado? (RDS, taquipnea transitoria y anomalías excluidas)",
    rds_confirmed: "¿Diagnóstico clínico de RDS confirmado?",
    copd_confirmed: "¿Diagnóstico de EPOC confirmado por espirometría?", hc_phase: "Fase clínica", prior_pco2: "PCO₂ en la gasometría previa (mmHg)", prior_hco3: "HCO₃ en la gasometría previa (mmol/L)",
    prior_arterial: "¿La gasometría previa era arterial?", prior_stable: "¿La gasometría previa se tomó en fase estable?", hc_renal: "Insuficiencia renal / diálisis", hc_diuretic: "Uso de diuréticos", hc_alkali_vomit: "Ingesta de álcalis o vómitos", hc_chronic_confirmed: "¿Hipercapnia crónica previa confirmada clínicamente?",
    maternal_context: "Contexto de embarazo", sample_owner: "¿De quién es la muestra?", labor_stage: "Fase del trabajo de parto", pushing: "Pujos", postpartum_hours: "Horas desde el parto", position: "Posición", altitude_m: "Altitud (m)",
    resp_symptoms: "Síntoma respiratorio (disnea, etc.)", pe_suspected: "Sospecha de embolia pulmonar", maternal_hypoxia: "Hipoxia materna", fetal_assessment: "Evaluación fetal", bleeding: "Hemorragia",
    o2_profile: "Perfil de objetivo de oxígeno", hypercapnia_risk: "Riesgo de insuficiencia respiratoria hipercápnica", o2_target_low: "SpO₂ objetivo del perfil, inferior (%)", o2_target_high: "SpO₂ objetivo del perfil, superior (%)",
    infection: "Sospecha de infección", organ_dysfunction: "Disfunción orgánica no explicada", sepsis_high_risk: "Alto riesgo clínico (sepsis)", sbp: "Presión sistólica (mmHg)",
    diabetes_type: "Tipo de diabetes", pump_issue: "Problema con la bomba de insulina / interrupción de la insulina", poor_intake: "Menor ingesta / ayuno", vomiting: "Vómitos", steroid: "Exposición a esteroides", feels_unwell: "Se encuentra mal",
    q_bubble: "Burbuja de aire", q_heparin: "Tipo de heparina", q_clot: "Coágulo", q_hemolysis: "Hemólisis", q_catheter: "¿La muestra se extrajo de un catéter?", q_flush: "Líquido de lavado del catéter",
    q_transport: "Transporte", q_storage: "Espera / almacenamiento", protocol_minutes: "Tiempo de análisis aprobado por la institución (min; según tu protocolo)", q_device_error: "Código de error del equipo / resultado fuera del rango de medición",
    q_manual: "Valores transcritos a mano", q_hydroxocobalamin: "Se administró hidroxocobalamina", q_leukocytosis: "Leucocitosis marcada", cord_clamp_time: "Hora del pinzamiento del cordón",
    cord_ph_art: "pH de la arteria del cordón", cord_ph_ven: "pH de la vena del cordón", cord_pco2_art: "PCO₂ de la arteria del cordón", cord_pco2_ven: "PCO₂ de la vena del cordón",
    hco3_actual_not_standard: "HCO₃ real (no se usa en lugar del HCO₃ estándar)", ag: "Brecha aniónica", ref_ph: "Referencia local de pH específica para la edad y la muestra", oi: 'OI',
    renal_context: "Contexto renal (confirmado clínicamente)", krt_modality: "Estado de TRR (diálisis)", k_drug_context: "Antecedente de fármacos que pueden afectar al potasio",
    urine_na: "Na⁺ urinario (mmol/L)", urine_k: "K⁺ urinario (mmol/L)", urine_cl: "Cl⁻ urinario (mmol/L)", urine_same_sample: "¿Los tres electrolitos urinarios son de la misma muestra?", urine_ph: "pH urinario", diuretic_recent: "Diurético reciente", alkali_given: "Álcali administrado", urine_infection: "Contexto de infección urinaria",
    total_ca: "Ca total", ionized_ca: "Ca iónico (iCa)", total_ca_unit: "Unidad del Ca total", ionized_ca_unit: "Unidad del iCa", total_ca_site: "Sitio de muestra del Ca total", ionized_ca_site: "Sitio de muestra del iCa", ca_concurrent: "¿Ca total e iCa simultáneos?",
    rca_confirmed: "¿Se aplica anticoagulación regional con citrato (RCA)?", calcium_need_trend: "Tendencia del requerimiento de calcio",
    tox_suspicion: "Sospecha de exposición tóxica", tox_agent: "Sustancia sospechada", tox_acute_chronic: "Exposición: aguda / crónica", tox_antidote: "Estado del antídoto", clinical_worsening: "Deterioro clínico (conciencia, respiración, etc.)",
    measured_osmolality: "Osmolalidad sérica medida (mOsm/kg)", bun: "BUN (mg/dL)", urea: "Urea (mmol/L) — no introducir junto con el BUN", ethanol: "Etanol (mg/dL; dejar en blanco si no se midió)", osm_concurrent: "¿Osmolalidad y componentes simultáneos?", og_profile: "Perfil de contribución del etanol (según tu laboratorio)",
    glucose_unit: "Unidad de glucosa", salicylate_value: "Nivel de salicilato", salicylate_unit: "Unidad de salicilato", lactate_method_a: "Lactato, método A (mmol/L)", lactate_method_b: "Lactato, método B (mmol/L)", lactate_methods_concurrent: "¿Los dos lactatos son de la misma muestra/simultánea?",
    organic_acid_context: "Contexto de ácido orgánico infrecuente", acetone: "Acetona", age_missing: "Grupo de edad"
  };
  /* Görünürlük: yaş grubu ve örnek türüne göre */
  const isPed = () => S.age_group === 'pediatric' || S.age_group === 'neonatal', isNeo = () => S.age_group === 'neonatal', isAdult = () => S.age_group === 'adult' || !S.age_group;
  const isCord = () => String(S.sample_type).startsWith('cord') || S.sample_owner === 'cord';
  const isPregCtx = () => !isPed() && ['pregnant', 'labor', 'postpartum', 'breastfeeding'].includes(S.maternal_context), isPregLike = () => isPregCtx() && S.maternal_context !== 'breastfeeding';
  const W = (id, when, kind, wide) => ({id, when, kind, wide});
  const GROUPS = [
    {id: 'g1', title: "Muestra y paciente", open: true, hint: "Selecciona primero el grupo de edad; adulto no está preseleccionado. Una muestra desconocida no se supone arterial.",
      f: ['age_group', W('care_context', isPed), 'sample_type', W('sample_site', isPed), W('perfusion', () => S.sample_type === 'capillary'), W('maternal_context', () => S.age_group !== 'neonatal'), W('sample_owner', () => ['pregnant', 'labor', 'postpartum'].includes(S.maternal_context)), 'temperature_reporting', W('sample_time', null, 'dt'), W('analysis_time', null, 'dt')]},
    {id: 'gP', title: "Contexto neonatal y pediátrico", open: true, when: () => isPed() || isCord(), hint: "No existe un valor normal pediátrico universal. No se asigna la etiqueta \"normal\" salvo que se introduzca una referencia local específica para la edad, la muestra y el analizador. Los intervalos de los estudios (p. ej., CALIPER venoso) no se asignan automáticamente.",
      f: [W('birth_time', null, 'dt'), W('ga_weeks', () => isNeo() || isCord()), W('ga_days', () => isNeo() || isCord()), W('postnatal_days', isNeo), W('postnatal_minutes', () => isNeo() && S.care_context === 'delivery'), W('perinatal_event', () => isNeo() || isCord()), 'neuro',
        W('local_ref_source', () => isPed() && !isCord(), 'text', true), W('ref_ph_low', () => isPed() && !isCord()), W('ref_ph_high', () => isPed() && !isCord()), W('ref_pco2_low', () => isPed() && !isCord()), W('ref_pco2_high', () => isPed() && !isCord())]},
    {id: 'gG', title: "Embarazo, trabajo de parto y posparto", open: true, when: () => isPregCtx() && !isCord(), hint: "Los intervalos de las revisiones sobre embarazo no son valores normales universales. No se genera un objetivo de oxígeno sin seleccionar un perfil institucional o del especialista. El resultado materno no es el resultado fetal.",
      f: [W('ga_weeks', isPregLike), W('ga_days', isPregLike), W('labor_stage', () => S.maternal_context === 'labor'), W('pushing', () => S.maternal_context === 'labor'), W('postpartum_hours', () => S.maternal_context === 'postpartum'), W('position', isPregLike), W('altitude_m', isPregLike),
        W('resp_symptoms', isPregLike), W('pe_suspected', isPregLike), W('maternal_hypoxia', isPregLike), W('fetal_assessment', () => S.maternal_context === 'pregnant' || S.maternal_context === 'labor'), W('bleeding', isPregLike), W('spo2', isPregLike),
        W('o2_profile', isPregLike), W('hypercapnia_risk', isPregLike), W('o2_target_low', () => isPregLike() && ['institution', 'expert'].includes(S.o2_profile)), W('o2_target_high', () => isPregLike() && ['institution', 'expert'].includes(S.o2_profile)),
        W('infection', isPregLike), W('organ_dysfunction', isPregLike), W('sepsis_high_risk', isPregLike), W('sbp', isPregLike)]},
    {id: 'gK', title: "Par arteria–vena del cordón", open: true, when: isCord, hint: "La arteria y la vena se introducen con identidades separadas. La diferencia del par es una revisión de calidad; no determina el vaso ni reetiqueta las muestras.", f: ['cord_ph_art', 'cord_ph_ven', 'cord_pco2_art', 'cord_pco2_ven']},
    {id: 'gH', title: "Contexto de hipercapnia (adulto, opcional)", when: () => isAdult() && !isPregCtx() && !isCord(), hint: "Todo puede dejarse como \"desconocido\". La EPOC no se diagnostica con una gasometría; estos campos solo muestran el límite de la interpretación. En los campos de gasometría previa, introduce una gasometría conocida de fase estable; la temperatura y la unidad (mmHg) deben ser las mismas que en esta muestra.",
      f: ['copd_confirmed', 'hc_phase', 'hc_chronic_confirmed', 'prior_pco2', 'prior_hco3', 'prior_arterial', 'prior_stable', 'hc_renal', 'hc_diuretic', 'hc_alkali_vomit', 'spo2']},
    {id: 'g2', title: "Ácido–base", open: true, hint: "Usa el HCO₃ real (actual); el HCO₃ estándar y la TCO₂ de bioquímica son campos distintos. El BE/BD se introduce con su signo y su algoritmo.", f: ['ph', 'pco2', W('hco3_actual', () => !isCord()), W('hco3_standard', isAdult), 'be', 'be_type']},
    {id: 'g3', title: "Electrolitos y brecha aniónica", when: () => !isCord(), f: ['na', 'cl', 'tco2', 'k', W('albumin', isAdult), 'chem_same', W('chem_time', null, 'dt'), W('gas_hco3_for_ag', null, 'check')]},
    {id: 'g4', title: "Referencias locales", when: () => !isCord(), hint: "Introduce los valores de tu propio laboratorio. La web no rellena los campos vacíos con un valor \"normal\" por defecto; si no hay referencia, la clasificación correspondiente y el delta permanecen desactivados.", f: ['ag_ref_low', 'ag_ref_high', W('ag_reference', isAdult), W('albumin_reference', isAdult), W('hco3_reference', isAdult), 'hh_tolerance']},
    {id: 'g5', title: "Oxigenación", when: () => !isCord(), hint: "PaO₂/FiO₂, OI, A–a y CaO₂ se calculan solo en una muestra arterial. La FiO₂ debe ser el valor en el momento de la extracción; selecciona su unidad explícitamente.",
      f: ['pao2', 'fio2', 'fio2_quality', W('o2_support', isAdult), W('oxygen_device', null, 'text', true), W('normothermia', isAdult), W('barometric_mmhg', isAdult), W('baro_sealevel', isAdult, 'check'), W('hb', isAdult), W('saturation', isAdult), W('saturation_type', isAdult), W('dyshb', isAdult), 'cohb', 'methb']},
    {id: 'gO', title: "OI / OSI y soporte respiratorio", open: true, when: () => isPed() && !isCord(), hint: "El OI requiere la PO₂ arterial y la presión media de la VÍA AÉREA (no la presión arterial media). Para el OSI, la SpO₂ se introduce en porcentaje (95; no 0,95). Las tablas de PALICC-2 (pediátrica) y Montreux (neonatal) son distintas.",
      f: ['paw', 'support_concurrent', 'spo2', 'spo2_site', 'signal', 'stable', W('vent_type', isPed), W('rds_confirmed', isNeo), W('pards_confirmed', () => S.age_group === 'pediatric'), W('pards_hours', () => S.age_group === 'pediatric'),
        W('cyanotic_chd', () => S.age_group === 'pediatric'), W('baseline_imv', () => S.age_group === 'pediatric'), W('nards_confirmed', isNeo)]},
    {id: 'gR', title: "Contexto renal, TRR y orina (opcional)", when: () => !isCord(), hint: "El contexto renal es información confirmada clínicamente; no se rellena a partir de la gasometría, y \"desconocido\" no se considera ERC (CKD) ni riñón normal. Los electrolitos urinarios se introducen de la misma muestra de orina; el K que falta no se cuenta como cero. La web no genera un estadio de IRA (AKI), un subtipo de ATR, una decisión de diálisis ni una prescripción.",
      f: ['renal_context', 'krt_modality', 'k_drug_context', 'urine_na', 'urine_k', 'urine_cl', 'urine_same_sample', 'urine_ph', 'diuretic_recent', 'alkali_given', 'urine_infection']},
    {id: 'gC', title: "Calcio y citrato (RCA, opcional)", when: () => !isCord(), hint: "El cociente se calcula solo con dos valores sistémicos introducidos explícitamente en mmol/L. Si no son simultáneos, no se calcula; si se desconoce la simultaneidad, se muestra solo la aritmética y no se interpreta en el contexto del citrato. El iCa posfiltro (circuito) no entra en el cociente del paciente; no se realiza conversión de unidades. El uso de RCA se confirma por separado; no se supone RCA solo porque haya TRR.",
      f: ['total_ca', 'total_ca_site', 'ionized_ca', 'ionized_ca_site', 'ca_concurrent', 'rca_confirmed', 'calcium_need_trend']},
    {id: 'gT', title: "Toxicología y brecha osmolal (opcional)", when: () => !isCord(), hint: "La sospecha no es un diagnóstico; \"desconocido\" no significa que no haya exposición. La evaluación clínica/toxicológica no espera a que se complete este formulario. Para la OG, la glucosa (con su unidad) se toma de la sección de Cetoacidosis diabética; si el etanol no se midió, déjalo en blanco (no se cuenta como 0). Introduce solo uno de BUN o urea. La web no genera \"OG normal\", \"excluido\", ni decisiones de antídoto o diálisis.",
      f: ['tox_suspicion', 'tox_agent', 'tox_acute_chronic', 'tox_antidote', 'clinical_worsening', 'measured_osmolality', 'bun', 'urea', 'ethanol', 'osm_concurrent', 'og_profile', 'salicylate_value', 'lactate_method_a', 'lactate_method_b', 'lactate_methods_concurrent', 'organic_acid_context', 'acetone']},
    {id: 'g6', title: "Lactato", when: () => !isCord(), hint: "Para la medición seriada, añade cada valor con su hora.", f: [W('lactate_series', null, 'series')]},
    {id: 'g7', title: "Cetoacidosis diabética", when: () => !isNeo() && !isCord(), hint: "La tarjeta de CAD es independiente de la clasificación ácido–base; también funciona con una muestra venosa. En niños se usa el perfil ISPAD 2022; las cetonas que faltan no se consideran negativas.",
      f: ['glucose', 'beta_hydroxybutyrate', 'urine_ketones', W('diabetes_history', () => isAdult() && !isPregCtx()), W('diabetes_type', isPregCtx), W('feels_unwell', isPregCtx), W('poor_intake', isPregCtx), W('vomiting', isPregCtx), W('pump_issue', isPregCtx), W('steroid', isPregCtx),
        W('dka_confirmed', () => S.age_group === 'pediatric'), W('dka_followup', () => isAdult() && !isPregCtx(), 'check')]},
    {id: 'gQ', title: "Calidad de la muestra y de la medición", hint: "La información desconocida no se considera \"adecuada\"; se lista como información de calidad faltante. La web no asigna puntuación, no rechaza la muestra automáticamente ni corrige valores. Para el tiempo de análisis, introduce el protocolo aprobado por tu institución; no se aplica un tiempo universal.",
      f: ['q_bubble', 'q_heparin', 'q_clot', 'q_hemolysis', 'q_catheter', W('q_flush', () => S.q_catheter === 'yes'), 'q_transport', 'q_storage', 'protocol_minutes', W('cord_clamp_time', isCord, 'dt'), 'q_device_error', 'q_manual', 'q_hydroxocobalamin', 'q_leukocytosis']},
    {id: 'g8', title: "Contexto clínico", hint: "No introduzcas nombre, número de identificación ni número de historia. Estos campos no entran en los cálculos y no se envían a ninguna parte.", f: [W('clinical_context', null, 'textarea', true), W('support_change_time', null, 'dt')]}
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
    if (kind === 'series') return `<div class="lac" id="lac">${(S.lactate_series || []).map((e, i) => `<div class="lac-row"><div class="fld"><label for="lac-v${i}">Lactato ${i + 1} (mmol/L)</label><input id="lac-v${i}" inputmode="decimal" data-lac="${i}" data-k="value" value="${esc(e.value)}"></div><div class="fld"><label for="lac-t${i}">Hora</label><input id="lac-t${i}" type="time" data-lac="${i}" data-k="time" value="${esc(e.time)}"></div><button type="button" data-lacdel="${i}" aria-label="Lactato ${i + 1} – eliminar" title="Eliminar">×</button></div>`).join('')}<button type="button" class="btn ghost sm" data-lacadd>+ Añadir valor de lactato</button></div>`;
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
        if (id === 'fio2' && isPed()) opts.unshift(['', "¿unidad?"]);
        if (S[ukey + '_unit'] == null) S[ukey + '_unit'] = opts[0][0];
        ctl += `<select class="unit" data-f="${ukey}_unit" aria-label="${esc(LBL[id])} – unidad">${opts.map(([v, l]) => `<option value="${v}"${S[ukey + '_unit'] === v ? " selected" : ''}>${esc(l)}</option>`).join('')}</select>`;
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
        <select class="case-pick" id="casePick" aria-label="Cargar caso sintético"><option value="">Cargar caso sintético…</option><optgroup label="Casos de adultos">${caseOpts}</optgroup><optgroup label="Casos de hipercapnia (ronda 7)">${C.koah.cases.filter(k => k.mode === 'eval').map(k => `<option value="${k.id}">${k.id} · ${esc(k.baslik)}</option>`).join('')}</optgroup>${Object.keys(R8G).map(g => `<optgroup label="${esc(R8G[g])}">${C.r810.cases.filter(k => k.grup === g && k.mode === 'eval').map(k => `<option value="${k.id}">${k.id} · ${esc(k.baslik)}</option>`).join('')}</optgroup>`).join('')}<optgroup label="Ejemplos pediátricos y neonatales">${PED_DEMOS.filter(d => !d.g).map(d => `<option value="${d.id}">${d.id} · ${esc(d.title)}</option>`).join('')}</optgroup><optgroup label="Ejemplos de embarazo">${PED_DEMOS.filter(d => d.g).map(d => `<option value="${d.id}">${d.id} · ${esc(d.title)}</option>`).join('')}</optgroup></select>
        <button type="button" class="btn ghost sm" id="clearForm">Borrar</button>
      </div>
      ${GROUPS.filter(g => !g.when || g.when()).map((g, i) => `<details class="fs" data-g="${g.id}"${g.open || openGroups.has(g.id) ? " open" : ''}><summary><span class="n">${i + 1}</span>${esc(g.title)}<span class="cnt">${groupCount(g) || ''}</span></summary><div class="body">${groupBody(g)}</div></details>`).join('')}`;
  }
  const openGroups = new Set();
  /* Pediatri/yenidoğan örnek girişleri: ikinci tur senaryolarından türetilmiş sentetik veriler (tam hasta olgusu değildir) */
  const PED_DEMOS = [
    {id: 'P-C02', title: "Niño, ventilación invasiva: OI y PALICC-2", v: {age_group: 'pediatric', care_context: 'picu', sample_type: 'arterial', fio2: '0,8', fio2_unit: 'fraction', paw: '12', pao2: '60', vent_type: 'invasive', pards_confirmed: 'yes', pards_hours: '4', support_concurrent: 'yes'}},
    {id: 'P-C05', title: "Niño: OSI y techo de SpO₂", v: {age_group: 'pediatric', care_context: 'picu', sample_type: 'peripheral_venous', fio2: '0,6', fio2_unit: 'fraction', paw: '12', spo2: '98', signal: 'good', stable: 'yes', vent_type: 'invasive'}},
    {id: 'P-C09', title: "Neonato: umbral moderado de Montreux", v: {age_group: 'neonatal', care_context: 'nicu', sample_type: 'arterial', fio2: '0,5', fio2_unit: 'fraction', paw: '8', pao2: '50', nards_confirmed: 'yes', ga_weeks: '34', ga_days: '2', postnatal_days: '3'}},
    {id: 'P-C15', title: "CAD pediátrica: discordancia de gravedad entre pH y HCO₃", v: {age_group: 'pediatric', sample_type: 'peripheral_venous', ph: '7,2', tco2: '4,9', glucose: '25', glucose_unit: 'mmol/L', beta_hydroxybutyrate: '5', dka_confirmed: 'yes'}},
    {id: 'P-C17', title: "Niño: posibilidad euglucémica", v: {age_group: 'pediatric', sample_type: 'peripheral_venous', ph: '7,2', glucose: '10', glucose_unit: 'mmol/L', beta_hydroxybutyrate: '4'}},
    {id: 'P-C19', title: "Neonato: edad posmenstrual", v: {age_group: 'neonatal', care_context: 'nicu', sample_type: 'capillary', ga_weeks: '30', ga_days: '4', postnatal_days: '14'}},
    {id: 'P-C20', title: "Par de cordón sospechoso", v: {age_group: 'neonatal', sample_type: 'cord_artery', cord_ph_art: '7,2', cord_ph_ven: '7,215', cord_pco2_art: '7', cord_pco2_ven: '6', cord_pco2_unit: 'kPa'}},
    {id: 'P-C22', title: "Alteración neurológica a las 35 semanas", v: {age_group: 'neonatal', care_context: 'nicu', sample_type: 'arterial', ga_weeks: '35', ga_days: '0', neuro: 'yes', perinatal_event: 'yes'}},
    {id: 'G-C01', title: "Embarazada: patrón similar a la adaptación fisiológica", g: 1, v: {age_group: 'adult', maternal_context: 'pregnant', sample_owner: 'mother', sample_type: 'arterial', temperature_reporting: '37C_uncorrected', ph: '7,44', pco2: '30', hco3_actual: '19,69', ga_weeks: '32', ga_days: '0'}},
    {id: 'G-C02', title: "Embarazada: PaCO₂ 40 con disnea", g: 1, v: {age_group: 'adult', maternal_context: 'pregnant', sample_owner: 'mother', sample_type: 'arterial', ph: '7,4', pco2: '40', hco3_actual: '24', resp_symptoms: 'yes', o2_profile: 'bts', hypercapnia_risk: 'no', spo2: '93'}},
    {id: 'G-C05', title: "Embarazada: sospecha de cetoacidosis euglucémica", g: 1, v: {age_group: 'adult', maternal_context: 'pregnant', sample_owner: 'mother', sample_type: 'peripheral_venous', ph: '7,22', tco2: '10', glucose: '8', glucose_unit: 'mmol/L', beta_hydroxybutyrate: '4', diabetes_type: 't1'}},
    {id: 'G-C11', title: "Embarazada: rama de alto riesgo de NICE", g: 1, v: {age_group: 'adult', maternal_context: 'pregnant', sample_owner: 'mother', sample_type: 'arterial', lactate_series: [{value: '4,01', time: ''}], infection: 'yes', sepsis_high_risk: 'yes', sbp: '100'}},
    {id: 'G-C14', title: "Madre bien oxigenada, preocupación fetal", g: 1, v: {age_group: 'adult', maternal_context: 'labor', sample_owner: 'mother', sample_type: 'arterial', spo2: '98', maternal_hypoxia: 'no', fetal_assessment: 'concern', labor_stage: '1'}},
    {id: 'P-R17', title: "Sala de partos: objetivo de SpO₂ en el minuto 3", v: {age_group: 'neonatal', care_context: 'delivery', sample_type: 'unknown', postnatal_minutes: '3', spo2: '72', spo2_site: 'right_hand'}}
  ];

  /* ================= Sonuç ================= */
  const ORDER = ['quality', 'sample', 'cord', 'cordpair', 'hie', 'hh', 'ph', 'proc', 'hcap', 'ag', 'agk', 'agc', 'delta', 'tox', 'og', 'salicylate', 'lacgap', 'renal', 'uag', 'urine', 'caratio', 'pf', 'aa', 'cao2', 'oi', 'osi', 'pards', 'nards', 'rds', 'delivery', 'preg', 'co2rel', 'o2target', 'fetal', 'pe', 'o2delivery', 'sepsis', 'dyshb', 'lactate', 'dka', 'dkares', 'base', 'age'];
  const MCTX = Object.fromEntries(OPT.maternal_context);
  const AGE = {adult: "adulto", pediatric: "niño", neonatal: "neonato"};
  const SEV = {mild: 'hafif', moderate: 'orta', severe: "grave", not_severe: "por debajo del umbral de grave"};
  const BETYPE = Object.fromEntries(OPT.be_type);
  const SAMPLE = Object.fromEntries(OPT.sample_type);
  const stChip = s => `<span class="st ${s}">${esc(t('status.' + s))}</span>`;
  // Genel ürün kapsamı ayrıntıda; klinik uyarılar ve uygulanabilirlik koşulları görünür kalır.
  const SCOPE_NOTES = new Set(['hc_no_treatment', 'renal_no_treatment', 'tox_no_treatment', 'no_fluid_order']);
  const msgs = list => {
    if (!list || !list.length) return '';
    const render = items => items.length ? `<ul class="msgs">${items.map(m => `<li>${esc(t('m.' + m))}</li>`).join('')}</ul>` : '';
    const scope = list.filter(m => SCOPE_NOTES.has(m));
    return render(list.filter(m => !SCOPE_NOTES.has(m))) + (scope.length ? `<details class="small"><summary>Notas de alcance</summary>${render(scope)}</details>` : '');
  };
  const needs = list => list && list.length ? `<p class="need">Necesario: ${list.map(f => esc(LBL[f] || f)).join(' · ')}</p>` : '';
  function calc(fid, lines) {
    const F = FORM[fid] || R8FORM[fid];
    return `<details class="calc"><summary>Ver cálculo · ${esc(F.ad)}</summary><div class="f"><b>${esc(fid)}</b>: ${esc(F.ifade)}\n${lines.map(esc).join('\n')}</div>
      <p class="small"><b>Condición:</b> ${esc(F.uygulama_kosullari)}. <b>Límite:</b> ${esc(F.sinirlamalar)} ${cite(F.kaynak_ids)}</p></details>`;
  }
  const card = (m, title, body) => `<section class="card ${m.status}" id="mod-${m.id}"><div class="card-h"><h3>${esc(title || t('mod.' + m.id))}</h3>${stChip(m.status)}</div>${body}${m.src && m.src.length ? `<p class="srcs">Fuente: ${cite(m.src)}</p>` : ''}</section>`;

  function hypHTML(h, R) {
    const n = R.n;
    const why = tf('h.why.' + h.id, {h: n1(n.hco3_actual), p: n1(n.pco2)});
    let body = '';
    if (h.id === 'met_acid' || h.id === 'met_alk') {
      const key = h.pos === 'within' ? 'h.met.within' : `h.met.${h.pos}.${h.id}`;
      body = `<p>${esc(tf(key, {m: n1(h.measured), lo: n1(h.exp.lo), hi: n1(h.exp.hi)}))}</p>` + KGC.range({lo: h.exp.lo, hi: h.exp.hi, center: h.exp.center, measured: h.measured, unit: 'mmHg', title: "Intervalo esperado de PaCO₂"}) +
        calc(h.formula, [`= ${h.formula === 'winter' ? '1,5' : '0,7'} × ${n1(n.hco3_actual)} + ${h.formula === 'winter' ? 8 : 20} = ${n2(h.exp.center)} mmHg`, `intervalo ${n2(h.exp.lo)}–${n2(h.exp.hi)} mmHg (límites incluidos) · medida ${n1(h.measured)} mmHg`]);
    } else {
      body = `<p>${esc(tf('h.resp.est', {a: n2(h.acute), c: n2(h.chronic), m: n1(h.measured)}))}</p><p>${esc(h.pos === 'between' ? (h.nearer === 'equal' ? t('h.resp.equidistant') : tf('h.resp.between', {near: t('h.near.' + h.nearer)})) : t('h.resp.' + h.pos))} ${esc(t('h.resp.chronicity'))}</p>` +
        KGC.points({acute: h.acute, chronic: h.chronic, measured: h.measured, unit: 'mmol/L'}) +
        calc(h.formula[0], [`aguda: 24 ${h.id === 'resp_acid' ? '+ 0,1 × (' + n1(n.pco2) + ' − 40)' : '− 0,2 × (40 − ' + n1(n.pco2) + ')'} = ${n2(h.acute)} mmol/L`]) +
        calc(h.formula[1], [`crónica: 24 ${h.id === 'resp_acid' ? '+ 0,35 × (' + n1(n.pco2) + ' − 40)' : '− 0,41 × (40 − ' + n1(n.pco2) + ')'} = ${n2(h.chronic)} mmol/L`]);
    }
    return `<div class="hyp"><h4>${esc(t('h.' + h.id))}</h4><p class="why">${esc(why)}</p><p class="al">${esc(t('h.align.' + h.align))}</p>${body}<p class="srcs small">Fuente: ${cite(h.src)}</p></div>`;
  }

  function moduleHTML(m, R) {
    const n = R.n;
    switch (m.id) {
      case 'quality': {
        const rows = [["Muestra", SAMPLE[m.sample]], ...(R.scope === 'adult' ? [["Contexto de embarazo", n.maternal_context === 'unknown' ? "desconocido (referencia de adulto no embarazada)" : MCTX[n.maternal_context]], ...(n.pregnancy === 'yes' ? [["Titular de la muestra", OPT.sample_owner.find(o => o[0] === n.sample_owner)[1]]] : [])] : [["Grupo de edad", AGE[n.age_group]]]),
          ["Informe de temperatura", (OPT.temperature_reporting.find(o => o[0] === m.temp) || [])[1]], ["Hora de la muestra / del análisis", [m.times.sample, m.times.analysis].map(x => x || '–').join(' / ')],
          ["Unidad de presión", `PCO₂ ${m.units.pco2}, PO₂ ${m.units.pao2}${m.units.pco2 === 'kPa' || m.units.pao2 === 'kPa' ? " (para el cálculo, mmHg = kPa / 0,1333224)" : ''}`]];
        return card(m, null, `<dl class="kv">${rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>${msgs(m.msgs)}${R.errors.length ? `<ul class="msgs">${R.errors.map(e => `<li><b>${esc(LBL[e.field] || e.field)}</b>: ${esc(t('err.' + e.code))}</li>`).join('')}</ul>` : ''}`);
      }
      case 'hh':
        if (m.status === 'veri_eksik' || m.status === 'uygulanamaz') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n2(m.calc))}<small>pH calculado con HH</small></p><p>pH introducido ${esc(num(n.ph, 3))} · diferencia ${esc(Math.abs(m.diff) < 0.0005 ? '0,000' : (m.diff > 0 ? '+' : '−') + num(Math.abs(m.diff), 3))}</p>${msgs(m.msgs)}` +
          calc('hh-ph', [`= 6,1 + log10(${n1(n.hco3_actual)} / (0,03 × ${n1(n.pco2)})) = ${num(m.calc, 3)}`, `intervalo posible con margen de redondeo: ${num(m.range[0], 3)}–${num(m.range[1], 3)}${m.tol != null ? ` · tolerancia del laboratorio ±${num(m.tol, 3)}` : " · tolerancia del laboratorio no definida"}`, "El intervalo abarca el margen de redondeo de los dígitos introducidos y dos juegos de constantes: la fórmula del atlas (pK 6,1; 0,03) y las constantes de la IFCC que usan los gasómetros (pK 6,095; 0,0307 mmol/L/mmHg; HCO₃ = 0,0307 × PCO₂ × 10^(pH − 6,095)). Es una decisión de producto; no es una tolerancia clínica."]));
      case 'ph':
        if (m.local) return card(m, null, `<p class="big">${esc(num(m.value, 3))}<small>${esc({below: "por debajo de la referencia local", within: "dentro del intervalo de referencia local", above: "por encima de la referencia local"}[m.cls])} (${esc(num(m.ref[0], 2))}–${esc(num(m.ref[1], 2))})</small></p>${m.pco2Cls ? `<p>PCO₂ ${esc(n1(n.pco2))} mmHg: ${esc({below: "por debajo de la referencia local", within: "dentro del intervalo de referencia local", above: "por encima de la referencia local"}[m.pco2Cls])} (${esc(num(m.pco2Ref[0], 0))}–${esc(num(m.pco2Ref[1], 0))})</p>` : ''}${m.refSrc ? `<p class="small">Referencia: ${esc(m.refSrc)}</p>` : ''}${msgs(m.msgs)}`);
        if (!m.dir) return card(m, null, (m.value != null ? `<p class="big">${esc(num(m.value, 3))}</p>` : '') + needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(num(m.value, 3))}<small>${esc({acidemia: 'asidemi', alkalemia: 'alkalemi', within: "dentro del intervalo de referencia"}[m.dir])}</small></p><p class="small">Referencia educativa arterial del adulto: pH 7,35–7,45. La dirección del pH es una observación; los procesos ácido–base son hipótesis separadas.</p>${msgs(m.msgs)}` +
          (has(n.pco2) ? KGC.map([{ph: m.value, pco2: n.pco2, label: "esta muestra"}]) : ''));
      case 'proc':
        if (!m.hyps) return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, msgs(m.msgs) + m.hyps.map(h => hypHTML(h, R)).join(''));
      case 'ag': {
        if (m.status === 'veri_eksik') return card(m, null, needs(m.need));
        const cls = m.cls ? tf('ag.cls.' + m.cls, {lo: num(m.interval[0], 0), hi: num(m.interval[1], 0)}) : m.vsRef ? tf('ag.vs.' + m.vsRef, {r: num(n.ag_reference, 0)}) : '';
        const bic = m.method === 'tco2' ? n.tco2 : n.hco3_actual;
        return card(m, null, `<p class="big">${esc(n1(m.value))}<small>mmol/L · ${m.method === 'tco2' ? "con TCO₂" : "con HCO₃ de la gasometría"}</small></p>${cls ? `<p><b>${esc(cls)}</b></p>` : ''}${msgs(m.msgs)}` +
          calc('anion-gap', [`= ${n1(n.na)} − ${n1(n.cl)} − ${n1(bic)} = ${n1(m.value)} mmol/L`, "No se incluyó el potasio."]));
      }
      case 'agc':
        if (m.status !== 'hesaplandi') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n1(m.value))}<small>mmol/L</small></p>${KGC.ag({measured: m.measured, corrected: m.value, ref: n.ag_reference, interval: has(n.ag_ref_low) && has(n.ag_ref_high) ? [n.ag_ref_low, n.ag_ref_high] : null})}${msgs(m.msgs)}` +
          calc('ag-albumin', [`= ${n1(m.measured)} + 2,5 × (${n1(m.albRef)} − ${n2(m.albumin)}) = ${n1(m.value)} mmol/L`, "La albúmina se usó en g/dL (si se introdujo en g/L, se dividió entre 10)."]));
      case 'delta':
        if (m.status === 'veri_eksik') return card(m, null, needs(m.need) + msgs(m.msgs));
        if (m.status === 'uygulanamaz') return card(m, null, `<ul class="msgs">${m.msgs.map(c => `<li>${esc(tf('m.' + c, {ag: n1(m.agUse), r: num(m.agRef, 0)}))}</li>`).join('')}</ul>`);
        return card(m, null, `<p class="big">${esc((m.gap > 0 ? '+' : '') + n1(m.gap))}<small>delta gap, mmol/L</small></p><p>Cociente delta: <b>${m.ratio == null ? "no calculado" : esc(n2(m.ratio))}</b> (${esc(n1(m.num))} / ${esc(n1(m.den))})</p>${msgs(m.msgs)}` +
          calc('delta-gap', [`= (${n1(m.agUse)} − ${n1(m.agRef)}) − (${n1(m.hco3Ref)} − ${n1(m.tco2)}) = ${n1(m.gap)}`, `AG ${m.corrected ? "corregida por albúmina" : "medida (sin corrección)"} · las referencias son datos del usuario`]) +
          (m.ratio != null ? calc('delta-ratio', [`= (${n1(m.agUse)} − ${n1(m.agRef)}) / (${n1(m.hco3Ref)} − ${n1(m.tco2)}) = ${n2(m.ratio)}`, "Con un denominador pequeño el cociente es inestable."]) : ''));
      case 'pf':
        if (m.status !== 'hesaplandi') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(num(m.value, 0))}<small>mmHg</small>${m.approx ? "<span class=\"approx\">aproximado</span>" : ''}</p>${msgs(m.msgs)}` +
          calc('pf', [`= ${n1(m.pao2)} / ${n2(m.fio2)} = ${num(m.value, 0)} mmHg`, "La FiO₂ se usó como fracción."]));
      case 'aa':
        if (m.status !== 'hesaplandi') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n1(m.value))}<small>mmHg</small></p>${msgs(m.msgs)}${m.sealevel ? "<p class=\"small\">Presión barométrica: el supuesto de nivel del mar (760 mmHg) fue seleccionado por el usuario.</p>" : ''}` +
          calc('aa-roomair', [`= 0,21 × (${num(m.baro, 0)} − 47) − ${n1(n.pco2)} / 0,8 − ${n1(n.pao2)} = ${n1(m.value)} mmHg`]));
      case 'cao2':
        if (m.status !== 'hesaplandi') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n1(m.value))}<small>mL O₂/dL</small></p><p class="small">Tipo de saturación: ${esc(OPT.saturation_type.find(o => o[0] === m.satType)[1])}</p>` +
          calc('cao2', [`= 1,34 × ${n1(m.hb)} × ${n2(m.sat)} + 0,0031 × ${n1(n.pao2)} = ${num(m.value, 2)} mL/dL`]));
      case 'dyshb':
        return card(m, null, `${has(m.cohb) ? `<p>COHb: <b>${esc(n1(m.cohb))} %</b></p>` : ''}${has(m.methb) ? `<p>MetHb: <b>${esc(n1(m.methb))} %</b></p>` : ''}${msgs(m.msgs)}<p class="small">Evalúa con la referencia local y los antecedentes clínicos de exposición; esta web no tiene umbrales ni clasificación de gravedad.</p>`);
      case 'lactate':
        if (m.status === 'veri_eksik') return card(m, null, needs(m.need));
        return card(m, null, (m.change != null ? `<p class="big">${esc((m.change > 0 ? '−' : m.change < 0 ? '+' : '') + n1(Math.abs(m.change)))}<small>% (primer → último valor)</small></p>` : '') + KGC.lactate(m.series) + msgs(m.msgs) +
          (m.change != null ? calc('lactate-change', [`= 100 × (${n1(m.series[0].v)} − ${n1(m.series[m.series.length - 1].v)}) / ${n1(m.series[0].v)} = ${n1(m.change)} %`, "Un resultado positivo significa descenso; uno negativo, aumento."]) : ''));
      case 'dka': if (!m.comp) return card(m, null, needs(m.need) + msgs(m.msgs)); if (m.ped) return pedDkaHTML(m, R); if (m.preg) return pregDkaHTML(m, R);
      {
        const S3 = {yes: "cumplido", no: "no cumplido", missing: "faltan datos"};
        const sub = (v, l) => `${esc(l)}: ${v === true ? "cumplido" : v === false ? "no cumplido" : "sin datos"}`;
        const c = m.comp, glu = n.glucose_unit === 'mmol/L' ? "≥11,1 mmol/L" : "≥200 mg/dL";
        const rows = [
          ["Antecedente de diabetes o hiperglucemia", c.diabetes.state, [sub(c.diabetes.dm, "antecedente de diabetes"), sub(c.diabetes.glucose, "glucosa " + glu)]],
          ["Criterio de cetonas", c.ketosis.state, [sub(c.ketosis.bhb, "β-hidroxibutirato ≥3,0 mmol/L"), sub(c.ketosis.uk, "cetonas en orina ≥2+")]],
          ["Acidosis", c.acidosis.state, [sub(c.acidosis.ph, 'pH <7,3'), sub(c.acidosis.bic, (c.acidosis.bicSrc === 'gas_hco3' ? "HCO₃ de la gasometría" : "HCO₃ (TCO₂)") + ' <18 mmol/L')]]
        ];
        return card(m, null, `<div class="tbl"><table><thead><tr><th>Componente</th><th>Estado</th><th>Subcriterios</th></tr></thead><tbody>${rows.map(([k, s, subs]) => `<tr><td>${esc(k)}</td><td><b>${esc(S3[s])}</b></td><td class="small">${subs.join('<br>')}</td></tr>`).join('')}</tbody></table></div>
          <p>Componentes cumplidos numéricamente: <b>${m.met} / 3</b></p>${msgs(m.msgs)}`);
      }
      case 'dkares': {
        const yn = v => v === true ? "cumplido" : v === false ? "no cumplido" : "sin datos";
        return card(m, null, `<ul class="msgs"><li>Cetonas plasmáticas (β-hidroxibutirato) &lt;0,6 mmol/L: <b>${yn(m.ket)}</b></li><li>${m.phVenous ? "Venoso " : ''}pH ≥7,3: <b>${yn(m.phr)}</b>${m.phVenous ? '' : " (el criterio se define con el pH venoso)"} · o HCO₃ ≥18 mmol/L: <b>${yn(m.br)}</b></li><li>Glucosa idealmente &lt;200 mg/dL: <b>${m.glucoseBelow == null ? "sin datos" : m.glucoseBelow ? 'evet' : "no"}</b></li></ul>
          <p>Criterios de resolución (componente de cetonas <b>y</b> de acidosis): <b>${{yes: "cumplido numéricamente", no: "no cumplido", missing: "faltan datos"}[m.all]}</b></p>${msgs(m.msgs)}`);
      }
      case 'preg': {
        const P = {below: "por debajo", within: "dentro", above: "por encima"};
        const cell = (rng, c, d) => rng ? `${num(rng[0], d)}–${num(rng[1], d)}${c ? ` <span class="muted">(${P[c]})</span>` : ''}` : '–';
        const tbl = m.rows ? `<div class="tbl"><table><thead><tr><th>Revisión</th><th>pH</th><th>PaCO₂ (mmHg)</th><th>HCO₃ (mmol/L)</th></tr></thead><tbody>${m.rows.map(r => `<tr><td>${cite([r.src])}</td><td>${cell(r.ph, r.cph, 2)}</td><td>${cell(r.pco2, r.cpco2, 0)}</td><td>${cell(r.hco3, r.chco3, 0)}</td></tr>`).join('')}</tbody></table></div><p class="small muted">Entre paréntesis: posición del valor introducido respecto al intervalo de esa revisión. Tipo de dato: fisiología de revisión; no es una etiqueta automática de normalidad.</p>` : '';
        return card(m, null, msgs(m.msgs) + tbl);
      }
      case 'co2rel': return card(m, null, `<p class="big">${esc(n1(m.pco2))}<small>mmHg PaCO₂</small></p>${msgs(m.msgs)}`);
      case 'o2target': {
        const KIND = {kilavuz: "Recomendación de guía", ozel_kilavuz: "Guía, contexto específico", derleme: "Objetivo de revisión", gorus: "Opinión clínica"};
        const COND = {bts_general: "la mayoría de las embarazadas con enfermedad aguda", bts_hypercapnic: "riesgo de insuficiencia hipercápnica", covid: "COVID-19, paciente seleccionada, estado fetal tranquilizador"};
        const sel = m.target ? `<p>Perfil seleccionado: <b>${esc(OPT.o2_profile.find(o => o[0] === m.profile)[1])}</b> · SpO₂ objetivo <b>${pct(m.target[0], m.target[1])}</b>${m.pos ? ` · medido ${pct(esc(n1(m.spo2)))}: <b>${{below: "por debajo del objetivo", within: "dentro del intervalo objetivo", above: "por encima del objetivo"}[m.pos]}</b>` : ''}</p>` : "<p><b>No se seleccionó objetivo.</b></p>";
        return card(m, null, sel + msgs(m.msgs) + `<div class="tbl"><table><thead><tr><th>Fuente</th><th>Tipo de dato</th><th>Objetivo</th><th>Contexto</th></tr></thead><tbody>${m.sources.map(x => `<tr><td>${cite([x.src])}</td><td>${esc(KIND[x.kind])}</td><td>${x.spo2 ? `SpO₂ ${pct(x.spo2[0], x.spo2[1])}` : esc(x.text)}</td><td class="small">${esc(COND[x.cond] || "no es un umbral único validado para todas las embarazadas")}</td></tr>`).join('')}</tbody></table></div><p class="small muted">Las fuentes no tienen el mismo nivel de evidencia; no se promedian ni se convierten en un intervalo combinado.</p>`);
      }
      case 'fetal': case 'pe': case 'o2delivery': return card(m, null, msgs(m.msgs));
      case 'sepsis':
        return card(m, null, `${m.branch ? `<p>Rama de alto riesgo de NICE (lactato &gt;4 mmol/L o presión sistólica ≤90 mmHg): <b>${{met: "cumplido", not_met: "no cumplido", missing: "faltan datos"}[m.branch]}</b>${m.lac != null ? ` · lactato ${esc(n1(m.lac))}` : ''}${m.sbp != null ? ` · sistólica ${esc(num(m.sbp, 0))}` : ''}</p>` : ''}${msgs(m.msgs)}`);
      case 'sample': {
        const PRM = {po2: 'PO₂', pco2: 'PCO₂', ph: 'pH', hco3: 'HCO₃', lytes: 'elektrolitler', glucose: 'glukoz', sat: "saturación/cooximetría", thb: 'tHb', lactate: 'laktat', be: 'BE'};
        const li = w => `<li>${esc(t('qw.' + w.code))}${w.params.length ? ` <span class="small muted">· puede verse afectado: ${w.params.map(p => PRM[p]).join(', ')}</span>` : ''} <span class="small muted">· campo desencadenante: ${esc(LBL[w.field] || w.field)}</span> ${cite(w.src)}</li>`;
        const mm = v => v == null ? '–' : num(v, 0) + " min";
        const times = `<dl class="kv"><dt>Muestra → análisis</dt><dd>${mm(m.delay)}${m.protocol != null ? ` · protocolo institucional ${num(m.protocol, 0)} min` : " · protocolo institucional no introducido"}</dd>${m.supportMin != null && m.supportMin >= 0 ? `<dt>Último cambio de soporte → muestra</dt><dd>${mm(m.supportMin)}</dd>` : ''}${m.cord ? `<dt>Nacimiento → pinzamiento</dt><dd>${mm(m.cord.birthToClamp)}</dd><dt>Pinzamiento → muestra</dt><dd>${mm(m.cord.clampToSample)}</dd>` : ''}</dl>`;
        const notes = [m.protocol == null && m.delay != null ? `<li>Las fuentes indican tiempos distintos (p. ej., AARC 2013, ANZSRS 2024, AARC 2022 capilar); esta web no aplica un tiempo universal, y la ausencia de protocolo no significa "adecuada". ${cite([1, 21, 59, 70])}</li>` : '',
          m.supportMin != null && m.supportMin >= 0 ? `<li>La recomendación nacional croata recomienda esperar 20–30 minutos tras un cambio de ventilación para alcanzar el estado estable; en una urgencia, la gasometría se extrae de inmediato. Una muestra temprana puede reflejar el periodo de transición; no se considera "alterada". ${cite([58])}</li>` : '',
          m.cord ? `<li>El retraso en el cordón puede afectar especialmente al lactato y al exceso de base; los valores del momento del nacimiento no se recalculan retrospectivamente. ${cite([76])}</li>` : ''].join('');
        return card(m, null, times + (notes ? `<ul class="msgs">${notes}</ul>` : '') +
          `<h4 style="margin-top:6px">Error conocido (${m.known.length})</h4>${m.known.length ? `<ul class="msgs">${m.known.map(li).join('')}</ul>` : "<p class=\"small\">No hay ningún error conocido de la muestra en la información introducida. Esto no significa que la muestra sea adecuada.</p>"}
          <h4 style="margin-top:6px">Efecto posible (${m.possible.length})</h4>${m.possible.length ? `<ul class="msgs">${m.possible.map(li).join('')}</ul>` : '<p class="small">–</p>'}
          <h4 style="margin-top:6px">Información de calidad faltante (${m.unknown.length})</h4>${m.unknown.length ? `<p class="small">${m.unknown.map(f => esc(LBL[f] || f)).join(' · ')}</p>` : '<p class="small">–</p>'}` + msgs(m.msgs));
      }
      case 'base':
        return card(m, null, `<p class="big">${esc((m.value > 0 ? '+' : '') + n1(m.value))}<small>mmol/L · ${esc(BETYPE[m.type])}</small></p>${msgs(m.msgs)}`);
      case 'age':
        if (m.status !== 'hesaplandi') return card(m, null, (m.ga ? `<p>Gestación al nacer: <b>${m.ga[0]} semanas ${m.ga[1]} días</b></p>` : '') + needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${m.pmaW} semanas ${m.pmaD} días<small>edad posmenstrual</small></p><p>Gestación al nacer ${m.ga[0]} semanas ${m.ga[1]} días${m.gaDaysGiven ? '' : " (días no introducidos, se tomó 0)"} + posnatal ${m.pnd} días completos</p>${msgs(m.msgs)}` +
          calc('P-F03', [`= 7 × ${m.ga[0]} + ${m.ga[1]} + ${m.pnd} = ${m.pma} días = ${m.pmaW} semanas ${m.pmaD} días`]));
      case 'oi':
        if (m.status === 'veri_eksik' || m.status === 'uygulanamaz') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n1(m.value))}</p>${msgs(m.msgs)}` + calc('P-F01', [`= 100 × ${n2(m.fio2)} × ${n1(m.paw)} cmH₂O / ${n1(m.pao2)} mmHg = ${n1(m.value)}`, "FiO₂ en fracción; presión media de vía aérea en cmH₂O; PaO₂ en mmHg."]));
      case 'osi':
        if (m.status === 'veri_eksik') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n1(m.value))}<small>${m.classifiable ? "Medición apta para la clasificación PALICC-2" : "solo aritmético; clasificación detenida"}</small></p>${msgs(m.msgs)}` + calc('P-F02', [`= 100 × ${n2(n.fio2)} × ${n1(n.paw)} / ${n1(m.spo2)} = ${n1(m.value)}`, "La SpO₂ se usa en porcentaje (p. ej., 90)."]));
      case 'pards': {
        if (m.status === 'veri_eksik' && !m.crit) return card(m, null, needs(m.need) + msgs(m.msgs));
        if (m.status === 'uygulanamaz') return card(m, null, msgs(m.msgs));
        const crit = {met: "cumplido", not_met: "no cumplido", missing: "no se pudo evaluar", unverified: "validez de la medición no confirmada"}[m.crit];
        return card(m, null, `<p>Criterio de oxigenación (OI ≥4 u OSI ≥5): <b>${crit}</b>${m.basis ? ` · base ${m.basis.toUpperCase()}` : ''}</p>
          <p>Gravedad (≥4 horas desde el diagnóstico; OI ≥16 u OSI ≥12 grave): <b>${m.sev ? esc(SEV[m.sev]) : "no se asignó etiqueta"}</b></p>${msgs(m.msgs)}<p class="small muted">Perfil: PALICC-2 2023, ventilación invasiva. La tabla NARDS de Montreux es distinta.</p>`);
      }
      case 'nards':
        if (m.status === 'veri_eksik') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p>OI ${esc(n1(m.oi))} · Gravedad de la oxigenación según Montreux: <b>${m.sev ? esc(SEV[m.sev]) : "no se asignó etiqueta"}</b></p>${msgs(m.msgs)}`);
      case 'hcap': {
        const b = m.base, sg = v => (v > 0 ? '+' : '') + n1(v);
        const tb = b ? `<div class="tbl"><table><thead><tr><th></th><th>Gasometría previa (introducida)</th><th>Esta muestra</th><th>Diferencia</th></tr></thead><tbody><tr><td>PCO₂ (mmHg)</td><td>${esc(n1(b.pco2))}</td><td>${esc(n1(m.pco2))}</td><td>${esc(sg(b.dpco2))}</td></tr><tr><td>HCO₃ (mmol/L)</td><td>${esc(n1(b.hco3))}</td><td>${b.dhco3 == null ? '–' : esc(n1(b.hco3 + b.dhco3))}</td><td>${b.dhco3 == null ? '–' : esc(sg(b.dhco3))}</td></tr></tbody></table></div>` : '';
        return card(m, null, tb + msgs(m.msgs) + "<p class=\"small muted\">Tarjeta educativa (ronda 7): no genera diagnóstico, tratamiento, VNI/intubación, ajuste de dispositivos ni recomendación de dispositivo domiciliario. Detalles: <a href=\"#/ogren/k-co2-neden-artar\">lecciones de hipercapnia</a>.</p>");
      }
      case 'rds':
        return card(m, null, msgs(m.msgs) + "<p class=\"small muted\">Tipo de dato: objetivo de tratamiento y condición de tratamiento (consenso europeo sobre RDS); no es un intervalo de referencia.</p>");
      /* ---------- 8–10. tur kartları: değer yalnız modül durumu izin veriyorsa gösterilir ---------- */
      case 'renal': {
        const RC = Object.fromEntries(OPT.renal_context), KM = Object.fromEntries(OPT.krt_modality);
        return card(m, null, `<dl class="kv"><dt>Contexto renal</dt><dd>${esc(RC[m.ctx])}</dd><dt>KRT</dt><dd>${esc(KM[m.krt])}</dd></dl>${msgs(m.msgs)}` +
          (m.msgs.includes('renal_bicarb_evidence') ? "<p class=\"small\">Lecciones: <a href=\"#/ogren/b03\">Evidencia sobre el bicarbonato</a> · <a href=\"#/ogren/b04\">Gasometría antes y después de la diálisis</a></p>" : '') +
          "<p class=\"small muted\">Tarjeta educativa (ronda 8). Detalles: <a href=\"#/ogren/b01\">lecciones de riñón y diálisis</a>.</p>");
      }
      case 'uag':
        if (m.value == null) return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc((m.value > 0 ? '+' : '') + n1(m.value))}<small>mmol/L · ${m.status === 'hesaplandi' ? "misma muestra de orina" : "solo aritmético"}</small></p>${msgs(m.msgs)}` +
          calc('uag', [`= ${n1(m.una)} + ${n1(m.uk)} − ${n1(m.ucl)} = ${n1(m.value)} mmol/L`, "No es una medición del amonio urinario."]));
      case 'urine': {
        const rows = [m.uph != null ? ["pH urinario", num(m.uph, 2)] : null, m.ucl != null ? ["Cl⁻ urinario", n1(m.ucl) + ' mmol/L'] : null].filter(Boolean);
        return card(m, null, `<dl class="kv">${rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>${msgs(m.msgs)}${needs(m.need)}`);
      }
      case 'caratio':
        if (m.ratio == null) return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(caFmt(m))}<small>Ca total / iCa · ${m.status === 'gozden_gecirilmeli' && m.msgs.includes('ca_concurrency_unknown') ? "solo aritmético" : "sistémico, simultáneo, mmol/L"}</small></p>${msgs(m.msgs)}` +
          (m.assume ? "<p class=\"small\">Contexto de embarazo no seleccionado: la nota se muestra suponiendo una adulta no embarazada.</p>" : '') +
          calc('systemic_total_ica_ratio', [`= ${num(m.tca, 6)} / ${num(m.ica, 6)} = ${num(m.ratio, 6)}`, "El umbral de la fuente se compara con los valores introducidos; el redondeo en pantalla no interviene en la decisión.", "Perfiles de las fuentes: Delphi 2026 ≥2,5 (usado en la web) · opinión de expertos 2023 >2,5 o tendencia ascendente (en la lección). Los perfiles no se combinan."]) +
          "<p class=\"small muted\">Detalles: <a href=\"#/ogren/b05\">Citrato: ¿acumulación o carga alcalina?</a></p>");
      case 'agk':
        if (m.value == null) return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n1(m.value))}<small>mmol/L · con potasio · ${m.method === 'tco2' ? "con TCO₂" : "con HCO₃ de la gasometría"}</small></p>${msgs(m.msgs)}` +
          calc('ag_with_k', [`= ${n1(R.n.na)} + ${n1(R.n.k)} − ${n1(R.n.cl)} − ${n1(m.method === 'tco2' ? R.n.tco2 : R.n.hco3_actual)} = ${n1(m.value)} mmol/L`, "La AG sin potasio está en una tarjeta aparte (anion-gap)."]));
      case 'og': {
        if (m.ideal == null) return card(m, null, needs(m.need) + msgs(m.msgs));
        const nl = m.nitKind === 'bun' ? `BUN ${n1(R.n.bun)}/2,8` : `urea ${n1(R.n.urea)}`, gl = m.gluUnit === 'mmol/L' ? `glucosa ${n1(R.n.glucose)}` : `glucosa ${n1(R.n.glucose)}/18`;
        const head = m.value != null ? `<p class="big">${esc(n1(m.value))}<small>mOsm/kg · ${m.used === 'ethanol_zero' ? "etanol 0 (medido)" : m.used === 'ideal_4_6' ? "perfil ideal" : "perfil de Purssell"}${m.status === 'gozden_gecirilmeli' ? " · interpretación limitada" : ''}</small></p>` : "<p><b>No se da una OG corregida definitiva</b> (no se seleccionó perfil).</p>";
        return card(m, null, head + `<div class="tbl"><table><thead><tr><th>Perfil</th><th>Contribución del etanol</th><th>OG (mOsm/kg)</th></tr></thead><tbody>
          <tr${m.used === 'ideal_4_6' ? " style=\"background:var(--accent-soft)\"" : ''}><td>Ideal (÷ 4,6)</td><td>${esc(n2(KG.F2.ethanol_ideal_term(m.ethanol)))}</td><td>${esc(n2(m.ideal))}</td></tr>
          <tr${m.used === 'purssell' ? " style=\"background:var(--accent-soft)\"" : ''}><td>Purssell (÷ 3,7 − 0,35)</td><td>${esc(n2(KG.F2.ethanol_purssell_term(m.ethanol)))}</td><td>${esc(n2(m.purssell))}</td></tr></tbody></table></div>${msgs(m.msgs)}${needs(m.need)}` +
          calc('serum_osm_calculated', [`= 2 × ${n1(R.n.na)} + ${gl} + ${nl} = ${n2(m.calc)} mOsm/kg`, `medida ${n1(m.measured)} mOsm/kg · etanol ${n1(m.ethanol)} mg/dL`]) +
          calc(m.used === 'purssell' ? 'serum_og_purssell_regression' : 'serum_og_ideal_ethanol', [`ideal: ${n1(m.measured)} − (${n2(m.calc)} + ${n1(m.ethanol)}/4,6) = ${n2(m.ideal)}`, `Purssell: ${n1(m.measured)} − (${n2(m.calc)} + (${n1(m.ethanol)}/3,7 − 0,35)) = ${n2(m.purssell)}${m.ethanol === 0 ? " (etanol 0: contribución 0)" : ''}`]) +
          "<p class=\"small muted\">Detalles: <a href=\"#/ogren/t02\">Cálculo de la brecha osmolal y el problema del etanol</a></p>");
      }
      case 'tox': {
        const TA = Object.fromEntries(OPT.tox_agent);
        return card(m, null, `<dl class="kv"><dt>Sospecha</dt><dd>${esc({yes: 'var', no: "no (introducido)", unknown: 'bilinmiyor'}[m.suspicion])}</dd><dt>Sustancia</dt><dd>${esc(TA[m.agent])}</dd></dl>${msgs(m.msgs)}<p class="small muted">Ficha educativa (ronda 9). Las tablas EXTRIP no son un algoritmo de tratamiento personal; no se aplican automáticamente al paciente. Detalles: <a href="#/ogren/t01">lecciones de toxicología</a>.</p>`);
      }
      case 'salicylate':
        if (m.mgdl == null) return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n1(m.mgdl))}<small>mg/dL · ${esc(n1(m.mgl))} mg/L (introducido: ${esc(n1(m.input))} ${esc(m.unit)})</small></p>${msgs(m.msgs)}` +
          calc('salicylate_mg_l_to_mg_dl', [m.unit === 'mg/L' ? `= ${n1(m.input)} mg/L ÷ 10 = ${n1(m.mgdl)} mg/dL` : `unidad introducida mg/dL; ${n1(m.mgdl)} mg/dL = ${n1(m.mgl)} mg/L`]));
      case 'lacgap':
        if (m.diff == null) return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc((m.diff > 0 ? '+' : '') + n1(m.diff))}<small>mmol/L · método A − método B${m.status === 'hesaplandi' ? '' : " · solo aritmético"}</small></p>${msgs(m.msgs)}${needs(m.need)}` +
          calc('lactate_method_gap', [`= ${n1(m.a)} − ${n1(m.b)} = ${n1(m.diff)} mmol/L`]));
      case 'hie':
        return card(m, null, msgs(m.msgs));
      case 'delivery':
        if (m.status === 'veri_eksik') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p>Minuto tras el nacimiento: <b>${m.minute}</b>${m.row ? ` · SpO₂ preductal objetivo <b>${pct(m.row[0], m.row[1])}</b>` : ''}${m.pos ? ` · medido ${pct(esc(n1(m.spo2)))}: <b>${{below: "por debajo del objetivo", within: "dentro del intervalo objetivo", above: "por encima del objetivo"}[m.pos]}</b>` : ''}</p>
          <div class="tbl"><table><thead><tr><th>Minuto</th><th>SpO₂ objetivo</th></tr></thead><tbody>${[2, 3, 4, 5, 10].map(k => `<tr${m.row && m.minute === k ? " style=\"background:var(--accent-soft)\"" : ''}><td>${k}</td><td>${pct(...{2: [65, 70], 3: [70, 75], 4: [75, 80], 5: [80, 85], 10: [85, 95]}[k])}</td></tr>`).join('')}</tbody></table></div>${msgs(m.msgs)}`);
      case 'cord':
        return card(m, null, `<p class="big">${esc(SAMPLE[m.vessel])}${m.ph != null ? `<small>pH ${esc(num(m.ph, 3))}${m.pco2 != null ? ` · PCO₂ ${esc(n1(m.pco2))} mmHg` : ''}</small>` : ''}</p>${msgs(m.msgs)}`);
      case 'cordpair':
        if (m.status === 'veri_eksik') return card(m, null, msgs(m.msgs));
        return card(m, null, `<p>ΔpH (vena − arteria): <b>${m.dph == null ? '–' : esc(num(m.dph, 3))}</b> · ΔPCO₂ (arteria − vena): <b>${m.dpco2 == null ? '–' : esc(num(m.dpco2, 2)) + ' kPa'}</b></p>${msgs(m.msgs)}` +
          calc('P-F04', ["ΔpH = pH vena − pH arteria; ΔPCO₂ = PCO₂ arteria − PCO₂ vena (kPa; × 0,1333224 si se introdujo en mmHg)", "Regla de calidad: ΔpH <0,02 o ΔPCO₂ <0,5 kPa → aviso (la igualdad no genera aviso)"]));
      default: return '';
    }
  }
  const has = v => v != null;
  function pregDkaHTML(m, R) {
    const S3 = {yes: "cumplido", no: "no cumplido", missing: "faltan datos"}, c = m.comp;
    const sub = (v, l) => `${esc(l)}: ${v === true ? "cumplido" : v === false ? "no cumplido" : "sin datos"}`;
    const rows = [["Criterio de cetonas de CAD", c.dkaKetone.state, [sub(c.dkaKetone.bhb, "β-hidroxibutirato ≥3,0 mmol/L") + (m.bhbValue != null ? ` (medido ${num(m.bhbValue, 1)})` : ''), sub(c.dkaKetone.uk, "cetonas en orina ≥2+ o moderadas/abundantes")]],
      ["Acidosis", c.acidosis.state, [sub(c.acidosis.ph, 'pH <7,3'), sub(c.acidosis.bic, (c.acidosis.bicSrc === 'gas_hco3' ? "HCO₃ de la gasometría" : "HCO₃ (TCO₂)") + ' <18 mmol/L')]]];
    return card(m, "Evaluación de cetoacidosis (embarazo / lactancia)", `<div class="tbl"><table><thead><tr><th>Componente</th><th>Estado</th><th>Subcriterios</th></tr></thead><tbody>${rows.map(([k, s, subs]) => `<tr><td>${esc(k)}</td><td><b>${esc(S3[s])}</b></td><td class="small">${subs.join('<br>')}</td></tr>`).join('')}</tbody></table></div>
      <p class="small">La glucosa no se usó como componente ni como criterio de exclusión.</p>${msgs(m.msgs)}${m.diff.length ? `<h4 style="margin-top:6px">Visibles en la evaluación diferencial</h4>${msgs(m.diff)}` : ''}`);
  }
  function pedDkaHTML(m, R) {
    const S3 = {yes: "cumplido", no: "no cumplido", missing: "faltan datos"}, c = m.comp;
    const sub = (v, l) => `${esc(l)}: ${v === true ? "cumplido" : v === false ? "no cumplido" : "sin datos"}`;
    const rows = [
      ["Hiperglucemia", c.glucose.state, [sub(c.glucose.glucose, "glucosa >11 mmol/L") + (c.glucose.mmol != null ? ` (${num(c.glucose.mmol, 1)} mmol/L)` : '')]],
      ["Acidosis", c.acidosis.state, [sub(c.acidosis.ph, "pH venoso <7,3"), sub(c.acidosis.bic, (c.acidosis.bicSrc === 'gas_hco3' ? "HCO₃ de la gasometría" : "HCO₃ sérico (TCO₂)") + ' <18 mmol/L')]],
      ["Criterio de cetonas", c.ketosis.state, [sub(c.ketosis.bhb, "β-hidroxibutirato ≥3 mmol/L"), sub(c.ketosis.uk, "cetonas en orina moderadas/abundantes")]]
    ];
    const sev = m.sev ? `<div class="tbl"><table><thead><tr><th>Gravedad (ISPAD 2022)</th><th>Según pH</th><th>Según HCO₃</th><th>Mostrada</th></tr></thead><tbody><tr><td>grave: pH &lt;7,1 o HCO₃ &lt;5 · moderada: &lt;7,2 o &lt;10 · leve: &lt;7,3 o &lt;18</td><td>${esc(m.sev.ph ? SEV[m.sev.ph] : "fuera de umbral / sin datos")}</td><td>${esc(m.sev.hco3 ? SEV[m.sev.hco3] : "fuera de umbral / sin datos")}</td><td><b>${esc(m.sev.overall ? SEV[m.sev.overall] : '–')}</b></td></tr></tbody></table></div>` : "<p class=\"small\">La tabla de gravedad solo se muestra cuando se cumplen los tres componentes o cuando la CAD clínica está confirmada.</p>";
    return card(m, "Criterios de CAD pediátrica (ISPAD 2022)", `<div class="tbl"><table><thead><tr><th>Componente</th><th>Estado</th><th>Subcriterios</th></tr></thead><tbody>${rows.map(([k, s, subs]) => `<tr><td>${esc(k)}</td><td><b>${esc(S3[s])}</b></td><td class="small">${subs.join('<br>')}</td></tr>`).join('')}</tbody></table></div>
      <p>Componentes cumplidos numéricamente: <b>${m.met} / 3</b></p>${sev}${msgs(m.msgs)}`);
  }

  /* Kısa sonuç: modüllerden türetilen tek satırlar; yeni yorum üretilmez */
  function shortHTML(R) {
    const L = [], n = R.n, Mo = R.modules;
    const sample = SAMPLE[n.sample_type];
    L.push(`<b>Muestra:</b> ${esc(sample)} · ${esc(AGE[n.age_group])}${n.age_group === 'adult' && R.scope !== 'cord' ? ' · ' + esc(n.maternal_context === 'unknown' ? "embarazo desconocido (referencia de adulto no embarazada)" : MCTX[n.maternal_context].toLowerCase()) : ''}`);
    if (R.scope === 'pediatric' || R.scope === 'neonatal') L.push(`<b>Alcance:</b> ${esc(t(R.scope === 'neonatal' ? 'm.scope_neonatal' : 'm.scope_pediatric'))}`);
    if (Mo.cord) L.push(`<b>Sangre de cordón:</b> flujo separado · ${esc(SAMPLE[Mo.cord.vessel])}${Mo.cord.ph != null ? ` · pH ${esc(num(Mo.cord.ph, 3))}` : ''}`);
    if (Mo.cordpair && Mo.cordpair.status !== 'veri_eksik') L.push(`<b>Par de cordón:</b> ${Mo.cordpair.flag ? "aviso de calidad (puede ser el mismo vaso); sin reetiquetado" : "sin aviso con esta regla de calidad; no es prueba de exactitud definitiva"}`);
    if (Mo.hie) L.push(`<b>Evaluación por neonatólogo:</b> ${esc(t('m.hie_expert'))} ${esc(t('m.hie_no_cooling'))}`);
    if (Mo.ph && Mo.ph.local) L.push(`<b>pH ${esc(num(Mo.ph.value, 3))}:</b> ${esc({below: "por debajo de la referencia local", within: "dentro del intervalo de referencia local", above: "por encima de la referencia local"}[Mo.ph.cls])}`);
    else if (Mo.ph && Mo.ph.status === 'veri_eksik' && Mo.ph.value != null) L.push(`<b>pH ${esc(num(Mo.ph.value, 3))}:</b> no se introdujo referencia local; sin etiqueta normal/anormal`);
    if (R.errors.length) L.push(`<b>Entrada que debe corregirse:</b> ${R.errors.map(e => esc(LBL[e.field] || e.field)).join(', ')}`);
    if (R.suspended) L.push(`<b>Interpretación integrada suspendida.</b> ${esc(Mo.hh && Mo.hh.status === 'gozden_gecirilmeli' ? "El pH, la PCO₂ y el HCO₃ introducidos no son coherentes entre sí." : t('m.temp_mixed'))}`);
    if (Mo.ph && Mo.ph.dir && !Mo.ph.local) L.push(`<b>pH ${esc(num(Mo.ph.value, 3))}:</b> ${esc({acidemia: 'asidemi', alkalemia: 'alkalemi', within: "dentro del rango de referencia; la evaluación continúa"}[Mo.ph.dir])}${Mo.ph.assume ? " · bajo el supuesto de adulto no embarazada" : ''}`);
    if (Mo.proc && Mo.proc.hyps) {
      if (!Mo.proc.hyps.length) L.push(esc(t('m.proc_none')));
      for (const h of Mo.proc.hyps) {
        let s;
        if (h.exp) s = `PaCO₂ esperada ${n1(h.exp.lo)}–${n1(h.exp.hi)}, medida ${n1(h.measured)}: ${h.pos === 'within' ? "coherente con la respuesta esperada" : h.pos === 'above' ? "más alta de lo esperado, posible acidosis respiratoria adicional" : "más baja de lo esperado, posible alcalosis respiratoria adicional"}`;
        else s = `estimación aguda ${n2(h.acute)}, crónica ${n2(h.chronic)}, HCO₃ medido ${n1(h.measured)}${h.pos === 'between' ? `; ${h.nearer === 'equal' ? t('h.near.equal') : tf('h.resp.nearer', {near: t('h.near.' + h.nearer)})}` : `; para ambas estimaciones ${h.pos === 'below' ? "por debajo" : "por encima"}`}`;
        L.push(`<b>${esc(t('h.' + h.id))}</b> (${esc(t('h.align.' + h.align))}): ${esc(s)}`);
      }
    } else if (Mo.proc) L.push(`<b>Proceso y compensación:</b> ${esc(t('status.' + Mo.proc.status).toLowerCase())}${Mo.proc.msgs[0] ? ' · ' + esc(t('m.' + Mo.proc.msgs[0])) : ''}`);
    if (Mo.hcap && Mo.hcap.status !== 'veri_eksik') {
      const keyM = Mo.hcap.msgs.filter(x => ['hc_venous', 'hc_sample_other', 'hc_scope_ped', 'hc_scope_preg', 'hc_acidemia', 'hc_normal_ph', 'hc_acute_possible', 'hc_chronic_possible', 'hc_hco3_above', 'hc_hco3_below', 'hc_spo2_separate', 'hc_no_baseline', 'hc_baseline_limited'].includes(x));
      L.push(`<b>Contexto de hipercapnia (tarjeta educativa):</b> ${keyM.map(x => esc(t('m.' + x))).join(' ')} <span class="muted">Detalles y límites: pestaña Pasos.</span>`);
    }
    /* 8–10. tur: kısa satırlar kart durumundan türetilir (kapalı kartın değeri burada da görünmez) */
    if (Mo.tox) L.push(`<b>Contexto de exposición:</b> ${esc(t('m.' + Mo.tox.msgs[0]))}`);
    if (Mo.og) L.push(`<b>Brecha osmolal:</b> ${Mo.og.value != null ? `${esc(n1(Mo.og.value))} mOsm/kg (${Mo.og.used === 'ethanol_zero' ? "etanol 0" : Mo.og.used === 'ideal_4_6' ? "perfil ideal" : "perfil de Purssell"})${Mo.og.status === 'gozden_gecirilmeli' ? " · interpretación limitada" : ''}` : Mo.og.ideal != null ? `no se seleccionó perfil; ideal ${esc(n1(Mo.og.ideal))}, Purssell ${esc(n1(Mo.og.purssell))} mostrados por separado` : esc(t('status.' + Mo.og.status).toLowerCase())} · no se asigna etiqueta de normal/descartado`);
    if (Mo.salicylate) L.push(`<b>Salicilato:</b> ${Mo.salicylate.mgdl != null ? `${esc(n1(Mo.salicylate.mgdl))} mg/dL (${esc(n1(Mo.salicylate.mgl))} mg/L) · sin clase automática por umbral` : "no se seleccionó unidad; no se hizo comparación"}`);
    if (Mo.lacgap) L.push(`<b>Diferencia de método del lactato:</b> ${Mo.lacgap.diff != null ? `${esc(n1(Mo.lacgap.diff))} mmol/L${Mo.lacgap.status === 'hesaplandi' ? '' : " (solo aritmético)"} · no hay umbral universal` : "faltan datos"}`);
    if (Mo.renal) L.push(`<b>Contexto renal:</b> ${esc(Object.fromEntries(OPT.renal_context)[Mo.renal.ctx])} (entrada del usuario) · la gasometría no da estadio/diagnóstico${Mo.renal.msgs.includes('krt_under_treatment') ? " · muestra bajo TRR" : ''}`);
    if (Mo.uag) L.push(`<b>AG urinaria:</b> ${Mo.uag.value != null ? `${esc((Mo.uag.value > 0 ? '+' : '') + n1(Mo.uag.value))} mmol/L${Mo.uag.status === 'hesaplandi' ? '' : " (solo aritmético)"} · no es una medición de amonio` : esc(t('status.' + Mo.uag.status).toLowerCase())}`);
    if (Mo.caratio) L.push(`<b>Ca total / iCa:</b> ${Mo.caratio.ratio != null ? `${esc(caFmt(Mo.caratio))}${Mo.caratio.msgs.includes('rca_2026_met') ? " · RCA confirmada, condición del perfil 2026 cumplida (contexto de sospecha, no un diagnóstico)" : Mo.caratio.msgs.includes('ca_concurrency_unknown') ? " · solo aritmético" : ''}` : "cociente del paciente no calculado · " + esc(t('m.' + Mo.caratio.msgs[0]))}`);
    if (Mo.ag && Mo.ag.status !== 'veri_eksik') L.push(`<b>AG ${esc(n1(Mo.ag.value))} mmol/L</b>${Mo.agc && Mo.agc.status === 'hesaplandi' ? ` · corregida por albúmina ${esc(n1(Mo.agc.value))}` : ''}${Mo.delta && Mo.delta.gap != null ? ` · delta gap ${esc(n1(Mo.delta.gap))}${Mo.delta.ratio != null ? `, cociente ${esc(n2(Mo.delta.ratio))}` : ''}` : ''}${Mo.ag.cls ? ' · ' + esc(tf('ag.cls.' + Mo.ag.cls, {lo: num(Mo.ag.interval[0], 0), hi: num(Mo.ag.interval[1], 0)})) : " · sin rango de referencia local, no se hizo clasificación definitiva"}${Mo.agk && Mo.agk.value != null ? ` · AG_K con potasio ${esc(n1(Mo.agk.value))} (fórmula separada)` : ''}`);
    if (Mo.pf && Mo.pf.status === 'hesaplandi') L.push(`<b>PaO₂/FiO₂ ${esc(num(Mo.pf.value, 0))} mmHg</b>${Mo.pf.approx ? " (aproximado)" : ''} · no se realiza clasificación de SDRA`);
    if (Mo.aa && Mo.aa.status === 'hesaplandi') L.push(`<b>Gradiente A–a (aire ambiente) ${esc(n1(Mo.aa.value))} mmHg</b>`);
    if (Mo.cao2 && Mo.cao2.status === 'hesaplandi') L.push(`<b>CaO₂ ${esc(n1(Mo.cao2.value))} mL/dL</b>`);
    if (Mo.dyshb) L.push(`<b>Contexto de dishemoglobina:</b> ${esc(t('m.spo2_unreliable'))} Se requieren el resultado de cooximetría y la historia de exposición.`);
    if (Mo.lactate && Mo.lactate.status !== 'veri_eksik') L.push(`<b>Lactato:</b> ${Mo.lactate.series.map(s => esc(n1(s.v))).join(' → ')} mmol/L${Mo.lactate.change != null ? ` (cambio relativo ${esc(n1(Mo.lactate.change))} %)` : ''}`);
    if (Mo.dka && !Mo.dka.ped && !Mo.dka.preg && Mo.dka.anyInput) L.push(`<b>Criterios de CAD:</b> ${Mo.dka.met}/3 componentes cumplidos numéricamente${Object.values(Mo.dka.comp).some(c => c.state === 'missing') ? ", al menos uno con datos faltantes" : ''} · no es un diagnóstico clínico`);
    if (Mo.dkares) L.push(`<b>Resolución de la CAD:</b> ${esc({yes: "criterios numéricos cumplidos", no: "criterios no cumplidos", missing: "faltan datos"}[Mo.dkares.all])}`);
    if (Mo.oi && Mo.oi.value != null) L.push(`<b>OI ${esc(n1(Mo.oi.value))}</b> · índice; por sí solo no es un diagnóstico${Mo.oi.classifiable ? '' : " · no se usó para la clasificación (validez no confirmada)"}`);
    if (Mo.osi && Mo.osi.value != null) L.push(`<b>OSI ${esc(n1(Mo.osi.value))}</b> · ${Mo.osi.classifiable ? "medición apta para clasificación" : "clasificación detenida (rango de SpO₂, señal o estabilidad)"}`);
    if (Mo.pards && Mo.pards.crit) L.push(`<b>PALICC-2:</b> criterio de oxigenación ${({met: "cumplido", not_met: "no cumplido", missing: "no se pudo evaluar", unverified: "no evaluado (validez de la medición no confirmada)"})[Mo.pards.crit]} · gravedad ${Mo.pards.sev ? esc(SEV[Mo.pards.sev]) : "no se asignó etiqueta"}`);
    if (Mo.nards && Mo.nards.oi != null) L.push(`<b>Montreux:</b> ${Mo.nards.sev ? esc(SEV[Mo.nards.sev]) : "no se asignó etiqueta de gravedad"}`);
    if (Mo.delivery && Mo.delivery.minute != null) L.push(`<b>Sala de partos, ${Mo.delivery.minute}.º minuto:</b> ${Mo.delivery.row ? `objetivo preductal ${pct(Mo.delivery.row[0], Mo.delivery.row[1])}` : "no hay objetivo en la tabla para este minuto"}`);
    if (Mo.age && Mo.age.pma != null) L.push(`<b>Edad posmenstrual:</b> ${Mo.age.pmaW} semanas ${Mo.age.pmaD} días`);
    if (Mo.base) L.push(`<b>BE/BD ${esc((Mo.base.value > 0 ? '+' : '') + n1(Mo.base.value))}</b> · ${esc(BETYPE[Mo.base.type])}${Mo.base.type === 'unknown' ? "; umbral y conversión de signo detenidos" : ''}`);
    if (Mo.dka && Mo.dka.ped && Mo.dka.anyInput) L.push(`<b>CAD pediátrica (ISPAD 2022):</b> ${Mo.dka.met}/3 componentes${Mo.dka.sev ? ` · gravedad ${esc(SEV[Mo.dka.sev.overall] || '–')}${Mo.dka.sev.mismatch ? " (el pH y el HCO₃ indican gravedades distintas)" : ''}` : ''}${Mo.dka.euglycemic ? " · revisión clínica incluida la CAD euglucémica" : ''}`);
    if (Mo.sample) L.push(`<b>Muestra:</b> ${Mo.sample.known.length} error conocido · ${Mo.sample.possible.length} efecto posible · ${Mo.sample.unknown.length} información de calidad faltante${Mo.sample.delay != null ? ` · muestra→análisis ${num(Mo.sample.delay, 0)} min${Mo.sample.protocol != null ? (Mo.sample.known.some(w => w.code === 'q_delay_protocol') ? " (protocolo institucional superado)" : '') : " (no se introdujo protocolo)"}` : ''}`);
    if (Mo.co2rel) L.push(`<b>Aumento relativo de CO₂:</b> PaCO₂ ${esc(n1(Mo.co2rel.pco2))} mmHg, con signos respiratorios; por sí solo no es un diagnóstico ni un umbral de intubación`);
    if (Mo.o2target) L.push(`<b>Objetivo de oxígeno:</b> ${Mo.o2target.target ? `perfil seleccionado ${pct(Mo.o2target.target[0], Mo.o2target.target[1])}` : "no se seleccionó perfil; no se generó un único objetivo por defecto"}`);
    if (Mo.fetal && Mo.fetal.msgs[0] === 'fetal_no_routine_o2') L.push(`<b>Preocupación fetal, sin hipoxia materna:</b> no se recomienda oxígeno materno de rutina; evaluación obstétrica`);
    if (Mo.pe) L.push(`<b>Sospecha de TEP:</b> la gasometría no la descarta`);
    if (Mo.o2delivery) L.push(`<b>Aporte de oxígeno:</b> aunque la PaO₂ sea buena, no se descarta el efecto de la anemia/hemorragia`);
    if (Mo.sepsis) L.push(`<b>Contexto de sepsis:</b> ${Mo.sepsis.branch === 'met' ? "rama de alto riesgo de NICE cumplida; evaluación para cuidados de mayor nivel" : Mo.sepsis.branch === 'not_met' ? "rama de NICE no cumplida; esto no significa bajo riesgo" : "falta el contexto de riesgo; los umbrales no se usan como un algoritmo completo"}${Mo.sepsis.msgs.includes('sepsis_consider_smfm') ? " · disfunción orgánica: se considera sepsis aunque no haya fiebre" : ''}`);
    if (Mo.dka && Mo.dka.preg && Mo.dka.anyInput) L.push(`<b>Cetoacidosis (embarazo/lactancia):</b> criterio de cetonas de CAD ${({yes: "cumplido", no: "no cumplido", missing: "faltan datos"})[Mo.dka.comp.dkaKetone.state]}${Mo.dka.ketDetected && Mo.dka.comp.dkaKetone.state === 'no' ? " (cetonas medidas; esto no significa que no haya cetosis)" : ''}, acidosis ${({yes: 'var', no: 'yok', missing: "faltan datos"})[Mo.dka.comp.acidosis.state]}; la glucosa no es criterio de exclusión${Mo.dka.diff.length ? " · diagnósticos diferenciales en la sección paso a paso" : ''}`);
    if (Mo.preg && n.pregnancy === 'yes') L.push(`<b>${esc(MCTX[n.maternal_context])}:</b> clasificación estándar de adulto detenida; los rangos fisiológicos de la revisión están en la sección paso a paso, no como etiqueta de normalidad.`);
    const counts = {}; Object.values(Mo).forEach(m => { counts[m.status] = (counts[m.status] || 0) + 1; });
    return `<ul class="summary">${L.map(x => `<li>${x}</li>`).join('')}</ul>
      <p class="small muted">${Object.entries(counts).map(([k, v]) => `${esc(t('status.' + k))}: ${v}`).join(' · ')} · versión de reglas ${esc(R.version)}</p>
      ${askHTML(R)}`;
  }
  /* Klinikle ilişkilendir: tamamlayıcı sorular (tedavi emri değil). Örnek yönlendirmeler 03_ASIT_BAZ_ORUNTULERI tablosundan [3] */
  function askHTML(R) {
    const Q = [], Mo = R.modules, ids = Mo.proc && Mo.proc.hyps ? Mo.proc.hyps.map(h => h.id) : [];
    if (ids.includes('met_acid')) Q.push("Para HCO₃ bajo: ¿hay información clínica y de laboratorio sobre lactato, cetonas, función renal y pérdida de bicarbonato? [3]");
    if (ids.includes('met_alk')) Q.push("Para HCO₃ alto: ¿hay pérdida gastrointestinal o uso de diuréticos? [3]");
    if (ids.includes('resp_acid')) Q.push("Para PaCO₂ alta: ¿hay una condición que reduzca la ventilación alveolar? ¿Se conocen la duración y una gasometría previa? [3]");
    if (ids.includes('resp_alk')) Q.push("Para PaCO₂ baja: ¿se ha investigado una causa que aumente el impulso respiratorio? ¿Se conocen la duración y una gasometría previa? [3]");
    if (Mo.pf && Mo.pf.status === 'hesaplandi') Q.push("¿Se registró la FiO₂ en el momento de la toma de la muestra? ¿Cuánto tiempo ha pasado desde el último cambio de soporte?");
    if (Mo.agc && Mo.agc.status === 'hesaplandi') Q.push("¿Se midió el lactato directamente? La AG corregida no descarta la hiperlactatemia. [19]");
    Q.push("¿Se ha evaluado la información de contexto, como mediciones previas, momento de la diálisis, uso de diuréticos y el último cambio de ventilación?");
    return `<div class="panel"><h3 class="h-sm">Correlacionar con la clínica</h3><ul class="ask">${Q.map(q => `<li>${esc(q).replace(/\[(\d+)\]/g, (m, d) => cite([+d]))}</li>`).join('')}</ul><p class="small muted">Estas preguntas son complementarias; el sitio no genera decisiones de intubación, ajustes del ventilador, dosis de fármacos, sepsis ni SDRA.</p></div>`;
  }
  function missingHTML(R) {
    const Mo = R.modules, by = {};
    R.missing.forEach(x => { (by[x.field] = by[x.field] || new Set()).add(x.mod); });
    const na = Object.values(Mo).filter(m => m.status === 'uygulanamaz');
    return `<div class="missing-list">${Object.keys(by).length ? `<h3 class="h-sm">Cálculos que se habilitan si se introducen datos</h3><ul>${Object.entries(by).map(([f, ms]) => `<li><b>${esc(LBL[f] || f)}</b> → ${[...ms].map(m => esc(t('mod.' + m))).join(', ')}</li>`).join('')}</ul>` : "<p>No hay cálculos bloqueados por campos faltantes.</p>"}
      ${na.length ? `<h3 class="h-sm">Cálculos no aplicados a esta muestra</h3><ul>${na.map(m => `<li><b>${esc(t('mod.' + m.id))}</b>: ${esc(m.msgs && m.msgs[0] ? tf('m.' + m.msgs[0], {ag: n1(m.agUse), r: num(m.agRef, 0)}) : '')}</li>`).join('')}</ul>` : ''}
      <p class="note">Los valores faltantes no se completan por estimación. Que una tarjeta no pueda calcularse no impide mostrar las demás tarjetas válidas.</p></div>`;
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
    const tabs = [['short', "Resumen"], ['steps', "Paso a paso"], ['missing', "Información faltante", nMiss], ['src', "Fuentes", srcN]];
    const urgent = [R.modules.dka && R.modules.dka.urgent ? t(R.modules.dka.preg ? 'm.preg_dka_urgent' : 'm.dka_neuro_urgent') : null, R.modules.hie && R.modules.hie.urgent ? t('m.hie_expert') : null, R.modules.tox && R.modules.tox.urgent ? t('m.tox_worsening_urgent') : null].filter(Boolean)
      .map(x => `<div class="banner stop"><span class="ic">!</span><div><b>Evaluación clínica urgente en el tiempo</b><p>${esc(x)}</p></div></div>`).join('');
    const assume = (R.assumptions || []).includes('not_pregnant') ? `<div class="banner info"><span class="ic">?</span><div><b>No se seleccionó contexto de embarazo</b><p>${esc(t('m.assume_not_pregnant'))}</p></div></div>` : '';
    const banner = urgent + assume + (R.suspended ? `<div class="banner stop"><span class="ic">!</span><div><b>Interpretación integrada suspendida</b><p>${esc(R.modules.hh && R.modules.hh.status === 'gozden_gecirilmeli' ? t('m.hh_inconsistent') : t('m.temp_mixed'))}</p></div></div>` : '');
    box.innerHTML = `<div class="res-head"><h2 class="h-sm">Resultado</h2><span class="chip">regla ${esc(R.version)} · calculado en el navegador</span></div>${banner}
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
  const koahCaseHTML = k => `<div class="wrap" style="margin-bottom:14px"><div class="panel"><span class="synthetic">Datos sintéticos · no es un paciente real</span>
      <p style="margin-top:8px"><b>${esc(k.id)} · ${esc(k.baslik)}.</b> ${esc(k.baglam)}</p>
      <details style="margin-top:8px"><summary><b>Interpretación esperada en el paquete</b></summary><p style="margin-top:6px">${k.beklenen_html}</p><p class="small"><b>No debe generarse:</b> ${esc(k.uretilmemeli)}</p><p class="small muted">Fundamento: ${cite(k.kaynaklar)}</p></details></div></div>`;
  /* 8–10. tur olgusu: bağlam metni, görünür alanlara açıkça eşlenen bilgi, beklenen ve üretilmemesi gereken yorum ayrı gösterilir */
  const r8MapHTML = k => { const e = k.eslesme, rows = [...e.ek.map(f => [f, k.mode === 'eval' ? k.girdiler[f] : k.points[0].values[f]]), ...Object.entries(e.nokta || {}).flatMap(([pid, o]) => Object.entries(o).map(([f, v]) => [f + ' (' + pid + ')', v]))];
    const val = (f, v) => { const key = f.replace(/ \(.*\)$/, ''); return v === true ? "marcado" : OPT[key] ? (OPT[key].find(o => o[0] === v) || [0, v])[1] : String(v); };
    return `<p class="small" style="margin-top:6px"><b>Asignado del contexto a campos visibles:</b> ${rows.length ? rows.map(([f, v]) => `${esc(LBL[f.replace(/ \(.*\)$/, '')] || f)}${/ \(/.test(f) ? ' ' + esc(f.match(/\(.*\)$/)[0]) : ''} = <b>${esc(val(f, v))}</b>`).join(' · ') : "ninguno (solo los campos de punto del paquete)"}${e.olaylar.length ? ` · evento: ${e.olaylar.map(o => esc((SER_EV.find(x => x[0] === o.type) || [0, o.type])[1]) + (o.between ? ` (${esc(o.between.join(' → '))} intervalo)` : '')).join(', ')}` : ''}</p>` +
      (e.kaynak_ifade ? `<p class="small muted">Fundamento de la asignación: ${esc(e.kaynak_ifade)}</p>` : '') + (k.atlas_notu ? `<p class="note" style="margin-top:6px">${esc(k.atlas_notu)}</p>` : ''); };
  const r8CaseHTML = k => `<div class="wrap" style="margin-bottom:14px"><div class="panel" data-r8case="${esc(k.id)}"><span class="synthetic">Datos sintéticos · no es un paciente real</span>
      <p style="margin-top:8px"><b>${esc(k.id)} · ${esc(k.baslik)}.</b> ${esc(k.baglam)}</p>${r8MapHTML(k)}
      <details style="margin-top:8px"><summary><b>Interpretación esperada en el paquete</b></summary><p style="margin-top:6px">${k.beklenen_html}</p><p class="small"><b>No debe generarse:</b> ${esc(k.uretilmemeli)}</p><p class="small muted">Reglas: ${k.kurallar.map(esc).join(', ')} · Fundamento: ${cite(k.kaynaklar)}</p></details></div></div>`;
  function viewEval(caseId, tab) {
    if (caseId === 'yeni') caseId = null;     // KGAPP.load ile gelen durum korunur
    if (caseId) loadCase(caseId);
    if (tab && ['short', 'steps', 'missing', 'src'].includes(tab)) resTab = tab;
    view.innerHTML = `<div class="wrap page-head"><p class="eyebrow">Evaluar la gasometría</p><h1>Evaluar</h1>
      <p class="lede">Los cálculos se actualizan a medida que introduces valores. Cada cálculo se realiza cuando se cumplen sus condiciones; los datos faltantes no se completan por estimación. Los resultados son con fines educativos, no una decisión clínica.</p></div>
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
    const steps = [["Identificar la muestra", "¿Arterial o venosa? Hora, unidad, temperatura", '#/ogren/ornek'], ["Comprobar la consistencia", "¿Son coherentes entre sí el pH, la PCO₂ y el HCO₃?", '#/ogren/ornek'], ["Dirección del pH", "Acidemia, alcalemia o dentro de la referencia", '#/ogren/temeller'],
      ["Procesos posibles", "Cuatro procesos como hipótesis separadas", '#/ogren/oruntuler'], ["Compensación", "Respuesta esperada y desviación", '#/ogren/oruntuler'], ["Brecha aniónica", "Albúmina y delta", '#/ogren/anyon'],
      ["Oxigenación", "Una pregunta aparte: PF, A–a, contenido", '#/ogren/oksijen'], ["Información faltante", "¿Qué no sabemos?", '#/ogren/ozel']];
    view.innerHTML = `<section class="wrap hero">
      <div><p class="eyebrow">Para anestesia y cuidados intensivos</p><h1>Leer la gasometría paso a paso</h1>
        <p class="lede">Evalúa la gasometría en adultos, embarazadas, niños y neonatos partiendo de la muestra, con la justificación y la fuente de cada paso. Comprueba qué cálculos pueden hacerse con los datos que introduces y por qué no pueden hacerse los demás.</p>
        <ul class="facts"><li><b>${C.formulas.length + C.ped.formulas.length + C.r810.formulas.length}</b> definiciones de cálculo</li><li><b>${C.rules.length + C.ped.rules.length + C.preg.rules.length + C.sample.rules.length + C.serial.rules.length + C.koah.rules.length + C.r810.rules.length}</b> kural</li><li><b>${C.cases.length + C.ped.cases.length + C.preg.cases.length + C.serial.cases.length + C.koah.cases.length + C.r810.cases.length}</b> casos sintéticos y escenarios</li><li><b>${C.lessons.length}</b> ders</li><li><b>${C.sources.length}</b> fuentes</li></ul>
        <div class="row"><a class="btn" href="#/degerlendir">Evaluar la gasometría</a><a class="btn ghost" href="#/ogren/temeller">Aprender desde cero</a></div></div>
      <div class="panel">${KGC.map(cases, {aria: "Posición de cuatro casos sintéticos en el mapa pH–PCO₂"})}<p class="small muted">Cuatro casos sintéticos en el mapa pH–PCO₂. Las curvas son líneas de igual HCO₃ (Henderson–Hasselbalch); la banda gris es la referencia de pH arterial del adulto (7,35–7,45) [2].</p></div>
    </section>
    <section class="wrap path"><h2 class="h-sm">Secuencia de evaluación</h2><ol class="steps">${steps.map(([b, s, h], i) => `<li><a href="${h}"><span class="n">${String(i + 1).padStart(2, '0')}</span><b>${esc(b)}</b><span>${esc(s)}</span></a></li>`).join('')}</ol>
      <p class="small muted" style="margin-top:10px">Esta secuencia es un diseño de producto; no es una escala diagnóstica única validada.</p></section>
    <section class="wrap page"><div class="grid2">
      <div class="panel"><h3 class="h-sm">¿Qué hace este sitio?</h3><ul class="ask"><li>Aplica las fórmulas con sus condiciones; en cada resultado muestra los valores usados, la fórmula y la fuente.</li><li>Muestra juntos varios procesos posibles y la cronicidad incierta; no termina el análisis ante un pH normal.</li><li>Enumera explícitamente la información faltante; no completa lo desconocido con un valor normal.</li><li>Realiza los cálculos solo en tu navegador; no se envía ni se almacena ningún dato.</li></ul></div>
      <div class="panel"><h3 class="h-sm">¿Qué no hace?</h3><ul class="ask"><li>No diagnostica; no genera diagnósticos de SDRA, sepsis ni CAD, ni una insignia de "diagnóstico definitivo".</li><li>No recomienda intubación, ajustes del ventilador ni dosis de insulina, potasio o bicarbonato.</li><li>No interpreta muestras pediátricas, neonatales ni de cordón con reglas de adulto; en niños no dice "normal" sin una referencia local. No decide sobre EHI ni sobre la indicación de hipotermia terapéutica.</li></ul></div>
    </div></section>`;
  }

  /* ================= Öğren ================= */
  const LAB = {
    'p-pards': () => `<div class="lab" id="lab-oi"><h3>¿Cómo cambian el OI y el OSI?</h3>
      <p class="small">Si la PaO₂ o la SpO₂ se mantienen igual mientras aumentan la FiO₂ y la presión media de la vía aérea, el índice sube. Los umbrales se muestran en dos perfiles separados; las tablas no son intercambiables. Las cifras son ejemplos.</p>
      <div class="sl"><label for="sl-f">FiO₂ (fracción)</label><input type="range" id="sl-f" min="0.21" max="1" step="0.01" value="0.6"><output id="o-f"></output></div>
      <div class="sl"><label for="sl-w">Presión media de la vía aérea (cmH₂O)</label><input type="range" id="sl-w" min="4" max="30" step="1" value="12"><output id="o-w"></output></div>
      <div class="sl"><label for="sl-o">PaO₂ (mmHg)</label><input type="range" id="sl-o" min="30" max="150" step="1" value="60"><output id="o-o"></output></div>
      <div class="sl"><label for="sl-s">SpO₂ (%)</label><input type="range" id="sl-s" min="80" max="100" step="1" value="90"><output id="o-s"></output></div>
      <div id="lab-oi-out"></div></div>`,
    temeller: () => `<div class="lab" id="lab-scale"><h3>Balanza de dos platillos: el pH es normal, los procesos no</h3>
      <p class="small">Modifica el HCO₃ y la PCO₂; el pH se calcula con la relación de Henderson–Hasselbalch. Dos cambios opuestos pueden mantener el pH dentro del rango de referencia. Es una analogía didáctica original; no es un modelo completo de los sistemas tampón.</p>
      <div class="sl"><label for="sl-h">HCO₃ (mmol/L)</label><input type="range" id="sl-h" min="6" max="45" step="1" value="12"><output id="o-h"></output></div>
      <div class="sl"><label for="sl-p">PCO₂ (mmHg)</label><input type="range" id="sl-p" min="12" max="90" step="1" value="18"><output id="o-p"></output></div>
      <div class="row">${[["Punto de partida", 24, 40], ["Dos procesos opuestos", 12, 18], ["Dos procesos en la misma dirección", 12, 40], ["Solo HCO₃ bajo", 12, 40]].slice(0, 3).map(([l, h, p]) => `<button type="button" class="btn ghost sm" data-preset="${h},${p}">${l}</button>`).join('')}</div>
      <p class="big" id="o-ph" style="font:800 26px var(--f-display)"></p><div id="lab-map"></div></div>`,
    oruntuler: () => `<div class="lab" id="lab-comp"><h3>Explora la respuesta esperada</h3>
      <p class="small">Selecciona el cambio primario; la respuesta esperada se calcula con la fórmula que usa el motor. Las cifras son relaciones aproximadas de las fórmulas, no límites biológicos definitivos.</p>
      <div class="row" role="radiogroup">${[['met_acid', "Acidosis metabólica"], ['met_alk', "Alcalosis metabólica"], ['resp_acid', "Acidosis respiratoria"], ['resp_alk', "Alcalosis respiratoria"]].map(([k, l], i) => `<label class="chip"><input type="radio" name="cp" value="${k}"${i ? '' : " checked"}> ${l}</label>`).join('')}</div>
      <div class="sl"><label for="sl-c" id="sl-c-l"></label><input type="range" id="sl-c"><output id="o-c"></output></div><div id="lab-comp-out"></div></div>`,
    anyon: () => `<div class="lab" id="lab-ag"><h3>¿Cómo enmascara la albúmina la brecha aniónica?</h3>
      <p class="small">Mientras la brecha medida se mantiene igual, la brecha corregida aumenta a medida que baja la albúmina. Los valores de referencia son ejemplos; usa los de tu propio laboratorio.</p>
      <div class="sl"><label for="sl-ag">AG medida (mmol/L)</label><input type="range" id="sl-ag" min="0" max="30" step="1" value="12"><output id="o-ag"></output></div>
      <div class="sl"><label for="sl-alb">Albúmina (g/dL)</label><input type="range" id="sl-alb" min="1" max="5" step=".1" value="2"><output id="o-alb"></output></div>
      <div class="sl"><label for="sl-ar">Referencia de albúmina (g/dL)</label><input type="range" id="sl-ar" min="3.5" max="4.5" step=".1" value="4"><output id="o-ar"></output></div>
      <div id="lab-ag-out"></div></div>`
  };
  function bindLabs(id) {
    if (id === 'p-pards') {
      const ids = ['f', 'w', 'o', 's'], el = k => document.getElementById('sl-' + k);
      const draw = () => {
        ids.forEach(k => { document.getElementById('o-' + k).textContent = num(+el(k).value, k === 'f' ? 2 : 0); });
        const oi = KG.F['P-F01'](+el('f').value, +el('w').value, +el('o').value), osi = KG.F['P-F02'](+el('f').value, +el('w').value, +el('s').value), sp = +el('s').value, ok = sp >= 88 && sp <= 97;
        const mont = oi >= 16 ? "grave" : oi >= 8 ? 'orta' : oi >= 4 ? 'hafif' : "por debajo del rango";
        document.getElementById('lab-oi-out').innerHTML = `<div class="grid2"><div class="panel"><p class="big" style="font:800 26px var(--f-display)">OI ${num(oi, 1)}</p><p class="small">PALICC-2 (pediátrico, invasivo): criterio de oxigenación OI ≥4 → ${oi >= 4 ? "se cumple" : "no se cumple"}; umbral de grave OI ≥16 → ${oi >= 16 ? "por encima" : "por debajo"} ${cite([22])}</p><p class="small">Montreux (neonato, si el NARDS está confirmado): ${mont} ${cite([33])}</p></div>
          <div class="panel"><p class="big" style="font:800 26px var(--f-display)">OSI ${num(osi, 1)}</p><p class="small">${ok ? `PALICC-2: criterio OSI ≥5 → ${osi >= 5 ? "se cumple" : "no se cumple"}; umbral de grave OSI ≥12 → ${osi >= 12 ? "por encima" : "por debajo"}` : "SpO₂ fuera de 88–97 %: no se realiza la clasificación OSI de PALICC-2"} ${cite([22])}</p><p class="small">La tabla de Montreux no incluye el OSI.</p></div></div>
          <p class="small muted">Ningún umbral es por sí solo un diagnóstico; la etiqueta de gravedad se asigna junto con el diagnóstico clínico, la duración y las condiciones de exclusión.</p>`;
      };
      ids.forEach(k => { el(k).oninput = draw; }); draw();
    }
    if (id === 'temeller') {
      const h = document.getElementById('sl-h'), p = document.getElementById('sl-p');
      const draw = () => {
        const ph = KG.F['hh-ph'](+h.value, +p.value), within = ph >= 7.35 && ph <= 7.45;
        document.getElementById('o-h').textContent = h.value; document.getElementById('o-p').textContent = p.value;
        document.getElementById('o-ph').textContent = `pH ${num(ph, 2)} · ${ph < 7.35 ? 'asidemi' : ph > 7.45 ? 'alkalemi' : "dentro del intervalo de referencia"}`;
        const tags = []; if (+h.value < 24) tags.push("HCO₃ hacia abajo (acidificante)"); if (+h.value > 24) tags.push("HCO₃ hacia arriba (alcalinizante)"); if (+p.value > 40) tags.push("PCO₂ hacia arriba (acidificante)"); if (+p.value < 40) tags.push("PCO₂ hacia abajo (alcalinizante)");
        document.getElementById('lab-map').innerHTML = KGC.map([{ph, pco2: +p.value, label: 'pH ' + num(ph, 2)}]) + `<p class="small">${tags.length ? esc(tags.join(' · ')) : "Ambos valores están en los puntos de partida de la fórmula."}${within && tags.length >= 2 ? " — aunque el pH esté dentro de la referencia, pueden coexistir dos procesos." : ''}</p>`;
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
          out.innerHTML = `<p>PaCO₂ esperada: <b>${n1(e.lo)}–${n1(e.hi)} mmHg</b> (${k === 'met_acid' ? "Winter: 1,5 × HCO₃ + 8 ± 2" : "0,7 × HCO₃ + 20 ± 5"}) ${cite(KG.FSRC[k === 'met_acid' ? 'winter' : 'met-alk'])}. Si la PaCO₂ medida está por encima del rango, es posible un efecto respiratorio acidificante adicional; si está por debajo, un efecto respiratorio alcalinizante adicional.</p>` +
            KGC.map([{ph, pco2: e.center, label: "centro esperado"}, {ph: KG.F['hh-ph'](v, e.lo), pco2: e.lo, hollow: true, r: 4}, {ph: KG.F['hh-ph'](v, e.hi), pco2: e.hi, hollow: true, r: 4}]); }
        else { const a = KG.F[k === 'resp_acid' ? 'resp-ac-acute' : 'resp-alk-acute'](v), c = KG.F[k === 'resp_acid' ? 'resp-ac-chronic' : 'resp-alk-chronic'](v);
          out.innerHTML = `<p>HCO₃ esperado: modelo agudo <b>${n2(a)}</b>, modelo crónico <b>${n2(c)} mmol/L</b> ${cite(KG.FSRC[k === 'resp_acid' ? 'resp-ac-acute' : 'resp-alk-acute'])}. Son estimaciones puntuales; la gasometría por sí sola no determina la duración, y es posible un estado intermedio agudo–crónico.</p>` +
            KGC.map([{ph: KG.F['hh-ph'](a, v), pco2: v, label: 'akut'}, {ph: KG.F['hh-ph'](c, v), pco2: v, label: 'kronik', hollow: true}]); }
      };
      sl.oninput = set; document.querySelectorAll('input[name=cp]').forEach(r => r.onchange = set); set();
    }
    if (id === 'anyon') {
      const a = document.getElementById('sl-ag'), b = document.getElementById('sl-alb'), r = document.getElementById('sl-ar');
      const draw = () => {
        ['ag', 'alb', 'ar'].forEach((k, i) => { document.getElementById('o-' + k).textContent = num(+[a, b, r][i].value, 1); });
        const c = KG.F['ag-albumin'](+a.value, +r.value, +b.value);
        document.getElementById('lab-ag-out').innerHTML = KGC.ag({measured: +a.value, corrected: c}) + `<p class="small">AG corregida = ${num(+a.value, 1)} + 2,5 × (${num(+r.value, 1)} − ${num(+b.value, 1)}) = <b>${num(c, 1)}</b> mmol/L ${cite(KG.FSRC['ag-albumin'])}. La AG corregida no sustituye al lactato medido.</p>`;
      };
      a.oninput = b.oninput = r.oninput = draw; draw();
    }
  }
  function viewLearn(id) {
    const i = Math.max(0, C.lessons.findIndex(l => l.id === id)), L = C.lessons[i];
    const prev = C.lessons[i - 1], next = C.lessons[i + 1];
    view.innerHTML = `<div class="wrap page-head"><p class="eyebrow">${{ped: "Pediatría y neonatos", preg: "Embarazo", sample: "Muestra y medición", serial: "Evaluación seriada", koah: "EPOC e hipercapnia", renal: "Riñón y diálisis", tox: "Toxicología", mixed: "Ácido–base mixto", adult: "Aprender desde cero"}[L.group]} · ${i + 1} / ${C.lessons.length}</p><h1>${esc(L.title)}</h1></div>
      <div class="wrap learn"><nav aria-label="Lecciones">${['adult', 'sample', 'serial', 'koah', 'renal', 'tox', 'mixed', 'ped', 'preg'].map(g => `<p class="eyebrow" style="margin:${g === 'adult' ? '0' : '16px'} 10px 6px">${{adult: "Fundamentos (adulto)", sample: "Muestra y medición", serial: "Evaluación seriada", koah: "EPOC e hipercapnia (adulto)", renal: "Riñón y diálisis", tox: "Toxicología", mixed: "Trastornos ácido–base mixtos", ped: "Pediatría y neonatos", preg: "Embarazo, trabajo de parto, posparto"}[g]}</p>` + C.lessons.map((l, k) => l.group !== g ? '' : `<a href="#/ogren/${l.id}" data-pid="l:${l.id}"${k === i ? " aria-current=\"page\"" : ''}><span class="n">${String(k + 1).padStart(2, '0')}</span>${esc(l.title)}${PROG.markHTML('l:' + l.id)}</a>`).join('')).join('')}</nav>
      <article class="lesson"><div class="doc">${L.html}</div>${LAB[L.id] ? LAB[L.id]() : ''}
        <div class="pager">${prev ? `<a href="#/ogren/${prev.id}">← ${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a href="#/ogren/${next.id}">${esc(next.title)} →</a>` : `<a href="#/olgular">Ir a resolver casos →</a>`}</div></article></div>`;
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
    (OPT[k] ? (OPT[k].find(o => o[0] === g[k]) || [0, g[k]])[1] : num(g[k], 3)) + (k === 'pco2' || k === 'pao2' ? ' ' + (g[k + '_unit'] || 'mmHg') : k === 'fio2' ? ` (${g.fio2_unit === 'percent' ? '%' : 'kesir'})` : '')]);
  function viewCases() {
    view.innerHTML = `<div class="wrap page-head"><p class="eyebrow">Resolver casos</p><h1>Casos</h1><p class="lede">${C.cases.length} casos didácticos sintéticos. Primero escribe tu propia interpretación y después abre la respuesta razonada y la salida del motor. Los casos no son datos de pacientes reales.</p></div>
      <div class="wrap"><h2 class="h-sm" style="margin-bottom:10px">Casos de muestra única</h2></div>
      <div class="wrap cases" style="padding-bottom:20px">${C.cases.map(c => `<a class="case-card" href="#/olgu/${c.id}"><span class="id">${c.id} ${PROG.markHTML('c:' + c.id)}</span><b>${esc(c.baslik)}</b><span class="vals">${esc(caseVals(c.girdiler).slice(3, 7).map(([k, v]) => k + ' ' + v).join(' · '))}</span></a>`).join('')}</div>
      <div class="wrap"><h2 class="h-sm" style="margin-bottom:10px">Casos seriados</h2><p class="small muted" style="margin-bottom:10px">Varios puntos temporales; se abren en la pantalla de evaluación seriada.</p></div>
      <div class="wrap cases">${C.serial.cases.map(c => `<a class="case-card" href="#/seri/${c.id}"><span class="id">${c.id}</span><b>${esc(c.baslik)}</b><span class="vals">${c.points.length} puntos temporales${c.events.length ? ' · ' + c.events.length + " eventos" : ''}</span></a>`).join('')}</div>
      <div class="wrap" style="margin-top:24px"><h2 class="h-sm" style="margin-bottom:10px">Casos de hipercapnia (adulto, ronda 7)</h2><p class="small muted" style="margin-bottom:10px">Las cifras son datos de entrada didácticos, no objetivos. Las muestras únicas se abren en Evaluar; los casos con dos puntos temporales, en la pantalla Seriada. Lecciones: <a href="#/ogren/k-co2-neden-artar">EPOC e hipercapnia</a>.</p></div>
      <div class="wrap cases">${C.koah.cases.map(k => `<a class="case-card" href="#/${k.mode === 'serial' ? 'seri' : 'degerlendir'}/${k.id}"><span class="id">${k.id}</span><b>${esc(k.baslik)}</b><span class="vals">${k.mode === 'serial' ? k.points.length + " puntos temporales" : esc(['pco2', 'hco3_actual', 'ph'].map(f => ({pco2: 'PCO₂', hco3_actual: 'HCO₃', ph: 'pH'})[f] + ' ' + num(k.girdiler[f], 6)).join(' · '))}</span></a>`).join('')}</div>
      ${Object.keys(R8G).map(g => `<div class="wrap" style="margin-top:24px" data-r8group="${g}"><h2 class="h-sm" style="margin-bottom:10px">${esc(R8G[g])}</h2><p class="small muted" style="margin-bottom:10px">Casos didácticos sintéticos; las cifras no son objetivos. La información del texto de contexto entra en el motor solo a través de los campos visibles a los que se asigna explícitamente. Lecciones: <a href="#/ogren/${({renal: 'b01', tox: 't01', mixed: 'm01'})[g]}">${esc(R8G[g].replace(/ \(.*/, ''))}</a>.</p></div>
      <div class="wrap cases">${C.r810.cases.filter(k => k.grup === g).map(k => `<a class="case-card" href="#/${k.mode === 'serial' ? 'seri' : 'degerlendir'}/${k.id}"><span class="id">${k.id}</span><b>${esc(k.baslik)}</b><span class="vals">${k.mode === 'serial' ? k.points.length + " puntos temporales" + (k.events.length ? ' · ' + k.events.length + " eventos" : '') : esc(k.baglam)}</span></a>`).join('')}</div>`).join('')}`;
  }
  const HYP_PICK = [['met_acid', "Acidosis metabólica"], ['met_alk', "Alcalosis metabólica"], ['resp_acid', "Acidosis respiratoria"], ['resp_alk', "Alcalosis respiratoria"], ['none', "Sin desviación marcada"], ['stop', "Debe detenerse el cálculo/la interpretación"]];
  function viewCase(id) {
    const c = C.cases.find(x => x.id === id); if (!c) return viewCases();
    const i = C.cases.indexOf(c), prev = C.cases[i - 1], next = C.cases[i + 1];
    view.innerHTML = `<div class="wrap page-head"><p class="eyebrow"><a href="#/olgular">Casos</a> · ${c.id}</p><h1>${esc(c.baslik)}</h1><p style="margin-top:12px"><span class="synthetic">Datos sintéticos · no es un paciente real</span></p></div>
      <div class="wrap case">
        <div class="panel"><h3 class="h-sm">Datos</h3><dl class="kv">${caseVals(c.girdiler).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
          <p class="small muted" style="margin-top:10px">${esc(c.notu || '')}</p></div>
        <div class="panel"><h3 class="h-sm">Tu interpretación</h3><p class="small">¿Qué procesos consideras? (Solo permanece en esta página; no se guarda.)</p>
          <div class="pick">${HYP_PICK.map(([k, l]) => `<label><input type="checkbox" value="${k}"> ${l}</label>`).join('')}</div>
          <textarea id="mine" placeholder="Escribe brevemente tu razonamiento: dirección del pH, respuesta esperada, información faltante…" style="margin-top:10px"></textarea>
          <div class="row" style="margin-top:10px"><button type="button" class="btn" id="reveal">Mostrar la respuesta razonada</button><a class="btn ghost" href="#/degerlendir/${c.id}">Abrir en el evaluador</a></div></div>
        <div id="answer" hidden style="grid-column:1/-1"></div>
        <div class="row" style="grid-column:1/-1;justify-content:space-between">${prev ? `<a href="#/olgu/${prev.id}">← ${prev.id}</a>` : '<span></span>'}${next ? `<a href="#/olgu/${next.id}">${next.id} →</a>` : ''}</div>
      </div>`;
    PROG.seen('c:' + c.id);
    document.getElementById('reveal').onclick = () => {
      PROG.done('c:' + c.id);
      const R = KG.evaluate(Object.fromEntries(Object.entries(c.girdiler).filter(([, v]) => v != null)));
      const a = document.getElementById('answer'); a.hidden = false;
      a.innerHTML = `<div class="grid2"><div class="panel"><h3 class="h-sm">Interpretación esperada en el paquete</h3><p>${c.beklenen_html}</p><p class="small muted" style="margin-top:8px">Fundamento: ${cite(c.kaynak_ids)}</p></div>
        <div class="panel"><h3 class="h-sm">Resumen del motor</h3>${R.modules.scope ? `<p>${esc(t('m.' + R.modules.scope.msgs[0]))}</p>` : shortHTML(R).replace(/<div class="panel">[\s\S]*$/, '')}</div></div>`;
      a.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'});
    };
  }


  /* ================= Seri değerlendirme (6. tur) =================
     Her nokta kendi girdileriyle değerlendirilir (KG.serial). Bu görünüm yalnız aritmetik farkı, bayrakları ve notları gösterir. */
  const SPF = [  // [anahtar, etiket, tür, birim seçenekleri]
    ['label', "Etiqueta anónima del episodio", 'text'], ['time', "Momento de la muestra", 'dt'], ['age_group', "Grupo de edad", 'sel'], ['sample_type', "Tipo de muestra", 'sel'], ['temperature_reporting', "Informe de temperatura", 'sel'], ['method', "Dispositivo / método", 'text'],
    ['ph', 'pH'], ['pco2', "PCO₂ (mmHg)"], ['hco3_actual', "HCO₃ real"], ['pao2', "PO₂ (mmHg)"], ['fio2', "FiO₂ (fracción)"], ['fio2_quality', "Fuente de la FiO₂", 'sel'],
    ['peep', "PEEP (cmH₂O)", 'sup'], ['paw', "Presión media de la vía aérea"], ['support_type', "Tipo de soporte", 'suptext'], ['support_concurrent', "¿Soporte simultáneo?", 'sel'], ['stable', "Medición estable", 'sel'],
    ['na', 'Na⁺'], ['cl', 'Cl⁻'], ['tco2', 'TCO₂'], ['albumin', "Albúmina (g/dL)"], ['albumin_concurrent', "¿Albúmina simultánea?", 'sel'],
    ['lactate', "Lactato"], ['glucose', "Glucosa (mg/dL)"], ['beta_hydroxybutyrate', "β-hidroxibutirato"], ['maternal_context', "Contexto de embarazo", 'sel'], ['hc_chronic_confirmed', "¿Hipercapnia crónica previa confirmada?", 'sel'], ['q_bubble', "Burbuja de aire", 'sel'], ['q_heparin', "Heparina", 'sel']
  ];
  const SER_OPT = Object.assign({}, OPT, {albumin_concurrent: YN});
  const SER_EV = [['ventilation', "Cambio de ventilación / oxígeno"], ['fluid', "Fluidos"], ['insulin', "Insulina"], ['vasopressor', "Vasopresor"], ['rrt_start', "TRR (RRT) iniciada"], ['rrt_end', "TRR (RRT) finalizada"], ['rrt_change', "Cambio / interrupción de TRR"], ['labor', "Trabajo de parto / parto"], ['other', "Otro"]];
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
  const serialCasePickerHTML = () => `<select class="case-pick" id="serCase" aria-label="Cargar un caso seriado simulado"><option value="">Cargar un caso seriado simulado…</option>${[...C.serial.cases, ...C.koah.cases.filter(k => k.mode === 'serial'), ...C.r810.cases.filter(k => k.mode === 'serial')].map(c => `<option value="${c.id}"${SS.caseId === c.id ? " selected" : ''}>${c.id} · ${esc(c.baslik)}</option>`).join('')}</select>`;
  function serialEditorHTML() {
    const cell = (p, i, [k, l, kind]) => {
      const v = spGet(p, k), dk = `data-sp="${i}" data-k="${k}"`;
      if (kind === 'sel') return `<select ${dk}>${(SER_OPT[k] || YN).map(([o, lab]) => `<option value="${o}"${String(v) === o ? " selected" : ''}>${esc(lab)}</option>`).join('')}</select>`;
      if (kind === 'dt') return `<input type="datetime-local" ${dk} value="${esc(v)}">`;
      return `<input ${kind === 'text' || kind === 'suptext' ? 'type="text"' : 'inputmode="decimal"'} ${dk} value="${esc(v)}">`;
    };
    return `<div class="row" style="margin-bottom:10px">
        <button type="button" class="btn ghost sm" id="serAdd">+ Punto temporal</button><button type="button" class="btn ghost sm" id="serClear">Limpiar</button></div>
      <div class="fs" style="padding:12px 16px"><div class="body" style="padding:0">
        <p class="hint" style="grid-column:1/-1">Introduzca los datos de muestra, soporte y contexto clínico por separado para cada punto. Use una etiqueta anónima común para el mismo episodio (p. ej., "episodio-1"); no introduzca datos identificativos del paciente.</p></div></div>
      <div class="tbl" style="margin-top:10px"><table class="sertbl"><thead><tr><th>Campo</th>${SS.points.map((p, i) => `<th>${esc(p.id)} <button type="button" class="linkbtn" data-sdel="${i}" aria-label="${esc(p.id)} eliminar">eliminar</button></th>`).join('')}</tr></thead>
        <tbody>${[...SPF, ...extraRows()].map(f => `<tr><td class="small">${esc(f[1])}</td>${SS.points.map((p, i) => `<td>${cell(p, i, f)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
      <h3 class="h-sm" style="margin:16px 0 8px">Eventos</h3>
      <p class="small muted" style="margin-bottom:6px">Si se conoce la hora del evento, introdúcela. Si no se conoce, sitúalo entre dos puntos con "Intervalo"; un evento no se asigna por estimación a una hora o a un intervalo.</p>
      <div class="tbl"><table><thead><tr><th>Hora</th><th>Intervalo (si no hay hora)</th><th>Tipo</th><th>Nota</th><th></th></tr></thead><tbody>${SS.events.map((e, i) => `<tr><td><input type="datetime-local" data-ev="${i}" data-k="time" value="${esc((e.time || '').slice(0, 16))}"${e.between ? " disabled" : ''}></td>
        <td><select data-ev="${i}" data-k="between"><option value="">—</option>${SS.points.slice(1).map((p, j) => { const v = SS.points[j].id + '|' + p.id; return `<option value="${esc(v)}"${e.between && e.between.join('|') === v ? " selected" : ''}>${esc(SS.points[j].id)} → ${esc(p.id)}</option>`; }).join('')}</select></td><td><select data-ev="${i}" data-k="type">${SER_EV.map(([o, l]) => `<option value="${o}"${e.type === o ? " selected" : ''}>${esc(l)}</option>`).join('')}</select></td><td><input type="text" data-ev="${i}" data-k="note" value="${esc(e.note || '')}"></td><td><button type="button" class="linkbtn" data-evdel="${i}">sil</button></td></tr>`).join('')}</tbody></table></div>
      <button type="button" class="btn ghost sm" id="evAdd" style="margin-top:8px">+ Evento</button>`;
  }
  const SER_LBL = {ph: 'pH', pco2: 'PCO₂', hco3: 'HCO₃', pao2: 'PO₂', pf: 'PaO₂/FiO₂', oi: 'OI', osi: 'OSI', lactate: "Lactato", glucose: "Glucosa", bhb: "β-hidroxibutirato", na: 'Na⁺', cl: 'Cl⁻', ag: 'AG', agc: "AG corregida", salicylate: "Salicilato"};
  const SER_UNIT = {pco2: 'mmHg', pao2: 'mmHg', pf: 'mmHg', hco3: 'mmol/L', lactate: 'mmol/L', glucose: 'mg/dL', bhb: 'mmol/L', na: 'mmol/L', cl: 'mmol/L', ag: 'mmol/L', agc: 'mmol/L', salicylate: 'mg/dL'};
  function serialResultHTML(S) {
    if (S.blocked) return `<div class="banner stop"><span class="ic">!</span><div><b>Serie no construida</b><p>${esc(t('so.' + S.blocked))}</p></div></div>`;
    if (S.points.length < 2) return "<p class=\"note\">Se necesitan al menos dos puntos temporales para comparar.</p>";
    const tAll = S.order !== 'entry';
    const xOf = (p, i) => tAll ? Date.parse(p.time) : i, xs = S.points.map(xOf), xMin = Math.min(...xs), xMax = Math.max(...xs);
    const hm = s => s ? s.slice(11, 16) : '';
    const evs = tAll ? S.events.map(e => ({x: Date.parse(e.time), label: (SER_EV.find(x => x[0] === e.type) || [0, e.type])[1]})).filter(e => !Number.isNaN(e.x) && e.x >= xMin && e.x <= xMax) : [];
    const keys = ['ph', 'pco2', 'hco3', 'pao2', 'pf', 'oi', 'lactate', 'glucose', 'bhb', 'ag', 'agc', 'cl', 'salicylate'];
    const getV = (R, k) => ({ph: R.n.ph, pco2: R.n.pco2, hco3: R.n.hco3_actual, pao2: R.n.pao2, pf: R.modules.pf && R.modules.pf.status === 'hesaplandi' ? R.modules.pf.value : null, oi: R.modules.oi ? R.modules.oi.value : null,
      lactate: R.n.lactates.length ? R.n.lactates[R.n.lactates.length - 1].v : null, glucose: R.n.glucose, bhb: R.n.beta_hydroxybutyrate, ag: R.modules.ag ? R.modules.ag.value : null, agc: R.modules.agc && R.modules.agc.status === 'hesaplandi' ? R.modules.agc.value : null, cl: R.n.cl, salicylate: R.modules.salicylate && R.modules.salicylate.mgdl != null ? R.modules.salicylate.mgdl : null})[k];
    const oxy = new Set(['pao2', 'pf', 'oi']);
    /* [1.5-F02] Çizgi, ardışık karşılaştırmadaki parametre uygunluğundan türetilir */
    const LINK_LBL = {matrix_changed: "cambió el tipo de muestra", method_changed: "cambió el método", support_changed: "cambió el soporte", albumin_not_concurrent: "albúmina no simultánea", index_not_classifiable: "sin condición de clasificación", sample_quality: "aviso de calidad", hh_suspended: "interpretación ácido–base suspendida"};
    const linkOf = (i, k) => { if (i === 0) return {}; const c = S.comparisons[i - 1], P = c && c.params[k];
      if (!P || P.unavailable) return {link: 'none'};
      const fl = (P.flags || []).filter(f => f !== 'pct_undefined_zero');
      return fl.length ? {link: 'dash', linkLabel: fl.map(f => LINK_LBL[f] || "aviso").join(' · ')} : {link: 'solid'}; };
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
      if (A.sample !== B.sample) q[1].push(`No: el tipo de muestra cambió (${SN(A.sample)} → ${SN(B.sample)}). Los dos valores no son la misma medición; la diferencia ácido–base se muestra solo como aritmética bruta.`);
      else if (A.sample === 'unknown') q[1].push("Tipo de muestra desconocido: no puede confirmarse que las dos mediciones sean equivalentes; no se interpretan los componentes.");
      else q[1].push(`Mismo tipo de muestra (ambas muestras ${SN(A.sample)}).`);
      for (const f of c.flags) if (!['matrix_changed', 'assume_not_pregnant'].includes(f)) q[1].push(t('sf.' + f));
      if (Object.values(pr).some(p => (p.flags || []).includes('sample_quality'))) q[1].push(t('sf.sample_quality'));
      /* 2 · Araya ne girdi? */
      q[2].push(c.hours ? `Intervalo ${num(c.hours, 2)} h; el cambio horario es un promedio y no muestra la evolución intermedia.` : "Falta información de tiempo o ambas muestras son simultáneas: no se calculó el cambio horario.");
      if (c.events.length) q[2].push("Evento registrado en este intervalo: " + c.events.map(e => `${e.between ? "hora desconocida" : hm(e.time)} ${(SER_EV.find(x => x[0] === e.type) || [0, e.type])[1]}${e.note ? ' (' + e.note + ')' : ''}`).join(' · ') + '.');
      else q[2].push("No hay eventos registrados en este intervalo. Añada los cambios de tratamiento o soporte.");
      if (c.flags.includes('support_changed') || Object.values(pr).some(p => (p.flags || []).includes('support_changed'))) q[2].push(t('sf.support_changed'));
      /* 3 · pH hangi bileşenle değişti? */
      if (ok('ph')) {
        q[3].push(`pH ${fmt('ph', pr.ph.a)} → ${fmt('ph', pr.ph.b)} (${sgn('ph', pr.ph.diff)})${ok('pco2') ? ` · PCO₂ ${sgn('pco2', pr.pco2.diff)} mmHg` : ''}${ok('hco3') ? ` · HCO₃ ${sgn('hco3', pr.hco3.diff)} mmol/L` : ''}.`);
        const abNote = c.notes.some(n => NOTE_Q[n] === 3);
        if (c.flags.includes('point_validity') || A.sample !== B.sample || A.sample === 'unknown') q[3].push("Interpretación de componentes cerrada (por el motivo de la pregunta 1); solo se lee la diferencia bruta.");
        else if (!abNote && pr.ph.diff < 0) q[3].push("El pH bajó: comprueba si lo acompañó un aumento de PCO₂, un descenso de HCO₃ (o ambos); un único valor de pH no indica el proceso.");
        else if (!abNote && pr.ph.diff > 0) q[3].push("El pH subió: lee juntos los cambios de PCO₂ y HCO₃; la mejoría del pH no significa que el proceso subyacente haya terminado.");
      } else q[3].push("El pH no pudo compararse en este intervalo (no hay valor válido en ambos puntos).");
      /* 4 · Metabolik belirteçler */
      const MET = ['lactate', 'glucose', 'bhb', 'ag', 'agc', 'cl', 'na', 'salicylate'].filter(ok);
      if (MET.length) q[4].push(MET.map(k => `${SER_LBL[k]} ${fmt(k, pr[k].a)} → ${fmt(k, pr[k].b)}${SER_UNIT[k] ? ' ' + SER_UNIT[k] : ''}`).join(' · ') + ". Los marcadores pueden cambiar a distinta velocidad; lee cada uno por separado.");
      else q[4].push("En este intervalo no hay marcadores metabólicos (lactato, glucosa, cetona, AG, cloruro) medidos en ambos puntos.");
      /* Notlar ilgili soruya; geri kalanı 5. soruya */
      for (const n of c.notes) q[NOTE_Q[n] || 5].push(t('sn.' + n));
      if (c.flags.includes('assume_not_pregnant')) q[5].push(t('sf.assume_not_pregnant'));
      q[5].push("Compare estos cambios con la evolución del trabajo respiratorio, la conciencia, la circulación y las necesidades de soporte.");
      const TQ = {1: "¿Medí lo mismo?", 2: "¿Qué ocurrió entre medias?", 3: "¿Con qué componente cambió el pH?", 4: "¿Los marcadores metabólicos cambian juntos?", 5: "¿Cómo completo la evaluación?"};
      return `<div class="serq" data-guide><h4>Leamos este intervalo paso a paso</h4><ol>${[1, 2, 3, 4, 5].map(i => `<li><b>${TQ[i]}</b><ul>${q[i].map(x => `<li>${esc(x)}</li>`).join('')}</ul></li>`).join('')}</ol></div>`;
    };
    const cmpHTML = c => `<div class="panel" style="margin-top:12px"><h3 class="h-sm">${esc(c.from)} → ${esc(c.to)}${c.hours ? ` · ${num(c.hours, 2)} h` : ''}</h3>
      <div class="tbl"><table><thead><tr><th>Parámetro</th><th>Antes</th><th>Después</th><th>Diferencia absoluta</th><th>% de cambio</th><th>Media por hora</th><th>Aviso</th></tr></thead><tbody>${Object.entries(c.params).map(([k, p]) => `<tr><td>${esc(SER_LBL[k] || k)}</td><td>${fmt(k, p.a)}</td><td>${fmt(k, p.b)}</td><td>${p.unavailable ? '–' : (p.diff > 0 ? '+' : '') + fmt(k, p.diff)}</td><td>${p.pct == null ? '–' : (p.pct > 0 ? '+' : '') + num(p.pct, 1) + ' %'}</td><td>${p.rate == null ? '–' : (p.rate > 0 ? '+' : '') + fmt(k, p.rate) + "/h"}</td><td class="small">${(p.flags || []).map(f => esc(t('sf.' + f))).join('<br>')}</td></tr>`).join('')}</tbody></table></div>
      ${guideHTML(c)}</div>`;
    const ptLinks = S.points.map(p => `<button type="button" class="btn ghost sm" data-open="${p.entry}">${esc(p.id)}: abrir la evaluación de muestra única</button>`).join('');
    const bad = S.points.filter(p => p.validity.length), anyAb = S.points.some(p => p.abInvalid);
    return `${S.order && S.order !== 'time' ? `<p class="note">${esc(t('so.' + S.order))}</p>` : ''}
      ${(S.warnings || []).map(w => `<p class="note">${esc(t('sw.' + w))}${w === 'events_unplaced' && S.unplacedEvents ? ' ' + S.unplacedEvents.map(e => esc((SER_EV.find(x => x[0] === e.type) || [0, e.type])[1]) + (e.time ? ' ' + esc(e.time.slice(0, 16).replace('T', ' ')) : '')).join(' · ') : ''}</p>`).join('')}
      ${bad.length ? `<div class="banner stop" data-validity><span class="ic">!</span><div><b>Punto con un problema de validez básico</b><ul class="msgs">${bad.map(p => `<li>${esc(p.id)}: ${p.validity.map(v => esc(t('sv.' + v))).join('; ')}</li>`).join('')}</ul>${anyAb ? "<p class=\"small\">En los intervalos que incluyen un punto con un problema de validez ácido–base, la diferencia de pH/PCO₂/HCO₃ se muestra como aritmética bruta; no se genera una interpretación basada en componentes ni una interpretación seriada específica.</p>" : "<p class=\"small\">El error está en campos ajenos al ácido–base; los cálculos relacionados están cerrados y las notas ácido–base no se ven afectadas por ello.</p>"}</div></div>` : ''}
      ${(S.assumptions || []).map(a => `<div class="banner warn" data-assumption style="margin-top:10px"><span class="ic">?</span><div><b>Contexto de embarazo desconocido: ${esc(a.points.join(', '))}</b><p class="small">Estos puntos se interpretaron bajo el supuesto de una adulta no embarazada. Si está embarazada, en trabajo de parto o en el posparto, selecciona el contexto; en ese caso no se generan las notas específicas de adultos.</p></div></div>`).join('')}
      <div class="panel"><p class="small muted" style="margin-bottom:6px">Marcador: ● arterial · ■ venosa · ▲ capilar · hueco = advertencia de calidad de la muestra. Línea vertical discontinua: evento. La línea entre puntos es una unión visual; los valores intermedios no son mediciones. La línea sigue la tabla de comparación: los valores no comparables no se unen; una comparación con advertencia se muestra con línea discontinua y una etiqueta breve.</p>
        <div class="grid2">${panels.join('')}</div></div>
      ${S.comparisons.map(cmpHTML).join('')}
      <div class="row" style="margin-top:12px">${ptLinks}</div>
      <p class="small muted" style="margin-top:10px">Versión de reglas ${esc(S.version)}.</p>`;
  }
  function serialTeachingHTML(c, edited) {
    const t = c.teaching;
    if (!t) return '';
    const titles = ["¿Qué ha cambiado en el paciente?", "¿Qué indican los valores?", "¿Cómo lo evaluamos?"];
    const lesson = `<div class="serial-lesson" data-original-teaching>
      <div class="serial-lesson-steps">${t.sections.map((p, i) => `<section><h3 class="h-sm"><span class="step-number">${i + 1}</span>${titles[i]}</h3><p>${esc(p.text)}</p></section>`).join('')}</div>
      <div class="serial-question"><h3 class="h-sm">Ponga a prueba su comprensión</h3><p>${esc(t.question.text)}</p><details data-teaching-answer><summary>Mostrar respuesta</summary><p>${esc(t.answer.text)}</p></details></div>
      <p class="note" data-takeaway><b>Idea clave:</b> ${esc(t.takeaway.text)}</p>
      <p class="small muted">Fuentes: ${cite(t.kaynaklar)}</p></div>`;
    return `<div class="panel serial-teaching"><span class="synthetic">Caso educativo simulado</span><h2 class="h-sm" style="margin-top:10px">${esc(c.id)} · ${esc(c.baslik)}</h2>
      ${edited ? `<p class="note" data-case-edited>Ha modificado los datos del caso. Los cálculos siguientes usan sus nuevos datos; la explicación original corresponde a los datos iniciales.</p><button type="button" class="btn ghost sm" id="serRestore">Restaurar caso original</button><details class="original-case"><summary>Leer la explicación del caso original</summary>${lesson}</details>` : lesson}
      ${c.baglam || c.eslesme || c.atlas_notu ? `<details class="small"><summary>Notas sobre los datos del caso</summary>${c.baglam ? `<p>${esc(c.baglam)}</p>` : ''}${c.eslesme ? r8MapHTML(c) : ''}${c.atlas_notu ? `<p>${esc(c.atlas_notu)}</p>` : ''}</details>` : ''}</div>`;
  }
  function viewSerial(caseId) {
    if (caseId && !serialLoad(caseId)) caseId = null;
    if (!SS) SS = serialDefault();
    const c = SS.caseId && serialCase(SS.caseId);
    view.innerHTML = `<div class="wrap page-head"><p class="eyebrow">Evaluación seriada</p><h1>Gasometrías seriadas</h1>
      <p class="lede">Elija un caso para explorar los cambios del paciente, lo que revela la gasometría y el siguiente paso de evaluación. Modifique los valores para comparar nuevos resultados. <a href="#/ogren/s-ayni-seyi-mi">Leer la lección</a></p></div>
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
    const tabs = [['', "Fórmulas"], ['profiller', "Perfiles de umbral"], ['girdiler', "Diccionario de entradas"], ['kurallar', "Reglas"], ['senaryolar', "Escenarios"]];
    const GVT = {derleme_fizyoloji: "Fisiología de revisión", baglamsal_uyari: "Advertencia contextual", kilavuz_hedefi: "Objetivo de guía", ozel_kilavuz_hedefi: "Objetivo de guía, contexto específico", derleme_hedefi: "Objetivo de revisión", klinik_gorus: "Opinión clínica", kohort_gozlemi: "Observación de cohorte", kosullu_risk_akisi: "Flujo de riesgo condicional"};
    /* Profil alan adları görünen etikete çevrilir (anahtar paketteki gibi kalır) */
    const PKL = {ph: 'pH', otomatik_normal: "Etiqueta normal automática", paco2_mmHg: "PaCO₂ (mmHg)", hco3_mmol: "HCO₃ (mmol/L)", anlam: "Significado", spo2_yuzde: "SpO₂ (%)", kosul: "Condición", pao2_mmHg: "PaO₂ (mmHg)",
      varsayilan: "Predeterminado", n: 'n', laktat_medyan: "Lactato mediano", laktat_ge2_yuzde: "Lactato ≥2 (%)", laktat_ge4_yuzde: "Lactato ≥4 (%)", normal_aralik_degil: "No es un rango normal", ifade: "Expresión", sonuc: "Resultado"};
    const YB = v => v === true ? "Sí" : v === false ? "No" : String(v);
    const gprof = x => Object.entries(x).filter(([k]) => !['id', 'tur', 'kaynaklar'].includes(k)).map(([k, v]) => `${esc(PKL[k] || k.replace(/_/g, ' '))}: ${esc(Array.isArray(v) ? v.join('–') : YB(v))}`).join('<br>');
    const tst = name => { const x = TESTS && TESTS.tests.find(y => y.name === name); return x ? (x.ok ? "✓ superada" : "✗ fallida") : '–'; };
    const VT = {tani_oksijenasyon_bileseni: "Componente de criterio diagnóstico", siddet: "Umbral de gravedad", tedavi_hedefi: "Objetivo terapéutico", tedavi_kosulu: "Condición terapéutica", tani_bilesenleri: "Componentes diagnósticos", referans_araligi_ornegi: "Intervalo de referencia (muestra del estudio)", kohort_ortalama_SD: "Media de la cohorte ± DE"};
    const profVal = x => x.ifade ? esc(x.ifade) : x.araliklar ? Object.entries(x.araliklar).map(([k, v]) => `${esc(k.replace(/_/g, ' '))}: ${v.join('–')}`).join('<br>') : x.dakika_spo2_yuzde ? Object.entries(x.dakika_spo2_yuzde).map(([k, v]) => `${k}.º min: ${pct(v[0], v[1])}`).join('<br>') : [x.ph && `pH ${x.ph[0]} ± ${x.ph[1]}`, x.pco2_mmHg && `PCO₂ ${x.pco2_mmHg[0]} ± ${x.pco2_mmHg[1]} mmHg`].filter(Boolean).join('<br>');
    let body;
    if (sub === 'girdiler') body = `<div class="tbl"><table><thead><tr><th>ID</th><th>Etiqueta</th><th>Tipo</th><th>Unidad / opción</th><th>Uso</th></tr></thead><tbody>${C.inputs.map(x => `<tr><td><code>${esc(x.id)}</code></td><td>${esc(x.etiket)}</td><td>${esc(x.tur)}</td><td class="small">${esc(x.birim_veya_secenekler)}</td><td class="small">${esc(x.gerekli_oldugu_modul)}</td></tr>`).join('')}</tbody></table></div>
      <p class="small muted" style="margin-top:8px">Los identificadores y las listas de opciones son los códigos originales del paquete; no se traducen.</p><h2 class="h-sm" style="margin:28px 0 10px">Campos adicionales de la segunda ronda (pediatría y neonatos)</h2><div class="tbl"><table><thead><tr><th>ID</th><th>Unidad</th><th>Uso</th><th>Regla</th></tr></thead><tbody>${C.ped.inputs.map(x => `<tr><td><code>${esc(x.id)}</code></td><td class="small">${esc(x.birim)}</td><td class="small">${esc(x.kullanim)}</td><td class="small">${esc(x.kural)}</td></tr>`).join('')}</tbody></table></div>
      <h2 class="h-sm" style="margin:28px 0 10px">Campos adicionales de la tercera ronda (embarazo)</h2><div class="tbl"><table><thead><tr><th>ID</th><th>Unidad</th><th>Descripción</th></tr></thead><tbody>${C.preg.inputs.map(x => `<tr><td><code>${esc(x.id)}</code></td><td class="small">${esc(x.birim)}</td><td class="small">${esc(x.aciklama)}</td></tr>`).join('')}</tbody></table></div><p class="note" style="margin-top:12px">El sitio tiene además estos campos de producto: intervalo de referencia de la AG (inferior/superior), hora de la bioquímica e información de misma muestra, tipo de soporte de oxígeno, normotermia, sospecha de dishemoglobina, muestra de seguimiento de CAD, tolerancia HH opcional. Se añadieron para aplicar las condiciones del paquete.</p>`;
    else if (sub === 'profiller') body = `<p class="note" style="margin-bottom:12px">El intervalo de referencia, la media de cohorte, el objetivo terapéutico y el umbral diagnóstico/de gravedad son tipos de datos distintos. Las referencias de estudios y los valores de cohorte nunca se asignan por defecto a ningún paciente.</p><div class="tbl"><table><thead><tr><th>ID</th><th>Tipo de dato</th><th>Perfil</th><th>Valor</th><th>¿Puede asignarse por defecto?</th><th>Fuente</th></tr></thead><tbody>${C.ped.profiles.map(x => `<tr><td><code>${esc(x.id)}</code></td><td><b>${esc(VT[x.veri_turu] || x.veri_turu)}</b></td><td class="small">${esc(x.profil.replace(/_/g, ' '))}</td><td class="small">${profVal(x)}</td><td>${x.varsayilan_atanabilir === false ? "No" : '–'}</td><td>${cite(x.kaynaklar)}</td></tr>`).join('')}</tbody></table></div>
      <h2 class="h-sm" style="margin:28px 0 10px">Perfiles de embarazo (tercera ronda)</h2><div class="tbl"><table><thead><tr><th>ID</th><th>Tipo de dato</th><th>Valores y condición</th><th>Fuente</th></tr></thead><tbody>${C.preg.profiles.map(x => `<tr><td><code>${esc(x.id)}</code></td><td><b>${esc(GVT[x.tur] || x.tur)}</b></td><td class="small">${gprof(x)}${x.id === 'G-E03' ? "<br><b>Significado en la aplicación:</b> 35–40 mmHg es un ejemplo dado en la fuente; no es el límite superior de la advertencia. En el sitio, en la embarazada sintomática 35–40 mmHg se muestra como \"elevación relativa\", y por encima de 40 mmHg con un mensaje separado y más destacado, independientemente de los síntomas; esto no es un umbral nuevo." : ''}</td><td>${cite(x.kaynaklar)}</td></tr>`).join('')}</tbody></table></div>`;
    else if (sub === 'senaryolar') body = `<h2 class="h-sm" style="margin:0 0 10px">Ejemplos de límites de datos de las rondas 8–10 (E01–E30)</h2><p class="note" style="margin-bottom:12px">Propuestas de aceptación del paquete; cada una se convirtió en una prueba del motor. El número de filas no es el número de pruebas.</p><div class="tbl" style="margin-bottom:28px"><table><thead><tr><th>ID</th><th>Entrada</th><th>Esperado</th><th>Prueba</th></tr></thead><tbody>${C.r810.edges.map(x => `<tr><td><code>${esc(x.id)}</code></td><td class="small">${esc(x.girdi)}</td><td class="small">${esc(x.beklenen)}</td><td>${tst('8–10 sınır ' + x.id)}</td></tr>`).join('')}</tbody></table></div><p class="small muted" style="margin-bottom:8px">Las columnas de entrada y resultado esperado son códigos legibles por máquina del paquete; los nombres de campo y los valores se muestran con sus códigos originales (en turco).</p><p class="note" style="margin-bottom:12px">24 escenarios sintéticos de aceptación. La mayoría no son gasometrías completas, sino entradas parciales que ponen a prueba el límite de una regla; las variables faltantes no se suponen normales. Cada uno se convirtió en una prueba del motor.</p><div class="tbl"><table><thead><tr><th>ID</th><th>Escenario</th><th>Entrada</th><th>Esperado</th><th>Fuente</th><th>Prueba</th></tr></thead><tbody>${C.ped.cases.map(x => `<tr><td><code>${esc(x.id)}</code></td><td>${esc(x.baslik)}</td><td class="small"><code>${esc(JSON.stringify(x.girdi))}</code></td><td class="small"><code>${esc(JSON.stringify(x.beklenen))}</code></td><td>${x.kaynaklar.length ? cite(x.kaynaklar) : "Aritmética / seguridad de datos"}</td><td>${tst('senaryo ' + x.id)}</td></tr>`).join('')}${C.preg.cases.map(x => `<tr><td><code>${esc(x.id)}</code></td><td>${esc(x.baslik)}</td><td class="small"><code>${esc(JSON.stringify(x.girdi))}</code></td><td class="small"><code>${esc(JSON.stringify(x.beklenen))}</code></td><td>${x.kaynaklar.length ? cite(x.kaynaklar) : "Aritmética / seguridad de datos"}</td><td>${tst('senaryo ' + x.id)}</td></tr>`).join('')}</tbody></table></div>`;
    else if (sub === 'kurallar') body = `<div class="tbl"><table><thead><tr><th>ID</th><th>Situación</th><th>Comportamiento esperado</th><th>Tipo</th><th>Fuente</th><th>Prueba</th></tr></thead><tbody>${C.rules.map(r => { const tr = TESTS && TESTS.tests.find(x => x.name === 'kural ' + r.id); return `<tr><td><code>${esc(r.id)}</code></td><td>${esc(r.kosul)}</td><td>${esc(r.davranis)}</td><td class="small">${esc(r.tur)}</td><td>${r.kaynak_ids.length ? cite(r.kaynak_ids) : "Decisión de producto"}</td><td>${tr ? (tr.ok ? "✓ superada" : "✗ fallida") : '–'}</td></tr>`; }).join('')}</tbody></table></div>
      <h2 class="h-sm" style="margin:28px 0 10px">Reglas de pediatría y neonatos (segunda ronda)</h2><div class="tbl"><table><thead><tr><th>ID</th><th>Desencadenante</th><th>Comportamiento</th><th>Fuente</th><th>Prueba</th></tr></thead><tbody>${C.ped.rules.map(r => `<tr><td><code>${esc(r.id)}</code></td><td>${esc(r.tetik)}</td><td>${esc(r.sonuc)}</td><td>${r.kaynaklar.length ? cite(r.kaynaklar) : "Decisión de producto"}</td><td>${tst('kural ' + r.id)}</td></tr>`).join('')}</tbody></table></div><p class="small muted" style="margin-top:8px">Naturaleza: reglas de producto que aplican los límites de las fuentes.</p>
      <h2 class="h-sm" style="margin:28px 0 10px">Reglas de riñón/diálisis, toxicología y trastornos mixtos (rondas 8–10)</h2><p class="small muted" style="margin-bottom:8px">Todas son, según la etiqueta del paquete, <b>inferencias de implementación</b>: reglas de producto derivadas de los límites de las fuentes; no son algoritmos clínicos validados por las guías. Cada regla se probó con un ejemplo positivo y uno negativo.</p><div class="tbl"><table><thead><tr><th>ID</th><th>Condición</th><th>Se muestra</th><th>No se genera</th><th>Fuente</th><th>Prueba</th></tr></thead><tbody>${C.r810.rules.map(r => `<tr><td><code>${esc(r.id)}</code></td><td>${esc(r.kosul)}</td><td>${esc(r.goster)}</td><td>${esc(r.uretilmemeli)}</td><td>${cite(r.kaynaklar)}</td><td>${tst('8–10 kural ' + r.id)}</td></tr>`).join('')}</tbody></table></div>
      <h2 class="h-sm" style="margin:28px 0 10px">Reglas de EPOC e hipercapnia (séptima ronda, adultos)</h2><p class="small muted" style="margin-bottom:8px">Son reglas de producto. El coeficiente crónico se mantuvo en 0,35; las condiciones de ERS/ATS y BTS no se fusionaron.</p><div class="tbl"><table><thead><tr><th>ID</th><th>Condición</th><th>Se muestra</th><th>No se genera</th><th>Fuente</th><th>Prueba</th></tr></thead><tbody>${C.koah.rules.map(r => `<tr><td><code>${esc(r.id)}</code></td><td>${esc(r.kosul)}</td><td>${esc(r.gosterilir)}</td><td>${esc(r.uretilmez)}</td><td>${r.kaynaklar.length ? cite(r.kaynaklar) : "Regla de producto"}</td><td>${tst('KOAH kural ' + r.id)}</td></tr>`).join('')}</tbody></table></div>
      <h2 class="h-sm" style="margin:28px 0 10px">Reglas de evaluación seriada (sexta ronda)</h2><div class="tbl"><table><thead><tr><th>ID</th><th>Situación</th><th>Se muestra</th><th>No se genera</th><th>Fuente</th><th>Prueba</th></tr></thead><tbody>${C.serial.rules.map(r => `<tr><td><code>${esc(r.id)}</code></td><td>${esc(r.durum)}</td><td>${esc(r.gosterilir)}</td><td>${esc(r.uretilmez)}</td><td>${r.kaynaklar.length ? cite(r.kaynaklar) : "Aritmética / regla de producto"}</td><td>${tst('seri kural ' + r.id)}</td></tr>`).join('')}</tbody></table></div>
      <h2 class="h-sm" style="margin:28px 0 10px">Reglas de muestra y medición (quinta ronda)</h2><div class="tbl"><table><thead><tr><th>ID</th><th>Desencadenante</th><th>Comportamiento</th><th>Naturaleza</th><th>Fuente</th><th>Prueba</th></tr></thead><tbody>${C.sample.rules.map(r => `<tr><td><code>${esc(r.id)}</code></td><td>${esc(r.tetik)}</td><td>${esc(r.sonuc)}</td><td class="small">${esc(r.nitelik)}</td><td>${r.kaynaklar.length ? cite(r.kaynaklar) : "Regla de producto"}</td><td>${tst('numune ' + r.id)}</td></tr>`).join('')}</tbody></table></div>
      <h2 class="h-sm" style="margin:28px 0 10px">Reglas de embarazo (tercera ronda)</h2><div class="tbl"><table><thead><tr><th>ID</th><th>Desencadenante</th><th>Comportamiento</th><th>Fuente</th><th>Prueba</th></tr></thead><tbody>${C.preg.rules.map(r => `<tr><td><code>${esc(r.id)}</code></td><td>${esc(r.tetik)}</td><td>${esc(r.sonuc)}</td><td>${r.kaynaklar.length ? cite(r.kaynaklar) : "Decisión de producto"}</td><td>${tst('kural ' + r.id)}</td></tr>`).join('')}</tbody></table></div>`;
    else body = `<div class="panel" style="margin-bottom:14px"><h3 class="h-sm">Límites de uso en el embarazo (tercera ronda)</h3><p class="small">La tercera ronda no añade ninguna fórmula nueva; define el límite de los cuatro cálculos existentes en el embarazo.</p><ul class="ask">${C.preg.formulas.map(f => `<li><b>${esc(f.ad)}</b> <code>${esc(f.id)}</code>: ${esc(f.kisit)} ${cite(f.kaynaklar)}</li>`).join('')}<li class="small muted">Nota: en el enunciado de G-F03 la referencia de albúmina figura como 4 g/dL; como en el primer paquete, el sitio exige que la referencia la introduzca el laboratorio y no usa un valor por defecto silencioso.</li></ul></div><div class="flist">${[...C.formulas, ...PFORM, ...C.r810.formulas].map(f => `<article class="fcard" id="f-${f.id}"><h3>${esc(f.ad)} <code>${esc(f.id)}</code></h3><div class="expr">${esc(f.ifade)} <span class="muted">→ ${esc(f.sonuc_birimi)}</span></div>
      <div><h4>Condición de aplicación</h4><p>${esc(f.uygulama_kosullari)}</p></div><div><h4>Limitación</h4><p>${esc(f.sinirlamalar)}</p></div>
      <p class="small muted" style="grid-column:1/-1">Fuente: ${cite(f.kaynak_ids)} · ${esc(f.durum)}</p></article>`).join('')}</div>`;
    view.innerHTML = `<div class="wrap page-head"><p class="eyebrow">Fórmulas y reglas</p><h1>Fórmulas</h1><p class="lede">Cada cálculo que usa el motor, con sus condiciones y límites. Cuando no se cumple una condición, el cálculo no se realiza y se muestra el motivo. Los coeficientes de compensación difieren entre fuentes.</p>
      <nav class="subtabs">${tabs.map(([k, l]) => `<a href="#/formuller${k ? '/' + k : ''}"${(sub || '') === k ? " aria-current=\"page\"" : ''}>${l}</a>`).join('')}</nav></div><div class="wrap page">${body}</div>`;
  }

  /* ================= Kaynaklar ================= */
  function srcItem(n) {
    const s = SRC[n]; if (!s) return '';
    return `<li id="src-${n}"><span class="no">${n}</span><span class="t">${esc(s.baslik)}</span><span class="m">${esc([s.yazarlar, s.yayin, s.yil].filter(Boolean).join(' · '))}${s.doi ? ` · DOI <a href="https://doi.org/${esc(s.doi)}" target="_blank" rel="noopener">${esc(s.doi)}</a>` : s.url ? ` · <a href="${esc(s.url)}" target="_blank" rel="noopener">fuente oficial</a>` : ''}${s.pmid ? ` · PMID ${esc(s.pmid)}` : ''}</span><span class="acc">${s.kanit_turu ? `Tipo de evidencia: ${esc(s.kanit_turu)} · ` : ''}Acceso: ${esc(s.erisim)}</span></li>`;
  }
  function viewSources(n) {
    view.innerHTML = `<div class="wrap page-head"><p class="eyebrow">Fuentes</p><h1>Fuentes</h1><p class="lede">${C.sources.length} fuentes: [1]–[20] primera ronda, [21]–[40] pediatría y neonatos, [41]–[57] embarazo, [58]–[78] muestra y medición, [79]–[88] evaluación seriada, [89]–[103] EPOC e hipercapnia, [104]–[132] riñón/diálisis, toxicología y trastornos mixtos; fecha de control: 7 de octubre de 2026. Los números pertenecen solo a este atlas; los registros de la primera ronda no se volvieron a revisar en la segunda ronda. Las fuentes leídas a texto completo y aquellas de las que solo se revisó el resumen se indican por separado; verificar la identidad de una fuente no significa que se haya revisado su texto completo.</p></div>
      <div class="wrap"><h2 class="h-sm" style="margin-bottom:10px">Primera ronda: adultos</h2><ol class="srclist" style="padding-bottom:20px">${C.sources.filter(s => s.id <= 20).map(s => srcItem(s.id)).join('')}</ol><h2 class="h-sm" style="margin-bottom:10px">Segunda ronda: pediatría y neonatos</h2><ol class="srclist" style="padding-bottom:20px">${C.sources.filter(s => s.id > 20 && s.id <= 40).map(s => srcItem(s.id)).join('')}</ol><h2 class="h-sm" style="margin-bottom:10px">Tercera ronda: embarazo</h2><ol class="srclist" style="padding-bottom:20px">${C.sources.filter(s => s.id > 40 && s.id <= 57).map(s => srcItem(s.id)).join('')}</ol><h2 class="h-sm" style="margin-bottom:10px">Quinta ronda: muestra y medición</h2><p class="small muted" style="margin-bottom:10px">De las 23 fuentes del paquete, dos ya estaban en el atlas (paquete [1] = [1], paquete [2] = [21]); las 21 fuentes restantes se deduplicaron por DOI y se añadieron como [58]–[78]. Los documentos del fabricante no sustituyen a las IFU.</p><ol class="srclist" style="padding-bottom:20px">${C.sources.filter(s => s.id > 57 && s.id <= 78).map(s => srcItem(s.id)).join('')}</ol><h2 class="h-sm" style="margin-bottom:10px">Sexta ronda: evaluación seriada</h2><p class="small muted" style="margin-bottom:10px">De las 23 fuentes del paquete, 13 ya estaban en el atlas (emparejadas por DOI, URL o título: SSC 2026 adultos [10] y niños [34], RDS europea 2025 [24], PALICC-2 [22], etc.); las 10 fuentes restantes se añadieron como [79]–[88]. El documento KDIGO 2026 AKI/AKD es un borrador y no se usó como fuente de reglas.</p><ol class="srclist" style="padding-bottom:20px">${C.sources.filter(s => s.id > 78 && s.id <= 88).map(s => srcItem(s.id)).join('')}</ol><h2 class="h-sm" style="margin-bottom:10px">Séptima ronda: EPOC e hipercapnia (adultos)</h2><p class="small muted" style="margin-bottom:10px">De las 18 fuentes del paquete, 4 ya estaban en el atlas y se emparejaron por DOI (BTS/ICS hipercapnia [83], BTS oxígeno [52], estándar de calidad de VNI de la BTS [88], McKeever gasometría venosa [71]); las 14 fuentes restantes se añadieron como [89]–[102]. [103] (Yi 2023, revisión sobre alcalosis poshipercápnica) se añadió a partir del informe de control independiente 1.6 y sirvió de fundamento para restringir K-R09. GOLD 2026 [89] es solo un registro de actualidad de la publicación; no se presenta como si se hubiera leído su texto completo y no se convirtió en fuente de reglas numéricas.</p><ol class="srclist" style="padding-bottom:20px">${C.sources.filter(s => s.id > 88 && s.id <= 103).map(s => srcItem(s.id)).join('')}</ol><h2 class="h-sm" style="margin-bottom:10px">Rondas 8–10: riñón/diálisis, toxicología, trastornos mixtos</h2><p class="small muted" style="margin-bottom:10px">De las 39 fuentes del paquete, 10 ya estaban en el atlas y se emparejaron por DOI, URL o título (KDIGO 2012 AKI [84], página de estado KDIGO 2026 [85], CDC CO [13], metahemoglobinemia [14], SRLF/SFMU (Jung) [79], Figge [7], Achanti &amp; Szerlip [3], González [91], Yi [103], Kraut [8]); las 29 fuentes restantes se añadieron como [104]–[132]. El tipo de evidencia y el nivel de acceso de cada registro se indicaron por separado; el acceso al resumen no se presenta como lectura del texto completo. El documento KDIGO 2026 AKI/AKD sigue siendo un borrador y no se convirtió en fuente de reglas.</p><ol class="srclist">${C.sources.filter(s => s.id > 103).map(s => srcItem(s.id)).join('')}</ol></div>`;
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
