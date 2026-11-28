(function () {
  'use strict';
  const VIZ = window.VIZ;
  const sayi = (v, basamak = 2) => v.toLocaleString('tr-TR', { maximumFractionDigits: basamak });
  const sicaklik = { id: 't', ad: 'Su sıcaklığı', min: 15, max: 16, adim: 0.1, deger: 16, birim: '°C' };
  const ozisi = { su: 4.18, demir: 0.450 };
  VIZ.fk04a_isi = (el) => SEKIL.grafik(el, {
    baslik: 'Bir gram maddeyi ısıtmak', vb: [560, 280], vbDar: [340, 255],
    x: { min: 15, max: 16, ad: 'Son sıcaklık (°C)', adimlar: [15, 15.5, 16] },
    y: { min: 0, max: 4.18, ad: 'Isı (J)', adimlar: [0, 4.18] },
    secenek: { id: 'madde', ad: 'Madde', liste: [{ d: 'su', ad: 'Su' }, { d: 'demir', ad: 'Demir' }] },
    param: [{ ...sicaklik, ad: 'Son sıcaklık' }],
    egriler: [{ f: (t, p) => ozisi[p.madde] * (t - 15) }],
    noktalar: (p) => [{ x: p.t, y: ozisi[p.madde] * (p.t - 15) }],
    okuma: (p) => 'Başlangıç 15 °C iken 1 g ' + (p.madde === 'su' ? 'su' : 'demir') +
      ' için gereken ısı ' + sayi(ozisi[p.madde]) + ' × ' + sayi(p.t - 15) + ' = <b>' +
      sayi(ozisi[p.madde] * (p.t - 15), 3) + ' J</b> olur. [[K6 s. 57]]',
  });

  VIZ.fk04a_olcek = (el) => SEKIL.sahne(el, {
    baslik: 'Aynı sıcaklığı üç ölçekte okuyun', vb: [480, 170], vbDar: [330, 170],
    param: [{ id: 't', ad: 'Sıcaklık', min: 0, max: 100, deger: 50, adim: 1, birim: '°C' }],
    ciz: (S, t, p) => {
      const sag = S.w - 40, sol = 40, x = sol + (sag - sol) * p.t / 100;
      return [ [0, 100, '°C'], [273, 373, 'K'], [32, 212, '°F']].map(([alt, ust, birim], i) => {
        const y = 35 + i * 51;
        return S.cizgi([ [sol,y],[sag,y]], { renk: 'line', w: 5 }) +
          S.daire(x, y, 6, { dolgu: 'accent', renk: 'accent' }) +
          S.t(sol, y - 11, alt + ' ' + birim, { a: 'middle' }) +
          S.t(sag, y - 11, ust + ' ' + birim, { a: 'middle' });
      }).join('');
    },
    metin: (p) => '<b>' + p.t + ' °C</b> yaklaşık ' + (p.t + 273) + ' K ve ' + sayi(32 + 1.8 * p.t) + ' °F karşılığıdır. [[K6 s. 58–59]]',
  });

  VIZ.fk04a_termometre = (el) => SEKIL.cizim(el, {
    baslik: 'Cam tüp içinde sıvı genleşmesi',
    giris: 'Sıvıyı, sütunun ucunu ve cam tüpü seçin. [[K6 s. 58]]',
    gorunumler: [{ ad: 'Yandan kesit', resim: 'img/fizik/04a-termometre.webp', en: 1024, boy: 342,
      noktalar: [
        { x: 73, y: 173, ad: 'Sıvı', metin: 'Cam termometrede sıcaklığa duyarlı madde olarak cıva kullanılabilir. [[K6 s. 58]]' },
        { x: 689, y: 169, ad: 'Sıvı sütununun ucu', metin: 'Sıvı genleştikçe sütunun cam tüpte ulaştığı yer değişir. [[K6 s. 58]]' },
        { x: 875, y: 157, ad: 'Cam tüp', metin: 'Sıvının genleşmesi cam tüp içinde izlenir. [[K6 s. 58]]' },
      ] }],
  });

  const yollar = {
    iletim: ['Sıcak el', 'Metal yüzey', 'Temas', 'El ile yüzey arasında tanecik çarpışmaları kinetik enerjiyi aktarır. [[K6 s. 59–60]]'],
    tasinim: ['Ilık hava', 'Oda havası', 'Hava akımı', 'Hastanın yanında ısınan hava uzaklaşınca daha soğuk hava onun yerini alır. [[K6 s. 60]]'],
    isinim: ['Sıcak cisim', 'Soğuk cisim', 'Vakum', 'İki cisim de ışınım yayar ve soğurur. [[K6 s. 61]] Net aktarım sıcak cisimden soğuk cisme doğrudur. [[K6 s. 59–61]]'],
  };
  VIZ.fk04a_aktarim = (el) => SEKIL.sahne(el, {
    baslik: 'Isı hangi yoldan geçer?', vb: [480, 130], vbDar: [330, 130],
    secenek: { id: 'yol', ad: 'Aktarım yolu', liste: [{d:'iletim',ad:'İletim'}, {d:'tasinim',ad:'Taşınım'}, {d:'isinim',ad:'Işınım'}] },
    ciz: (S, t, p) => {
      const [sol, sag, ara] = yollar[p.yol], orta = S.w / 2;
      let simge = '';
      if (p.yol === 'iletim') {
        for (let i = -2; i <= 2; i++) simge += S.daire(orta + 14 * i, 75, 7, { dolgu: i < 0 ? 'warn-soft' : 'basic-soft' });
      } else if (p.yol === 'tasinim') {
        simge = S.ok([ [orta-30,87],[orta-10,68],[orta+28,68]], {renk:'warn'}) +
          S.ok([ [orta+28,88],[orta+6,88],[orta-15,99]], {renk:'basic'});
      } else {
        for (const [y, dir] of [ [67,1],[90,-1]]) {
          const pts = Array.from({length:49}, (_, i) => [orta + dir * (i-24)*1.35, y + Math.sin(i*Math.PI/8)*4]);
          simge += S.ok(pts, {renk:dir === 1 ? 'warn' : 'basic', w:dir === 1 ? 3 : 1.5});
        }
      }
      return S.kutu(2, 51, 102, 48, { yazi: sol, dolgu:'warn-soft' }) +
        S.kutu(S.w-104, 51, 102, 48, { yazi: sag, dolgu:'basic-soft' }) +
        S.t(orta, 37, ara, { a:'middle', c:'b' }) + simge;
    },
    metin: (p) => yollar[p.yol][3],
  });

  VIZ.fk04a_battaniye = (el) => SEKIL.cizim(el, {
    baslik: 'Sıcak havalı battaniye', giris: 'Fandan battaniyeye uzanan hava yolunu izleyin. [[K6 s. 61]]',
    gorunumler: [{ ad: 'Düzenek', resim: 'img/fizik/04a-battaniye.webp', en: 1024, boy: 512,
      noktalar: [
        { x: 98, y: 287, ad:'Fan', metin:'Fan, sıcak havayı battaniyeye doğru iter. [[K6 s. 61]]' },
        { x: 308, y: 302, ad:'Hava yolu', metin:'Sıcak hava bu yoldan şişirilebilir battaniyeye ulaşır. [[K6 s. 61]]' },
        { x: 745, y: 235, ad:'Şişirilebilir battaniye', metin:'Battaniyeden geçen sıcak hava taşınımla hastayı ısıtır. [[K6 s. 61]]' },
      ] }],
  });

  const spektrum = {
    vucut: { sira: 3, ad: 'Kızılötesi', metin: 'Vücut ve oda sıcaklığındaki yayım kızılötesi bölgededir. [[K6 s. 63]]' },
    akkor: { sira: 2, ad: 'Kırmızı', metin: 'Kitabın verdiği 800 K sınırı aşıldığında kırmızı ışıma görünür olmaya başlar. [[K6 s. 63]]' },
    gunes: { sira: 1, ad: 'Geniş yayım', metin: 'Yaklaşık 5000 K sıcaklıktaki Güneş yüzeyi geniş bir dalga boyu aralığında yayım yapar ve beyaz görünür. [[K6 s. 63]]' },
  };
  VIZ.fk04a_spektrum = (el) => SEKIL.sahne(el, {
    baslik: 'Işımanın dalga boyu bölgeleri', vb: [500, 170], vbDar: [340, 170],
    secenek: { id: 'kaynak', ad: 'Yayıcı', liste: [
      { d: 'vucut', ad: 'Vücut' }, { d: 'akkor', ad: 'Kızgın cisim' }, { d: 'gunes', ad: 'Güneş' },
    ] },
    ciz: (S, t, p) => {
      const durum = spektrum[p.kaynak], bas = 35, sinir = S.w * 0.61, son = S.w - 18;
      const isaret = [0, (bas + sinir) / 2, sinir - 14, (sinir + son) / 2][durum.sira];
      return S.kutu(bas, 65, sinir - bas, 36, { yazi: 'Görünür', dolgu: 'basic-soft' }) +
        S.kutu(sinir, 65, son - sinir, 36, { yazi: 'Kızılötesi', dolgu: 'warn-soft' }) +
        S.t(bas, 124, '380 nm', { a: 'middle' }) + S.t(sinir, 124, '700 nm', { a: 'middle' }) +
        S.ok([ [bas, 146], [son, 146] ], { renk: 'muted' }) +
        S.t(S.w / 2, 166, 'Artan dalga boyu', { a: 'middle' }) +
        S.t(isaret, 25, durum.ad, { a: 'middle', c: 'b' }) +
        S.ok([ [isaret, 31], [isaret, 61] ], { renk: 'accent' });
    },
    metin: (p) => spektrum[p.kaynak].metin,
  });

  const goreliGuc = (t) => (t / 5000) ** 4;
  VIZ.fk04a_guc = (el) => SEKIL.grafik(el, {
    baslik:'Siyah cismin yaydığı bağıl güç', vb:[560,285], vbDar:[350,260],
    x:{min:0,max:5000,ad:'Mutlak sıcaklık (K)',adimlar:[0,800,5000]},
    y:{min:0,max:1,ad:'Bağıl güç',adimlar:[0,1]},
    param:[{id:'t',ad:'Siyah cisim',min:0,max:5000,adim:1,deger:800,birim:'K'}],
    egriler:[{f:goreliGuc}], noktalar:(p)=>[{x:p.t,y:goreliGuc(p.t)}],
    okuma:(p)=> 'Aynı yüzeyin 5000 K’de yaydığı güce göre <b><i>P</i>/<i>P</i><sub>5000</sub> = (' + p.t + '/5000)⁴ = ' +
      (p.t > 0 && goreliGuc(p.t) < 0.00001 ? goreliGuc(p.t).toExponential(2).replace('.', ',') : sayi(goreliGuc(p.t), 6)) + '</b> olur. [[K6 s. 62–63]]',
  });
})();
