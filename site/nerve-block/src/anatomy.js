// Anatomi modelini yükler, katmanlara ayırır, malzemeleri ve Türkçe adları atar.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import adGogus from './adlar/gogus.js';
import adKol from './adlar/kol.js';
import adSirt from './adlar/sirt.js';
import adKarin from './adlar/karin.js';
import adFemoral from './adlar/femoral.js';
import adAlt from './adlar/alt.js';

export const LAYERS = {
  deri: { renk: 0xe9b79c, opak: 0.34 },
  kas: { renk: 0xb4503f, opak: 1 },
  fasya: { renk: 0x4fd1b8, opak: 0.5 },
  arter: { renk: 0xd8352a, opak: 1 },
  ven: { renk: 0x2f5fd8, opak: 1 },
  sinir: { renk: 0xf5d02f, opak: 1 },
  kemik: { renk: 0xeee6d2, opak: 1 },
  bag: { renk: 0xfbf7ec, opak: 1 },
  organ: { renk: 0xf0a3b4, opak: 0.55 },
};

// Kullanıcının açıp kapattığı gruplar → model katmanları
export const TOGGLES = [
  ['deri', 'Deri', ['deri']],
  ['kas', 'Kaslar', ['kas']],
  ['fasya', 'Fasya iliaka', ['fasya']],
  ['damar', 'Damarlar', ['arter', 'ven']],
  ['sinir', 'Sinirler', ['sinir']],
  ['kemik', 'Kemik ve bağ', ['kemik', 'bag']],
  ['organ', 'Organlar', ['organ']],
];

// [Türkçe ad, kısa açıklama]
export const NAMES = {
  Femoral_nerver: ['Femoral sinir', 'Lomber pleksusun (L2–L4) en büyük dalı. İnguinal ligamentin altından, iliopsoasın üzerinde ve fasya iliakanın derininde, femoral arterin lateralinden uyluğa geçer.'],
  Anterior_cutaneous_branches_of_femoral_nerver: ['Femoral sinirin ön deri dalları', 'Uyluğun ön yüzünün duyusu.'],
  Lateral_femoral_cutaneous_nerver: ['Lateral femoral kutanöz sinir', 'SİAS\'ın hemen medialinden, inguinal ligamentin altından geçer; uyluk lateralinin duyusu.'],
  Genitofemoral_nerver: ['Genitofemoral sinir', 'Psoas majörün ön yüzünde seyreder.'],
  Femoral_branch_of_genitofemoral_nerver: ['Genitofemoral sinirin femoral dalı', 'Femoral kılıf içinde, femoral üçgenin üst kısmının derisini innerve eder.'],
  Saphenous_nerver: ['Safen sinir', 'Femoral sinirin en uzun duyusal dalı; adduktor kanal boyunca ilerler.'],
  Obturator_nerver: ['Obturator sinir', 'Lomber pleksusun dalı; obturator kanaldan uyluğun medialine geçer.'],
  Femoral_arteryr: ['Femoral arter', 'Eksternal iliak arterin inguinal ligament altındaki devamı. Femoral kılıf içinde; sinirin medialinde, venin lateralinde.'],
  External_iliac_arteryr: ['Eksternal iliak arter', 'İnguinal ligamentin altından geçince femoral arter adını alır.'],
  Deep_femoral_arteryr: ['Derin femoral arter', 'Femoral arterden genellikle ligamentin 3–5 cm altında ayrılır. Blok seviyesi tercihen bu ayrılmanın üstüdür.'],
  Lateral_circumflex_femoral_arteryr: ['Lateral sirkumfleks femoral arter', 'Çoğunlukla derin femoral arterin dalı; femoral sinir dallarının arasından laterale geçer.'],
  Medial_circumflex_femoral_arteryr: ['Medial sirkumfleks femoral arter', 'Femur başının ana beslenme kaynaklarından.'],
  Superficial_epigastric_arteryr: ['Yüzeyel epigastrik arter', 'Femoral arterin yüzeyel dalı.'],
  Femoral_veinr: ['Femoral ven', 'Arterin medialinde. Prob basısıyla kolayca kollabe olur; arterden ayırt etmede işe yarar.'],
  External_iliac_veinr: ['Eksternal iliak ven', 'Femoral venin ligament üstündeki devamı.'],
  Deep_femoral_veinr: ['Derin femoral ven', ''],
  Great_saphenous_veinr: ['Büyük safen ven', 'Safenofemoral bileşkede femoral vene katılır.'],
  Lateral_circumflex_femoral_veinsr: ['Lateral sirkumfleks femoral venler', ''],
  Medial_circumflex_femoral_veinsr: ['Medial sirkumfleks femoral venler', ''],
  Superficial_epigastric_veinr: ['Yüzeyel epigastrik ven', ''],
  Iliacus_muscler: ['İliak kas', 'Psoas majörle birlikte iliopsoası oluşturur; femoral sinir iliopsoasın üzerinde uzanır.'],
  Psoas_majorr: ['Psoas majör', 'İliak kasla birlikte iliopsoası oluşturur.'],
  Sartorius_muscler: ['Sartorius', 'Femoral üçgenin lateral sınırı.'],
  Pectineus_muscler: ['Pektineus', 'Femoral üçgen tabanının medial kısmı.'],
  Adductor_longusr: ['Adduktor longus', 'Femoral üçgenin medial sınırı.'],
  Rectus_femoris_muscler: ['Rektus femoris', 'Kuadriseps femorisin parçası.'],
  Tensor_fasciae_lataer: ['Tensor fasya lata', ''],
  Vastus_medialis_muscler: ['Vastus medialis', 'Kuadriseps femorisin parçası.'],
  Vastus_lateralis_muscler: ['Vastus lateralis', 'Kuadriseps femorisin parçası.'],
  Hip_boner: ['Kalça kemiği (os coxae)', 'SİAS ve tüberkülum pubikum bu kemiğin üzerindedir.'],
  Femurr: ['Femur', ''],
  // ---- Boyun / brakiyal pleksus ----
  Roots_of_brachial_plexusr: ['Brakiyal pleksus kökleri (C5–T1)', 'Ön ve orta skalen kaslar arasındaki interskalen oluktan çıkar. İnterskalen blokta hedef C5–C6 kökleridir.'],
  Superior_trunk_of_brachial_plexusr: ['Üst trunkus (C5–C6)', 'Omuz ve üst kolun innervasyonunun büyük kısmını taşır.'],
  Middle_trunk_of_brachial_plexusr: ['Orta trunkus (C7)', ''],
  Inferior_trunk_of_brachial_plexusr: ['Alt trunkus (C8–T1)', 'Supraklaviküler blokta "köşe cebi" enjeksiyonu bu trunkusu hedefler.'],
  Anterior_division_of_superior_trunk_of_brachial_plexusr: ['Üst trunkusun ön divizyonu', ''],
  Posterior_division_of_superior_trunk_of_brachial_plexusr: ['Üst trunkusun arka divizyonu', ''],
  Anterior_division_of_middle_trunk_of_brachial_plexusr: ['Orta trunkusun ön divizyonu', ''],
  Posterior_division_of_middle_trunk_of_brachial_plexusr: ['Orta trunkusun arka divizyonu', ''],
  Anterior_division_of_inferior_trunk_of_brachial_plexusr: ['Alt trunkusun ön divizyonu', ''],
  Posterior_division_of_inferior_trunk_of_brachial_plexusr: ['Alt trunkusun arka divizyonu', ''],
  Posterior_cord_of_brachial_plexusr: ['Posterior kord', ''],
  Suprascapular_nerver: ['Supraskapular sinir', 'Üst trunkustan ayrılır; omuz ekleminin duyusunun önemli bir kısmını taşır.'],
  Dorsal_scapular_nerver: ['Dorsal skapular sinir', 'Orta skalen kasın içinden geçer; posterior interskalen yaklaşımda iğne yolunda olabilir.'],
  Long_thoracic_nerver: ['Uzun torasik sinir', 'C5–C7; orta skalen kasın içinden geçer, serratus anterioru innerve eder.'],
  'Vagus_nerve_(X)r': ['Vagus siniri', 'Karotis kılıfında, karotis arter ile internal juguler venin arasında ve arkasında.'],
  'Accessory_nerve_(XI)r': ['Aksesuar sinir', 'Posterior servikal üçgeni çaprazlar.'],
  Right_subclavian_artery: ['Subklavyen arter', 'Ön ve orta skalen arasından geçip 1. kaburganın üzerinden aşar; supraklaviküler blokta pleksus bunun lateralindedir.'],
  Right_common_carotid_artery: ['Ana karotis arter', 'Karotis kılıfında; interskalen görüntülemede medialde.'],
  Brachiocephalic_trunk: ['Brakiyosefalik trunkus', ''],
  Vertebral_arteryr: ['Vertebral arter', 'C6 transvers foramenine girer; interskalen blokta derin ve medialde kalır.'],
  Thyrocervical_trunkr: ['Tiroservikal trunkus', ''],
  Transverse_cervical_arteryr: ['Transvers servikal arter', 'Pleksusun yakınından ya da içinden geçebilir; Doppler ile tanınır.'],
  Suprascapular_arteryr: ['Supraskapular arter', ''],
  Axillary_arteryr: ['Aksiller arter', '1. kaburganın dış kenarından sonra subklavyen arterin adı.'],
  Internal_carotid_arteryr: ['İnternal karotis arter', ''],
  External_carotid_arteryr: ['Eksternal karotis arter', ''],
  Costocervical_trunkr: ['Kostoservikal trunkus', ''],
  Deep_cervical_arteryr: ['Derin servikal arter', ''],
  Internal_jugular_veinr: ['İnternal juguler ven', 'Karotis kılıfında, arterin lateralinde.'],
  External_jugular_veinr: ['Eksternal juguler ven', 'SKM\'nin üzerinden çapraz geçer; yüzeyel bir işarettir.'],
  Right_subclavian_vein: ['Subklavyen ven', 'Ön skalenin önünde, arterden ayrı seyreder.'],
  Right_brachiocephalic_vein: ['Brakiyosefalik ven', ''],
  Vertebral_veinr: ['Vertebral ven', ''],
  Anterior_jugular_veinr: ['Anterior juguler ven', ''],
  Suprascapular_veinr: ['Supraskapular ven', ''],
  Axillary_veinr: ['Aksiller ven', ''],
  Scalenus_anterior_muscler: ['Ön skalen kas', 'Pleksus kökleri bunun arkasından (lateralinden) çıkar; frenik sinir ön yüzünde iner.'],
  Scalenus_medius_muscler: ['Orta skalen kas', 'İnterskalen oluğun arka duvarı; dorsal skapular ve uzun torasik sinirler içinden geçer.'],
  Scalenus_posterior_muscler: ['Arka skalen kas', ''],
  Sternocleidomastoid_muscler: ['Sternokleidomastoid (SKM)', 'İnterskalen oluk bu kasın lateral (arka) kenarının arkasındadır.'],
  Omohyoid_muscler: ['Omohiyoid', 'Alt karnı posterior servikal üçgeni çaprazlar; supraklaviküler görüntüde pleksusun üzerinde görülebilir.'],
  Levator_scapulaer: ['Levator skapula', ''],
  Ascending_part_of_trapezius_muscler: ['Trapezius (üst lifler)', ''],
  Subclavius_muscler: ['Subklavius', ''],
  Sternohyoid_muscler: ['Sternohiyoid', ''],
  Sternothyroid_muscler: ['Sternotiroid', ''],
  Longus_colli_muscler: ['Longus colli', ''],
  Longus_capitis_muscler: ['Longus capitis', ''],
  Clavicular_head_of_pectoralis_major_muscler: ['Pektoralis majörün klavikular başı', ''],
  Clavicler: ['Klavikula', ''],
  First_ribr: ['1. kaburga', 'Subklavyen arter ve alt trunkus bunun üzerinde; hemen medialinde ve derininde plevra kubbesi.'],
  Second_ribr: ['2. kaburga', ''],
  Vertebra_C3: ['C3 omuru', ''],
  Vertebra_C4: ['C4 omuru', ''],
  Vertebra_C5: ['C5 omuru', ''],
  Vertebra_C6: ['C6 omuru', 'Belirgin ön tüberkülü (Chassaignac) vardır; krikoid kıkırdakla aynı seviyededir.'],
  Vertebra_C7: ['C7 omuru', 'Transvers çıkıntısında ön tüberkül yoktur; seviye doğrulamada işe yarar.'],
  Vertebra_T1: ['T1 omuru', ''],
  Vertebra_T2: ['T2 omuru', ''],
  Manubrium_of_sternum: ['Manubrium sterni', ''],
  Costal_cartilage_of_first_ribr: ['1. kosta kıkırdağı', ''],
  Mandible: ['Mandibula', ''],
  Hyoid_bone: ['Hiyoid kemik', ''],
  Scapular: ['Skapula', ''],
  Thyroid_cartilage: ['Tiroid kıkırdak', ''],
  Cricoid_cartilage: ['Krikoid kıkırdak', 'C6 seviyesinin yüzey işareti.'],
  Pleura: ['Plevra', 'Akciğeri örter. Boyunda kubbesi 1. kaburganın hemen medialinde ve derininde (supraklaviküler blokta pnömotoraks riski); toraks duvarında parietal plevra paravertebral alanın ön sınırıdır.'],
  Thyroid_gland: ['Tiroid bezi', ''],
  Trachea: ['Trakea', ''],
  // ---- Uyluk / diz ----
  Sciatic_nerver: ['Siyatik sinir', 'Popliteal fossanın üst köşesinde tibial ve ortak peroneal sinirlere ayrılır.'],
  Tibial_nerver: ['Tibial sinir', 'Siyatiğin medial dalı; popliteal damarların yüzeyelinde.'],
  Common_fibular_nerver: ['Ortak peroneal (fibular) sinir', 'Siyatiğin lateral dalı; biseps femoris tendonu boyunca fibula başına uzanır.'],
  Posterior_femoral_cutaneous_nerver: ['Posterior femoral kutanöz sinir', ''],
  Medial_sural_cutaneous_nerver: ['Medial sural kutanöz sinir', ''],
  Popliteal_arteryr: ['Popliteal arter', 'Adduktor hiatustan sonra femoral arterin adı; popliteal fossada en derindeki yapı.'],
  Descending_branch_of_lateral_circumflex_femoral_artery: ['Lateral sirkumfleks femoral arterin inen dalı', ''],
  Perforating_femoral_arteriesr: ['Perforan arterler', ''],
  Superior_medial_genicular_arteryr: ['Süperior medial genikuler arter', ''],
  Superior_lateral_genicular_arteryr: ['Süperior lateral genikuler arter', ''],
  Popliteal_veinr: ['Popliteal ven', 'Arterin yüzeyelinde ve lateralinde; basıyla kollabe olur.'],
  Small_saphenous_veinr: ['Küçük safen ven', ''],
  Vastus_intermedius_muscler: ['Vastus intermedius', ''],
  Adductor_magnusr: ['Adduktor magnus', 'Adduktor kanalın posterior duvarı; hiatusu bu kasın tendonu oluşturur.'],
  Adductor_brevisr: ['Adduktor brevis', ''],
  Gracilis_muscler: ['Grasilis', ''],
  Semitendinosus_muscler: ['Semitendinozus', 'Popliteal fossanın üst-medial sınırı.'],
  Semimembranosus_muscler: ['Semimembranozus', 'Popliteal fossanın üst-medial sınırı.'],
  Long_head_of_biceps_femorisr: ['Biseps femoris (uzun baş)', 'Popliteal fossanın üst-lateral sınırı.'],
  Short_head_of_biceps_femorisr: ['Biseps femoris (kısa baş)', ''],
  Lateral_head_of_gastrocnemiusr: ['Gastroknemius (lateral baş)', ''],
  Medial_head_of_gastrocnemiusr: ['Gastroknemius (medial baş)', ''],
  Patellar: ['Patella', ''],
  Tibiar: ['Tibia', ''],
  Fibular: ['Fibula', ''],
  // ---- Karın duvarı ----
  Intercostal_nervesr: ['İnterkostal sinirler (torasik ön dallar)', 'Kaburgaların alt kenarı boyunca, internal ve en içteki interkostal kaslar arasında seyreder; lateral ve ön deri dalları göğüs ve karın duvarını innerve eder. T7–T11 ön dalları karında internal oblik ile transversus abdominis arasındaki planda (TAP) ilerler.'],
  Iliohypogastric_nerver: ['İliyohipogastrik sinir (L1)', 'Krestin önünde TAP planına girer.'],
  'Ilio-inguinal_nerver': ['İlioinguinal sinir (L1)', ''],
  Inferior_epigastric_arteryr: ['İnferior epigastrik arter', 'Rektus kılıfının arkasında.'],
  Superior_epigastric_arteryr: ['Süperior epigastrik arter', ''],
  Subcostal_arteryr: ['Subkostal arter', ''],
  Lumbar_arteriesr: ['Lomber arterler', ''],
  Inferior_epigastric_veinr: ['İnferior epigastrik ven', ''],
  Superior_epigastric_veinsr: ['Süperior epigastrik venler', ''],
  Right_subcostal_vein: ['Subkostal ven', ''],
  External_abdominal_oblique_muscler: ['Eksternal oblik', 'Lateral karın duvarının en yüzeyel kası.'],
  Internal_abdominal_oblique_muscler: ['İnternal oblik', 'Orta katman; TAP bunun derin yüzü ile transversus abdominis arasındadır.'],
  Transversus_abdominis_muscler: ['Transversus abdominis', 'En derin kas katmanı; altında transversalis fasya ve periton.'],
  Rectus_abdominis_muscler: ['Rektus abdominis', ''],
  Latissimus_dorsi_muscler: ['Latissimus dorsi', ''],
  Quadratus_lumborum_muscler: ['Kuadratus lumborum', ''],
  Iliocostalis_lumborum_muscler: ['İliokostalis lumborum', ''],
  Longissimus_thoracis_muscler: ['Longissimus torasis', ''],
  Transversalis_fascia: ['Transversalis fasya', 'Transversus abdominisin derin yüzünü örter; altında periton.'],
  Eighth_ribr: ['8. kaburga', ''],
  Ninth_ribr: ['9. kaburga', ''],
  Tenth_ribr: ['10. kaburga', 'Orta aksiller çizgide kosta kenarının en alt noktası.'],
  Eleventh_ribr: ['11. kaburga', ''],
  Twelfth_ribr: ['12. kaburga', ''],
  Costal_cartilage_of_seventh_ribr: ['7. kosta kıkırdağı', ''],
  Costal_cartilage_of_eighth_ribr: ['8. kosta kıkırdağı', ''],
  Costal_cartilage_of_ninth_ribr: ['9. kosta kıkırdağı', ''],
  Costal_cartilage_of_tenth_ribr: ['10. kosta kıkırdağı', ''],
  Vertebra_L1: ['L1 omuru', ''],
  Vertebra_L2: ['L2 omuru', ''],
  Vertebra_L3: ['L3 omuru', ''],
  Vertebra_L4: ['L4 omuru', ''],
  Liver: ['Karaciğer', 'Sağ tarafta yüksek yapılan bloklarda iğne derinliğine dikkat.'],
  Kidneyr: ['Böbrek', ''],
  Deri: ['Deri', 'Z-Anatomy deri bölgelerinin birleşik dış yüzeyi; kaynak verideki ince, çift katmanlı yamalardan hacim yoluyla yeniden üretildi.'],
  Inguinal_ligament_turetilmis: ['İnguinal ligament (türetilmiş)', 'SİAS ile tüberkülum pubikum arasında. Kaynak veride ayrı model olmadığı için bu iki kemik noktasından şematik olarak çizildi.'],
  Fascia_iliaca_turetilmis: ['Fasya iliaka (türetilmiş)', 'Kaynak veride ayrı model yok; iliopsoas ve üzerindeki femoral sinirin ön yüzeyinin 1,5 mm önünde, model verisinden türetildi. Femoral sinir bu fasyanın derinindedir; femoral arter ve ven ise önünde.'],
};

// Bölge gruplarına göre ayrı dosyalarda tutulan ek adlar (src/adlar/*.js)
Object.assign(NAMES, adGogus, adKol, adSirt, adKarin, adFemoral, adAlt);

export async function loadAnatomy(url) {
  const gltf = await new GLTFLoader().loadAsync(url);
  const root = gltf.scene;
  const parts = new Map();
  const byLayer = {};
  root.traverse((o) => {
    if (!o.isMesh) return;
    const layer = o.userData.layer;
    const def = LAYERS[layer];
    if (!def) return;
    const transparent = def.opak < 1;
    const renk = o.userData.renk ?? def.renk;
    o.material = new THREE.MeshStandardMaterial({
      color: renk,
      roughness: layer === 'kemik' ? 0.8 : 0.55,
      metalness: 0,
      transparent,
      opacity: def.opak,
      depthWrite: !transparent,
      side: layer === 'deri' || layer === 'fasya' || layer === 'organ' ? THREE.DoubleSide : THREE.FrontSide,
    });
    o.renderOrder = layer === 'deri' ? 3 : layer === 'fasya' || layer === 'organ' ? 2 : 0;
    if (layer === 'deri') rontgenDeri(o.material);
    o.userData.baseColor = renk;
    o.userData.baseOpacity = def.opak;
    const [ad, aciklama] = NAMES[o.name] || [o.name.replace(/_/g, ' '), ''];
    o.userData.ad = ad;
    o.userData.aciklama = aciklama;
    parts.set(o.name, o);
    (byLayer[layer] ||= []).push(o);
  });
  return { root, parts, byLayer };
}

/**
 * "Röntgen" deri: bakış yönüne dik yüzeyler neredeyse saydam, kenarlar (siluet) belirgin.
 * Böylece vücut hattı görünür, içerideki yapılar perdelenmez.
 */
function rontgenDeri(mat) {
  mat.roughness = 0.7;
  mat.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <opaque_fragment>',
      `float kenarOrani = 1.0 - abs(dot(normalize(normal), normalize(vViewPosition)));
      diffuseColor.a = clamp(diffuseColor.a * mix(0.22, 2.7, kenarOrani * kenarOrani), 0.0, 1.0);
      #include <opaque_fragment>`,
    );
  };
  mat.customProgramCacheKey = () => 'rontgen-deri';
}

/** Katman görünürlüğü ve saydamlığı: deger 0 = gizli, 0..1 = opaklık çarpanı */
export function setLayerOpacity(anat, layer, deger) {
  for (const m of anat.byLayer[layer] || []) {
    m.visible = deger > 0;
    if (!m.visible) continue;
    const op = Math.min(1, m.userData.baseOpacity * deger);
    m.material.opacity = op;
    if (m.material.transparent !== op < 1) m.material.needsUpdate = true;
    m.material.transparent = op < 1;
    m.material.depthWrite = op >= 1;
  }
}

export function setHighlight(anat, names) {
  const set = new Set(names || []);
  for (const m of anat.parts.values()) {
    const on = set.has(m.name);
    m.material.emissive.setHex(on ? m.userData.baseColor : 0x000000);
    m.material.emissiveIntensity = on ? 0.45 : 0;
  }
}

/** Bir parçanın (yerel koordinatta) köşeleri */
export function partVertices(mesh) {
  const p = mesh.geometry.attributes.position;
  const out = new Array(p.count);
  for (let i = 0; i < p.count; i++) out[i] = new THREE.Vector3().fromBufferAttribute(p, i);
  return out;
}
