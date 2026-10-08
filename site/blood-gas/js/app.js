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
  const PFORM = C.ped.formulas.map(f => ({id: f.id, ad: f.ad, ifade: f.ifade, sonuc_birimi: f.sonuc, uygulama_kosullari: f.kosullar.join('; '), sinirlamalar: f.sonuc, kaynak_ids: f.kaynaklar, durum: 'Araştırma tanımı (ikinci tur)'}));
  const FORM = Object.fromEntries([...C.formulas, ...PFORM].map(f => [f.id, f]));
  /* [R18-01] Ca oranı gösterimi: 2 basamakta 2,5'e yuvarlanıp karar tersine düşüyorsa yeterli basamak ve açıklama gösterilir */
  const caFmt = m => { const r2 = n2(m.ratio), looksBoundary = Math.abs(Math.round(m.ratio * 100) - 250) === 0;
    return looksBoundary && !m.exactly2_5 ? `${num(m.ratio, 6)} (2,5'in ${m.atOrAbove2_5 ? 'üstünde' : 'altında'}; iki basamağa yuvarlanmış gösterim karara girmez)` : r2; };
  /* Yüzde: Türkçede işaret önde (%94–98), İngilizcede sonda (94–98%), İspanyolcada boşlukla sonda (94–98 %) */
  const pct = (a, b) => { const v = b == null ? a : `${a}–${b}`; return KGI.lang === 'tr' ? '%' + v : KGI.lang === 'es' ? v + ' %' : v + '%'; };
  const R8FORM = Object.fromEntries(C.r810.formulas.map(f => [f.id, f]));
  const R8G = {renal: 'Böbrek ve diyaliz (8. tur)', tox: 'Toksikoloji (9. tur)', mixed: 'Karma asit–baz bozuklukları (10. tur)'};
  const cite = ids => [...new Set(ids)].sort((a, b) => a - b).map(n => `<a class="cite" href="#/kaynaklar/${n}" title="${esc(SRC[n] ? SRC[n].baslik : '')}">[${n}]</a>`).join(' ');
  const n1 = v => num(v, 1), n2 = v => num(v, 2);

  /* ================= Alanlar ================= */
  const YN = [['unknown', 'Bilinmiyor'], ['yes', 'Evet'], ['no', 'Hayır']];
  const OPT = {
    sample_type: [['unknown', 'Seçin (bilinmiyor)'], ['arterial', 'Arteriyel'], ['peripheral_venous', 'Periferik venöz'], ['central_venous', 'Santral venöz'], ['mixed_venous', 'Karışık venöz'], ['capillary', 'Kapiller'], ['cord_artery', 'Kordon arter'], ['cord_vein', 'Kordon ven'], ['cord_unknown', 'Kordon, damarı belirsiz'], ['circuit', 'Devre (ECMO/baypas)']],
    age_group: [['', 'Seçin'], ['adult', 'Erişkin'], ['pediatric', 'Çocuk'], ['neonatal', 'Yenidoğan']],
    care_context: [['unknown', 'Bilinmiyor'], ['delivery', 'Doğum salonu'], ['nicu', 'Yenidoğan yoğun bakım'], ['picu', 'Çocuk yoğun bakım'], ['other', 'Diğer']],
    sample_site: [['unknown', 'Bilinmiyor'], ['right_radial', 'Sağ radial (preduktal)'], ['umbilical_artery', 'Umbilikal arter (postduktal)'], ['other', 'Diğer']],
    perfusion: [['unknown', 'Bilinmiyor'], ['good', 'İyi'], ['poor', 'Bozuk']],
    pregnancy: [['unknown', 'Bilinmiyor'], ['no', 'Yok'], ['yes', 'Var']],
    temperature_reporting: [['unknown', 'Bilinmiyor'], ['37C_uncorrected', '37 °C, düzeltilmemiş'], ['temperature_corrected', 'Hasta sıcaklığına düzeltilmiş'], ['mixed', 'Karışık (düzeltilmiş + düzeltilmemiş)']],
    be_type: [['unknown', 'Bilinmiyor'], ['BE_blood', 'BE, kan (gerçek BE)'], ['BE_ECF', 'BE, hücre dışı sıvı (standart BE, SBE)'], ['BD_blood', 'BD (baz açığı), kan'], ['BD_ECF', 'BD (baz açığı), hücre dışı sıvı']],
    chem_same: [['unknown', 'Bilinmiyor'], ['yes', 'Evet, aynı zaman'], ['no', 'Hayır, farklı zaman/örnek']],
    fio2_quality: [['unknown', 'Bilinmiyor'], ['known', 'Biliniyor (ölçülen/ayarlanan)'], ['estimated', 'Tahmini']],
    o2_support: [['unknown', 'Bilinmiyor'], ['room_air', 'Oda havası'], ['supplemental', 'Ek oksijen / solunum desteği']],
    normothermia: YN,
    saturation_type: [['unknown', 'Bilinmiyor'], ['coox_functional', 'Ko-oksimetri, fonksiyonel'], ['coox_fractional', 'Ko-oksimetri, fraksiyonel'], ['calculated', 'Cihazın hesapladığı'], ['spo2', 'SpO₂ (nabız oksimetresi)']],
    dyshb: [['unknown', 'Bilinmiyor'], ['no', 'Yok'], ['yes', 'Var / şüpheli']],
    urine_ketones: [['unknown', 'Bilinmiyor'], ['negative', 'Negatif'], ['trace', 'Eser'], ['1+', '1+'], ['2+', '2+'], ['3+', '3+'], ['4+', '4+'], ['small', 'Küçük'], ['moderate', 'Orta'], ['large', 'Büyük']],
    diabetes_history: [['unknown', 'Bilinmiyor'], ['yes', 'Var'], ['no', 'Yok']],
    vent_type: [['unknown', 'Bilinmiyor'], ['invasive', 'İnvaziv'], ['noninvasive', 'Noninvaziv'], ['other', 'Diğer / yok']],
    spo2_site: [['unknown', 'Bilinmiyor'], ['right_hand', 'Sağ el (preduktal)'], ['right_wrist', 'Sağ el bileği (preduktal)'], ['foot', 'Ayak (postduktal)'], ['other', 'Diğer']],
    signal: [['unknown', 'Bilinmiyor'], ['good', 'İyi'], ['poor', 'Kötü']],
    maternal_context: [['unknown', 'Bilinmiyor'], ['not_pregnant', 'Gebe değil / uygulanamaz'], ['pregnant', 'Gebe'], ['labor', 'Doğum eylemi'], ['postpartum', 'Doğum sonrası'], ['breastfeeding', 'Emziriyor']],
    sample_owner: [['unknown', 'Bilinmiyor'], ['mother', 'Anne'], ['fetus', 'Fetüs (skalp)'], ['cord', 'Kordon']],
    labor_stage: [['unknown', 'Bilinmiyor'], ['none', 'Eylem yok'], ['1', '1. evre'], ['2', '2. evre'], ['3', '3. evre']],
    position: [['unknown', 'Bilinmiyor'], ['sitting', 'Oturur'], ['supine', 'Sırtüstü'], ['left_lateral', 'Sol yan'], ['other', 'Diğer']],
    o2_profile: [['none', 'Seçilmedi'], ['institution', 'Kurum onaylı profil'], ['bts', 'BTS 2017'], ['expert', 'Uzmanın belirlediği']],
    diabetes_type: [['unknown', 'Bilinmiyor'], ['none', 'Yok'], ['t1', 'Tip 1'], ['t2', 'Tip 2'], ['gestational', 'Gestasyonel']],
    fetal_assessment: [['unknown', 'Bilinmiyor'], ['not_done', 'Yapılmadı'], ['reassuring', 'Güven verici'], ['concern', 'Endişe (ör. kategori II/III trase)']],
    pushing: YN, hypercapnia_risk: YN, pump_issue: YN, poor_intake: YN, vomiting: YN, steroid: YN, feels_unwell: YN, infection: YN, organ_dysfunction: YN, sepsis_high_risk: YN, maternal_hypoxia: YN, bleeding: YN, resp_symptoms: YN, pe_suspected: YN,
    q_bubble: [['unknown', 'Bilinmiyor'], ['no', 'Görülmedi'], ['yes', 'Görüldü']], q_heparin: [['unknown', 'Bilinmiyor'], ['dry_balanced', 'Kuru, elektrolit dengeli'], ['liquid', 'Sıvı heparin']],
    q_clot: [['unknown', 'Bilinmiyor'], ['no', 'Görülmedi'], ['yes', 'Görüldü']], q_hemolysis: [['unknown', 'Bilinmiyor'], ['not_measured', 'Ölçülmedi'], ['device_unknown', 'Cihaz özelliği bilinmiyor'], ['negative', 'Negatif'], ['positive', 'Pozitif']],
    q_catheter: YN, q_flush: [['unknown', 'Bilinmiyor'], ['saline', '%0,9 NaCl'], ['glucose', 'Glukozlu sıvı'], ['other', 'Diğer']],
    q_transport: [['unknown', 'Bilinmiyor'], ['hand', 'Elle'], ['pneumatic_validated', 'Pnömatik tüp, yerel olarak doğrulanmış'], ['pneumatic_unvalidated', 'Pnömatik tüp, doğrulanmamış'], ['pneumatic_unknown', 'Pnömatik tüp, doğrulama bilinmiyor']],
    q_storage: [['unknown', 'Bilinmiyor'], ['room', 'Oda sıcaklığı'], ['ice', 'Soğutuldu / buz']], q_device_error: YN, q_manual: YN, q_hydroxocobalamin: YN, q_leukocytosis: YN,
    stable: YN, support_concurrent: YN, pards_confirmed: YN, nards_confirmed: YN, cyanotic_chd: YN, baseline_imv: YN, perinatal_event: YN, neuro: YN, dka_confirmed: YN, rds_confirmed: YN, copd_confirmed: YN, prior_arterial: YN, prior_stable: YN, hc_renal: YN, hc_diuretic: YN, hc_alkali_vomit: YN, hc_chronic_confirmed: YN,
    hc_phase: [['unknown', 'Bilinmiyor'], ['exacerbation', 'Akut alevlenme / akut dönem'], ['stable', 'Stabil dönem']],
    /* 8–10. tur: böbrek, kalsiyum/sitrat, toksikoloji (varsayılan hep "bilinmiyor"/"seçilmedi") */
    renal_context: [['unknown', 'Bilinmiyor'], ['AKI', 'AKI (klinik olarak doğrulanmış)'], ['CKD', 'CKD (klinik olarak doğrulanmış)'], ['AKI_on_CKD', 'CKD üzerine AKI'], ['unspecified', 'Böbrek hastalığı var, türü belirtilmedi'], ['none', 'Yok']],
    krt_modality: [['unknown', 'Bilinmiyor'], ['none', 'KRT yok'], ['IHD', 'Aralıklı hemodiyaliz (IHD)'], ['CKRT', 'Sürekli KRT (CKRT)'], ['prolonged', 'Uzatılmış seans'], ['PD', 'Periton diyalizi']],
    urine_same_sample: YN, diuretic_recent: YN, alkali_given: YN, urine_infection: YN, k_drug_context: YN, rca_confirmed: YN, ca_concurrent: YN, osm_concurrent: YN, lactate_methods_concurrent: YN, tox_suspicion: YN, clinical_worsening: YN,
    calcium_need_trend: [['unknown', 'Bilinmiyor'], ['rising', 'Artıyor'], ['not_rising', 'Artmıyor']],
    total_ca_site: [['unknown', 'Bilinmiyor'], ['systemic', 'Sistemik (hasta)'], ['postfilter', 'Filtre sonrası (devre)']], ionized_ca_site: [['unknown', 'Bilinmiyor'], ['systemic', 'Sistemik (hasta)'], ['postfilter', 'Filtre sonrası (devre)']],
    tox_agent: [['unknown', 'Bilinmiyor / seçilmedi'], ['methanol', 'Metanol'], ['ethylene_glycol', 'Etilen glikol'], ['toxic_alcohol', 'Toksik alkol, türü belirsiz'], ['salicylate', 'Salisilat'], ['metformin', 'Metformin'], ['isopropanol', 'İzopropanol'], ['co', 'Karbonmonoksit'], ['smoke', 'Duman inhalasyonu'], ['propylene_glycol', 'Propilen glikol (çözücü)'], ['other', 'Diğer']],
    tox_acute_chronic: [['unknown', 'Bilinmiyor'], ['acute', 'Akut'], ['chronic', 'Kronik'], ['acute_on_chronic', 'Kronik üzerine akut']],
    tox_antidote: [['unknown', 'Bilinmiyor'], ['none', 'Verilmedi'], ['fomepizole', 'Fomepizol verildi'], ['ethanol', 'Etanol (antidot) verildi'], ['other', 'Diğer']],
    organic_acid_context: [['unknown', 'Bilinmiyor'], ['none', 'Yok'], ['short_bowel', 'Kısa bağırsak (D-laktat riski)'], ['oxoproline', '5-oksoprolin riski (ilaç/malnütrisyon)'], ['propylene_glycol', 'Propilen glikollü infüzyon']],
    acetone: [['unknown', 'Bilinmiyor'], ['not_measured', 'Ölçülmedi'], ['negative', 'Negatif'], ['positive', 'Pozitif']],
    og_profile: [['none', 'Seçilmedi'], ['ideal_4_6', 'İdeal: etanol ÷ 4,6'], ['purssell', 'Ampirik Purssell: etanol ÷ 3,7 − 0,35']],
    salicylate_unit: [['', 'birim?'], ['mg/dL', 'mg/dL'], ['mg/L', 'mg/L']]
  };
  const U = {pco2: ['mmHg', 'kPa'], pao2: ['mmHg', 'kPa'], fio2: [['fraction', 'kesir'], ['percent', '%']], albumin: ['g/dL', 'g/L'], hb: ['g/dL', 'g/L'], saturation: [['percent', '%'], ['fraction', 'kesir']], glucose: ['mg/dL', 'mmol/L'], cord_pco2_art: ['kPa', 'mmHg'],
    total_ca: [['', 'birim?'], 'mmol/L', 'mg/dL'], ionized_ca: [['', 'birim?'], 'mmol/L', 'mg/dL'], salicylate_value: [['', 'birim?'], 'mg/dL', 'mg/L']};
  const LBL = {
    sample_type: 'Örnek türü', age_group: 'Yaş grubu', care_context: 'Bakım bağlamı', sample_site: 'Kan gazı örnek yeri', perfusion: 'Periferik perfüzyon (kapiller)', pregnancy: 'Gebelik', temperature_reporting: 'Sıcaklık raporlaması', sample_time: 'Örnek zamanı', analysis_time: 'Analiz zamanı',
    ph: 'pH', pco2: 'PCO₂', hco3_actual: 'Gerçek HCO₃ (mmol/L)', hco3_standard: 'Standart HCO₃ (mmol/L)', be: 'BE / BD değeri (mmol/L, işaretiyle)', be_type: 'BE / BD algoritması',
    na: 'Na⁺ (mmol/L)', cl: 'Cl⁻ (mmol/L)', tco2: 'Biyokimya TCO₂ (mmol/L)', k: 'K⁺ (mmol/L)', albumin: 'Albümin', chem_same: 'Biyokimya kan gazıyla aynı zamanda mı?', chem_time: 'Biyokimya zamanı',
    gas_hco3_for_ag: 'TCO₂ yoksa AG için kan gazı HCO₃ kullan (ayrı yöntem olarak etiketlenir; delta hesaplanmaz)',
    ag_ref_low: 'AG referans aralığı, alt', ag_ref_high: 'AG referans aralığı, üst', ag_reference: 'AG referans değeri (delta için)', albumin_reference: 'Albümin referansı (g/dL)', hco3_reference: 'HCO₃ başlangıcı (delta için)', hh_tolerance: 'HH toleransı (pH birimi)',
    pao2: 'PO₂', fio2: 'FiO₂', fio2_quality: 'FiO₂ kaynağı', o2_support: 'Oksijen desteği', oxygen_device: 'Cihaz ve akış (serbest metin)', normothermia: 'Normotermi', barometric_mmhg: 'Barometrik basınç (mmHg)',
    baro_sealevel: 'Barometrik basıncı bilmiyorum; deniz seviyesi 760 mmHg varsayımını açıkça seçiyorum', hb: 'Hemoglobin', saturation: 'Satürasyon', saturation_type: 'Satürasyon türü', dyshb: 'COHb/MetHb yüksekliği ya da şüphesi', cohb: 'COHb (%)', methb: 'MetHb (%)',
    lactate: 'Laktat (mmol/L)', glucose: 'Glukoz', beta_hydroxybutyrate: 'β-hidroksibütirat (mmol/L)', urine_ketones: 'İdrar ketonu', diabetes_history: 'Diyabet öyküsü', dka_followup: 'Bu örnek DKA tedavisi sırasında izlem örneği (düzelme ölçütlerini göster)',
    dka_confirmed: 'Klinik olarak doğrulanmış DKA (şiddet tablosu için)',
    clinical_context: 'Klinik bağlam (yalnız sizin notunuz; hesaplara girmez)', support_change_time: 'Son destek değişikliği zamanı',
    birth_time: 'Doğum zamanı', ga_weeks: 'Doğumdaki gestasyon, hafta', ga_days: 'Doğumdaki gestasyon, gün (0–6)', postnatal_days: 'Postnatal yaş, tam gün (doğum zamanı yoksa)', postnatal_minutes: 'Doğumdan sonra dakika (doğum zamanı yoksa)',
    perinatal_event: 'Perinatal olay öyküsü', neuro: 'Nörolojik bozulma / nöbet',
    local_ref_source: 'Yerel referans kaynağı (yaş, örnek türü, analizör, yıl)', ref_ph_low: 'Yerel pH referansı, alt', ref_ph_high: 'Yerel pH referansı, üst', ref_pco2_low: 'Yerel PCO₂ referansı, alt (mmHg)', ref_pco2_high: 'Yerel PCO₂ referansı, üst (mmHg)',
    paw: 'Ortalama HAVA YOLU basıncı (cmH₂O)', support_concurrent: 'FiO₂ ve hava yolu basıncı örnekle eşzamanlı mı?', spo2: 'SpO₂ (%)', spo2_site: 'Oksimetre yeri', signal: 'Oksimetre sinyal kalitesi', stable: 'Kararlı ölçüm (geçici desatürasyon değil)',
    vent_type: 'Ventilasyon türü', pards_confirmed: 'Klinik PARDS tanısı doğrulandı mı?', pards_hours: 'PARDS tanısından bu yana saat', cyanotic_chd: 'Siyanotik doğumsal kalp hastalığı', baseline_imv: 'Başlangıçtan beri invaziv ventilasyon (kronik akciğer hastalığı)',
    nards_confirmed: 'NARDS bağlamı doğrulandı mı? (RDS, geçici takipne, anomaliler dışlandı)',
    rds_confirmed: 'Klinik RDS tanısı doğrulandı mı?',
    copd_confirmed: 'KOAH tanısı spirometriyle doğrulanmış mı?', hc_phase: 'Klinik dönem', prior_pco2: 'Önceki gazda PCO₂ (mmHg)', prior_hco3: 'Önceki gazda HCO₃ (mmol/L)',
    prior_arterial: 'Önceki gaz arteriyel miydi?', prior_stable: 'Önceki gaz stabil dönemde mi alındı?', hc_renal: 'Böbrek yetmezliği / diyaliz', hc_diuretic: 'Diüretik kullanımı', hc_alkali_vomit: 'Alkali alımı ya da kusma', hc_chronic_confirmed: 'Önceki kronik hiperkapni klinik olarak doğrulandı mı?',
    maternal_context: 'Gebelik bağlamı', sample_owner: 'Örnek kime ait?', labor_stage: 'Eylem evresi', pushing: 'Ikınma', postpartum_hours: 'Doğumdan bu yana saat', position: 'Pozisyon', altitude_m: 'Rakım (m)',
    resp_symptoms: 'Solunumsal belirti (dispne vb.)', pe_suspected: 'Pulmoner emboli şüphesi', maternal_hypoxia: 'Anne hipoksisi', fetal_assessment: 'Fetal değerlendirme', bleeding: 'Kanama',
    o2_profile: 'Oksijen hedefi profili', hypercapnia_risk: 'Hiperkapnik solunum yetmezliği riski', o2_target_low: 'Profil hedefi SpO₂ alt (%)', o2_target_high: 'Profil hedefi SpO₂ üst (%)',
    infection: 'Enfeksiyon şüphesi', organ_dysfunction: 'Açıklanamayan organ bozukluğu', sepsis_high_risk: 'Klinik yüksek risk (sepsis)', sbp: 'Sistolik basınç (mmHg)',
    diabetes_type: 'Diyabet türü', pump_issue: 'İnsülin pompası sorunu / insülin kesilmesi', poor_intake: 'Beslenme azalması / açlık', vomiting: 'Kusma', steroid: 'Steroid maruziyeti', feels_unwell: 'Kendini kötü hissediyor',
    q_bubble: 'Hava kabarcığı', q_heparin: 'Heparin türü', q_clot: 'Pıhtı', q_hemolysis: 'Hemoliz', q_catheter: 'Örnek kateterden mi alındı?', q_flush: 'Kateter yıkama sıvısı',
    q_transport: 'Taşıma', q_storage: 'Bekleme / saklama', protocol_minutes: 'Kurumun onaylı analiz süresi (dk; protokolünüzden)', q_device_error: 'Cihaz hata kodu / ölçüm sınırı dışı sonuç',
    q_manual: 'Değerler elle aktarıldı', q_hydroxocobalamin: 'Hidroksokobalamin uygulandı', q_leukocytosis: 'Belirgin lökositoz', cord_clamp_time: 'Kordon klempleme zamanı',
    cord_ph_art: 'Kordon arter pH', cord_ph_ven: 'Kordon ven pH', cord_pco2_art: 'Kordon arter PCO₂', cord_pco2_ven: 'Kordon ven PCO₂',
    hco3_actual_not_standard: 'Gerçek HCO₃ (standart HCO₃ yerine kullanılmaz)', ag: 'Anyon açıklığı', ref_ph: 'Yerel, yaşa ve örneğe özgü pH referansı', oi: 'OI',
    renal_context: 'Böbrek bağlamı (klinik olarak doğrulanmış)', krt_modality: 'KRT (diyaliz) durumu', k_drug_context: 'Potasyumu etkileyebilecek ilaç öyküsü',
    urine_na: 'İdrar Na⁺ (mmol/L)', urine_k: 'İdrar K⁺ (mmol/L)', urine_cl: 'İdrar Cl⁻ (mmol/L)', urine_same_sample: 'Üç idrar elektroliti aynı örnekten mi?', urine_ph: 'İdrar pH', diuretic_recent: 'Yakın zamanda diüretik', alkali_given: 'Alkali verildi', urine_infection: 'İdrar enfeksiyonu bağlamı',
    total_ca: 'Total Ca', ionized_ca: 'İyonize Ca (iCa)', total_ca_unit: 'Total Ca birimi', ionized_ca_unit: 'iCa birimi', total_ca_site: 'Total Ca örnek yeri', ionized_ca_site: 'iCa örnek yeri', ca_concurrent: 'Total Ca ve iCa eşzamanlı mı?',
    rca_confirmed: 'Bölgesel sitrat antikoagülasyonu (RCA) uygulanıyor mu?', calcium_need_trend: 'Kalsiyum gereksinimi trendi',
    tox_suspicion: 'Toksik maruziyet şüphesi', tox_agent: 'Şüphelenilen madde', tox_acute_chronic: 'Maruziyet: akut / kronik', tox_antidote: 'Antidot durumu', clinical_worsening: 'Klinik kötüleşme (bilinç, solunum vb.)',
    measured_osmolality: 'Ölçülen serum osmolalitesi (mOsm/kg)', bun: 'BUN (mg/dL)', urea: 'Üre (mmol/L) — BUN ile birlikte girmeyin', ethanol: 'Etanol (mg/dL; ölçülmediyse boş bırakın)', osm_concurrent: 'Osmolalite ve bileşenler eşzamanlı mı?', og_profile: 'Etanol katkısı profili (laboratuvarınıza göre)',
    glucose_unit: 'Glukoz birimi', salicylate_value: 'Salisilat düzeyi', salicylate_unit: 'Salisilat birimi', lactate_method_a: 'Laktat, yöntem A (mmol/L)', lactate_method_b: 'Laktat, yöntem B (mmol/L)', lactate_methods_concurrent: 'İki laktat aynı/eşzamanlı örnekten mi?',
    organic_acid_context: 'Nadir organik asit bağlamı', acetone: 'Aseton', age_missing: 'Yaş grubu'
  };
  /* Görünürlük: yaş grubu ve örnek türüne göre */
  const isPed = () => S.age_group === 'pediatric' || S.age_group === 'neonatal', isNeo = () => S.age_group === 'neonatal', isAdult = () => S.age_group === 'adult' || !S.age_group;
  const isCord = () => String(S.sample_type).startsWith('cord') || S.sample_owner === 'cord';
  const isPregCtx = () => !isPed() && ['pregnant', 'labor', 'postpartum', 'breastfeeding'].includes(S.maternal_context), isPregLike = () => isPregCtx() && S.maternal_context !== 'breastfeeding';
  const W = (id, when, kind, wide) => ({id, when, kind, wide});
  const GROUPS = [
    {id: 'g1', title: 'Örnek ve hasta', open: true, hint: 'Önce yaş grubunu seçin; erişkin önceden seçili değildir. Bilinmeyen örnek arteriyel varsayılmaz.',
      f: ['age_group', W('care_context', isPed), 'sample_type', W('sample_site', isPed), W('perfusion', () => S.sample_type === 'capillary'), W('maternal_context', () => S.age_group !== 'neonatal'), W('sample_owner', () => ['pregnant', 'labor', 'postpartum'].includes(S.maternal_context)), 'temperature_reporting', W('sample_time', null, 'dt'), W('analysis_time', null, 'dt')]},
    {id: 'gP', title: 'Yenidoğan ve çocuk bağlamı', open: true, when: () => isPed() || isCord(), hint: 'Evrensel çocuk normal değeri yoktur. Yerel, yaşa, örneğe ve analizöre özgü referans girilmedikçe "normal" etiketi verilmez. Çalışmalardaki aralıklar (ör. CALIPER venöz) otomatik atanmaz.',
      f: [W('birth_time', null, 'dt'), W('ga_weeks', () => isNeo() || isCord()), W('ga_days', () => isNeo() || isCord()), W('postnatal_days', isNeo), W('postnatal_minutes', () => isNeo() && S.care_context === 'delivery'), W('perinatal_event', () => isNeo() || isCord()), 'neuro',
        W('local_ref_source', () => isPed() && !isCord(), 'text', true), W('ref_ph_low', () => isPed() && !isCord()), W('ref_ph_high', () => isPed() && !isCord()), W('ref_pco2_low', () => isPed() && !isCord()), W('ref_pco2_high', () => isPed() && !isCord())]},
    {id: 'gG', title: 'Gebelik, eylem ve doğum sonrası', open: true, when: () => isPregCtx() && !isCord(), hint: 'Gebelik derleme aralıkları evrensel normal değildir. Oksijen hedefi kurum ya da uzman profili seçilmeden üretilmez. Anne sonucu fetüs sonucu değildir.',
      f: [W('ga_weeks', isPregLike), W('ga_days', isPregLike), W('labor_stage', () => S.maternal_context === 'labor'), W('pushing', () => S.maternal_context === 'labor'), W('postpartum_hours', () => S.maternal_context === 'postpartum'), W('position', isPregLike), W('altitude_m', isPregLike),
        W('resp_symptoms', isPregLike), W('pe_suspected', isPregLike), W('maternal_hypoxia', isPregLike), W('fetal_assessment', () => S.maternal_context === 'pregnant' || S.maternal_context === 'labor'), W('bleeding', isPregLike), W('spo2', isPregLike),
        W('o2_profile', isPregLike), W('hypercapnia_risk', isPregLike), W('o2_target_low', () => isPregLike() && ['institution', 'expert'].includes(S.o2_profile)), W('o2_target_high', () => isPregLike() && ['institution', 'expert'].includes(S.o2_profile)),
        W('infection', isPregLike), W('organ_dysfunction', isPregLike), W('sepsis_high_risk', isPregLike), W('sbp', isPregLike)]},
    {id: 'gK', title: 'Kordon arter–ven çifti', open: true, when: isCord, hint: 'Arter ve ven ayrı kimliklerle girilir. Çift farkı kalite incelemesidir; damarı belirlemez ve örnekleri yeniden etiketlemez.', f: ['cord_ph_art', 'cord_ph_ven', 'cord_pco2_art', 'cord_pco2_ven']},
    {id: 'gH', title: 'Hiperkapni bağlamı (erişkin, isteğe bağlı)', when: () => isAdult() && !isPregCtx() && !isCord(), hint: 'Hepsi "bilinmiyor" bırakılabilir. Kan gazından KOAH tanısı konmaz; bu alanlar yalnız yorumun sınırını gösterir. Önceki gaz alanlarına stabil dönemdeki bilinen bir gazı girin; sıcaklık ve birim (mmHg) bu örnekle aynı olmalı.',
      f: ['copd_confirmed', 'hc_phase', 'hc_chronic_confirmed', 'prior_pco2', 'prior_hco3', 'prior_arterial', 'prior_stable', 'hc_renal', 'hc_diuretic', 'hc_alkali_vomit', 'spo2']},
    {id: 'g2', title: 'Asit–baz', open: true, hint: 'Gerçek (actual) HCO₃ kullanın; standart HCO₃ ve biyokimya TCO₂ ayrı alanlardır. BE/BD işaretiyle ve algoritmasıyla girilir.', f: ['ph', 'pco2', W('hco3_actual', () => !isCord()), W('hco3_standard', isAdult), 'be', 'be_type']},
    {id: 'g3', title: 'Elektrolitler ve anyon açıklığı', when: () => !isCord(), f: ['na', 'cl', 'tco2', 'k', W('albumin', isAdult), 'chem_same', W('chem_time', null, 'dt'), W('gas_hco3_for_ag', null, 'check')]},
    {id: 'g4', title: 'Yerel referanslar', when: () => !isCord(), hint: 'Kendi laboratuvarınızın değerlerini girin. Site boş alanları varsayılan "normal" değerle doldurmaz; referans yoksa ilgili sınıflama ve delta kapalı kalır.', f: ['ag_ref_low', 'ag_ref_high', W('ag_reference', isAdult), W('albumin_reference', isAdult), W('hco3_reference', isAdult), 'hh_tolerance']},
    {id: 'g5', title: 'Oksijenasyon', when: () => !isCord(), hint: 'PaO₂/FiO₂, OI, A–a ve CaO₂ yalnız arteriyel örnekte hesaplanır. FiO₂ örnek alındığı andaki değer olmalı; birimi açıkça seçin.',
      f: ['pao2', 'fio2', 'fio2_quality', W('o2_support', isAdult), W('oxygen_device', null, 'text', true), W('normothermia', isAdult), W('barometric_mmhg', isAdult), W('baro_sealevel', isAdult, 'check'), W('hb', isAdult), W('saturation', isAdult), W('saturation_type', isAdult), W('dyshb', isAdult), 'cohb', 'methb']},
    {id: 'gO', title: 'OI / OSI ve solunum desteği', open: true, when: () => isPed() && !isCord(), hint: 'OI arteriyel PO₂ ve ortalama HAVA YOLU basıncı ister (ortalama arter basıncı değil). OSI için SpO₂ yüzde girilir (95; 0,95 değil). PALICC-2 (çocuk) ve Montreux (yenidoğan) tabloları ayrıdır.',
      f: ['paw', 'support_concurrent', 'spo2', 'spo2_site', 'signal', 'stable', W('vent_type', isPed), W('rds_confirmed', isNeo), W('pards_confirmed', () => S.age_group === 'pediatric'), W('pards_hours', () => S.age_group === 'pediatric'),
        W('cyanotic_chd', () => S.age_group === 'pediatric'), W('baseline_imv', () => S.age_group === 'pediatric'), W('nards_confirmed', isNeo)]},
    {id: 'gR', title: 'Böbrek bağlamı, KRT ve idrar (isteğe bağlı)', when: () => !isCord(), hint: 'Böbrek bağlamı klinik olarak doğrulanmış bilgidir; kan gazından doldurulmaz ve "bilinmiyor" CKD ya da normal böbrek sayılmaz. İdrar elektrolitleri aynı idrar örneğinden girilir; eksik K sıfır sayılmaz. Site AKI evresi, RTA alt tipi, diyaliz kararı ya da reçete üretmez.',
      f: ['renal_context', 'krt_modality', 'k_drug_context', 'urine_na', 'urine_k', 'urine_cl', 'urine_same_sample', 'urine_ph', 'diuretic_recent', 'alkali_given', 'urine_infection']},
    {id: 'gC', title: 'Kalsiyum ve sitrat (RCA, isteğe bağlı)', when: () => !isCord(), hint: 'Oran yalnız iki sistemik ve açıkça mmol/L girilmiş değerle hesaplanır. Eşzamanlı değilse hesaplanmaz; eşzamanlılık bilinmiyorsa yalnız aritmetik gösterilir ve sitrat bağlamında yorumlanmaz. Filtre sonrası (devre) iCa hasta oranına girmez; birim dönüşümü yapılmaz. RCA kullanımı ayrıca doğrulanır; KRT var diye RCA varsayılmaz.',
      f: ['total_ca', 'total_ca_site', 'ionized_ca', 'ionized_ca_site', 'ca_concurrent', 'rca_confirmed', 'calcium_need_trend']},
    {id: 'gT', title: 'Toksikoloji ve osmolal açıklık (isteğe bağlı)', when: () => !isCord(), hint: 'Şüphe tanı değildir; "bilinmiyor" maruziyet yok demek değildir. Klinik/toksikoloji değerlendirmesi bu formun tamamlanmasını beklemez. OG için glukoz (birimiyle) Diyabetik ketoasidoz bölümünden alınır; etanol ölçülmediyse boş bırakın (0 sayılmaz). BUN ya da üreden yalnız birini girin. Site "normal OG", "dışlandı", antidot ya da diyaliz kararı üretmez.',
      f: ['tox_suspicion', 'tox_agent', 'tox_acute_chronic', 'tox_antidote', 'clinical_worsening', 'measured_osmolality', 'bun', 'urea', 'ethanol', 'osm_concurrent', 'og_profile', 'salicylate_value', 'lactate_method_a', 'lactate_method_b', 'lactate_methods_concurrent', 'organic_acid_context', 'acetone']},
    {id: 'g6', title: 'Laktat', when: () => !isCord(), hint: 'Seri ölçüm için her değeri zamanıyla ekleyin.', f: [W('lactate_series', null, 'series')]},
    {id: 'g7', title: 'Diyabetik ketoasidoz', when: () => !isNeo() && !isCord(), hint: 'DKA kartı asit–baz sınıflamasından ayrıdır; venöz örnekte de çalışır. Çocukta ISPAD 2022 profili kullanılır; eksik keton negatif sayılmaz.',
      f: ['glucose', 'beta_hydroxybutyrate', 'urine_ketones', W('diabetes_history', () => isAdult() && !isPregCtx()), W('diabetes_type', isPregCtx), W('feels_unwell', isPregCtx), W('poor_intake', isPregCtx), W('vomiting', isPregCtx), W('pump_issue', isPregCtx), W('steroid', isPregCtx),
        W('dka_confirmed', () => S.age_group === 'pediatric'), W('dka_followup', () => isAdult() && !isPregCtx(), 'check')]},
    {id: 'gQ', title: 'Numune ve ölçüm kalitesi', hint: 'Bilinmeyen bilgi "uygun" sayılmaz; eksik kalite bilgisi olarak listelenir. Site puan vermez, örneği otomatik reddetmez ve değer düzeltmez. Analiz süresi için kurumunuzun onaylı protokolünü girin; evrensel bir süre uygulanmaz.',
      f: ['q_bubble', 'q_heparin', 'q_clot', 'q_hemolysis', 'q_catheter', W('q_flush', () => S.q_catheter === 'yes'), 'q_transport', 'q_storage', 'protocol_minutes', W('cord_clamp_time', isCord, 'dt'), 'q_device_error', 'q_manual', 'q_hydroxocobalamin', 'q_leukocytosis']},
    {id: 'g8', title: 'Klinik bağlam', hint: 'Ad, kimlik numarası ya da dosya numarası girmeyin. Bu alanlar hesaplara girmez ve hiçbir yere gönderilmez.', f: [W('clinical_context', null, 'textarea', true), W('support_change_time', null, 'dt')]}
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
    if (kind === 'check') return `<div class="fld check"><input type="checkbox" id="f-${id}" data-f="${id}"${S[id] ? ' checked' : ''}><label for="f-${id}">${esc(LBL[id])}</label></div>`;
    if (kind === 'series') return `<div class="lac" id="lac">${(S.lactate_series || []).map((e, i) => `<div class="lac-row"><div class="fld"><label for="lac-v${i}">Laktat ${i + 1} (mmol/L)</label><input id="lac-v${i}" inputmode="decimal" data-lac="${i}" data-k="value" value="${esc(e.value)}"></div><div class="fld"><label for="lac-t${i}">Zaman</label><input id="lac-t${i}" type="time" data-lac="${i}" data-k="time" value="${esc(e.time)}"></div><button type="button" data-lacdel="${i}" aria-label="Laktat ${i + 1} sil" title="Sil">×</button></div>`).join('')}<button type="button" class="btn ghost sm" data-lacadd>+ Laktat değeri ekle</button></div>`;
    let ctl;
    if (kind === 'sel') ctl = `<select id="f-${id}" data-f="${id}">${OPT[id].map(([v, l]) => `<option value="${v}"${String(val) === v ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select>`;
    else if (kind === 'dt') ctl = `<input id="f-${id}" type="datetime-local" data-f="${id}" value="${esc(val)}">`;
    else if (kind === 'text') ctl = `<input id="f-${id}" type="text" data-f="${id}" value="${esc(val)}" autocomplete="off">`;
    else if (kind === 'textarea') ctl = `<textarea id="f-${id}" data-f="${id}" rows="3">${esc(val)}</textarea>`;
    else {
      ctl = `<input id="f-${id}" inputmode="decimal" autocomplete="off" data-f="${id}" value="${esc(val)}">`;
      const ukey = id === 'cord_pco2_art' ? 'cord_pco2' : id === 'salicylate_value' ? 'salicylate' : id, units = id === 'cord_pco2_ven' ? null : U[id];
      if (units) {
        /* Çocukta FiO2 birimi açıkça seçilir [P-R23]; erişkinde görünen varsayılan motora da aynen gönderilir */
        const opts = units.map(u => Array.isArray(u) ? u : [u, u]);
        if (id === 'fio2' && isPed()) opts.unshift(['', 'birim?']);
        if (S[ukey + '_unit'] == null) S[ukey + '_unit'] = opts[0][0];
        ctl += `<select class="unit" data-f="${ukey}_unit" aria-label="${esc(LBL[id])} birimi">${opts.map(([v, l]) => `<option value="${v}"${S[ukey + '_unit'] === v ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select>`;
      }
      if (id === 'cord_pco2_ven') ctl += `<span class="chip">${esc(S.cord_pco2_unit || 'kPa')}</span>`;
    }
    return `<div class="fld${x.wide ? ' wide' : ''}" data-fld="${id}">${lab}<div class="ctl">${ctl}</div><div class="msg" hidden></div></div>`;
  }
  const groupCount = g => g.f.filter(visible).map(sp => specOf(sp).id).filter(k => k === 'lactate_series' ? (S.lactate_series || []).some(e => String(e.value).trim()) : S[k] != null && S[k] !== '' && S[k] !== 'unknown' && S[k] !== false).length;
  const groupBody = g => (g.hint ? `<p class="hint">${esc(g.hint)}</p>` : '') + g.f.map(fieldHTML).join('');
  function formHTML() {
    const caseOpts = C.cases.map(c => `<option value="${c.id}">${c.id} · ${esc(c.baslik)}</option>`).join('');
    return `<div class="toolbar">
        <select class="case-pick" id="casePick" aria-label="Sentetik olgu yükle"><option value="">Sentetik olgu yükle…</option><optgroup label="Erişkin olgular">${caseOpts}</optgroup><optgroup label="Hiperkapni olguları (7. tur)">${C.koah.cases.filter(k => k.mode === 'eval').map(k => `<option value="${k.id}">${k.id} · ${esc(k.baslik)}</option>`).join('')}</optgroup>${Object.keys(R8G).map(g => `<optgroup label="${esc(R8G[g])}">${C.r810.cases.filter(k => k.grup === g && k.mode === 'eval').map(k => `<option value="${k.id}">${k.id} · ${esc(k.baslik)}</option>`).join('')}</optgroup>`).join('')}<optgroup label="Pediatri ve yenidoğan örnekleri">${PED_DEMOS.filter(d => !d.g).map(d => `<option value="${d.id}">${d.id} · ${esc(d.title)}</option>`).join('')}</optgroup><optgroup label="Gebelik örnekleri">${PED_DEMOS.filter(d => d.g).map(d => `<option value="${d.id}">${d.id} · ${esc(d.title)}</option>`).join('')}</optgroup></select>
        <button type="button" class="btn ghost sm" id="clearForm">Temizle</button>
      </div>
      ${GROUPS.filter(g => !g.when || g.when()).map((g, i) => `<details class="fs" data-g="${g.id}"${g.open || openGroups.has(g.id) ? ' open' : ''}><summary><span class="n">${i + 1}</span>${esc(g.title)}<span class="cnt">${groupCount(g) || ''}</span></summary><div class="body">${groupBody(g)}</div></details>`).join('')}`;
  }
  const openGroups = new Set();
  /* Pediatri/yenidoğan örnek girişleri: ikinci tur senaryolarından türetilmiş sentetik veriler (tam hasta olgusu değildir) */
  const PED_DEMOS = [
    {id: 'P-C02', title: 'Çocuk, invaziv ventilasyon: OI ve PALICC-2', v: {age_group: 'pediatric', care_context: 'picu', sample_type: 'arterial', fio2: '0,8', fio2_unit: 'fraction', paw: '12', pao2: '60', vent_type: 'invasive', pards_confirmed: 'yes', pards_hours: '4', support_concurrent: 'yes'}},
    {id: 'P-C05', title: 'Çocuk: OSI ve SpO₂ tavanı', v: {age_group: 'pediatric', care_context: 'picu', sample_type: 'peripheral_venous', fio2: '0,6', fio2_unit: 'fraction', paw: '12', spo2: '98', signal: 'good', stable: 'yes', vent_type: 'invasive'}},
    {id: 'P-C09', title: 'Yenidoğan: Montreux orta sınırı', v: {age_group: 'neonatal', care_context: 'nicu', sample_type: 'arterial', fio2: '0,5', fio2_unit: 'fraction', paw: '8', pao2: '50', nards_confirmed: 'yes', ga_weeks: '34', ga_days: '2', postnatal_days: '3'}},
    {id: 'P-C15', title: 'Çocuk DKA: pH ve HCO₃ şiddet uyumsuzluğu', v: {age_group: 'pediatric', sample_type: 'peripheral_venous', ph: '7,2', tco2: '4,9', glucose: '25', glucose_unit: 'mmol/L', beta_hydroxybutyrate: '5', dka_confirmed: 'yes'}},
    {id: 'P-C17', title: 'Çocuk: öglisemik olasılık', v: {age_group: 'pediatric', sample_type: 'peripheral_venous', ph: '7,2', glucose: '10', glucose_unit: 'mmol/L', beta_hydroxybutyrate: '4'}},
    {id: 'P-C19', title: 'Yenidoğan: postmenstrüel yaş', v: {age_group: 'neonatal', care_context: 'nicu', sample_type: 'capillary', ga_weeks: '30', ga_days: '4', postnatal_days: '14'}},
    {id: 'P-C20', title: 'Şüpheli kordon çifti', v: {age_group: 'neonatal', sample_type: 'cord_artery', cord_ph_art: '7,2', cord_ph_ven: '7,215', cord_pco2_art: '7', cord_pco2_ven: '6', cord_pco2_unit: 'kPa'}},
    {id: 'P-C22', title: '35. haftada nörolojik bozulma', v: {age_group: 'neonatal', care_context: 'nicu', sample_type: 'arterial', ga_weeks: '35', ga_days: '0', neuro: 'yes', perinatal_event: 'yes'}},
    {id: 'G-C01', title: 'Gebe: fizyolojik uyuma benzeyen örüntü', g: 1, v: {age_group: 'adult', maternal_context: 'pregnant', sample_owner: 'mother', sample_type: 'arterial', temperature_reporting: '37C_uncorrected', ph: '7,44', pco2: '30', hco3_actual: '19,69', ga_weeks: '32', ga_days: '0'}},
    {id: 'G-C02', title: 'Gebe: dispnede PaCO₂ 40', g: 1, v: {age_group: 'adult', maternal_context: 'pregnant', sample_owner: 'mother', sample_type: 'arterial', ph: '7,4', pco2: '40', hco3_actual: '24', resp_symptoms: 'yes', o2_profile: 'bts', hypercapnia_risk: 'no', spo2: '93'}},
    {id: 'G-C05', title: 'Gebe: öglisemik ketoasidoz şüphesi', g: 1, v: {age_group: 'adult', maternal_context: 'pregnant', sample_owner: 'mother', sample_type: 'peripheral_venous', ph: '7,22', tco2: '10', glucose: '8', glucose_unit: 'mmol/L', beta_hydroxybutyrate: '4', diabetes_type: 't1'}},
    {id: 'G-C11', title: 'Gebe: NICE yüksek risk dalı', g: 1, v: {age_group: 'adult', maternal_context: 'pregnant', sample_owner: 'mother', sample_type: 'arterial', lactate_series: [{value: '4,01', time: ''}], infection: 'yes', sepsis_high_risk: 'yes', sbp: '100'}},
    {id: 'G-C14', title: 'Anne iyi oksijenlenmiş, fetal endişe', g: 1, v: {age_group: 'adult', maternal_context: 'labor', sample_owner: 'mother', sample_type: 'arterial', spo2: '98', maternal_hypoxia: 'no', fetal_assessment: 'concern', labor_stage: '1'}},
    {id: 'P-R17', title: 'Doğum salonu: 3. dakika SpO₂ hedefi', v: {age_group: 'neonatal', care_context: 'delivery', sample_type: 'unknown', postnatal_minutes: '3', spo2: '72', spo2_site: 'right_hand'}}
  ];

  /* ================= Sonuç ================= */
  const ORDER = ['quality', 'sample', 'cord', 'cordpair', 'hie', 'hh', 'ph', 'proc', 'hcap', 'ag', 'agk', 'agc', 'delta', 'tox', 'og', 'salicylate', 'lacgap', 'renal', 'uag', 'urine', 'caratio', 'pf', 'aa', 'cao2', 'oi', 'osi', 'pards', 'nards', 'rds', 'delivery', 'preg', 'co2rel', 'o2target', 'fetal', 'pe', 'o2delivery', 'sepsis', 'dyshb', 'lactate', 'dka', 'dkares', 'base', 'age'];
  const MCTX = Object.fromEntries(OPT.maternal_context);
  const AGE = {adult: 'erişkin', pediatric: 'çocuk', neonatal: 'yenidoğan'};
  const SEV = {mild: 'hafif', moderate: 'orta', severe: 'ağır', not_severe: 'ağır eşiğinin altında'};
  const BETYPE = Object.fromEntries(OPT.be_type);
  const SAMPLE = Object.fromEntries(OPT.sample_type);
  const stChip = s => `<span class="st ${s}">${esc(t('status.' + s))}</span>`;
  // Genel ürün kapsamı ayrıntıda; klinik uyarılar ve uygulanabilirlik koşulları görünür kalır.
  const SCOPE_NOTES = new Set(['hc_no_treatment', 'renal_no_treatment', 'tox_no_treatment', 'no_fluid_order']);
  const msgs = list => {
    if (!list || !list.length) return '';
    const render = items => items.length ? `<ul class="msgs">${items.map(m => `<li>${esc(t('m.' + m))}</li>`).join('')}</ul>` : '';
    const scope = list.filter(m => SCOPE_NOTES.has(m));
    return render(list.filter(m => !SCOPE_NOTES.has(m))) + (scope.length ? `<details class="small"><summary>Kapsam notları</summary>${render(scope)}</details>` : '');
  };
  const needs = list => list && list.length ? `<p class="need">Gerekli: ${list.map(f => esc(LBL[f] || f)).join(' · ')}</p>` : '';
  function calc(fid, lines) {
    const F = FORM[fid] || R8FORM[fid];
    return `<details class="calc"><summary>Hesabı gör · ${esc(F.ad)}</summary><div class="f"><b>${esc(fid)}</b>: ${esc(F.ifade)}\n${lines.map(esc).join('\n')}</div>
      <p class="small"><b>Koşul:</b> ${esc(F.uygulama_kosullari)}. <b>Sınır:</b> ${esc(F.sinirlamalar)} ${cite(F.kaynak_ids)}</p></details>`;
  }
  const card = (m, title, body) => `<section class="card ${m.status}" id="mod-${m.id}"><div class="card-h"><h3>${esc(title || t('mod.' + m.id))}</h3>${stChip(m.status)}</div>${body}${m.src && m.src.length ? `<p class="srcs">Kaynak: ${cite(m.src)}</p>` : ''}</section>`;

  function hypHTML(h, R) {
    const n = R.n;
    const why = tf('h.why.' + h.id, {h: n1(n.hco3_actual), p: n1(n.pco2)});
    let body = '';
    if (h.id === 'met_acid' || h.id === 'met_alk') {
      const key = h.pos === 'within' ? 'h.met.within' : `h.met.${h.pos}.${h.id}`;
      body = `<p>${esc(tf(key, {m: n1(h.measured), lo: n1(h.exp.lo), hi: n1(h.exp.hi)}))}</p>` + KGC.range({lo: h.exp.lo, hi: h.exp.hi, center: h.exp.center, measured: h.measured, unit: 'mmHg', title: 'Beklenen PaCO₂ aralığı'}) +
        calc(h.formula, [`= ${h.formula === 'winter' ? '1,5' : '0,7'} × ${n1(n.hco3_actual)} + ${h.formula === 'winter' ? 8 : 20} = ${n2(h.exp.center)} mmHg`, `aralık ${n2(h.exp.lo)}–${n2(h.exp.hi)} mmHg (sınırlar dahil) · ölçülen ${n1(h.measured)} mmHg`]);
    } else {
      body = `<p>${esc(tf('h.resp.est', {a: n2(h.acute), c: n2(h.chronic), m: n1(h.measured)}))}</p><p>${esc(h.pos === 'between' ? (h.nearer === 'equal' ? t('h.resp.equidistant') : tf('h.resp.between', {near: t('h.near.' + h.nearer)})) : t('h.resp.' + h.pos))} ${esc(t('h.resp.chronicity'))}</p>` +
        KGC.points({acute: h.acute, chronic: h.chronic, measured: h.measured, unit: 'mmol/L'}) +
        calc(h.formula[0], [`akut: 24 ${h.id === 'resp_acid' ? '+ 0,1 × (' + n1(n.pco2) + ' − 40)' : '− 0,2 × (40 − ' + n1(n.pco2) + ')'} = ${n2(h.acute)} mmol/L`]) +
        calc(h.formula[1], [`kronik: 24 ${h.id === 'resp_acid' ? '+ 0,35 × (' + n1(n.pco2) + ' − 40)' : '− 0,41 × (40 − ' + n1(n.pco2) + ')'} = ${n2(h.chronic)} mmol/L`]);
    }
    return `<div class="hyp"><h4>${esc(t('h.' + h.id))}</h4><p class="why">${esc(why)}</p><p class="al">${esc(t('h.align.' + h.align))}</p>${body}<p class="srcs small">Kaynak: ${cite(h.src)}</p></div>`;
  }

  function moduleHTML(m, R) {
    const n = R.n;
    switch (m.id) {
      case 'quality': {
        const rows = [['Örnek', SAMPLE[m.sample]], ...(R.scope === 'adult' ? [['Gebelik bağlamı', n.maternal_context === 'unknown' ? 'bilinmiyor (gebelik dışı erişkin referansı)' : MCTX[n.maternal_context]], ...(n.pregnancy === 'yes' ? [['Örnek sahibi', OPT.sample_owner.find(o => o[0] === n.sample_owner)[1]]] : [])] : [['Yaş grubu', AGE[n.age_group]]]),
          ['Sıcaklık raporlaması', (OPT.temperature_reporting.find(o => o[0] === m.temp) || [])[1]], ['Örnek / analiz zamanı', [m.times.sample, m.times.analysis].map(x => x || '–').join(' / ')],
          ['Basınç birimi', `PCO₂ ${m.units.pco2}, PO₂ ${m.units.pao2}${m.units.pco2 === 'kPa' || m.units.pao2 === 'kPa' ? ' (hesap için mmHg = kPa / 0,1333224)' : ''}`]];
        return card(m, null, `<dl class="kv">${rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>${msgs(m.msgs)}${R.errors.length ? `<ul class="msgs">${R.errors.map(e => `<li><b>${esc(LBL[e.field] || e.field)}</b>: ${esc(t('err.' + e.code))}</li>`).join('')}</ul>` : ''}`);
      }
      case 'hh':
        if (m.status === 'veri_eksik' || m.status === 'uygulanamaz') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n2(m.calc))}<small>HH ile hesaplanan pH</small></p><p>Girilen pH ${esc(num(n.ph, 3))} · fark ${esc(Math.abs(m.diff) < 0.0005 ? '0,000' : (m.diff > 0 ? '+' : '−') + num(Math.abs(m.diff), 3))}</p>${msgs(m.msgs)}` +
          calc('hh-ph', [`= 6,1 + log10(${n1(n.hco3_actual)} / (0,03 × ${n1(n.pco2)})) = ${num(m.calc, 3)}`, `yuvarlama payıyla olası aralık: ${num(m.range[0], 3)}–${num(m.range[1], 3)}${m.tol != null ? ` · laboratuvar toleransı ±${num(m.tol, 3)}` : ' · laboratuvar toleransı tanımlanmadı'}`, 'Aralık, girilen basamakların yuvarlama payını ve iki sabit takımını kapsar: atlas formülü (pK 6,1; 0,03) ve kan gazı cihazlarının kullandığı IFCC sabitleri (pK 6,095; 0,0307 mmol/L/mmHg; HCO₃ = 0,0307 × PCO₂ × 10^(pH − 6,095)). Bu bir ürün kararıdır; klinik tolerans değildir.']));
      case 'ph':
        if (m.local) return card(m, null, `<p class="big">${esc(num(m.value, 3))}<small>${esc({below: 'yerel referansın altında', within: 'yerel referans aralığında', above: 'yerel referansın üstünde'}[m.cls])} (${esc(num(m.ref[0], 2))}–${esc(num(m.ref[1], 2))})</small></p>${m.pco2Cls ? `<p>PCO₂ ${esc(n1(n.pco2))} mmHg: ${esc({below: 'yerel referansın altında', within: 'yerel referans aralığında', above: 'yerel referansın üstünde'}[m.pco2Cls])} (${esc(num(m.pco2Ref[0], 0))}–${esc(num(m.pco2Ref[1], 0))})</p>` : ''}${m.refSrc ? `<p class="small">Referans: ${esc(m.refSrc)}</p>` : ''}${msgs(m.msgs)}`);
        if (!m.dir) return card(m, null, (m.value != null ? `<p class="big">${esc(num(m.value, 3))}</p>` : '') + needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(num(m.value, 3))}<small>${esc({acidemia: 'asidemi', alkalemia: 'alkalemi', within: 'referans aralığında'}[m.dir])}</small></p><p class="small">Erişkin arteriyel eğitim referansı pH 7,35–7,45. pH yönü bir gözlemdir; asit–baz süreçleri ayrı hipotezlerdir.</p>${msgs(m.msgs)}` +
          (has(n.pco2) ? KGC.map([{ph: m.value, pco2: n.pco2, label: 'bu örnek'}]) : ''));
      case 'proc':
        if (!m.hyps) return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, msgs(m.msgs) + m.hyps.map(h => hypHTML(h, R)).join(''));
      case 'ag': {
        if (m.status === 'veri_eksik') return card(m, null, needs(m.need));
        const cls = m.cls ? tf('ag.cls.' + m.cls, {lo: num(m.interval[0], 0), hi: num(m.interval[1], 0)}) : m.vsRef ? tf('ag.vs.' + m.vsRef, {r: num(n.ag_reference, 0)}) : '';
        const bic = m.method === 'tco2' ? n.tco2 : n.hco3_actual;
        return card(m, null, `<p class="big">${esc(n1(m.value))}<small>mmol/L · ${m.method === 'tco2' ? 'TCO₂ ile' : 'kan gazı HCO₃ ile'}</small></p>${cls ? `<p><b>${esc(cls)}</b></p>` : ''}${msgs(m.msgs)}` +
          calc('anion-gap', [`= ${n1(n.na)} − ${n1(n.cl)} − ${n1(bic)} = ${n1(m.value)} mmol/L`, 'Potasyum dahil edilmedi.']));
      }
      case 'agc':
        if (m.status !== 'hesaplandi') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n1(m.value))}<small>mmol/L</small></p>${KGC.ag({measured: m.measured, corrected: m.value, ref: n.ag_reference, interval: has(n.ag_ref_low) && has(n.ag_ref_high) ? [n.ag_ref_low, n.ag_ref_high] : null})}${msgs(m.msgs)}` +
          calc('ag-albumin', [`= ${n1(m.measured)} + 2,5 × (${n1(m.albRef)} − ${n2(m.albumin)}) = ${n1(m.value)} mmol/L`, 'Albümin g/dL olarak kullanıldı (g/L girildiyse 10\'a bölündü).']));
      case 'delta':
        if (m.status === 'veri_eksik') return card(m, null, needs(m.need) + msgs(m.msgs));
        if (m.status === 'uygulanamaz') return card(m, null, `<ul class="msgs">${m.msgs.map(c => `<li>${esc(tf('m.' + c, {ag: n1(m.agUse), r: num(m.agRef, 0)}))}</li>`).join('')}</ul>`);
        return card(m, null, `<p class="big">${esc((m.gap > 0 ? '+' : '') + n1(m.gap))}<small>delta farkı, mmol/L</small></p><p>Delta oranı: <b>${m.ratio == null ? 'hesaplanmadı' : esc(n2(m.ratio))}</b> (${esc(n1(m.num))} / ${esc(n1(m.den))})</p>${msgs(m.msgs)}` +
          calc('delta-gap', [`= (${n1(m.agUse)} − ${n1(m.agRef)}) − (${n1(m.hco3Ref)} − ${n1(m.tco2)}) = ${n1(m.gap)}`, `AG ${m.corrected ? 'albüminle düzeltilmiş' : 'ölçülen (düzeltme yok)'} · referanslar kullanıcı girişi`]) +
          (m.ratio != null ? calc('delta-ratio', [`= (${n1(m.agUse)} − ${n1(m.agRef)}) / (${n1(m.hco3Ref)} − ${n1(m.tco2)}) = ${n2(m.ratio)}`, 'Küçük paydada oran kararsızdır.']) : ''));
      case 'pf':
        if (m.status !== 'hesaplandi') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(num(m.value, 0))}<small>mmHg</small>${m.approx ? '<span class="approx">yaklaşık</span>' : ''}</p>${msgs(m.msgs)}` +
          calc('pf', [`= ${n1(m.pao2)} / ${n2(m.fio2)} = ${num(m.value, 0)} mmHg`, 'FiO₂ kesir olarak kullanıldı.']));
      case 'aa':
        if (m.status !== 'hesaplandi') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n1(m.value))}<small>mmHg</small></p>${msgs(m.msgs)}${m.sealevel ? '<p class="small">Barometrik basınç: deniz seviyesi varsayımı (760 mmHg) kullanıcı tarafından seçildi.</p>' : ''}` +
          calc('aa-roomair', [`= 0,21 × (${num(m.baro, 0)} − 47) − ${n1(n.pco2)} / 0,8 − ${n1(n.pao2)} = ${n1(m.value)} mmHg`]));
      case 'cao2':
        if (m.status !== 'hesaplandi') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n1(m.value))}<small>mL O₂/dL</small></p><p class="small">Satürasyon türü: ${esc(OPT.saturation_type.find(o => o[0] === m.satType)[1])}</p>` +
          calc('cao2', [`= 1,34 × ${n1(m.hb)} × ${n2(m.sat)} + 0,0031 × ${n1(n.pao2)} = ${num(m.value, 2)} mL/dL`]));
      case 'dyshb':
        return card(m, null, `${has(m.cohb) ? `<p>COHb: <b>${esc(n1(m.cohb))} %</b></p>` : ''}${has(m.methb) ? `<p>MetHb: <b>${esc(n1(m.methb))} %</b></p>` : ''}${msgs(m.msgs)}<p class="small">Yerel referans ve klinik maruziyet öyküsüyle değerlendirin; bu sitede eşik ya da şiddet sınıflaması yoktur.</p>`);
      case 'lactate':
        if (m.status === 'veri_eksik') return card(m, null, needs(m.need));
        return card(m, null, (m.change != null ? `<p class="big">${esc((m.change > 0 ? '−' : m.change < 0 ? '+' : '') + n1(Math.abs(m.change)))}<small>% (ilk → son değer)</small></p>` : '') + KGC.lactate(m.series) + msgs(m.msgs) +
          (m.change != null ? calc('lactate-change', [`= 100 × (${n1(m.series[0].v)} − ${n1(m.series[m.series.length - 1].v)}) / ${n1(m.series[0].v)} = ${n1(m.change)} %`, 'Pozitif sonuç düşüş, negatif sonuç artış demektir.']) : ''));
      case 'dka': if (!m.comp) return card(m, null, needs(m.need) + msgs(m.msgs)); if (m.ped) return pedDkaHTML(m, R); if (m.preg) return pregDkaHTML(m, R);
      {
        const S3 = {yes: 'karşılandı', no: 'karşılanmadı', missing: 'veri eksik'};
        const sub = (v, l) => `${esc(l)}: ${v === true ? 'karşılandı' : v === false ? 'karşılanmadı' : 'veri yok'}`;
        const c = m.comp, glu = n.glucose_unit === 'mmol/L' ? '≥11,1 mmol/L' : '≥200 mg/dL';
        const rows = [
          ['Diyabet öyküsü ya da hiperglisemi', c.diabetes.state, [sub(c.diabetes.dm, 'diyabet öyküsü'), sub(c.diabetes.glucose, 'glukoz ' + glu)]],
          ['Keton ölçütü', c.ketosis.state, [sub(c.ketosis.bhb, 'β-hidroksibütirat ≥3,0 mmol/L'), sub(c.ketosis.uk, 'idrar ketonu ≥2+')]],
          ['Asidoz', c.acidosis.state, [sub(c.acidosis.ph, 'pH <7,3'), sub(c.acidosis.bic, (c.acidosis.bicSrc === 'gas_hco3' ? 'kan gazı HCO₃' : 'HCO₃ (TCO₂)') + ' <18 mmol/L')]]
        ];
        return card(m, null, `<div class="tbl"><table><thead><tr><th>Bileşen</th><th>Durum</th><th>Alt ölçütler</th></tr></thead><tbody>${rows.map(([k, s, subs]) => `<tr><td>${esc(k)}</td><td><b>${esc(S3[s])}</b></td><td class="small">${subs.join('<br>')}</td></tr>`).join('')}</tbody></table></div>
          <p>Sayısal olarak karşılanan bileşen: <b>${m.met} / 3</b></p>${msgs(m.msgs)}`);
      }
      case 'dkares': {
        const yn = v => v === true ? 'karşılandı' : v === false ? 'karşılanmadı' : 'veri yok';
        return card(m, null, `<ul class="msgs"><li>Plazma ketonu (β-hidroksibütirat) &lt;0,6 mmol/L: <b>${yn(m.ket)}</b></li><li>${m.phVenous ? 'Venöz ' : ''}pH ≥7,3: <b>${yn(m.phr)}</b>${m.phVenous ? '' : ' (ölçüt venöz pH ile tanımlıdır)'} · ya da HCO₃ ≥18 mmol/L: <b>${yn(m.br)}</b></li><li>Glukoz ideal olarak &lt;200 mg/dL: <b>${m.glucoseBelow == null ? 'veri yok' : m.glucoseBelow ? 'evet' : 'hayır'}</b></li></ul>
          <p>Düzelme ölçütleri (keton <b>ve</b> asidoz bileşeni): <b>${{yes: 'sayısal olarak karşılandı', no: 'karşılanmadı', missing: 'veri eksik'}[m.all]}</b></p>${msgs(m.msgs)}`);
      }
      case 'preg': {
        const P = {below: 'altında', within: 'içinde', above: 'üstünde'};
        const cell = (rng, c, d) => rng ? `${num(rng[0], d)}–${num(rng[1], d)}${c ? ` <span class="muted">(${P[c]})</span>` : ''}` : '–';
        const tbl = m.rows ? `<div class="tbl"><table><thead><tr><th>Derleme</th><th>pH</th><th>PaCO₂ (mmHg)</th><th>HCO₃ (mmol/L)</th></tr></thead><tbody>${m.rows.map(r => `<tr><td>${cite([r.src])}</td><td>${cell(r.ph, r.cph, 2)}</td><td>${cell(r.pco2, r.cpco2, 0)}</td><td>${cell(r.hco3, r.chco3, 0)}</td></tr>`).join('')}</tbody></table></div><p class="small muted">Parantez içi: girilen değerin o derlemenin aralığına göre konumu. Veri türü: derleme fizyolojisi; otomatik normal etiketi değildir.</p>` : '';
        return card(m, null, msgs(m.msgs) + tbl);
      }
      case 'co2rel': return card(m, null, `<p class="big">${esc(n1(m.pco2))}<small>mmHg PaCO₂</small></p>${msgs(m.msgs)}`);
      case 'o2target': {
        const KIND = {kilavuz: 'Kılavuz önerisi', ozel_kilavuz: 'Kılavuz, özel bağlam', derleme: 'Derleme hedefi', gorus: 'Klinik görüş'};
        const COND = {bts_general: 'çoğu akut hasta gebe', bts_hypercapnic: 'hiperkapnik yetmezlik riski', covid: 'COVID-19, seçilmiş hasta, güven verici fetal durum'};
        const sel = m.target ? `<p>Seçilen profil: <b>${esc(OPT.o2_profile.find(o => o[0] === m.profile)[1])}</b> · hedef SpO₂ <b>${pct(m.target[0], m.target[1])}</b>${m.pos ? ` · ölçülen ${pct(esc(n1(m.spo2)))}: <b>${{below: 'hedefin altında', within: 'hedef aralıkta', above: 'hedefin üstünde'}[m.pos]}</b>` : ''}</p>` : '<p><b>Hedef seçilmedi.</b></p>';
        return card(m, null, sel + msgs(m.msgs) + `<div class="tbl"><table><thead><tr><th>Kaynak</th><th>Veri türü</th><th>Hedef</th><th>Bağlam</th></tr></thead><tbody>${m.sources.map(x => `<tr><td>${cite([x.src])}</td><td>${esc(KIND[x.kind])}</td><td>${x.spo2 ? `SpO₂ ${pct(x.spo2[0], x.spo2[1])}` : esc(x.text)}</td><td class="small">${esc(COND[x.cond] || 'tüm gebeler için doğrulanmış tek eşik değil')}</td></tr>`).join('')}</tbody></table></div><p class="small muted">Kaynaklar aynı kanıt düzeyinde değildir; ortalanmaz ve birleşim aralığına dönüştürülmez.</p>`);
      }
      case 'fetal': case 'pe': case 'o2delivery': return card(m, null, msgs(m.msgs));
      case 'sepsis':
        return card(m, null, `${m.branch ? `<p>NICE yüksek risk dalı (laktat &gt;4 mmol/L ya da sistolik ≤90 mmHg): <b>${{met: 'karşılandı', not_met: 'karşılanmadı', missing: 'veri eksik'}[m.branch]}</b>${m.lac != null ? ` · laktat ${esc(n1(m.lac))}` : ''}${m.sbp != null ? ` · sistolik ${esc(num(m.sbp, 0))}` : ''}</p>` : ''}${msgs(m.msgs)}`);
      case 'sample': {
        const PRM = {po2: 'PO₂', pco2: 'PCO₂', ph: 'pH', hco3: 'HCO₃', lytes: 'elektrolitler', glucose: 'glukoz', sat: 'satürasyon/ko-oksimetri', thb: 'tHb', lactate: 'laktat', be: 'BE'};
        const li = w => `<li>${esc(t('qw.' + w.code))}${w.params.length ? ` <span class="small muted">· etkilenebilir: ${w.params.map(p => PRM[p]).join(', ')}</span>` : ''} <span class="small muted">· tetikleyen alan: ${esc(LBL[w.field] || w.field)}</span> ${cite(w.src)}</li>`;
        const mm = v => v == null ? '–' : num(v, 0) + ' dk';
        const times = `<dl class="kv"><dt>Örnek → analiz</dt><dd>${mm(m.delay)}${m.protocol != null ? ` · kurum protokolü ${num(m.protocol, 0)} dk` : ' · kurum protokolü girilmedi'}</dd>${m.supportMin != null && m.supportMin >= 0 ? `<dt>Son destek değişikliği → örnek</dt><dd>${mm(m.supportMin)}</dd>` : ''}${m.cord ? `<dt>Doğum → klempleme</dt><dd>${mm(m.cord.birthToClamp)}</dd><dt>Klempleme → örnek</dt><dd>${mm(m.cord.clampToSample)}</dd>` : ''}</dl>`;
        const notes = [m.protocol == null && m.delay != null ? `<li>Kaynaklar farklı süreler bildirir (ör. AARC 2013, ANZSRS 2024, AARC 2022 kapiller); bu sitede evrensel süre uygulanmaz ve protokol olmaması "uygun" demek değildir. ${cite([1, 21, 59, 70])}</li>` : '',
          m.supportMin != null && m.supportMin >= 0 ? `<li>Hırvat ulusal önerisi ventilasyon değişikliğinden sonra kararlı durum için 20–30 dakika beklemeyi önerir; acil durumda kan gazı hemen alınır. Erken örnek geçiş dönemini gösterebilir, "bozuk" sayılmaz. ${cite([58])}</li>` : '',
          m.cord ? `<li>Kordonda gecikme özellikle laktat ve baz fazlasını etkileyebilir; doğum anı değerleri geri hesaplanmaz. ${cite([76])}</li>` : ''].join('');
        return card(m, null, times + (notes ? `<ul class="msgs">${notes}</ul>` : '') +
          `<h4 style="margin-top:6px">Bilinen hata (${m.known.length})</h4>${m.known.length ? `<ul class="msgs">${m.known.map(li).join('')}</ul>` : '<p class="small">Girilen bilgilerde bilinen bir numune hatası yok. Bu, numunenin uygun olduğu anlamına gelmez.</p>'}
          <h4 style="margin-top:6px">Olası etki (${m.possible.length})</h4>${m.possible.length ? `<ul class="msgs">${m.possible.map(li).join('')}</ul>` : '<p class="small">–</p>'}
          <h4 style="margin-top:6px">Eksik kalite bilgisi (${m.unknown.length})</h4>${m.unknown.length ? `<p class="small">${m.unknown.map(f => esc(LBL[f] || f)).join(' · ')}</p>` : '<p class="small">–</p>'}` + msgs(m.msgs));
      }
      case 'base':
        return card(m, null, `<p class="big">${esc((m.value > 0 ? '+' : '') + n1(m.value))}<small>mmol/L · ${esc(BETYPE[m.type])}</small></p>${msgs(m.msgs)}`);
      case 'age':
        if (m.status !== 'hesaplandi') return card(m, null, (m.ga ? `<p>Doğumdaki gestasyon: <b>${m.ga[0]} hafta ${m.ga[1]} gün</b></p>` : '') + needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${m.pmaW} hafta ${m.pmaD} gün<small>postmenstrüel yaş</small></p><p>Doğumdaki gestasyon ${m.ga[0]} hafta ${m.ga[1]} gün${m.gaDaysGiven ? '' : ' (gün girilmedi, 0 alındı)'} + postnatal ${m.pnd} tam gün</p>${msgs(m.msgs)}` +
          calc('P-F03', [`= 7 × ${m.ga[0]} + ${m.ga[1]} + ${m.pnd} = ${m.pma} gün = ${m.pmaW} hafta ${m.pmaD} gün`]));
      case 'oi':
        if (m.status === 'veri_eksik' || m.status === 'uygulanamaz') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n1(m.value))}</p>${msgs(m.msgs)}` + calc('P-F01', [`= 100 × ${n2(m.fio2)} × ${n1(m.paw)} cmH₂O / ${n1(m.pao2)} mmHg = ${n1(m.value)}`, 'FiO₂ kesir; ortalama hava yolu basıncı cmH₂O; PaO₂ mmHg.']));
      case 'osi':
        if (m.status === 'veri_eksik') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n1(m.value))}<small>${m.classifiable ? 'PALICC-2 sınıflamasına uygun ölçüm' : 'yalnız aritmetik; sınıflama durduruldu'}</small></p>${msgs(m.msgs)}` + calc('P-F02', [`= 100 × ${n2(n.fio2)} × ${n1(n.paw)} / ${n1(m.spo2)} = ${n1(m.value)}`, 'SpO₂ yüzde olarak (ör. 90) kullanılır.']));
      case 'pards': {
        if (m.status === 'veri_eksik' && !m.crit) return card(m, null, needs(m.need) + msgs(m.msgs));
        if (m.status === 'uygulanamaz') return card(m, null, msgs(m.msgs));
        const crit = {met: 'karşılandı', not_met: 'karşılanmadı', missing: 'değerlendirilemedi', unverified: 'ölçüm geçerliliği doğrulanmadı'}[m.crit];
        return card(m, null, `<p>Oksijenasyon ölçütü (OI ≥4 ya da OSI ≥5): <b>${crit}</b>${m.basis ? ` · dayanak ${m.basis.toUpperCase()}` : ''}</p>
          <p>Şiddet (tanıdan ≥4 saat; OI ≥16 ya da OSI ≥12 ağır): <b>${m.sev ? esc(SEV[m.sev]) : 'etiket verilmedi'}</b></p>${msgs(m.msgs)}<p class="small muted">Profil: PALICC-2 2023, invaziv ventilasyon. Montreux NARDS tablosu ayrıdır.</p>`);
      }
      case 'nards':
        if (m.status === 'veri_eksik') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p>OI ${esc(n1(m.oi))} · Montreux oksijenasyon şiddeti: <b>${m.sev ? esc(SEV[m.sev]) : 'etiket verilmedi'}</b></p>${msgs(m.msgs)}`);
      case 'hcap': {
        const b = m.base, sg = v => (v > 0 ? '+' : '') + n1(v);
        const tb = b ? `<div class="tbl"><table><thead><tr><th></th><th>Önceki gaz (girilen)</th><th>Bu örnek</th><th>Fark</th></tr></thead><tbody><tr><td>PCO₂ (mmHg)</td><td>${esc(n1(b.pco2))}</td><td>${esc(n1(m.pco2))}</td><td>${esc(sg(b.dpco2))}</td></tr><tr><td>HCO₃ (mmol/L)</td><td>${esc(n1(b.hco3))}</td><td>${b.dhco3 == null ? '–' : esc(n1(b.hco3 + b.dhco3))}</td><td>${b.dhco3 == null ? '–' : esc(sg(b.dhco3))}</td></tr></tbody></table></div>` : '';
        return card(m, null, tb + msgs(m.msgs) + '<p class="small muted">Eğitim kartı (7. tur): tanı, tedavi, NIV/entübasyon, cihaz ayarı ya da ev cihazı önerisi üretmez. Ayrıntı: <a href="#/ogren/k-co2-neden-artar">hiperkapni dersleri</a>.</p>');
      }
      case 'rds':
        return card(m, null, msgs(m.msgs) + '<p class="small muted">Veri türü: tedavi hedefi ve tedavi koşulu (Avrupa RDS uzlaşısı); referans aralığı değildir.</p>');
      /* ---------- 8–10. tur kartları: değer yalnız modül durumu izin veriyorsa gösterilir ---------- */
      case 'renal': {
        const RC = Object.fromEntries(OPT.renal_context), KM = Object.fromEntries(OPT.krt_modality);
        return card(m, null, `<dl class="kv"><dt>Böbrek bağlamı</dt><dd>${esc(RC[m.ctx])}</dd><dt>KRT</dt><dd>${esc(KM[m.krt])}</dd></dl>${msgs(m.msgs)}` +
          (m.msgs.includes('renal_bicarb_evidence') ? '<p class="small">Dersler: <a href="#/ogren/b03">Bikarbonat kanıtı</a> · <a href="#/ogren/b04">Diyaliz öncesi ve sonrası gaz</a></p>' : '') +
          '<p class="small muted">Eğitim kartı (8. tur). Ayrıntı: <a href="#/ogren/b01">böbrek ve diyaliz dersleri</a>.</p>');
      }
      case 'uag':
        if (m.value == null) return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc((m.value > 0 ? '+' : '') + n1(m.value))}<small>mmol/L · ${m.status === 'hesaplandi' ? 'aynı idrar örneği' : 'yalnız aritmetik'}</small></p>${msgs(m.msgs)}` +
          calc('uag', [`= ${n1(m.una)} + ${n1(m.uk)} − ${n1(m.ucl)} = ${n1(m.value)} mmol/L`, 'İdrar amonyumunun ölçümü değildir.']));
      case 'urine': {
        const rows = [m.uph != null ? ['İdrar pH', num(m.uph, 2)] : null, m.ucl != null ? ['İdrar Cl⁻', n1(m.ucl) + ' mmol/L'] : null].filter(Boolean);
        return card(m, null, `<dl class="kv">${rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>${msgs(m.msgs)}${needs(m.need)}`);
      }
      case 'caratio':
        if (m.ratio == null) return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(caFmt(m))}<small>total Ca / iCa · ${m.status === 'gozden_gecirilmeli' && m.msgs.includes('ca_concurrency_unknown') ? 'yalnız aritmetik' : 'sistemik, eşzamanlı, mmol/L'}</small></p>${msgs(m.msgs)}` +
          (m.assume ? '<p class="small">Gebelik bağlamı seçilmedi: not gebe olmayan erişkin varsayımıyla gösterildi.</p>' : '') +
          calc('systemic_total_ica_ratio', [`= ${num(m.tca, 6)} / ${num(m.ica, 6)} = ${num(m.ratio, 6)}`, 'Kaynak sınırı girilen değerlerle karşılaştırılır; ekrandaki yuvarlama karara girmez.', 'Kaynak profilleri: 2026 Delphi ≥2,5 (sitede kullanılan) · 2023 uzman görüşü >2,5 ya da yükselen trend (derste). Profiller birleştirilmez.']) +
          '<p class="small muted">Ayrıntı: <a href="#/ogren/b05">Sitrat: birikim mi, alkali yükü mü?</a></p>');
      case 'agk':
        if (m.value == null) return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n1(m.value))}<small>mmol/L · potasyumlu · ${m.method === 'tco2' ? 'TCO₂ ile' : 'kan gazı HCO₃ ile'}</small></p>${msgs(m.msgs)}` +
          calc('ag_with_k', [`= ${n1(R.n.na)} + ${n1(R.n.k)} − ${n1(R.n.cl)} − ${n1(m.method === 'tco2' ? R.n.tco2 : R.n.hco3_actual)} = ${n1(m.value)} mmol/L`, 'Potasyumsuz AG ayrı kartta (anion-gap).']));
      case 'og': {
        if (m.ideal == null) return card(m, null, needs(m.need) + msgs(m.msgs));
        const nl = m.nitKind === 'bun' ? `BUN ${n1(R.n.bun)}/2,8` : `üre ${n1(R.n.urea)}`, gl = m.gluUnit === 'mmol/L' ? `glukoz ${n1(R.n.glucose)}` : `glukoz ${n1(R.n.glucose)}/18`;
        const head = m.value != null ? `<p class="big">${esc(n1(m.value))}<small>mOsm/kg · ${m.used === 'ethanol_zero' ? 'etanol 0 (ölçüldü)' : m.used === 'ideal_4_6' ? 'ideal profil' : 'Purssell profili'}${m.status === 'gozden_gecirilmeli' ? ' · yorum sınırlı' : ''}</small></p>` : '<p><b>Kesin düzeltilmiş OG verilmedi</b> (profil seçilmedi).</p>';
        return card(m, null, head + `<div class="tbl"><table><thead><tr><th>Profil</th><th>Etanol katkısı</th><th>OG (mOsm/kg)</th></tr></thead><tbody>
          <tr${m.used === 'ideal_4_6' ? ' style="background:var(--accent-soft)"' : ''}><td>İdeal (÷ 4,6)</td><td>${esc(n2(KG.F2.ethanol_ideal_term(m.ethanol)))}</td><td>${esc(n2(m.ideal))}</td></tr>
          <tr${m.used === 'purssell' ? ' style="background:var(--accent-soft)"' : ''}><td>Purssell (÷ 3,7 − 0,35)</td><td>${esc(n2(KG.F2.ethanol_purssell_term(m.ethanol)))}</td><td>${esc(n2(m.purssell))}</td></tr></tbody></table></div>${msgs(m.msgs)}${needs(m.need)}` +
          calc('serum_osm_calculated', [`= 2 × ${n1(R.n.na)} + ${gl} + ${nl} = ${n2(m.calc)} mOsm/kg`, `ölçülen ${n1(m.measured)} mOsm/kg · etanol ${n1(m.ethanol)} mg/dL`]) +
          calc(m.used === 'purssell' ? 'serum_og_purssell_regression' : 'serum_og_ideal_ethanol', [`ideal: ${n1(m.measured)} − (${n2(m.calc)} + ${n1(m.ethanol)}/4,6) = ${n2(m.ideal)}`, `Purssell: ${n1(m.measured)} − (${n2(m.calc)} + (${n1(m.ethanol)}/3,7 − 0,35)) = ${n2(m.purssell)}${m.ethanol === 0 ? ' (etanol 0: katkı 0)' : ''}`]) +
          '<p class="small muted">Ayrıntı: <a href="#/ogren/t02">Osmolal açıklığın hesabı ve etanol sorunu</a></p>');
      }
      case 'tox': {
        const TA = Object.fromEntries(OPT.tox_agent);
        return card(m, null, `<dl class="kv"><dt>Şüphe</dt><dd>${esc({yes: 'var', no: 'yok (girildi)', unknown: 'bilinmiyor'}[m.suspicion])}</dd><dt>Madde</dt><dd>${esc(TA[m.agent])}</dd></dl>${msgs(m.msgs)}<p class="small muted">Eğitim kartı (9. tur). EXTRIP tabloları kişisel tedavi algoritması değildir; hastaya otomatik uygulanmaz. Ayrıntı: <a href="#/ogren/t01">toksikoloji dersleri</a>.</p>`);
      }
      case 'salicylate':
        if (m.mgdl == null) return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc(n1(m.mgdl))}<small>mg/dL · ${esc(n1(m.mgl))} mg/L (girilen: ${esc(n1(m.input))} ${esc(m.unit)})</small></p>${msgs(m.msgs)}` +
          calc('salicylate_mg_l_to_mg_dl', [m.unit === 'mg/L' ? `= ${n1(m.input)} mg/L ÷ 10 = ${n1(m.mgdl)} mg/dL` : `girilen birim mg/dL; ${n1(m.mgdl)} mg/dL = ${n1(m.mgl)} mg/L`]));
      case 'lacgap':
        if (m.diff == null) return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p class="big">${esc((m.diff > 0 ? '+' : '') + n1(m.diff))}<small>mmol/L · yöntem A − yöntem B${m.status === 'hesaplandi' ? '' : ' · yalnız aritmetik'}</small></p>${msgs(m.msgs)}${needs(m.need)}` +
          calc('lactate_method_gap', [`= ${n1(m.a)} − ${n1(m.b)} = ${n1(m.diff)} mmol/L`]));
      case 'hie':
        return card(m, null, msgs(m.msgs));
      case 'delivery':
        if (m.status === 'veri_eksik') return card(m, null, needs(m.need) + msgs(m.msgs));
        return card(m, null, `<p>Doğumdan sonra <b>${m.minute}. dakika</b>${m.row ? ` · preduktal SpO₂ hedefi <b>${pct(m.row[0], m.row[1])}</b>` : ''}${m.pos ? ` · ölçülen ${pct(esc(n1(m.spo2)))}: <b>${{below: 'hedefin altında', within: 'hedef aralıkta', above: 'hedefin üstünde'}[m.pos]}</b>` : ''}</p>
          <div class="tbl"><table><thead><tr><th>Dakika</th><th>Hedef SpO₂</th></tr></thead><tbody>${[2, 3, 4, 5, 10].map(k => `<tr${m.row && m.minute === k ? ' style="background:var(--accent-soft)"' : ''}><td>${k}</td><td>${pct(...{2: [65, 70], 3: [70, 75], 4: [75, 80], 5: [80, 85], 10: [85, 95]}[k])}</td></tr>`).join('')}</tbody></table></div>${msgs(m.msgs)}`);
      case 'cord':
        return card(m, null, `<p class="big">${esc(SAMPLE[m.vessel])}${m.ph != null ? `<small>pH ${esc(num(m.ph, 3))}${m.pco2 != null ? ` · PCO₂ ${esc(n1(m.pco2))} mmHg` : ''}</small>` : ''}</p>${msgs(m.msgs)}`);
      case 'cordpair':
        if (m.status === 'veri_eksik') return card(m, null, msgs(m.msgs));
        return card(m, null, `<p>ΔpH (ven − arter): <b>${m.dph == null ? '–' : esc(num(m.dph, 3))}</b> · ΔPCO₂ (arter − ven): <b>${m.dpco2 == null ? '–' : esc(num(m.dpco2, 2)) + ' kPa'}</b></p>${msgs(m.msgs)}` +
          calc('P-F04', ['ΔpH = pH ven − pH arter; ΔPCO₂ = PCO₂ arter − PCO₂ ven (kPa; mmHg girildiyse × 0,1333224)', 'Kalite kuralı: ΔpH <0,02 ya da ΔPCO₂ <0,5 kPa → uyarı (eşitlik uyarı vermez)']));
      default: return '';
    }
  }
  const has = v => v != null;
  function pregDkaHTML(m, R) {
    const S3 = {yes: 'karşılandı', no: 'karşılanmadı', missing: 'veri eksik'}, c = m.comp;
    const sub = (v, l) => `${esc(l)}: ${v === true ? 'karşılandı' : v === false ? 'karşılanmadı' : 'veri yok'}`;
    const rows = [['DKA keton ölçütü', c.dkaKetone.state, [sub(c.dkaKetone.bhb, 'β-hidroksibütirat ≥3,0 mmol/L') + (m.bhbValue != null ? ` (ölçülen ${num(m.bhbValue, 1)})` : ''), sub(c.dkaKetone.uk, 'idrar ketonu ≥2+ ya da orta/büyük')]],
      ['Asidoz', c.acidosis.state, [sub(c.acidosis.ph, 'pH <7,3'), sub(c.acidosis.bic, (c.acidosis.bicSrc === 'gas_hco3' ? 'kan gazı HCO₃' : 'HCO₃ (TCO₂)') + ' <18 mmol/L')]]];
    return card(m, 'Ketoasidoz değerlendirmesi (gebelik / emzirme)', `<div class="tbl"><table><thead><tr><th>Bileşen</th><th>Durum</th><th>Alt ölçütler</th></tr></thead><tbody>${rows.map(([k, s, subs]) => `<tr><td>${esc(k)}</td><td><b>${esc(S3[s])}</b></td><td class="small">${subs.join('<br>')}</td></tr>`).join('')}</tbody></table></div>
      <p class="small">Glukoz bir bileşen ya da dışlama kapısı olarak kullanılmadı.</p>${msgs(m.msgs)}${m.diff.length ? `<h4 style="margin-top:6px">Ayırıcı değerlendirmede görünür olanlar</h4>${msgs(m.diff)}` : ''}`);
  }
  function pedDkaHTML(m, R) {
    const S3 = {yes: 'karşılandı', no: 'karşılanmadı', missing: 'veri eksik'}, c = m.comp;
    const sub = (v, l) => `${esc(l)}: ${v === true ? 'karşılandı' : v === false ? 'karşılanmadı' : 'veri yok'}`;
    const rows = [
      ['Hiperglisemi', c.glucose.state, [sub(c.glucose.glucose, 'glukoz >11 mmol/L') + (c.glucose.mmol != null ? ` (${num(c.glucose.mmol, 1)} mmol/L)` : '')]],
      ['Asidoz', c.acidosis.state, [sub(c.acidosis.ph, 'venöz pH <7,3'), sub(c.acidosis.bic, (c.acidosis.bicSrc === 'gas_hco3' ? 'kan gazı HCO₃' : 'serum HCO₃ (TCO₂)') + ' <18 mmol/L')]],
      ['Keton ölçütü', c.ketosis.state, [sub(c.ketosis.bhb, 'β-hidroksibütirat ≥3 mmol/L'), sub(c.ketosis.uk, 'idrar ketonu orta/büyük')]]
    ];
    const sev = m.sev ? `<div class="tbl"><table><thead><tr><th>Şiddet (ISPAD 2022)</th><th>pH ile</th><th>HCO₃ ile</th><th>Gösterilen</th></tr></thead><tbody><tr><td>ağır: pH &lt;7,1 ya da HCO₃ &lt;5 · orta: &lt;7,2 ya da &lt;10 · hafif: &lt;7,3 ya da &lt;18</td><td>${esc(m.sev.ph ? SEV[m.sev.ph] : 'eşik dışı / veri yok')}</td><td>${esc(m.sev.hco3 ? SEV[m.sev.hco3] : 'eşik dışı / veri yok')}</td><td><b>${esc(m.sev.overall ? SEV[m.sev.overall] : '–')}</b></td></tr></tbody></table></div>` : '<p class="small">Şiddet tablosu yalnız üç bileşen karşılandığında ya da klinik DKA doğrulandığında gösterilir.</p>';
    return card(m, 'Çocuk DKA ölçütleri (ISPAD 2022)', `<div class="tbl"><table><thead><tr><th>Bileşen</th><th>Durum</th><th>Alt ölçütler</th></tr></thead><tbody>${rows.map(([k, s, subs]) => `<tr><td>${esc(k)}</td><td><b>${esc(S3[s])}</b></td><td class="small">${subs.join('<br>')}</td></tr>`).join('')}</tbody></table></div>
      <p>Sayısal olarak karşılanan bileşen: <b>${m.met} / 3</b></p>${sev}${msgs(m.msgs)}`);
  }

  /* Kısa sonuç: modüllerden türetilen tek satırlar; yeni yorum üretilmez */
  function shortHTML(R) {
    const L = [], n = R.n, Mo = R.modules;
    const sample = SAMPLE[n.sample_type];
    L.push(`<b>Örnek:</b> ${esc(sample)} · ${esc(AGE[n.age_group])}${n.age_group === 'adult' && R.scope !== 'cord' ? ' · ' + esc(n.maternal_context === 'unknown' ? 'gebelik bilinmiyor (gebelik dışı erişkin referansı)' : MCTX[n.maternal_context].toLowerCase()) : ''}`);
    if (R.scope === 'pediatric' || R.scope === 'neonatal') L.push(`<b>Kapsam:</b> ${esc(t(R.scope === 'neonatal' ? 'm.scope_neonatal' : 'm.scope_pediatric'))}`);
    if (Mo.cord) L.push(`<b>Kordon kanı:</b> ayrı akış · ${esc(SAMPLE[Mo.cord.vessel])}${Mo.cord.ph != null ? ` · pH ${esc(num(Mo.cord.ph, 3))}` : ''}`);
    if (Mo.cordpair && Mo.cordpair.status !== 'veri_eksik') L.push(`<b>Kordon çifti:</b> ${Mo.cordpair.flag ? 'kalite uyarısı (aynı damar olabilir); yeniden etiketleme yok' : 'bu kalite kuralında uyarı yok; kesin doğruluk kanıtı değil'}`);
    if (Mo.hie) L.push(`<b>Yenidoğan uzmanı değerlendirmesi:</b> ${esc(t('m.hie_expert'))} ${esc(t('m.hie_no_cooling'))}`);
    if (Mo.ph && Mo.ph.local) L.push(`<b>pH ${esc(num(Mo.ph.value, 3))}:</b> ${esc({below: 'yerel referansın altında', within: 'yerel referans aralığında', above: 'yerel referansın üstünde'}[Mo.ph.cls])}`);
    else if (Mo.ph && Mo.ph.status === 'veri_eksik' && Mo.ph.value != null) L.push(`<b>pH ${esc(num(Mo.ph.value, 3))}:</b> yerel referans girilmedi; normal/anormal etiketi yok`);
    if (R.errors.length) L.push(`<b>Düzeltilmesi gereken giriş:</b> ${R.errors.map(e => esc(LBL[e.field] || e.field)).join(', ')}`);
    if (R.suspended) L.push(`<b>Bütünleşik yorum askıya alındı.</b> ${esc(Mo.hh && Mo.hh.status === 'gozden_gecirilmeli' ? 'Girilen pH, PCO₂ ve HCO₃ birbirine uymuyor.' : t('m.temp_mixed'))}`);
    if (Mo.ph && Mo.ph.dir && !Mo.ph.local) L.push(`<b>pH ${esc(num(Mo.ph.value, 3))}:</b> ${esc({acidemia: 'asidemi', alkalemia: 'alkalemi', within: 'referans aralığında; değerlendirme sürüyor'}[Mo.ph.dir])}${Mo.ph.assume ? ' · gebe olmayan erişkin varsayımıyla' : ''}`);
    if (Mo.proc && Mo.proc.hyps) {
      if (!Mo.proc.hyps.length) L.push(esc(t('m.proc_none')));
      for (const h of Mo.proc.hyps) {
        let s;
        if (h.exp) s = `beklenen PaCO₂ ${n1(h.exp.lo)}–${n1(h.exp.hi)}, ölçülen ${n1(h.measured)}: ${h.pos === 'within' ? 'beklenen yanıtla uyumlu' : h.pos === 'above' ? 'beklenenden yüksek, ek solunumsal asidoz olası' : 'beklenenden düşük, ek solunumsal alkaloz olası'}`;
        else s = `akut tahmin ${n2(h.acute)}, kronik ${n2(h.chronic)}, ölçülen HCO₃ ${n1(h.measured)}${h.pos === 'between' ? `; ${h.nearer === 'equal' ? t('h.near.equal') : tf('h.resp.nearer', {near: t('h.near.' + h.nearer)})}` : `; iki tahminin de ${h.pos === 'below' ? 'altında' : 'üstünde'}`}`;
        L.push(`<b>${esc(t('h.' + h.id))}</b> (${esc(t('h.align.' + h.align))}): ${esc(s)}`);
      }
    } else if (Mo.proc) L.push(`<b>Süreç ve kompansasyon:</b> ${esc(t('status.' + Mo.proc.status).toLowerCase())}${Mo.proc.msgs[0] ? ' · ' + esc(t('m.' + Mo.proc.msgs[0])) : ''}`);
    if (Mo.hcap && Mo.hcap.status !== 'veri_eksik') {
      const keyM = Mo.hcap.msgs.filter(x => ['hc_venous', 'hc_sample_other', 'hc_scope_ped', 'hc_scope_preg', 'hc_acidemia', 'hc_normal_ph', 'hc_acute_possible', 'hc_chronic_possible', 'hc_hco3_above', 'hc_hco3_below', 'hc_spo2_separate', 'hc_no_baseline', 'hc_baseline_limited'].includes(x));
      L.push(`<b>Hiperkapni bağlamı (eğitim kartı):</b> ${keyM.map(x => esc(t('m.' + x))).join(' ')} <span class="muted">Ayrıntı ve sınırlar: Adımlar sekmesi.</span>`);
    }
    /* 8–10. tur: kısa satırlar kart durumundan türetilir (kapalı kartın değeri burada da görünmez) */
    if (Mo.tox) L.push(`<b>Maruziyet bağlamı:</b> ${esc(t('m.' + Mo.tox.msgs[0]))}`);
    if (Mo.og) L.push(`<b>Osmolal açıklık:</b> ${Mo.og.value != null ? `${esc(n1(Mo.og.value))} mOsm/kg (${Mo.og.used === 'ethanol_zero' ? 'etanol 0' : Mo.og.used === 'ideal_4_6' ? 'ideal profil' : 'Purssell profili'})${Mo.og.status === 'gozden_gecirilmeli' ? ' · yorum sınırlı' : ''}` : Mo.og.ideal != null ? `profil seçilmedi; ideal ${esc(n1(Mo.og.ideal))}, Purssell ${esc(n1(Mo.og.purssell))} ayrı gösterildi` : esc(t('status.' + Mo.og.status).toLowerCase())} · normal/dışlandı etiketi verilmez`);
    if (Mo.salicylate) L.push(`<b>Salisilat:</b> ${Mo.salicylate.mgdl != null ? `${esc(n1(Mo.salicylate.mgdl))} mg/dL (${esc(n1(Mo.salicylate.mgl))} mg/L) · otomatik eşik sınıfı yok` : 'birim seçilmedi; karşılaştırma yapılmadı'}`);
    if (Mo.lacgap) L.push(`<b>Laktat yöntem farkı:</b> ${Mo.lacgap.diff != null ? `${esc(n1(Mo.lacgap.diff))} mmol/L${Mo.lacgap.status === 'hesaplandi' ? '' : ' (yalnız aritmetik)'} · evrensel eşik yok` : 'veri eksik'}`);
    if (Mo.renal) L.push(`<b>Böbrek bağlamı:</b> ${esc(Object.fromEntries(OPT.renal_context)[Mo.renal.ctx])} (kullanıcı girişi) · gazdan evre/tanı yok${Mo.renal.msgs.includes('krt_under_treatment') ? ' · örnek KRT altında' : ''}`);
    if (Mo.uag) L.push(`<b>İdrar AG:</b> ${Mo.uag.value != null ? `${esc((Mo.uag.value > 0 ? '+' : '') + n1(Mo.uag.value))} mmol/L${Mo.uag.status === 'hesaplandi' ? '' : ' (yalnız aritmetik)'} · amonyum ölçümü değil` : esc(t('status.' + Mo.uag.status).toLowerCase())}`);
    if (Mo.caratio) L.push(`<b>Total Ca / iCa:</b> ${Mo.caratio.ratio != null ? `${esc(caFmt(Mo.caratio))}${Mo.caratio.msgs.includes('rca_2026_met') ? ' · RCA doğrulanmış, 2026 profil koşulu karşılandı (şüphe bağlamı, tanı değil)' : Mo.caratio.msgs.includes('ca_concurrency_unknown') ? ' · yalnız aritmetik' : ''}` : 'hasta oranı hesaplanmadı · ' + esc(t('m.' + Mo.caratio.msgs[0]))}`);
    if (Mo.ag && Mo.ag.status !== 'veri_eksik') L.push(`<b>AG ${esc(n1(Mo.ag.value))} mmol/L</b>${Mo.agc && Mo.agc.status === 'hesaplandi' ? ` · albüminle düzeltilmiş ${esc(n1(Mo.agc.value))}` : ''}${Mo.delta && Mo.delta.gap != null ? ` · delta farkı ${esc(n1(Mo.delta.gap))}${Mo.delta.ratio != null ? `, oran ${esc(n2(Mo.delta.ratio))}` : ''}` : ''}${Mo.ag.cls ? ' · ' + esc(tf('ag.cls.' + Mo.ag.cls, {lo: num(Mo.ag.interval[0], 0), hi: num(Mo.ag.interval[1], 0)})) : ' · yerel referans aralığı yok, kesin sınıflama yapılmadı'}${Mo.agk && Mo.agk.value != null ? ` · potasyumlu AG_K ${esc(n1(Mo.agk.value))} (ayrı formül)` : ''}`);
    if (Mo.pf && Mo.pf.status === 'hesaplandi') L.push(`<b>PaO₂/FiO₂ ${esc(num(Mo.pf.value, 0))} mmHg</b>${Mo.pf.approx ? ' (yaklaşık)' : ''} · ARDS sınıflaması yapılmaz`);
    if (Mo.aa && Mo.aa.status === 'hesaplandi') L.push(`<b>A–a farkı (oda havası) ${esc(n1(Mo.aa.value))} mmHg</b>`);
    if (Mo.cao2 && Mo.cao2.status === 'hesaplandi') L.push(`<b>CaO₂ ${esc(n1(Mo.cao2.value))} mL/dL</b>`);
    if (Mo.dyshb) L.push(`<b>Dishemoglobin bağlamı:</b> ${esc(t('m.spo2_unreliable'))} Ko-oksimetri sonucu ve maruziyet öyküsü gerekli.`);
    if (Mo.lactate && Mo.lactate.status !== 'veri_eksik') L.push(`<b>Laktat:</b> ${Mo.lactate.series.map(s => esc(n1(s.v))).join(' → ')} mmol/L${Mo.lactate.change != null ? ` (göreli değişim ${esc(n1(Mo.lactate.change))} %)` : ''}`);
    if (Mo.dka && !Mo.dka.ped && !Mo.dka.preg && Mo.dka.anyInput) L.push(`<b>DKA ölçütleri:</b> ${Mo.dka.met}/3 bileşen sayısal olarak karşılandı${Object.values(Mo.dka.comp).some(c => c.state === 'missing') ? ', en az biri veri eksik' : ''} · klinik tanı değildir`);
    if (Mo.dkares) L.push(`<b>DKA düzelme:</b> ${esc({yes: 'sayısal ölçütler karşılandı', no: 'ölçütler karşılanmadı', missing: 'veri eksik'}[Mo.dkares.all])}`);
    if (Mo.oi && Mo.oi.value != null) L.push(`<b>OI ${esc(n1(Mo.oi.value))}</b> · indeks; tek başına tanı değil${Mo.oi.classifiable ? '' : ' · sınıflamada kullanılmadı (geçerlilik doğrulanmadı)'}`);
    if (Mo.osi && Mo.osi.value != null) L.push(`<b>OSI ${esc(n1(Mo.osi.value))}</b> · ${Mo.osi.classifiable ? 'sınıflamaya uygun ölçüm' : 'sınıflama durduruldu (SpO₂ aralığı, sinyal ya da kararlılık)'}`);
    if (Mo.pards && Mo.pards.crit) L.push(`<b>PALICC-2:</b> oksijenasyon ölçütü ${({met: 'karşılandı', not_met: 'karşılanmadı', missing: 'değerlendirilemedi', unverified: 'değerlendirilmedi (ölçüm geçerliliği doğrulanmadı)'})[Mo.pards.crit]} · şiddet ${Mo.pards.sev ? esc(SEV[Mo.pards.sev]) : 'etiketi verilmedi'}`);
    if (Mo.nards && Mo.nards.oi != null) L.push(`<b>Montreux:</b> ${Mo.nards.sev ? esc(SEV[Mo.nards.sev]) : 'şiddet etiketi verilmedi'}`);
    if (Mo.delivery && Mo.delivery.minute != null) L.push(`<b>Doğum salonu, ${Mo.delivery.minute}. dakika:</b> ${Mo.delivery.row ? `preduktal hedef ${pct(Mo.delivery.row[0], Mo.delivery.row[1])}` : 'tabloda bu dakika için hedef yok'}`);
    if (Mo.age && Mo.age.pma != null) L.push(`<b>Postmenstrüel yaş:</b> ${Mo.age.pmaW} hafta ${Mo.age.pmaD} gün`);
    if (Mo.base) L.push(`<b>BE/BD ${esc((Mo.base.value > 0 ? '+' : '') + n1(Mo.base.value))}</b> · ${esc(BETYPE[Mo.base.type])}${Mo.base.type === 'unknown' ? '; eşik ve işaret dönüşümü durduruldu' : ''}`);
    if (Mo.dka && Mo.dka.ped && Mo.dka.anyInput) L.push(`<b>Çocuk DKA (ISPAD 2022):</b> ${Mo.dka.met}/3 bileşen${Mo.dka.sev ? ` · şiddet ${esc(SEV[Mo.dka.sev.overall] || '–')}${Mo.dka.sev.mismatch ? ' (pH ve HCO₃ farklı şiddet gösteriyor)' : ''}` : ''}${Mo.dka.euglycemic ? ' · öglisemik DKA dahil klinik inceleme' : ''}`);
    if (Mo.sample) L.push(`<b>Numune:</b> ${Mo.sample.known.length} bilinen hata · ${Mo.sample.possible.length} olası etki · ${Mo.sample.unknown.length} eksik kalite bilgisi${Mo.sample.delay != null ? ` · örnek→analiz ${num(Mo.sample.delay, 0)} dk${Mo.sample.protocol != null ? (Mo.sample.known.some(w => w.code === 'q_delay_protocol') ? ' (kurum protokolü aşıldı)' : '') : ' (protokol girilmedi)'}` : ''}`);
    if (Mo.co2rel) L.push(`<b>Göreceli CO₂ yükselişi:</b> PaCO₂ ${esc(n1(Mo.co2rel.pco2))} mmHg, solunumsal belirtiyle; tek başına tanı ya da entübasyon eşiği değil`);
    if (Mo.o2target) L.push(`<b>Oksijen hedefi:</b> ${Mo.o2target.target ? `seçilen profil ${pct(Mo.o2target.target[0], Mo.o2target.target[1])}` : 'profil seçilmedi; tek varsayılan hedef üretilmedi'}`);
    if (Mo.fetal && Mo.fetal.msgs[0] === 'fetal_no_routine_o2') L.push(`<b>Fetal endişe, anne hipoksisi yok:</b> rutin maternal oksijen önerilmez; obstetrik değerlendirme`);
    if (Mo.pe) L.push(`<b>PE şüphesi:</b> kan gazı dışlamaz`);
    if (Mo.o2delivery) L.push(`<b>Oksijen sunumu:</b> PaO₂ iyi olsa da anemi/kanamanın etkisi dışlanmaz`);
    if (Mo.sepsis) L.push(`<b>Sepsis bağlamı:</b> ${Mo.sepsis.branch === 'met' ? 'NICE yüksek risk dalı karşılandı; ileri bakım değerlendirmesi' : Mo.sepsis.branch === 'not_met' ? 'NICE dalı karşılanmadı; bu düşük risk anlamına gelmez' : 'risk bağlamı eksik; eşikler tam algoritma gibi kullanılmaz'}${Mo.sepsis.msgs.includes('sepsis_consider_smfm') ? ' · organ bozukluğu: ateş olmasa da sepsis düşünülür' : ''}`);
    if (Mo.dka && Mo.dka.preg && Mo.dka.anyInput) L.push(`<b>Ketoasidoz (gebelik/emzirme):</b> DKA keton ölçütü ${({yes: 'karşılandı', no: 'karşılanmadı', missing: 'veri eksik'})[Mo.dka.comp.dkaKetone.state]}${Mo.dka.ketDetected && Mo.dka.comp.dkaKetone.state === 'no' ? ' (keton ölçüldü; bu ketoz yok demek değil)' : ''}, asidoz ${({yes: 'var', no: 'yok', missing: 'veri eksik'})[Mo.dka.comp.acidosis.state]}; glukoz dışlama kapısı değil${Mo.dka.diff.length ? ' · ayırıcı tanılar adım adım bölümünde' : ''}`);
    if (Mo.preg && n.pregnancy === 'yes') L.push(`<b>${esc(MCTX[n.maternal_context])}:</b> standart erişkin sınıflaması durduruldu; derleme fizyolojisi aralıkları adım adım bölümünde, normal etiketi olarak değil.`);
    const counts = {}; Object.values(Mo).forEach(m => { counts[m.status] = (counts[m.status] || 0) + 1; });
    return `<ul class="summary">${L.map(x => `<li>${x}</li>`).join('')}</ul>
      <p class="small muted">${Object.entries(counts).map(([k, v]) => `${esc(t('status.' + k))}: ${v}`).join(' · ')} · kural sürümü ${esc(R.version)}</p>
      ${askHTML(R)}`;
  }
  /* Klinikle ilişkilendir: tamamlayıcı sorular (tedavi emri değil). Örnek yönlendirmeler 03_ASIT_BAZ_ORUNTULERI tablosundan [3] */
  function askHTML(R) {
    const Q = [], Mo = R.modules, ids = Mo.proc && Mo.proc.hyps ? Mo.proc.hyps.map(h => h.id) : [];
    if (ids.includes('met_acid')) Q.push('HCO₃ düşüklüğü için: laktat, ketonlar, böbrek işlevi ve bikarbonat kaybı açısından klinik ve laboratuvar bilgisi var mı? [3]');
    if (ids.includes('met_alk')) Q.push('HCO₃ yüksekliği için: gastrointestinal kayıp ya da diüretik kullanımı var mı? [3]');
    if (ids.includes('resp_acid')) Q.push('PaCO₂ yüksekliği için: alveoler ventilasyonu azaltan bir durum var mı? Süre ve önceki kan gazı biliniyor mu? [3]');
    if (ids.includes('resp_alk')) Q.push('PaCO₂ düşüklüğü için: solunum dürtüsünü artıran neden araştırıldı mı? Süre ve önceki kan gazı biliniyor mu? [3]');
    if (Mo.pf && Mo.pf.status === 'hesaplandi') Q.push('FiO₂ örnek alındığı anda mı kaydedildi? Son destek değişikliğinden bu yana ne kadar geçti?');
    if (Mo.agc && Mo.agc.status === 'hesaplandi') Q.push('Laktat doğrudan ölçüldü mü? Düzeltilmiş AG hiperlaktatemiyi dışlamaz. [19]');
    Q.push('Önceki ölçümler, diyaliz zamanı, diüretik kullanımı ve son ventilasyon değişikliği gibi bağlam bilgileri değerlendirildi mi?');
    return `<div class="panel"><h3 class="h-sm">Klinikle ilişkilendir</h3><ul class="ask">${Q.map(q => `<li>${esc(q).replace(/\[(\d+)\]/g, (m, d) => cite([+d]))}</li>`).join('')}</ul><p class="small muted">Bu sorular tamamlayıcıdır; site entübasyon, ventilatör ayarı, ilaç dozu, sepsis ya da ARDS kararı üretmez.</p></div>`;
  }
  function missingHTML(R) {
    const Mo = R.modules, by = {};
    R.missing.forEach(x => { (by[x.field] = by[x.field] || new Set()).add(x.mod); });
    const na = Object.values(Mo).filter(m => m.status === 'uygulanamaz');
    return `<div class="missing-list">${Object.keys(by).length ? `<h3 class="h-sm">Girilirse açılacak hesaplar</h3><ul>${Object.entries(by).map(([f, ms]) => `<li><b>${esc(LBL[f] || f)}</b> → ${[...ms].map(m => esc(t('mod.' + m))).join(', ')}</li>`).join('')}</ul>` : '<p>Eksik alan nedeniyle kapalı hesap yok.</p>'}
      ${na.length ? `<h3 class="h-sm">Bu örnek için uygulanmayan hesaplar</h3><ul>${na.map(m => `<li><b>${esc(t('mod.' + m.id))}</b>: ${esc(m.msgs && m.msgs[0] ? tf('m.' + m.msgs[0], {ag: n1(m.agUse), r: num(m.agRef, 0)}) : '')}</li>`).join('')}</ul>` : ''}
      <p class="note">Eksik değerler tahminle doldurulmaz. Bir kartın hesaplanamaması diğer geçerli kartların gösterilmesini engellemez.</p></div>`;
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
    const tabs = [['short', 'Kısa sonuç'], ['steps', 'Adım adım'], ['missing', 'Eksik bilgiler', nMiss], ['src', 'Kaynaklar', srcN]];
    const urgent = [R.modules.dka && R.modules.dka.urgent ? t(R.modules.dka.preg ? 'm.preg_dka_urgent' : 'm.dka_neuro_urgent') : null, R.modules.hie && R.modules.hie.urgent ? t('m.hie_expert') : null, R.modules.tox && R.modules.tox.urgent ? t('m.tox_worsening_urgent') : null].filter(Boolean)
      .map(x => `<div class="banner stop"><span class="ic">!</span><div><b>Zaman duyarlı klinik değerlendirme</b><p>${esc(x)}</p></div></div>`).join('');
    const assume = (R.assumptions || []).includes('not_pregnant') ? `<div class="banner info"><span class="ic">?</span><div><b>Gebelik bağlamı seçilmedi</b><p>${esc(t('m.assume_not_pregnant'))}</p></div></div>` : '';
    const banner = urgent + assume + (R.suspended ? `<div class="banner stop"><span class="ic">!</span><div><b>Bütünleşik yorum askıya alındı</b><p>${esc(R.modules.hh && R.modules.hh.status === 'gozden_gecirilmeli' ? t('m.hh_inconsistent') : t('m.temp_mixed'))}</p></div></div>` : '');
    box.innerHTML = `<div class="res-head"><h2 class="h-sm">Sonuç</h2><span class="chip">kural ${esc(R.version)} · tarayıcıda hesaplandı</span></div>${banner}
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
  const koahCaseHTML = k => `<div class="wrap" style="margin-bottom:14px"><div class="panel"><span class="synthetic">Sentetik veri · gerçek hasta değil</span>
      <p style="margin-top:8px"><b>${esc(k.id)} · ${esc(k.baslik)}.</b> ${esc(k.baglam)}</p>
      <details style="margin-top:8px"><summary><b>Paketteki beklenen yorum</b></summary><p style="margin-top:6px">${k.beklenen_html}</p><p class="small"><b>Üretilmemeli:</b> ${esc(k.uretilmemeli)}</p><p class="small muted">Dayanak: ${cite(k.kaynaklar)}</p></details></div></div>`;
  /* 8–10. tur olgusu: bağlam metni, görünür alanlara açıkça eşlenen bilgi, beklenen ve üretilmemesi gereken yorum ayrı gösterilir */
  const r8MapHTML = k => { const e = k.eslesme, rows = [...e.ek.map(f => [f, k.mode === 'eval' ? k.girdiler[f] : k.points[0].values[f]]), ...Object.entries(e.nokta || {}).flatMap(([pid, o]) => Object.entries(o).map(([f, v]) => [f + ' (' + pid + ')', v]))];
    const val = (f, v) => { const key = f.replace(/ \(.*\)$/, ''); return v === true ? 'işaretli' : OPT[key] ? (OPT[key].find(o => o[0] === v) || [0, v])[1] : String(v); };
    return `<p class="small" style="margin-top:6px"><b>Bağlamdan görünür alanlara eşlenen:</b> ${rows.length ? rows.map(([f, v]) => `${esc(LBL[f.replace(/ \(.*\)$/, '')] || f)}${/ \(/.test(f) ? ' ' + esc(f.match(/\(.*\)$/)[0]) : ''} = <b>${esc(val(f, v))}</b>`).join(' · ') : 'yok (yalnız paketteki nokta alanları)'}${e.olaylar.length ? ` · olay: ${e.olaylar.map(o => esc((SER_EV.find(x => x[0] === o.type) || [0, o.type])[1]) + (o.between ? ` (${esc(o.between.join(' → '))} arası)` : '')).join(', ')}` : ''}</p>` +
      (e.kaynak_ifade ? `<p class="small muted">Eşleme dayanağı: ${esc(e.kaynak_ifade)}</p>` : '') + (k.atlas_notu ? `<p class="note" style="margin-top:6px">${esc(k.atlas_notu)}</p>` : ''); };
  const r8CaseHTML = k => `<div class="wrap" style="margin-bottom:14px"><div class="panel" data-r8case="${esc(k.id)}"><span class="synthetic">Sentetik veri · gerçek hasta değil</span>
      <p style="margin-top:8px"><b>${esc(k.id)} · ${esc(k.baslik)}.</b> ${esc(k.baglam)}</p>${r8MapHTML(k)}
      <details style="margin-top:8px"><summary><b>Paketteki beklenen yorum</b></summary><p style="margin-top:6px">${k.beklenen_html}</p><p class="small"><b>Üretilmemeli:</b> ${esc(k.uretilmemeli)}</p><p class="small muted">Kurallar: ${k.kurallar.map(esc).join(', ')} · Dayanak: ${cite(k.kaynaklar)}</p></details></div></div>`;
  function viewEval(caseId, tab) {
    if (caseId === 'yeni') caseId = null;     // KGAPP.load ile gelen durum korunur
    if (caseId) loadCase(caseId);
    if (tab && ['short', 'steps', 'missing', 'src'].includes(tab)) resTab = tab;
    view.innerHTML = `<div class="wrap page-head"><p class="eyebrow">Kan gazını değerlendir</p><h1>Değerlendir</h1>
      <p class="lede">Değerleri girdikçe hesaplar güncellenir. Her hesap koşulu sağlanınca yapılır; eksik veri tahminle doldurulmaz. Sonuçlar eğitim amaçlıdır, klinik karar değildir.</p></div>
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
    const steps = [['Örneği tanı', 'Arteriyel mi, venöz mü? Zaman, birim, sıcaklık', '#/ogren/ornek'], ['Tutarlılığa bak', 'pH, PCO₂ ve HCO₃ birbirine uyuyor mu?', '#/ogren/ornek'], ['pH yönü', 'Asidemi, alkalemi ya da referans içi', '#/ogren/temeller'],
      ['Olası süreçler', 'Dört süreç ayrı hipotezler', '#/ogren/oruntuler'], ['Kompansasyon', 'Beklenen yanıt ve sapma', '#/ogren/oruntuler'], ['Anyon açıklığı', 'Albümin ve delta', '#/ogren/anyon'],
      ['Oksijenasyon', 'Ayrı bir soru: PF, A–a, içerik', '#/ogren/oksijen'], ['Eksik bilgi', 'Ne bilmiyoruz?', '#/ogren/ozel']];
    view.innerHTML = `<section class="wrap hero">
      <div><p class="eyebrow">Anestezi ve yoğun bakım için</p><h1>Kan gazını adım adım okumak</h1>
        <p class="lede">Erişkin, gebe, çocuk ve yenidoğanda kan gazını örnekten başlayarak, her adımı gerekçesi ve kaynağıyla değerlendirin. Girdiğiniz verilerle hangi hesapların yapılabildiğini, hangilerinin neden yapılamadığını görün.</p>
        <ul class="facts"><li><b>${C.formulas.length + C.ped.formulas.length + C.r810.formulas.length}</b> hesap tanımı</li><li><b>${C.rules.length + C.ped.rules.length + C.preg.rules.length + C.sample.rules.length + C.serial.rules.length + C.koah.rules.length + C.r810.rules.length}</b> kural</li><li><b>${C.cases.length + C.ped.cases.length + C.preg.cases.length + C.serial.cases.length + C.koah.cases.length + C.r810.cases.length}</b> sentetik olgu ve senaryo</li><li><b>${C.lessons.length}</b> ders</li><li><b>${C.sources.length}</b> kaynak</li></ul>
        <div class="row"><a class="btn" href="#/degerlendir">Kan gazını değerlendir</a><a class="btn ghost" href="#/ogren/temeller">Sıfırdan öğren</a></div></div>
      <div class="panel">${KGC.map(cases, {aria: 'Dört sentetik olgunun pH–PCO₂ haritasındaki yeri'})}<p class="small muted">Dört sentetik olgu pH–PCO₂ haritasında. Eğriler eşit HCO₃ çizgileridir (Henderson–Hasselbalch); gri bant erişkin arteriyel pH referansı (7,35–7,45) [2].</p></div>
    </section>
    <section class="wrap path"><h2 class="h-sm">Değerlendirme sırası</h2><ol class="steps">${steps.map(([b, s, h], i) => `<li><a href="${h}"><span class="n">${String(i + 1).padStart(2, '0')}</span><b>${esc(b)}</b><span>${esc(s)}</span></a></li>`).join('')}</ol>
      <p class="small muted" style="margin-top:10px">Bu sıra ürün tasarımıdır; doğrulanmış tek bir tanı ölçeği değildir.</p></section>
    <section class="wrap page"><div class="grid2">
      <div class="panel"><h3 class="h-sm">Bu site ne yapar?</h3><ul class="ask"><li>Formülleri koşullarıyla uygular; her sonuçta kullanılan değerleri, formülü ve kaynağı gösterir.</li><li>Birden fazla olası süreci ve belirsiz kronisiteyi birlikte gösterir; normal pH'ta incelemeyi bitirmez.</li><li>Eksik bilgiyi açıkça listeler; bilinmeyeni normal değerle doldurmaz.</li><li>Hesapları yalnız tarayıcınızda yapar; hiçbir veri gönderilmez ya da saklanmaz.</li></ul></div>
      <div class="panel"><h3 class="h-sm">Ne yapmaz?</h3><ul class="ask"><li>Tanı koymaz; ARDS, sepsis ya da DKA tanısı ve "kesin tanı" rozeti üretmez.</li><li>Entübasyon, ventilatör ayarı, insülin, potasyum ya da bikarbonat dozu önermez.</li><li>Çocuk, yenidoğan ve kordon örneklerini erişkin kurallarıyla yorumlamaz; çocukta yerel referans olmadan "normal" demez. HIE ya da soğutma uygunluğuna karar vermez.</li></ul></div>
    </div></section>`;
  }

  /* ================= Öğren ================= */
  const LAB = {
    'p-pards': () => `<div class="lab" id="lab-oi"><h3>OI ve OSI nasıl değişir?</h3>
      <p class="small">FiO₂ ve ortalama hava yolu basıncı artarken PaO₂ ya da SpO₂ aynı kalırsa indeks yükselir. Eşikler iki ayrı profilde gösterilir; tablolar birbirinin yerine kullanılmaz. Sayılar örnektir.</p>
      <div class="sl"><label for="sl-f">FiO₂ (kesir)</label><input type="range" id="sl-f" min="0.21" max="1" step="0.01" value="0.6"><output id="o-f"></output></div>
      <div class="sl"><label for="sl-w">Ortalama hava yolu basıncı (cmH₂O)</label><input type="range" id="sl-w" min="4" max="30" step="1" value="12"><output id="o-w"></output></div>
      <div class="sl"><label for="sl-o">PaO₂ (mmHg)</label><input type="range" id="sl-o" min="30" max="150" step="1" value="60"><output id="o-o"></output></div>
      <div class="sl"><label for="sl-s">SpO₂ (%)</label><input type="range" id="sl-s" min="80" max="100" step="1" value="90"><output id="o-s"></output></div>
      <div id="lab-oi-out"></div></div>`,
    temeller: () => `<div class="lab" id="lab-scale"><h3>İki kefeli terazi: pH normal, süreçler değil</h3>
      <p class="small">HCO₃ ve PCO₂'yi değiştirin; pH Henderson–Hasselbalch ilişkisiyle hesaplanır. İki karşıt değişiklik pH'ı referans aralığında tutabilir. Özgün eğitim benzetmesidir; tampon sistemlerinin tam modeli değildir.</p>
      <div class="sl"><label for="sl-h">HCO₃ (mmol/L)</label><input type="range" id="sl-h" min="6" max="45" step="1" value="12"><output id="o-h"></output></div>
      <div class="sl"><label for="sl-p">PCO₂ (mmHg)</label><input type="range" id="sl-p" min="12" max="90" step="1" value="18"><output id="o-p"></output></div>
      <div class="row">${[['Başlangıç noktası', 24, 40], ['Karşıt iki süreç', 12, 18], ['Aynı yönde iki süreç', 12, 40], ['Yalnız HCO₃ düşük', 12, 40]].slice(0, 3).map(([l, h, p]) => `<button type="button" class="btn ghost sm" data-preset="${h},${p}">${l}</button>`).join('')}</div>
      <p class="big" id="o-ph" style="font:800 26px var(--f-display)"></p><div id="lab-map"></div></div>`,
    oruntuler: () => `<div class="lab" id="lab-comp"><h3>Beklenen yanıtı keşfedin</h3>
      <p class="small">Birincil değişikliği seçin; motorun kullandığı formülle beklenen yanıt hesaplanır. Sayılar formüllerin yaklaşık ilişkileridir, biyolojik kesin sınır değildir.</p>
      <div class="row" role="radiogroup">${[['met_acid', 'Metabolik asidoz'], ['met_alk', 'Metabolik alkaloz'], ['resp_acid', 'Solunumsal asidoz'], ['resp_alk', 'Solunumsal alkaloz']].map(([k, l], i) => `<label class="chip"><input type="radio" name="cp" value="${k}"${i ? '' : ' checked'}> ${l}</label>`).join('')}</div>
      <div class="sl"><label for="sl-c" id="sl-c-l"></label><input type="range" id="sl-c"><output id="o-c"></output></div><div id="lab-comp-out"></div></div>`,
    anyon: () => `<div class="lab" id="lab-ag"><h3>Albümin anyon açıklığını nasıl maskeler?</h3>
      <p class="small">Ölçülen açıklık aynı kalırken albümin düştükçe düzeltilmiş açıklık yükselir. Referans değerler örnektir; kendi laboratuvarınızınkini kullanın.</p>
      <div class="sl"><label for="sl-ag">Ölçülen AG (mmol/L)</label><input type="range" id="sl-ag" min="0" max="30" step="1" value="12"><output id="o-ag"></output></div>
      <div class="sl"><label for="sl-alb">Albümin (g/dL)</label><input type="range" id="sl-alb" min="1" max="5" step=".1" value="2"><output id="o-alb"></output></div>
      <div class="sl"><label for="sl-ar">Albümin referansı (g/dL)</label><input type="range" id="sl-ar" min="3.5" max="4.5" step=".1" value="4"><output id="o-ar"></output></div>
      <div id="lab-ag-out"></div></div>`
  };
  function bindLabs(id) {
    if (id === 'p-pards') {
      const ids = ['f', 'w', 'o', 's'], el = k => document.getElementById('sl-' + k);
      const draw = () => {
        ids.forEach(k => { document.getElementById('o-' + k).textContent = num(+el(k).value, k === 'f' ? 2 : 0); });
        const oi = KG.F['P-F01'](+el('f').value, +el('w').value, +el('o').value), osi = KG.F['P-F02'](+el('f').value, +el('w').value, +el('s').value), sp = +el('s').value, ok = sp >= 88 && sp <= 97;
        const mont = oi >= 16 ? 'ağır' : oi >= 8 ? 'orta' : oi >= 4 ? 'hafif' : 'aralık altında';
        document.getElementById('lab-oi-out').innerHTML = `<div class="grid2"><div class="panel"><p class="big" style="font:800 26px var(--f-display)">OI ${num(oi, 1)}</p><p class="small">PALICC-2 (çocuk, invaziv): oksijenasyon ölçütü OI ≥4 → ${oi >= 4 ? 'karşılanır' : 'karşılanmaz'}; ağır eşiği OI ≥16 → ${oi >= 16 ? 'üstünde' : 'altında'} ${cite([22])}</p><p class="small">Montreux (yenidoğan, NARDS doğrulanmışsa): ${mont} ${cite([33])}</p></div>
          <div class="panel"><p class="big" style="font:800 26px var(--f-display)">OSI ${num(osi, 1)}</p><p class="small">${ok ? `PALICC-2: OSI ≥5 ölçütü → ${osi >= 5 ? 'karşılanır' : 'karşılanmaz'}; ağır eşiği OSI ≥12 → ${osi >= 12 ? 'üstünde' : 'altında'}` : 'SpO₂ %88–97 dışında: PALICC-2 OSI sınıflaması yapılmaz'} ${cite([22])}</p><p class="small">Montreux tablosunda OSI yoktur.</p></div></div>
          <p class="small muted">Hiçbir eşik tek başına tanı değildir; şiddet etiketi klinik tanı, süre ve dışlama koşullarıyla birlikte verilir.</p>`;
      };
      ids.forEach(k => { el(k).oninput = draw; }); draw();
    }
    if (id === 'temeller') {
      const h = document.getElementById('sl-h'), p = document.getElementById('sl-p');
      const draw = () => {
        const ph = KG.F['hh-ph'](+h.value, +p.value), within = ph >= 7.35 && ph <= 7.45;
        document.getElementById('o-h').textContent = h.value; document.getElementById('o-p').textContent = p.value;
        document.getElementById('o-ph').textContent = `pH ${num(ph, 2)} · ${ph < 7.35 ? 'asidemi' : ph > 7.45 ? 'alkalemi' : 'referans aralığında'}`;
        const tags = []; if (+h.value < 24) tags.push('HCO₃ düşük yönde (asidifiye edici)'); if (+h.value > 24) tags.push('HCO₃ yüksek yönde (alkalinize edici)'); if (+p.value > 40) tags.push('PCO₂ yüksek yönde (asidifiye edici)'); if (+p.value < 40) tags.push('PCO₂ düşük yönde (alkalinize edici)');
        document.getElementById('lab-map').innerHTML = KGC.map([{ph, pco2: +p.value, label: 'pH ' + num(ph, 2)}]) + `<p class="small">${tags.length ? esc(tags.join(' · ')) : 'İki değer formül başlangıç noktalarında.'}${within && tags.length >= 2 ? ' — pH referans içinde olsa da iki süreç birlikte var olabilir.' : ''}</p>`;
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
        document.getElementById('sl-c-l').textContent = met ? 'HCO₃ (mmol/L)' : 'PaCO₂ (mmHg)';
        document.getElementById('o-c').textContent = sl.value;
        const v = +sl.value;
        if (met) { const e = k === 'met_acid' ? KG.F.winter(v) : KG.F['met-alk'](v); const ph = KG.F['hh-ph'](v, e.center);
          out.innerHTML = `<p>Beklenen PaCO₂: <b>${n1(e.lo)}–${n1(e.hi)} mmHg</b> (${k === 'met_acid' ? 'Winter: 1,5 × HCO₃ + 8 ± 2' : '0,7 × HCO₃ + 20 ± 5'}) ${cite(KG.FSRC[k === 'met_acid' ? 'winter' : 'met-alk'])}. Ölçülen PaCO₂ aralığın üstündeyse ek asidifiye edici, altındaysa ek alkalinize edici solunumsal etki olasıdır.</p>` +
            KGC.map([{ph, pco2: e.center, label: 'beklenen merkez'}, {ph: KG.F['hh-ph'](v, e.lo), pco2: e.lo, hollow: true, r: 4}, {ph: KG.F['hh-ph'](v, e.hi), pco2: e.hi, hollow: true, r: 4}]); }
        else { const a = KG.F[k === 'resp_acid' ? 'resp-ac-acute' : 'resp-alk-acute'](v), c = KG.F[k === 'resp_acid' ? 'resp-ac-chronic' : 'resp-alk-chronic'](v);
          out.innerHTML = `<p>Beklenen HCO₃: akut model <b>${n2(a)}</b>, kronik model <b>${n2(c)} mmol/L</b> ${cite(KG.FSRC[k === 'resp_acid' ? 'resp-ac-acute' : 'resp-alk-acute'])}. Bunlar nokta tahminleridir; süreyi kan gazı tek başına belirlemez ve akut–kronik ara durum mümkündür.</p>` +
            KGC.map([{ph: KG.F['hh-ph'](a, v), pco2: v, label: 'akut'}, {ph: KG.F['hh-ph'](c, v), pco2: v, label: 'kronik', hollow: true}]); }
      };
      sl.oninput = set; document.querySelectorAll('input[name=cp]').forEach(r => r.onchange = set); set();
    }
    if (id === 'anyon') {
      const a = document.getElementById('sl-ag'), b = document.getElementById('sl-alb'), r = document.getElementById('sl-ar');
      const draw = () => {
        ['ag', 'alb', 'ar'].forEach((k, i) => { document.getElementById('o-' + k).textContent = num(+[a, b, r][i].value, 1); });
        const c = KG.F['ag-albumin'](+a.value, +r.value, +b.value);
        document.getElementById('lab-ag-out').innerHTML = KGC.ag({measured: +a.value, corrected: c}) + `<p class="small">Düzeltilmiş AG = ${num(+a.value, 1)} + 2,5 × (${num(+r.value, 1)} − ${num(+b.value, 1)}) = <b>${num(c, 1)}</b> mmol/L ${cite(KG.FSRC['ag-albumin'])}. Düzeltilmiş AG ölçülmüş laktatın yerine geçmez.</p>`;
      };
      a.oninput = b.oninput = r.oninput = draw; draw();
    }
  }
  function viewLearn(id) {
    const i = Math.max(0, C.lessons.findIndex(l => l.id === id)), L = C.lessons[i];
    const prev = C.lessons[i - 1], next = C.lessons[i + 1];
    view.innerHTML = `<div class="wrap page-head"><p class="eyebrow">${{ped: 'Pediatri ve yenidoğan', preg: 'Gebelik', sample: 'Numune ve ölçüm', serial: 'Seri değerlendirme', koah: 'KOAH ve hiperkapni', renal: 'Böbrek ve diyaliz', tox: 'Toksikoloji', mixed: 'Karma asit–baz', adult: 'Sıfırdan öğren'}[L.group]} · ${i + 1} / ${C.lessons.length}</p><h1>${esc(L.title)}</h1></div>
      <div class="wrap learn"><nav aria-label="Dersler">${['adult', 'sample', 'serial', 'koah', 'renal', 'tox', 'mixed', 'ped', 'preg'].map(g => `<p class="eyebrow" style="margin:${g === 'adult' ? '0' : '16px'} 10px 6px">${{adult: 'Temel (erişkin)', sample: 'Numune ve ölçüm', serial: 'Seri değerlendirme', koah: 'KOAH ve hiperkapni (erişkin)', renal: 'Böbrek ve diyaliz', tox: 'Toksikoloji', mixed: 'Karma asit–baz bozuklukları', ped: 'Pediatri ve yenidoğan', preg: 'Gebelik, eylem, doğum sonrası'}[g]}</p>` + C.lessons.map((l, k) => l.group !== g ? '' : `<a href="#/ogren/${l.id}" data-pid="l:${l.id}"${k === i ? ' aria-current="page"' : ''}><span class="n">${String(k + 1).padStart(2, '0')}</span>${esc(l.title)}${PROG.markHTML('l:' + l.id)}</a>`).join('')).join('')}</nav>
      <article class="lesson"><div class="doc">${L.html}</div>${LAB[L.id] ? LAB[L.id]() : ''}
        <div class="pager">${prev ? `<a href="#/ogren/${prev.id}">← ${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a href="#/ogren/${next.id}">${esc(next.title)} →</a>` : `<a href="#/olgular">Olgu çözmeye geç →</a>`}</div></article></div>`;
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
    view.innerHTML = `<div class="wrap page-head"><p class="eyebrow">Olgu çöz</p><h1>Olgular</h1><p class="lede">${C.cases.length} sentetik eğitim olgusu. Önce kendi yorumunuzu yazın, sonra gerekçeli yanıtı ve motorun çıktısını açın. Olgular gerçek hasta verisi değildir.</p></div>
      <div class="wrap"><h2 class="h-sm" style="margin-bottom:10px">Tek örnek olguları</h2></div>
      <div class="wrap cases" style="padding-bottom:20px">${C.cases.map(c => `<a class="case-card" href="#/olgu/${c.id}"><span class="id">${c.id} ${PROG.markHTML('c:' + c.id)}</span><b>${esc(c.baslik)}</b><span class="vals">${esc(caseVals(c.girdiler).slice(3, 7).map(([k, v]) => k + ' ' + v).join(' · '))}</span></a>`).join('')}</div>
      <div class="wrap"><h2 class="h-sm" style="margin-bottom:10px">Seri olgular</h2><p class="small muted" style="margin-bottom:10px">Birden çok zaman noktası; seri değerlendirme ekranında açılır.</p></div>
      <div class="wrap cases">${C.serial.cases.map(c => `<a class="case-card" href="#/seri/${c.id}"><span class="id">${c.id}</span><b>${esc(c.baslik)}</b><span class="vals">${c.points.length} zaman noktası${c.events.length ? ' · ' + c.events.length + ' olay' : ''}</span></a>`).join('')}</div>
      <div class="wrap" style="margin-top:24px"><h2 class="h-sm" style="margin-bottom:10px">Hiperkapni olguları (erişkin, 7. tur)</h2><p class="small muted" style="margin-bottom:10px">Sayılar hedef değil, eğitim girdisidir. Tek örnekler Değerlendir, iki zaman noktalı olgular Seri ekranında açılır. Dersler: <a href="#/ogren/k-co2-neden-artar">KOAH ve hiperkapni</a>.</p></div>
      <div class="wrap cases">${C.koah.cases.map(k => `<a class="case-card" href="#/${k.mode === 'serial' ? 'seri' : 'degerlendir'}/${k.id}"><span class="id">${k.id}</span><b>${esc(k.baslik)}</b><span class="vals">${k.mode === 'serial' ? k.points.length + ' zaman noktası' : esc(['pco2', 'hco3_actual', 'ph'].map(f => ({pco2: 'PCO₂', hco3_actual: 'HCO₃', ph: 'pH'})[f] + ' ' + num(k.girdiler[f], 6)).join(' · '))}</span></a>`).join('')}</div>
      ${Object.keys(R8G).map(g => `<div class="wrap" style="margin-top:24px" data-r8group="${g}"><h2 class="h-sm" style="margin-bottom:10px">${esc(R8G[g])}</h2><p class="small muted" style="margin-bottom:10px">Sentetik eğitim olguları; sayılar hedef değildir. Bağlam metnindeki bilgi yalnız açıkça eşlendiği görünür alanlarla motora girer. Dersler: <a href="#/ogren/${({renal: 'b01', tox: 't01', mixed: 'm01'})[g]}">${esc(R8G[g].replace(/ \(.*/, ''))}</a>.</p></div>
      <div class="wrap cases">${C.r810.cases.filter(k => k.grup === g).map(k => `<a class="case-card" href="#/${k.mode === 'serial' ? 'seri' : 'degerlendir'}/${k.id}"><span class="id">${k.id}</span><b>${esc(k.baslik)}</b><span class="vals">${k.mode === 'serial' ? k.points.length + ' zaman noktası' + (k.events.length ? ' · ' + k.events.length + ' olay' : '') : esc(k.baglam)}</span></a>`).join('')}</div>`).join('')}`;
  }
  const HYP_PICK = [['met_acid', 'Metabolik asidoz'], ['met_alk', 'Metabolik alkaloz'], ['resp_acid', 'Solunumsal asidoz'], ['resp_alk', 'Solunumsal alkaloz'], ['none', 'Belirgin sapma yok'], ['stop', 'Hesap/yorum durdurulmalı']];
  function viewCase(id) {
    const c = C.cases.find(x => x.id === id); if (!c) return viewCases();
    const i = C.cases.indexOf(c), prev = C.cases[i - 1], next = C.cases[i + 1];
    view.innerHTML = `<div class="wrap page-head"><p class="eyebrow"><a href="#/olgular">Olgular</a> · ${c.id}</p><h1>${esc(c.baslik)}</h1><p style="margin-top:12px"><span class="synthetic">Sentetik veri · gerçek hasta değil</span></p></div>
      <div class="wrap case">
        <div class="panel"><h3 class="h-sm">Veriler</h3><dl class="kv">${caseVals(c.girdiler).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
          <p class="small muted" style="margin-top:10px">${esc(c.notu || '')}</p></div>
        <div class="panel"><h3 class="h-sm">Sizin yorumunuz</h3><p class="small">Hangi süreçleri düşünüyorsunuz? (Yalnız bu sayfada kalır; kaydedilmez.)</p>
          <div class="pick">${HYP_PICK.map(([k, l]) => `<label><input type="checkbox" value="${k}"> ${l}</label>`).join('')}</div>
          <textarea id="mine" placeholder="Kısaca gerekçenizi yazın: pH yönü, beklenen yanıt, eksik bilgi…" style="margin-top:10px"></textarea>
          <div class="row" style="margin-top:10px"><button type="button" class="btn" id="reveal">Gerekçeli yanıtı göster</button><a class="btn ghost" href="#/degerlendir/${c.id}">Değerlendiricide aç</a></div></div>
        <div id="answer" hidden style="grid-column:1/-1"></div>
        <div class="row" style="grid-column:1/-1;justify-content:space-between">${prev ? `<a href="#/olgu/${prev.id}">← ${prev.id}</a>` : '<span></span>'}${next ? `<a href="#/olgu/${next.id}">${next.id} →</a>` : ''}</div>
      </div>`;
    PROG.seen('c:' + c.id);
    document.getElementById('reveal').onclick = () => {
      PROG.done('c:' + c.id);
      const R = KG.evaluate(Object.fromEntries(Object.entries(c.girdiler).filter(([, v]) => v != null)));
      const a = document.getElementById('answer'); a.hidden = false;
      a.innerHTML = `<div class="grid2"><div class="panel"><h3 class="h-sm">Paketteki beklenen yorum</h3><p>${c.beklenen_html}</p><p class="small muted" style="margin-top:8px">Dayanak: ${cite(c.kaynak_ids)}</p></div>
        <div class="panel"><h3 class="h-sm">Motorun kısa sonucu</h3>${R.modules.scope ? `<p>${esc(t('m.' + R.modules.scope.msgs[0]))}</p>` : shortHTML(R).replace(/<div class="panel">[\s\S]*$/, '')}</div></div>`;
      a.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'});
    };
  }


  /* ================= Seri değerlendirme (6. tur) =================
     Her nokta kendi girdileriyle değerlendirilir (KG.serial). Bu görünüm yalnız aritmetik farkı, bayrakları ve notları gösterir. */
  const SPF = [  // [anahtar, etiket, tür, birim seçenekleri]
    ['label', 'Anonim epizot etiketi', 'text'], ['time', 'Örnek zamanı', 'dt'], ['age_group', 'Yaş grubu', 'sel'], ['sample_type', 'Örnek türü', 'sel'], ['temperature_reporting', 'Sıcaklık raporlaması', 'sel'], ['method', 'Cihaz / yöntem', 'text'],
    ['ph', 'pH'], ['pco2', 'PCO₂ (mmHg)'], ['hco3_actual', 'Gerçek HCO₃'], ['pao2', 'PO₂ (mmHg)'], ['fio2', 'FiO₂ (kesir)'], ['fio2_quality', 'FiO₂ kaynağı', 'sel'],
    ['peep', 'PEEP (cmH₂O)', 'sup'], ['paw', 'Ort. hava yolu basıncı'], ['support_type', 'Destek türü', 'suptext'], ['support_concurrent', 'Destek eşzamanlı mı?', 'sel'], ['stable', 'Kararlı ölçüm', 'sel'],
    ['na', 'Na⁺'], ['cl', 'Cl⁻'], ['tco2', 'TCO₂'], ['albumin', 'Albümin (g/dL)'], ['albumin_concurrent', 'Albümin eşzamanlı mı?', 'sel'],
    ['lactate', 'Laktat'], ['glucose', 'Glukoz (mg/dL)'], ['beta_hydroxybutyrate', 'β-hidroksibütirat'], ['maternal_context', 'Gebelik bağlamı', 'sel'], ['hc_chronic_confirmed', 'Önceki kronik hiperkapni doğrulandı mı?', 'sel'], ['q_bubble', 'Hava kabarcığı', 'sel'], ['q_heparin', 'Heparin', 'sel']
  ];
  const SER_OPT = Object.assign({}, OPT, {albumin_concurrent: YN});
  const SER_EV = [['ventilation', 'Ventilasyon / oksijen değişikliği'], ['fluid', 'Sıvı'], ['insulin', 'İnsülin'], ['vasopressor', 'Vazopresör'], ['rrt_start', 'KRT (RRT) başladı'], ['rrt_end', 'KRT (RRT) bitti'], ['rrt_change', 'KRT değişikliği / kesinti'], ['labor', 'Doğum eylemi / doğum'], ['other', 'Diğer']];
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
  const serialCasePickerHTML = () => `<select class="case-pick" id="serCase" aria-label="Sentetik seri olgu yükle"><option value="">Sentetik seri olgu yükle…</option>${[...C.serial.cases, ...C.koah.cases.filter(k => k.mode === 'serial'), ...C.r810.cases.filter(k => k.mode === 'serial')].map(c => `<option value="${c.id}"${SS.caseId === c.id ? ' selected' : ''}>${c.id} · ${esc(c.baslik)}</option>`).join('')}</select>`;
  function serialEditorHTML() {
    const cell = (p, i, [k, l, kind]) => {
      const v = spGet(p, k), dk = `data-sp="${i}" data-k="${k}"`;
      if (kind === 'sel') return `<select ${dk}>${(SER_OPT[k] || YN).map(([o, lab]) => `<option value="${o}"${String(v) === o ? ' selected' : ''}>${esc(lab)}</option>`).join('')}</select>`;
      if (kind === 'dt') return `<input type="datetime-local" ${dk} value="${esc(v)}">`;
      return `<input ${kind === 'text' || kind === 'suptext' ? 'type="text"' : 'inputmode="decimal"'} ${dk} value="${esc(v)}">`;
    };
    return `<div class="row" style="margin-bottom:10px">
        <button type="button" class="btn ghost sm" id="serAdd">+ Zaman noktası</button><button type="button" class="btn ghost sm" id="serClear">Temizle</button></div>
      <div class="fs" style="padding:12px 16px"><div class="body" style="padding:0">
        <p class="hint" style="grid-column:1/-1">Her zaman noktasının örnek, destek ve klinik bilgilerini ayrı girin. Aynı epizot için ortak bir anonim etiket kullanın (ör. "epizot-1"); hasta kimliği girmeyin.</p></div></div>
      <div class="tbl" style="margin-top:10px"><table class="sertbl"><thead><tr><th>Alan</th>${SS.points.map((p, i) => `<th>${esc(p.id)} <button type="button" class="linkbtn" data-sdel="${i}" aria-label="${esc(p.id)} sil">sil</button></th>`).join('')}</tr></thead>
        <tbody>${[...SPF, ...extraRows()].map(f => `<tr><td class="small">${esc(f[1])}</td>${SS.points.map((p, i) => `<td>${cell(p, i, f)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
      <h3 class="h-sm" style="margin:16px 0 8px">Olaylar</h3>
      <p class="small muted" style="margin-bottom:6px">Olay zamanı biliniyorsa zamanı girin. Zamanı bilinmiyorsa "Aralık" ile iki nokta arasına yerleştirin; olay tahminle bir zamana ya da aralığa atanmaz.</p>
      <div class="tbl"><table><thead><tr><th>Zaman</th><th>Aralık (zaman yoksa)</th><th>Tür</th><th>Not</th><th></th></tr></thead><tbody>${SS.events.map((e, i) => `<tr><td><input type="datetime-local" data-ev="${i}" data-k="time" value="${esc((e.time || '').slice(0, 16))}"${e.between ? ' disabled' : ''}></td>
        <td><select data-ev="${i}" data-k="between"><option value="">—</option>${SS.points.slice(1).map((p, j) => { const v = SS.points[j].id + '|' + p.id; return `<option value="${esc(v)}"${e.between && e.between.join('|') === v ? ' selected' : ''}>${esc(SS.points[j].id)} → ${esc(p.id)}</option>`; }).join('')}</select></td><td><select data-ev="${i}" data-k="type">${SER_EV.map(([o, l]) => `<option value="${o}"${e.type === o ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select></td><td><input type="text" data-ev="${i}" data-k="note" value="${esc(e.note || '')}"></td><td><button type="button" class="linkbtn" data-evdel="${i}">sil</button></td></tr>`).join('')}</tbody></table></div>
      <button type="button" class="btn ghost sm" id="evAdd" style="margin-top:8px">+ Olay</button>`;
  }
  const SER_LBL = {ph: 'pH', pco2: 'PCO₂', hco3: 'HCO₃', pao2: 'PO₂', pf: 'PaO₂/FiO₂', oi: 'OI', osi: 'OSI', lactate: 'Laktat', glucose: 'Glukoz', bhb: 'β-hidroksibütirat', na: 'Na⁺', cl: 'Cl⁻', ag: 'AG', agc: 'Düzeltilmiş AG', salicylate: 'Salisilat'};
  const SER_UNIT = {pco2: 'mmHg', pao2: 'mmHg', pf: 'mmHg', hco3: 'mmol/L', lactate: 'mmol/L', glucose: 'mg/dL', bhb: 'mmol/L', na: 'mmol/L', cl: 'mmol/L', ag: 'mmol/L', agc: 'mmol/L', salicylate: 'mg/dL'};
  function serialResultHTML(S) {
    if (S.blocked) return `<div class="banner stop"><span class="ic">!</span><div><b>Seri kurulmadı</b><p>${esc(t('so.' + S.blocked))}</p></div></div>`;
    if (S.points.length < 2) return '<p class="note">Karşılaştırma için en az iki zaman noktası gerekir.</p>';
    const tAll = S.order !== 'entry';
    const xOf = (p, i) => tAll ? Date.parse(p.time) : i, xs = S.points.map(xOf), xMin = Math.min(...xs), xMax = Math.max(...xs);
    const hm = s => s ? s.slice(11, 16) : '';
    const evs = tAll ? S.events.map(e => ({x: Date.parse(e.time), label: (SER_EV.find(x => x[0] === e.type) || [0, e.type])[1]})).filter(e => !Number.isNaN(e.x) && e.x >= xMin && e.x <= xMax) : [];
    const keys = ['ph', 'pco2', 'hco3', 'pao2', 'pf', 'oi', 'lactate', 'glucose', 'bhb', 'ag', 'agc', 'cl', 'salicylate'];
    const getV = (R, k) => ({ph: R.n.ph, pco2: R.n.pco2, hco3: R.n.hco3_actual, pao2: R.n.pao2, pf: R.modules.pf && R.modules.pf.status === 'hesaplandi' ? R.modules.pf.value : null, oi: R.modules.oi ? R.modules.oi.value : null,
      lactate: R.n.lactates.length ? R.n.lactates[R.n.lactates.length - 1].v : null, glucose: R.n.glucose, bhb: R.n.beta_hydroxybutyrate, ag: R.modules.ag ? R.modules.ag.value : null, agc: R.modules.agc && R.modules.agc.status === 'hesaplandi' ? R.modules.agc.value : null, cl: R.n.cl, salicylate: R.modules.salicylate && R.modules.salicylate.mgdl != null ? R.modules.salicylate.mgdl : null})[k];
    const oxy = new Set(['pao2', 'pf', 'oi']);
    /* [1.5-F02] Çizgi, ardışık karşılaştırmadaki parametre uygunluğundan türetilir */
    const LINK_LBL = {matrix_changed: 'örnek türü değişti', method_changed: 'yöntem değişti', support_changed: 'destek değişti', albumin_not_concurrent: 'albümin eşzamanlı değil', index_not_classifiable: 'sınıflama koşulu yok', sample_quality: 'kalite uyarısı', hh_suspended: 'asit–baz yorumu askıda'};
    const linkOf = (i, k) => { if (i === 0) return {}; const c = S.comparisons[i - 1], P = c && c.params[k];
      if (!P || P.unavailable) return {link: 'none'};
      const fl = (P.flags || []).filter(f => f !== 'pct_undefined_zero');
      return fl.length ? {link: 'dash', linkLabel: fl.map(f => LINK_LBL[f] || 'uyarı').join(' · ')} : {link: 'solid'}; };
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
      if (A.sample !== B.sample) q[1].push(`Hayır: örnek türü değişti (${SN(A.sample)} → ${SN(B.sample)}). İki değer aynı ölçüm değildir; asit–baz farkı yalnız ham aritmetik olarak gösterilir.`);
      else if (A.sample === 'unknown') q[1].push('Örnek türü bilinmiyor: iki ölçümün eşdeğer olduğu doğrulanamaz; bileşen yorumu yapılmaz.');
      else q[1].push(`Örnek türü aynı (iki örnek de ${SN(A.sample)}).`);
      for (const f of c.flags) if (!['matrix_changed', 'assume_not_pregnant'].includes(f)) q[1].push(t('sf.' + f));
      if (Object.values(pr).some(p => (p.flags || []).includes('sample_quality'))) q[1].push(t('sf.sample_quality'));
      /* 2 · Araya ne girdi? */
      q[2].push(c.hours ? `Aralık ${num(c.hours, 2)} saat; saatlik değişim ortalamadır, aradaki seyri göstermez.` : 'Zaman bilgisi eksik ya da iki örnek aynı zamanlı: saatlik değişim hesaplanmadı.');
      if (c.events.length) q[2].push('Bu aralıkta kayıtlı olay: ' + c.events.map(e => `${e.between ? 'saat bilinmiyor' : hm(e.time)} ${(SER_EV.find(x => x[0] === e.type) || [0, e.type])[1]}${e.note ? ' (' + e.note + ')' : ''}`).join(' · ') + '.');
      else q[2].push('Bu aralık için olay kaydı yok. Uygulanan tedavi veya destek değişikliklerini ekleyin.');
      if (c.flags.includes('support_changed') || Object.values(pr).some(p => (p.flags || []).includes('support_changed'))) q[2].push(t('sf.support_changed'));
      /* 3 · pH hangi bileşenle değişti? */
      if (ok('ph')) {
        q[3].push(`pH ${fmt('ph', pr.ph.a)} → ${fmt('ph', pr.ph.b)} (${sgn('ph', pr.ph.diff)})${ok('pco2') ? ` · PCO₂ ${sgn('pco2', pr.pco2.diff)} mmHg` : ''}${ok('hco3') ? ` · HCO₃ ${sgn('hco3', pr.hco3.diff)} mmol/L` : ''}.`);
        const abNote = c.notes.some(n => NOTE_Q[n] === 3);
        if (c.flags.includes('point_validity') || A.sample !== B.sample || A.sample === 'unknown') q[3].push('Bileşen yorumu kapalı (1. sorudaki nedenle); yalnız ham fark okunur.');
        else if (!abNote && pr.ph.diff < 0) q[3].push('pH düştü: PCO₂ artışının mı, HCO₃ azalmasının mı (ya da ikisinin birden) eşlik ettiğine bakın; tek pH değeri süreci söylemez.');
        else if (!abNote && pr.ph.diff > 0) q[3].push('pH yükseldi: PCO₂ ve HCO₃ değişimini birlikte okuyun; pH düzelmesi altta yatan sürecin bittiği anlamına gelmez.');
      } else q[3].push('pH bu aralıkta karşılaştırılamadı (iki noktada da geçerli değer yok).');
      /* 4 · Metabolik belirteçler */
      const MET = ['lactate', 'glucose', 'bhb', 'ag', 'agc', 'cl', 'na', 'salicylate'].filter(ok);
      if (MET.length) q[4].push(MET.map(k => `${SER_LBL[k]} ${fmt(k, pr[k].a)} → ${fmt(k, pr[k].b)}${SER_UNIT[k] ? ' ' + SER_UNIT[k] : ''}`).join(' · ') + '. Belirteçler farklı hızlarda değişebilir; her biri ayrı okunur.');
      else q[4].push('Bu aralıkta iki noktada da ölçülmüş metabolik belirteç (laktat, glukoz, keton, AG, klorür) yok.');
      /* Notlar ilgili soruya; geri kalanı 5. soruya */
      for (const n of c.notes) q[NOTE_Q[n] || 5].push(t('sn.' + n));
      if (c.flags.includes('assume_not_pregnant')) q[5].push(t('sf.assume_not_pregnant'));
      q[5].push('Bu değişimleri solunum işi, bilinç, dolaşım ve destek gereksiniminin seyriyle karşılaştırın.');
      const TQ = {1: 'Aynı şeyi mi ölçtüm?', 2: 'Araya ne girdi?', 3: 'pH hangi bileşenle değişti?', 4: 'Metabolik belirteçler birlikte mi değişiyor?', 5: 'Değerlendirmeyi nasıl tamamlarım?'};
      return `<div class="serq" data-guide><h4>Bu aralığı adım adım okuyalım</h4><ol>${[1, 2, 3, 4, 5].map(i => `<li><b>${TQ[i]}</b><ul>${q[i].map(x => `<li>${esc(x)}</li>`).join('')}</ul></li>`).join('')}</ol></div>`;
    };
    const cmpHTML = c => `<div class="panel" style="margin-top:12px"><h3 class="h-sm">${esc(c.from)} → ${esc(c.to)}${c.hours ? ` · ${num(c.hours, 2)} saat` : ''}</h3>
      <div class="tbl"><table><thead><tr><th>Parametre</th><th>Önce</th><th>Sonra</th><th>Mutlak fark</th><th>% değişim</th><th>Ort. saatlik</th><th>Uyarı</th></tr></thead><tbody>${Object.entries(c.params).map(([k, p]) => `<tr><td>${esc(SER_LBL[k] || k)}</td><td>${fmt(k, p.a)}</td><td>${fmt(k, p.b)}</td><td>${p.unavailable ? '–' : (p.diff > 0 ? '+' : '') + fmt(k, p.diff)}</td><td>${p.pct == null ? '–' : (p.pct > 0 ? '+' : '') + num(p.pct, 1) + ' %'}</td><td>${p.rate == null ? '–' : (p.rate > 0 ? '+' : '') + fmt(k, p.rate) + '/sa'}</td><td class="small">${(p.flags || []).map(f => esc(t('sf.' + f))).join('<br>')}</td></tr>`).join('')}</tbody></table></div>
      ${guideHTML(c)}</div>`;
    const ptLinks = S.points.map(p => `<button type="button" class="btn ghost sm" data-open="${p.entry}">${esc(p.id)}: tek örnek değerlendirmesini aç</button>`).join('');
    const bad = S.points.filter(p => p.validity.length), anyAb = S.points.some(p => p.abInvalid);
    return `${S.order && S.order !== 'time' ? `<p class="note">${esc(t('so.' + S.order))}</p>` : ''}
      ${(S.warnings || []).map(w => `<p class="note">${esc(t('sw.' + w))}${w === 'events_unplaced' && S.unplacedEvents ? ' ' + S.unplacedEvents.map(e => esc((SER_EV.find(x => x[0] === e.type) || [0, e.type])[1]) + (e.time ? ' ' + esc(e.time.slice(0, 16).replace('T', ' ')) : '')).join(' · ') : ''}</p>`).join('')}
      ${bad.length ? `<div class="banner stop" data-validity><span class="ic">!</span><div><b>Temel geçerlilik sorunu olan nokta</b><ul class="msgs">${bad.map(p => `<li>${esc(p.id)}: ${p.validity.map(v => esc(t('sv.' + v))).join('; ')}</li>`).join('')}</ul>${anyAb ? '<p class="small">Asit–baz geçerlilik sorunu olan noktayı içeren aralıklarda pH/PCO₂/HCO₃ farkı ham aritmetik olarak gösterilir; bileşene dayalı ve özel seri yorumu üretilmez.</p>' : '<p class="small">Hata asit–baz dışı alanlarda; ilgili hesaplar kapalı, asit–baz notları bundan etkilenmez.</p>'}</div></div>` : ''}
      ${(S.assumptions || []).map(a => `<div class="banner warn" data-assumption style="margin-top:10px"><span class="ic">?</span><div><b>Gebelik bağlamı bilinmiyor: ${esc(a.points.join(', '))}</b><p class="small">Bu noktalar gebe olmayan erişkin varsayımıyla yorumlandı. Gebe, eylemde ya da doğum sonrası ise bağlamı seçin; o durumda erişkin özel notları üretilmez.</p></div></div>`).join('')}
      <div class="panel"><p class="small muted" style="margin-bottom:6px">İşaret: ● arteriyel · ■ venöz · ▲ kapiller · içi boş = numune kalite uyarısı. Kesikli dikey çizgi: olay. Noktalar arası çizgi görsel birleştirmedir, ara değer ölçüm değildir. Çizgi karşılaştırma tablosunu izler: karşılaştırılamayan değerler birleştirilmez; uyarılı karşılaştırma kesikli çizgi ve kısa etiketle gösterilir.</p>
        <div class="grid2">${panels.join('')}</div></div>
      ${S.comparisons.map(cmpHTML).join('')}
      <div class="row" style="margin-top:12px">${ptLinks}</div>
      <p class="small muted" style="margin-top:10px">Kural sürümü ${esc(S.version)}.</p>`;
  }
  function serialTeachingHTML(c, edited) {
    const t = c.teaching;
    if (!t) return '';
    const titles = ['Hastada ne değişti?', 'Değerler ne anlatıyor?', 'Nasıl değerlendirelim?'];
    const lesson = `<div class="serial-lesson" data-original-teaching>
      <div class="serial-lesson-steps">${t.sections.map((p, i) => `<section><h3 class="h-sm"><span class="step-number">${i + 1}</span>${titles[i]}</h3><p>${esc(p.text)}</p></section>`).join('')}</div>
      <div class="serial-question"><h3 class="h-sm">Kendinizi sınayın</h3><p>${esc(t.question.text)}</p><details data-teaching-answer><summary>Yanıtı göster</summary><p>${esc(t.answer.text)}</p></details></div>
      <p class="note" data-takeaway><b>Akılda kalsın:</b> ${esc(t.takeaway.text)}</p>
      <p class="small muted">Kaynaklar: ${cite(t.kaynaklar)}</p></div>`;
    return `<div class="panel serial-teaching"><span class="synthetic">Sentetik eğitim vakası</span><h2 class="h-sm" style="margin-top:10px">${esc(c.id)} · ${esc(c.baslik)}</h2>
      ${edited ? `<p class="note" data-case-edited>Vaka verilerini değiştirdiniz. Aşağıdaki hesaplar yeni girdilere göre güncellendi; özgün vaka açıklaması başlangıç verilerine aittir.</p><button type="button" class="btn ghost sm" id="serRestore">Özgün vakayı geri yükle</button><details class="original-case"><summary>Özgün vaka açıklamasını oku</summary>${lesson}</details>` : lesson}
      ${c.baglam || c.eslesme || c.atlas_notu ? `<details class="small"><summary>Vaka verilerine ilişkin notlar</summary>${c.baglam ? `<p>${esc(c.baglam)}</p>` : ''}${c.eslesme ? r8MapHTML(c) : ''}${c.atlas_notu ? `<p>${esc(c.atlas_notu)}</p>` : ''}</details>` : ''}</div>`;
  }
  function viewSerial(caseId) {
    if (caseId && !serialLoad(caseId)) caseId = null;
    if (!SS) SS = serialDefault();
    const c = SS.caseId && serialCase(SS.caseId);
    view.innerHTML = `<div class="wrap page-head"><p class="eyebrow">Seri değerlendirme</p><h1>Seri kan gazı</h1>
      <p class="lede">Bir vaka seçin; hastadaki değişimi, kan gazının anlattıklarını ve sonraki değerlendirme adımını birlikte inceleyin. Değerleri değiştirerek yeni sonuçları karşılaştırabilirsiniz. <a href="#/ogren/s-ayni-seyi-mi">Dersi oku</a></p></div>
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
    const tabs = [['', 'Formüller'], ['profiller', 'Eşik profilleri'], ['girdiler', 'Girdi sözlüğü'], ['kurallar', 'Kurallar'], ['senaryolar', 'Senaryolar']];
    const GVT = {derleme_fizyoloji: 'Derleme fizyolojisi', baglamsal_uyari: 'Bağlamsal uyarı', kilavuz_hedefi: 'Kılavuz hedefi', ozel_kilavuz_hedefi: 'Kılavuz hedefi, özel bağlam', derleme_hedefi: 'Derleme hedefi', klinik_gorus: 'Klinik görüş', kohort_gozlemi: 'Kohort gözlemi', kosullu_risk_akisi: 'Koşullu risk akışı'};
    /* Profil alan adları görünen etikete çevrilir (anahtar paketteki gibi kalır) */
    const PKL = {ph: 'pH', otomatik_normal: 'Otomatik normal etiketi', paco2_mmHg: 'PaCO₂ (mmHg)', hco3_mmol: 'HCO₃ (mmol/L)', anlam: 'Anlam', spo2_yuzde: 'SpO₂ (%)', kosul: 'Koşul', pao2_mmHg: 'PaO₂ (mmHg)',
      varsayilan: 'Varsayılan', n: 'n', laktat_medyan: 'Laktat medyanı', laktat_ge2_yuzde: 'Laktat ≥2 (%)', laktat_ge4_yuzde: 'Laktat ≥4 (%)', normal_aralik_degil: 'Normal aralık değil', ifade: 'İfade', sonuc: 'Sonuç'};
    const YB = v => v === true ? 'Evet' : v === false ? 'Hayır' : String(v);
    const gprof = x => Object.entries(x).filter(([k]) => !['id', 'tur', 'kaynaklar'].includes(k)).map(([k, v]) => `${esc(PKL[k] || k.replace(/_/g, ' '))}: ${esc(Array.isArray(v) ? v.join('–') : YB(v))}`).join('<br>');
    const tst = name => { const x = TESTS && TESTS.tests.find(y => y.name === name); return x ? (x.ok ? '✓ geçti' : '✗ başarısız') : '–'; };
    const VT = {tani_oksijenasyon_bileseni: 'Tanı ölçütü bileşeni', siddet: 'Şiddet eşiği', tedavi_hedefi: 'Tedavi hedefi', tedavi_kosulu: 'Tedavi koşulu', tani_bilesenleri: 'Tanı bileşenleri', referans_araligi_ornegi: 'Referans aralığı (çalışma örneği)', kohort_ortalama_SD: 'Kohort ortalaması ± SD'};
    const profVal = x => x.ifade ? esc(x.ifade) : x.araliklar ? Object.entries(x.araliklar).map(([k, v]) => `${esc(k.replace(/_/g, ' '))}: ${v.join('–')}`).join('<br>') : x.dakika_spo2_yuzde ? Object.entries(x.dakika_spo2_yuzde).map(([k, v]) => `${k}. dk: ${pct(v[0], v[1])}`).join('<br>') : [x.ph && `pH ${x.ph[0]} ± ${x.ph[1]}`, x.pco2_mmHg && `PCO₂ ${x.pco2_mmHg[0]} ± ${x.pco2_mmHg[1]} mmHg`].filter(Boolean).join('<br>');
    let body;
    if (sub === 'girdiler') body = `<div class="tbl"><table><thead><tr><th>Kimlik</th><th>Etiket</th><th>Tür</th><th>Birim / seçenek</th><th>Kullanım</th></tr></thead><tbody>${C.inputs.map(x => `<tr><td><code>${esc(x.id)}</code></td><td>${esc(x.etiket)}</td><td>${esc(x.tur)}</td><td class="small">${esc(x.birim_veya_secenekler)}</td><td class="small">${esc(x.gerekli_oldugu_modul)}</td></tr>`).join('')}</tbody></table></div>
      <p class="small muted" style="margin-top:8px">Kimlik ve seçenek listeleri paketteki özgün kodlardır; çevrilmez.</p><h2 class="h-sm" style="margin:28px 0 10px">İkinci tur ek alanları (pediatri ve yenidoğan)</h2><div class="tbl"><table><thead><tr><th>Kimlik</th><th>Birim</th><th>Kullanım</th><th>Kural</th></tr></thead><tbody>${C.ped.inputs.map(x => `<tr><td><code>${esc(x.id)}</code></td><td class="small">${esc(x.birim)}</td><td class="small">${esc(x.kullanim)}</td><td class="small">${esc(x.kural)}</td></tr>`).join('')}</tbody></table></div>
      <h2 class="h-sm" style="margin:28px 0 10px">Üçüncü tur ek alanları (gebelik)</h2><div class="tbl"><table><thead><tr><th>Kimlik</th><th>Birim</th><th>Açıklama</th></tr></thead><tbody>${C.preg.inputs.map(x => `<tr><td><code>${esc(x.id)}</code></td><td class="small">${esc(x.birim)}</td><td class="small">${esc(x.aciklama)}</td></tr>`).join('')}</tbody></table></div><p class="note" style="margin-top:12px">Sitede ayrıca şu ürün alanları vardır: AG referans aralığı (alt/üst), biyokimya zamanı ve aynı örnek bilgisi, oksijen desteği türü, normotermi, dishemoglobin şüphesi, DKA izlem örneği, isteğe bağlı HH toleransı. Bunlar paketteki koşulları uygulamak için eklendi.</p>`;
    else if (sub === 'profiller') body = `<p class="note" style="margin-bottom:12px">Referans aralığı, kohort ortalaması, tedavi hedefi ve tanı/şiddet eşiği farklı veri türleridir. Çalışma referansları ve kohort değerleri hiçbir hastaya varsayılan olarak atanmaz.</p><div class="tbl"><table><thead><tr><th>Kimlik</th><th>Veri türü</th><th>Profil</th><th>Değer</th><th>Varsayılan atanabilir mi?</th><th>Kaynak</th></tr></thead><tbody>${C.ped.profiles.map(x => `<tr><td><code>${esc(x.id)}</code></td><td><b>${esc(VT[x.veri_turu] || x.veri_turu)}</b></td><td class="small">${esc(x.profil.replace(/_/g, ' '))}</td><td class="small">${profVal(x)}</td><td>${x.varsayilan_atanabilir === false ? 'Hayır' : '–'}</td><td>${cite(x.kaynaklar)}</td></tr>`).join('')}</tbody></table></div>
      <h2 class="h-sm" style="margin:28px 0 10px">Gebelik profilleri (üçüncü tur)</h2><div class="tbl"><table><thead><tr><th>Kimlik</th><th>Veri türü</th><th>Değerler ve koşul</th><th>Kaynak</th></tr></thead><tbody>${C.preg.profiles.map(x => `<tr><td><code>${esc(x.id)}</code></td><td><b>${esc(GVT[x.tur] || x.tur)}</b></td><td class="small">${gprof(x)}${x.id === 'G-E03' ? '<br><b>Uygulamadaki anlamı:</b> 35–40 mmHg kaynakta verilen bir örnektir, uyarının üst sınırı değildir. Sitede semptomatik gebede 35–40 mmHg "göreceli yükseliş" olarak, 40 mmHg üstü ise belirtiden bağımsız ayrı ve daha belirgin bir mesajla gösterilir; bu yeni bir eşik değildir.' : ''}</td><td>${cite(x.kaynaklar)}</td></tr>`).join('')}</tbody></table></div>`;
    else if (sub === 'senaryolar') body = `<h2 class="h-sm" style="margin:0 0 10px">8–10. tur veri sınırı örnekleri (E01–E30)</h2><p class="note" style="margin-bottom:12px">Paketin kabul önerileri; her biri motor testine çevrildi. Satır sayısı test sayısı değildir.</p><div class="tbl" style="margin-bottom:28px"><table><thead><tr><th>Kimlik</th><th>Girdi</th><th>Beklenen</th><th>Test</th></tr></thead><tbody>${C.r810.edges.map(x => `<tr><td><code>${esc(x.id)}</code></td><td class="small">${esc(x.girdi)}</td><td class="small">${esc(x.beklenen)}</td><td>${tst('8–10 sınır ' + x.id)}</td></tr>`).join('')}</tbody></table></div><p class="small muted" style="margin-bottom:8px">Girdi ve beklenen sütunları paketteki makine okunur kodlardır; alan adları ve değerleri özgün (Türkçe) kodlarıyla gösterilir.</p><p class="note" style="margin-bottom:12px">24 sentetik kabul senaryosu. Çoğu tam kan gazı değil, bir kuralın sınırını sınayan kısmi girdidir; eksik değişkenler normal varsayılmaz. Her biri motor testine çevrildi.</p><div class="tbl"><table><thead><tr><th>Kimlik</th><th>Senaryo</th><th>Girdi</th><th>Beklenen</th><th>Kaynak</th><th>Test</th></tr></thead><tbody>${C.ped.cases.map(x => `<tr><td><code>${esc(x.id)}</code></td><td>${esc(x.baslik)}</td><td class="small"><code>${esc(JSON.stringify(x.girdi))}</code></td><td class="small"><code>${esc(JSON.stringify(x.beklenen))}</code></td><td>${x.kaynaklar.length ? cite(x.kaynaklar) : 'Aritmetik / veri güvenliği'}</td><td>${tst('senaryo ' + x.id)}</td></tr>`).join('')}${C.preg.cases.map(x => `<tr><td><code>${esc(x.id)}</code></td><td>${esc(x.baslik)}</td><td class="small"><code>${esc(JSON.stringify(x.girdi))}</code></td><td class="small"><code>${esc(JSON.stringify(x.beklenen))}</code></td><td>${x.kaynaklar.length ? cite(x.kaynaklar) : 'Aritmetik / veri güvenliği'}</td><td>${tst('senaryo ' + x.id)}</td></tr>`).join('')}</tbody></table></div>`;
    else if (sub === 'kurallar') body = `<div class="tbl"><table><thead><tr><th>Kimlik</th><th>Durum</th><th>Beklenen davranış</th><th>Tür</th><th>Kaynak</th><th>Test</th></tr></thead><tbody>${C.rules.map(r => { const tr = TESTS && TESTS.tests.find(x => x.name === 'kural ' + r.id); return `<tr><td><code>${esc(r.id)}</code></td><td>${esc(r.kosul)}</td><td>${esc(r.davranis)}</td><td class="small">${esc(r.tur)}</td><td>${r.kaynak_ids.length ? cite(r.kaynak_ids) : 'Ürün kararı'}</td><td>${tr ? (tr.ok ? '✓ geçti' : '✗ başarısız') : '–'}</td></tr>`; }).join('')}</tbody></table></div>
      <h2 class="h-sm" style="margin:28px 0 10px">Pediatri ve yenidoğan kuralları (ikinci tur)</h2><div class="tbl"><table><thead><tr><th>Kimlik</th><th>Tetik</th><th>Davranış</th><th>Kaynak</th><th>Test</th></tr></thead><tbody>${C.ped.rules.map(r => `<tr><td><code>${esc(r.id)}</code></td><td>${esc(r.tetik)}</td><td>${esc(r.sonuc)}</td><td>${r.kaynaklar.length ? cite(r.kaynaklar) : 'Ürün kararı'}</td><td>${tst('kural ' + r.id)}</td></tr>`).join('')}</tbody></table></div><p class="small muted" style="margin-top:8px">Nitelik: kaynakların sınırlarını uygulayan ürün kuralları.</p>
      <h2 class="h-sm" style="margin:28px 0 10px">Böbrek/diyaliz, toksikoloji ve karma bozukluk kuralları (8–10. tur)</h2><p class="small muted" style="margin-bottom:8px">Hepsi paketteki etiketle <b>uygulama çıkarımıdır</b>: kaynakların sınırlarından türetilmiş ürün kuralları; kılavuzların doğruladığı klinik algoritmalar değildir. Her kural pozitif ve negatif örnekle test edildi.</p><div class="tbl"><table><thead><tr><th>Kimlik</th><th>Koşul</th><th>Gösterilir</th><th>Üretilmez</th><th>Kaynak</th><th>Test</th></tr></thead><tbody>${C.r810.rules.map(r => `<tr><td><code>${esc(r.id)}</code></td><td>${esc(r.kosul)}</td><td>${esc(r.goster)}</td><td>${esc(r.uretilmemeli)}</td><td>${cite(r.kaynaklar)}</td><td>${tst('8–10 kural ' + r.id)}</td></tr>`).join('')}</tbody></table></div>
      <h2 class="h-sm" style="margin:28px 0 10px">KOAH ve hiperkapni kuralları (yedinci tur, erişkin)</h2><p class="small muted" style="margin-bottom:8px">Ürün kurallarıdır. Kronik katsayı 0,35 olarak kaldı; ERS/ATS ve BTS koşulları birleştirilmedi.</p><div class="tbl"><table><thead><tr><th>Kimlik</th><th>Koşul</th><th>Gösterilir</th><th>Üretilmez</th><th>Kaynak</th><th>Test</th></tr></thead><tbody>${C.koah.rules.map(r => `<tr><td><code>${esc(r.id)}</code></td><td>${esc(r.kosul)}</td><td>${esc(r.gosterilir)}</td><td>${esc(r.uretilmez)}</td><td>${r.kaynaklar.length ? cite(r.kaynaklar) : 'Ürün kuralı'}</td><td>${tst('KOAH kural ' + r.id)}</td></tr>`).join('')}</tbody></table></div>
      <h2 class="h-sm" style="margin:28px 0 10px">Seri değerlendirme kuralları (altıncı tur)</h2><div class="tbl"><table><thead><tr><th>Kimlik</th><th>Durum</th><th>Gösterilir</th><th>Üretilmez</th><th>Kaynak</th><th>Test</th></tr></thead><tbody>${C.serial.rules.map(r => `<tr><td><code>${esc(r.id)}</code></td><td>${esc(r.durum)}</td><td>${esc(r.gosterilir)}</td><td>${esc(r.uretilmez)}</td><td>${r.kaynaklar.length ? cite(r.kaynaklar) : 'Aritmetik / ürün kuralı'}</td><td>${tst('seri kural ' + r.id)}</td></tr>`).join('')}</tbody></table></div>
      <h2 class="h-sm" style="margin:28px 0 10px">Numune ve ölçüm kuralları (beşinci tur)</h2><div class="tbl"><table><thead><tr><th>Kimlik</th><th>Tetik</th><th>Davranış</th><th>Nitelik</th><th>Kaynak</th><th>Test</th></tr></thead><tbody>${C.sample.rules.map(r => `<tr><td><code>${esc(r.id)}</code></td><td>${esc(r.tetik)}</td><td>${esc(r.sonuc)}</td><td class="small">${esc(r.nitelik)}</td><td>${r.kaynaklar.length ? cite(r.kaynaklar) : 'Ürün kuralı'}</td><td>${tst('numune ' + r.id)}</td></tr>`).join('')}</tbody></table></div>
      <h2 class="h-sm" style="margin:28px 0 10px">Gebelik kuralları (üçüncü tur)</h2><div class="tbl"><table><thead><tr><th>Kimlik</th><th>Tetik</th><th>Davranış</th><th>Kaynak</th><th>Test</th></tr></thead><tbody>${C.preg.rules.map(r => `<tr><td><code>${esc(r.id)}</code></td><td>${esc(r.tetik)}</td><td>${esc(r.sonuc)}</td><td>${r.kaynaklar.length ? cite(r.kaynaklar) : 'Ürün kararı'}</td><td>${tst('kural ' + r.id)}</td></tr>`).join('')}</tbody></table></div>`;
    else body = `<div class="panel" style="margin-bottom:14px"><h3 class="h-sm">Gebelikte kullanım sınırları (üçüncü tur)</h3><p class="small">Üçüncü tur yeni formül eklemez; mevcut dört hesabın gebelikteki sınırını tanımlar.</p><ul class="ask">${C.preg.formulas.map(f => `<li><b>${esc(f.ad)}</b> <code>${esc(f.id)}</code>: ${esc(f.kisit)} ${cite(f.kaynaklar)}</li>`).join('')}<li class="small muted">Not: G-F03 ifadesinde albümin referansı 4 g/dL olarak yazılı; site ilk paketteki gibi referansın laboratuvar tarafından girilmesini ister ve sessiz varsayılan kullanmaz.</li></ul></div><div class="flist">${[...C.formulas, ...PFORM, ...C.r810.formulas].map(f => `<article class="fcard" id="f-${f.id}"><h3>${esc(f.ad)} <code>${esc(f.id)}</code></h3><div class="expr">${esc(f.ifade)} <span class="muted">→ ${esc(f.sonuc_birimi)}</span></div>
      <div><h4>Uygulama koşulu</h4><p>${esc(f.uygulama_kosullari)}</p></div><div><h4>Sınırlama</h4><p>${esc(f.sinirlamalar)}</p></div>
      <p class="small muted" style="grid-column:1/-1">Kaynak: ${cite(f.kaynak_ids)} · ${esc(f.durum)}</p></article>`).join('')}</div>`;
    view.innerHTML = `<div class="wrap page-head"><p class="eyebrow">Formüller ve kurallar</p><h1>Formüller</h1><p class="lede">Motorun kullandığı her hesap, koşulları ve sınırlarıyla. Koşul sağlanmadığında hesap yapılmaz ve nedeni gösterilir. Kompansasyon katsayıları kaynaklar arasında farklılık gösterir.</p>
      <nav class="subtabs">${tabs.map(([k, l]) => `<a href="#/formuller${k ? '/' + k : ''}"${(sub || '') === k ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav></div><div class="wrap page">${body}</div>`;
  }

  /* ================= Kaynaklar ================= */
  function srcItem(n) {
    const s = SRC[n]; if (!s) return '';
    return `<li id="src-${n}"><span class="no">${n}</span><span class="t">${esc(s.baslik)}</span><span class="m">${esc([s.yazarlar, s.yayin, s.yil].filter(Boolean).join(' · '))}${s.doi ? ` · DOI <a href="https://doi.org/${esc(s.doi)}" target="_blank" rel="noopener">${esc(s.doi)}</a>` : s.url ? ` · <a href="${esc(s.url)}" target="_blank" rel="noopener">resmî kaynak</a>` : ''}${s.pmid ? ` · PMID ${esc(s.pmid)}` : ''}</span><span class="acc">${s.kanit_turu ? `Kanıt türü: ${esc(s.kanit_turu)} · ` : ''}Erişim: ${esc(s.erisim)}</span></li>`;
  }
  function viewSources(n) {
    view.innerHTML = `<div class="wrap page-head"><p class="eyebrow">Kaynaklar</p><h1>Kaynaklar</h1><p class="lede">${C.sources.length} kaynak: [1]–[20] ilk tur, [21]–[40] pediatri ve yenidoğan, [41]–[57] gebelik, [58]–[78] numune ve ölçüm, [79]–[88] seri değerlendirme, [89]–[103] KOAH ve hiperkapni, [104]–[132] böbrek/diyaliz, toksikoloji ve karma bozukluk; kontrol tarihi 7 Ekim 2026. Numaralar yalnız bu atlasa aittir; ilk tur kayıtları ikinci turda yeniden taranmadı. Tam metni okunan kaynaklar ile yalnız özeti incelenenler ayrı belirtilmiştir; kaynak kimliğinin doğrulanması tam metnin incelendiği anlamına gelmez.</p></div>
      <div class="wrap"><h2 class="h-sm" style="margin-bottom:10px">İlk tur: erişkin</h2><ol class="srclist" style="padding-bottom:20px">${C.sources.filter(s => s.id <= 20).map(s => srcItem(s.id)).join('')}</ol><h2 class="h-sm" style="margin-bottom:10px">İkinci tur: pediatri ve yenidoğan</h2><ol class="srclist" style="padding-bottom:20px">${C.sources.filter(s => s.id > 20 && s.id <= 40).map(s => srcItem(s.id)).join('')}</ol><h2 class="h-sm" style="margin-bottom:10px">Üçüncü tur: gebelik</h2><ol class="srclist" style="padding-bottom:20px">${C.sources.filter(s => s.id > 40 && s.id <= 57).map(s => srcItem(s.id)).join('')}</ol><h2 class="h-sm" style="margin-bottom:10px">Beşinci tur: numune ve ölçüm</h2><p class="small muted" style="margin-bottom:10px">Paketteki 23 kaynaktan ikisi atlasta zaten vardı (paket [1] = [1], paket [2] = [21]); kalan 21 kaynak DOI ile tekilleştirilerek [58]–[78] olarak eklendi. Üretici belgeleri IFU yerine geçmez.</p><ol class="srclist" style="padding-bottom:20px">${C.sources.filter(s => s.id > 57 && s.id <= 78).map(s => srcItem(s.id)).join('')}</ol><h2 class="h-sm" style="margin-bottom:10px">Altıncı tur: seri değerlendirme</h2><p class="small muted" style="margin-bottom:10px">Paketteki 23 kaynaktan 13'ü atlasta vardı (DOI, URL ya da başlıkla eşlendi: SSC 2026 erişkin [10] ve çocuk [34], Avrupa RDS 2025 [24], PALICC-2 [22] vb.); kalan 10 kaynak [79]–[88] olarak eklendi. KDIGO 2026 AKI/AKD belgesi taslaktır, kural kaynağı olarak kullanılmadı.</p><ol class="srclist" style="padding-bottom:20px">${C.sources.filter(s => s.id > 78 && s.id <= 88).map(s => srcItem(s.id)).join('')}</ol><h2 class="h-sm" style="margin-bottom:10px">Yedinci tur: KOAH ve hiperkapni (erişkin)</h2><p class="small muted" style="margin-bottom:10px">Paketteki 18 kaynaktan 4'ü atlasta vardı ve DOI ile eşlendi (BTS/ICS hiperkapni [83], BTS oksijen [52], BTS NIV kalite standardı [88], McKeever venöz gaz [71]); kalan 14 kaynak [89]–[102] olarak eklendi. [103] (Yi 2023, posthiperkapnik alkaloz derlemesi) 1.6 bağımsız kontrol raporundan eklendi ve K-R09'un daraltılmasına dayanak oldu. GOLD 2026 [89] yalnız yayın güncelliği kaydıdır; tam metin okunmuş gibi gösterilmez ve sayısal kural kaynağı yapılmadı.</p><ol class="srclist" style="padding-bottom:20px">${C.sources.filter(s => s.id > 88 && s.id <= 103).map(s => srcItem(s.id)).join('')}</ol><h2 class="h-sm" style="margin-bottom:10px">8–10. tur: böbrek/diyaliz, toksikoloji, karma bozukluk</h2><p class="small muted" style="margin-bottom:10px">Paketteki 39 kaynaktan 10'u atlasta vardı ve DOI, URL ya da başlıkla eşlendi (KDIGO 2012 AKI [84], KDIGO 2026 durum sayfası [85], CDC CO [13], methemoglobinemi [14], SRLF/SFMU (Jung) [79], Figge [7], Achanti &amp; Szerlip [3], González [91], Yi [103], Kraut [8]); kalan 29 kaynak [104]–[132] olarak eklendi. Her kaydın kanıt türü ve erişim düzeyi ayrı yazıldı; özet erişimi tam metin okundu diye gösterilmez. KDIGO 2026 AKI/AKD belgesi hâlâ taslaktır, kural kaynağı yapılmadı.</p><ol class="srclist">${C.sources.filter(s => s.id > 103).map(s => srcItem(s.id)).join('')}</ol></div>`;
    if (n) { const el = document.getElementById('src-' + n); if (el) { location.replace('#/kaynaklar/' + n); el.scrollIntoView({block: 'center'}); el.focus && el.setAttribute('tabindex', '-1'); el.style.borderColor = 'var(--accent)'; } }
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
