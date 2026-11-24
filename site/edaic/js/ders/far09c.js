(function () {
  'use strict';
  const VIZ = window.VIZ;

  function akis(S, satirlar, vurgu) {
    const merkez = S.w / 2;
    return satirlar.map((yazi, i) => {
      const y = 8 + 74 * i;
      const secili = i === vurgu;
      const ok = i ? S.ok([ [merkez, y - 23], [merkez, y - 4]], { renk: 'muted' }) : '';
      return ok + S.kutu(16, y, S.w - 32, 50, {
        yazi, renk: secili ? 'accent' : 'line', dolgu: secili ? 'accent-soft' : 'paper',
        w: secili ? 3 : 1.6,
      });
    }).join('');
  }

  VIZ.a09c_kalp = el => SEKIL.adim(el, {
    baslik: 'Rasemik ketaminin doğrudan ve dolaylı dolaşım etkileri', vb: [560, 216], vbDar: [340, 216], oto: false,
    ortak: (S, i) => {
      const kutular = [
        ['Doğrudan etki', 'Hafif miyokard depresyonu'],
        ['Sempatik sinir sistemi uyarılır', 'Adrenalin ve noradrenalin ↑'],
        ['Gözlenen yanıt', 'Kalp hızı, debi ve kan basıncı ↑'],
      ];
      // İlk iki etki paraleldir: aralarına nedensellik oku çizilmez.
      return kutular.map((yazi, k) => S.kutu(14, 6 + 73*k, S.w - 28, 52, {
        yazi, dolgu: i === k ? 'accent-soft' : 'paper', renk: i === k ? 'accent' : 'line',
      })).join('') + S.ok([ [S.w/2, 132], [S.w/2, 149]], { renk: 'accent' });
    },
    adimlar: [
      { ad: 'Doğrudan etki', metin: 'Rasemik karışımın miyokard üzerindeki doğrudan etkisi hafif depresyondur. [[K3 s. 117]]' },
      { ad: 'Dolaylı etki', metin: 'Diğer indüksiyon ajanlarından farklı olarak ketamin, sempatik uyarı yoluyla dolaşımdaki adrenalin ve noradrenalini artırır. [[K3 s. 117]]' },
      { ad: 'Net yanıt', metin: 'Sempatik yanıt doğrudan depresyonu maskeler, kalp hızı, kardiyak debi ve kan basıncı yükselir. [[K3 s. 117]]' },
    ],
  });

  VIZ.a09c_adrenal = el => SEKIL.sahne(el, {
    baslik: 'Etomidatla steroid sentezi ve klinik bağlam', vb: [560, 216], vbDar: [340, 216],
    secenek: { id: 'baglam', ad: 'Klinik bağlam', liste: [
      { d: 'tek', ad: 'Sağlıklı hasta · tek doz' }, { d: 'sepsis', ad: 'Sepsis · sedasyon infüzyonu' },
    ] },
    ciz: (S, t, p) => akis(S, [
      ['11β- ve 17α-hidroksilaz', 'inhibisyonu'],
      ['Adrenal kortekste kortizol ve', 'aldosteron sentezi ↓'],
      p.baglam === 'tek' ? ['Tek doz', 'Klinik önemi muhtemelen az'] : ['Septik yoğun bakım hastası', 'Mortalite artışıyla ilişki'],
    ], 2),
    metin: p => p.baglam === 'tek'
      ? 'Tek doz adrenokortikal işlevi etkileyebilir, ancak sağlıklı hastada bunun klinik önemi muhtemelen azdır. [[K3 s. 118–119]]'
      : 'Yoğun bakımda septik hastaların sedasyonu için etomidat infüzyonu kullanılması mortalite artışıyla ilişkilendirilmiştir. [[K3 s. 118]]',
  });

  const kinetik = {
    ketamin: {
      yol: [['Lipit membranlardan dağılım', 'Plazma düzeyi hızla düşer'],
        ['Hepatik P450 ile demetilasyon', 'Aktif norketamin'],
        ['İnaktif glukuronid metabolitleri', 'İdrarla atılım']],
      metin: 'İV ketaminin plazma düzeyi iki üslü azalır: hızlı faz dağılımı, yavaş faz hepatik metabolizmayı yansıtır. [[K3 s. 118]] Norketaminin potensi ketamininkinin %30’u kadardır. [[K3 s. 118]]',
    },
    etomidat: {
      yol: [['Dokulara hızlı dağılım', 'Etki sonlanır'],
        ['Ester hidrolizi', 'Etil alkol ve karboksilik asit'],
        ['Hepatik metabolizma', 'Renal atılım']],
      metin: 'Hidrolizi nonspesifik hepatik esterazlar ve muhtemelen plazma kolinesterazı yürütür. [[K3 s. 119]] Etomidat plazma kolinesterazını da inhibe edebilir. [[K3 s. 119]]',
    },
  };
  VIZ.a09c_kinetik = el => SEKIL.sahne(el, {
    baslik: 'Ketamin ve etomidatın kinetik basamakları', vb: [560, 216], vbDar: [340, 216],
    secenek: { id: 'ilac', ad: 'İlaç', liste: [{ d: 'ketamin', ad: 'Ketamin' }, { d: 'etomidat', ad: 'Etomidat' }] },
    ciz: (S, t, p) => akis(S, kinetik[p.ilac].yol, 1),
    metin: p => kinetik[p.ilac].metin,
  });
})();
