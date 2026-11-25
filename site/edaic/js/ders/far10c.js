(function () {
  'use strict';
  const VIZ = window.VIZ;

  // Seçilen durumun nedenini, aracısını ve sonucunu aynı sırada tut.
  function yol(el, baslik, kontrol, durumlar) {
    return SEKIL.sahne(el, {
      baslik, vb: [640, 110], vbDar: [320, 206],
      secenek: { id: 'durum', ad: kontrol, liste: durumlar.map((d, i) => ({ d: String(i), ad: d.ad })) },
      metin: p => durumlar[p.durum].metin,
      ciz: (S, t, p) => {
        const { kutular } = durumlar[p.durum];
        return kutular.map((yazi, i) => {
          const x = S.dar ? 20 : 4 + i * 218;
          const y = S.dar ? 4 + i * 73 : 22;
          const w = S.dar ? 280 : 192;
          const h = S.dar ? 52 : 62;
          const ok = S.dar ? [[160, y - 20], [160, y - 3]] : [[x - 25, 53], [x - 3, 53]];
          return (i ? S.ok(ok, { renk: 'muted' }) : '') +
            S.kutu(x, y, w, h, { yazi, dolgu: i === 2 ? 'accent-soft' : 'paper', renk: i === 2 ? 'accent' : 'line' });
        }).join('');
      }
    });
  }

  VIZ.a10c_denge = el => yol(el, 'Trombosit ile endotelin damar ve agregasyon üzerindeki etkileri', 'Yolu seçin', [
    { ad: 'Trombosit', kutular: ['Trombosit aktivasyonu', 'Tromboksan A₂', ['Vazokonstriksiyon', 'Agregasyon ↑']], metin: 'Adenozin, kollajen veya adrenalin trombositi aktive eder ve tromboksan üretimi hemostazı destekler. [[K3 s. 154]]' },
    { ad: 'Endotel', kutular: ['Endotelde COX-2', 'Prostasiklin (PGI₂)', ['Vazodilatasyon', 'Agregasyon ↓']], metin: 'Endotel kaynaklı prostasiklin trombositlerin kümelenmesini sınırlar. [[K3 s. 154]] Endotelde bu ürünün sentezine COX-2 aracılık eder. [[K3 s. 156]]' },
    { ad: 'Düşük doz aspirin', kutular: ['Trombosit COX’u baskılı', 'Tromboksan A₂ ↓', ['Damar dilate kalır', 'Agregasyon ↓']], metin: 'Damar duvarında prostaglandin sentezi korunurken trombositin tromboksan üretimi baskılanır. [[K3 s. 158]]' }
  ]);

  VIZ.a10c_bobrek = el => yol(el, 'Vazokonstriktörler yüksekken böbrek perfüzyonu', 'Prostaglandin sentezi', [
    { ad: 'Korunmuş', kutular: [['Renin, anjiyotensin,', 'noradrenalin ↑'], 'Renal PGE₂ ve PGI₂', ['Yeterli böbrek', 'perfüzyonu']], metin: 'Vazokonstriktör düzeyleri yüksekken böbreğin kanlanmasını yerel prostaglandinler destekler. [[K3 s. 157]]' },
    { ad: 'NSAİİ ile baskılı', kutular: ['COX inhibisyonu', 'Renal PGE₂ ve PGI₂ ↓', ['Böbrek perfüzyonu', 'azalabilir']], metin: 'Aspirin veya diğer NSAİİ’lerle bu denge bozulursa akut böbrek yetmezliği gelişebilir. [[K3 s. 157]]' }
  ]);

  VIZ.a10c_solunum = el => yol(el, 'Salisilat düzeyi yükselirken ventilasyon ve asit–baz dengesi', 'Durum', [
    { ad: 'Başlangıç', kutular: [['Fosforilasyonda', 'eşleşme bozulur'], ['O₂ tüketimi ↑', 'CO₂ üretimi ↑'], ['Dakika ventilasyonu ↑', 'PaCO₂ korunur']], metin: 'Oksidatif fosforilasyonda eşleşmenin bozulmasıyla O₂ tüketimi ve CO₂ üretimi birlikte artar. [[K3 s. 158]]' },
    { ad: 'Erişkinde ilerleyiş', kutular: ['Aspirin düzeyi ↑', ['Solunum merkezi', 'doğrudan uyarılır'], 'Respiratuvar alkaloz'], metin: 'İleri evrede respiratuvar alkaloza metabolik asidoz eklenir. [[K3 s. 158–159]]' },
    { ad: 'Çocukta ilerleyiş', kutular: ['Aspirin düzeyi ↑', ['Solunum merkezi', 'baskılanır'], ['Respiratuvar ve', 'metabolik asidoz']], metin: 'Çocukta metabolik asidoz daha erken gelişir ve karma asidoz daha sık görülür. [[K3 s. 158]]' }
  ]);

  VIZ.a10c_glutatyon = el => yol(el, 'Parasetamol metabolitinin karaciğerdeki akıbeti', 'Durum', [
    { ad: 'Terapötik doz', kutular: [['Toksik metabolit', 'az miktarda oluşur'], ['Hepatik glutatyonla', 'hızlı konjugasyon'], 'Zararsız ürün'], metin: 'Terapötik dozda çok toksik olan benzokinon imin türevi az miktarda oluşur. [[K3 s. 160]]' },
    { ad: 'Toksik doz', kutular: ['Konjugasyon doyar', ['Toksik metabolit ↑', 'Glutatyon tükenir'], ['Sentrilobüler', 'hepatik nekroz']], metin: 'Metabolit hepatositlerin sülfhidril gruplarına kovalent bağlanabilir ve hücre ölümüne yol açabilir. [[K3 s. 160]]' },
    { ad: 'Metiyonin', kutular: ['Oral metiyonin', 'Glutatyon sentezi ↑', ['Glutatyon deposunu', 'yenileme']], metin: 'Metiyonin karaciğerde glutatyon sentezini artırır. [[K3 s. 160]]' },
    { ad: 'Asetilsistein', kutular: [['Oral veya İV', 'asetilsistein'], ['Hidrolizle sistein', 'oluşur'], ['Glutatyon sentezine', 'öncül sağlanır']], metin: 'Aşırı dozda kusma sık olduğu için asetilsisteinin intravenöz yolu tercih edilir. [[K3 s. 160]]' }
  ]);
})();
