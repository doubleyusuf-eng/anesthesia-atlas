(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, secenekler) => ({
    id:'secim', ad, liste:secenekler.map(([d, etiket]) => ({d, ad:etiket}))
  });

  // Dikey sırada kutular arasındaki boşluk, ok ve inhibisyon işareti için ayrılır.
  function kutu(S, y, yazi, renk = 'basic') {
    const w = Math.min(S.w - 32, 420);
    return S.kutu((S.w - w) / 2, y, w, 52, {yazi, renk, dolgu:renk + '-soft'});
  }
  function ok(S, y, son) {
    const x = S.w / 2;
    return S.ok([[x,y],[x,son]], {renk:'muted'});
  }
  function engel(S, y) {
    const x = S.w / 2;
    return S.cizgi([[x,y],[x,y+20]],{renk:'crit'}) +
      S.cizgi([[x-15,y+20],[x+15,y+20]],{renk:'crit',w:3});
  }
  VIZ.a10a_kapi = el => SEKIL.sahne(el, {
    baslik:'C lifi girdisini arka boynuzda değiştiren yollar', vb:[640,245], vbDar:[360,245],
    secenek:secim('Kapıya ulaşan girdi',[['c','C lifi'],['ab','C + dokunma'],['inen','C + inen yol']]),
    ciz:(S,t,p) => {
      const acik = p.secim === 'c';
      const girdi = acik ? 'C lifinden nosiseptif girdi' :
        p.secim === 'ab' ? 'Büyük Aβ lifi · dokunma' : 'İnen inhibitör yol';
      return kutu(S,8,girdi) + ok(S,61,87) +
        kutu(S,90,acik ? 'Substantia gelatinosa' : 'İnhibitör internöron uyarılır') +
        (acik ? ok(S,143,169) : engel(S,143)) +
        kutu(S,172,acik ? 'C girdisi santrale iletilir' : 'C girdisinin iletimi baskılanır', acik ? 'clin' : 'crit');
    },
    metin:p => p.secim === 'c' ? 'Kapı açıkken C lifinin taşıdığı ağrı sinyali santrale ulaşır. [[K3 s. 140]]' :
      (p.secim === 'ab' ? 'Dokunmayı taşıyan daha büyük Aβ lifleri' : 'İnen yollar') +
      ' substantia gelatinosa’daki inhibitör internöronları uyararak C lifi girdisine kapıyı kapatır. [[K3 s. 139–140]]'
  });

  const sinyal = [
    ['Reseptör','Morfin → µ reseptörü','Morfin µ reseptörüne bağlandığında inhibitör G proteini üzerinden sinyal başlar. [[K3 s. 140]]'],
    ['Hücre yanıtı',['Ca²⁺ kanalları kapanır','K⁺ çıkışı ↑ · cAMP ↓'],'Voltaj duyarlı Ca²⁺ kanalları kapanır, K⁺ çıkışı hiperpolarizasyona ve adenilat siklaz inhibisyonu cAMP azalmasına yol açar. [[K3 s. 140]]'],
    ['Sinaps','Transmiter salımı azalır','Bu hücresel değişikliklerin ortak sonucu sinir hücreleri arasındaki transmiter salımının baskılanmasıdır. [[K3 s. 140]]']
  ];
  VIZ.a10a_sinyal = el => SEKIL.adim(el, {
    baslik:'µ agonizmasının sinaptik sonuçları', vb:[640,242], vbDar:[360,242], oto:false,
    adimlar:sinyal.map(([ad,,metin]) => ({ad,metin})),
    ortak:(S,i) => sinyal.slice(0,i+1).map(([,etiket],k) =>
      (k ? ok(S,k*80-18,k*80+4) : '') + kutu(S,k*80+8,etiket,k === i ? 'accent' : 'basic')
    ).join('')
  });

  const yollar = {
    oral:['Oral','5–20 mg · 4 saatte bir','İlk geçiş → biyoyararlanım %30','Oral morfinin biyoyararlanımını hepatik ilk geçiş sınırlar. [[K3 s. 144]]'],
    im:['İntramüsküler','0.1–0.2 mg.kg⁻¹ · 4 saatte bir','Doruk 30 dk · süre 3–4 saat','İntramüsküler enjeksiyonda doruk etkiye intravenöz yoldan daha geç ulaşılır. [[K3 s. 144]]'],
    iv:['İntravenöz','Etkiye göre titrasyon','Doruk 10 dk · süre 3–4 saat','İntravenöz toplam doz intramüsküler doza benzerdir. [[K3 s. 141]]'],
    epidural:['Epidural','2–4 mg','Gecikmiş solunum depresyonu riski','Düşük lipit çözünürlüğü epidural morfinin gecikmiş solunum depresyonuyla ilişkilidir. [[K3 s. 141]]'],
    intratekal:['İntratekal','0.2–1.0 mg','Gecikmiş solunum depresyonu riski','İntratekal uygulamada da solunum depresyonu gecikebilir. [[K3 s. 141]]']
  };
  VIZ.a10a_yol = el => SEKIL.sahne(el, {
    baslik:'Morfinin yoluna göre doz ve etki', vb:[640,227], vbDar:[360,227],
    secenek:secim('Morfinin uygulama yolu',Object.entries(yollar).map(([id,[ad]]) => [id,ad])),
    ciz:(S,t,p) => {
      const [ad,doz,sonuc] = yollar[p.secim];
      return kutu(S,4,ad) + ok(S,57,80) + kutu(S,82,doz,'accent') +
        ok(S,135,157) + kutu(S,160,sonuc,'clin');
    },
    metin:p => yollar[p.secim][3]
  });

  VIZ.a10a_solunum = el => SEKIL.sahne(el, {
    baslik:'Morfin sonrası hipoksik uyaranın etkisi', vb:[640,235], vbDar:[360,235],
    secenek:secim('Hipoksik uyaran',[['var','Hipoksik uyaran var'],['yok','Ek O₂ ile uyaran kalktı']]),
    ciz:(S,t,p) => {
      const varMi = p.secim === 'var';
      return kutu(S,6,'Beyin sapında CO₂ duyarlılığı ↓') +
        kutu(S,72,varMi ? 'Hipoksiye yanıt daha az etkilenir' : 'Hipoksik uyaran ortadan kalkar', 'accent') +
        ok(S,126,154) + kutu(S,157,varMi ? 'Solunum depresyonu' : ['Solunum depresyonu','derinleşebilir'],'crit');
    },
    metin:p => p.secim === 'var' ? 'Morfin beyin sapının CO₂’ye yanıtını baskılarken hipoksiye yanıt görece korunur. [[K3 s. 143]]' :
      'Ek oksijen hipoksik uyaranı ortadan kaldırırsa solunum depresyonu güçlenebilir. [[K3 s. 143]]'
  });

  VIZ.a10a_metabolit = el => SEKIL.sahne(el, {
    baslik:'Ana ilaçtan metabolitlere', vb:[640,240], vbDar:[360,240],
    secenek:secim('Başlangıç bileşiği',[['di','Diamorfin'],['mo','Morfin']]),
    ciz:(S,t,p) => {
      const di = p.secim === 'di';
      return kutu(S,6,di ? 'Diamorfin · ön ilaç' : 'Morfin · µ agonisti') + ok(S,59,84) +
        kutu(S,86,di ? ['Ester hidrolizi','Karaciğer, plazma, MSS'] : ['Glukuronidasyon','Başlıca karaciğer, ayrıca böbrek']) +
        ok(S,139,162) + kutu(S,164,di ? ['6-monoasetilmorfin','ve morfin'] : ['Morfin 3-glukuronid','ve morfin 6-glukuronid'],'accent');
    },
    metin:p => p.secim === 'di' ? 'Diamorfin karaciğer, plazma ve merkezi sinir sisteminde hızla hidrolize olur, etkilerini oluşan metabolitler sağlar. [[K3 s. 145]]' :
      'Morfinin iki başlıca glukuronidi de idrarla atılır ve böbrek yetmezliğinde birikir. [[K3 s. 144]]'
  });
})();
