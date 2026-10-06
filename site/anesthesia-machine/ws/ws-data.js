'use strict';
/* Anestezi iş istasyonları: kayıtlar, kısa tanımlar ve kullanım kanıtı (K/P/S) durumu.
   Kaynak: İleri Monitörizasyon Atlası (data/devices-*.js, content-src/workstations/registry.json); 2026-10-07 bu atlasa taşındı. */
window.WS_DATA = {
 "checked": "2026-10-06",
 "sources": {
  "D1": {
   "title": "Anestezi cihazları — Türkiye ürün bulucu",
   "publisher": "Dräger",
   "year": null,
   "url": "https://www.draeger.com/tr_tr/Productfinder/Anaesthesia/Anaesthesia-Machines",
   "type": "manufacturer_catalog"
  },
  "K1": {
   "title": "Midazolam premedication facilitates mask ventilation in children during propofol induction of anesthesia: a randomized clinical trial",
   "publisher": "BMC Anesthesiology",
   "year": 2025,
   "url": "https://link.springer.com/article/10.1186/s12871-025-03002-4",
   "type": "peer_reviewed_clinical"
  },
  "K2": {
   "title": "Comparison of Oliceridine and Morphine in Postoperative Analgesia in Laparoscopic Total Hysterectomy, a Randomized Double-Blind Controlled Trial",
   "publisher": "Drug Design, Development and Therapy / PMC",
   "year": 2025,
   "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12334555/",
   "type": "peer_reviewed_clinical"
  },
  "D6": {
   "title": "Anaesthesia machines — Middle East",
   "publisher": "Dräger",
   "year": null,
   "url": "https://www.draeger.com/en_me/hospital/anaesthesia-machines",
   "type": "manufacturer_legacy"
  },
  "G1": {
   "title": "Anesthesia Delivery",
   "publisher": "GE HealthCare",
   "year": null,
   "url": "https://www.gehealthcare.com/en-us/products/anesthesia-delivery",
   "type": "manufacturer_catalog"
  },
  "K3": {
   "title": "EEG-Guided Titration of Sevoflurane and Pediatric Anesthesia Emergence Delirium: A Randomized Clinical Trial",
   "publisher": "JAMA Pediatrics",
   "year": 2025,
   "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12013357/",
   "type": "peer_reviewed_clinical"
  },
  "G4": {
   "title": "Perioperative Care — equipment",
   "publisher": "GE HealthCare",
   "year": null,
   "url": "https://serviceemea.gehealthcare.com/EddyService/equipment/uk/perioperative-care",
   "type": "manufacturer_support"
  },
  "G2": {
   "title": "Carestation 600 Series",
   "publisher": "GE HealthCare",
   "year": null,
   "url": "https://www.gehealthcare.com/content/gehealthcare/language-masters/en/products/anesthesia-delivery/carestation-600-series.html",
   "type": "manufacturer_catalog"
  },
  "K5": {
   "title": "Effect of synchronized intermittent mandatory versus manual assistance ventilation during anesthetic emergence on postoperative atelectasis in patients undergoing laparoscopic abdominal surgery: a randomized controlled trial",
   "publisher": "Anesthesiology and Perioperative Science",
   "year": 2025,
   "url": "https://link.springer.com/article/10.1007/s44254-025-00155-w",
   "type": "peer_reviewed_clinical"
  },
  "M1": {
   "title": "Precise Anesthesia",
   "publisher": "Mindray",
   "year": null,
   "url": "https://www.mindray.com/en/products/anesthesia",
   "type": "manufacturer_catalog"
  },
  "K6": {
   "title": "Day case total laparoscopic hysterectomy in a low resource setting: A descriptive analysis",
   "publisher": "Women’s Health / SAGE",
   "year": 2025,
   "url": "https://journals.sagepub.com/doi/10.1177/17455057251331766",
   "type": "peer_reviewed_clinical"
  },
  "F1": {
   "title": "Anesthesia",
   "publisher": "Getinge",
   "year": null,
   "url": "https://www.getinge.com/int/products-and-solutions/operating-room/anesthesia/",
   "type": "manufacturer_catalog"
  },
  "L1": {
   "title": "Anesthesia",
   "publisher": "Löwenstein Medical",
   "year": null,
   "url": "https://loewensteinmedical.com/en/anesthesia/",
   "type": "manufacturer_catalog"
  }
 },
 "devices": [
  {
   "id": "drager-atlan",
   "name": {
    "tr": "Atlan serisi",
    "en": "Atlan series",
    "es": "Serie Atlan"
   },
   "maker": "Dräger",
   "family": null,
   "desc": {
    "tr": "Uçucu ajanlarla inhalasyon anestezisi ve/veya hasta ventilasyonu için Dräger anestezi iş istasyonu ailesi; gaz karıştırıcı, CO2 absorbanı ve ısıtıcı içeren entegre solunum sistemi, piston tahrikli ventilatör ve entegre atık gaz tahliyesinden oluşur. Gaz, ventilasyon ve cihaz izlemi de sunar. Erişkin, pediatrik ve yenidoğan hastalarda kullanılır; düşük ve minimal akımlı anesteziyi destekler.",
    "en": "Dräger anesthesia workstation family for inhalational anesthesia with volatile agents and/or patient ventilation; it comprises a gas mixer, an integrated breathing system with CO2 absorber and heater, a piston-driven ventilator and an integrated scavenger, together with gas, ventilation and device monitoring. It is used in adult, pediatric and neonatal patients and supports low-flow and minimal-flow anesthesia.",
    "es": "Familia de estaciones de anestesia de Dräger para anestesia inhalatoria con agentes volátiles y/o ventilación del paciente; consta de mezclador de gases, sistema respiratorio integrado con absorbedor de CO2 y calefactor, ventilador accionado por pistón y sistema integrado de evacuación de gases, con monitorización de gases, ventilación y equipo. Se usa en adultos, niños y neonatos y admite anestesia de bajo flujo y flujo mínimo."
   },
   "note": {
    "tr": "Karıştırıcı tipi, N2O, gaz ölçüm modülü ve ventilasyon seçenekleri yapılandırmaya göre değişir. Otomatik sistem testi yedek ventilasyon aracı hazır bulundurma gibi kullanıcı sorumluluklarının yerini almaz.",
    "en": "Mixer type, N2O, gas measurement module and ventilation options vary by configuration. The automatic system test does not replace user responsibilities such as keeping a backup ventilation device available.",
    "es": "El tipo de mezclador, el N2O, el módulo de medición de gases y las opciones ventilatorias varían según la configuración. La prueba automática del sistema no sustituye responsabilidades del usuario como tener disponible un medio de ventilación de reserva."
   },
   "ev": null
  },
  {
   "id": "drager-perseus-a500",
   "name": "Perseus A500",
   "maker": "Dräger",
   "family": null,
   "desc": {
    "tr": "Elektrikle çalışan üfleyici (blower) tabanlı ventilatöre, ısıtmalı entegre solunum sistemine, vaporizatörle ajan verme sistemine ve akım, basınç ile gaz konsantrasyonlarını izleyen hava yolu monitörizasyonuna sahip Dräger anestezi iş istasyonu. Erişkin, çocuk ve yenidoğanda inhalasyon anestezisi ve/veya ventilasyon için kullanılır.",
    "en": "Dräger anesthesia workstation with an electrically driven blower-based ventilator, a heated integrated breathing system, agent delivery via vaporizers and airway monitoring of flow, pressure and gas concentrations. It is used for inhalational anesthesia and/or ventilation in adults, children and neonates.",
    "es": "Estación de anestesia de Dräger con ventilador accionado eléctricamente por soplante (blower), sistema respiratorio integrado calefactado, administración de agente mediante vaporizadores y monitorización de la vía aérea (flujo, presión y concentraciones de gases). Se usa para anestesia inhalatoria y/o ventilación en adultos, niños y neonatos."
   },
   "note": {
    "tr": "Gaz karıştırıcı mekanik ya da elektronik kontrollü varyantlarda bulunabilir; vaporizatör ve gaz izleme yapılandırması kullanılan cihazda doğrulanmalıdır.",
    "en": "The gas mixer may be mechanically or electronically controlled depending on the variant; vaporizer and gas monitoring configuration must be verified on the device in use.",
    "es": "El mezclador de gases puede ser de control mecánico o electrónico según la variante; la configuración de vaporizadores y monitorización de gases debe verificarse en el equipo utilizado."
   },
   "ev": {
    "pkg": "drager-perseus-a500",
    "model": "Perseus A500",
    "maker": "Dräger",
    "ev": "P",
    "region": {
     "tr": "Üreticinin Türkiye kataloğunda yer alıyor; hastane bazında kullanım teyit edilmedi",
     "en": "Listed in the manufacturer’s catalogue for Türkiye; use in individual hospitals has not been confirmed",
     "es": "Incluido en el catálogo del fabricante para Turquía; no se ha confirmado su uso en hospitales concretos"
    },
    "src": [
     "D1"
    ],
    "origin": "independently_created_3d",
    "review": "draft",
    "geometry_verified": false,
    "clinical_animation_ready": false,
    "priority": "P1",
    "docs": [],
    "nVerified": 0
   }
  },
  {
   "id": "ge-aisys-cs2",
   "name": "Aisys CS²",
   "maker": "GE HealthCare",
   "family": null,
   "desc": {
    "tr": "Elektronik gaz karışımı, Aladin2 kasetli elektronik vaporizatör ve pnömatik tahrikli körüklü ventilatör kullanan GE HealthCare anestezi iş istasyonu; yenidoğan, pediatrik ve erişkin hastalarda genel inhalasyon anestezisi ve ventilasyon desteği için tasarlanmıştır. İsteğe bağlı End-tidal Control yazılımı, klinisyenin ayarladığı end-tidal oksijen ve anestezik ajan hedeflerinin sürdürülmesini destekler.",
    "en": "GE HealthCare anesthesia workstation using electronic gas mixing, an electronic vaporizer with Aladin2 cassettes and a pneumatically driven bellows ventilator; it is intended for general inhalation anesthesia and ventilatory support in neonatal, pediatric and adult patients. The optional End-tidal Control software supports maintenance of clinician-set end-tidal oxygen and anesthetic agent targets.",
    "es": "Estación de anestesia de GE HealthCare con mezcla electrónica de gases, vaporizador electrónico con casetes Aladin2 y ventilador de fuelle de accionamiento neumático; está destinada a anestesia general inhalatoria y soporte ventilatorio en neonatos, niños y adultos. El software opcional End-tidal Control ayuda a mantener los objetivos de oxígeno y agente anestésico teleespiratorios fijados por el clínico."
   },
   "note": {
    "tr": "End-tidal Control yalnızca 18 yaş ve üzeri hastalarda endikedir, endotrakeal tüp veya laringeal maske gerektirir; onay kapsamı ve yazılım sürümü ülkeye göre değişebilir.",
    "en": "End-tidal Control is indicated only for patients aged 18 years and older and requires an endotracheal tube or laryngeal mask; scope of approval and software version may differ by country.",
    "es": "El End-tidal Control solo está indicado en pacientes de 18 años o más y requiere tubo endotraqueal o mascarilla laríngea; el alcance de la aprobación y la versión de software pueden variar según el país."
   },
   "ev": {
    "pkg": "ge-healthcare-aisys-cs2",
    "model": "Aisys CS2",
    "maker": "GE HealthCare",
    "ev": "K",
    "region": {
     "tr": "Japonya; klinik çalışma",
     "en": "Japan; clinical study",
     "es": "Japón; estudio clínico"
    },
    "src": [
     "G1",
     "K3"
    ],
    "origin": "independently_created_3d",
    "review": "draft",
    "geometry_verified": false,
    "clinical_animation_ready": false,
    "priority": "P1",
    "docs": [],
    "nVerified": 0
   }
  },
  {
   "id": "ge-carestation-750",
   "name": "Carestation 750",
   "maker": "GE HealthCare",
   "family": null,
   "desc": {
    "tr": "Elektronik gaz karıştırıcı, Selectatec manifolduna takılan vaporizatörler ve pnömatik tahrikli körüklü ventilatörü bir araya getiren, kontrolleri 15 inç dokunmatik ekranda sunan GE HealthCare anestezi iş istasyonu (750c tavan askılı modeldir). Yenidoğan, pediatrik ve erişkin hastada monitörize anestezi bakımı, genel inhalasyon anestezisi ve/veya ventilasyon desteği için tasarlanmıştır.",
    "en": "GE HealthCare anesthesia workstation combining an electronic gas mixer, vaporizers on a Selectatec manifold and a pneumatically driven bellows ventilator, with controls on a 15-inch touchscreen (the 750c is the pendant model). It is intended for monitored anesthesia care, general inhalation anesthesia and/or ventilatory support in neonatal, pediatric and adult patients.",
    "es": "Estación de anestesia de GE HealthCare que combina mezclador electrónico de gases, vaporizadores sobre colector Selectatec y ventilador de fuelle de accionamiento neumático, con controles en una pantalla táctil de 15 pulgadas (el 750c es el modelo de techo). Está destinada a cuidados anestésicos monitorizados, anestesia general inhalatoria y/o soporte ventilatorio en neonatos, niños y adultos."
   },
   "note": {
    "tr": "N2O, O2 hücresi veya entegre gaz modülü gibi özellikler yapılandırmaya ve pazara göre değişir.",
    "en": "Features such as N2O, an O2 cell or an integrated gas module vary by configuration and market.",
    "es": "Características como N2O, celda de O2 o módulo de gases integrado varían según la configuración y el mercado."
   },
   "ev": {
    "pkg": "ge-healthcare-carestation-750",
    "model": "Carestation 750",
    "maker": "GE HealthCare",
    "ev": "P",
    "region": {
     "tr": "Uluslararası kaynaklar; Türkiye’deki hastanelerde kullanım teyit edilmedi",
     "en": "International sources; use in hospitals in Türkiye has not been confirmed",
     "es": "Fuentes internacionales; no se ha confirmado su uso en hospitales de Turquía"
    },
    "src": [
     "G1"
    ],
    "origin": "independently_created_3d",
    "review": "draft",
    "geometry_verified": false,
    "clinical_animation_ready": false,
    "priority": "P1",
    "docs": [],
    "nVerified": 0
   }
  },
  {
   "id": "mindray-a9",
   "name": "A9",
   "maker": "Mindray",
   "family": null,
   "desc": {
    "tr": "Taze gaz verilmesi, V90 elektronik vaporizatörlerle ajan verilmesi, solunum sistemi, otomatik ve manuel ventilasyon ile O2, CO2, N2O ve anestezik ajan izlemini birleştiren sürekli akımlı Mindray inhalasyon anestezi iş istasyonu. Erişkin, pediatrik ve yenidoğan hastalarda genel inhalasyon anestezisi ve ventilasyonun sürdürülmesi için kullanılır.",
    "en": "Continuous-flow Mindray inhalation anesthesia workstation that combines fresh gas delivery, agent delivery with V90 electronic vaporizers, a breathing system, automatic and manual ventilation, and O2, CO2, N2O and anesthetic agent monitoring. It is used to deliver general inhalation anesthesia and maintain ventilation in adult, pediatric and neonatal patients.",
    "es": "Estación de anestesia inhalatoria de flujo continuo de Mindray que combina suministro de gas fresco, administración de agente con vaporizadores electrónicos V90, sistema respiratorio, ventilación automática y manual, y monitorización de O2, CO2, N2O y agente anestésico. Se usa para administrar anestesia general inhalatoria y mantener la ventilación en adultos, niños y neonatos."
   },
   "note": {
    "tr": "APRV, akciğer rekruitmanı ve yüksek akışlı nazal kanül (HFNC) gibi özellikler yapılandırmaya ve pazara göre değişir; HFNC yalnızca spontan soluyan erişkinler içindir ve apneik ventilasyon amacı taşımaz.",
    "en": "Features such as APRV, lung recruitment and high-flow nasal cannula (HFNC) vary by configuration and market; HFNC is only for spontaneously breathing adults and is not intended for apneic ventilation.",
    "es": "Funciones como APRV, reclutamiento pulmonar y cánula nasal de alto flujo (HFNC) varían según la configuración y el mercado; la HFNC es solo para adultos con respiración espontánea y no está destinada a ventilación apneica."
   },
   "ev": {
    "pkg": "mindray-a9",
    "model": "A9",
    "maker": "Mindray",
    "ev": "P",
    "region": {
     "tr": "Uluslararası kaynaklar; Türkiye’deki hastanelerde kullanım teyit edilmedi",
     "en": "International sources; use in hospitals in Türkiye has not been confirmed",
     "es": "Fuentes internacionales; no se ha confirmado su uso en hospitales de Turquía"
    },
    "src": [
     "M1"
    ],
    "origin": "independently_created_3d",
    "review": "draft",
    "geometry_verified": false,
    "clinical_animation_ready": false,
    "priority": "P1",
    "docs": [],
    "nVerified": 0
   }
  },
  {
   "id": "mindray-a8",
   "name": "A8",
   "maker": "Mindray",
   "family": null,
   "desc": {
    "tr": "Taze gaz verilmesi, iki Selectatec yuvasına takılan vaporizatörlerle ajan verilmesi, solunum sistemi, otomatik ve manuel ventilasyon ile O2, CO2, N2O ve anestezik ajan izlemini birleştiren sürekli akımlı Mindray inhalasyon anestezi iş istasyonu. Erişkin, pediatrik ve yenidoğan hastalarda kullanılır.",
    "en": "Continuous-flow Mindray inhalation anesthesia workstation that combines fresh gas delivery, agent delivery with vaporizers in two Selectatec mounting positions, a breathing system, automatic and manual ventilation, and O2, CO2, N2O and anesthetic agent monitoring. It is used in adult, pediatric and neonatal patients.",
    "es": "Estación de anestesia inhalatoria de flujo continuo de Mindray que combina suministro de gas fresco, administración de agente con vaporizadores en dos posiciones Selectatec, sistema respiratorio, ventilación automática y manual, y monitorización de O2, CO2, N2O y agente anestésico. Se usa en adultos, niños y neonatos."
   },
   "note": {
    "tr": "Yüksek akışlı nazal kanül (HFNC) gibi özellikler yapılandırmaya ve pazara göre değişir; HFNC yalnızca spontan soluyan erişkinler içindir.",
    "en": "Features such as high-flow nasal cannula (HFNC) vary by configuration and market; HFNC is only for spontaneously breathing adults.",
    "es": "Funciones como la cánula nasal de alto flujo (HFNC) varían según la configuración y el mercado; la HFNC es solo para adultos con respiración espontánea."
   },
   "ev": {
    "pkg": "mindray-a8",
    "model": "A8",
    "maker": "Mindray",
    "ev": "P",
    "region": {
     "tr": "Uluslararası kaynaklar; Türkiye’deki hastanelerde kullanım teyit edilmedi",
     "en": "International sources; use in hospitals in Türkiye has not been confirmed",
     "es": "Fuentes internacionales; no se ha confirmado su uso en hospitales de Turquía"
    },
    "src": [
     "M1"
    ],
    "origin": "independently_created_3d",
    "review": "draft",
    "geometry_verified": false,
    "clinical_animation_ready": false,
    "priority": "P1",
    "docs": [],
    "nVerified": 0
   }
  },
  {
   "id": "mindray-a7",
   "name": "A7",
   "maker": "Mindray",
   "family": null,
   "desc": {
    "tr": "Taze gaz verilmesi, iki veya üç değişken baypaslı vaporizatörle ajan verilmesi, çıkarılabilir solunum sistemi, otomatik ve manuel ventilasyon ile O2, CO2, N2O ve anestezik ajan izlemini birleştiren sürekli akımlı Mindray inhalasyon anestezi iş istasyonu. Erişkin ve pediatrik (yenidoğan dahil) hastalarda kullanılır.",
    "en": "Continuous-flow Mindray inhalation anesthesia workstation that combines fresh gas delivery, agent delivery with two or three variable-bypass vaporizers, a detachable breathing system, automatic and manual ventilation, and O2, CO2, N2O and anesthetic agent monitoring. It is used in adult and pediatric (including neonatal) patients.",
    "es": "Estación de anestesia inhalatoria de flujo continuo de Mindray que combina suministro de gas fresco, administración de agente con dos o tres vaporizadores de bypass variable, sistema respiratorio desmontable, ventilación automática y manual, y monitorización de O2, CO2, N2O y agente anestésico. Se usa en adultos y pacientes pediátricos (incluidos neonatos)."
   },
   "note": {
    "tr": "A8/A9 özellikleri (elektronik vaporizatör, HFNC, bazı ventilatör aralıkları ve gaz modülü) A7’ye otomatik olarak atfedilmemelidir; özellikler yapılandırmaya ve pazara göre değişir.",
    "en": "A8/A9 features (electronic vaporizers, HFNC, certain ventilator ranges and the gas module) should not be assumed for the A7; features vary by configuration and market.",
    "es": "Las funciones de A8/A9 (vaporizadores electrónicos, HFNC, ciertos rangos del ventilador y el módulo de gases) no deben atribuirse automáticamente al A7; las características varían según la configuración y el mercado."
   },
   "ev": {
    "pkg": "mindray-a7",
    "model": "A7",
    "maker": "Mindray",
    "ev": "P",
    "region": {
     "tr": "Uluslararası kaynaklar; Türkiye’deki hastanelerde kullanım teyit edilmedi",
     "en": "International sources; use in hospitals in Türkiye has not been confirmed",
     "es": "Fuentes internacionales; no se ha confirmado su uso en hospitales de Turquía"
    },
    "src": [
     "M1"
    ],
    "origin": "independently_created_3d",
    "review": "draft",
    "geometry_verified": false,
    "clinical_animation_ready": false,
    "priority": "P1",
    "docs": [],
    "nVerified": 0
   }
  },
  {
   "id": "getinge-flow-i",
   "name": "Flow-i",
   "maker": "Getinge",
   "family": null,
   "desc": {
    "tr": "Getinge (Maquet Critical Care) Flow ailesinden, yazılım kontrollü yarı kapalı inhalasyon anestezisi sistemi; geleneksel körük yerine ekspire gazı oksijen akımıyla CO2 absorbanı üzerinden hastaya geri veren hacim reflektörü ve elektronik kontrollü enjektörlü vaporizatör kullanır. Yenidoğandan erişkine kadar hastalarda kullanılır; MR ortamı için tasarlanmamıştır.",
    "en": "Software-controlled semi-closed inhalation anesthesia system of the Getinge (Maquet Critical Care) Flow family; instead of a bag-in-bottle it uses a Volume Reflector that returns exhaled gas to the patient via the CO2 absorber, driven by an oxygen flow, and an electronically controlled injector vaporizer. It is intended for neonatal to adult patients and not for the MRI environment.",
    "es": "Sistema semicerrado de anestesia inhalatoria controlado por software, de la familia Flow de Getinge (Maquet Critical Care); en lugar de fuelle utiliza un reflector de volumen que devuelve el gas espirado al paciente a través del absorbedor de CO2, impulsado por un flujo de oxígeno, y un vaporizador de inyector controlado electrónicamente. Está destinado a pacientes desde neonatos hasta adultos y no al entorno de RM."
   },
   "note": {
    "tr": "Otomatik Gaz Kontrolü (AGC; hedef FiO2 ve end-tidal ajan düzeyi ön ayarı) ülkedeki düzenleyici onaya ve yazılım sürümüne bağlıdır; cihaz yapılandırmasında kontrol edilmelidir.",
    "en": "Automatic Gas Control (AGC; presetting target FiO2 and end-tidal agent level) depends on regulatory approval in the country and on the software version; check the device configuration.",
    "es": "El control automático de gases (AGC; preajuste de FiO2 objetivo y nivel de agente teleespiratorio) depende de la aprobación regulatoria del país y de la versión de software; debe comprobarse en la configuración del equipo."
   },
   "ev": {
    "pkg": "getinge-maquet-flow-i",
    "model": "Flow-i",
    "maker": "Getinge / Maquet",
    "ev": "P",
    "region": {
     "tr": "Uluslararası kaynaklar; Türkiye’deki hastanelerde kullanım teyit edilmedi",
     "en": "International sources; use in hospitals in Türkiye has not been confirmed",
     "es": "Fuentes internacionales; no se ha confirmado su uso en hospitales de Turquía"
    },
    "src": [
     "F1"
    ],
    "origin": "independently_created_3d",
    "review": "draft",
    "geometry_verified": false,
    "clinical_animation_ready": false,
    "priority": "P1",
    "docs": [],
    "nVerified": 0
   }
  },
  {
   "id": "getinge-flow-c",
   "name": "Flow-c",
   "maker": "Getinge",
   "family": null,
   "desc": {
    "tr": "Flow ailesinin hacim reflektörü, elektronik vaporizatör ve O2Guard gibi özelliklerini daha kompakt bir yapıda sunan Getinge anestezi iş istasyonu. FDA 510(k) özetine göre Flow-i ile aynı endikasyonlar için, yenidoğanlardan erişkinlere kadar aynı hasta gruplarında kullanılır.",
    "en": "Getinge anesthesia workstation that offers Flow family features such as the Volume Reflector, electronic vaporizer and O2Guard in a more compact design. According to the FDA 510(k) summary, it has the same indications and the same neonatal-to-adult patient population as Flow-i.",
    "es": "Estación de anestesia de Getinge que ofrece funciones de la familia Flow, como el reflector de volumen, el vaporizador electrónico y O2Guard, en un diseño más compacto. Según el resumen 510(k) de la FDA, tiene las mismas indicaciones y la misma población (de neonatos a adultos) que Flow-i."
   },
   "note": {
    "tr": "Flow-i’de standart olan bazı yazılım işlevleri Flow-c’de seçenek olarak sunulur; etkin seçenekler ve AGC’nin mevcut olup olmadığı cihaz yapılandırmasında kontrol edilmelidir.",
    "en": "Some software functions that are standard on Flow-i are offered as options on Flow-c; enabled options and AGC availability should be checked in the device configuration.",
    "es": "Algunas funciones de software estándar en Flow-i se ofrecen como opciones en Flow-c; las opciones activadas y la disponibilidad de AGC deben comprobarse en la configuración del equipo."
   },
   "ev": {
    "pkg": "getinge-maquet-flow-c",
    "model": "Flow-c",
    "maker": "Getinge / Maquet",
    "ev": "P",
    "region": {
     "tr": "Uluslararası kaynaklar; Türkiye’deki hastanelerde kullanım teyit edilmedi",
     "en": "International sources; use in hospitals in Türkiye has not been confirmed",
     "es": "Fuentes internacionales; no se ha confirmado su uso en hospitales de Turquía"
    },
    "src": [
     "F1"
    ],
    "origin": "independently_created_3d",
    "review": "draft",
    "geometry_verified": false,
    "clinical_animation_ready": false,
    "priority": "P2",
    "docs": [],
    "nVerified": 0
   }
  },
  {
   "id": "getinge-flow-e",
   "name": "Flow-e",
   "maker": "Getinge",
   "family": null,
   "desc": {
    "tr": "Flow ailesinin hacim reflektörü teknolojisini daha geniş çalışma yüzeyi, ek depolama ve yardımcı ekipman montaj seçenekleriyle sunan Getinge anestezi iş istasyonu; ürün sayfasında iki yuvalı elektronik vaporizatör düzeni ve O2Guard belirtilir. FDA 510(k) özetine göre Flow-i ile aynı endikasyonlar için, yenidoğanlardan erişkinlere kadar aynı hasta gruplarında kullanılır.",
    "en": "Getinge anesthesia workstation that offers the Flow family’s Volume Reflector technology with a larger worktop, extra storage and mounting options for auxiliary equipment; the product page lists electronic vaporizers in two mounting slots and O2Guard. According to the FDA 510(k) summary, it has the same indications and the same neonatal-to-adult patient population as Flow-i.",
    "es": "Estación de anestesia de Getinge que ofrece la tecnología de reflector de volumen de la familia Flow con una superficie de trabajo mayor, almacenamiento adicional y opciones de montaje de equipos auxiliares; la página del producto indica vaporizadores electrónicos en dos alojamientos y O2Guard. Según el resumen 510(k) de la FDA, tiene las mismas indicaciones y la misma población (de neonatos a adultos) que Flow-i."
   },
   "note": {
    "tr": "Flow-i’de standart olan bazı yazılım işlevleri Flow-e’de seçenek olarak sunulur; etkin seçenekler ve AGC’nin mevcut olup olmadığı cihaz yapılandırmasında kontrol edilmelidir.",
    "en": "Some software functions that are standard on Flow-i are offered as options on Flow-e; enabled options and AGC availability should be checked in the device configuration.",
    "es": "Algunas funciones de software estándar en Flow-i se ofrecen como opciones en Flow-e; las opciones activadas y la disponibilidad de AGC deben comprobarse en la configuración del equipo."
   },
   "ev": {
    "pkg": "getinge-maquet-flow-e",
    "model": "Flow-e",
    "maker": "Getinge / Maquet",
    "ev": "P",
    "region": {
     "tr": "Uluslararası kaynaklar; Türkiye’deki hastanelerde kullanım teyit edilmedi",
     "en": "International sources; use in hospitals in Türkiye has not been confirmed",
     "es": "Fuentes internacionales; no se ha confirmado su uso en hospitales de Turquía"
    },
    "src": [
     "F1"
    ],
    "origin": "independently_created_3d",
    "review": "draft",
    "geometry_verified": false,
    "clinical_animation_ready": false,
    "priority": "P2",
    "docs": [],
    "nVerified": 0
   }
  },
  {
   "id": "drager-atlan-a300",
   "name": "Atlan A300",
   "maker": "Dräger",
   "family": "drager-atlan",
   "desc": {
    "tr": "Dräger anestezi iş istasyonu. Ayrıntılı klinik içerik henüz hazırlanmadı; bu kayıt, kaynaklara dayalı iş istasyonu modelleme listesinden alınmıştır. Atlan ailesine ait bir modeldir; ailenin genel özellikleri Atlan serisi tanıtımında yer alır.",
    "en": "Dräger anaesthesia workstation. Detailed clinical content has not been prepared yet; this entry was taken from the workstation modelling list compiled from documented sources. This model belongs to the Atlan family; shared features are described in the Atlan series overview.",
    "es": "Estación de anestesia de Dräger. Aún no se ha preparado el contenido clínico detallado; esta ficha procede de la lista de modelado de estaciones elaborada a partir de fuentes documentadas. Este modelo pertenece a la familia Atlan; las características comunes se describen en la presentación de la serie Atlan."
   },
   "note": null,
   "ev": {
    "pkg": "drager-atlan-a300",
    "model": "Atlan A300",
    "maker": "Dräger",
    "ev": "P",
    "region": {
     "tr": "Üreticinin Türkiye kataloğunda yer alıyor; hastane bazında kullanım teyit edilmedi",
     "en": "Listed in the manufacturer’s catalogue for Türkiye; use in individual hospitals has not been confirmed",
     "es": "Incluido en el catálogo del fabricante para Turquía; no se ha confirmado su uso en hospitales concretos"
    },
    "src": [
     "D1"
    ],
    "origin": "independently_created_3d",
    "review": "draft",
    "geometry_verified": false,
    "clinical_animation_ready": false,
    "priority": "P1",
    "docs": [
     "https://www.draeger.com/Content/Documents/TDoc/9511481_2_en.pdf",
     "https://www.draeger.com/Content/Documents/Products/Atlan-A300-A300-XL-pi-100176-en-MASTER.pdf",
     "https://www.draeger.com/en_uk/Products/Atlan-A300-A300-XL",
     "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K230931.pdf"
    ],
    "nVerified": 15
   }
  },
  {
   "id": "drager-atlan-a350",
   "name": "Atlan A350",
   "maker": "Dräger",
   "family": "drager-atlan",
   "desc": {
    "tr": "Dräger anestezi iş istasyonu. Ayrıntılı klinik içerik henüz hazırlanmadı; bu kayıt, kaynaklara dayalı iş istasyonu modelleme listesinden alınmıştır. Atlan ailesine ait bir modeldir; ailenin genel özellikleri Atlan serisi tanıtımında yer alır.",
    "en": "Dräger anaesthesia workstation. Detailed clinical content has not been prepared yet; this entry was taken from the workstation modelling list compiled from documented sources. This model belongs to the Atlan family; shared features are described in the Atlan series overview.",
    "es": "Estación de anestesia de Dräger. Aún no se ha preparado el contenido clínico detallado; esta ficha procede de la lista de modelado de estaciones elaborada a partir de fuentes documentadas. Este modelo pertenece a la familia Atlan; las características comunes se describen en la presentación de la serie Atlan."
   },
   "note": null,
   "ev": {
    "pkg": "drager-atlan-a350",
    "model": "Atlan A350",
    "maker": "Dräger",
    "ev": "P",
    "region": {
     "tr": "Üreticinin Türkiye kataloğunda yer alıyor; hastane bazında kullanım teyit edilmedi",
     "en": "Listed in the manufacturer’s catalogue for Türkiye; use in individual hospitals has not been confirmed",
     "es": "Incluido en el catálogo del fabricante para Turquía; no se ha confirmado su uso en hospitales concretos"
    },
    "src": [
     "D1"
    ],
    "origin": "independently_created_3d",
    "review": "draft",
    "geometry_verified": false,
    "clinical_animation_ready": false,
    "priority": "P1",
    "docs": [
     "https://www.draeger.com/Content/Documents/TDoc/9511481_2_en.pdf",
     "https://www.draeger.com/Content/Documents/Products/Atlan-A350-A350-XL-pi-100164-en-MASTER.pdf",
     "https://www.draeger.com/en_uk/Products/Atlan-A350-A350-XL",
     "https://www.accessdata.fda.gov/cdrh_docs/pdf23/K230931.pdf"
    ],
    "nVerified": 15
   }
  },
  {
   "id": "drager-atlan-a350-xl",
   "name": "Atlan A350 XL",
   "maker": "Dräger",
   "family": "drager-atlan",
   "desc": {
    "tr": "Dräger anestezi iş istasyonu. Ayrıntılı klinik içerik henüz hazırlanmadı; bu kayıt, kaynaklara dayalı iş istasyonu modelleme listesinden alınmıştır. Atlan ailesine ait bir modeldir; ailenin genel özellikleri Atlan serisi tanıtımında yer alır.",
    "en": "Dräger anaesthesia workstation. Detailed clinical content has not been prepared yet; this entry was taken from the workstation modelling list compiled from documented sources. This model belongs to the Atlan family; shared features are described in the Atlan series overview.",
    "es": "Estación de anestesia de Dräger. Aún no se ha preparado el contenido clínico detallado; esta ficha procede de la lista de modelado de estaciones elaborada a partir de fuentes documentadas. Este modelo pertenece a la familia Atlan; las características comunes se describen en la presentación de la serie Atlan."
   },
   "note": null,
   "ev": {
    "pkg": "drager-atlan-a350-xl",
    "model": "Atlan A350 XL",
    "maker": "Dräger",
    "ev": "P",
    "region": {
     "tr": "Üreticinin Türkiye kataloğunda yer alıyor; hastane bazında kullanım teyit edilmedi",
     "en": "Listed in the manufacturer’s catalogue for Türkiye; use in individual hospitals has not been confirmed",
     "es": "Incluido en el catálogo del fabricante para Turquía; no se ha confirmado su uso en hospitales concretos"
    },
    "src": [
     "D1"
    ],
    "origin": "independently_created_3d",
    "review": "draft",
    "geometry_verified": false,
    "clinical_animation_ready": false,
    "priority": "P2",
    "docs": [],
    "nVerified": 0
   }
  },
  {
   "id": "drager-primus",
   "name": "Primus",
   "maker": "Dräger",
   "family": null,
   "desc": {
    "tr": "Dräger anestezi iş istasyonu. Ayrıntılı klinik içerik henüz hazırlanmadı; bu kayıt, kaynaklara dayalı iş istasyonu modelleme listesinden alınmıştır.",
    "en": "Dräger anaesthesia workstation. Detailed clinical content has not been prepared yet; this entry was taken from the workstation modelling list compiled from documented sources.",
    "es": "Estación de anestesia de Dräger. Aún no se ha preparado el contenido clínico detallado; esta ficha procede de la lista de modelado de estaciones elaborada a partir de fuentes documentadas."
   },
   "note": null,
   "ev": {
    "pkg": "drager-primus",
    "model": "Primus",
    "maker": "Dräger",
    "ev": "K",
    "region": {
     "tr": "Karaman, Türkiye; 2025 yayını, 2022 çalışma kaydı",
     "en": "Karaman, Türkiye; published 2025, study registered 2022",
     "es": "Karaman, Turquía; publicado en 2025, estudio registrado en 2022"
    },
    "src": [
     "K1"
    ],
    "origin": "independently_created_3d",
    "review": "draft",
    "geometry_verified": false,
    "clinical_animation_ready": false,
    "priority": "P1",
    "docs": [
     "https://www.draeger.com/Content/Documents/TDoc/9053477_8_zh.pdf",
     "https://www.accessdata.fda.gov/cdrh_docs/pdf4/K042607.pdf",
     "https://www.draeger.com/en_me/Products/Primus"
    ],
    "nVerified": 13
   }
  },
  {
   "id": "drager-fabius-plus",
   "name": "Fabius plus",
   "maker": "Dräger",
   "family": null,
   "desc": {
    "tr": "Dräger anestezi iş istasyonu. Ayrıntılı klinik içerik henüz hazırlanmadı; bu kayıt, kaynaklara dayalı iş istasyonu modelleme listesinden alınmıştır.",
    "en": "Dräger anaesthesia workstation. Detailed clinical content has not been prepared yet; this entry was taken from the workstation modelling list compiled from documented sources.",
    "es": "Estación de anestesia de Dräger. Aún no se ha preparado el contenido clínico detallado; esta ficha procede de la lista de modelado de estaciones elaborada a partir de fuentes documentadas."
   },
   "note": null,
   "ev": {
    "pkg": "drager-fabius-plus",
    "model": "Fabius plus",
    "maker": "Dräger",
    "ev": "K",
    "region": {
     "tr": "Çin; 2025 klinik yayını",
     "en": "China; clinical publication 2025",
     "es": "China; publicación clínica de 2025"
    },
    "src": [
     "K2",
     "D6"
    ],
    "origin": "independently_created_3d",
    "review": "draft",
    "geometry_verified": false,
    "clinical_animation_ready": false,
    "priority": "P1",
    "docs": [
     "https://www.draeger.com/Content/Documents/TDoc/9054689_3_RU.pdf",
     "https://www.draeger.com/en_me/Products/Fabius-Plus",
     "https://www.draeger.com/en_me/Products/Fabius-plus-XL"
    ],
    "nVerified": 10
   }
  },
  {
   "id": "ge-healthcare-avance-cs2",
   "name": "Avance CS²",
   "maker": "GE HealthCare",
   "family": null,
   "desc": {
    "tr": "GE HealthCare anestezi iş istasyonu. Ayrıntılı klinik içerik henüz hazırlanmadı; bu kayıt, kaynaklara dayalı iş istasyonu modelleme listesinden alınmıştır.",
    "en": "GE HealthCare anaesthesia workstation. Detailed clinical content has not been prepared yet; this entry was taken from the workstation modelling list compiled from documented sources.",
    "es": "Estación de anestesia de GE HealthCare. Aún no se ha preparado el contenido clínico detallado; esta ficha procede de la lista de modelado de estaciones elaborada a partir de fuentes documentadas."
   },
   "note": null,
   "ev": {
    "pkg": "ge-healthcare-avance-cs2",
    "model": "Avance CS2",
    "maker": "GE HealthCare",
    "ev": "S",
    "region": {
     "tr": "Uluslararası kaynaklar; Türkiye’deki hastanelerde kullanım teyit edilmedi",
     "en": "International sources; use in hospitals in Türkiye has not been confirmed",
     "es": "Fuentes internacionales; no se ha confirmado su uso en hospitales de Turquía"
    },
    "src": [
     "G4"
    ],
    "origin": "independently_created_3d",
    "review": "draft",
    "geometry_verified": false,
    "clinical_animation_ready": false,
    "priority": "P1",
    "docs": [
     "https://www.accessdata.fda.gov/cdrh_docs/pdf12/K123125.pdf",
     "https://www.accessdata.fda.gov/cdrh_docs/pdf13/K131945.pdf",
     "https://www.accessdata.fda.gov/cdrh_docs/pdf15/K151570.pdf",
     "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K213867.pdf"
    ],
    "nVerified": 13
   }
  },
  {
   "id": "ge-healthcare-carestation-650",
   "name": "Carestation 650",
   "maker": "GE HealthCare",
   "family": null,
   "desc": {
    "tr": "GE HealthCare anestezi iş istasyonu. Ayrıntılı klinik içerik henüz hazırlanmadı; bu kayıt, kaynaklara dayalı iş istasyonu modelleme listesinden alınmıştır.",
    "en": "GE HealthCare anaesthesia workstation. Detailed clinical content has not been prepared yet; this entry was taken from the workstation modelling list compiled from documented sources.",
    "es": "Estación de anestesia de GE HealthCare. Aún no se ha preparado el contenido clínico detallado; esta ficha procede de la lista de modelado de estaciones elaborada a partir de fuentes documentadas."
   },
   "note": null,
   "ev": {
    "pkg": "ge-healthcare-carestation-650",
    "model": "Carestation 650",
    "maker": "GE HealthCare",
    "ev": "P",
    "region": {
     "tr": "Uluslararası kaynaklar; Türkiye’deki hastanelerde kullanım teyit edilmedi",
     "en": "International sources; use in hospitals in Türkiye has not been confirmed",
     "es": "Fuentes internacionales; no se ha confirmado su uso en hospitales de Turquía"
    },
    "src": [
     "G2"
    ],
    "origin": "independently_created_3d",
    "review": "draft",
    "geometry_verified": false,
    "clinical_animation_ready": false,
    "priority": "P1",
    "docs": [
     "https://www.accessdata.fda.gov/cdrh_docs/pdf15/K151570.pdf",
     "https://www.accessdata.fda.gov/cdrh_docs/pdf21/K213867.pdf",
     "https://www.gehealthcare.com/products/anesthesia-delivery/carestation-600-series"
    ],
    "nVerified": 20
   }
  },
  {
   "id": "ge-healthcare-datex-ohmeda-aestiva-5-compact-plus",
   "name": "Aestiva/5 Compact Plus",
   "maker": "GE HealthCare (Datex-Ohmeda)",
   "family": null,
   "desc": {
    "tr": "GE HealthCare (Datex-Ohmeda) anestezi iş istasyonu. Ayrıntılı klinik içerik henüz hazırlanmadı; bu kayıt, kaynaklara dayalı iş istasyonu modelleme listesinden alınmıştır.",
    "en": "GE HealthCare (Datex-Ohmeda) anaesthesia workstation. Detailed clinical content has not been prepared yet; this entry was taken from the workstation modelling list compiled from documented sources.",
    "es": "Estación de anestesia de GE HealthCare (Datex-Ohmeda). Aún no se ha preparado el contenido clínico detallado; esta ficha procede de la lista de modelado de estaciones elaborada a partir de fuentes documentadas."
   },
   "note": null,
   "ev": {
    "pkg": "ge-healthcare-datex-ohmeda-aestiva-5-compact-plus",
    "model": "Aestiva/5 Compact Plus",
    "maker": "GE HealthCare / Datex-Ohmeda",
    "ev": "K",
    "region": {
     "tr": "Uluslararası kaynaklar; Türkiye’deki hastanelerde kullanım teyit edilmedi",
     "en": "International sources; use in hospitals in Türkiye has not been confirmed",
     "es": "Fuentes internacionales; no se ha confirmado su uso en hospitales de Turquía"
    },
    "src": [
     "K5"
    ],
    "origin": "independently_created_3d",
    "review": "draft",
    "geometry_verified": false,
    "clinical_animation_ready": false,
    "priority": "P1",
    "docs": [
     "https://pmc.ncbi.nlm.nih.gov/articles/PMC2966709/",
     "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K000706",
     "https://www.accessdata.fda.gov/cdrh_docs/pdf2/K023366.pdf",
     "https://pmc.ncbi.nlm.nih.gov/articles/PMC6097414/"
    ],
    "nVerified": 5
   }
  },
  {
   "id": "mindray-a5",
   "name": "A5",
   "maker": "Mindray",
   "family": null,
   "desc": {
    "tr": "Mindray anestezi iş istasyonu. Ayrıntılı klinik içerik henüz hazırlanmadı; bu kayıt, kaynaklara dayalı iş istasyonu modelleme listesinden alınmıştır.",
    "en": "Mindray anaesthesia workstation. Detailed clinical content has not been prepared yet; this entry was taken from the workstation modelling list compiled from documented sources.",
    "es": "Estación de anestesia de Mindray. Aún no se ha preparado el contenido clínico detallado; esta ficha procede de la lista de modelado de estaciones elaborada a partir de fuentes documentadas."
   },
   "note": null,
   "ev": {
    "pkg": "mindray-a5",
    "model": "A5",
    "maker": "Mindray",
    "ev": "K",
    "region": {
     "tr": "Uluslararası kaynaklar; Türkiye’deki hastanelerde kullanım teyit edilmedi",
     "en": "International sources; use in hospitals in Türkiye has not been confirmed",
     "es": "Fuentes internacionales; no se ha confirmado su uso en hospitales de Turquía"
    },
    "src": [
     "M1",
     "K6"
    ],
    "origin": "independently_created_3d",
    "review": "draft",
    "geometry_verified": false,
    "clinical_animation_ready": false,
    "priority": "P1",
    "docs": [
     "https://www.mindray.com/content/dam/xpace/en/site/mdr-sscp/anesthesia/kf-h-046-026046-00-a1-a3-a5-satety-and-performance-information.pdf",
     "https://www.mindray.com/en/products/anesthesia/a5"
    ],
    "nVerified": 29
   }
  },
  {
   "id": "lowenstein-medical-leon-plus",
   "name": "Leon plus",
   "maker": "Löwenstein Medical",
   "family": null,
   "desc": {
    "tr": "Löwenstein Medical anestezi iş istasyonu. Ayrıntılı klinik içerik henüz hazırlanmadı; bu kayıt, kaynaklara dayalı iş istasyonu modelleme listesinden alınmıştır.",
    "en": "Löwenstein Medical anaesthesia workstation. Detailed clinical content has not been prepared yet; this entry was taken from the workstation modelling list compiled from documented sources.",
    "es": "Estación de anestesia de Löwenstein Medical. Aún no se ha preparado el contenido clínico detallado; esta ficha procede de la lista de modelado de estaciones elaborada a partir de fuentes documentadas."
   },
   "note": null,
   "ev": {
    "pkg": "lowenstein-medical-leon-plus",
    "model": "Leon plus",
    "maker": "Löwenstein Medical",
    "ev": "P",
    "region": {
     "tr": "Uluslararası kaynaklar; Türkiye’deki hastanelerde kullanım teyit edilmedi",
     "en": "International sources; use in hospitals in Türkiye has not been confirmed",
     "es": "Fuentes internacionales; no se ha confirmado su uso en hospitales de Turquía"
    },
    "src": [
     "L1"
    ],
    "origin": "independently_created_3d",
    "review": "draft",
    "geometry_verified": false,
    "clinical_animation_ready": false,
    "priority": "P1",
    "docs": [
     "https://loewensteinmedical.com/media/user_upload/pdf/gebrauchsanweisung/leonplus-anaesthesia-user-manual-en-0300v311.pdf",
     "https://loewensteinmedical.com/en/anesthesia/leon-plus/",
     "https://loewensteinmedical.com/media/user_upload/pdf/datenblatt/leon-plus-anaesthesia-datasheet-english.pdf"
    ],
    "nVerified": 27
   }
  }
 ]
};
