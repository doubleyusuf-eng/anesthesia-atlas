(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, adlar) => ({ id: 'secim', ad, liste: adlar.map(ad => ({ ad, d: ad })) });
  const ortada = { a: 'middle', c: 'b' };

  // Her basamağı görünür tut; seçilen basamağın klinik karşılığı altta okunur.
  function surec(el, baslik, adimlar) {
    const yukseklik = adimlar.length * 68;
    return SEKIL.adim(el, {
      baslik, vb: [640, yukseklik], vbDar: [360, yukseklik], oto: false,
      adimlar: adimlar.map(([ad, metin]) => ({ ad, metin, ciz: () => '' })),
      ortak: (S, secili) => adimlar.map(([ad], i) => {
        const y = 5 + i * 68, on = i === secili;
        return S.kutu(S.w / 2 - 146, y, 292, 40, { yazi: ad, renk: on ? 'accent' : 'line',
          dolgu: on ? 'accent-soft' : 'paper', w: on ? 3 : 1 })
          + (i < adimlar.length - 1 ? S.ok([ [S.w / 2, y + 42], [S.w / 2, y + 63]], { renk: 'muted' }) : '');
      }).join(''),
    });
  }
  VIZ.fk17_ariza = el => surec(el, 'Arıza yönetimi', [
    ['Kullanımdan çek', 'Arızalı cihaz hemen hizmet dışına alınır. [[K6 s. 291]]'],
    ['Koşulları kaydet ve bildir', 'Arızanın nasıl ortaya çıktığı, ilgili ayrıntılarla birlikte uygun form veya portal üzerinden klinik mühendisliğine bildirilir. [[K6 s. 291]]'],
    ['Onarım kararını ver', 'Cihazın üreticiye iadesi veya elden çıkarılması gerekebilir. [[K6 s. 291]]'],
    ['Geri dönüşü doğrula', 'Yalnız onarılan ve klinik mühendislerince kontrol edilen cihaz yeniden kullanılabilir. [[K6 s. 291]]'],
  ]);

  VIZ.fk17_oksijen = el => SEKIL.sahne(el, {
    baslik: 'Oksijen miktarının izlenmesi ve oksijen kaynağının yedeklenmesi',
    vb: [640, 240], vbDar: [360, 240],
    secenek: secim('Arızalı parça', ['Birinci ölçer', 'Evaporatör']),
    metin: p => p.secim === 'Birinci ölçer'
      ? 'Bağımsız ikinci ölçer, evaporatörde kalan oksijenin izlenmesini sürdürür. [[K6 s. 293]]'
      : 'Evaporatör arızasında ayrı konumdaki tüp manifoldu alternatif oksijen kaynağıdır. [[K6 s. 293]]',
    ciz: (S, t, p) => {
      const kaynakArizali = p.secim === 'Evaporatör';
      const sol = S.w * .25, sag = S.w * .75;
      const kutu = (x, y, ad, renk) => S.kutu(x - 75, y, 150, 40, {yazi:ad, renk, dolgu:renk + '-soft'});
      const bag = (x, y, hedefX, hedefY, renk) => S.ok([[x,y],[hedefX,hedefY]], {renk});
      return kutu(sol, 9, 'Birinci ölçer', kaynakArizali ? 'basic' : 'crit')
        + kutu(sag, 9, 'İkinci ölçer', 'basic')
        + S.cizgi([[sol,52],[sol,66],[sag,66],[sag,52]],{renk:'muted'})
        + S.cizgi([[sol,66],[sol,90]],{renk:'muted'})
        + kutu(sol, 92, 'Evaporatör', kaynakArizali ? 'crit' : 'ok')
        + kutu(sag, 92, 'Tüp manifoldu', kaynakArizali ? 'ok' : 'basic')
        + bag(kaynakArizali ? sag : sol, 136, S.w/2, 176, 'ok')
        + kutu(S.w/2, 181, 'Hastane oksijeni', 'ok');
    },
  });

  const pompa = {
    'Çalışma aralığı': ['İzin verilen akış', 'Pompa yazılımı kullanıcının seçimini yönlendirir ve sınırlayabilir. [[K6 s. 294]]'],
    'Yumuşak sınırı aş': ['Uyarı onayı gerekir', 'Kullanıcı, yumuşak üst sınırı ancak alarm uyarısını bilinçli olarak geçerek aşabilir. [[K6 s. 294]]'],
    'Katı sınırı aş': ['Seçim engellenir', 'Katı sınırı pompanın ilaç kütüphanesine programlanan veri belirler ve daha yüksek akış seçimini engeller. [[K6 s. 294]]'],
  };
  VIZ.fk17_pompa = el => SEKIL.sahne(el, {
    baslik: 'İstenen akış ve izin verilen seçim', vb: [640, 170], vbDar: [360, 170],
    secenek: secim('İstenen akış', Object.keys(pompa)), metin: p => pompa[p.secim][1],
    ciz: (S, t, p) => {
      const i = Object.keys(pompa).indexOf(p.secim), x = v => v * S.w;
      let svg = S.ok([[x(.06), 85], [x(.94), 85]], { renk: 'muted' });
      [[.46, 'Yumuşak', 'warn'], [.77, 'Katı', 'crit']].forEach(([u, ad, renk]) => {
        svg += S.cizgi([[x(u), 57], [x(u), 98]], { renk, w: 3 }) + S.t(x(u), 42, ad, ortada);
      });
      return svg + S.daire(x([.25, .62, .88][i]), 85, 7, { dolgu: 'accent', renk: 'accent' })
        + S.t(S.w / 2, 121, 'İstenen akış →', { a: 'middle' })
        + S.t(S.w / 2, 154, pompa[p.secim][0], ortada);
    },
  });

  const hedefler = {
    'Merkezde, sık': [false, false, 'Ortalama gerçek değere yakın ve saçılma küçüktür. [[K6 s. 295]]'],
    'Merkezde, dağınık': [false, true, 'Ölçümler geniş bir alana yayılsa da ortalama gerçek değere yakın olabilir. [[K6 s. 295]]'],
    'Kaymış, sık': [true, false, 'Ölçümler birbirine yakınken ortalama gerçek değerden uzaktır. [[K6 s. 295]]'],
    'Kaymış, dağınık': [true, true, 'Hem ortalamanın gerçek değerden uzaklığı hem de ölçümlerin saçılması büyüktür. [[K6 s. 295]]'],
  };
  VIZ.fk17_hedef = el => SEKIL.sahne(el, {
    baslik: 'Gerçek değer hedefin merkezidir', vb: [640, 244], vbDar: [360, 244],
    secenek: secim('Atış örüntüsü', Object.keys(hedefler)), metin: p => hedefler[p.secim][2],
    ciz: (S, t, p) => {
      const [kaymis, daginik] = hedefler[p.secim], x = S.w / 2, y = 108;
      const dx = kaymis ? 37 : 0, aralik = daginik ? 31 : 6;
      let svg = [92, 68, 43, 18].map(r => S.daire(x, y, r, { renk: 'line' })).join('');
      svg += S.cizgi([[x - 9,y],[x + 9,y]], { renk: 'ink' }) + S.cizgi([[x,y - 9],[x,y + 9]], { renk: 'ink' });
      for (const [a,b] of [[-1,-.6],[1,.6],[-.6,1],[.6,-1]]) {
        svg += S.daire(x + dx + a * aralik, y + b * aralik, 3.5, { renk: 'accent', dolgu: 'accent' });
      }
      return svg + S.t(x, 229, 'Merkez (+) gerçek değeri gösterir', ortada);
    },
  });

  const kaymalar = {
    'Sıfır': [true, false, 'Aynı girişte iki çizgi arasındaki düşey fark, giriş artsa da sabit kalır. [[K6 s. 296]]'],
    'Duyarlılık': [false, true, 'Kaymış yanıt ile referans arasındaki fark girişle orantılı artar. [[K6 s. 296]]'],
    'Birlikte': [true, true, 'Giriş sıfırken bir fark vardır ve giriş arttıkça bu farka orantılı hata eklenir. [[K6 s. 296]]'],
  };
  VIZ.fk17_kayma = el => SEKIL.sahne(el, {
    baslik: 'Referans ve kaymış yanıt', vb: [640, 254], vbDar: [360, 254],
    secenek: secim('Kayma türü', Object.keys(kaymalar)),
    param: [{id: 'giris', ad: 'Giriş düzeyi (az → çok)', min: 0, max: 1, adim: .01, deger: .5}],
    metin: p => kaymalar[p.secim][2],
    ciz: (S, t, p) => {
      const [sifir, duyarlilik] = kaymalar[p.secim], x = u => 33 + (S.w - 75) * u;
      const referans = u => 206 - 95 * u;
      const yanit = u => referans(u) - (sifir ? 26 : 0) - (duyarlilik ? 40 * u : 0);
      const u = p.giris;
      return S.ok([[33,206],[S.w-15,206]], {renk:'muted'})
        + S.ok([[33,206],[33,26]], {renk:'muted'})
        + S.t(18,18,'Çıkış') + S.t(S.w-20,235,'Giriş', {a:'end'})
        + S.cizgi([[x(0),referans(0)],[x(1),referans(1)]], {renk:'muted',kesik:true})
        + S.cizgi([[x(0),yanit(0)],[x(1),yanit(1)]], {renk:'accent',w:3})
        + S.cizgi([[x(u),referans(u)],[x(u),yanit(u)]], {renk:'clin',w:3})
        + S.daire(x(u),referans(u),4,{renk:'muted'}) + S.daire(x(u),yanit(u),4,{renk:'accent',dolgu:'accent'});
    },
  });

  const temas = {
    'Sağlam deri': ['Kritik olmayan', 'Temizlik', 'Gerekirse düşük düzey dezenfeksiyon', 'Sağlam deriyle temas eden malzemede temizlik asgaridir, düşük düzey dezenfeksiyon da gerekebilir. [[K6 s. 297]]'],
    'Mukoza': ['Yarı kritik', 'Temizlik + yüksek düzey dezenfeksiyon', 'Gerekirse sterilizasyon', 'Mukozaya değen endoskopta temizlikten sonra yüksek düzey dezenfeksiyon gerekir, sterilizasyon da gerekebilir. [[K6 s. 297]]'],
    'Steril boşluk': ['Kritik', 'Temizlik + sterilizasyon', '', 'Steril vücut boşluğuna giren alet temizlenir ve ardından steril edilir. [[K6 s. 297]]'],
  };
  VIZ.fk17_temas = el => SEKIL.sahne(el, {
    baslik: 'Temasa göre asgari işlem', vb: [640, 180], vbDar: [360, 180],
    secenek: secim('Temas', Object.keys(temas)), metin: p => temas[p.secim][3],
    ciz: (S, t, p) => {
      const [sinif, islem, ek] = temas[p.secim];
      const satir = p.secim === 'Mukoza' ? ['Temizlik + yüksek düzey', 'dezenfeksiyon'] : islem;
      return S.t(S.w/2,26,sinif,ortada) + S.ok([ [S.w/2,37],[S.w/2,61]],{renk:'accent'})
        + S.kutu(10,67,S.w-20,54,{yazi:satir,renk:'accent',dolgu:'accent-soft'})
        + (ek ? S.t(S.w/2,155,ek,{a:'middle',c:'k'}) : '');
    },
  });

  VIZ.fk17_otoklav = el => SEKIL.cizim(el, {
    baslik: 'Kapalı buhar sterilizatörünün kesiti',
    giris: 'Otoklavda su kapalı bir sistem içinde kaynar. [[K6 s. 298]]',
    gorunumler: [{ ad:'Yan kesit', resim:'img/fizik/17-otoklav.webp', en:1024, boy:683, noktalar:[
      { x:350,y:532,ad:'Kaynayan su',metin:'Kapalı haznedeki su kaynayarak buhar oluşturur. [[K6 s. 298]]' },
      { x:465,y:202,ad:'Basınçlı buhar',metin:'Buhar sıcaklığı yaklaşık 137 °C’dir. [[K6 s. 298]]' },
      { x:686,y:105,ad:'Kapalı hazne',metin:'Su yaklaşık 35 psi (241 kPa) basınçta kapalı sistemde kaynar. [[K6 s. 298]]' },
    ]}],
  });

  const etiket = {
    'Tek hasta': ['Aynı hasta', 'Birden çok işlem', 'Tek hasta için çoklu kullanım işareti, cihazın aynı hastada birden çok işlemde kullanılabileceğini belirtir. [[K6 s. 300]]'],
    'Tekrar kullanma': ['Bir kullanım', 'Tek işlem', 'Tek kullanımlık cihaz bir kez ya da tek hastada tek işlem boyunca kullanılmak üzere tasarlanmıştır. [[K6 s. 300]]'],
    'Steril': ['Uygulanan işlem', 'Sterilizasyon', 'Steril işareti cihazın bir sterilizasyon işleminden geçtiğini bildirir. [[K6 s. 300]]'],
    'Son kullanma': ['Ambalajdaki tarih', 'Sonrasında kullanma', 'Son kullanma tarihi geçtikten sonra cihaz kullanılmaz. [[K6 s. 300]]'],
  };
  VIZ.fk17_ambalaj = el => SEKIL.sahne(el, {
    baslik:'MHRA ambalaj ifadelerinin anlamı', vb:[640,145], vbDar:[360,145],
    secenek:secim('Ambalaj ifadesi',Object.keys(etiket)), metin:p=>etiket[p.secim][2],
    ciz:(S,t,p)=>{
      const [konu, sonuc] = etiket[p.secim];
      return S.kutu(S.w/2-130,8,260,40,{yazi:konu}) + S.ok([ [S.w/2,52],[S.w/2,79]],{renk:'accent'})
        + S.kutu(S.w/2-130,85,260,44,{yazi:sonuc,renk:'accent',dolgu:'accent-soft'});
    },
  });
})();
