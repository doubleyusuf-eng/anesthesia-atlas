(function () {
  'use strict';
  const VIZ = window.VIZ;
  const orta = { a: 'middle', c: 'b' };
  const sahne = (el, baslik, ayar) => SEKIL.sahne(el, { baslik, vb: [560, 222], vbDar: [360, 222], ...ayar });
  const sec = (ad, adlar) => ({ id: 'secim', ad, liste: adlar.map(ad => ({ d: ad, ad })) });
  const satir = (S, y, yazi, vurgu) => S.kutu(20, y, S.w - 40, 42, {
    yazi, dolgu: vurgu ? 'accent-soft' : 'paper', renk: vurgu ? 'accent' : 'line',
  });
  function akis(S, ust, ortaYazi, alt) {
    const x = S.w / 2;
    return satir(S, 8, ust) + S.ok([[x, 51], [x, 72]], { renk: 'accent' }) +
      satir(S, 75, ortaYazi, true) + S.ok([[x, 118], [x, 139]], { renk: 'accent' }) + satir(S, 142, alt);
  }
  const tr = n => n.toLocaleString('tr-TR', { maximumFractionDigits: 1 });
  VIZ.fk29_hata = el => sahne(el, 'Tekrarlı ölçüm ve referans', {
    secenek: sec('Hata türü', ['Rastgele', 'Sistematik']),
    ciz(S, t, p) {
      const x = S.w / 2, kayma = p.secim === 'Sistematik';
      const dx = kayma ? [68, 68, 68, 68, 68] : [-45, 32, -16, 44, -15];
      return S.t(x, 23, 'Kabul edilen değer', orta) +
        S.cizgi([[x, 34], [x, 176]], { renk: 'muted', kesik: true }) +
        dx.map((d, i) => S.daire(x + d, 48 + i * 28, 6, { dolgu: 'accent', renk: 'accent' })).join('') +
        S.ok([[26, 182], [S.w - 26, 182]]) + S.t(x, 210, 'Ölçülen değer', orta);
    },
    metin: p => p.secim === 'Rastgele' ? 'Tekrarlar referansın iki yanında dağılır, sapmanın yönü değişir. [[K6 s. 453]]' :
      'Her tekrar aynı miktarda sağa kaymıştır; sonuçların birbiriyle uyumu doğru ölçüm yapıldığını göstermez. [[K6 s. 453]]',
  });
  const yollar = {
    'Kesitsel': ['Topluluk', 'Aynı anda ölçüm', 'Hastalık prevalansı', 'Yaş, cinsiyet ve hastalık aynı kesitte karşılaştırılabilir. [[K6 s. 454]]'],
    'Olgu-kontrol': ['Hastalık var / yok', 'Geçmişe bakış', 'Önceki maruziyet', 'Seçim sonuçtan başlar ve inceleme geçmişe yönelir. [[K6 s. 454]]'],
    'Kohort': ['Maruziyet veya işlem', 'Genellikle ileriye izlem', 'Yeni olgular', 'Başlangıçtaki grupta yeni hastalıkların insidansı doğrudan hesaplanabilir. [[K6 s. 454]]'],
    'Randomize': ['Katılımcılar', 'Rastgele atama', 'Müdahale ve kontrol sonuçları', 'İyi tasarım ve rastgele atama neden-sonuç ilişkisinin değerlendirilmesini güçlendirir. [[K6 s. 455]]'],
  };
  VIZ.fk29_tasarim = el => sahne(el, 'Araştırma tasarımının zaman yönü', {
    secenek: sec('Araştırma tasarımı', Object.keys(yollar)),
    ciz: (S, t, p) => akis(S, ...yollar[p.secim]), metin: p => yollar[p.secim][3],
  });
  VIZ.fk29_olum = el => sahne(el, 'Mortalite oranının ölçeği', {
    secenek: sec('Ölçek', ['SMR', 'HSMR']),
    ciz(S, t, p) {
      const x = S.w / 2, hastane = p.secim === 'HSMR';
      return S.t(x, 51, hastane ? 'Hastanede gözlenen ölümler' : 'Gözlenen ölümler', orta) +
        S.cizgi([[45, 66], [S.w - 45, 66]], { renk: 'accent' }) + S.t(x, 94, 'Beklenen ölümler', orta) +
        S.ok([[x, 107], [x, 137]]) + satir(S, 149, hastane ? 'Oranı 100 ile çarp → HSMR' : 'Oranı doğrudan oku → SMR', true);
    },
    metin: p => p.secim === 'SMR' ? 'Gözlenen ve beklenen ölümler eşitse SMR = 1 olur. [[K6 s. 455]]' :
      'Hastanede gözlenen ve beklenen ölümler eşitse HSMR = 100 olur. [[K6 s. 455–456]]',
  });
  VIZ.fk29_kanit = el => sahne(el, 'Sistematik derleme ve meta-analiz', {
    ciz: S => akis(S, 'Aynı sağlık sorunu', 'Kapsamlı tarama ve derleme', 'Meta-analiz → ortak etki tahmini'),
    metin: () => 'Kapsamlı arama sistematik derlemenin parçasıdır, meta-analiz ise bulguların istatistiksel sentezidir. [[K6 s. 456]]',
  });
  const veriler = {
    'Sürekli': ['Ağırlık', '120 kg / 40 kg', 'Kütle oranı = 3', 'Ağırlık ölçümlerinde büyüklüklerin oranı yorumlanabilir. [[K6 s. 457]]'],
    'Kesikli': ['Yıllık izin', 'Günleri say', 'Tam sayı', 'Kitabın izin günü örneğinde kayıt yalnız tam sayı alır. [[K6 s. 457]]'],
    'Nominal': ['Kan grubu', 'ABO kategorisi', 'Sıralama yok', 'Bir kan grubu diğerinden büyük ya da küçük değildir. [[K6 s. 457]]'],
    'Ordinal': ['Wong–Baker ağrı yüzleri', '4 puandan 2 puana', 'Azalma = 2 puan', 'Puan yarıya inse de ağrı şiddetinin yarıya indiği söylenemez. [[K6 s. 457–458]]'],
    'İkili': ['Yaşam durumu', 'Sağ / ölü', 'İki olası sonuç', 'Dikotom değişken iki seçenekten birini alır. [[K6 s. 458]]'],
  };
  VIZ.fk29_veri = el => sahne(el, 'Verinin türü ve işlemin anlamı', {
    secenek: sec('Veri türü', Object.keys(veriler)), ciz: (S, t, p) => akis(S, ...veriler[p.secim]), metin: p => veriler[p.secim][3],
  });
  const dagilimlar = {
    'Simetrik': [[14, 35, 65, 94, 118, 94, 65, 35, 14], 'Merkezin iki yanındaki sıklıklar birbirini yansıtır. [[K6 s. 459]]'],
    'Sağa çarpık': [[45, 118, 100, 68, 44, 28, 16, 10, 5], 'Yüksek değerler tarafındaki uzun kuyruk pozitif çarpıklığa işaret eder. [[K6 s. 459]]'],
    'Sola çarpık': [[5, 10, 16, 28, 44, 68, 100, 118, 45], 'Düşük değerler tarafındaki uzun kuyruk negatif çarpıklığa işaret eder. [[K6 s. 459]]'],
    'İki tepeli': [[12, 55, 118, 62, 29, 50, 103, 65, 14], 'İki ayrı sıklık tepesi bimodal dağılımı gösterir. [[K6 s. 459]]'],
    'Çok tepeli': [[36, 111, 47, 32, 93, 38, 30, 104, 27], 'Üç ayrı sıklık tepesi multimodal dağılımı gösterir. [[K6 s. 459]]'],
  };
  VIZ.fk29_dagilim = el => sahne(el, 'Dağılımın tepeleri ve kuyrukları', {
    secenek: sec('Dağılım biçimi', Object.keys(dagilimlar)),
    ciz(S, t, p) {
      const h = dagilimlar[p.secim][0], w = (S.w - 64) / h.length;
      return S.t(24, 26, 'Sıklık') + h.map((y, i) => S.kutu(32 + i * w, 170 - y, w - 1, y,
        { r: 0, dolgu: 'accent-soft', renk: 'accent' })).join('') +
        S.ok([[22, 171], [S.w - 16, 171]]) + S.t(S.w / 2, 203, 'Ölçülen değer', orta);
    },
    metin: p => dagilimlar[p.secim][1],
  });
  VIZ.fk29_kutu = el => sahne(el, 'Kutu-bıyık grafiğinin okunması', {
    secenek: sec('Gösterilecek öğe', ['Aralık', 'Alt çeyrek', 'Medyan', 'Üst çeyrek']),
    ciz(S, t, p) {
      const konum = { 'Alt çeyrek': 0.31, 'Medyan': 0.48, 'Üst çeyrek': 0.69 };
      const x = f => 24 + (S.w - 48) * f;
      const dik = (f, y, h, renk) => S.cizgi([[x(f), y], [x(f), y + h]], { renk });
      const kutu = S.cizgi([[x(0), 108], [x(1), 108]]) + dik(0, 93, 30) + dik(1, 93, 30) +
        S.kutu(x(0.31), 76, x(0.69) - x(0.31), 64, { r: 1, dolgu: 'basic-soft' }) + dik(0.48, 76, 64, 'ink');
      if (p.secim === 'Aralık') return kutu + S.ok([[x(0), 160], [x(1), 160]], { cift: true, renk: 'accent' }) +
        S.t(S.w / 2, 190, 'En küçükten en büyüğe', orta);
      const yer = x(konum[p.secim]);
      return kutu + S.ok([[yer, 48], [yer, 72]], { renk: 'accent' }) + S.t(yer, 33, p.secim, orta);
    },
    metin: p => ({
      'Aralık': 'Kitaptaki gösterimde bıyıkların uçları veri aralığını belirtir. [[K6 s. 458–459]]',
      'Alt çeyrek': 'Gözlemlerin dörtte biri alt çeyreğin altında yer alır. [[K6 s. 458]]',
      'Medyan': 'Kutu içindeki çizgi sıralanmış gözlemlerin ortancasını işaretler. [[K6 s. 453]] [[K6 s. 458–459]]',
      'Üst çeyrek': 'Gözlemlerin dörtte biri üst çeyreğin üzerinde yer alır. [[K6 s. 458]]',
    })[p.secim],
  });
  VIZ.fk29_normal = el => sahne(el, 'Normal eğride standart sapma ve alan', {
    param: [{ id: 'ss', ad: 'Ortalamadan uzaklık', min: 1, max: 3, adim: 1, deger: 1, birim: 'SS' }],
    ciz(S, t, p) {
      const x = z => S.w / 2 + z * (S.w - 50) / 7;
      const nokta = z => [x(z), 165 - 117 * Math.exp(-z * z / 2)];
      const yay = (a, b) => Array.from({ length: 101 }, (_, i) => nokta(a + (b - a) * i / 100));
      return S.cizgi([[x(-p.ss), 165], ...yay(-p.ss, p.ss), [x(p.ss), 165]], { dolgu: 'accent-soft', renk: 'accent-soft' }) +
        S.cizgi(yay(-3.5, 3.5), { renk: 'accent', w: 3 }) + S.cizgi([[15, 165], [S.w - 15, 165]]) +
        [-p.ss, p.ss].map(z => S.cizgi([[x(z), 165], nokta(z)], { renk: 'muted', kesik: true }) +
          S.t(x(z), 190, (z < 0 ? '−' : '+') + p.ss + ' SS', orta)).join('') +
        S.t(S.w / 2, 190, 'μ', orta) + S.t(S.w / 2, 28, ['%68', '%95,4', '%99,7'][p.ss - 1], orta);
    },
    metin: p => ['Ortalamadan bir SS uzaklığa kadar iki yönde gözlemlerin yaklaşık %68’i bulunur. [[K6 s. 460]]',
      'İki SS yaklaşık %95,4’ü kapsar; merkezî %95’in sınırı ±1,96 SS’dir. [[K6 s. 460–461]]',
      'Üç SS içindeki alan gözlemlerin yaklaşık %99,7’sini kapsar. [[K6 s. 460]]'][p.ss - 1],
  });
  VIZ.fk29_karar = el => sahne(el, 'Hipotez kararı ve gerçek durum', {
    secenek: sec('Gerçek durum', ['Fark yok', 'Fark var']),
    ciz: (S, t, p) => satir(S, 8, p.secim === 'Fark yok' ? 'H₀ doğru' : 'H₀ yanlış', true) +
      satir(S, 78, p.secim === 'Fark yok' ? 'H₀ reddedilirse → Tip I hata' : 'H₀ reddedilirse → Doğru karar') +
      satir(S, 148, p.secim === 'Fark yok' ? 'H₀ reddedilmezse → Doğru karar' : 'H₀ reddedilmezse → Tip II hata'),
    metin: p => p.secim === 'Fark yok' ? 'Gerçekte etki yokken etki bildirmek yanlış pozitiftir. [[K6 s. 463–464]]' :
      'Gerçekte etki varken onu saptayamamak yanlış negatiftir. [[K6 s. 463–464]]',
  });
  VIZ.fk29_guc = el => sahne(el, 'Hedef süre ve örneklem büyüklüğü', {
    param: [{ id: 'gun', ad: 'Hedef süre', min: 90, max: 98, adim: 8, deger: 90, birim: 'gün' }],
    ciz: (S, t, p) => akis(S, 'Mevcut program: 100 gün', 'Klinik fark: ' + (100 - p.gun) + ' gün',
      p.gun === 90 ? 'Gereken toplam: 98 kişi' : 'Gereken toplam: 2474 kişi'),
    metin: p => p.gun === 90 ? 'On günlük fark için her kola en az 49 kişi gerekir. [[K6 s. 470–471]]' :
      'İki günlük farkı yakalamak için gereken örneklem 2474 kişiye yükselir. [[K6 s. 471]]',
  });
  VIZ.fk29_inhaler = el => sahne(el, 'PEFR değişiminde ortalama ve bir standart sapma', {
    secenek: sec('Deneme sonucu', ['Belirgin ayrışma', 'Örtüşme']),
    ciz(S, t, p) {
      const x = v => 29 + (v + 25) / 145 * (S.w - 58);
      const seri = p.secim === 'Örtüşme' ? [[10, 20], [5, 30]] : [[100, 20], [2, 20]];
      return seri.map(([m, ss], i) => {
        const y = 70 + i * 92, renk = i ? 'clin' : 'accent';
        return S.t(18, y - 30, (i ? 'Plasebo' : 'İlaç') + ' · ortalama ' + m + ' (SS ' + ss + ')') +
          S.cizgi([[x(m - ss), y], [x(m + ss), y]], { renk, w: 4 }) +
          [m - ss, m + ss].map(v => S.cizgi([[x(v), y - 8], [x(v), y + 8]], { renk }) + S.t(x(v), y + 27, String(v), orta)).join('') +
          S.daire(x(m), y, 6, { dolgu: renk, renk });
      }).join('');
    },
    metin: p => p.secim === 'Örtüşme' ? 'Kontrol grubunun yayılımı daha geniştir ve fark yalnız beş puandır (p = 0,16). [[K6 s. 467]]' :
      'İki grupta yayılım aynı, ortalamalar arası fark 98 puandır (p &lt; 0,0001). [[K6 s. 466–467]]',
  });
  VIZ.fk29_sprey = el => sahne(el, 'Foklarda saldırı riski', {
    secenek: sec('Toplam örneklem', ['20 000 fok', '100 fok']),
    ciz(S, t, p) {
      const buyuk = p.secim === '20 000 fok';
      return (buyuk ? [[680, 10000], [600, 10000]] : [[4, 50], [2, 50]]).map(([olay, n], i) => {
        const risk = 100 * olay / n, y = 50 + 85 * i;
        return S.t(20, y - 12, (i ? 'Sprey' : 'Plasebo') + ' · ' + tr(olay) + ' / ' + tr(n) + ' = %' + tr(risk)) +
          S.kutu(20, y, S.w - 40, 20, { dolgu: 'chip', r: 3 }) +
          S.kutu(20, y, (S.w - 40) * risk / 8, 20, { dolgu: i ? 'clin' : 'accent', r: 3 });
      }).join('') + S.t(20, 199, '%0') + S.t(S.w - 20, 199, '%8', { a: 'end' });
    },
    metin: p => p.secim === '100 fok' ? 'Yüzde farkı daha büyük görünse de küçük örneklemde p = 0,4’tür. [[K6 s. 469]]' :
      'Her gruptaki saldırıları o grubun toplamına bölünce %6,8 ve %6,0 bulunur (kitapta p = 0,02). [[K6 s. 468–469]]',
  });
  VIZ.fk29_kulak = el => sahne(el, 'Kulak çalışmasında analiz sırası', {
    ciz: S => akis(S, 'Kulak uzunluğu ve boy', 'Kulak uzunluğunu boya göre düzelt', 'Yaş ile korelasyon: r = 0,6'),
    metin: () => 'Boya göre düzeltmeden sonra da yaş ile kulak uzunluğu arasındaki ilişki pozitiftir. [[K6 s. 469–470]]',
  });
  const olculer = {
    'Duyarlılık': [0, 2, 'Tüpünü çekenler', 471],
    'Özgüllük': [3, 1, 'Tüpünü çekmeyenler', 471],
    'PPV': [0, 1, 'Deliryumu olanlar', '471–472'],
    'NPV': [3, 2, 'Deliryumu olmayanlar', '471–472'],
  };
  const hucre = [30, 20, 5, 45];
  VIZ.fk29_tup = el => sahne(el, 'Deliryum ve tüp çekilmesi çapraz tablosu', {
    secenek: sec('Hesaplanacak ölçü', Object.keys(olculer)),
    ciz(S, t, p) {
      const [pay, diger] = olculer[p.secim], left = 118, w = (S.w - left - 14) / 2;
      let svg = S.t(left + w / 2, 33, 'Tüpü çekti', orta) + S.t(left + 1.5 * w, 33, 'Çekmedi', orta) +
        S.t(8, 83, 'Deliryum var') + S.t(8, 147, 'Deliryum yok');
      hucre.forEach((n, i) => {
        const x = left + (i % 2) * w, y = 51 + Math.floor(i / 2) * 64, secili = i === pay || i === diger;
        svg += S.kutu(x, y, w - 4, 52, { yazi: String(n), renk: secili ? 'accent' : 'line', dolgu: secili ? 'accent-soft' : 'paper' });
        if (i === pay) svg += S.kutu(x + 4, y + 4, w - 12, 44, { dolgu: 'none', renk: 'accent' });
      });
      return svg + S.t(S.w / 2, 202, 'Payda: ' + olculer[p.secim][2], orta);
    },
    metin(p) {
      const [pay, diger, , sayfa] = olculer[p.secim], a = hucre[pay], b = hucre[diger];
      return p.secim + ' = ' + a + ' / (' + a + ' + ' + b + ') ≈ %' + tr(100 * a / (a + b)) + '. [[K6 s. ' + sayfa + ']]';
    },
  });
})();
