(function () {
  'use strict';
  const VIZ = window.VIZ;

  function aciklama(el, ad) {
    return el.closest('.viz').querySelector(`template[data-aciklama="${ad}"]`).innerHTML;
  }

  function secim(el, baslik, dallar, ciz) {
    return SEKIL.sahne(el, {
      baslik, vb: [640, 220], vbDar: [350, 220],
      secenek: { id: 'dal', ad: baslik, liste: Object.entries(dallar).map(([d, dal]) => ({d, ad: dal.ad})) },
      ciz: (S, t, p) => ciz(S, dallar[p.dal]),
      metin: p => aciklama(el, p.dal)
    });
  }

  function yol(S, dal) {
    const x = S.w / 2;
    return dal.yol.map((ad, i) => {
      const y = 9 + 76 * i;
      const renk = ['basic', 'accent', 'clin'][i];
      return S.kutu(x - 146, y, 292, 48, {yazi: ad, renk, dolgu: renk + '-soft'}) +
        (i < 2 ? S.ok([[x, y + 49], [x, y + 71]], {renk: 'muted'}) : '');
    }).join('');
  }

  VIZ.a03a_ace = el => secim(el, 'ACE inhibisyonunda substratı seçin', {
    anj: {ad: 'Anjiyotensin I', yol: ['Anjiyotensin I ↑', 'ACE inhibisyonu', 'Anjiyotensin II ↓']},
    bra: {ad: 'Bradikinin', yol: ['Bradikinin ↑', 'ACE inhibisyonu', 'İnaktif parçalar ↓']}
  }, yol);

  VIZ.a03a_kanal = el => secim(el, 'Kanalı seçin', {
    ach: {ad: 'Nikotinik', ligand: 'İki asetilkolin', iyon: 'Na⁺', sonuc: 'Depolarizasyon'},
    gaba: {ad: 'GABA-A', ligand: 'GABA', iyon: 'Cl⁻', sonuc: 'Hiperpolarizasyon'},
    nmda: {ad: 'NMDA', ligand: 'Glutamat ve glisin', iyon: 'Na⁺, K⁺, Ca²⁺', sonuc: 'Ca²⁺ geçirgenliği özellikle yüksek'},
    atp: {ad: 'Pürinerjik', ligand: 'ATP', iyon: 'Na⁺, K⁺, Ca²⁺', sonuc: 'Na⁺ ve K⁺ geçirgenlikleri eşit'}
  }, (S, dal) => {
    const x = S.w / 2;
    return S.kutu(x-120, 8, 240, 35, {yazi:dal.ligand, renk:'basic', dolgu:'basic-soft'}) +
      S.ok([[x,46],[x,72]], {renk:'basic'}) +
      S.kutu(8,88,x-92,40,{dolgu:'chip',renk:'line'}) +
      S.kutu(x+84,88,x-92,40,{dolgu:'chip',renk:'line'}) +
      S.kutu(x-84,74,26,70,{dolgu:'accent-soft',renk:'accent'}) +
      S.kutu(x+58,74,26,70,{dolgu:'accent-soft',renk:'accent'}) +
      S.t(x,112,dal.iyon,{a:'middle',c:'b'}) +
      S.t(x,166,'Açık kanal',{a:'middle',c:'m'}) +
      S.t(x,202,dal.sonuc,{a:'middle',c:'b'});
  });

  const dongu = [
    {ad:'Dinlenme', nuk:'GDP', ayri:false, etiket:'İnaktif heterotrimer'},
    {ad:'Değişim', nuk:'GTP', ayri:false, etiket:'Ligand bağlı GPCR'},
    {ad:'Ayrılma', nuk:'GTP', ayri:true, etiket:'Efektöre sinyal'},
    {ad:'Birleşme', nuk:'GDP', ayri:false, etiket:'İnaktif kompleks yeniden oluşur'}
  ];
  VIZ.a03a_dongu = el => SEKIL.adim(el, {
    baslik:'G proteini döngüsü', vb:[640,230], vbDar:[350,230], oto:false,
    adimlar:dongu.map(d => ({
      ad:d.ad, metin:aciklama(el, d.ad), ciz:S => {
        const x = S.w/2, ax = x-(d.ayri ? 88 : 46), bx = x+(d.ayri ? 86 : 48);
        return S.t(x,26,d.etiket,{a:'middle',c:'b'}) +
          S.kutu(12,45,S.w-24,18,{dolgu:'chip',renk:'line'}) +
          S.daire(ax,110,42,{renk:'accent',dolgu:'accent-soft'}) +
          S.t(ax,104,['α',d.nuk],{a:'middle',c:'b'}) +
          S.kutu(bx-48,87,96,46,{yazi:'βγ',renk:'basic',dolgu:'basic-soft'}) +
          (d.ayri ? S.ok([[ax,154],[ax,177]],{renk:'accent'}) +
            S.kutu(ax-65,181,130,36,{yazi:'Efektör',renk:'clin',dolgu:'clin-soft'}) : '');
      }
    }))
  });

  VIZ.a03a_yollar = el => secim(el,'G proteinini seçin',{
    gs:{ad:'Gs',yol:['Gs','Adenilil siklaz ↑','cAMP ↑']},
    gi:{ad:'Gi',yol:['Gi','Adenilil siklaz ↓','cAMP ↓']},
    gq:{ad:'Gq',yol:['Gq','Fosfolipaz C ↑','PIP₂ → IP₃ + DAG']}
  },yol);

  VIZ.a03a_enzimler = el => secim(el,'Uyarıyı seçin',{
    anp:{ad:'ANP',yol:['Atriyal natriüretik peptit','Zarda guanilil siklaz','cGMP ↑']},
    no:{ad:'Nitrik oksit',yol:['Nitrik oksit','Sitozolde guanilil siklaz','cGMP ↑']},
    insulin:{ad:'İnsülin',yol:['İnsülin → α birimi','Zarda reseptör tirozin kinaz',['Hedef proteinlerde','fosforilasyon']]}
  },yol);

  VIZ.a03a_gen = el => SEKIL.adim(el,{
    baslik:'Steroid reseptörünün izlediği yol', vb:[640,220], vbDar:[350,220], oto:false,
    adimlar:[
      {ad:'Bekleme',yol:['Sitoplazma','Reseptör + inhibitör protein','İnaktif reseptör']},
      {ad:'Bağlanma',yol:['Hormon','Reseptörde biçim değişikliği',['Aktif hormon–reseptör','kompleksi']]},
      {ad:'Transkripsiyon',yol:['Aktif reseptör','Özgül DNA promotörü','mRNA üretimi']}
    ].map(d => ({ad:d.ad, metin:aciklama(el, d.ad), ciz:S => yol(S,d)}))
  });
})();
