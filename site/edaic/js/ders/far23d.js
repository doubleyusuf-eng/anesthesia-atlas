/* Direnç, antiviraller ve antifungaller · K3, Türkçe çalışma çevirisi, s. 359–370. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, adlar) => ({
    id: 'secili', ad, liste: adlar.map(d => ({ d, ad: d })),
  });

  function zincir(baslik, adimlar, h) {
    return {
      baslik, vb: [640, h], vbDar: [360, h], oto: false, adimlar,
      ortak: (S, secili) => adimlar.map(({ satir, darSatir }, i) => {
        const y = 8 + i * 78, etkin = secili === i, orta = S.w / 2;
        const bag = i ? S.ok([[orta, y - 18], [orta, y - 4]], { renk: 'muted' }) : '';
        return bag + S.kutu(S.w * 0.05, y, S.w * 0.9, 56, {
          yazi: (S.dar && darSatir) ? darSatir : satir, yc: etkin ? 'b' : 'normal', lh: 20, w: etkin ? 3 : 1,
          renk: etkin ? 'accent' : 'line', dolgu: etkin ? 'accent-soft' : 'paper',
        });
      }).join(''),
    };
  }

  VIZ.a23d_direnc = (el) => SEKIL.adim(el, zincir('Antibiyotik direncinin dört genel mekanizması', [
    {
      ad: 'Modifikasyon',
      satir: ['Antimikrobiyal molekülün kimyasal modifikasyonu', 'Aminoglikozid modifiye edici enzimler · Rifampisin glikozilasyonu'],
      darSatir: ['Molekülün modifikasyonu', 'Aminoglikozid enzimi · Rif. glik.'],
      metin: 'Bazı bakteriler antibiyotiği değiştirerek aktivitesini azaltır: aminoglikozidler modifiye edici enzimlerle değişir, rifampisin glikozilasyonla inaktive edilebilir. [[K3 s. 359]]',
    },
    {
      ad: 'Yıkım',
      satir: ['Amid bağının yıkımı (β-laktam direncinin başlıca yolu)', 'ESBL (K. pneumoniae, E. coli) · Karbapenemaz üreten CPE'],
      darSatir: ['β-laktamaz ile yıkım', 'ESBL (E. coli, Klebs.) · CPE'],
      metin: 'β-laktamazlar β-laktam halkası içindeki amid bağını parçalar; ESBL üreten Gram-negatifler ve karbapenemaz üreten Enterobacteriaceae (CPE) önemli klinik sorundur. [[K3 s. 359]]',
    },
    {
      ad: 'Giriş ↓ / Efluks',
      satir: ['G− dış membranda porin azalması (Pseudomonas karbapenem direnci)', 'Efluks pompaları (tetrasiklin ve florokinolon direncinde yaygın)'],
      darSatir: ['Porin ↓ / Efluks pompası', 'Pseudomonas porin · Tetr./kinolon'],
      metin: 'İlacın hücre içi hedefine ulaşması porin azalmasıyla penetrasyonu düşürerek veya efluks pompasıyla aktif dışarı atılarak önlenebilir. [[K3 s. 359]]',
    },
    {
      ad: 'Hedef Değişimi',
      satir: ['Peptidoglikan öncüllerinin afiniteyi azaltacak şekilde değişmesi (VRE)', 'Ribozom alt birimi modifikasyonu → makrolid, tetrasiklin, aminoglikozid'],
      darSatir: ['Hedef bölge değişikliği', 'VRE peptidoglikan · Ribozom mod.'],
      metin: 'Vankomisine dirençli enterokoklarda peptidoglikan öncülleri değişir; ribozom alt birimlerinin modifikasyonu ise makrolid, tetrasiklin ve aminoglikozidlere direnç sağlar. [[K3 s. 359]]',
    },
  ], 316));

  VIZ.a23d_viral = (el) => SEKIL.adim(el, zincir('Viral replikasyon döngüsünde beş antiviral hedef (a–e)', [
    {
      ad: 'a) Tutunma',
      satir: ['a) Konak hücreye tutunma ve girişin engellenmesi', 'Örnek: HIV için enfuvirtid'],
      darSatir: ['a) Tutunma ve giriş', 'Örnek: HIV için enfuvirtid'],
      metin: 'Virüsler zorunlu hücre içi parazit olduğundan antiviraller virüsün kendisinden ziyade replikasyon basamaklarını hedefleyip virüs yükünü azaltır. [[K3 s. 360–361]]',
    },
    {
      ad: 'b) Soyunma',
      satir: ['b) Viral kılıftan sıyrılma ve nükleik asit serbestleşmesi', 'Örnek: amantadin'],
      darSatir: ['b) Soyunma & serbestleşme', 'Örnek: amantadin'],
      metin: 'Amantadin viral soyunma ve nükleik asidin konak hücre içine salınması basamağını etkiler. [[K3 s. 361]]',
    },
    {
      ad: 'c) Replikasyon',
      satir: ['c) Viral genom replikasyonunun inhibisyonu', 'NRTI · NNRTI · İntegraz inhibitörleri · DNA polimeraz inhibitörleri'],
      darSatir: ['c) Genom replikasyonu', 'NRTI · NNRTI · İntegraz · DNA pol.'],
      metin: 'Ters transkriptaz, integraz ve DNA polimeraz inhibitörleri viral genomun çoğaltılmasını ve konak DNA’sına entegrasyonunu durdurur. [[K3 s. 361]]',
    },
    {
      ad: 'd) Protein & Montaj',
      satir: ['d) Protein sentezi ve viral bileşenlerin birleştirilmesi', 'İnterferon alfa (transkripsiyon/translasyon) · Proteaz inhibitörleri'],
      darSatir: ['d) Protein & birleştirme', 'İnterferon alfa · Proteaz inh.'],
      metin: 'İnterferon alfa protein sentezini bozarken proteaz inhibitörleri proteaz enzimleriyle protein işlenmesini bozar. [[K3 s. 362]]',
    },
    {
      ad: 'e) Tomurcuklanma',
      satir: ['e) Yeni virüsün konak hücreden salınması (tomurcuklanma)', 'Nöraminidaz inhibitörleri (zanamivir, oseltamivir)'],
      darSatir: ['e) Tomurcuklanma (salınım)', 'Nöraminidaz inh. (zan./oselt.)'],
      metin: 'Nöraminidaz inhibitörleri yeni oluşan virüs partiküllerinin enfekte hücreden salınmasını azaltır. [[K3 s. 362–363]]',
    },
  ], 394));

  const herpesVeri = {
    Asiklovir: {
      renk: 'basic',
      k1: S => S.dar
        ? ['HSV I/II, VZV, EBV (CMV etkisiz)', 'Viral timidin kinaz → trifosfat inh.', 'Eradike etmez · Erken başlangıç şart']
        : ['HSV I/II, VZV, EBV · Viral timidin kinaz → DNA pol. inh.', 'CMV timidin kinaz kodlamaz (etkisiz) · Erken başlanırsa etkili'],
      k2: S => S.dar
        ? ['Oral %15–30 · İdrarla değişmeden', 'Dehidratasyon/BY + hızlı İV: ABY', 'Viral ensefalitte erken 10 mg/kg']
        : ['Oral %15–30 (valasiklovir ön ilaç ↑) · İdrarla değişmeden atılır', 'Hızlı İV/BY: ABY ve nörotoksisite · Ensefalitte erken 10 mg/kg'],
      metin: 'Asiklovir yalnızca viral timidin kinaz içeren HSV/VZV enfekte hücrelerde aktive olur; CMV’de etkisizdir ve viral ensefalitte erken 10 mg/kg sonuçları iyileştirebilir. [[K3 s. 362]]',
    },
    'Gansiklovir & Foskarnet': {
      renk: 'crit',
      k1: S => S.dar
        ? ['Gansiklovir/valgansiklovir: CMV', 'CMV viral kinazıyla enfektede 10×', 'İdrarla atılım · BY’de doz ayarı']
        : ['Gansiklovir: CMV (viral kinazla enfekte hücrede 10× trifosfat)', 'Oral düşük → valgansiklovir iyileştirir · BY’de doz ayarlaması'],
      k2: S => S.dar
        ? ['Asiklovirden toksik (Kİ / renal)', 'Foskarnet: kinaz gerektirmez (CMV)', 'Polimeraz/RT inh. · ABY yapabilir']
        : ['Asiklovirden toksik (kemik iliği baskılanması & renal toksisite)', 'Foskarnet: viral kinazsız polimeraz/RT inh., belirgin toksisite, BY'],
      metin: 'Gansiklovir CMV kinazıyla aktive olup kemik iliği baskılanması yapabilir; foskarnet ise viral kinaz gerektirmez ancak belirgin toksisitesi vardır ve böbrek yetmezliğine neden olabilir. [[K3 s. 363]]',
    },
    'Zanamivir & Oseltamivir': {
      renk: 'ok',
      k1: S => S.dar
        ? ['Nöraminidaz inh. (tomurcuklanma ↓)', 'İnfluenza A ve B belirti süresini ↓', 'Zanamivir inhalasyon · Oselt. oral']
        : ['Nöraminidaz inhibitörleri: enfekte hücreden viral salınımı azaltır', 'İnfluenza A ve B: oseltamivir (oral), zanamivir (inhalasyon)'],
      k2: S => S.dar
        ? ['Yüksek riskte temas sonrası prof.', 'Tedavi: ilk 48 saatte başlanmalı', 'Gastrointestinal yan etkiler sık']
        : ['Yüksek riskli kişilerde maruziyet sonrası profilakside kullanılır', 'Belirti başlangıcından 48 saat içinde tedavi · Gİ yan etkiler sık'],
      metin: 'Oseltamivir ve zanamivir influenzada tomurcuklanmayı azaltır; belirtilerin başlamasından sonraki 48 saat içinde başlandığında tedavide kullanılır. [[K3 s. 363]]',
    },
  };
  VIZ.a23d_herpes = (el) => SEKIL.sahne(el, {
    baslik: 'Herpesvirüs, CMV ve influenza antiviralleri',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Grup', Object.keys(herpesVeri)),
    metin: p => herpesVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = herpesVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  const hivVeri = {
    'HAART & NRTI': {
      renk: 'warn',
      k1: S => S.dar
        ? ['HAART: 2 NRTI + NNRTI/PI/İntegraz', 'Zidovudin: kinazla trifosfat → DNA ↓', 'HIV RT afinitesi konak pol.un 100×']
        : ['HAART: genellikle 2 NRTI + 1 NNRTI, proteaz veya integraz inh.', 'Zidovudin: HIV RT afinitesi konak DNA pol.un 100× · BOS %50'],
      k2: S => S.dar
        ? ['BOS düzeyi %50 · %80 glukuronid', 'Anemi, nötropeni, laktik asidoz', 'Pigmentasyon & HIV lipodistrofisi']
        : ['≤%80 glukuronid idrarla (BY’de doz ↓) · Anemi, nötropeni', 'Steatore, laktik asidoz, mukoza/tırnak pigmentasyonu, lipodistrofi'],
      metin: 'HAART genelde 2 NRTI temeline dayanır; NRTI grubu hücre içi kinaz aktivasyonu gerektirir ve zidovudinde anemi, nötropeni, laktik asidoz ile lipodistrofi görülebilir. [[K3 s. 363–364]]',
    },
    'NNRTI, Proteaz & İntegraz': {
      renk: 'accent',
      k1: S => S.dar
        ? ['NNRTI (nevirapin, efavirenz):', 'Aktivasyonsuz nonkompetitif RT inh.', 'İntegraz: raltegravir, dolutegravir']
        : ['NNRTI (nevirapin, efavirenz): aktivasyonsuz nonkompetitif', 'İntegraz (raltegravir, dolutegravir): DNA entegrasyonu ↓'],
      k2: S => S.dar
        ? ['Proteaz inh. (atazan./darun.):', 'Olgunlaşmamış enfeksiyonsuz virüs', 'Glukoz taşıyıcısı inh. · İnsülin direnci']
        : ['Proteaz inh. (atazan., darun., riton.): olgunlaşmamış virüs', 'Glukoz taşıyıcısı inh. · Bozulmuş GT / insülin direnci'],
      metin: 'NNRTI doğrudan RT’yi bloke eder, integraz inhibitörleri viral entegrasyonu önler; proteaz inhibitörleri ise insülin direnciyle ilişkilendirilmiştir. [[K3 s. 364]]',
    },
  };
  VIZ.a23d_hiv = (el) => SEKIL.sahne(el, {
    baslik: 'HIV antiretroviral tedavisi (HAART) ve sınıfları',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Başlık', Object.keys(hivVeri)),
    metin: p => hivVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = hivVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  const fungVeri = {
    Polienler: {
      renk: 'crit',
      k1: S => S.dar
        ? ['Amfoterisin B (A değil) & nistatin', 'Ergosterole bağlanır (kanal açar)', 'Çok düşük oral · Sistemik parenteral']
        : ['Ergosterol (kolesterol değil) bağlar → transmembran sızıntı kanalı', 'Çok düşük oral: nistatin oral, amfoterisin B yalnız parenteral'],
      k2: S => S.dar
        ? ['Zayıf BOS/idrar · KC · AmBisome', 'BY’de yine de doz ↓ düşünülür', '48 sa kademeli artış (renal ↓)']
        : ['Zayıf BOS/idrar · KC yıkımı ama BY’de doz ↓ düşünülür · AmBisome', 'Erken kesimde geri dönüşümlü ABY · İlk 48 sa kademeli doz artışı'],
      metin: 'Amfoterisin B mantar membranındaki ergosterole bağlanıp kanal açar; lipozomal formu (AmBisome) ve ilk 48 saatte kademeli doz artışı renal toksisiteyi azaltır. [[K3 s. 365–366]]',
    },
    Azoller: {
      renk: 'warn',
      k1: S => S.dar
        ? ['Triazol (flukon., itra.) / İmidazol', '14-α demetilaz inh. (ergosterol ↓)', 'Aspergillus: itrakonazol & mikonazol']
        : ['14-α demetilaz inh. · İtra./mikonazol Aspergillus’a aktif', 'Mikonazol dışı oral iyi · Güçlü CYP450 inh. (varf./sisap.)'],
      k2: S => S.dar
        ? ['Flukonazol: BOS iyi, idrarla değişmez', 'Diğer 3’ü %99 prot., BOS yok', 'Güçlü CYP450 inh. (PT ↑, QT ↑)']
        : ['Flukonazol: iyi BOS geçişi, metabolize olmadan idrarla atılır', 'İtra/keto/mikonazol: %99 protein bağlama, BOS yok, KC → safra'],
      metin: 'Azoller 14-α demetilazı bloke ederek ergosterolü azaltır; flukonazol BOS’a iyi geçer ve idrarla değişmeden atılırken tüm sınıf güçlü CYP450 inhibitörüdür. [[K3 s. 366–367]]',
    },
    'Ekinokandin & Flusitozin': {
      renk: 'ok',
      k1: S => S.dar
        ? ['Ekinokandinler (glukan sentaz inh.)', 'Anidula-, kaspo-, mikafungin', 'Aspergillus & Candida (MSS YOK)']
        : ['Ekinokandin (anidula-, kaspo-, mikafungin): β-glukan inh.', 'İnvaziv Aspergillus ve Candida’ya aktif · MSS enfeksiyonuna etkisiz'],
      k2: S => S.dar
        ? ['Flusitozin: timidilat sentaz inh.', 'Yalnız kombine · amfoterisinle sinerji', 'Kemik iliği baskılanması riski']
        : ['Flusitozin (timidilat sentaz inh.): yalnız kombine verilir', 'Sistemik kandidiyaz/kriptokok menenjiti · Kemik iliği baskılanması'],
      metin: 'Ekinokandinler duvar β-glukan sentezini bozar ancak MSS’de etkisizdir; flusitozin timidilat sentaz inhibitörüdür ve yalnız kombinasyonda kullanılır. [[K3 s. 367]]',
    },
  };
  VIZ.a23d_antifungal = (el) => SEKIL.sahne(el, {
    baslik: 'Antifungal ilaç sınıfları ve mekanizmaları',
    vb: [640, 224], vbDar: [360, 286],
    secenek: secim('Sınıf', Object.keys(fungVeri)),
    metin: p => fungVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = fungVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 122 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 148 : 118, W - 28, S.dar ? 122 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });
})();
