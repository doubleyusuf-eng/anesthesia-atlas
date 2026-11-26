(() => {
  function kemik(el, dosya) {
    const { baslik, giris, noktalar } = SAYFALAR['dersler/anatomi/03a'].cizimler[dosya];
    return SEKIL.cizim(el, { baslik, giris, gorunumler: [{
      ad: baslik, resim: 'img/anatomi/03a-' + dosya + '.webp', en: 1024, boy: 683, noktalar
    }] });
  }

  VIZ.an03a_servikal = (el) => kemik(el, 'servikal');

  VIZ.an03a_atlas = (el) => kemik(el, 'atlas');

  VIZ.an03a_torasik = (el) => kemik(el, 'torasik');

  VIZ.an03a_lomber = (el) => kemik(el, 'lomber');

  // Şematik yan görünümde ön sol, arka sağ, kraniyal yön yukarıdır.
  VIZ.an03a_egri = (el) => {
    const evreler = [
      ['Fetüs', 'M32 20 Q110 95 34 171', 'Fetüsün omurgası öne konkav tek bir yay çizer. [[K5 s. 109]]'],
      ['Baş kontrolü', 'M66 20 Q24 47 60 68 Q113 111 34 171', 'Başını dik tutabilen yenidoğanda servikal kompansatuvar eğrilik belirir. [[K5 s. 109]]'],
      ['Oturma ve ayakta durma', 'M66 20 Q24 46 61 65 Q97 91 64 115 Q32 142 58 153 Q76 164 52 175', 'Çocuk oturmaya, ardından ayakta durmaya başlayınca lomber lordoz gelişir. [[K5 s. 109]]']
    ];
    return SEKIL.adim(el, { baslik: 'Omurga eğriliklerinin gelişimi', vb: [320, 190], oto: false,
      adimlar: evreler.map(([ad, yol, metin], i) => ({ ad, metin, ciz: () =>
        '<g transform="translate(60 0)"><path d="' + yol + '" fill="none" stroke="#816340" stroke-width="9" stroke-linecap="round"/></g>' +
        '<text x="26" y="96">Ön</text><text x="185" y="96">Arka</text>' +
        (i > 0 ? '<text x="170" y="42">Servikal lordoz</text>' : '') +
        (i === 2 ? '<text x="170" y="146">Lomber lordoz</text>' : '') }))
    });
  };

  VIZ.an03a_isaret = (el) => SEKIL.adim(el, {
    baslik: 'Palpasyonda iki yüzey işareti', vb: [320, 170], oto: false,
    adimlar: [
      { ad: 'Ense oluğu', metin: 'Ense oluğunda aşağı inerken ilk belirgin spinöz çıkıntı C7’dir, hemen altındaki T1 daha kolay palpe edilir. [[K5 s. 111]] [[K5 s. 114]]',
        ciz: () => '<path d="M155 20 V145" stroke="#a6aaa5" stroke-width="5"/><g fill="#d4b78a" stroke="#725c40"><ellipse cx="155" cy="60" rx="13" ry="16"/><ellipse cx="155" cy="114" rx="18" ry="22"/></g><text x="188" y="65">C7</text><text x="188" y="119">T1</text>' },
      { ad: 'İliak krestler', metin: 'Krest tepelerini birleştiren çizgi genellikle L4 gövdesini keser. [[K5 s. 118–119]]',
        ciz: () => '<g fill="#e3cfaf" stroke="#79664a"><rect x="132" y="18" width="54" height="32" rx="6"/><rect x="132" y="69" width="54" height="32" rx="6"/><rect x="132" y="120" width="54" height="32" rx="6"/><path d="M14 114 Q36 64 60 101 L84 144 M236 144 L260 101 Q284 64 306 114" fill="none" stroke-width="6"/></g><path d="M39 84 H281" stroke="#246866" stroke-width="3" stroke-dasharray="5 3"/><text x="194" y="48">L3</text><text x="194" y="79">L4</text><text x="194" y="146">L5</text>' }
    ]
  });

  VIZ.an03a_katman = (el) => {
    const katmanlar = SAYFALAR['dersler/anatomi/03a'].katmanlar;
    return SEKIL.adim(el, { baslik: 'Orta hatta yüzeyden derine', vb: [300, 206], oto: false,
      adimlar: katmanlar.map(({ad, metin}, secili) => ({ ad, metin, ciz: () =>
        katmanlar.map((katman, i) => {
          const y = 5 + i * 33;
          const zemin = i === secili ? '#225f60' : '#eee6d8';
          const yazi = i === secili ? '#fff' : '#3b3831';
          return `<rect x="32" y="${y}" width="236" height="29" rx="5" fill="${zemin}"/><text x="150" y="${y+20}" text-anchor="middle" style="fill:${yazi}">${katman.ad}</text>`;
        }).join('') }))
    });
  };

  VIZ.an03a_yaklasim = (el) => {
    const adimlar = [
      ['Orta torasik', 'Kaudale eğik spinöz çıkıntılar arasından orta hatta geçiş, iğnenin belirgin biçimde başa yönelmesini gerektirir. [[K5 s. 114]]', 'Eğik spinöz çıkıntılar', 'Sefalad yön', true],
      ['Lomber', 'Lomber spinöz çıkıntının üst kenarı gövdeyle ve sırt derisiyle yaklaşık dik açı yapar. [[K5 s. 114]]', 'Yatay spinöz çıkıntılar', 'Orta hat', false],
      ['Fleksiyon', 'Öne fleksiyon interlaminar pencereyi genişletir ve ekstansiyona göre daha fazla ligamentum flavumu açığa çıkarır. [[K5 s. 115]] [[K5 s. 117]]', 'Genişleyen aralık', 'Fleksiyon', false]
    ];
    return SEKIL.adim(el, {baslik: 'Spinöz çıkıntıların eğimi ve giriş aralığı', vb: [320, 194], oto: false,
      adimlar: adimlar.map(([ad, metin, etiket, yon, egik], i) => ({ad, metin, ciz: () => {
        const dusus = egik ? 44 : 0, aralik = i === 2 ? 88 : 60;
        const kemikler = [40, 40 + aralik].map(y =>
          '<path d="M64 ' + y + ' h49 l63 ' + dusus + ' q12 5 0 12 L111 ' + (y+18) + ' H64 Z" fill="#e3cfaf" stroke="#806b4d" stroke-width="2"/>').join('');
        const y1 = egik ? 157 : 75, y2 = egik ? 101 : 75;
        return kemikler + (i < 2 ? '<path d="M243 ' + y1 + ' L158 ' + y2 + '" fill="none" stroke="#256865" stroke-width="4"/><circle cx="158" cy="' + y2 + '" r="4" fill="#256865"/>' :
          '<path d="M160 58 v66 m-6 -60 l6 -6 6 6 m-12 53 l6 7 6 -7" stroke="#256865" stroke-width="3" fill="none"/>') +
          '<text x="34" y="24">' + etiket + '</text><text x="185" y="181">' + yon + '</text>';
      }}))
    });
  };
})();
