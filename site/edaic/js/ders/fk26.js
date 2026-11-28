(function () {
  'use strict';
  const VIZ = window.VIZ;
  const boyut = { vb: [360, 202], vbDar: [360, 202] };
  const orta = { a: 'middle', c: 'b' };
  const secim = (ad, adlar) => ({
    id: 'secim', ad, liste: adlar.map((etiket, i) => ({ d: String(i), ad: etiket }))
  });
  const nokta = (x, y, ad, metin) => ({ x, y, ad, metin });
  const yuzde = (t) => 100 * Math.pow(0.5, t / 110);

  VIZ.fk26_izotop = (el) => SEKIL.sahne(el, {
    ...boyut, baslik: 'Hidrojen izotoplarında proton, nötron ve elektron',
    secenek: secim('İzotop', ['Hidrojen-1', 'Döteryum', 'Trityum']),
    ciz: (S, t, p) => {
      const n = Number(p.secim);
      const tanecik = (x, y, ad, renk) => S.daire(x, y, 16, { dolgu: renk }) + S.t(x, y + 5, ad, orta);
      return S.daire(180, 91, 73, { renk: 'muted' }) + tanecik(253, 91, 'e⁻', 'clin-soft') +
        tanecik(174, 88, 'p⁺', 'accent-soft') + (n >= 1 ? tanecik(205, 88, 'n', 'basic-soft') : '') +
        (n === 2 ? tanecik(190, 115, 'n', 'basic-soft') : '') +
        S.t(180, 193, '1 proton  ·  ' + n + ' nötron  ·  1 elektron', orta);
    },
    metin: (p) => ['En yaygın izotopun çekirdeğinde yalnız bir proton bulunur. [[K6 s. 412]]',
      'Döteryumda bir nötron vardır ve çekirdek kararlıdır. [[K6 s. 412–413]]',
      'İki nötron taşıyan trityum radyoaktiftir. [[K6 s. 413]]'][p.secim]
  });

  VIZ.fk26_engel = (el) => SEKIL.sahne(el, {
    ...boyut, baslik: 'Alfa, beta ve gama için engeller',
    secenek: secim('Radyasyon', ['Alfa', 'Beta', 'Gama']),
    ciz: (S, t, p) => {
      const engeller = [[90, 4, 'Kâğıt'], [177, 12, 'Alüminyum'], [275, 42, 'Kurşun']];
      const i = Number(p.secim);
      return engeller.map(([x, w, ad]) => S.kutu(x, 55, w, 83, { dolgu: 'basic-soft', r: 1 }) +
        S.t(x + w / 2, 165, ad, orta)).join('') +
        S.ok([[26, 98], [engeller[i][0], 98]], { renk: 'accent', w: 4 }) +
        S.t(26, 78, ['α','β','γ'][i], orta);
    },
    metin: (p) => ['Bir yaprak kâğıt alfa parçacığını durdurabilir. [[K6 s. 413]]',
      'Beta parçacığı için birkaç milimetre kalınlığında alüminyum gerekir. [[K6 s. 413]]',
      'Gama ışınları için kalın kurşun veya beton zırh gerekir. [[K6 s. 413–414]]'][p.secim]
  });

  VIZ.fk26_yari = (el) => SEKIL.grafik(el, {
    baslik: 'Flor-18’in üstel bozunması', vb: [550, 310], vbDar: [360, 290],
    x: { min: 0, max: 330, ad: 'Geçen süre (dk)', adimlar: [0,110,220,330] },
    y: { min: 0, max: 100, ad: 'Kalan (%)', adimlar: [0,25,50,75,100] },
    param: [{ id: 'sure', ad: 'Geçen süre', min: 0, max: 330, deger: 110, adim: 1, birim: 'dk' }],
    egriler: [{ f: yuzde, renk: 'accent' }],
    noktalar: p => [{ x: p.sure, y: yuzde(p.sure) }],
    dikey: p => [{ x: p.sure }], yatay: p => [{ y: yuzde(p.sure) }],
    okuma: p => p.sure + ' dakika sonra başlangıçtaki flor-18 çekirdeklerinin yaklaşık %' +
      yuzde(p.sure).toLocaleString('tr-TR', { maximumFractionDigits: 1 }) + ' kadarı kalır. [[K6 s. 415–416]] [[K6 s. 423]]'
  });

  const zincir = (S, adlar, etkin) => adlar.map((ad, i) => {
    const y = 9 + i * 62;
    return (i ? S.ok([[180,y - 17],[180,y - 2]], { renk:'muted' }) : '') +
      S.kutu(55, y, 250, 43, { yazi: ad, dolgu: i === etkin ? 'accent-soft' : 'paper',
        renk: i === etkin ? 'accent' : 'line' });
  }).join('');

  VIZ.fk26_iyon = (el) => SEKIL.adim(el, {
    ...boyut, baslik: 'Fotonun dokudaki etkileri',
    ortak: (S, i) => zincir(S, ['Elektron kopması','İyon ve kimyasal tepkime','Hücre veya DNA hasarı'], i),
    adimlar: [
      { ad:'Elektron', metin:'X-ışını veya gama fotonu dış kabuktan elektron koparabilir. [[K6 s. 417]]' },
      { ad:'İyon', metin:'Oluşan iyon madde içinde başka kimyasal tepkimeler başlatabilir. [[K6 s. 417]]' },
      { ad:'Hasar', metin:'Kimyasal değişiklikler hücre ölümüne, DNA hasarı ise zararlı mutasyonlara yol açabilir. [[K6 s. 417]]' }
    ]
  });

  VIZ.fk26_tedavi = (el) => SEKIL.sahne(el, {
    ...boyut, baslik: 'Dıştan ışınlamada demetlerin kesişmesi',
    secenek: secim('Işınlama', ['Tek yol', 'Farklı açılar']),
    ciz: (S, t, p) => {
      const yollar = [[[24,100],[335,100]], [[61,32],[298,168]], [[60,168],[298,32]]];
      return S.daire(180,100,76,{ dolgu:'clin-soft',renk:'clin' }) +
        S.daire(180,100,18,{ dolgu:'warn-soft',renk:'warn' }) +
        yollar.slice(0,p.secim === '0' ? 1 : 3).map(yol => S.ok(yol,{renk:'accent',w:3})).join('') +
        S.t(180,195,'Merkezdeki daire: tümör',orta);
    },
    metin: p => p.secim === '0' ? 'Demet hedefe giderken çevredeki dokuyu da ışınlar. [[K6 s. 418]]' :
      'Demet yolları hedefte kesiştiğinde tümörde çevre dokudan daha yüksek doz soğurulur. [[K6 s. 418]]'
  });

  VIZ.fk26_tup = (el) => SEKIL.cizim(el, {
    baslik: 'Röntgen tüpünün kesiti', giris: 'Filamandan başlayarak elektronun hedefini ve X-ışınının çıkış yolunu bulun. [[K6 s. 419]]',
    gorunumler: [{ ad:'Yan kesit', resim:'img/fizik/26-tup.webp', en:1024, boy:525, noktalar:[
      nokta(332,163,'Tungsten filaman','Katot ısındığında vakuma elektron salar. [[K6 s. 419]]'),
      nokta(450,150,'Vakum','Elektronlar vakumda pozitif anoda doğru hızlandırılır. [[K6 s. 419]]'),
      nokta(562,205,'Eğimli anot hedefi','Elektronların çarptığı metal hedefte X-ışınları oluşur. [[K6 s. 419]]'),
      nokta(836,172,'Soğutma bölümü','Elektronların hedefte yavaşlamasıyla açığa çıkan ısı uzaklaştırılmalıdır. [[K6 s. 419]]'),
      nokta(256,305,'Kurşun zırh','Kalın zırh tüpten radyasyon sızmasını sınırlamayı amaçlar. [[K6 s. 419]]'),
      nokta(538,346,'Çıkış penceresi','Zırhtaki küçük açıklık demetin geçmesine izin verir. [[K6 s. 419]]'),
      nokta(550,445,'Filtre dizisi','Dar demet çıkışta bir dizi filtreden geçer. [[K6 s. 419]]')
    ] }]
  });

  VIZ.fk26_spect = (el) => SEKIL.sahne(el, {
    ...boyut, baslik:'SPECT ile göreli perfüzyon',
    secenek:secim('İnceleme',['Beyin','Miyokart']),
    ciz:(S,t,p) => zincir(S, p.secim === '0' ? ['⁹⁹ᵐTc-HMPAO','Beyin dokusunda tutulum','Göreli beyin kan akımı'] :
      ['⁹⁹ᵐTc ile işaretli izleyici','Egzersiz veya ilaçla stres','Bölgesel miyokart perfüzyonu'],2),
    metin:p => p.secim === '0' ? 'Beyinde izleyicinin alınma hızı kan akımıyla orantılıdır. [[K6 s. 421]]' :
      'Stres sonrasındaki dağılım miyokart bölgelerinin göreli kanlanmasını gösterir. [[K6 s. 421]]'
  });

  VIZ.fk26_pet = (el) => SEKIL.sahne(el, {
    ...boyut, baslik:'Yok oluş ve koinsidans devresi',
    secenek:secim('Algılama',['Tek kayıt','Eşzamanlı çift']),
    param:[{id:'yon',ad:'Foton çiftinin yönü', min:0,max:180,adim:1,deger:0,birim:'°'}],
    ciz:(S,t,p) => {
      const a = p.yon * Math.PI / 180;
      const merkez = [180,100];
      let s = S.daire(...merkez,80,{renk:'muted',w:5});
      for (const yon of [-1,1]) {
        const uc = [180 + yon * 80 * Math.cos(a),100 + yon * 80 * Math.sin(a)];
        const kayit = yon === 1 || p.secim === '1';
        s += S.ok([merkez,uc],{renk:'accent'}) + S.daire(...uc,8,{dolgu:kayit ? 'accent' : 'paper'});
      }
      return s + S.daire(...merkez,5,{dolgu:'warn'});
    },
    metin:p => p.secim === '0' ? 'İki foton zıt yönlere gider; yalnız bir dedektör kayıt yaptığında koinsidans oluşmaz. [[K6 s. 422–423]]' :
      'Karşılıklı iki dedektörün eşzamanlı kaydı foton çiftinin ortak kökenini gösterir. [[K6 s. 422]]'
  });

  VIZ.fk26_tarama = (el) => SEKIL.sahne(el, {
    ...boyut, baslik: 'BT’de aynı kesite farklı yönlerden bakış',
    param: [{ id:'aci', ad:'Halkadaki konum', min:0, max:360, adim:1, deger:0, birim:'°' }],
    ciz: (S, t, p) => {
      const aci = p.aci * Math.PI / 180;
      const konum = (r) => [180 + r * Math.sin(aci), 98 - r * Math.cos(aci)];
      const tup = konum(75);
      const alici = konum(-75);
      return S.daire(180,98,75,{renk:'muted'}) + S.daire(180,98,47,{dolgu:'clin-soft',renk:'clin'}) +
        S.daire(163,86,12,{dolgu:'basic-soft',renk:'basic'}) +
        S.ok([tup,alici],{renk:'accent',w:3}) +
        S.daire(...tup,8,{dolgu:'accent'}) +
        S.kutu(alici[0]-9,alici[1]-9,18,18,{dolgu:'basic-soft',renk:'basic',r:1}) +
        S.t(180,194,'Daire: tüp     Kare: dedektör',orta);
    },
    metin: () => 'Tüp döndüğünde karşı dedektör de onunla döner; aynı bölgeden farklı yönlerde geçen demetler kaydedilir. [[K6 s. 423–424]]'
  });

  VIZ.fk26_bt = (el) => SEKIL.cizim(el, {
    baslik:'BT halkasının önden kesiti', giris:'Tüpü bulun, sonra halkanın karşı tarafındaki dedektörü seçin. [[K6 s. 424]]',
    gorunumler:[{ad:'Önden',resim:'img/fizik/26-bt.webp',en:1024,boy:936,noktalar:[
      nokta(511,157,'X-ışını tüpü','Tüp tarama sırasında hasta çevresinde döner. [[K6 s. 424]]'),
      nokta(697,698,'Dedektör','Dedektör tüpün karşısında kalacak biçimde onunla birlikte döner. [[K6 s. 424]]'),
      nokta(509,646,'Hasta masası','Masadaki hasta halkaya göre ilerlerken sürekli spiral tarama elde edilir. [[K6 s. 424]]'),
      nokta(858,460,'Tarayıcı halkası','Tarama sırasında hasta halka açıklığından geçer. [[K6 s. 424]]')
    ]}]
  });
})();
