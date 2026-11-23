(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, liste) => ({id: 'tur', ad, liste: liste.map(([d, etiket]) => ({d, ad: etiket}))});

  VIZ.a03b_denge = el => SEKIL.sahne(el, {
    baslik: 'Serbest ligand ve reseptör ile bağlı kompleks arasında iki yönlü geçiş',
    vb: [600, 190], vbDar: [360, 190],
    secenek: secim('İncelenen hız', [['ileri','Birleşme'], ['geri','Ayrışma'], ['denge','Denge']]),
    ciz(S, t, {tur}) {
      const x = S.w / 2;
      const okSol = x - 36, okSag = x + 36;
      const hiz = {ileri:'V₁ = k₁ × [L] × [R]', geri:'V₂ = k₂ × [LR]', denge:'V₁ = V₂'};
      return S.kutu(8,45,okSol-20,66,{yazi:['Serbest','L + R'], dolgu:'basic-soft'}) +
        S.kutu(okSag+12,45,okSol-20,66,{yazi:['Bağlı','LR'], dolgu:'clin-soft'}) +
        S.ok([[okSol,68],[okSag,68]],{renk:'basic',soluk:tur==='geri'}) +
        S.ok([[okSag,89],[okSol,89]],{renk:'clin',soluk:tur==='ileri'}) +
        S.t(x,156,hiz[tur],{a:'middle',c:'b'});
    },
    metin: ({tur}) => ({
      ileri: 'Serbest ligand ve serbest reseptör birlikte birleşme hızını belirler. [[K3 s. 32–33]]',
      geri: 'Ayrışma hızı bağlı kompleksin konsantrasyonuyla orantılıdır. [[K3 s. 33]]',
      denge: 'Her iki ok da aktiftir. [[K3 s. 33]] Birim zamanda oluşan kompleks kadar kompleks ayrışır. [[K3 s. 33]]'
    })[tur]
  });

  // Bağıl koordinatlar yalnız çizimin biçimini belirler. Klinik doz ölçeği yoktur.
  function dozEgrisi(S, yatay, temel, karsilastirma) {
    const sol = 30, sag = S.w - 20, ust = 46, alt = S.h - 46;
    function iz(f, renk, kesik) {
      const noktalar = Array.from({length: 121}, (_, i) => {
        const u = i / 120;
        return [sol + u * (sag - sol), alt - f(u) * (alt - ust)];
      });
      return S.cizgi(noktalar, {renk, kesik, w: 3});
    }
    return S.t(sol,25,'Yanıt',{c:'b'}) +
      S.cizgi([[sol,ust-8],[sol,alt],[sag,alt]],{renk:'muted'}) +
      S.t((sol+sag)/2,alt+30,yatay,{a:'middle',c:'b'}) +
      iz(temel,'basic',false) + (karsilastirma ? iz(karsilastirma,'clin',true) : '');
  }
  const doz = u => Math.exp(14 * (u - 0.42));
  const yanit = (d, k = 1) => d / (k + d);
  const referans = u => yanit(doz(u));

  VIZ.a03b_agonist = el => SEKIL.sahne(el, {
    baslik: 'Doz ölçeği, potens, parsiyel agonist ve karışım karşılaştırması',
    vb: [600,280], vbDar: [360,245],
    secenek: secim('Eğri seçimi', [['dogru','Doz'],['log','Log(doz)'],['potens','A ve B'],['kismi','A ve C'],['karisim','A ve karışım']]),
    ciz(S, t, {tur}) {
      if (tur === 'dogru') return dozEgrisi(S,'A dozu',u => yanit(u * 25));
      const egri = {
        potens: u => yanit(doz(u),5),
        kismi: u => 0.42 * referans(u),
        karisim: u => (doz(u) + 0.42 * 5) / (1 + doz(u) + 5)
      };
      const eksen = tur === 'kismi' || tur === 'potens' ? 'Log(agonist dozu)' : 'Log(A dozu)';
      return dozEgrisi(S,eksen,referans,egri[tur]);
    },
    metin: ({tur}) => ({
      dogru: 'Düz doz ekseninde tam agonistin eğrisi hiperboliktir. [[K3 s. 35]]',
      log: 'Aynı ilişkiyi logaritmik doz ekseninde okuyunca sigmoid eğri ortaya çıkar. [[K3 s. 35]]',
      potens: 'B de tam agonisttir. [[K3 s. 35]] Kesikli eğride aynı yanıt için daha yüksek doz gerekir, dolayısıyla B’nin potensi A’dan düşüktür. [[K3 s. 35]]',
      kismi: 'C’nin eğrisi daha alçakta düzleşir. [[K3 s. 34–35]] Parsiyel agonistin dozu artsa da tam agonistin tavanına ulaşılamaz. [[K3 s. 34–35]]',
      karisim: 'Kesikli eğri, sabit bir submaksimal C dozu varken A’nın yanıtıdır. [[K3 s. 36]] Kesişmenin solunda C ek yanıt sağlar, sağında ise A ile yarışması belirginleşir. [[K3 s. 34–36]]'
    })[tur]
  });

  VIZ.a03b_blok = el => SEKIL.sahne(el, {
    baslik:'Kompetitif ve klasik nonkompetitif blokta log(doz)–yanıt ilişkisi',
    vb:[600,280], vbDar:[360,245],
    secenek:secim('Geri dönüşümlü blok', [['yaris','Kompetitif'],['diger','Nonkompetitif']]),
    ciz(S,t,{tur}) {
      const karsilastirma = tur === 'yaris' ? u => yanit(doz(u),7) : u => 0.52 * referans(u);
      return dozEgrisi(S,'Log(agonist dozu)',referans,karsilastirma);
    },
    metin: ({tur}) => tur === 'yaris'
      ? 'Aynı yanıt düzeyinden yatay ilerleyin. Kesikli eğriye daha sağda ulaşırsınız, ancak paralel kaymaya rağmen maksimum yanıt korunur. [[K3 s. 36–37]]'
      : 'Klasik modelde sağa kayma yoktur. [[K3 s. 36]] Antagonist varken erişilebilen maksimum, başlangıçtaki maksimumun bir kesridir. [[K3 s. 36]]'
  });

  VIZ.a03b_yedek = el => SEKIL.sahne(el, {
    baslik:'Geri dönüşümsüz işgal arttıkça asetilkolin yanıtı',
    vb:[600,280], vbDar:[360,245],
    secenek:secim('Geri dönüşümsüz işgal', [['az','Az blok'],['artan','Artan blok'],['tukenmis','Dörtte üçten fazla']]),
    ciz(S,t,{tur}) {
      const egri = {
        az: u => yanit(doz(u),3),
        artan: u => yanit(doz(u),8),
        tukenmis: u => 0.55 * yanit(doz(u),12)
      };
      return dozEgrisi(S,'Log(ACh dozu)',referans,egri[tur]);
    },
    metin: ({tur}) => ({
      az:'Az sayıda reseptör devre dışı kalınca eğri sağa kayar, fakat maksimum korunur. [[K3 s. 38]]',
      artan:'Daha çok reseptör bloke olunca eğri daha da sağa kayar. [[K3 s. 38]] Yedek sürdükçe yeterli ACh ile eski maksimuma erişilebilir. [[K3 s. 38]]',
      tukenmis:'İşgal dörtte üçü geçince kesikli eğrinin hem tavanı hem eğimi azalır. [[K3 s. 38]]'
    })[tur]
  });

  const tekrar = {
    efedrin: {yol:['Tekrarlanan efedrin','Noradrenalin depoları azalır','Hızlı yanıt kaybı'],
      metin:'Yeni noradrenalin sentezi depo kaybını karşılayamaz, bu yüzden efedrinin her tekrarı daha az yanıt oluşturur. [[K3 s. 38]]'},
    kalp: {yol:['Sürekli adrenalin veya dobutamin','Yüzeyde β-reseptör kaybı','Miyokard yanıtında azalma'],
      metin:'Miyokard hücrelerinin yüzeyindeki β-adrenerjik reseptörlerin kaybı desensitizasyona örnektir. [[K3 s. 39]]'},
    opioid: {yol:['Kronik opioid kullanımı','Yoğunluk veya afinite azalabilir','Aynı etki için gereken doz artar'],
      metin:'Merkezi opioid yanıtının değişmesi reseptör yoğunluğunda veya afinitesinde azalmayla açıklanabilir. [[K3 s. 39]]'},
    nitrat: {yol:['Kesintisiz nitrat infüzyonu','Sülfhidril gruplarının tükenmesi','Damar düz kasında tolerans'],
      metin:'İnfüzyona birkaç saat ara verilmesi sülfhidril gruplarının yenilenmesine olanak tanır. [[K3 s. 39]]'}
  };
  VIZ.a03b_tekrar = el => SEKIL.sahne(el, {
    baslik:'İlaca göre yanıt kaybının mekanizması',
    vb:[600,235], vbDar:[360,235],
    secenek:secim('İlaç seçimi',[['efedrin','Efedrin'],['kalp','Katekolaminler'],['opioid','Opioid'],['nitrat','Nitrat']]),
    metin:({tur}) => tekrar[tur].metin,
    ciz(S,t,{tur}) {
      const genislik = Math.min(S.w-16,410), orta = S.w/2;
      return tekrar[tur].yol.map((ad,i) => {
        const y = 8 + i*78;
        const ok = i ? S.ok([[orta,y-23],[orta,y-3]],{renk:'muted'}) : '';
        return ok + S.kutu(orta-genislik/2,y,genislik,50,{yazi:ad, dolgu:['basic-soft','paper','clin-soft'][i]});
      }).join('');
    }
  });
})();
