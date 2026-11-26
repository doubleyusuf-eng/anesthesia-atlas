(() => {
  'use strict';
  const VIZ = window.VIZ;
  const nokta = (x, y, ad, metin) => ({ x, y, ad, metin });
  VIZ.an03b_kemik = el => SEKIL.cizim(el, {
    baslik: 'Sakrumun kemik işaretleri',
    giris: 'Bir görünüm ve bir kemik işareti seçin.',
    gorunumler: [
      { ad: 'Önden', resim: 'img/anatomi/03b-on.webp', en: 1024, boy: 1024, noktalar: [
        nokta(503, 194, 'Promontoryum', 'Tabandaki oval gövdenin öne taşan kenarıdır. [[K5 s. 123]]'),
        nokta(178, 121, 'Ala', 'Lateral kitlenin üst yüzüdür, lumbosakral kordon burada oluk bırakır. [[K5 s. 123]]'),
        nokta(490, 522, 'Transvers çizgi', 'Bu dört çizgi komşu sakral gövdelerin birleşme yerlerini gösterir. [[K5 s. 120]]'),
        nokta(677, 349, 'Ön sakral foramen', 'Üst dört sakral sinirin ön primer dalları bu çift deliklerden çıkar. [[K5 s. 120]]'),
        nokta(827, 501, 'Sinir oluğu', 'Ön dal foramenden çıktıktan sonra lateral kitle üzerinde bir oluk bırakır. [[K5 s. 120]]'),
        nokta(871, 412, 'Lateral kitle', 'Ön foramen sırasının dışındaki bu kitle aşağıya doğru daralır. [[K5 s. 120]]'),
      ] },
      { ad: 'Arkadan', resim: 'img/anatomi/03b-arka.webp', en: 1024, boy: 1024, noktalar: [
        nokta(697, 55, 'Üst eklem faseti', 'L5’in alt fasetini karşılayan eklem yüzü arkaya ve içe bakar. [[K5 s. 123]]'),
        nokta(510, 405, 'Orta krest', 'Kaynaşmış spinöz çıkıntılar burada küçük tüberküller halinde seçilir. [[K5 s. 120]]'),
        nokta(451, 505, 'Kaynaşmış laminalar', 'Orta krestin iki yanındaki laminalar sakral kanalın kemik tavanına katılır. [[K5 s. 120]]'),
        nokta(614, 445, 'Eklem kresti', 'Kaynaşmış eklem fasetlerinin tüberküllerini taşıyan krest aşağıda boynuzda biter. [[K5 s. 120]]'),
        nokta(693, 476, 'S2 arka forameni', 'İkinci arka foramen arka üst iliak çıkıntının yaklaşık 1 cm altında ve medialindedir. [[K5 s. 122]]'),
        nokta(809, 470, 'Lateral krest', 'Transvers çıkıntıların uçları arka foramenlerin dışındaki tüberkülleri oluşturur. [[K5 s. 122]]'),
        nokta(506, 902, 'Sakral hiatus', 'Eksik laminalar nedeniyle kanalın alt arka yüzünde üçgen bir açıklık kalır. [[K5 s. 123]]'),
        nokta(578, 947, 'Sakral boynuz', 'İki boynuzun arasındaki çöküntü hiatusun palpasyonuna kılavuzluk eder. [[K5 s. 123–124]]'),
      ] },
    ],
  });

  const ortali = { a: 'middle', c: 'k' };
  VIZ.an03b_kaudal = el => SEKIL.adim(el, {
    baslik: 'Kaudal yolun yüzey işaretleri ve iğne yönü, şematik', vb: [360, 220], oto: false,
    adimlar: [
      { ad: 'Yüzey', metin: 'Yan veya yüzüstü konumda iki arka üst iliak çıkıntı ile hiatus yaklaşık eşkenar bir üçgenin köşelerine düşer. [[K5 s. 123]]',
        ciz: S => S.cizgi([[105,60],[255,60],[180,190],[105,60]], { kesik: true })
          + S.daire(105,60,6,{dolgu:'basic'}) + S.daire(255,60,6,{dolgu:'basic'})
          + S.daire(180,190,6,{dolgu:'accent'}) + S.t(180,32,'Arka üst iliak çıkıntılar',ortali)
          + S.t(180,217,'Hiatus',ortali) },
      { ad: 'Bağı geçiş', metin: 'Kitaptaki tarifte sıklıkla 21 G hipodermik iğne kullanılır ve arka sakrokoksigeal bağa deriye yaklaşık 45° açıyla yaklaşılır. [[K5 s. 124]]',
        ciz: S => igne(S,false) },
      { ad: 'Kanala yöneliş', metin: 'Bağ geçilince göbek alçaltılır, iğne deriye daha paralel hale gelir ve sakral kanal içinde başa doğru ilerletilebilir. [[K5 s. 124]]',
        ciz: S => igne(S,true) },
      { ad: 'Dural kese', metin: 'Dural kese S2’de biter, filum terminalenin yer aldığı ekstradural aralık ise aşağıda hiatustan erişilebilir durumdadır. [[K5 s. 123–124]]',
        ciz: S => S.kutu(35,14,78,185,{dolgu:'basic-soft'})
          + S.kutu(56,15,36,78,{dolgu:'clin-soft',renk:'clin'})
          + S.cizgi([[75,94],[75,172]],{renk:'basic'})
          + S.cizgi([[92,92],[133,92]],{renk:'clin'})
          + S.t(139,97,'S2 · Dural kese sonu',{c:'k'})
          + S.cizgi([[76,137],[133,137]],{renk:'basic'})
          + S.t(139,142,'Filum terminale',{c:'k'})
          + S.ok([[141,188],[108,181],[85,167]],{renk:'accent'})
          + S.t(148,193,'Hiatustan giriş',{c:'k'}) },
    ],
  });
  function igne(S, kanalda) {
    return S.t(12,23,'Kaudal', {c:'k'}) + S.t(348,23,'Kraniyal',{a:'end',c:'k'})
      + S.cizgi([[15,105],[345,105]],{renk:'ink'})
      + S.cizgi([[105,135],[215,135]],{renk:'clin',w:6})
      + S.cizgi([[215,135],[345,135]],{renk:'muted',w:9})
      + S.cizgi([[70,187],[345,187]],{renk:'muted',w:9})
      + S.t(271,173,'Sakral kanal',ortali) + S.t(49,99,'Deri',ortali)
      + S.t(95,158,'Arka bağ',ortali)
      + S.ok(kanalda ? [[48,97],[235,153]] : [[86,58],[169,141]],{renk:'accent',w:4})
      + (kanalda ? '' : S.t(176,92,'≈45°',ortali));
  }

  VIZ.an03b_defekt = el => SEKIL.adim(el, {
    baslik: 'Nöral ark defektinde değişen dokular, şematik kesit', vb: [360, 195], oto: false,
    adimlar: [
      ['Occulta','Yalnız ark kapanmamıştır, meninksler ve sinir dokusu normaldir. [[K5 s. 125]]'],
      ['Meningosel','Meninksler arka kemik açıklığından kese halinde çıkar, sinir dokusu keseye girmez. [[K5 s. 125]]'],
      ['Miyelomeningosel','Omurilik veya kökler meningeal kesenin içine uzanır ve duvarına yapışık olabilir. [[K5 s. 125]]'],
      ['Miyelosel','Nöral tüp kapanmayınca defektte kırmızı, granüler bir açık plak görülür ve merkezinden BOS sızar. [[K5 s. 125]] Kitap bu raşişizis biçimini yaşamla bağdaşmaz olarak tanımlar. [[K5 s. 125]]'],
    ].map(([ad,metin]) => ({ad,metin})),
    ortak: (S,i) => {
      const kese = i === 1 || i === 2;
      const zar = kese ? [[148,128],[163,91],[159,63],[164,41],[182,33],[200,41],[205,62],[197,91],[211,128]]
        : [[148,128],[150,112],[164,101],[185,98],[202,107],[211,128]];
      return S.t(12,23,'Arka', {c:'k'})
        + S.cizgi([[84,161],[96,116],[149,87]],{renk:'muted',w:10})
        + S.cizgi([[211,87],[264,116],[276,161]],{renk:'muted',w:10})
        + (i < 3 ? S.cizgi(zar,{renk:'clin',w:4}) : '')
        + (i === 3 ? S.cizgi([[155,89],[165,96],[175,89],[182,97],[193,88],[205,94]],{renk:'crit',w:8})
          : S.daire(180,i === 2 ? 65 : 125,10,{renk:'basic',dolgu:'basic-soft'}))
        + S.t(180,186,i === 3 ? 'Açık nöral plak' : ['Kese yok','Kesede yalnız meninks','Kesede sinir dokusu'][i],ortali);
    },
  });

  VIZ.an03b_gecis = el => SEKIL.adim(el, {
    baslik: 'L5 ve S1 arasında segment sınırları, şematik', vb:[360,185], oto:false,
    adimlar: [
      { ad:'Sakralizasyon', metin:'L5 kısmen veya tamamen sakrumla kaynaşabilir, burada tam kaynaşma gösterilir. [[K5 s. 125]]' },
      { ad:'Lomberizasyon', metin:'S1 sakrumun geri kalanından kısmen veya tamamen ayrılabilir, burada tam ayrılık gösterilir. [[K5 s. 125]]' },
    ],
    ortak: (S,i) => {
      const blok = (y,h) => S.kutu(72,y,216,h,{dolgu:'basic-soft',renk:'basic'});
      return (i === 0 ? blok(8,160) : blok(8,40) + blok(64,40) + blok(120,48))
        + S.t(180,36,'L5',ortali) + S.t(180,89,'S1',ortali)
        + S.t(180,150,'Sakrumun geri kalanı',ortali);
    },
  });

  // Her seçimde bağ ortada, iki tutunma noktası üstte ve altta okunur.
  function bagHaritasi(el, baslik, baglar) {
    return SEKIL.adim(el, {
      baslik, vb:[360,185], oto:false,
      adimlar: baglar.map(([ad,ust,alt,metin]) => ({
        ad, metin, ciz: S => S.cizgi([[180,39],[180,147]],{renk:'accent',w:4})
          + S.kutu(18,8,324,40,{yazi:ust,dolgu:'paper'})
          + S.kutu(45,70,270,40,{yazi:ad,dolgu:'accent-soft'})
          + S.kutu(18,137,324,40,{yazi:alt,dolgu:'paper'}),
      })),
    });
  }
  VIZ.an03b_baglar = el => bagHaritasi(el,'Omurga bağlarının tutunma haritası',[
    ['Supraspinöz','Spinöz çıkıntı ucu','Komşu spinöz çıkıntı ucu','Güçlü fibröz bağ C7’den sakruma kadar spinöz çıkıntıların uçlarını birleştirir. [[K5 s. 128]]'],
    ['İnterspinöz','Spinöz çıkıntı gövdesi','Komşu spinöz çıkıntı gövdesi','İnterspinöz bağlar komşu çıkıntıların gövdeleri arasında uzanır ve özellikle boyunda ince, narindir. [[K5 s. 128]]'],
    ['Sarı bağ','Lamina','Komşu lamina','Ligamenta flava komşu laminaları dikey elastik liflerle birleştirir. [[K5 s. 128]]'],
    ['Ön longitudinal','Gövdenin ön kenarı','Diskin ön yüzü ve komşu kenar','C2’den üst sakruma uzanan bağ aşağıya doğru genişler, disklerin ön yüzlerine ve komşu gövde kenarlarına yapışır. [[K5 s. 128]]'],
    ['Arka longitudinal','Gövdenin arka kenarı','Diskin arka yüzü ve komşu kenar','Gövde arkasındaki bağın disk ve gövde kenarlarındaki tutunmaları, ön longitudinal bağın tutunmalarına karşılık gelir. [[K5 s. 128]]'],
  ]);
  VIZ.an03b_dens = el => bagHaritasi(el,'Dens çevresinde bağların tutunma haritası',[
    ['Transvers','Atlasın bir lateral kitlesi','Karşı lateral kitle','Medial yüzler arasında uzanan transvers bağ densi atlasın ön arkının arka fasetine bastırır. [[K5 s. 130]]'],
    ['Çapraz','Oksiput','Aksis gövdesi','Transvers bağdan yukarı ve aşağı ayrılan zayıf longitudinal demetler transvers bölümle birlikte çapraz bağı oluşturur. [[K5 s. 130]]'],
    ['Alar','Dens tepesinin yanı','Oksipital kondilin medial yüzü','İki kısa, güçlü alar bağ kafatasının aşırı dönmesini sınırlar. [[K5 s. 130]]'],
    ['Aksesuar alar','Aksis gövdesi','Atlasın lateral kitlesi','Her yanda aksis gövdesinden atlasın lateral kitlesine bir aksesuar alar bağ uzanır. [[K5 s. 130]]'],
    ['Apikal','Densin ucu','Foramen magnumun ön kenarı','İnce apikal demet embriyonik notokordun kraniyal uzantısından kalır. [[K5 s. 130]]'],
  ]);
})();
