(function () {
  'use strict';
  const VIZ = window.VIZ;
  const merkez = { a: 'middle', c: 'b' };
  const secenek = (ad, adlar) => ({ ad, id: 'secim', liste: adlar.map(ad => ({ ad, d: ad })) });

  // İki septumun hangi yönden geliştiğini ve iki çıkışın nasıl oluştuğunu karşılaştırır.
  const bolunmeler = [
    ['AV açıklık', 'Dorsal ve ventral endokardiyal yastıklar orta hatta birleşerek ortak açıklığı sağ triküspit ve sol mitral açıklıklara ayırır. [[K5 s. 92]]',
      'Ortak AV açıklık', 'Dorsal ve ventral yastıklar', 'Triküspit açıklık', 'Mitral açıklık'],
    ['Atriyum', 'Primumda üst açıklık oluşurken sağındaki sekundum aşağı uzanır ve iki yaprak arasından sağdan sola geçiş mümkün olur. [[K5 s. 92]]',
      'Ortak atriyum', 'Örtüşen iki septum', 'Sağ atriyum', 'Sol atriyum'],
    ['Çıkış yolu', 'Aşağı büyüyen spiral septum, yukarı büyüyen kaslı septumla buluşunca iki ventrikülün çıkışları ayrılır. [[K5 s. 93]]',
      'Trunkus arteriozus', 'Spiral septum', 'Pulmoner trunkus', 'Aort'],
  ];
  VIZ.an02b_bolunme = el => SEKIL.adim(el, {
    baslik: 'Ortak boşlukların bölünmesi', vb: [640, 215], vbDar: [360, 215], oto: false,
    adimlar: bolunmeler.map(([ad, metin, ortak, bolme, sag, sol]) => ({
      ad, metin, ciz: S => {
        const x = S.w / 2;
        const dal = S.w / 4;
        return S.kutu(x - 110, 8, 220, 45, { yazi: ortak })
          + S.t(x, 88, bolme, merkez)
          + S.ok([[x,100],[x,111],[dal,111],[dal,143]], { renk: 'basic' })
          + S.ok([[x,100],[x,111],[3*dal,111],[3*dal,143]], { renk: 'clin' })
          + S.kutu(8, 149, 2*dal-16, 46, { yazi: sag, dolgu: 'basic-soft' })
          + S.kutu(2*dal+8, 149, 2*dal-16, 46, { yazi: sol, dolgu: 'clin-soft' });
      },
    })),
  });

  VIZ.an02b_ark = el => SEKIL.sahne(el, {
    baslik: 'Rekürren sinirin arterle ilişkisi', vb: [640, 245], vbDar: [360, 245],
    secenek: secenek('Taraf', ['Sağ', 'Sol']),
    metin: p => p.secim === 'Sağ'
      ? 'Beşinci ark ve distal altıncı ark gerileyince sinir sağ dördüncü ark türevi olan subklavyen arterin altından döner. [[K5 s. 94]]'
      : 'Sinir distal altıncı arkın kalıntısı olan ligamentum arteriozumu dolanır, çok daha büyük aort arkı bu bağın üzerinden geçer. [[K5 s. 94–95]]',
    ciz: (S, t, p) => {
      const x = S.w / 2, sag = p.secim === 'Sağ', y = sag ? 100 : 150;
      return S.t(x-78, 24, 'Vagus', merkez) + S.t(x+76, 24, 'Larinkse', merkez)
        + S.cizgi([[x-78,36],[x-78,222]], { renk: 'accent', w: 6 })
        + S.ok([[x-78,54],[x-48,93],[x-31,y+27],[x-15,y+40],[x+12,y+40],[x+37,y+18],[x+76,36]], { renk: 'accent', w: 5 })
        + S.daire(x, y, sag ? 22 : 11, { renk: sag ? 'crit' : 'muted', dolgu: sag ? 'crit-soft' : 'line' })
        + (sag ? '' : S.daire(x, y-60, 36, { renk: 'crit', dolgu: 'crit-soft' }))
        + S.t(x, 235, sag ? 'Sağ subklavyen arter' : 'Aort arkı ve altındaki bağ', merkez);
    },
  });

  // Her basamakta seçilen akım yukarıdan aşağıya okunur.
  const yollar = [
    ['Plasentadan', ['Umbilikal ven', 'Duktus venozus', 'Vena kava inferior', 'Sağ atriyum'], 'Duktus venozus, plasentadan gelen kanın büyük kısmını karaciğeri atlayarak kalbe taşır. [[K5 s. 95]]'],
    ['Beyin ve kalp', ['Foramen ovale', 'Sol atriyum → sol ventrikül', 'Çıkan aort', 'Beyin ve kalp'], 'Alt kavadan gelen kanın yöneldiği bu yolda vertebral, karotis ve koroner arterler görece iyi oksijenlenmiş kan alır. [[K5 s. 95–96]]'],
    ['Alt gövde', ['Üst kava → sağ atriyum', 'Triküspit → sağ ventrikül', ['Pulmoner trunkus', '→ Duktus arteriozus'], 'İnen aort'], 'Alt gövdeyi besleyen akımın plasentaya dönüşü internal iliak arterlerden ayrılan umbilikal arterlerle olur. [[K5 s. 96]]'],
    ['İlk soluk', ['Akciğerler genişler', 'Pulmoner direnç düşer', 'Sol atriyum basıncı yükselir', 'Septumlar karşı karşıya gelir'], 'Sağ atriyum basıncındaki azalma ve sol atriyum basıncındaki artış, foramen ovalenin kapakçığını kapatır. [[K5 s. 96]]'],
    ['Duktus', ['Oksijen gerilimi artar', 'Duktus kası kasılır', 'İşlevsel kapanma', '2–3 ayda obliterasyon'], 'Duktus arteriozusun ilk kapanması kasılmayla gerçekleşir, anatomik kapanma daha sonra tamamlanır. [[K5 s. 96]]'],
  ];
  function zincir(S, adlar) {
    const x = S.w / 2, w = Math.min(368, S.w - 20);
    return adlar.map((ad, i) => {
      const y = 10 + 65*i;
      return (i ? S.ok([[x,y-22],[x,y-3]], { renk: 'accent' }) : '')
        + S.kutu(x-w/2, y, w, 42, { yazi: ad, dolgu: i === adlar.length-1 ? 'accent-soft' : 'paper' });
    }).join('');
  }
  VIZ.an02b_fetus = el => SEKIL.adim(el, {
    baslik: 'Fetal akım ve doğumda geçiş', vb: [640, 260], vbDar: [380, 260], oto: false,
    adimlar: yollar.map(([ad, yol, metin]) => ({ ad, metin, ciz: S => zincir(S, yol) })),
  });

  const defektler = {
    'Fallot': [['Spiral septumun yer değiştirmesi', ['Dar pulmoner çıkış', 've ata binen aort'], ['Ventriküler septal defekt', 've sağ ventrikül hipertrofisi'], 'Sağdan sola geçiş ve siyanoz'],
      'Sağ ventriküldeki desatüre kan defektten sol ventriküle, ayrıca doğrudan aorta geçer. [[K5 s. 97]]'],
    'ASD': [['Atriyal septum', 'Sekundum: yukarıdaki açıklık', 'Primum: AV sınıra yakın açıklık'],
      'Primum defektine membranöz ventriküler septum defekti de eşlik edebilir. [[K5 s. 96]]'],
    'VSD': [['Ventriküler septum', 'Çok geniş açıklık', 'Ortak ventrikül boşluğu', 'Üç odacıklı kalp'],
      'Ventriküllerin tek boşluk gibi birleşmesi çok geniş defektte görülebilir. [[K5 s. 96]]'],
    'PDA': [['Aort ve pulmoner trunkus', 'Arada açık kalan duktus', 'Sol kalpte ilerleyici hipertrofi', 'Eşlik eden pulmoner hipertansiyon'],
      'Patent duktus düzeltilmezse sol kalp hipertrofisi ve pulmoner hipertansiyon gelişir. [[K5 s. 97]]'],
  };
  VIZ.an02b_fallot = el => SEKIL.sahne(el, {
    baslik: 'Doğumsal defektlerin karşılaştırılması', vb: [640, 260], vbDar: [380, 260],
    secenek: secenek('Defekt', Object.keys(defektler)),
    metin: p => defektler[p.secim][1],
    ciz: (S, t, p) => {
      if (p.secim === 'ASD' || p.secim === 'PDA') {
        const w = S.w - 22;
        const etiketler = defektler[p.secim][0];
        return etiketler.map((ad, i) => S.kutu(11, 12+i*62, w, 46,
          { yazi: ad, dolgu: i ? 'paper' : 'accent-soft' })).join('');
      }
      return zincir(S, defektler[p.secim][0]);
    },
  });

  VIZ.an02b_kilif = el => SEKIL.cizim(el, {
    baslik: 'Sağ karotis kılıfı', giris: 'Ön taraf üsttedir. Damarları ve iki siniri seçin. [[K5 s. 99]]',
    gorunumler: [{ ad: 'Enine kesit', resim: 'img/anatomi/02b-kilif.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 354, y: 336, ad: 'İnternal juguler ven', metin: 'Ven, alt boyunda ana karotisin lateralinde ve onunla aynı kılıfta seyreder. [[K5 s. 99]]' },
        { x: 677, y: 321, ad: 'Ana karotis arteri', metin: 'Karotis nabzı sternokleidomastoidin medial kenarının medialinde hissedilebilir. [[K5 s. 104]]' },
        { x: 520, y: 415, ad: 'Vagus', metin: 'Vagus, ven ile arter arasındaki aralığın arka bölümündedir. [[K5 s. 99]]' },
        { x: 439, y: 495, ad: 'Servikal sempatik zincir', metin: 'Zincir, ortak kılıfın hemen arkasından yukarı çıkar. [[K5 s. 99]]' },
      ] }],
  });
  VIZ.an02b_venler = el => SEKIL.cizim(el, {
    baslik: 'Brakiyosefalik venlerin birleşmesi', giris: 'Önden bakarken hastanın sağı solda kalır. Bir damarı seçerek yolunu izleyin. [[K5 s. 100–101]]',
    gorunumler: [{ ad: 'Önden', resim: 'img/anatomi/02b-venler.webp', en: 1024, boy: 683,
      noktalar: [
        { x: 315, y: 120, ad: 'Sağ internal juguler ven', metin: 'Sigmoid sinüs juguler foramende internal juguler ven olarak devam eder. [[K5 s. 98]]' },
        { x: 176, y: 324, ad: 'Sağ subklavyen ven', metin: 'Aksiller venin devamı olan damar anterior skalenin medial kenarında internal jugulerle birleşir. [[K5 s. 100]]' },
        { x: 345, y: 418, ad: 'Sağ brakiyosefalik ven', metin: 'Yaklaşık 3 cm uzunluğundaki ven manubriumun sağ kenarı arkasında aşağı iner. [[K5 s. 100]]' },
        { x: 705, y: 120, ad: 'Sol internal juguler ven', metin: 'Klavikulanın sternal ucunun arkasında subklavyen vene katılır. [[K5 s. 98]]' },
        { x: 829, y: 323, ad: 'Sol subklavyen ven', metin: 'Torasik kanalın son ucu solda bu vene açılır. [[K5 s. 100]]' },
        { x: 538, y: 420, ad: 'Sol brakiyosefalik ven', metin: 'Yaklaşık 6 cm uzunluğundadır ve manubriumun arkasından oblik geçer. [[K5 s. 101]]' },
        { x: 382, y: 605, ad: 'Superior vena kava', metin: 'İki brakiyosefalik ven birinci kostal kıkırdağın alt kenarında birleşir. [[K5 s. 101]]' },
      ] }],
  });

  VIZ.an02b_kesit = el => SEKIL.sahne(el, {
    baslik: 'Ultrason kesiti ve kateterin son konumu', vb: [520, 255], vbDar: [360, 255],
    secenek: secenek('Görünüm', ['Boyun kesiti', 'Kateter ucu']),
    metin: p => p.secim === 'Boyun kesiti'
      ? 'Şemada iğne ucu internal juguler ven içindedir, komşu karotis aynı kesitte izlenir. [[K5 s. 102–103]]'
      : 'Uç, sağ atriyumun girişinde superior vena kava tarafında kalır. [[K5 s. 103]]',
    ciz: (S, t, p) => {
      const x = S.w/2;
      if (p.secim === 'Kateter ucu') {
        return S.kutu(x-65,10,130,139,{ yazi: ['Superior', 'vena kava'], dolgu:'basic-soft' })
          + S.kutu(x-90,149,180,77,{ yazi:'Sağ atriyum', dolgu:'clin-soft' })
          + S.cizgi([[x-38,12],[x-38,141]],{ renk:'accent', w:4 })
          + S.daire(x-38,141,5,{ dolgu:'accent' })
          + S.t(x-82,136,'Uç',{a:'end',c:'b'});
      }
      return S.kutu(8,32,S.w-16,13,{ dolgu:'muted' })
        + S.t(S.w-18,25,'Deri',{a:'end'})
        + S.kutu(8,46,S.w-16,48,{ dolgu:'line' })
        + S.t(S.w-18,76,'Deri altı',{a:'end'})
        + S.daire(x-62,143,39,{ dolgu:'basic-soft',renk:'basic' })
        + S.daire(x+59,165,29,{ dolgu:'crit-soft',renk:'crit' })
        + S.cizgi([[x-142,17],[x-62,143]],{ renk:'ink',w:3 })
        + S.daire(x-62,143,4,{ dolgu:'ink' })
        + S.t(x-114,23,'İğne',merkez)
        + S.t(x-62,222,['İnternal','juguler ven'],merkez)
        + S.t(x+59,222,'Karotis',merkez);
    },
  });
})();
