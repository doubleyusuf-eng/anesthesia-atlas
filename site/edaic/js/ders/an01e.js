(function () {
  'use strict';
  const VIZ = window.VIZ;

  VIZ.an01e_loblar = (el) => SEKIL.cizim(el, {
    baslik: 'Sağ ve sol akciğerin lobları',
    giris: 'Önce oblik fissürü izleyin, sonra sağdaki orta lob ile soldaki lingulayı karşılaştırın. [[K5 s. 61–62]]',
    gorunumler: [{ ad: 'Sağ lateral', resim: 'img/anatomi/01e-loblar.webp', en: 1024, boy: 1121, noktalar: [
      { x: 463, y: 118, ad: 'Apeks', metin: 'Apeks boyun köküne uzanır. [[K5 s. 57]]' },
      { x: 632, y: 421, ad: 'Üst lob', metin: 'Kostal yüzde üst lobun orta lobla sınırını transvers fissür çizer. [[K5 s. 58]]' },
      { x: 757, y: 594, ad: 'Transvers fissür', metin: 'Önden gelen transvers fissür midaksiller hatta oblik fissürle birleşir. [[K5 s. 62]]' },
      { x: 827, y: 716, ad: 'Orta lob', metin: 'Orta lob, transvers ve oblik fissürler arasında kalır. [[K5 s. 58]]' },
      { x: 709, y: 739, ad: 'Oblik fissür', metin: 'Sağ oblik fissür arkada beşinci kaburga hizasından öne ve aşağı uzanır. [[K5 s. 61–62]]' },
      { x: 377, y: 842, ad: 'Alt lob', metin: 'Oblik fissürün arka-alt tarafını alt lob doldurur. [[K5 s. 58]]' }
    ] }, { ad: 'Sol anterolateral', resim: 'img/anatomi/01e-lingula.webp', en: 1024, boy: 1366, noktalar: [
      { x: 500, y: 375, ad: 'Üst lob', metin: 'Lingula sol üst lobun ön-alt bölümüne aittir. [[K5 s. 65–66]]' },
      { x: 241, y: 795, ad: 'Kardiyak çentik', metin: 'Sol ön kenarın çentiği beşinci ve altıncı kostal kıkırdakların arkasına düşer. [[K5 s. 61]]' },
      { x: 179, y: 968, ad: 'Lingula', metin: 'Dil biçimindeki bu çıkıntıya üst lob bronşunun alt bölümü dağılır. [[K5 s. 65–66]]' },
      { x: 552, y: 845, ad: 'Oblik fissür', metin: 'Sol oblik fissür üst ve alt lobların sınırıdır. [[K5 s. 61]]' },
      { x: 661, y: 1056, ad: 'Alt lob', metin: 'Alt lob oblik fissürün arka-alt tarafında kalır. [[K5 s. 58]]' }
    ] }]
  });

  VIZ.an01e_karina = (el) => SEKIL.cizim(el, {
    baslik: 'Trakea bifurkasyonu',
    giris: 'Hastanın sağ ana bronşunu resmin solunda, parlak karina sırtının yanında bulun. [[K5 s. 67]]',
    gorunumler: [{ ad: 'Bronkoskopik', resim: 'img/anatomi/01e-karina.webp', en: 1024, boy: 1024, noktalar: [
      { x: 589, y: 473, ad: 'Karina', metin: 'Kısa, keskin kenarlı sagittal sırt trakeanın orta çizgisinin biraz solunda görülür. [[K5 s. 67]]' },
      { x: 335, y: 478, ad: 'Sağ ana bronş', metin: 'Sağ ana bronş daha geniş ve daha dik olduğundan bronkoskop bu yöne daha kolay ilerler. [[K5 s. 67]]' },
      { x: 727, y: 497, ad: 'Sol ana bronş', metin: 'Solda üst lob ağzına ulaşmadan önce daha uzun bir ana bronş geçilir. [[K5 s. 67]]' },
      { x: 493, y: 180, ad: 'Kıkırdak halkası', metin: 'Trakeada halkaların beyazı ile aradaki kırmızımsı mukoza birbirini izler. [[K5 s. 66]]' }
    ] }]
  });

  VIZ.an01e_bolmeler = (el) => SEKIL.sahne(el, {
    baslik: 'Mediastenin sagittal yerleşim şeması', vb: [510, 220], vbDar: [360, 220],
    ciz: (S) => {
      const w = S.w, kenar = 22, orta = w * .34;
      return S.t(kenar, 22, 'ÖN · sternum', { c: 'm' }) + S.t(w - kenar, 22, 'ARKA · omurga', { a: 'end', c: 'm' })
        + S.kutu(kenar, 40, w - 2 * kenar, 48, { yazi: 'Üst mediasten', dolgu: 'basic-soft' })
        + S.kutu(kenar, 96, orta - kenar - 4, 86, { yazi: 'Ön' })
        + S.kutu(orta, 96, w - 2 * orta, 86, { yazi: ['Orta', 'Perikard'], dolgu: 'accent-soft' })
        + S.kutu(w - orta + 4, 96, orta - kenar - 4, 86, { yazi: 'Arka' })
        + S.t(w / 2, 208, 'Diyafram', { a: 'middle', c: 'm' });
    },
    metin: () => 'Şemada perikardı bulun. Sternuma doğru ön, toraks girişine doğru üst mediastene geçilir. [[K5 s. 56–57]]'
  });

  VIZ.an01e_hilus = (el) => SEKIL.sahne(el, {
    baslik: 'Akciğer kökünün dış komşuları', vb: [540, 275], vbDar: [360, 275],
    secenek: { id: 'taraf', ad: 'Kök', liste: [{ d: 'sag', ad: 'Sağ' }, { d: 'sol', ad: 'Sol' }] },
    ciz: (S, t, p) => {
      const sag = p.taraf === 'sag', x = S.w / 2, y = 138;
      const on = sag ? ['Ön', 'V. kava superior', 'Frenik sinir'] : ['Ön', 'Frenik sinir'];
      const arka = sag ? ['Arka', 'Vagus'] : ['Arka', 'İnen aort', 'Vagus'];
      return S.cizgi([[x, 50], [x, 225]], { renk: 'line' }) + S.cizgi([[28, y], [S.w - 28, y]], { renk: 'line' })
        + S.kutu(x - 75, 10, 150, 55, { yazi: ['Üst', sag ? 'Azigos veni' : 'Aort arkı'], dolgu: 'basic-soft' })
        + S.kutu(4, 100, x - 45, 76, { yazi: on })
        + S.kutu(x + 41, 100, x - 45, 76, { yazi: arka })
        + S.daire(x, y, 31, { dolgu: 'accent-soft', renk: 'accent' }) + S.t(x, y + 5, 'Kök', { a: 'middle', c: 'b' })
        + S.kutu(x - 75, 209, 150, 55, { yazi: ['Alt', 'Pulmoner bağ'] });
    },
    metin: (p) => p.taraf === 'sag' ? 'Sağda kökün üzerinden azigos veni, önünden superior vena kava ve frenik sinir geçer. [[K5 s. 63]]' : 'Solda üstte aort arkı, arkada inen aort ve vagus bulunur. [[K5 s. 62]]'
  });

  const loblar = [
    ['Sağ üst', ['1 · Apikal', '2 · Posterior', '3 · Anterior'], 'Üç dal tek bir üçlenmeyle veya iki yakın çatallanmayla ayrılır. [[K5 s. 63–64]]'],
    ['Sağ orta', ['4 · Lateral', '5 · Medial'], 'Orta lob dalları sağ ana bronşun alt bölümünden gelen orta lob bronşuna bağlıdır. [[K5 s. 63–64]]'],
    ['Sağ alt', ['6 · Apikal', '7 · Medial bazal', '8 · Anterior bazal', '9 · Lateral bazal', '10 · Posterior bazal'], 'Apikal segment bronşunun çıkışından daha distalde bazal dallar sıralanır. [[K5 s. 63–64]]'],
    ['Sol üst bölüm', ['1–2 · Apikoposterior', '3 · Anterior'], 'Apikal ve posterior bronşlar genellikle tek bir gövdeyi paylaşır. [[K5 s. 65]]'],
    ['Lingula', ['4 · Üst', '5 · Alt'], 'Sol üst lobun lingular bölümü üst ve alt segmentlere dağılır. [[K5 s. 65–66]]'],
    ['Sol alt', ['6 · Apikal', '8 · Anterior bazal', '9 · Lateral bazal', '10 · Posterior bazal'], 'Kitabın sol alt lob haritasında medial bazal dal yer almaz. [[K5 s. 64–66]]']
  ];
  VIZ.an01e_segment = (el) => SEKIL.sahne(el, {
    baslik: 'Segment bronşu seçicisi', vb: [510, 238], vbDar: [360, 238],
    secenek: { id: 'lob', ad: 'Bölge', liste: loblar.map(([ad], i) => ({ d: String(i), ad })) },
    ciz: (S, t, p) => {
      const [ad, dallar] = loblar[p.lob], x = S.w * .43;
      const ilk = 118 - (dallar.length - 1) * 22;
      return S.kutu(5, 94, x - 27, 48, { yazi: ad, dolgu: 'accent-soft' })
        + dallar.map((dal, i) => {
          const y = ilk + i * 44;
          return S.cizgi([[x - 22, 118], [x, 118], [x, y], [x + 15, y]], { renk: 'basic' })
            + S.kutu(x + 15, y - 18, S.w - x - 22, 36, { yazi: dal });
        }).join('');
    },
    metin: (p) => loblar[p.lob][2]
  });

  // Bir yol seçildiğinde durakları yukarıdan aşağıya okutur.
  function yol(S, duraklar) {
    const h = 38, bosluk = 19, genislik = Math.min(360, S.w - 26), x = (S.w - genislik) / 2;
    return duraklar.map((ad, i) => {
      const y = 10 + i * (h + bosluk), orta = S.w / 2;
      return (i ? S.ok([[orta, y - bosluk], [orta, y - 2]], { renk: 'basic' }) : '')
        + S.kutu(x, y, genislik, h, { yazi: ad, dolgu: i === 0 ? 'accent-soft' : 'paper' });
    }).join('');
  }

  VIZ.an01e_hava = (el) => SEKIL.sahne(el, {
    baslik: 'Hava boşluklarının devamlılığı', vb: [540, 346], vbDar: [360, 346],
    ciz: (S) => yol(S, ['Bronşiyol', 'Respiratuvar bronşiyol', 'Alveoler kanal', 'Atriyum', 'Alveoler kese', 'Alveol']),
    metin: () => 'Respiratuvar bronşiyolde ilk duvar alveollerini, kanalın sonunda atriyumları, keselerin duvarında ise alveolleri arayın. [[K5 s. 68–69]]'
  });

  VIZ.an01e_kan = (el) => SEKIL.sahne(el, {
    baslik: 'Arterden venöz dönüşe', vb: [540, 236], vbDar: [360, 236],
    secenek: { id: 'yatak', ad: 'Yatak', liste: [{ d: 'pulmoner', ad: 'Alveol' }, { d: 'proksimal', ad: 'Proksimal bronş' }, { d: 'distal', ad: 'Distal bronş' }] },
    ciz: (S, t, p) => {
      const yollar = {
        pulmoner: ['Pulmoner arter', 'Alveoler kapillerler', 'Pulmoner ven', 'Sol atriyum'],
        proksimal: ['Bronşiyal arter', 'Proksimal bronş duvarı', 'Bronşiyal ven', 'Sağda azigos / solda iki olası yol'],
        distal: ['Bronşiyal arter', 'Distal bronş duvarı', 'Pulmoner ven', 'Sol atriyum']
      };
      return yol(S, yollar[p.yatak]);
    },
    metin: (p) => ({
      pulmoner: 'Alveoler gaz alışverişinden geçen kan pulmoner venlerle sol atriyuma döner. [[K5 s. 69–70]]',
      proksimal: 'İlk iki veya üç çatallanma bronşiyal venlerle sağda azigosa, solda superior hemiazigosa veya sol superior interkostal vene drene olur. [[K5 s. 70]]',
      distal: 'Distal bronş duvarından çıkan venöz kan pulmoner venlere karışarak fizyolojik şanta katkı verir. [[K5 s. 70]]'
    })[p.yatak]
  });

  VIZ.an01e_lenf = (el) => SEKIL.sahne(el, {
    baslik: 'Lenfatik drenajın durakları', vb: [540, 298], vbDar: [360, 298],
    secenek: { id: 'pleksus', ad: 'Başlangıç', liste: [{ d: 'yuzey', ad: 'Yüzeyel ağ' }, { d: 'derin', ad: 'Derin ağ' }] },
    ciz: (S, t, p) => yol(S, [p.pleksus === 'yuzey' ? 'Visseral plevra' : 'Bronşlar', 'Bronkopulmoner düğüm', 'Trakeobronşiyal düğüm', 'Bronkomediastinal trunkus', 'Genellikle aynı tarafın venöz açısı']),
    metin: () => 'Her iki pleksus aynı düğüm yolunu izler. [[K5 s. 71]] Trunkuslar çoğunlukla kendi tarafındaki juguler–subklavyen birleşime doğrudan açılır. [[K5 s. 71]]'
  });

  VIZ.an01e_gelisim = (el) => SEKIL.adim(el, {
    baslik: 'Solunum yolunun gelişimi ve tipik fistül', vb: [540, 168], vbDar: [360, 168], oto: false,
    adimlar: [
      { ad: 'Oluk', metin: 'Ön bağırsağın ventral orta hattında divertikül belirir. [[K5 s. 71]]', ciz: (S) => yol(S, ['3 mm embriyo', 'Ön bağırsak', 'Ventral trakeobronşiyal oluk']) },
      { ad: 'Ayrılma', metin: 'Oluk kaudalde kapanır ve larinks girişi dışında ilkel özofagustan ayrılır. [[K5 s. 71]]', ciz: (S) => yol(S, ['Oluk derinleşir', 'Kaudal kenarlar birleşir', 'Hava yolu ve özofagus ayrılır']) },
      { ad: 'Dallanma', metin: 'Kaudal uzantıdan iki ana bronş, proliferasyonla iki akciğer tomurcuğu gelişir. [[K5 s. 71]]', ciz: (S) => yol(S, ['Kaudal uzantı', 'İki ana bronş', 'Sağ ve sol akciğer tomurcukları']) },
      { ad: 'Tipik anomali', metin: 'Üst özofagus kör sonlanırken distal özofagus T4 hizasında trakeaya bağlanır. [[K5 s. 72]]', ciz: (S) => S.kutu(8, 12, S.w - 16, 44, { yazi: 'Üst özofagus · kör poş' })
        + S.kutu(8, 93, S.w * .38, 54, { yazi: 'Trakea' }) + S.kutu(S.w * .56, 93, S.w * .41, 54, { yazi: 'Distal özofagus' })
        + S.cizgi([[8 + S.w * .38, 120], [S.w * .56, 120]], { renk: 'accent', w: 4 })
        + S.t(S.w * .48, 108, 'T4', { a: 'middle' }) }
    ]
  });
})();
