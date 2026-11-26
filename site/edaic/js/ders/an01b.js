(() => {
  'use strict';
  const VIZ = window.VIZ;
  const nokta = (x, y, ad, metin) => ({ x, y, ad, metin });

  VIZ.an01b_kesit = el => SEKIL.cizim(el, {
    baslik: 'Farinksin sagittal kesitte üç bölgesi',
    giris: 'Önde burun, ağız ve larinks ile ilişkili üç boşluğu yukarıdan aşağıya izleyin. [[K5 s. 15]]',
    gorunumler: [{ ad: 'Sagittal kesit', resim: 'img/anatomi/01b-kesit.webp', en: 1024, boy: 979,
      noktalar: [
        nokta(610, 231, 'Nazofarinks', 'Yumuşak damağın üstünde burun boşluğuyla devam eder. [[K5 s. 15]]'),
        nokta(530, 306, 'Yumuşak damak', 'Yutarken yükselerek farengeal istmusu kapatır. [[K5 s. 15]] [[K5 s. 21]]'),
        nokta(590, 420, 'Orofarinks', 'Damağın altından epiglotun ucuna uzanan bölümdür. [[K5 s. 16–17]]'),
        nokta(595, 525, 'Epiglot', 'Ucu orofarinks ile laringofarinks arasındaki sınırı belirler. [[K5 s. 17–18]]'),
        nokta(650, 675, 'Laringofarinks', 'Larinksin arkasında krikoidin alt kenarına kadar izlenir. [[K5 s. 18]]'),
        nokta(800, 530, 'Servikal vertebralar', 'Farinks arkada prevertebral fasya ve servikal vertebralarla komşudur. [[K5 s. 15]]'),
      ] }],
  });
  VIZ.an01b_tonsil = el => SEKIL.cizim(el, {
    baslik: 'Tonsil yatağının ağızdan görünümü',
    giris: 'Pilileri yukarıdan aşağıya takip ederek aralarında kalan tonsili bulun. [[K5 s. 17]]',
    gorunumler: [{ ad: 'Önden', resim: 'img/anatomi/01b-tonsil.webp', en: 1024, boy: 683, kirp: [158, 125, 710, 480],
      noktalar: [
        nokta(224, 317, 'Ön pili', 'Palatoglossus ön pilinin içindedir. [[K5 s. 17]]'),
        nokta(266, 384, 'Palatin tonsil', 'Görünen lenfoid yüzün üzerindeki küçük çöküntüler tonsil çukurlarıdır. [[K5 s. 17]]'),
        nokta(326, 319, 'Arka pili', 'Palatofaringeus tonsil yatağının arkasındaki pili içinde seyreder. [[K5 s. 17]]'),
        nokta(514, 313, 'Uvula', 'Yumuşak damağın orta hattaki uzantısıdır. [[K5 s. 16]]'),
        nokta(450, 489, 'Dil sırtı', 'Tonsili barındıran üçgenin tabanı dil sırtına katılır. [[K5 s. 17]]'),
      ] }],
  });
  VIZ.an01b_piriform = el => SEKIL.cizim(el, {
    baslik: 'Larinks girişine arkadan ve yukarıdan bakış',
    giris: 'Larinks girişinin kenarını bulun, ardından bu kenarın dışındaki iki fossayı karşılaştırın. [[K5 s. 18]]',
    gorunumler: [{ ad: 'Arkadan ve yukarıdan', resim: 'img/anatomi/01b-piriform.webp', en: 1024, boy: 1024,
      noktalar: [
        nokta(510, 186, 'Epiglot', 'Yutma sırasında bolusu iki piriform fossaya yönlendirir. [[K5 s. 22]]'),
        nokta(510, 428, 'Larinks girişi', 'Laringofarinksin ön komşularının en üstte olanıdır. [[K5 s. 18]]'),
        nokta(642, 426, 'Ariepiglottik kıvrım', 'Larinks girişinin kenarını oluşturur. [[K5 s. 18]]'),
        nokta(220, 434, 'Sol piriform fossa', 'Laringofarinksin yan girintisi sivri yabancı cismin takılabildiği yerlerdendir. [[K5 s. 18]]'),
        nokta(804, 434, 'Sağ piriform fossa', 'Mukozasının hemen altında üst laringeal sinirin internal dalı bulunur. [[K5 s. 18]]'),
      ] }],
  });

  VIZ.an01b_katman = el => SEKIL.cizim(el, {
    baslik: 'Farinks yan duvarının dört tabakası',
    giris: 'Solda lümene bakan mukoza, sağda dış yüzü örten fasya görülür. [[K5 s. 18–19]]',
    gorunumler: [{ ad: 'Orofarinks duvarı', resim: 'img/anatomi/01b-duvar.webp', en: 1024, boy: 512,
      noktalar: [
        nokta(114, 208, 'Mukoza', 'Orofarinks ve laringofarinkste epitel çok katlı yassı, nazofarinkste silyalı silindiriktir. [[K5 s. 18]]'),
        nokta(192, 313, 'Müköz bezler', 'Mukoza yüzeyinin altında üzüm salkımını andıran çok sayıda bez bulunur. [[K5 s. 18]]'),
        nokta(347, 229, 'Fibröz tabaka', 'Çoğu yerde incedir. [[K5 s. 18]] Kas duvarının eksik kaldığı üst kesimde yoğunlaşarak faringobaziler fasyayı oluşturur. [[K5 s. 18]] Tonsil kapsülü ve arka median rafe de bu tabakanın yoğunlaşmalarıdır. [[K5 s. 18]]'),
        nokta(563, 253, 'Kas tabakası', 'Üst, orta ve alt konstriktörler iç içe geçen üç saksı gibi birbirini örter. [[K5 s. 19]] Stilofaringeus, salpingofaringeus ve palatofaringeus da farinks kasları arasındadır. [[K5 s. 19]]'),
        nokta(817, 205, 'Bukkofarengeal fasya', 'En dıştaki bu çok ince fibröz kapsül farinksi sarar. [[K5 s. 19]] Enfeksiyon ödeminin aşağı yayılımı bu fasyayla sınırlanır. [[K5 s. 19]]'),
      ] }],
  });

  const evreler = [
    { ad: 'Ağız', metin: 'Çiğneme besini parçalar, tükürük kayganlaştırır. [[K5 s. 21]] Kuru boğazda hap yutmak bu yüzden güçtür. [[K5 s. 21]] Ağız tabanı kaslarının yardımıyla dil damağa bastırıp bolusu istmustan geriye iter. [[K5 s. 21]]' },
    { ad: 'Farinks', metin: 'Larinks yükselirken girişi kapanır, dikleşen epiglot besini iki piriform fossaya ayırır. [[K5 s. 21–22]]' },
    { ad: 'Özofagus', metin: 'Krikofaringeus gevşeyince bolus bileşkeyi aşar, özofagus katı besini peristaltik dalgayla kardiyaya taşır. [[K5 s. 22]]' },
  ];
  VIZ.an01b_yutma = el => SEKIL.adim(el, {
    baslik: 'Bolusun yolu ve hava yolunun korunması', vb: [640, 292], vbDar: [360, 292], oto: false, adimlar: evreler,
    ortak: (S, i) => {
      const x = S.w / 2, aralik = S.w * .29;
      const ok = (yol, evre) => S.ok(yol, { renk: evre === i ? 'accent' : 'muted', w: evre === i ? 4 : 2 });
      let svg = S.kutu(x - 84, 8, 168, 36, { yazi: 'Dil ve damak' }) + ok([[x, 45], [x, 71]], 0)
        + S.kutu(x - 60, 72, 120, 34, { yazi: 'Epiglot' })
        + S.kutu(x - 52, 143, 104, 48, { yazi: ['Larinks', 'girişi'], dolgu: i === 1 ? 'clin-soft' : 'paper' });
      for (const yon of [-1, 1]) {
        const yan = x + yon * aralik;
        svg += ok([[x + yon * 26, 107], [yan, 127], [yan, 145]], 1)
          + S.t(yan, 163, ['Piriform', 'fossa'], { a: 'middle' })
          + ok([[yan, 189], [yan, 202], [x + yon * 12, 227]], 2);
      }
      return svg + S.kutu(x - 84, 231, 168, 44, { yazi: 'Özofagus', dolgu: i === 2 ? 'accent-soft' : 'paper' });
    },
  });

  VIZ.an01b_hava = el => SEKIL.cizim(el, {
    baslik: 'İndüksiyonda tıkanma ve laringeal maske',
    giris: 'Soldaki kesitte ağız ve burun yollarının kapanabileceği iki yeri, sağdakinde maskenin larinks ağzıyla ilişkisini izleyin. [[K5 s. 22–24]]',
    gorunumler: [{ ad: 'Sagittal kesitler', resim: 'img/anatomi/01b-hava.webp', en: 1024, boy: 512,
      noktalar: [
        nokta(214, 142, 'Dil–damak teması', 'Önerilen olay dizisinde önce dil damağa dayanır, ağızdan hava geçişi kesilir ve horlama ortaya çıkar. [[K5 s. 22]]'),
        nokta(327, 179, 'Yumuşak damak–arka duvar teması', 'Ardından yumuşak damak geriye düşüp arka nazofarinks mukozasına dayanarak burundan hava geçişini kapatabilir. [[K5 s. 22]]'),
        nokta(676, 196, 'Laringeal maske tüpü', 'Ağızdan giren laringeal maske (LMA), farenksteki tıkanıklığı aşarak larinks açıklığına ulaşır. [[K5 s. 23–24]]'),
        nokta(839, 335, 'Larinks ağzındaki kaf', 'Şişirilen kaf larinks ağzının çevresinde sızdırmazlık sağlar. [[K5 s. 23–24]]'),
      ] }],
  });
})();
