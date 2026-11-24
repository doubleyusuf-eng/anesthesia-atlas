/* Hipnotikler ve anksiyolitikler · K3, Türkçe çalışma çevirisi, s. 279–284. */
(function () {
  'use strict';
  const VIZ = window.VIZ;
  const ortada = { a: 'middle', c: 'b' };
  const secim = (ad, adlar) => ({
    id: 'secili', ad, liste: adlar.map(d => ({ d, ad: d })),
  });

  const gabaVeri = {
    'GABAA (GABA)': 'GABA, ligand kapılı Cl⁻ kanalının açılma sıklığını artırarak Cl⁻ iletkenliğini yükseltir ve membranı hiperpolarize eder. [[K3 s. 279]]',
    'GABAA (+BDZ)': 'Benzodiazepinler aktive olmuş GABAA reseptörünün α alt birimine bağlanır ve Cl⁻ iletkenliğini güçlendirir. [[K3 s. 279]]',
    'GABAB (Baklofen)': 'Metabotropik GABAB reseptörü G-proteiniyle K⁺ iletkenliğini artırır; baklofen spastisiteyi yalnız GABAB ile azaltır. [[K3 s. 279]]',
  };
  VIZ.a18a_gaba = (el) => SEKIL.sahne(el, {
    baslik: 'GABAA ve GABAB reseptör mekanizmaları',
    vb: [640, 250], vbDar: [360, 304], hareket: true, sure: 4,
    secenek: secim('Reseptör durumu', Object.keys(gabaVeri)),
    metin: p => gabaVeri[p.secili],
    ciz: (S, t, { secili }) => {
      const b = secili === 'GABAB (Baklofen)';
      const bdz = secili === 'GABAA (+BDZ)';
      const W = S.w, mY = S.dar ? 94 : 88;
      let svg = S.kutu(12, mY, W - 24, 34, { dolgu: 'chip', renk: 'line', r: 6 })
        + S.t(W - 22, mY + 22, 'Membran', { a: 'end', c: 'k m' });
      if (!b) {
        const kx = W * 0.42;
        svg += S.kutu(kx - 56, mY - 22, 112, 78, { dolgu: 'basic-soft', renk: 'basic', w: 2.5 })
          + S.kutu(kx - 14, mY - 24, 28, 82, { dolgu: 'paper', renk: 'basic', r: 4 })
          + S.t(kx, 20, ['GABAA (5 alt birim:', '2α, β, δ, γ)'], { a: 'middle', c: 'b k', lh: 18 });
        svg += S.rozet(kx - 76, mY - 12, 'GABA', { dolgu: 'accent-soft', renk: 'accent', w: 60 });
        if (bdz) svg += S.rozet(kx + 84, mY - 12, 'BDZ → α', { dolgu: 'clin-soft', renk: 'clin', w: 78 });
        const yol = [[kx, mY - 32], [kx, mY + 84]];
        svg += S.ok(yol, { renk: bdz ? 'clin' : 'basic', w: bdz ? 5 : 3 })
          + S.akis(yol, t, { renk: bdz ? 'clin' : 'basic', n: bdz ? 5 : 3, hiz: bdz ? 0.65 : 0.35 })
          + S.t(kx + 24, mY + 72, bdz ? 'Cl⁻ girişi ↑↑' : 'Cl⁻ girişi ↑', { c: 'b', renk: bdz ? 'clin' : 'basic' });
        const sy = S.dar ? 202 : 196;
        return svg + S.kutu(18, sy, W - 36, S.dar ? 88 : 42, {
          dolgu: 'ok-soft', renk: 'ok',
          yazi: S.dar ? ['Hiperpolarizasyon', 'Esas postsinaptik · BZ1/BZ2 alt tipleri'] : 'Hiperpolarizasyon · Esas postsinaptik · BZ1 anksiyoliz, BZ2 sedasyon',
          lh: 22,
        });
      }
      const kx = W * 0.34, gx = W * 0.68;
      svg += S.kutu(kx - 48, mY - 18, 96, 68, { dolgu: 'accent-soft', renk: 'accent', w: 2.5, yazi: 'GABAB', lh: 18 })
        + S.rozet(kx, mY - 32, 'Baklofen', { dolgu: 'accent-soft', renk: 'accent', w: 80 })
        + S.ok([[kx + 50, mY + 22], [gx - 42, mY + 22]], { renk: 'accent', w: 2.5 })
        + S.t((kx + gx) / 2, mY + 14, 'G-prot.', { a: 'middle', c: 'k' })
        + S.kutu(gx - 38, mY - 14, 76, 62, { dolgu: 'basic-soft', renk: 'basic', yazi: 'K⁺ kanalı', yc: 'b k' });
      const kyol = [[gx, mY + 74], [gx, mY - 36]];
      svg += S.ok(kyol, { renk: 'clin', w: 3.5 })
        + S.akis(kyol, t, { renk: 'clin', n: 3, hiz: 0.4 })
        + S.t(gx + 16, mY - 22, 'K⁺ çıkışı ↑', { c: 'b', renk: 'clin' });
      const sy = S.dar ? 202 : 196;
      return svg + S.kutu(18, sy, W - 36, S.dar ? 88 : 44, {
        dolgu: 'ok-soft', renk: 'ok',
        yazi: S.dar ? ['Hiperpolarizasyon (metabotropik)', 'Beyin pre/postsinaptik · Arka boynuz'] : 'Hiperpolarizasyon · Beyinde pre/postsinaptik + omurilik arka boynuzu',
        lh: 22,
      });
    },
  });

  VIZ.a18a_midazolam = (el) => SEKIL.sahne(el, {
    baslik: 'Midazolamın pH ile değişen halka yapısı',
    vb: [640, 210], vbDar: [360, 248],
    secenek: secim('Ortam', ['Flakon (pH 3,5)', 'Plazma (pH 7,4)']),
    metin: p => p.secili === 'Flakon (pH 3,5)'
      ? 'pH 3,5’te diazepin halkası açıktır; molekül iyonizedir, suda çözünür ve enjeksiyonda ağrı yapmaz. [[K3 s. 280]]'
      : 'pH > 4’te halka kapanır; pKa 6,5 nedeniyle fizyolojik pH’da %89 iyonize değildir, lipitte çözünür ve membranı geçer. [[K3 s. 280]]',
    ciz: (S, t, { secili }) => {
      const acik = secili === 'Flakon (pH 3,5)';
      const W = S.w, cx = S.dar ? W / 2 : 185, cy = S.dar ? 78 : 104;
      // Benzen + diazepin şematik halkalar
      let svg = S.cizgi([[cx - 90, cy - 22], [cx - 60, cy - 38], [cx - 30, cy - 22], [cx - 30, cy + 16], [cx - 60, cy + 32], [cx - 90, cy + 16], [cx - 90, cy - 22]], { renk: 'muted', w: 2.5 })
        + S.t(cx - 60, cy + 5, 'Benzen', { a: 'middle', c: 'k m' });
      const dPts = acik
        ? [[cx - 30, cy - 22], [cx + 4, cy - 42], [cx + 44, cy - 28], [cx + 58, cy + 8], [cx + 34, cy + 38]]
        : [[cx - 30, cy - 22], [cx + 4, cy - 42], [cx + 44, cy - 28], [cx + 58, cy + 4], [cx + 32, cy + 32], [cx - 30, cy + 16]];
      svg += S.cizgi(dPts, { renk: acik ? 'basic' : 'accent', w: 3.5 })
        + S.t(cx + 18, cy + 2, acik ? 'Açık' : 'Kapalı', { a: 'middle', c: 'b', renk: acik ? 'basic' : 'accent' })
        + S.t(cx, cy + 62, acik ? 'İyonize halka (pH < 4)' : 'Noniyonize %89 (pKa 6,5)', { a: 'middle', c: 'b k' });
      const bx = S.dar ? 18 : 310, by = S.dar ? 162 : 34, bw = S.dar ? W - 36 : 312, bh = S.dar ? 74 : 138;
      return svg + S.kutu(bx, by, bw, bh, {
        dolgu: acik ? 'basic-soft' : 'accent-soft',
        renk: acik ? 'basic' : 'accent',
        yazi: acik
          ? ['Suda çözünür', 'Enjeksiyon ağrısız', 'Membran geçişi düşük']
          : ['Lipitte çözünür', 'Lipit membranları geçer', 'Dağılım nedeniyle kısa etki'],
        lh: S.dar ? 21 : 28,
      });
    },
  });

  const bdzVeri = {
    Diazepam: {
      yol: ['Karaciğer oksidasyonu', '→ Desmetildiazepam, oksazepam,', 'temazepam (tümü AKTİF)', '→ Glukuronid idrarla'],
      t: '20–45 sa', cl: '0,2–0,5 mL/kg/dk', prot: '%95', vd: '1,0–1,5 L/kg', renk: 'warn',
      metin: 'Diazepam en düşük klirense ve aktif metabolitlere sahiptir; infüzyonda yarılanma ömrü çok artar. [[K3 s. 281]]',
    },
    Midazolam: {
      yol: ['Hidroksilasyon → 1-α hidroksimidazolam', '(AKTİF) + <%5 oksazepam', '→ Glukuronik asit konjugasyonu', '→ Böbrekten atılım'],
      t: '1–4 sa', cl: '6–10 mL/kg/dk', prot: '%95', vd: '1,0–1,5 L/kg', renk: 'accent',
      metin: 'Midazolamın klirensi diazepam ve lorazepamdan yüksektir; infüzyon sonrası etki daha hızla sonlanır. [[K3 s. 280–281]]',
    },
    Lorazepam: {
      yol: ['Doğrudan glukuronik asitle', 'konjugasyon', '→ İNAKTİF metabolitler', '→ İdrarla atılım'],
      t: '10–20 sa', cl: '1,0–1,5 mL/kg/dk', prot: '%95', vd: '0,75–1,30 L/kg', renk: 'ok',
      metin: 'Lorazepam glukuronidasyonla idrarla atılan inaktif metabolitler oluşturur. [[K3 s. 281]]',
    },
    Temazepam: {
      yol: ['%80 idrarla değişmeden (kitap)', 'Karaciğerde glukuronidasyon', 'Çok az miktar demetilasyonla', 'oksazepama (<%5)'],
      t: '~8 sa', cl: 'Kitapta yok', prot: '%75', vd: '0,8 L/kg', renk: 'basic',
      metin: 'Temazepamın yarılanma ömrü yaklaşık 8 saattir ve ertesi güne sarkan etkiler yapabilir. [[K3 s. 282]]',
    },
  };
  VIZ.a18a_bdz_met = (el) => SEKIL.sahne(el, {
    baslik: 'Benzodiazepin metabolizması ve kinetik karşılaştırması',
    vb: [640, 214], vbDar: [360, 260],
    secenek: secim('Benzodiazepin', Object.keys(bdzVeri)),
    metin: p => bdzVeri[p.secili].metin,
    ciz: (S, t, { secili }) => {
      const v = bdzVeri[secili], W = S.w;
      if (S.dar) {
        return S.kutu(12, 8, W - 24, 118, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.yol, lh: 23 })
          + S.kutu(12, 138, W - 24, 110, {
            dolgu: 'paper', renk: 'line',
            yazi: [`t½: ${v.t} · Vd: ${v.vd}`, `Klirens: ${v.cl}`, `Proteine bağlanma: ${v.prot}`], lh: 26,
          });
      }
      return S.kutu(12, 16, 360, 180, { dolgu: v.renk + '-soft', renk: v.renk, yazi: v.yol, lh: 26 })
        + S.kutu(388, 16, 240, 180, {
          dolgu: 'paper', renk: 'line',
          yazi: [`t½: ${v.t}`, `Klirens: ${v.cl}`, `Vd: ${v.vd}`, `Protein: ${v.prot}`], lh: 30,
        });
    },
  });

  function zincir(baslik, adimlar) {
    return {
      baslik, vb: [640, 316], vbDar: [360, 316], oto: false, adimlar,
      ortak: (S, secili) => adimlar.map(({ satir }, i) => {
        const y = 8 + i * 78, etkin = secili === i, orta = S.w / 2;
        const bag = i ? S.ok([[orta, y - 18], [orta, y - 4]], { renk: 'muted' }) : '';
        return bag + S.kutu(S.w * 0.05, y, S.w * 0.9, 56, {
          yazi: satir, yc: etkin ? 'b' : 'normal', lh: 20, w: etkin ? 3 : 1,
          renk: etkin ? 'accent' : 'line', dolgu: etkin ? 'accent-soft' : 'paper',
        });
      }).join(''),
    };
  }

  VIZ.a18a_flumazenil = (el) => SEKIL.adim(el, zincir('Flumazenil ile BDZ geri döndürme ve riskler', [
    { ad: 'Sedasyon', satir: ['GABAA üzerinde BDZ etkisi', 'Aşırı sedasyon veya doz aşımı'], metin: 'Flumazenil küçük işlemler sonrası aşırı sedasyonu gidermek veya BDZ doz aşımını tedavi etmek için kullanılır. [[K3 s. 282]]' },
    { ad: 'Antagonizma', satir: ['İV 100 μg artışlar · Etki < 2 dk', 'Kompetitif BDZ antagonisti'], metin: '100 μg artışlarla İV verilir ve 2 dakika içinde etki eder. [[K3 s. 282–283]]' },
    { ad: 'Kısa ömür', satir: ['Flumazenil t½ ~1 saat', 'Ek doz / infüzyon gerekebilir'], metin: 'Birçok BDZ’ye göre t½ kısa olduğundan (~1 saat) ek dozlar veya infüzyon gerekebilir. [[K3 s. 282]]' },
    { ad: 'Nöbet riski', satir: ['Çoklu ilaç aşımı / epilepsi', 'Ters agonist etkiyle nöbet olabilir'], metin: 'Bir miktar ters agonist aktivite gösterebilir; özellikle epilepside ve çoklu ilaç doz aşımında nöbet tetikleyebilir. [[K3 s. 282–283]]' },
  ]));

  VIZ.a18a_deks = (el) => SEKIL.adim(el, zincir('Deksmedetomidinin merkezden damara etkileri', [
    { ad: 'Mekanizma', satir: ['α₂:α₁ = 1600:1 · Locus coeruleus', 'NA ↓ → Doğal uykuya yakın sedasyon'], metin: 'Ponsta locus coeruleus’ta NA salınımını inhibe eder; substantia gelatinosa’da analjezi sağlar. [[K3 s. 283]]' },
    { ad: 'Yükleme', satir: ['Başlangıçta vasküler α₂B uyarısı', 'Geçici hipertansiyon (bukkalde yok)'], metin: 'Parenteral yükleme sırasında vasküler düz kas α₂B reseptörleriyle başlangıç hipertansiyonu görülebilir. [[K3 s. 284]]' },
    { ad: 'Ardından', satir: ['Santral NA ↓ → KB ↓ ve KAH ↓', 'Tek ajanda nadiren asistoli'], metin: 'Ardından hipotansiyon ve bradikardi gelişir; bu profil yükleme aşamasında daha sıktır, nadir de olsa asistoli bildirilmiştir ve ileti kusurunda son derece dikkat gerekir. [[K3 s. 284]]' },
    { ad: 'Hava yolu', satir: ['Solunum bozulmuyor görünür · Hava yolu açık', 'Dekonjestan ve antisiyalagog'], metin: 'Ekstübasyonda ve fiberoptik entübasyon sedasyonunda yararlı olabilir. [[K3 s. 284]]' },
  ]));
})();
