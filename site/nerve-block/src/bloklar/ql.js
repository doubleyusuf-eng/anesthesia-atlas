// Kuadratus lumborum bloğu — transmüsküler (ön, "KL3") yaklaşım, "shamrock" (yonca) görüntüsü, L4 seviyesi
import * as THREE from 'three';
import { Arac, fmt, RENK, etiketKurucu, etiketler, kamera, centroid } from '../blok.js';

export default {
  id: 'ql',
  ad: 'Kuadratus lumborum bloğu (transmüsküler)',
  kisa: 'KL (transmüsküler)',
  grup: 'Gövde',
  bolge: 'karin',
  yatis: 'solYan',
  katmanAdlari: { fasya: 'Transversalis fasya', kemik: 'Kemik ve torakolomber fasya' },
  kur,
};

const QL = 'Quadratus_lumborum_muscler';
const PS = 'Psoas_majorr';
const ICL = 'Iliocostalis_lumborum_muscler';
const LT = 'Longissimus_thoracis_muscler';
const MF = 'Multifidus_lumborum_muscler';
const LD = 'Latissimus_dorsi_muscler';
const TA = 'Transversus_abdominis_muscler';
const IO = 'Internal_abdominal_oblique_muscler';
const EO = 'External_abdominal_oblique_muscler';
const L4 = 'Vertebra_L4';
const TLF_ON = 'Anterior_layer_of_thoracolumbar_fasciar';
const TLF_ORTA = 'Middle_layer_of_thoracolumbar_fasciar';
const TLF_ARKA = 'Posterior_layer_of_thoracolumbar_fasciar';
const ES = [ICL, LT];

/** Probu kendi uzun ekseni (u) çevresinde hafifçe eğerek (tilt) hedefi tam kesit düzlemine al */
function duzlemeAl(P, T) {
  const d = T.clone().sub(P.S);
  const phi = Math.atan(d.dot(P.mz) / d.dot(P.n));
  const n = P.n.clone().multiplyScalar(Math.cos(phi)).addScaledVector(P.mz, Math.sin(phi)).normalize();
  const mz = P.u.clone().cross(n).normalize();
  return { ...P, n, b: n.clone().negate(), mz, tiltDer: THREE.MathUtils.radToDeg(phi) };
}

function kur(anat, isaretler) {
  const a = new Arac(anat);
  const { SARI, KIRMIZI, BEYAZ, PEMBE, CAMGOBEGI, KAS, KEMIK, ORGAN, PROB, KESIT } = RENK;
  const xOrta = isaretler?.gobek ? isaretler.gobek[0] : Math.max(...a.verts(L4).map((v) => v.x)) - 0.044;

  // L4 transvers çıkıntısının sağ ucu (yoncanın "sapı")
  const l4 = a.verts(L4).filter((v) => v.x < xOrta);
  const tpUcu = l4.reduce((m, v) => (v.x < m.x ? v : m));
  const yL = tpUcu.y;

  const enYakin = (A, B) => {
    let best = null, bd = Infinity;
    for (const p of A) for (const q of B) { const d = p.distanceToSquared(q); if (d < bd) { bd = d; best = [p, q]; } }
    return best;
  };
  // Hedef: TP ucunun lateralinde, KL'nin ön yüzü ile psoas majör arasındaki plan (kemiğe değil, fasyal plana)
  const dilim = (nm) => a.verts(nm).filter((v) => Math.abs(v.y - yL) < 0.004 && v.x < tpUcu.x - 0.006 && v.distanceTo(tpUcu) < 0.04);
  const cift = enYakin(dilim(QL), dilim(PS));
  const T = cift ? cift[0].clone().lerp(cift[1], 0.5) : tpUcu.clone().add(new THREE.Vector3(-0.008, 0, -0.004));

  // İğne yolunun geçtiği yapılar: yol boyunca örneklerin 3 mm yakınında köşe sayısı
  const yakinda = (names) => [].concat(...[].concat(names).map((nm) => a.verts(nm))).filter((v) => v.distanceTo(T) < 0.12);
  const YV = { kl: yakinda(QL), es: yakinda([...ES, MF]), ps: yakinda(PS), kemik: yakinda([L4, 'Vertebra_L3', 'Vertebra_L5', 'Hip_boner']) };
  const yoldan = (E, vs, tSon = 0.96) => {
    let k = 0;
    for (let t = 0.05; t < tSon; t += 0.05) {
      const p = E.clone().lerp(T, t);
      if (vs.some((v) => v.distanceToSquared(p) < 9e-6)) k++;
    }
    return k;
  };

  // Prob eğimi (laterale göre arkaya doğru) ve iğne açısı: iğne KL'yi geçsin; erektör spinaya olabildiğince az,
  // psoas ve kemiğe hiç değmesin. Her adayda prob hedef tam kesit düzleminde olacak şekilde hafifçe eğilir.
  let en = null;
  for (let th = 0; th <= 40; th += 5) {
    const r = THREE.MathUtils.degToRad(th);
    const Pd = duzlemeAl(a.probYerlestir(T, new THREE.Vector3(-Math.cos(r), 0, -Math.sin(r)), new THREE.Vector3(0, 0, -1), { bas: 0.2, enCokDer: 12, alan: 0.012 }), T);
    for (let ia = 45; ia <= 75; ia += 5) {
      const igd = a.igneYolu(Pd, T, { aci: ia, enCok: 0.03 });
      const y = { kl: yoldan(igd.E, YV.kl), es: yoldan(igd.E, YV.es, 0.9), ps: yoldan(igd.E, YV.ps, 0.85), kemik: yoldan(igd.E, YV.kemik, 0.9) };
      const puan = y.kl - 1.5 * y.es - 3 * (y.ps + y.kemik) - igd.derinlikCm * 0.05 - Math.abs(th - 30) * 0.02; // arka aksiller çizgiye (~30°) yakın olan yeğlenir
      if (!en || puan > en.puan) en = { puan, P: Pd, ig: igd, y, th, ia };
    }
  }
  const P = en.P;
  const { S, n, b, u, mz } = P;
  const kesit = a.kesitci(P, { yariGenislik: 0.05, derinlik: 0.12 });
  const { E, derinlikCm, aciDer, girisProbKenariCm } = en.ig;
  const hedefDerinlikCm = T.clone().sub(S).dot(b) * 100;
  const yol = { ...en.y, probEgimDer: en.th, tiltDer: +P.tiltDer.toFixed(1) };

  // Kesitteki yonca yaprakları ve diğer yapılar
  const qlK = kesit(QL);
  const psK = kesit(PS);
  const esK = kesit(ES);
  const tpK = kesit(L4, 0.004, (v) => v.distanceTo(tpUcu) < 0.015);
  const tlfK = kesit(TLF_ON, 0.006);
  const karinK = kesit([TA, IO, EO], 0.003, (v, d) => d.dot(u) < -0.01);
  const kolonK = kesit('Ascending_colon', 0.004);

  // Yüzey işaretleri: iliak krestin tepesi, 12. kaburganın ucu
  const kalca = a.verts('Hip_boner');
  const krest = kalca.reduce((m, v) => (v.y > m.y ? v : m));
  const k12 = a.verts('Twelfth_ribr');
  const kaburgaUcu = k12.reduce((m, v) => (v.x < m.x ? v : m));
  const deriyeDogru = (p) => p && a.deriVur(p.clone().addScaledVector(n, 0.2), n.clone().negate())?.p;
  const krestDeri = deriyeDogru(krest);
  const kaburgaDeri = deriyeDogru(kaburgaUcu);
  const bobrek = a.merkez('Kidneyr', (v) => v.y < a.merkez('Kidneyr').y);

  const { grup, objects } = a.nesneler(P, {
    E, T,
    kesitDerinlik: 0.1,
    kesitGenislik: 0.06,
    la: { merkez: T.clone(), boyut: new THREE.Vector3(0.012, 0.005, 0.03) },
    isaretler: [[krestDeri, 0xffe14d], [kaburgaDeri, 0xffe14d], [S, 0x35e07a]],
  });

  // ---- Kameralar: hastanın sağ-arka yanından ----
  const genel = kamera(S.clone().lerp(T, 0.4).add(new THREE.Vector3(0, 0.01, 0)), new THREE.Vector3(-0.75, 0.25, -0.62), 0.6);
  const orta = kamera(T.clone().lerp(S, 0.3), new THREE.Vector3(-0.55, 0.45, -0.7), 0.32);
  const yakin = kamera(T.clone().lerp(S, 0.45), new THREE.Vector3(-0.3, 0.8, -0.52), 0.22);

  const probUst = S.clone().addScaledVector(n, 0.06);
  const isaretNokta = S.clone().addScaledVector(u, 0.0215).addScaledVector(n, 0.011);
  const kesitNokta = S.clone().addScaledVector(b, 0.09).addScaledVector(u, -0.028);
  const odak = [QL, PS, ICL, LT, MF, TA, LD, 'Iliohypogastric_nerver', 'Lumbar_arteriesr', 'Lumbar_veinsr'];
  const odakYakin = [QL, PS, ICL, LT, MF, 'Iliohypogastric_nerver', 'Lumbar_arteriesr', 'Lumbar_veinsr'];
  const katmanYakin = { deri: 0.2, kas: 0.65, fasya: 0.2, sinir: 1, arter: 0.8, ven: 0.6, kemik: 0.75, bag: 0.7, organ: 0.18 };
  const katmanIgne = { ...katmanYakin, kas: 0.42, bag: 0.25, kemik: 0.6 }; // iğne kas ve fasyaların içinden de seçilsin

  const steps = [
    {
      baslik: 'Pozisyon ve yüzey işaretleri',
      metin: 'Hasta blok tarafı üstte yan yatar. İliak krest ve 12. kaburganın ucu bulunur. Prob iliak krestin hemen üstünde, arka aksiller çizgide transvers konacak ve mediale (L4 transvers çıkıntısına) yöneltilecek. Bu bölümde transmüsküler (ön, "KL3") yaklaşım gösterilir.',
      katman: { deri: 1, kemik: 0.6 },
      vurgu: ['Hip_boner', 'Twelfth_ribr', L4],
      goster: ['isaretler'],
      etiket: etiketler(genel, [
        ['12. kaburga ucu', kaburgaDeri, SARI, -0.07, 0.05],
        ['İliak krest', krestDeri, SARI, -0.07, -0.05],
        ['Prob: krestin üstünde,\narka aksiller çizgi', S, PROB, -0.11, 0.0],
      ]),
      kamera: genel,
    },
    {
      baslik: 'Kuadratus lumborum ve komşulukları',
      metin: 'Kuadratus lumborum (KL) 12. kaburga, L1–L4 transvers çıkıntıları ve iliak krest arasındadır. Önünde (ve medialinde) psoas majör, arkasında erektör spina vardır; torakolomber fasyanın ön yaprağı KL ile psoası, orta yaprağı KL ile erektör spinayı ayırır. Yaklaşımlar hedef plana göre adlanır: lateral (KL1, KL\'nin anterolateral kenarı), posterior (KL2, KL ile erektör spina arası) ve transmüsküler (KL3, KL ile psoas arası). Böbrek daha yukarıda, L1–L3 düzeyinde KL\'nin önündedir.',
      katman: { deri: 0.2, kas: 0.85, fasya: 0.2, sinir: 1, arter: 0.8, ven: 0.6, kemik: 0.9, bag: 0.8, organ: 0.45 },
      vurgu: [QL],
      odak,
      goster: [],
      etiket: etiketler(orta, [
        ['Kuadratus lumborum', a.merkez(QL, (v) => Math.abs(v.y - yL - 0.03) < 0.01), KAS],
        ['Psoas majör', a.merkez(PS, (v) => Math.abs(v.y - yL - 0.02) < 0.01), KAS],
        ['Erektör spina', a.merkez(ES, (v) => Math.abs(v.y - yL - 0.02) < 0.01), KAS],
        ['L4 transvers çıkıntı', tpUcu, KEMIK],
        ['Böbrek (alt kutup)', bobrek, ORGAN],
        ['12. kaburga', a.merkez('Twelfth_ribr', (v) => v.x < kaburgaUcu.x + 0.03), KEMIK],
      ], { olcek: 0.7, uzaklik: 0.06 }),
      etiketOlcek: 0.7,
      kamera: orta,
    },
    {
      baslik: 'Sono-anatomi: yonca (shamrock) görüntüsü',
      metin: 'Prob mediale yöneltilince L4 transvers çıkıntısı akustik gölgeli parlak bir "sap" olarak görülür; yoncanın üç yaprağı: önde psoas majör, arkada erektör spina, transvers çıkıntının ucunda (lateralde) kuadratus lumborum. Lateralde karın duvarı kasları transversus abdominis aponevrozunda birleşir. Hedef, KL ile psoas arasındaki fasyal plandır (torakolomber fasyanın ön yaprağı çevresi).',
      katman: katmanYakin,
      vurgu: [QL, PS, ICL, LT],
      odak: odakYakin,
      goster: ['kesit'],
      etiket: etiketler(yakin, [
        ['Kuadratus lumborum', qlK, KAS],
        ['Psoas majör', psK, KAS],
        ['Erektör spina', esK, KAS],
        ['L4 transvers çıkıntı ("sap")', tpK || tpUcu, KEMIK],
        ['Karın duvarı kasları', karinK, KAS],
        ['Hedef: KL–psoas arası', T, CAMGOBEGI],
      ], { olcek: 0.55, uzaklik: 0.045 }),
      etiketOlcek: 0.55,
      kamera: yakin,
    },
    {
      baslik: 'Prob yerleşimi',
      metin: 'Derin bir hedef olduğundan genellikle konveks (düşük frekanslı) prob kullanılır. Prob iliak krestin üstünde, arka aksiller çizgide transvers konur, prob işareti posteriora (iğnenin gireceği uca) bakar; prob hafifçe mediale ve kaudale eğilerek yonca görüntüsü aranır. Modelde prob şematik çizilmiştir.',
      katman: katmanYakin,
      vurgu: [],
      odak: odakYakin,
      goster: ['prob', 'kesit'],
      etiket: etiketler(yakin, [
        ['Prob', probUst, BEYAZ],
        ['Prob işareti → posterior', isaretNokta, PROB],
        ['USG kesit düzlemi', kesitNokta, KESIT],
        ['Hedef: KL–psoas arası', T, CAMGOBEGI],
      ], { olcek: 0.55, uzaklik: 0.045 }),
      etiketOlcek: 0.55,
      kamera: yakin,
    },
    {
      baslik: 'İğne giriş noktası ve yolu',
      metin: `In-plane, posteriordan anteriora: iğne probun posterior ucundan girer, kuadratus lumborumu geçer (transmüsküler) ve ucu KL ile psoas majör arasındaki plana yerleştirilir. Küçük test dozuyla ilacın psoası KL'den ayırdığı görülür; psoas içine ya da daha öne (böbrek, periton) ilerlenmemelidir. Bu modelde giriş–hedef ≈ ${fmt(derinlikCm)} cm, deriyle açı ≈ ${Math.round(aciDer)}°, hedef derinliği ≈ ${fmt(hedefDerinlikCm)} cm.`,
      katman: katmanIgne,
      vurgu: [],
      odak: odakYakin,
      goster: ['prob', 'kesit', 'igne', 'giris', 'hedef'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        [`İğne giriş noktası\nprob kenarının ~${fmt(girisProbKenariCm)} cm posteriorunda`, E, PEMBE],
        [`≈ ${fmt(derinlikCm)} cm · ${Math.round(aciDer)}°`, E.clone().lerp(T, 0.5), BEYAZ],
        ['Hedef: KL–psoas arası', T, CAMGOBEGI],
      ], { olcek: 0.55, uzaklik: 0.045 }),
      etiketOlcek: 0.55,
      kamera: yakin,
    },
    {
      baslik: 'Lokal anestezik yayılımı',
      metin: 'İlaç KL ile psoas arasında yayılır ve kraniyokaudal ilerler. Torasik paravertebral alana ve lomber pleksusa ulaşması değişkendir; analjezi alanı (T10–L1 çevresi) hastadan hastaya farklıdır. Lomber pleksusa yayılımla kuadriseps güçsüzlüğü olabilir: düşme riskine dikkat. Hacim gerektiren bir plan bloğu olduğundan toplam lokal anestezik dozu hesaplanmalıdır.',
      katman: katmanIgne,
      vurgu: [QL, PS],
      odak: odakYakin,
      goster: ['prob', 'kesit', 'igne', 'hedef', 'la'],
      probSaydam: true,
      etiket: etiketler(yakin, [
        ['Lokal anestezik\nKL ile psoas arasında', T, CAMGOBEGI],
        ['Kuadratus lumborum', qlK, KAS],
        ['Psoas majör', psK, KAS],
      ], { olcek: 0.55, uzaklik: 0.045 }),
      etiketOlcek: 0.55,
      kamera: yakin,
    },
  ];

  const olcum = {
    derinlikCm, aciDer, girisProbKenariCm, hedefDerinlikCm, yol,
    metin: `KL–psoas arası (hedef) derinliği ≈ ${fmt(hedefDerinlikCm)} cm, giriş–hedef ≈ ${fmt(derinlikCm)} cm, iğne–deri açısı ≈ ${Math.round(aciDer)}° (L4 düzeyi)`,
    kesitBulundu: { kl: !!qlK, psoas: !!psK, erektor: !!esK, tp: !!tpK, tlf: !!tlfK, kolon: !!kolonK },
  };
  return { grup, objects, steps, etiketleriKur: etiketKurucu(steps), olcum, P, noktalar: { S, E, T, tpUcu, qlK, psK, esK } };
}
