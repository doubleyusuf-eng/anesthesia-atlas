'use strict';
/* İleri Monitörizasyon Atlası · kategoriler, alanlar ve kayıt şeması

   Cihaz kaydı (data/devices-*.js içinde ICA_DEVICES.push(...)):
   {
     id:        'bis-advance',          // sabit, küçük harf, kebab-case; içerik dosyası content/<id>.js ile eşleşir
     cat:       'depth',                // CATEGORIES kimliği
     area:      'gas',                  // yalnızca cat:'other' için; AREAS kimliği
     also:      ['masimo'],             // isteğe bağlı: başka kategoride de listelenir
     kind:      'device',               // KINDS kimliği
     name:      'BIS Advance',          // ürün adı (çevrilmez) ya da {tr,en,es}
     maker:     'Medtronic',            // isteğe bağlı
     measures:  ['BIS','SQI','EMG'],    // isteğe bağlı, dilden bağımsız kısaltmalar
     desc:      {tr,en,es},             // 1–2 cümle: cihaz nedir, ne ölçer
     note:      {tr,en,es},             // isteğe bağlı: önemli ayrım/uyarı
     placement: 'forehead-eeg'          // isteğe bağlı: 3B hasta uygulama sahnesi (PLACEMENTS)
     sub:       'portable',             // isteğe bağlı: kategorinin alt grubu (CATEGORIES[].subs)
     lean:      true,                   // isteğe bağlı: içeriği olmayan bölümler cihaz sayfasında gösterilmez
     ext:       ['us/us-dev.js'],       // isteğe bağlı: cihaz sayfasından önce yüklenen uzantı dosyaları (ICA_EXT)
     model3d:   true                    // isteğe bağlı: 3B modeli uzantıda (katalog kartında "3B model" rozeti)
   }
*/
window.ICA_DEVICES = window.ICA_DEVICES || [];

window.ICA_CATEGORIES = [
  {id:'depth',       n:1, name:{tr:'Anestezi derinliği ve beyin fonksiyonu',en:'Depth of anesthesia and brain function',es:'Profundidad anestésica y función cerebral'},
   short:{tr:'Derinlik / EEG',en:'Depth / EEG',es:'Profundidad / EEG'}},
  {id:'noci',        n:2, name:{tr:'Nosisepsiyon ve analjezi yanıtı',en:'Nociception and analgesia response',es:'Nocicepción y respuesta analgésica'},
   short:{tr:'Nosisepsiyon',en:'Nociception',es:'Nocicepción'}},
  {id:'nirs',        n:3, name:{tr:'NIRS — serebral ve somatik oksimetri',en:'NIRS — cerebral and somatic oximetry',es:'NIRS — oximetría cerebral y somática'},
   short:{tr:'NIRS',en:'NIRS',es:'NIRS'}},
  {id:'hemo',        n:4, name:{tr:'İleri hemodinamik monitörizasyon',en:'Advanced hemodynamic monitoring',es:'Monitorización hemodinámica avanzada'},
   short:{tr:'Hemodinami',en:'Hemodynamics',es:'Hemodinámica'}},
  {id:'nmt',         n:5, name:{tr:'Nöromüsküler blok monitörizasyonu',en:'Neuromuscular blockade monitoring',es:'Monitorización del bloqueo neuromuscular'},
   short:{tr:'Nöromüsküler',en:'Neuromuscular',es:'Neuromuscular'}},
  {id:'masimo',      n:6, name:{tr:'Masimo cihazları ve parametreleri',en:'Masimo devices and parameters',es:'Equipos y parámetros de Masimo'},
   short:{tr:'Masimo',en:'Masimo',es:'Masimo'}},
  {id:'us',          n:7, name:{tr:'Ultrasonografi cihazları',en:'Ultrasound systems',es:'Equipos de ecografía'},
   short:{tr:'Ultrason',en:'Ultrasound',es:'Ecografía'},
   subs:[{id:'portable', name:{tr:'Portatif ultrasonlar',en:'Portable ultrasound systems',es:'Ecógrafos portátiles'}},
         {id:'cart',     name:{tr:'Arabalı (sabit) ultrasonlar',en:'Cart-based ultrasound systems',es:'Ecógrafos de carro'}}]},
  {id:'other',       n:8, name:{tr:'Diğer anestezi cihaz grupları',en:'Other anesthesia device groups',es:'Otros grupos de equipos de anestesia'},
   short:{tr:'Diğer gruplar',en:'Other groups',es:'Otros grupos'}}
];

window.ICA_AREAS = [
  {id:'basic',    name:{tr:'Temel monitörizasyon',en:'Basic monitoring',es:'Monitorización básica'}},
  {id:'gas',      name:{tr:'Solunum ve gaz analizi',en:'Respiratory and gas analysis',es:'Análisis respiratorio y de gases'}},
  {id:'respadv',  name:{tr:'İleri solunum değerlendirmesi',en:'Advanced respiratory assessment',es:'Evaluación respiratoria avanzada'}},
  {id:'vent',     name:{tr:'Ventilasyon',en:'Ventilation',es:'Ventilación'}},
  {id:'airway',   name:{tr:'Hava yolu',en:'Airway',es:'Vía aérea'}},
  {id:'infusion', name:{tr:'İnfüzyon',en:'Infusion',es:'Infusión'}},
  {id:'fluid',    name:{tr:'Sıvı ve ısı yönetimi',en:'Fluid and temperature management',es:'Manejo de fluidos y temperatura'}},
  {id:'blood',    name:{tr:'Kan yönetimi',en:'Blood management',es:'Manejo de sangre'}},
  {id:'regional', name:{tr:'Rejyonel anestezi',en:'Regional anesthesia',es:'Anestesia regional'}},
  {id:'poc',      name:{tr:'Hasta başı analiz',en:'Point-of-care testing',es:'Análisis a pie de cama'}},
  {id:'coag',     name:{tr:'Koagülasyon',en:'Coagulation',es:'Coagulación'}},
  {id:'neuro',    name:{tr:'Özel nöromonitörizasyon',en:'Specialized neuromonitoring',es:'Neuromonitorización especializada'}},
  {id:'resus',    name:{tr:'Resüsitasyon',en:'Resuscitation',es:'Reanimación'}}
];

window.ICA_KINDS = {
  device:    {tr:'Cihaz',en:'Device',es:'Equipo'},
  module:    {tr:'Modül',en:'Module',es:'Módulo'},
  platform:  {tr:'Platform',en:'Platform',es:'Plataforma'},
  algorithm: {tr:'Algoritma',en:'Algorithm',es:'Algoritmo'},
  parameter: {tr:'Parametre',en:'Parameter',es:'Parámetro'},
  type:      {tr:'Cihaz türü',en:'Device type',es:'Tipo de equipo'}
};
