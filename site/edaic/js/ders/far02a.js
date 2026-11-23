(function () {
  'use strict';
  const VIZ = window.VIZ;
  // Telefonda neden-sonuç zinciri tek sütunda okunur.
  function zincir(S, etiketler, vurgu = 2) {
    return etiketler.map((yazi, i) => {
      const x = S.dar ? 42 : 10 + i * 213;
      const y = S.dar ? 12 + i * 78 : 30;
      const w = S.dar ? 276 : 192;
      const ok = i === 0 ? '' : S.dar
        ? S.ok([[180, y - 23], [180, y - 3]], { renk: 'muted' })
        : S.ok([[x - 19, y + 27], [x - 3, y + 27]], { renk: 'muted' });
      return ok + S.kutu(x, y, w, 54, { yazi, renk: i === vurgu ? 'accent' : 'line',
        dolgu: i === vurgu ? 'accent-soft' : 'paper' });
    }).join('');
  }
  function karsilastir(el, baslik, secimler) {
    return SEKIL.sahne(el, {
      baslik, vb: [640, 112], vbDar: [360, 236],
      secenek: { id: 'yol', ad: baslik, liste: Object.keys(secimler).map(ad => ({ d: ad, ad })) },
      ciz: (S, t, p) => zincir(S, secimler[p.yol].yol),
      metin: p => secimler[p.yol].metin
    });
  }
  VIZ.a02a_oral = el => karsilastir(el, 'İlacı seçin', {
    Aspirin: { yol: ['Asidik mide', 'Yüksüz aspirin', 'Hızlı ilk emilim'], metin: 'Asidik midede yüksüz kalan aspirin emilmeye erken başlar. [[K3 s. 9–10]]' },
    Propranolol: { yol: ['Midede iyonize', ['Duodenumda', 'daha az iyonize'], 'Duodenumdan emilim'], metin: 'Zayıf baz propranololün yüksüz fraksiyonu duodenumda daha büyüktür. [[K3 s. 9]]' },
    'Vekuronyum / glikopirolat': { yol: ['Kalıcı yük', 'İyonize tuz', ['Sindirim kanalından', 'emilmez']], metin: 'Vekuronyum ve glikopirolat tuzları sindirim kanalı boyunca yüklü kalır. [[K3 s. 9]]' }
  });
  const ilkBasamaklar = ['Emilim · FA', 'Bağırsak duvarı · FG', 'Karaciğer · FH'];
  VIZ.a02a_ilk = el => SEKIL.adim(el, {
    baslik: 'İlk geçişin basamakları', vb: [640, 112], vbDar: [360, 236], oto: false,
    ortak: (S, i) => zincir(S, ilkBasamaklar, i),
    adimlar: [
      { ad: 'Emilim', metin: 'F<sub>A</sub> oral dozun bağırsaktan emilen fraksiyonudur. [[K3 s. 10]]' },
      { ad: 'Bağırsak', metin: 'F<sub>G</sub> mukozal metabolizmadan kalan fraksiyondur, GTN bağırsak duvarında metabolize olabilir. [[K3 s. 10]]' },
      { ad: 'Karaciğer', metin: 'Emilen ilaç portal venle karaciğere gelir, F<sub>H</sub> hepatik metabolizmadan sonra kalan fraksiyondur. [[K3 s. 10]]' }
    ]
  });
  VIZ.a02a_alan = el => SEKIL.sahne(el, {
    baslik: 'Eşit dozlarda eğri altı alan', vb: [360, 208], vbDar: [360, 208],
    secenek: { id: 'yol', ad: 'Alanı vurgula', liste: [{ d: 'oral', ad: 'Oral · pay' }, { d: 'iv', ad: 'İV · payda' }] },
    ciz: (S, t, p) => {
      const oral = [[34, 163], [62, 138], [93, 111], [119, 109], [157, 121], [210, 140], [263, 152], [326, 158]];
      const iv = [[34, 46], [62, 71], [93, 91], [119, 105], [157, 120], [210, 136], [263, 148], [326, 156]];
      const secilen = p.yol === 'oral' ? oral : iv;
      return S.cizgi([[34, 163], ...secilen, [326, 163]], { dolgu: 'accent-soft', renk: 'accent-soft' }) +
        S.cizgi(p.yol === 'oral' ? iv : oral, { renk: 'muted', kesik: true }) +
        S.cizgi(secilen, { renk: 'accent', w: 3 }) +
        S.ok([[34, 163], [337, 163]], { renk: 'ink' }) + S.ok([[34, 163], [34, 35]], { renk: 'ink' }) +
        S.t(22, 22, 'Plazma konsantrasyonu', { c: 'b' }) + S.t(330, 191, 'Zaman', { a: 'end' });
    },
    metin: p => p.yol === 'oral'
      ? 'Boyanan oral alan, aynı dozlarda biyoyararlanım oranının payıdır. [[K3 s. 10–11]]'
      : 'Boyanan İV alan karşılaştırmanın paydasıdır, kesikli çizgi oral eğriyi gösterir. [[K3 s. 10–11]]'
  });
  VIZ.a02a_er = el => karsilastir(el, 'İlaç grubunu seçin', {
    'Propofol / lidokain': { yol: ['Hızlı alım', 'Gradyan korunur', 'Kan akımı belirleyici'], metin: 'Hücreye gelen ilaç hızla metabolize edilirken plazmada bağlı ilaçtan serbest fraksiyona geçiş sürer. [[K3 s. 12]]' },
    'Fenitoin / diazepam': { yol: ['Enzim doygunluğu', 'Gradyan küçülür', 'Ekstraksiyon azalır'], metin: 'Metabolizma kapasitesi aşılırsa hücre içindeki yüksek konsantrasyon yeni ilaç alımını sınırlar. [[K3 s. 12]]' },
    'Düşük kapasite ve düşük bağlanma': { yol: [['Düşük metabolik', 'kapasite'], ['Kan akımı veya', 'bağlanma değişse de'], ['Metabolize edilen', 'miktar değişmez']], metin: 'Bu grupta kan akımını ya da bağlanmayı değiştirmek metabolize edilen toplam miktarı etkilemez. [[K3 s. 12]]' }
  });
  VIZ.a02a_mukoza = el => karsilastir(el, 'Mukozayı seçin', {
    'Dilaltı / nazal / bukkal': { yol: ['Mukozadan emilim', 'Portal yol atlanır', ['Hızlı başlangıç', 'Yüksek biyoyararlanım']], metin: 'Sublingual, nazal ve bukkal uygulamada etki hızla başlar, portal dolaşım atlandığı için biyoyararlanım daha yüksektir. [[K3 s. 12]]' },
    Rektal: { yol: ['Rektal mukoza', 'Küçük yüzey alanı', ['Yavaş veya eksik', 'emilim olasılığı']], metin: 'Rektal yoldan ilk geçişten kaçınılabilir, ancak sınırlı yüzey nedeniyle emilim yavaş veya eksik olabilir. [[K3 s. 12]]' }
  });
  const ilacKonumu = [56, 132, 208];
  VIZ.a02a_kan = el => SEKIL.adim(el, {
    baslik: 'Doku ve dolaşım arasındaki geçiş', vb: [360, 144], vbDar: [360, 144], oto: false,
    ortak: (S, i) => {
      const renk = i === 2 ? 'crit' : 'accent';
      return S.kutu(14, 16, 128, 106, { dolgu: 'accent-soft' }) + S.kutu(218, 16, 128, 106, { dolgu: 'clin-soft' }) +
        S.t(78, 44, 'Doku', { a: 'middle', c: 'b' }) + S.t(282, 44, 'Plazma', { a: 'middle', c: 'b' }) +
        S.ok([[143, 76], [215, 76]], { renk, kesik: i === 0, soluk: i === 0 }) +
        S.kutu(ilacKonumu[i], 59, i === 2 ? 112 : 78, 34, { yazi: ['İlaç', 'Geçiş', 'Hızlı giriş'][i], renk, dolgu: 'paper' });
    },
    adimlar: [
      { ad: 'Akım düşük', metin: 'Sistemik hipotansiyon veya lokal vazokonstriksiyonda İM doz, kas yeniden kanlanana kadar emilmeyebilir. [[K3 s. 13]] Beklenen sürede etki görülmeyince ek doz verilebilir. [[K3 s. 13]]' },
      { ad: 'Akım döner', metin: 'Perfüzyon düzelince dokuda bekleyen ilaç dolaşıma geçer. [[K3 s. 13]]' },
      { ad: 'Sonuç', metin: 'İM dozlardan sonra plazma düzeyi birden toksik aralığa yükselebilir. [[K3 s. 13]] Subkütan dokuda emilmeden bekleyen doz da perfüzyon dönünce bolus etkisi yaratır. [[K3 s. 13]]' }
    ]
  });
  VIZ.a02a_deri = el => karsilastir(el, 'Hedefi seçin', {
    'Lokal etki': { yol: ['Deriye uygulama', 'Lokal etki', ['Steroid veya', 'lokal anestezik']], metin: 'Steroidler topikal etki, lokal anestezikler ise girişim öncesi deride anestezi için kullanılabilir. [[K3 s. 13]]' },
    'Sistemik etki': { yol: ['Transdermal bant', 'Yavaş, sabit salım', ['Sistemik etki', 'Fentanil / nitratlar']], metin: 'Fentanil ve nitratlar sistemik etki için deriden verilebilir. [[K3 s. 13]]' }
  });
  VIZ.a02a_akciger = el => SEKIL.sahne(el, {
    baslik: 'Damlacık boyutu ve hedef bölge', vb: [360, 213], vbDar: [360, 213],
    secenek: { id: 'cap', ad: 'Damlacık', liste: [{ d: 'kucuk', ad: '1 mikrondan küçük' }, { d: 'buyuk', ad: 'Daha büyük' }] },
    ciz: (S, t, p) => {
      const kucuk = p.cap === 'kucuk';
      const hedef = kucuk ? 166 : 88;
      return S.ok([[55, 26], [55, hedef]], { renk: 'accent', w: 4 }) +
        S.t(86, 30, 'İnhalasyon', { c: 'b' }) +
        S.kutu(79, 59, 262, 54, { yazi: 'Hava yolu mukozası', dolgu: kucuk ? 'paper' : 'accent-soft' }) +
        S.kutu(79, 139, 262, 54, { yazi: ['Alveol', 'Sistemik dolaşıma geçiş'], dolgu: kucuk ? 'accent-soft' : 'paper', soluk: !kucuk }) +
        S.daire(55, hedef, kucuk ? 4 : 9, { renk: 'accent', dolgu: 'accent' });
    },
    metin: p => p.cap === 'kucuk'
      ? 'Ultrasonik nebülizatörün oluşturabildiği 1 mikrondan küçük damlacıklar alveole ulaşıp sistemik dolaşıma geçebilir. [[K3 s. 14]]'
      : 'Büyük damlacık ve partiküller larenksten bronşiyollere uzanan mukozada kalır, sıklıkla farenksten yutulur ve alveole hemen hiç ulaşmaz. [[K3 s. 14]]'
  });
  VIZ.a02a_blok = el => karsilastir(el, 'Epidural çözeltiye eklenen madde', {
    'Sodyum bikarbonat': { yol: ['pH yükselir', 'Yüksüz fraksiyon artar', 'Başlangıç hızlanır'], metin: 'Bikarbonat eklenince zarı geçebilen lokal anestezik fraksiyonu büyür ve blok daha erken başlar. [[K3 s. 14–15]]' },
    'Adrenalin / felipressin': { yol: ['Vazokonstriksiyon', ['Epidural aralıktan', 'ilaç kaybı azalır'], 'Blok uzar'], metin: 'Adrenalin veya felipressin epidural aralıktan lokal anestezik kaybını azaltarak blok süresini uzatır. [[K3 s. 15]]' }
  });
})();
