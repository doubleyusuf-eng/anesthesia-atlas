(function () {
  'use strict';
  const VIZ = window.VIZ;
  const sec = (id, ad, list) => ({ id, ad, liste: list.map(([d, l]) => ({ d, ad: l })) });

  // 1) "Kara kutu" fizyolojik ölçüm zinciri (5 adım)
  VIZ.fk22_kara = (el) => SEKIL.adim(el, {
    baslik: 'Fizyolojik ölçümde “kara kutu” işlem zinciri',
    vb: [640, 220], vbDar: [360, 280], oto: false,
    adimlar: [
      { ad: 'Ölçülen & Sensör', metin: 'Ölçülen büyüklük (kan basıncı, sıcaklık vb.) fiziksel veya kimyasal süreçle sensöre/transdüsere etki ederek ham biyosinyal üretir. [[K6 s. 365–366]]',
        ciz: S => zincir(S, 0) },
      { ad: 'Yükseltme', metin: 'Küçük genlikli ham sinyal olabildiğince erken yükseltilir ki sonraki aşama gürültüsü sinyali bastırmasın. [[K6 s. 369]]',
        ciz: S => zincir(S, 1) },
      { ad: 'Filtreleme', metin: 'İstenmeyen gürültü ve girişim süzülerek sinyal A–D dönüşümüne hazırlanır (koşullandırma). [[K6 s. 366–368]]',
        ciz: S => zincir(S, 2) },
      { ad: 'A–D Dönüşüm', metin: 'Analog dalga biçimi A–D dönüştürücü ile 0 ve 1’lerden oluşan sayısal verilere dönüştürülür. [[K6 s. 371]]',
        ciz: S => zincir(S, 3) },
      { ad: 'İşleme & Gösterim', metin: 'Mikroişlemci algoritması (gerekirse kalibrasyonla) klinik değeri hesaplar; veri saklanır, gösterilir ve ağdan iletilir. [[K6 s. 366]]',
        ciz: S => zincir(S, 4) },
    ],
  });
  function zincir(S, aktif) {
    const adlar = [['Sensör /', 'Transdüser'], ['Yükseltici', '(Kazanç)'], ['Filtre', '(Gürültü ↓)'], ['A–D', 'Dönüştürücü'], ['Algoritma &', 'Gösterim']];
    if (S.dar) {
      const mx = S.w / 2;
      return adlar.map(([a, b], i) => {
        const y = 8 + i * 54;
        return (i ? S.ok([[mx, y - 12], [mx, y - 1]], { renk: 'muted' }) : '')
          + S.kutu(32, y, S.w - 64, 40, { renk: i === aktif ? 'accent' : 'line', dolgu: i === aktif ? 'accent-soft' : 'paper', yazi: `${a} ${b}` });
      }).join('');
    }
    return adlar.map(([a, b], i) => {
      const x = 14 + i * 124;
      return (i ? S.ok([[x - 16, 110], [x - 2, 110]], { renk: 'muted' }) : '')
        + S.kutu(x, 72, 108, 76, { renk: i === aktif ? 'accent' : 'line', dolgu: i === aktif ? 'accent-soft' : 'paper', yazi: [a, b] });
    }).join('');
  }

  // 2) Sistemlere göre transdüser ve ölçüm aralıkları
  VIZ.fk22_transduser = (el) => SEKIL.sahne(el, {
    baslik: 'Fizyolojik sistemlere göre transdüser örnekleri',
    vb: [640, 260], vbDar: [360, 290],
    secenek: sec('sis', 'Sistem', [
      ['kvs', 'Kardiyovasküler'],
      ['sol', 'Solunum'],
      ['dig', 'Diğer sinyaller'],
    ]),
    ciz(S, t, { sis }) {
      const veri = {
        kvs: [
          ['Arteriyel KB (30–300 mmHg)', 'Yarı iletken gerinim ölçer'],
          ['Venöz KB (−5 ile +20 mmHg)', 'Yarı iletken gerinim ölçer'],
          ['Kan akımı (0–300 mL·s⁻¹)', 'Elektromanyetik / Doppler'],
          ['Kalp debisi (0,5–25 L·dk⁻¹)', 'Termodilüsyon yöntemi'],
        ],
        sol: [
          ['Solunum hızı (5–50/dk)', 'Termistör / CO₂ / gerinim ölçer'],
          ['Akım hızı (0–10 L·s⁻¹)', 'Fleisch pnömotakografı'],
          ['Ekspire CO₂ (%2,5–9,0)', 'Kızılötesi (IR) sensör'],
          ['PCO₂ (2–9 kPa) / PO₂ (6–18 kPa)', 'Severinghaus / Clark elektrodu'],
        ],
        dig: [
          ['Santral sıcaklık (20–40 °C)', 'Termokupl veya termistör prob'],
          ['Deri sıcaklığı (12–38 °C)', 'Deri termokuplu / termistörü'],
          ['Galvanik deri direnci (1–500 kΩ)', 'Yüzey elektrotları'],
          ['EKG (transdüser gerekmez)', 'Elektriksel sinyal'],
        ],
      }[sis];
      return veri.map(([a, b], i) => {
        const y = 18 + i * (S.dar ? 66 : 58);
        return S.kutu(24, y, S.w - 48, S.dar ? 56 : 48, { renk: i % 2 ? 'basic' : 'accent', dolgu: i % 2 ? 'basic-soft' : 'accent-soft', yazi: S.dar ? [a, b] : `${a}  →  ${b}` });
      }).join('');
    },
    metin: ({ sis }) => ({
      kvs: 'Kardiyovasküler ölçümlerde basınçlar gerinim ölçerle, satürasyon PPG’den, kalp hızı PPG, EKG veya arter basınç dalgasından türetilebilir. [[K6 s. 367]]',
      sol: 'Solunum ölçümlerinde akım pnömotakografla, ekspire CO₂ kızılötesi sensörle, pH cam elektrotla, PCO₂ Severinghaus ve PO₂ Clark elektroduyla ölçülür. [[K6 s. 367–368]]',
      dig: 'Sıcaklıkta termokupl/termistör, deri direncinde yüzey elektrotları kullanılır; EKG zaten elektriksel olduğundan transdüser istemez. [[K6 s. 367–368]]',
    })[sis],
  });

  VIZ.fk22_prob = (el) => SEKIL.cizim(el, {
    baslik: 'Geçirimli fotopletismografi probu',
    giris: 'İki yayıcıyı ve fotodiyodu bulmak için numaraları seçin. [[K6 s. 367]]',
    gorunumler: [{ ad: 'Açık prob', resim: 'img/fizik/22-optik-prob.webp', en: 1024, boy: 512,
      noktalar: [
        { x: 566, y: 190, ad: 'Birinci yayıcı', metin: 'Probun ışık veren iki elemanından biridir. [[K6 s. 367]]' },
        { x: 723, y: 170, ad: 'İkinci yayıcı', metin: 'İkinci yayıcı da optik ölçüm için ışık sağlar. [[K6 s. 367]]' },
        { x: 627, y: 387, ad: 'Fotodiyot', metin: 'Geçirimli probda iletilen ışığı karşı taraftaki fotodiyot algılar. [[K6 s. 367]]' },
      ] }],
  });

  const sayi = n => n.toLocaleString('tr-TR', { maximumFractionDigits: 2 });
  VIZ.fk22_kazanc = (el) => SEKIL.sahne(el, {
    baslik: 'Yükselticinin giriş ve çıkış genlikleri',
    vb: [640, 182], vbDar: [360, 182],
    secenek: sec('g', 'Gerilim kazancı', [['2', 'Kazanç 2'], ['1000', 'Kazanç 1000']]),
    param: [{ id: 'v', ad: 'EKG giriş genliği', min: 0.1, max: 5, adim: 0.1, deger: 1, birim: 'mV' }],
    ciz(S, t, { v, g }) {
      const gen = S.w - 64;
      const satir = (y, baslik, oran, renk) => S.t(32, y, baslik, { c: 'b' })
        + S.kutu(32, y + 10, gen, 18, { dolgu: 'chip' })
        + S.kutu(32, y + 10, gen * oran, 18, { renk, dolgu: renk, r: 0 });
      return satir(36, 'Giriş · ' + sayi(v) + ' mV', v / 5, 'basic')
        + satir(108, 'Çıkış · ' + sayi(v * g) + ' mV', v * g / 5000, 'accent');
    },
    metin: ({ v, g }) => 'Çıkış = ' + g + ' × ' + sayi(v) + ' mV = <b>' + sayi(v * g) + ' mV</b>. [[K6 s. 368–369]] Giriş çubuğunun tam ölçeği 5 mV, çıkışınki 1000 × 5 mV’tur. [[K6 s. 369–371]]',
  });

  const bantlar = { emg: [7, 20], ekg: [0.5, 40], eeg: [1, 20] };
  VIZ.fk22_filtre = (el) => SEKIL.grafik(el, {
    baslik: 'İdeal bant geçiren filtrenin frekans yanıtı',
    vb: [640, 268], vbDar: [360, 268],
    x: { min: 0, max: 60, ad: 'Frekans (Hz)', adimlar: [0, 7, 20, 40, 50, 60] },
    y: { min: 0, max: 1, ad: 'Kazanç', adimlar: [0, 1] },
    secenek: sec('sinyal', 'Biyosinyal', [['emg', 'EMG'], ['ekg', 'EKG'], ['eeg', 'EEG']]),
    param: [{ id: 'hz', ad: 'Sınanan frekans', min: 0, max: 60, adim: 0.5, deger: 50, birim: 'Hz' }],
    ek(S, { sinyal, hz }, X, Y) {
      const [a, b] = bantlar[sinyal];
      return S.cizgi([[0,0],[a,0],[a,1],[b,1],[b,0],[60,0]].map(([x,y]) => [X(x), Y(y)]), { renk: 'accent', w: 3 })
        + S.cizgi([[X(hz), Y(0)], [X(hz), Y(1)]], { renk: 'muted', kesik: true })
        + S.daire(X(hz), Y(hz >= a && hz <= b ? 1 : 0), 6, { dolgu: 'clin' });
    },
    okuma: ({ sinyal, hz }) => {
      const [a, b] = bantlar[sinyal];
      return sinyal.toLocaleUpperCase('tr-TR') + ' bandı ' + sayi(a) + '–' + b + ' Hz: ' + sayi(hz) + ' Hz ' +
        (hz >= a && hz <= b ? 'geçiş bandında (kazanç 1)' : 'durdurma bandında (kazanç 0)') + '. [[K6 s. 370–371]]';
    },
  });

  // Her seçenekte kısa etiketler SVG içinde, açıklama ise yeniden akabilen HTML içinde kalır.
  function yol(el, baslik, yollar) {
    return SEKIL.sahne(el, {
      baslik, vb: [640, 220], vbDar: [360, 220],
      secenek: sec('yol', baslik, yollar.map(([id, ad]) => [id, ad])),
      ciz(S, t, p) {
        const [, , adimlar] = yollar.find(([id]) => id === p.yol);
        return adimlar.map((ad, i) => {
          const y = 8 + i * 76;
          return (i ? S.ok([ [S.w / 2, y - 24], [S.w / 2, y - 3] ], { renk: 'muted' }) : '')
            + S.kutu(35, y, S.w - 70, 50, { yazi: ad, renk: i === 2 ? 'accent' : 'basic', dolgu: i === 2 ? 'accent-soft' : 'basic-soft' });
        }).join('');
      },
      metin: p => yollar.find(([id]) => id === p.yol)[3],
    });
  }
  VIZ.fk22_ad = (el) => yol(el, 'Kayıt yolu', [
    ['plak', 'Plak', ['Ses → mikrofon', 'Elektriksel dalga', 'Plak oluğu'], 'Plak oluğunun biçimi ses dalgasını temsil eder; ses bandında aynı bilgiyi manyetik parçacıkların konumu taşır. [[K6 s. 371]]'],
    ['muzik', 'Sayısal müzik', ['Elektriksel dalga', 'A–D → ikili sayı dizisi', 'Disk veya veri paketleri'], 'Sayı dizisi diske kaydedilebilir, çevrim içi mağazadan mobil ağ üzerinden telefona gönderilebilir. [[K6 s. 371–372]]'],
    ['ppg', 'Puls oksimetre', ['Optik nabız dalgası', 'A–D → sayısal veri', 'Algoritma → satürasyon'], 'Cihazdaki yazılım dalganın sayısal karşılığından oksijen satürasyonunu hesaplar. [[K6 s. 372]]'],
  ]);
  VIZ.fk22_ekran = (el) => yol(el, 'Işık ve görüntü', [
    ['lcd', 'LCD', ['Arka aydınlatma', 'Sıvı kristal ve filtre', 'Renkli görüntü'], 'Gerilimle saydamlaşan kristal, filtre ve arka ışıkla parlak bir görüntü sağlar. [[K6 s. 374]]'],
    ['led', 'LED', ['Elektronik devre', 'Kırmızı, mavi ve yeşil diyotlar', 'Piksel ışığı'], 'Devre diyotları açıp kapatır; küçük ve verimli diyotlarla yüksek kaliteli görüntü elde edilir. [[K6 s. 373]]'],
    ['oled', 'OLED', ['İnce hidrokarbon filmler', 'Organik katmanda ışık üretimi', 'Derin kontrast'], 'OLED’in yüksek çözünürlük ve derin kontrastına düşük güç tüketimi eşlik eder. [[K6 s. 374]]'],
    ['plazma', 'Plazma', ['Yeterli gerilim', 'Gaz ceplerinde ışık üretimi', 'Ekran görüntüsü'], 'Plazma ekranın maliyeti görece düşüktür; çözünürlük, ağırlık ve güç tüketimi açısından dezavantajları vardır. [[K6 s. 373]]'],
  ]);
  VIZ.fk22_bilgisayar = (el) => yol(el, 'Bilginin yönü', [
    ['klavye', 'Klavye', ['Kullanıcı tuşa basar', 'Klavye veri gönderir', 'Bilgisayar alır'], 'Giriş aygıtında bilgi bilgisayara doğru akar. [[K6 s. 372]]'],
    ['ekran', 'Monitör', ['Bilgisayar sinyal verir', 'Monitör görüntü oluşturur', 'Kullanıcı görür'], 'Çıkış aygıtında bilgi bilgisayardan çevre birimine gider. [[K6 s. 372]]'],
    ['dokun', 'Dokunma', ['Kullanıcı ekrana dokunur', 'Dokunmatik monitör', 'Bilgisayar veri alır'], 'Aynı monitör dokunmayı iletirken giriş, görüntüyü gösterirken çıkış işlevi görür. [[K6 s. 372]]'],
  ]);
  VIZ.fk22_ag = (el) => yol(el, 'Bağlantı türü', [
    ['eth', 'Ethernet', ['Hasta monitörü', 'Kablolu yerel ağ', 'Merkezî monitör'], 'Yerel ağ üzerinden fizyolojik veri gerçek zamanlı izlenebilir. [[K6 s. 374]]'],
    ['wifi', 'Wi-Fi', ['Ağdaki cihaz', '2–5 GHz · yaklaşık 20 m', 'Yerel ağ'], 'Wi-Fi birden çok cihazı bağlar; ortak frekanslarda Bluetooth ile girişim olabilir. [[K6 s. 374–375]]'],
    ['bt', 'Bluetooth', ['Birinci cihaz', '2,402–2,480 GHz · yaklaşık 10 m', 'Eşlenen cihaz'], 'Bluetooth iki cihazı kablo olmadan eşleştirir; zayıf bağlantıda aktarım hızı ve sinyal kalitesi düşer. [[K6 s. 374–375]]'],
    ['ble', 'Bluetooth LE', ['Giyilebilir glukoz monitörü', 'Seyrek ve küçük veri paketleri', 'Eşlenen cihaz'], 'Küçük paketlerin seyrek gönderimi düşük tüketim sağlar; bu aktarım biçimi sese uygun değildir. [[K6 s. 375]]'],
  ]);
  VIZ.fk22_kayit = (el) => yol(el, 'Kayda erişim', [
    ['emr', 'EMR', ['Hastanın tıbbi notları', 'Hastane iç ağı', 'Yetkili kullanıcı'], 'Yetkili kişiler hasta notlarını hastanenin intraneti üzerinden görüntüleyebilir. [[K6 s. 375]]'],
    ['ehr', 'EHR', ['Kişisel sağlık belgesi', 'Güvenli saklama ve şifreleme', 'Kurumlar arası erişim'], 'EHR farklı yerlerden erişime ve kurumların iş birliğine olanak verir. [[K6 s. 375–376]]'],
  ]);
})();
