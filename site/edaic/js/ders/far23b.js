/* Beta-laktam antibiyotikler · K3, Türkçe çalışma çevirisi, s. 342–347. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const secim = (ad, adlar) => ({
    id: 'secili', ad, liste: adlar.map(d => ({ d, ad: d })),
  });

  function zincir(baslik, adimlar) {
    return {
      baslik, vb: [640, 316], vbDar: [360, 316], oto: false, adimlar,
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

  VIZ.a23b_pbp = (el) => SEKIL.adim(el, zincir('Penisilin yapısı, PBP bağlanması ve direnç', [
    {
      ad: 'Yapı & Taklit',
      satir: ['β-laktam + tiyazolidin · Açil yan zinciri spektrumu belirler', 'β-laktam halkası D-ala-D-ala substratını taklit eder'],
      darSatir: ['β-laktam + tiyazolidin halkası', 'D-ala-D-ala substratını taklit'],
      metin: 'Sağlam β-laktam halkası antibakteriyel etkinlik için şarttır; açil yan zinciri mide asidinde yıkım duyarlılığını ve spektrumu belirler (yalnız Penisilin V ve G doğaldır). [[K3 s. 342–343]]',
    },
    {
      ad: 'PBP İnaktivasyonu',
      satir: ['PBP (transpeptidaz) aktif serinine kovalent bağlanır', 'Halka açılır → geri dönüşümsüz inaktivasyon · Çapraz bağ ↓'],
      darSatir: ['PBP aktif serinine kovalent bağ', 'Transpeptidaz geri dönüşümsüz ↓'],
      metin: 'β-laktamlar peptidoglikan yan zincirindeki D-ala-D-ala yerine geçerek transpeptidazları geri dönüşümsüz inaktive eder ve hücre duvarını zayıflatır. [[K3 s. 343]]',
    },
    {
      ad: 'G+ vs G− Lizis',
      satir: ['G+ kok: persister kalabilir (+ gentamisin tam eradikasyon)', 'G− basil: dış LPS kalır → sferoplast (H. influenzae’de lizis nadir)'],
      darSatir: ['G+: persister (+ gentamisin)', 'G−: sferoplast (H. inf. lizis ↓)'],
      metin: 'G+ koklarda persisterler ilaç kesilene dek uykuda kalır ve gentamisin eklenmesi tam eradikasyon sağlayabilir; G− basillerde düşük osmolaliteli H. influenzae ilaç çekilince çomak şekline dönebilir. [[K3 s. 343]]',
    },
    {
      ad: 'β-Laktamaz',
      satir: ['Kromozom/plazmit β-laktamazları halkayı hidrolizler', 'Klavulanik asit / tazobaktam β-laktamazı inhibe eder'],
      darSatir: ['β-laktamaz halkayı hidrolizler', 'Klavulanik asit / tazobaktam'],
      metin: 'Kromozom ve plazmitlerde kodlanan β-laktamazlar yayılarak kazanılmış dirence yol açabilir; klavulanik asit (zayıf intrensek etkili) ve tazobaktam (intrensek etkisiz) koruma sağlar. [[K3 s. 343–344]]',
    },
  ]));

  const penFarmVeri = {
    'Kinetik & İnhibitörler': {
      renk: 'basic',
      k1: S => S.dar
        ? ['Amoksisilin oral emilimi > ampisilin', 'Penisilin G: asit duyarlı → parenteral', 't½: Penisilin G 30 dk · Ampisilin 2 sa']
        : ['Oral emilim asit duyarlılığına bağlı · Amoksisilin > ampisilin', 'Benzilpenisilin (Penisilin G) asit duyarlı → yalnız parenteral', 'Kısa plazma t½: benzilpenisilin 30 dk · ampisilin 2 saat'],
      k2: S => S.dar
        ? ['%60–90 idrarla · %10 safra · ≤%20 yıkım', 'KBB/kemik geçişi enflamasyon ister', 'Klavulanik asit (+) vs Tazobaktam (−)']
        : ['Atılım: %60–90 böbrek (sekresyon), %10 safra, ≤%20 metabolize', 'KBB ve kemik geçişi için enflamasyon gerekir', 'Klavulanik asit (zayıf intrensek) · Tazobaktam (etki yok)'],
      metin: 'Zaman-bağımlı bakterisidal penisilinler genellikle kısa yarılanma ömürlüdür ve %60–90 oranında başlıca tübüler sekresyonla böbrekten atılır. [[K3 s. 344]]',
    },
    'Yan Etkiler & Ensefalopati': {
      renk: 'crit',
      k1: S => S.dar
        ? ['Alerji ≤%10 · Anafilaksi %0,01', 'Benzilpenisilin en prokonvülzan', 'BOS toksik: intratekal / BY + menenjit']
        : ['Aşırı duyarlılık: %10’a varan alerji · %0,01 anafilaksi', 'Benzilpenisilin β-laktamlar arasında en prokonvülzan olandır', 'BOS toksik: intratekal, BY + menenjitte yüksek doz / probenesid'],
      k2: S => S.dar
        ? ['Oral tedavide diyare sık görülür', 'Ampisilin: %0,3–0,7 kolit', 'Ampisilin: %10 döküntü']
        : ['Oral tedavide diyare sık görülür', 'Ampisilinde %0,3–0,7 psödomembranöz kolit riski', 'Ampisilin alanların %10’unda makülopapüler döküntü görülür'],
      metin: 'Aşırı duyarlılık başta gelir; toksik BOS düzeylerinde nöbet/ensefalopati (özellikle benzilpenisilin) ve oral tedavide diyare veya döküntü görülebilir. [[K3 s. 344]]',
    },
  };
  VIZ.a23b_pen_farm = (el) => SEKIL.sahne(el, {
    baslik: 'Penisilin farmakokinetiği, β-laktamaz inhibitörleri ve yan etkiler',
    vb: [640, 232], vbDar: [360, 290],
    secenek: secim('Başlık', Object.keys(penFarmVeri)),
    metin: p => penFarmVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = penFarmVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 124 : 96, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 150 : 122, W - 28, S.dar ? 126 : 96, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  const sefVeri = {
    'Kuşaklar (1–5)': {
      renk: 'accent',
      k1: S => S.dar
        ? ['Sefem: β-laktam + dihidrotiyazin', '1.–2. kuşak: G+ (+ H. influenzae)', '3. kuşak: G− ↑, Pseudomonas, KBB']
        : ['β-laktam + dihidrotiyazin (sefem) → β-laktamazlara daha kararlı', '1.–2. kuşak: G+ koklar (sefuroksim H. influenzae’ye de etkili)', '3. kuşak: G− ↑, G+ potens ↓, Pseudomonas duyarlı, KBB geçer'],
      k2: S => S.dar
        ? ['4. kuşak (BK’de yok): sefepim, sefpirom', '5. kuşak: seftarolin, seftobiprol', 'MRSA, VISA, VRSA gibi ÇİD S. aureus']
        : ['4. kuşak (sefepim, sefpirom; BK’de yok): Pseudomonas’a aktif', '5. kuşak (seftarolin, seftobiprol): MRSA/VISA/VRSA’ya aktif'],
      metin: 'Sefalosporin kuşakları ilerledikçe G+ kapsam korunarak G− etkinlik genişler; 5. kuşak MRSA dahil çoklu ilaca dirençli S. aureus’a etkilidir. [[K3 s. 344–345]]',
    },
    'Kinetik & Uyarılar': {
      renk: 'warn',
      k1: S => S.dar
        ? ['Plasentayı geçer · 3. kuşak BOS (menenjit)', 't½ 1–1,5 sa (seftriakson 5,5–11 sa)', 'Sefotaksim KC yıkımı (%10 aktif)']
        : ['Plasenta geçişi; seftriakson/sefotaksim enflame meninkste BOS’a geçer', 'Kısa t½ 1–1,5 sa (seftriakson 5,5–11 sa → günde tek doz)', 'Sefotaksim KC metaboliti %10 aktif (%50 değişmeden idrar)'],
      k2: S => S.dar
        ? ['Filtrasyon + tübüler sekresyon', 'Penisilinle çapraz duyarlılık riski', 'Kolit özellikle 3. kuşakta görülür']
        : ['Filtrasyon + sekresyon (probenesid etkisi penisilinden az)', 'Penisilinle çapraz duyarlılık · 3. kuşakla kolit riski'],
      metin: 'Çoğu sefalosporinin yarılanma ömrü 1–1,5 saat iken seftriaksonun 5,5–11 saatlik yarılanma ömrü günde tek doz kullanımını sağlar. [[K3 s. 345]]',
    },
  };
  VIZ.a23b_sef = (el) => SEKIL.sahne(el, {
    baslik: 'Sefalosporin kuşakları, farmakokinetik ve yan etkiler',
    vb: [640, 232], vbDar: [360, 290],
    secenek: secim('Görünüm', Object.keys(sefVeri)),
    metin: p => sefVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = sefVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 124 : 98, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 150 : 124, W - 28, S.dar ? 126 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  const karbaVeri = {
    İmipenem: {
      renk: 'crit',
      k1: S => S.dar
        ? ['G+/G− (P. aeruginosa) & anaeroblar', 'MRSA’ya etkisiz · Monoterapide direnç', 'Tümü böbrek yetmezliğinde doz ↓']
        : ['Geniş spektrum: G+/G− (P. aeruginosa) ve anaerob · MRSA’sız', 'Monoterapi Pseudomonas direnci yapabilir · BY’de doz ↓'],
      k2: S => S.dar
        ? ['Renal dehidropeptidazla yıkılır', '→ Silastatinle birlikte verilir', 'Yüksek doz + menenjitte nörotoksik']
        : ['Renal dehidropeptidazla yıkılır → silastatinle kombine edilir', 'Pseudomonas β-laktamaz ↑ · Nörotoksik → menenjitte sınırlı'],
      metin: 'İmipenem renal dehidropeptidazla parçalandığından silastatinle verilir; çok yüksek dozlarda, özellikle enflame meninkste nörotoksisite menenjitte kullanımını sınırlar. [[K3 s. 345–346]]',
    },
    'Meropenem & Ertapenem': {
      renk: 'basic',
      k1: S => S.dar
        ? ['Meropenem: silastatin gerekmez', 'Daha az nörotoksik görünür', 'Bakteriyel menenjite uygundur']
        : ['Meropenem: renal dehidropeptidazla yıkılmaz (silastatinsiz)', 'Daha az nörotoksik görünür → bakteriyel menenjite uygundur'],
      k2: S => S.dar
        ? ['Ertapenem: Pseudomonas’ta daha az', 'Uzun t½ → günde tek doz', 'Karbapenemaz üreten suşlar artıyor']
        : ['Ertapenem: Pseudomonas/bazı G+ zayıf · Uzun t½ → 1×/gün', 'Karbapenemazlar klinik seçeneği sınırlayabilmektedir'],
      metin: 'Meropenem silastatin gerektirmez ve menenjitte uygundur; ertapenem günde tek doz verilir ancak P. aeruginosa ve bazı Gram-pozitiflerde daha az aktiftir. [[K3 s. 345–346]]',
    },
    'Aztreonam (Monobaktam)': {
      renk: 'ok',
      k1: S => S.dar
        ? ['Tek monobaktam (monosiklik)', 'Spektrum aerobik G− ile sınırlı', 'Enterobacter & Pseudomonas aktif']
        : ['Klinik kullanımdaki tek monobaktamdır (monosiklik halka)', 'Spektrumu aerobik G− ile sınırlı (Enterobacter, Pseudomonas)'],
      k2: S => S.dar
        ? ['Şiddetli Pseudomonas: + gentamisin', 'KF kronik Pseudomonas’ta nebülize', 'Penisilin alerjisinde verilir']
        : ['Şiddetli Pseudomonas: + gentamisin · KF’de nebülize verilir', 'Penisiline alerjik hastalara verilebilir (çapraz reaktivite kanıtı yok)'],
      metin: 'Aztreonam yalnız aerobik Gram-negatiflere etkili monosiklik bir β-laktamdır ve penisilin alerjisi olan hastalarda normal şekilde verilebilir. [[K3 s. 346–347]]',
    },
  };
  VIZ.a23b_karba = (el) => SEKIL.sahne(el, {
    baslik: 'Karbapenemler ve monobaktam (aztreonam) karşılaştırması',
    vb: [640, 228], vbDar: [360, 286],
    secenek: secim('İlaç', Object.keys(karbaVeri)),
    metin: p => karbaVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = karbaVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 120 : 94, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 146 : 120, W - 28, S.dar ? 124 : 94, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });

  const alerjiVeri = {
    Değerlendirme: {
      renk: 'warn',
      k1: S => S.dar
        ? ['Alerji bildirenin >%90’ında IgE yok', 'Anestezi/YBÜ en sık anafilaksi', 'Yanlış etiket & yan etki karışması']
        : ['Alerji bildirenlerin >%90’ında deri testinde IgE saptanmaz', 'Yine de anestezi/YBÜ’de en sık anafilaksi nedenlerindendir'],
      k2: S => S.dar
        ? ['Öykü: IgE vs ağır non-IgE (SJS)', 'vs GİS bulantı/diyare yan etkileri', 'İdealde alerji testiyle doğrulama']
        : ['Öyküyle IgE, ağır non-IgE (SJS) ve GİS yan etkiyi ayırt et', 'İdeal olan tüm penisilin alerjisi öykülerinin test edilmesidir'],
      metin: 'Alerji bildiren hastaların >%90’ında IgE duyarlılığı saptanmasa da ağır IgE/non-IgE öyküsünü basit GİS yan etkilerinden ayırmak kritiktir. [[K3 s. 346–347]]',
    },
    'Çapraz Reaktivite': {
      renk: 'ok',
      k1: S => S.dar
        ? ['Gerçek penisilin alerjisi:', '• Sefalosporin: ≤%10 reaksiyon', '• Karbapenem: %99 tolere eder']
        : ['Gerçek alerjide çoklu antijenle çapraz reaktivite olabilir:', 'Sefalosporinle ≤%10 reaksiyon · Karbapeneme %99 tolerans'],
      k2: S => S.dar
        ? ['• Monobaktam (aztreonam):', '  Çapraz reaktivite kanıtı YOK', '  Normal şekilde verilebilir']
        : ['Monobaktamlarla (aztreonam) immünolojik çapraz reaktivite kanıtı yok', 'Penisilin alerjisi olan hastalara normal şekilde uygulanabilir'],
      metin: 'Gerçek penisilin alerjisinde sefalosporinle %10’a varan reaksiyon bildirilmişken deri testi pozitiflerin %99’u karbapenemi tolere eder ve aztreonamla çapraz reaktivite kanıtı yoktur. [[K3 s. 347]]',
    },
  };
  VIZ.a23b_alerji = (el) => SEKIL.sahne(el, {
    baslik: 'Penisilin alerjisi öyküsü ve diğer β-laktamlarla çapraz reaktivite',
    vb: [640, 224], vbDar: [360, 280],
    secenek: secim('Odak', Object.keys(alerjiVeri)),
    metin: p => alerjiVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = alerjiVeri[secili], W = S.w;
      return S.kutu(14, 12, W - 28, S.dar ? 120 : 92, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.k1(S), lh: 23 })
        + S.kutu(14, S.dar ? 146 : 118, W - 28, S.dar ? 120 : 92, { dolgu: 'paper', renk: 'line', yazi: v.k2(S), lh: 23 });
    },
  });
})();
