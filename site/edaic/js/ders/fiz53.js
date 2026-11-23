/* Bölüm 53 · Sinapslar ve nöromüsküler kavşak — SEKIL kiti bileşenleri */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const REF = window.REF || ((s) => s);

  /* 1) Kimyasal sinaps vs elektriksel sinaps */
  VIZ.f53_tur = (el) => SEKIL.sahne(el, {
    vb: [640, 290], vbDar: [380, 390], hareket: true, sure: 6,
    baslik: 'Kimyasal ve elektriksel sinaps karşılaştırması',
    secenek: { id: 'tip', ad: 'Sinaps tipi', liste: [{ d: 'kim', ad: 'Kimyasal sinaps' }, { d: 'el', ad: 'Elektriksel sinaps' }] },
    ciz: (S, t, p) => {
      let s = '';
      if (p.tip === 'kim') {
        if (!S.dar) {
          s += S.kutu(36, 48, 210, 172, { dolgu: 'basic-soft', renk: 'basic', r: 14 });
          s += S.t(141, 74, 'Presinaptik terminal düğme', { a: 'middle', c: 'b k' });
          s += S.t(141, 94, '(ör. α-motor nöron)', { a: 'middle', c: 'k m' });
          [[95, 132], [140, 122], [185, 132], [118, 168], [172, 168]].forEach(([cx, cy]) => {
            s += S.daire(cx, cy, 13, { dolgu: 'paper', renk: 'basic' });
            s += S.daire(cx, cy, 3.5, { dolgu: 'accent', renk: 'none' });
          });
          s += S.ok([[8, 134], [34, 134]], { renk: 'warn', w: 2.5 });
          s += S.t(22, 118, 'AP', { a: 'middle', c: 'b k', renk: 'warn' });

          s += S.cizgi([[246, 42], [246, 226]], { renk: 'muted', kesik: true, w: 1.2 });
          s += S.cizgi([[348, 42], [348, 226]], { renk: 'muted', kesik: true, w: 1.2 });
          s += S.t(297, 26, 'Sinaptik aralık (20–50 nm)', { a: 'middle', c: 'b k', renk: 'accent' });
          s += S.akis([[248, 120], [346, 120]], t, { renk: 'accent', n: 3, hiz: 0.42, r: 4.5 });
          s += S.akis([[248, 164], [346, 164]], t, { renk: 'accent', n: 3, hiz: 0.42, r: 4.5 });

          s += S.kutu(348, 48, 256, 172, { dolgu: 'accent-soft', renk: 'accent', r: 14 });
          s += S.kutu(342, 108, 14, 24, { dolgu: 'paper', renk: 'accent', r: 4 });
          s += S.kutu(342, 152, 14, 24, { dolgu: 'paper', renk: 'accent', r: 4 });
          s += S.t(478, 76, 'Postsinaptik zar', { a: 'middle', c: 'b k' });
          s += S.t(478, 96, '(ör. motor son plak)', { a: 'middle', c: 'k m' });
          s += S.t(480, 132, ['Uyarıcı: glutamat (>%90),', 'NMJ nikotinik ACh'], { a: 'middle', c: 'k' });
          s += S.t(480, 174, ['İnhibitör: GABA, glisin,', 'kardiyak M₂ ACh'], { a: 'middle', c: 'k m' });

          s += S.rozet(185, 258, 'Tek yönlü (pre → post)', { dolgu: 'basic-soft', renk: 'basic', w: 205 });
          s += S.rozet(450, 258, 'Sinaptik gecikme var', { dolgu: 'warn-soft', renk: 'warn', w: 200 });
        } else {
          s += S.kutu(20, 18, 340, 102, { dolgu: 'basic-soft', renk: 'basic', r: 12 });
          s += S.t(190, 42, 'Presinaptik terminal düğme', { a: 'middle', c: 'b k' });
          [[95, 82], [158, 82], [222, 82], [285, 82]].forEach(([cx, cy]) => {
            s += S.daire(cx, cy, 12, { dolgu: 'paper', renk: 'basic' });
            s += S.daire(cx, cy, 3.5, { dolgu: 'accent', renk: 'none' });
          });
          s += S.t(190, 146, 'Sinaptik aralık (20–50 nm)', { a: 'middle', c: 'b k', renk: 'accent' });
          s += S.akis([[90, 122], [90, 184]], t, { renk: 'accent', n: 3, hiz: 0.45, r: 4 });
          s += S.akis([[290, 122], [290, 184]], t, { renk: 'accent', n: 3, hiz: 0.45, r: 4 });

          s += S.kutu(20, 186, 340, 112, { dolgu: 'accent-soft', renk: 'accent', r: 12 });
          s += S.kutu(78, 179, 24, 14, { dolgu: 'paper', renk: 'accent', r: 4 });
          s += S.kutu(278, 179, 24, 14, { dolgu: 'paper', renk: 'accent', r: 4 });
          s += S.t(190, 214, 'Postsinaptik zar (ör. motor son plak)', { a: 'middle', c: 'b k' });
          s += S.t(190, 240, 'Uyarıcı: glutamat (>%90), NMJ ACh', { a: 'middle', c: 'k' });
          s += S.t(190, 264, 'İnhibitör: GABA, glisin, kalp M₂', { a: 'middle', c: 'k m' });

          s += S.rozet(190, 326, 'Tek yönlü (pre → post)', { dolgu: 'basic-soft', renk: 'basic', w: 230 });
          s += S.rozet(190, 360, 'Sinaptik gecikme var', { dolgu: 'warn-soft', renk: 'warn', w: 230 });
        }
      } else {
        if (!S.dar) {
          s += S.t(320, 28, 'Aralık bağlantıları (gap junction)', { a: 'middle', c: 'b k', renk: 'ok' });
          s += S.kutu(44, 48, 254, 172, { dolgu: 'ok-soft', renk: 'ok', r: 14 });
          s += S.kutu(342, 48, 254, 172, { dolgu: 'ok-soft', renk: 'ok', r: 14 });
          [88, 126, 164].forEach((yy) => {
            s += S.kutu(290, yy, 60, 18, { dolgu: 'paper', renk: 'ok', r: 5 });
          });
          s += S.t(171, 76, 'Presinaptik hücre', { a: 'middle', c: 'b k' });
          s += S.t(469, 76, 'Postsinaptik hücre', { a: 'middle', c: 'b k' });
          s += S.akis([[100, 97], [540, 97]], t, { renk: 'ok', n: 4, hiz: 0.85, r: 4.5 });
          s += S.akis([[100, 173], [540, 173]], t, { renk: 'ok', n: 4, hiz: 0.85, r: 4.5, ters: true });
          s += S.t(171, 138, 'Yerel akım doğrudan', { a: 'middle', c: 'k m' });
          s += S.t(469, 138, 'Örnek: kalp kası', { a: 'middle', c: 'k m' });

          s += S.rozet(185, 258, 'Çift yönlü (pre ↔ post)', { dolgu: 'ok-soft', renk: 'ok', w: 210 });
          s += S.rozet(450, 258, 'Sinaptik gecikme yok', { dolgu: 'accent-soft', renk: 'accent', w: 205 });
        } else {
          s += S.kutu(20, 18, 340, 102, { dolgu: 'ok-soft', renk: 'ok', r: 12 });
          s += S.t(190, 44, 'Presinaptik hücre', { a: 'middle', c: 'b k' });
          s += S.t(190, 68, 'Yerel elektrik akımı', { a: 'middle', c: 'k m' });
          s += S.kutu(20, 170, 340, 108, { dolgu: 'ok-soft', renk: 'ok', r: 12 });
          [100, 190, 280].forEach((xx) => {
            s += S.kutu(xx - 10, 114, 20, 62, { dolgu: 'paper', renk: 'ok', r: 5 });
          });
          s += S.akis([[100, 88], [100, 210]], t, { renk: 'ok', n: 3, hiz: 0.85, r: 4 });
          s += S.akis([[280, 88], [280, 210]], t, { renk: 'ok', n: 3, hiz: 0.85, r: 4, ters: true });
          s += S.t(190, 232, 'Postsinaptik hücre (ör. kalp kası)', { a: 'middle', c: 'b k' });
          s += S.t(190, 256, 'Aralık bağlantılarıyla hızlı iletim', { a: 'middle', c: 'k m' });

          s += S.rozet(190, 314, 'Çift yönlü (pre ↔ post)', { dolgu: 'ok-soft', renk: 'ok', w: 235 });
          s += S.rozet(190, 350, 'Sinaptik gecikme yok', { dolgu: 'accent-soft', renk: 'accent', w: 235 });
        }
      }
      return s;
    },
    metin: (p) => REF(p.tip === 'kim'
      ? '<b>Kimyasal sinaps.</b> Aksiyon potansiyeli nörotransmitteri 20–50 nm genişliğindeki sinaptik aralığa salar; salınım, difüzyon ve reseptöre bağlanma zaman aldığından sinaptik gecikme vardır ve iletim tek yönlüdür. Elektriksel sinapsa geçin. [[K1 s. 231]]'
      : '<b>Elektriksel sinaps.</b> Hücreleri aralık bağlantıları (gap junction) birleştirir; presinaptik aksiyon potansiyeli postsinaptik hücrede doğrudan yerel akım doğurur. Sinaptik gecikme yoktur, daha hızlıdır ve çift yönlü iletir (ör. kalp kası). [[K1 s. 231]]'),
  });

  /* 2) Kimyasal sinapsta salınım ve sonlandırma (4 adım) */
  VIZ.f53_iletim = (el) => SEKIL.adim(el, {
    vb: [640, 300], vbDar: [380, 330], hareket: true, oto: false,
    baslik: 'Kimyasal sinapsta nörotransmitter salınımı ve temizlenmesi',
    ortak: (S) => {
      const w = S.w, cx = w / 2, bw = S.dar ? 336 : 470, bx = cx - bw / 2;
      let s = '';
      s += S.kutu(bx, 18, bw, 118, { dolgu: 'basic-soft', renk: 'basic', r: 16 });
      s += S.t(cx, 40, S.dar ? 'Terminal düğme (aktif bölge)' : 'Terminal düğme (presinaptik zar ve aktif bölge)', { a: 'middle', c: 'b k' });
      s += S.t(S.dar ? 68 : 95, 168, 'Sinaptik aralık', { a: 'middle', c: 'k m' });
      s += S.kutu(bx, 202, bw, 76, { dolgu: 'accent-soft', renk: 'accent', r: 12 });
      s += S.t(cx, 260, S.dar ? 'Postsinaptik zar ve reseptörler' : 'Postsinaptik zar ve özgül reseptörler', { a: 'middle', c: 'b k' });
      return s;
    },
    adimlar: [
      {
        ad: 'Ca²⁺ girişi',
        metin: REF('Terminal düğmeye ulaşan aksiyon potansiyeli N-tipi voltaj kapılı Ca²⁺ kanallarını açar; Ca²⁺ elektrokimyasal gradyanıyla ECF\'den hücre içine difüze olur. [[K1 s. 232]]'),
        ciz: (S, t) => {
          const cx = S.w / 2, lx = S.dar ? 34 : 108;
          let s = '';
          s += S.kutu(lx - 10, 68, 22, 30, { dolgu: 'warn-soft', renk: 'warn', r: 4 });
          s += S.t(lx + 18, 62, 'N-tipi Ca²⁺ kanalı (açık)', { c: 'b k', renk: 'warn' });
          s += S.akis([[lx - 22, 83], [lx + 42, 83]], t, { renk: 'warn', n: 3, hiz: 0.55, r: 4.5 });
          [cx - 48, cx, cx + 48].forEach((vx) => {
            s += S.daire(vx, 112, 14, { dolgu: 'paper', renk: 'basic' });
            s += S.daire(vx, 112, 4, { dolgu: 'accent', renk: 'none' });
          });
          [-55, 0, 55].forEach((dx) => {
            s += S.kutu(cx + dx - 11, 194, 22, 16, { dolgu: 'paper', renk: 'muted', r: 4 });
          });
          return s;
        },
      },
      {
        ad: 'SNARE ve ekzositoz',
        metin: REF('Aksonal Ca²⁺ vezikül zarındaki sinaptotagmine bağlanır ve SNARE proteinleriyle birlikte aktif bölgedeki 50–100 vezikülün ekzositozunu tetikler. [[K1 s. 232]]'),
        ciz: (S, t) => {
          const cx = S.w / 2;
          let s = '';
          [-55, 0, 55].forEach((dx) => {
            s += S.daire(cx + dx, 130, 14, { dolgu: 'paper', renk: 'warn', w: 2 });
            s += S.akis([[cx + dx, 130], [cx + dx, 174]], t, { renk: 'accent', n: 3, hiz: 0.6, r: 4 });
            s += S.kutu(cx + dx - 11, 194, 22, 16, { dolgu: 'paper', renk: 'muted', r: 4 });
          });
          s += S.rozet(cx, 82, S.dar ? 'Ca²⁺ + sinaptotagmin/SNARE (50–100)' : 'Ca²⁺ + sinaptotagmin + SNARE → 50–100 vezikül', { dolgu: 'warn-soft', renk: 'warn', w: S.dar ? 314 : 355 });
          return s;
        },
      },
      {
        ad: 'Difüzyon ve bağlanma',
        metin: REF('Nörotransmitter konsantrasyon gradyanıyla sinaptik aralığı geçip postsinaptik reseptörlere bağlanır; zar uyarılır ya da inhibe olur. [[K1 s. 232–233]]'),
        ciz: (S, t) => {
          const cx = S.w / 2;
          let s = '';
          [-55, 0, 55].forEach((dx) => {
            s += S.akis([[cx + dx, 140], [cx + dx, 196]], t, { renk: 'accent', n: 3, hiz: 0.5, r: 4 });
            s += S.kutu(cx + dx - 13, 192, 26, 20, { dolgu: 'ok-soft', renk: 'ok', r: 4 });
            s += S.akis([[cx + dx, 196], [cx + dx, 240]], t, { renk: 'ok', n: 2, hiz: 0.55, r: 3.8 });
          });
          s += S.rozet(cx, 92, 'Konsantrasyon gradyanı ile difüzyon', { dolgu: 'accent-soft', renk: 'accent', w: 285 });
          return s;
        },
      },
      {
        ad: 'Sonlandırma (3 yol)',
        metin: REF('Tekrarlayan uyarımı önlemek için haberci üç yolla uzaklaştırılır: 1) aralıktan dışarı difüzyon (yavaş), 2) enzimatik yıkım (AChE) ve 3) nöronal geri alım (NA, DA; SSRI ve kokain hedefi). [[K1 s. 235]]'),
        ciz: (S, t) => {
          const cx = S.w / 2, rx = S.dar ? cx + 150 : cx + 195;
          let s = '';
          s += S.ok([[cx + 68, 174], [rx, 174]], { renk: 'muted', w: 2 });
          s += S.t(rx - 4, 158, '1 · Difüzyon', { a: 'end', c: 'b k', renk: 'muted' });

          s += S.rozet(cx - 12, 174, '2 · Yıkım (AChE)', { dolgu: 'warn-soft', renk: 'warn', w: 152 });

          s += S.akis([[cx - 102, 182], [cx - 102, 92]], t, { renk: 'ok', n: 3, hiz: 0.5, r: 4 });
          s += S.t(cx, 84, S.dar ? '3 · Nöronal geri alım (NA, DA)' : '3 · Nöronal geri alım (aktif taşıma: NA, DA)', { a: 'middle', c: 'b k', renk: 'ok' });
          s += S.t(cx, 108, S.dar ? 'Blok: SSRI (5-HT), kokain (DA)' : 'Geri alım bloku: SSRI (5-HT), kokain (DA)', { a: 'middle', c: 'k m' });
          return s;
        },
      },
    ],
  });

  /* 3) EPSP toplaması ve IPSP (K⁺ çıkışı vs Cl⁻ klempi) */
  VIZ.f53_potansiyel = (el) => SEKIL.grafik(el, {
    vb: [640, 320], vbDar: [380, 340],
    baslik: 'Postsinaptik potansiyeller: EPSP, K⁺ IPSP ve klorür klempi',
    secenek: {
      id: 'mod', ad: 'Yanıt tipi',
      liste: [{ d: 'epsp', ad: 'EPSP ve toplama' }, { d: 'ipsp_k', ad: 'IPSP (K⁺ çıkışı)' }, { d: 'ipsp_cl', ad: 'IPSP (Cl⁻ klempi)' }],
    },
    param: [{ id: 'vez', ad: 'Eşzamanlı uyarıcı vezikül sayısı (şematik)', min: 1, max: 40, adim: 1, deger: 1 }],
    x: { min: 0, max: 30, ad: 'Zaman (ms)', adimlar: [0, 5, 10, 15, 20, 25, 30] },
    y: { min: -90, max: 35, ad: 'Postsinaptik potansiyel (mV)', adimlar: [-90, -70, -55, -30, 0, 30] },
    yatay: () => [
      { y: -55, ad: 'Eşik (−55 mV)', renk: 'warn' },
      { y: -70, ad: 'RMP (−70 mV)', renk: 'muted' },
    ],
    dikey: () => [{ x: 5, ad: 'Salınım', renk: 'muted' }],
    egriler: [
      {
        renk: 'accent', w: 3,
        goster: (p) => p.mod === 'epsp',
        f: (x, p) => {
          if (x < 5) return -70;
          const u = x - 5, amp = p.vez * 0.5;
          if (amp < 15.2) return -70 + amp * (u / 2.2) * Math.exp(1 - u / 2.2);
          if (u < 1.8) return -70 + (15.5 * u) / 1.8;
          if (u < 3.0) return -54.5 + 84.5 * Math.sin(((u - 1.8) / 1.2) * (Math.PI / 2));
          if (u < 5.2) return 30 - 108 * ((u - 3.0) / 2.2);
          return -70 - 8 * Math.exp(-(u - 5.2) / 3.2);
        },
      },
      {
        renk: 'clin', w: 3, ad: 'K⁺ çıkışı → hiperpolarizasyon', adYer: 0.55,
        goster: (p) => p.mod === 'ipsp_k',
        f: (x) => {
          if (x < 5) return -70;
          const u = x - 5;
          return -70 - 13 * (u / 3.5) * Math.exp(1 - u / 3.5);
        },
      },
      {
        renk: 'clin', w: 3, ad: 'Yalnız Cl⁻ (E_Cl = −70 mV)', adYer: 0.72,
        goster: (p) => p.mod === 'ipsp_cl',
        f: () => -70,
      },
      {
        renk: 'accent', w: 2.6, kesik: true, ad: 'Cl⁻ klempi altında EPSP', adYer: 0.42,
        goster: (p) => p.mod === 'ipsp_cl',
        f: (x, p) => {
          if (x < 5) return -70;
          const u = x - 5, amp = p.vez * 0.5 * 0.32;
          return -70 + amp * (u / 2.2) * Math.exp(1 - u / 2.2);
        },
      },
    ],
    ek: (S, p, X, Y) => {
      if (p.mod === 'epsp' && p.vez === 1) {
        return S.rozet(X(16.5), Y(-34), '1 vezikül = +0,5 mV minyatür EPSP', { dolgu: 'accent-soft', renk: 'accent', w: S.dar ? 255 : 265 });
      }
      if (p.mod === 'epsp' && p.vez * 0.5 >= 15.2) {
        return S.rozet(X(18.5), Y(18), S.dar ? 'Eşik aşıldı → AP (+30 mV)' : 'Eşik aşıldı → aksiyon potansiyeli (+30 mV)', { dolgu: 'ok-soft', renk: 'ok', w: S.dar ? 220 : 295 });
      }
      return '';
    },
    okuma: (p) => {
      if (p.mod === 'epsp') {
        if (p.vez === 1) return REF('<b>EPSP · 1 vezikül.</b> Tek vezikülün kendiliğinden ekzositozu yalnızca 0,5 mV\'luk minyatür bir depolarizasyon oluşturur; eşiğe (−55 mV) ulaşamaz ve −70 mV\'a söner. Vezikül sayısını artırın. [[K1 s. 233–234]]');
        if (p.vez * 0.5 < 15.2) return REF(`<b>EPSP · ${p.vez} vezikül (toplama +${(p.vez * 0.5).toFixed(1).replace('.', ',')} mV).</b> Özgül olmayan katyon kanallarından net Na⁺ girişi zarı depolarize eder ama henüz −55 mV eşiğinin altındadır. [[K1 s. 233–234]]`);
        return REF(`<b>Eşik üstü EPSP · ${p.vez} vezikül.</b> Eşzamanlı çok sayıda vezikülün toplamsal depolarizasyonu −55 mV eşiğini aşar ve postsinaptik hücrede aksiyon potansiyelini (+30 mV) tetikler. [[K1 s. 233–234]]`);
      }
      if (p.mod === 'ipsp_k') {
        return REF('<b>K⁺ aracılı IPSP.</b> Ligand kapılı K⁺ kanalları açılınca pozitif K⁺ iyonları hücreden sinaptik aralığa çıkar; zar hiperpolarize olur ve eşikten uzaklaşır. [[K1 s. 233–234]]');
      }
      return REF(`<b>Cl⁻ aracılı IPSP (klorür klempi).</b> Cl⁻ Nernst potansiyeli (−70 mV) RMP ile yaklaşık aynı olduğundan tek başına Cl⁻ girişi voltajı pek değiştirmez; ancak ${p.vez} veziküllük uyarıcı Na⁺ girişinin Cl⁻ girişi + K⁺ çıkışını aşması çok zorlaşır ve şekilde EPSP eşik altında kalır. [[K1 s. 233]]`);
    },
  });

  /* 4) Genel anesteziklerin sinaptik hedefleri (GABAA ve NMDA) */
  VIZ.f53_ga = (el) => SEKIL.sahne(el, {
    vb: [640, 290], vbDar: [380, 340], hareket: true, sure: 6,
    baslik: 'Genel anesteziklerin GABAA ve NMDA reseptörlerindeki etkileri',
    secenek: {
      id: 'hedef', ad: 'İlaç grubu',
      liste: [
        { d: 'bz', ad: 'GABAA · Benzodiazepin' },
        { d: 'iv', ad: 'GABAA · Propofol / Tiyopental / Etomidat' },
        { d: 'nmda', ad: 'NMDA · Ketamin / N₂O / Xe' },
      ],
    },
    ciz: (S, t, p) => {
      const cx = S.w / 2, my = S.dar ? 154 : 146;
      let s = '';
      s += S.kutu(20, my - 28, S.w - 40, 56, { dolgu: 'bg', renk: 'line', r: 8 });
      s += S.t(24, my - 94, '↑ Hücre dışı (aralık)', { c: 'k m' });
      s += S.t(24, my + 68, '↓ Hücre içi', { c: 'k m' });

      if (p.hedef === 'bz' || p.hedef === 'iv') {
        const subs = [[-96, 'β'], [-58, 'α'], [26, 'γ'], [64, 'α'], [102, 'β']];
        subs.forEach(([dx, ad]) => {
          s += S.kutu(cx + dx - 17, my - 46, 34, 92, { dolgu: 'clin-soft', renk: 'clin', r: 10, yazi: ad });
        });
        s += S.kutu(cx - 21, my - 46, 28, 92, { dolgu: 'paper', renk: 'clin', kesik: true, r: 4 });
        s += S.akis([[cx - 7, my - 78], [cx - 7, my + 78]], t, { renk: 'clin', n: p.hedef === 'iv' ? 5 : 4, hiz: 0.65, r: 4.5 });
        s += S.rozet(cx - (S.dar ? 102 : 112), my - 68, 'GABA', { dolgu: 'ok-soft', renk: 'ok', w: 68 });
        if (p.hedef === 'bz') {
          s += S.rozet(cx + (S.dar ? 66 : 74), my - 68, S.dar ? 'Benzodiazepin (α–γ)' : 'Benzodiazepin (α–γ arası)', { dolgu: 'warn-soft', renk: 'warn', w: S.dar ? 186 : 215 });
          s += S.rozet(cx, my + 106, S.dar ? '5 alt birimli GABAA · GABA afinitesi ↑' : '5 alt birimli GABAA · GABA afinitesi ↑ → Cl⁻ girişi ↑', { dolgu: 'clin-soft', renk: 'clin', w: S.dar ? 320 : 410 });
        } else {
          s += S.rozet(cx + (S.dar ? 52 : 68), my + 68, 'Propofol / Tiyopental / Etomidat', { dolgu: 'warn-soft', renk: 'warn', w: S.dar ? 248 : 258 });
          s += S.rozet(cx, my + 108, S.dar ? 'Uzak bölge → Cl⁻ iletkenliği ↑' : 'GABA\'dan uzak bölge → Cl⁻ iletkenliği ↑ (inhibisyon ↑)', { dolgu: 'clin-soft', renk: 'clin', w: S.dar ? 285 : 420 });
        }
      } else {
        [[-74, '1'], [-38, '2'], [28, '3'], [64, '4']].forEach(([dx, ad]) => {
          s += S.kutu(cx + dx - 15, my - 46, 32, 92, { dolgu: 'basic-soft', renk: 'basic', r: 10, yazi: ad });
        });
        s += S.kutu(cx - 6, my - 46, 34, 92, { dolgu: 'crit-soft', renk: 'crit', r: 4, yazi: '✗' });
        s += S.rozet(cx - (S.dar ? 98 : 108), my - 68, 'Glutamat', { dolgu: 'paper', renk: 'muted', w: 108 });
        s += S.rozet(cx + (S.dar ? 72 : 82), my - 68, S.dar ? 'Ketamin (uzak yer)' : 'Ketamin (uzak bölge)', { dolgu: 'crit-soft', renk: 'crit', w: S.dar ? 176 : 188 });
        s += S.rozet(cx, my + 74, 'N₂O ve Xe → NMDA antagonizması', { dolgu: 'warn-soft', renk: 'warn', w: 278 });
        s += S.rozet(cx, my + 110, S.dar ? 'Tetramerik NMDA bloke → uyarım ↓' : 'Tetramerik NMDA bloke → uyarıcı iletim azalır', { dolgu: 'basic-soft', renk: 'basic', w: S.dar ? 310 : 385 });
      }
      return s;
    },
    metin: (p) => {
      if (p.hedef === 'bz') return REF('<b>GABAA · Benzodiazepin.</b> Beş alt birimli Cl⁻ kanalında benzodiazepin, GABA\'dan farklı bir yere (α ve γ alt birimleri arasına) bağlanarak reseptörün GABA afinitesini artırır. [[K1 s. 234]]');
      if (p.hedef === 'iv') return REF('<b>GABAA · Propofol, tiyopental ve etomidat.</b> Üçü de GABA bağlanma yerinden uzak bir bölgeye tutunup Cl⁻ iletkenliğini artırır; kesin bağlanma yerleri ve benzodiazepinlerden farklarının nedeni henüz bilinmemektedir. [[K1 s. 234]]');
      return REF('<b>Tetramerik NMDA · Ketamin, N₂O ve Xe.</b> Ketamin glutamat bölgesinden uzağa bağlanır; kitap bunu glutamat bağlanmasını önleyen bir konformasyon değişimi olarak anlatır, ancak ketamin aslında kanal gözeneğini tıkayan yarışmasız bir antagonisttir. N₂O ve ksenonun da NMDA antagonizmasıyla uyarıcı iletimi azalttığı düşünülür. [[K1 s. 234]]');
    },
  });

  /* 5) Nöromüsküler kavşak yapısı, vezikül havuzları ve iletim (4 adım) */
  VIZ.f53_nmj = (el) => SEKIL.adim(el, {
    vb: [640, 320], vbDar: [380, 360], hareket: true, oto: false,
    baslik: 'Nöromüsküler kavşak yapısı ve iletim adımları',
    ortak: (S) => {
      const w = S.w, cx = w / 2, bw = S.dar ? 340 : 500, bx = cx - bw / 2;
      let s = '';
      s += S.kutu(bx, 16, bw, 126, { dolgu: 'basic-soft', renk: 'basic', r: 16 });
      const pts = [[bx, 220]];
      const folds = S.dar ? 3 : 5, step = bw / folds;
      for (let k = 0; k < folds; k++) {
        const x0 = bx + k * step;
        pts.push([x0 + step * 0.35, 220], [x0 + step * 0.35, 266], [x0 + step * 0.65, 266], [x0 + step * 0.65, 220], [x0 + step, 220]);
      }
      pts.push([bx + bw, 298], [bx, 298], [bx, 220]);
      s += S.cizgi(pts, { dolgu: 'accent-soft', renk: 'accent', w: 2 });
      return s;
    },
    adimlar: [
      {
        ad: 'Yapı ve 3 havuz',
        metin: REF('Terminal düğmede her biri ≈5000 ACh (kuantum) taşıyan veziküllerin %1\'i aktif bölgede kenetlenmiştir, ≈%80\'i yedek havuzda, ≈%20\'si sabit depodadır; karşıdaki son plak tepelerinde >1.000.000 AChR, çukurlarda AChE bulunur. [[K1 s. 235–236]]'),
        ciz: (S) => {
          const cx = S.w / 2;
          let s = '';
          s += S.kutu(cx - (S.dar ? 156 : 220), 28, S.dar ? 102 : 132, 46, { dolgu: 'paper', renk: 'muted', yazi: ['Sabit depo', '≈%20'], yc: 'k m', lh: 15 });
          s += S.kutu(cx - (S.dar ? 46 : 72), 28, S.dar ? 202 : 292, 46, { dolgu: 'paper', renk: 'basic', yazi: ['Yedek havuz ≈%80', '(aktif bölgeyi yeniler)'], yc: 'b k', lh: 15 });
          s += S.rozet(cx, 122, 'Aktif bölge %1 · 1 kuantum ≈ 5000 ACh', { dolgu: 'warn-soft', renk: 'warn', w: S.dar ? 310 : 320 });
          s += S.t(cx, 206, 'Tepeler: >1.000.000 nikotinik AChR', { a: 'middle', c: 'b k', renk: 'accent' });
          s += S.t(cx, 286, 'Çukurlar (kavşak kıvrımları): AChE', { a: 'middle', c: 'b k', renk: 'clin' });
          return s;
        },
      },
      {
        ad: '2αβδε ve açılma',
        metin: REF('Ca²⁺ girişi 50–100 vezikülden >250.000 ACh salar. Silindirik 5 alt birimli (2α, β, δ, ε) nikotinik AChR\'nin iki α alt birimine iki ACh bağlanınca kanal ≈1 ms açılır. [[K1 s. 236]]'),
        ciz: (S, t) => {
          const cx = S.w / 2;
          let s = '';
          s += S.rozet(cx, 54, '50–100 vezikül → >250.000 ACh', { dolgu: 'warn-soft', renk: 'warn', w: 270 });
          s += S.akis([[cx - 40, 138], [cx - 40, 218]], t, { renk: 'accent', n: 3, hiz: 0.6, r: 4 });
          s += S.akis([[cx + 40, 138], [cx + 40, 218]], t, { renk: 'accent', n: 3, hiz: 0.6, r: 4 });
          s += S.rozet(cx, 178, S.dar ? '2αβδε AChR: 2 ACh → 2α (≈1 ms)' : 'AChR (2α, β, δ, ε): 2 ACh → 2 α (≈1 ms açık)', { dolgu: 'ok-soft', renk: 'ok', w: S.dar ? 300 : 365 });
          s += S.akis([[cx, 212], [cx, 278]], t, { renk: 'ok', n: 3, hiz: 0.7, r: 4.5 });
          s += S.t(cx, 290, S.dar ? 'Net katyon girişi (Na⁺ > K⁺)' : 'Net katyon girişi (Na⁺ içeri > K⁺ dışarı)', { a: 'middle', c: 'b k', renk: 'ok' });
          return s;
        },
      },
      {
        ad: '%70–80 güvenlik payı',
        metin: REF('Fazlasıyla salınan ACh sayesinde son plak potansiyeli (EPP) eşiği rahatlıkla aşar ve kas aksiyon potansiyelini tetikler; iletimi durdurmak için AChR\'lerin %70–80\'i bloke edilmelidir. [[K1 s. 236]]'),
        ciz: (S, t) => {
          const cx = S.w / 2, bw = S.dar ? 300 : 380, bx = cx - bw / 2;
          let s = '';
          s += S.kutu(bx, 48, bw, 32, { dolgu: 'paper', renk: 'line', r: 8 });
          s += S.kutu(bx, 48, bw * 0.75, 32, { dolgu: 'warn-soft', renk: 'warn', r: 8, yazi: '%70–80 AChR blok eşiği', yc: 'b k' });
          s += S.t(cx, 106, S.dar ? 'Güvenlik payı: EPP eşiği kolayca aşar' : 'Yüksek güvenlik payı: EPP eşiği kolayca aşar', { a: 'middle', c: 'b k' });
          s += S.akis([[cx - 20, 222], [cx - (S.dar ? 148 : 225), 222]], t, { renk: 'warn', n: 3, hiz: 0.65, r: 4.5 });
          s += S.akis([[cx + 20, 222], [cx + (S.dar ? 148 : 225), 222]], t, { renk: 'warn', n: 3, hiz: 0.65, r: 4.5 });
          s += S.rozet(cx, 252, S.dar ? 'Kas lifinde aksiyon potansiyeli' : 'Kas lifinde yayılan aksiyon potansiyeli', { dolgu: 'ok-soft', renk: 'ok', w: S.dar ? 275 : 320 });
          return s;
        },
      },
      {
        ad: 'AChE ve diğer AChR',
        metin: REF('Çukurlardaki AChE (anyonik ve esteratik bölgeli) ACh\'yi kolin ve asetik aside yıkar. Presinaptik AChR Na⁺ girişiyle yedek havuzu seferber eder; ekstrakavşaksal AChR sağlıklı kasta azdır. [[K1 s. 236–237]]'),
        ciz: (S, t) => {
          const cx = S.w / 2;
          let s = '';
          s += S.rozet(cx, 50, S.dar ? 'Presinaptik AChR → yedek havuz ilerler' : 'Presinaptik AChR: Na⁺ girişi → yedek havuz ilerler', { dolgu: 'basic-soft', renk: 'basic', w: S.dar ? 320 : 385 });
          s += S.akis([[cx - 85, 196], [cx - 85, 128]], t, { renk: 'ok', n: 3, hiz: 0.5, r: 4 });
          s += S.t(cx + 12, 174, S.dar ? 'Kolin geri alımı (ChAT)' : 'Kolin geri alımı → kolin + asetil-CoA (ChAT)', { a: 'middle', c: 'k' });
          s += S.rozet(cx, 248, S.dar ? 'AChE → kolin + asetik asit' : 'AChE (anyonik + esteratik bölge) → kolin + asetik asit', { dolgu: 'clin-soft', renk: 'clin', w: S.dar ? 260 : 405 });
          s += S.t(cx, 290, S.dar ? 'Kavşak dışı: az ekstrakavşaksal AChR' : 'Kavşak dışı zar: az sayıda ekstrakavşaksal AChR', { a: 'middle', c: 'k m' });
          return s;
        },
      },
    ],
  });

  /* 6) NMJ'de etki eden ilaçlar ve toksinler */
  VIZ.f53_ilac = (el) => SEKIL.sahne(el, {
    vb: [640, 300], vbDar: [380, 360], hareket: true, sure: 6,
    baslik: 'Nöromüsküler kavşakta etki eden ilaçların hedef noktaları',
    secenek: {
      id: 'ilac', ad: 'İlaç / mekanizma',
      liste: [
        { d: 'pre', ad: 'Presinaptik engeller' },
        { d: 'suk', ad: 'Süksametonyum' },
        { d: 'nd', ad: 'Nondepolarizan' },
        { d: 'ache', ad: 'Antikolinesteraz' },
      ],
    },
    ciz: (S, t, p) => {
      const cx = S.w / 2, bw = S.dar ? 340 : 520, bx = cx - bw / 2;
      let s = '';
      s += S.kutu(bx, 18, bw, 108, { dolgu: 'basic-soft', renk: 'basic', r: 14 });
      s += S.t(cx, 40, 'Presinaptik terminal düğme', { a: 'middle', c: 'b k' });
      s += S.kutu(bx, 192, bw, 88, { dolgu: 'accent-soft', renk: 'accent', r: 14 });

      if (p.ilac === 'pre') {
        if (!S.dar) {
          s += S.kutu(bx + 14, 54, 152, 58, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Hemikolinyum', 'Kolin alımı ✗'], yc: 'b k', lh: 16 });
          s += S.kutu(cx - 82, 54, 164, 58, { dolgu: 'warn-soft', renk: 'warn', yazi: ['Mg²⁺ / Aminoglikozit', 'Ca²⁺ kanalı ✗'], yc: 'b k', lh: 16 });
          s += S.kutu(bx + bw - 166, 54, 152, 58, { dolgu: 'crit-soft', renk: 'crit', yazi: ['Botulinum toksini', 'SNAP-25 yıkımı ✗'], yc: 'b k', lh: 16 });
        } else {
          s += S.t(cx, 64, '1 · Hemikolinyum: kolin alımı ✗', { a: 'middle', c: 'b k', renk: 'crit' });
          s += S.t(cx, 86, '2 · Mg²⁺ / aminoglikozit: Ca²⁺ kanalı ✗', { a: 'middle', c: 'b k', renk: 'warn' });
          s += S.t(cx, 108, '3 · Botulinum toksini: SNAP-25 yıkımı ✗', { a: 'middle', c: 'b k', renk: 'crit' });
        }
        s += S.rozet(cx, 158, 'Sinaptik aralığa ACh salınamaz', { dolgu: 'paper', renk: 'muted', w: 265 });
        s += S.t(cx, S.dar ? 230 : 238, S.dar ? ['Motor son plak uyarısız kalır', '(ör. preeklampside Mg²⁺ güçsüzlüğü)'] : 'Motor son plak uyarısız kalır (ör. preeklampside Mg²⁺ güçsüzlüğü)', { a: 'middle', c: 'k m', lh: 18 });
      } else if (p.ilac === 'suk') {
        s += S.t(cx, 82, 'AChE süksametonyumu hidrolize edemez', { a: 'middle', c: 'b k', renk: 'warn' });
        s += S.rozet(cx, 156, S.dar ? 'Süksametonyum (2×ACh) → iki α' : 'Süksametonyum (ACh–ACh) → iki α alt birimi', { dolgu: 'warn-soft', renk: 'warn', w: S.dar ? 285 : 350 });
        s += S.kutu(cx - 24, 182, 48, 26, { dolgu: 'ok-soft', renk: 'ok', yazi: 'Açık', yc: 'b k' });
        s += S.akis([[cx, 168], [cx, 226]], t, { renk: 'warn', n: 3, hiz: 0.55, r: 4 });
        s += S.t(cx, 240, S.dar ? 'Sürekli depolarizasyon → Na⁺ kanalı inaktif' : 'Sürekli depolarizasyon → voltaj kapılı Na⁺ kanalları inaktif', { a: 'middle', c: 'b k', renk: 'crit' });
        s += S.t(cx, 264, 'Tek ateşleme (fasikülasyon) → flask paralizi', { a: 'middle', c: 'k' });
      } else if (p.ilac === 'nd') {
        s += S.t(cx, 82, 'Aminosteroitler ve benzilizokinolinyumlar', { a: 'middle', c: 'b k' });
        s += S.rozet(cx, 156, S.dar ? 'Yarışmalı blok · İntrinsik etki yok' : 'ACh ile yarışmalı antagonizma · İntrinsik aktivite yok', { dolgu: 'crit-soft', renk: 'crit', w: S.dar ? 295 : 385 });
        s += S.kutu(cx - 32, 182, 64, 26, { dolgu: 'crit-soft', renk: 'crit', yazi: 'Kapalı', yc: 'b k' });
        s += S.t(cx, 240, S.dar ? 'Yeterli ACh bağlanamaz → EPP eşik altı' : 'Yeterli ACh bağlanamaz → EPP eşik altında kalır', { a: 'middle', c: 'b k' });
        s += S.t(cx, 264, S.dar ? 'Fasikülasyonsuz flask paralizi' : 'Başlangıç kasılması (fasikülasyon) olmadan flask paralizi', { a: 'middle', c: 'k m' });
      } else {
        s += S.akis([[cx - 50, 126], [cx - 50, 188]], t, { renk: 'ok', n: 4, hiz: 0.5, r: 4.5 });
        s += S.akis([[cx + 50, 126], [cx + 50, 188]], t, { renk: 'ok', n: 4, hiz: 0.5, r: 4.5 });
        s += S.rozet(cx, 158, S.dar ? 'Antikolinesteraz → AChE bloke' : 'Antikolinesteraz → AChE (anyonik + esteratik) bloke', { dolgu: 'ok-soft', renk: 'ok', w: S.dar ? 280 : 395 });
        s += S.t(cx, 236, S.dar ? 'AChE (anyonik + esteratik) inhibisyonu' : 'Geri dönüşümlü veya geri dönüşümsüz AChE inhibisyonu', { a: 'middle', c: 'b k', renk: 'ok' });
        s += S.t(cx, 262, S.dar ? 'Kavşakta ACh yıkımı durur, etki uzar' : 'Kavşakta ACh yıkımı durur, ACh derişimi ve etki süresi artar', { a: 'middle', c: 'k' });
      }
      return s;
    },
    metin: (p) => {
      if (p.ilac === 'pre') return REF('<b>Presinaptik engeller.</b> Hemikolinyum kolin alımını, Mg²⁺ ve aminoglikozitler voltaj kapılı Ca²⁺ kanallarını, botulinum toksini ise vezikül kenetlenme proteini SNAP-25\'i hedefleyerek ACh salınımını önler. [[K1 s. 236–237]]');
      if (p.ilac === 'suk') return REF('<b>Süksametonyum (depolarizan blok).</b> Uç uca iki ACh molekülünden oluşur; iki α alt birimine bağlanıp kanalı açar ama AChE ile yıkılmaz. Zar depolarize kaldıkça hızlı voltaj kapılı Na⁺ kanalları inaktif durumdan çıkamaz: fasikülasyon ardından flask paralizi gelişir. [[K1 s. 237]]');
      if (p.ilac === 'nd') return REF('<b>Nondepolarizan kas gevşeticiler.</b> Aminosteroitler ve benzilizokinolinyumlar AChR bağlanma yeri için ACh ile yarışır; intrinsik aktiviteleri olmadığından fasikülasyon yapmaksızın flask paralizi oluştururlar. [[K1 s. 237]]');
      return REF('<b>Antikolinesterazlar.</b> AChE aktif merkezindeki anyonik ve esteratik bağlanma bölgelerine geri dönüşümlü ya da geri dönüşümsüz bağlanarak ACh hidrolizini önler. [[K1 s. 236]]');
    },
  });

  /* 7) Miyastenia gravis: ardışık uyarılarda EPP ve güvenlik payı (% eşik) */
  VIZ.f53_mg = (el) => SEKIL.grafik(el, {
    vb: [640, 310], vbDar: [380, 330],
    baslik: 'Miyastenia graviste ardışık uyarılarda son plak potansiyeli',
    secenek: {
      id: 'durum', ad: 'Görünüm',
      liste: [{ d: 'norm', ad: 'Sağlıklı NMJ' }, { d: 'mg', ad: 'Miyastenia gravis' }, { d: 'ikisi', ad: 'İkisini karşılaştır' }],
    },
    x: { min: 1, max: 6, ad: 'Ardışık aksiyon potansiyeli (1 → 6)', adimlar: [1, 2, 3, 4, 5, 6] },
    y: { min: 0, max: 350, ad: 'EPP genliği (eşik %, şematik)', adimlar: [0, 100, 200, 300] },
    yatay: () => [{ y: 100, ad: 'Kas AP eşiği (%100)', renk: 'warn' }],
    egriler: [
      {
        renk: 'ok', w: 3, ad: 'Sağlıklı NMJ', adYer: 0.72,
        goster: (p) => p.durum !== 'mg',
        f: (x) => 220 + 100 * Math.exp(-(x - 1) / 1.8),
      },
      {
        renk: 'crit', w: 3, ad: 'Miyastenia gravis', adYer: 0.68,
        goster: (p) => p.durum !== 'norm',
        f: (x) => 65 + 58 * Math.exp(-(x - 1) / 1.6),
      },
    ],
    noktalar: (p) => {
      const pts = [];
      for (let k = 1; k <= 6; k++) {
        if (p.durum !== 'mg') pts.push({ x: k, y: 220 + 100 * Math.exp(-(k - 1) / 1.8), renk: 'ok' });
        if (p.durum !== 'norm') pts.push({ x: k, y: 65 + 58 * Math.exp(-(k - 1) / 1.6), renk: 'crit' });
      }
      return pts;
    },
    okuma: (p) => {
      if (p.durum === 'norm') return REF('<b>Sağlıklı NMJ.</b> Geniş güvenlik payı (%70–80 blok eşiği) sayesinde ardışık uyarılarda EPP her seferinde kas aksiyon potansiyeli eşiğini (%100) rahatça aşar. Miyastenia gravis görünümüne geçin. [[K1 s. 236–237]]');
      if (p.durum === 'mg') return REF('<b>Miyastenia gravis.</b> Anti-AChR IgG (%10 seronegatif hastanın bir kısmında anti-MuSK) AChR sayısını azaltıp kıvrımları düzleştirerek EPP\'yi küçültür; kitaba göre presinaptik AChR yıkımıyla yedek havuz seferberliği de azaldığından tekrarlayan uyarılarda EPP eşik altına düşer (yorulabilir güçsüzlük). [[K1 s. 237]]');
      return REF('<b>Karşılaştırma.</b> Sağlıklı son plakta tekrarlayan uyarılar güvenlik payı içinde kalırken, MG\'de azalmış ACh–AChR etkileşimi ve azalan vezikül sunumu EPP\'yi hızla eşik altına indirir. [[K1 s. 237]]');
    },
  });

  /* 8) Denervasyon aşırı duyarlılığı ve süksametonyum hiperkalemisi */
  VIZ.f53_denerv = (el) => SEKIL.sahne(el, {
    vb: [640, 300], vbDar: [380, 360], hareket: true, sure: 6,
    baslik: 'Denervasyon aşırı duyarlılığı ve ekstrakavşaksal reseptörler',
    secenek: {
      id: 'kas', ad: 'Kas zarı',
      liste: [{ d: 'norm', ad: 'Normal kas (2αβδε)' }, { d: 'den', ad: 'Denerve kas (2αβδγ + süksametonyum)' }],
    },
    ciz: (S, t, p) => {
      const cx = S.w / 2, bw = S.dar ? 340 : 540, bx = cx - bw / 2;
      let s = '';
      s += S.t(cx, 28, 'Hücre dışı sıvı / plazma', { a: 'middle', c: 'k m' });
      s += S.kutu(bx, 110, bw, 108, { dolgu: p.kas === 'norm' ? 'ok-soft' : 'crit-soft', renk: p.kas === 'norm' ? 'ok' : 'crit', r: 16 });
      s += S.kutu(cx - 58, 98, 116, 24, { dolgu: 'accent-soft', renk: 'accent', yazi: 'Motor son plak', yc: 'b k' });

      if (p.kas === 'norm') {
        [-32, 0, 32].forEach((dx) => {
          s += S.kutu(cx + dx - 8, 92, 16, 26, { dolgu: 'paper', renk: 'ok', r: 4 });
        });
        s += S.akis([[cx, 145], [cx, 54]], t, { renk: 'ok', n: 2, hiz: 0.45, r: 4 });
        s += S.t(cx, 158, S.dar ? 'Yalnız kavşakta AChR (2α, β, δ, ε)' : 'Yalnız kavşakta erişkin AChR (2α, β, δ, ε)', { a: 'middle', c: 'b k' });
        s += S.t(cx, 184, 'Kanal açık kalma ≈ 1 ms · Sınırlı K⁺ çıkışı', { a: 'middle', c: 'k m' });
        s += S.rozet(cx, 258, 'Kavşak dışı zarda çok az AChR bulunur', { dolgu: 'ok-soft', renk: 'ok', w: S.dar ? 315 : 335 });
      } else {
        const n = S.dar ? 7 : 11;
        for (let k = 0; k < n; k++) {
          const rx = bx + 22 + (k * (bw - 44)) / (n - 1);
          s += S.kutu(rx - 7, 94, 14, 26, { dolgu: 'warn-soft', renk: 'crit', r: 3 });
          if (k % 2 === 0) s += S.akis([[rx, 154], [rx, 46]], t, { renk: 'crit', n: 2, hiz: 0.65, r: 4.2 });
        }
        s += S.rozet(cx, 62, S.dar ? 'Yoğun K⁺ çıkışı → ağır hiperkalemi' : 'Yoğun K⁺ çıkışı → yaşamı tehdit eden hiperkalemi', { dolgu: 'crit-soft', renk: 'crit', w: S.dar ? 305 : 395 });
        s += S.t(cx, 156, S.dar ? 'Tüm zarda fetal AChR (ε → γ)' : 'Tüm zarda fetal tip ekstrakavşaksal AChR (ε → γ)', { a: 'middle', c: 'b k', renk: 'crit' });
        s += S.t(cx, 182, S.dar ? 'Açık kalma ≤ 10 ms (yanık, MND, CMT)' : 'Açık kalma süresi ≤ 10 ms (yanık, omurilik hasarı, MND, CMT)', { a: 'middle', c: 'k' });
        s += S.rozet(cx, 258, S.dar ? '<24 sa güvenli · >24 sa–100 gün risk' : 'Kitap: <24 sa güvenli · >24 sa risk · ≈100 gün sonra azalır', { dolgu: 'warn-soft', renk: 'warn', w: S.dar ? 318 : 425 });
      }
      return s;
    },
    metin: (p) => REF(p.kas === 'norm'
      ? '<b>Normal kas (2αβδε).</b> ACh reseptörleri neredeyse yalnızca motor son plaktadır ve açıldığında ≈1 ms açık kalır; süksametonyum sonrası plazma K⁺ artışı sınırlıdır. Denerve kas durumuna geçin. [[K1 s. 236–238]]'
      : '<b>Denerve kas (2αβδγ + süksametonyum).</b> Erişkin ε alt biriminin yerini fetal γ alır ve reseptörler tüm kas zarına yayılır. Süksametonyum çok sayıda kanalı 10 ms\'ye kadar açık tutarak ağır K⁺ çıkışı ve ölümcül hiperkalemi doğurur (kitaba göre risk 24 saatten sonra başlar). [[K1 s. 237–238]]'),
  });
})();
