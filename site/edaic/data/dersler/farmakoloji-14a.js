VERI.sorular = VERI.sorular || {};
VERI.sorular['far14a-1'] = {
  no: 1, kagit: 'Paper A · Farmakoloji', kok: 'α-adrenoseptör uyarısı ve fentolamin', kaynak: '[[K3 s. 226–227]]',
  onermeler: [
    { t: 'Presinaptik α₂ uyarısı noradrenalin salınımını artırır.', d: false, n: 'Presinaptik α₂ uyarısı salınımı baskılar. [[K3 s. 227]]' },
    { t: 'Fentolaminin α₁ afinitesi α₂ afinitesinin üç katıdır.', d: true, n: 'Her iki reseptörü bloke eden fentolamin α₁ reseptörüne üç kat daha yüksek afinite gösterir. [[K3 s. 226]]' },
    { t: 'Fentolaminin intravenöz etkisi 1–2 dakikada başlar.', d: true, n: 'İntravenöz başlangıç 1–2 dakika, etki süresi 5–20 dakikadır. [[K3 s. 226]]' },
    { t: 'Fentolamin bağırsak motilitesini azaltır.', d: false, n: 'Gastrointestinal sekresyon ve motilite artar. [[K3 s. 226]]' },
    { t: 'Fentolamin insülin sekresyonunu baskılar.', d: false, n: 'İnsülin sekresyonu artar ve hipoglisemi gelişebilir. [[K3 s. 227]]' }
  ]
};
VERI.sorular['far14a-2'] = {
  no: 2, kagit: 'Paper A · Farmakoloji', kok: 'Fenoksibenzaminin mekanizması ve klinik etkileri', kaynak: '[[K3 s. 227–228]]',
  onermeler: [
    { t: 'Reaktif ara ürün α-adrenoseptöre kovalent bağlanır.', d: true, n: 'Ara ürünün kovalent bağı geri dönüşümsüz blokaj oluşturur. [[K3 s. 227]]' },
    { t: 'Feokromositomada preoperatif kullanım intravasküler hacmin genişlemesine olanak verir.', d: true, n: 'Ameliyat öncesi kullanımın amacı intravasküler kompartımanın genişleyebilmesidir. [[K3 s. 227]]' },
    { t: 'İntravenöz dozun maksimum etkisi 1–2 dakikada görülür.', d: false, n: 'Fenoksibenzaminin intravenöz etkisi 1 saatte doruğa ulaşır. [[K3 s. 228]]' },
    { t: 'Doz aşımında adrenalin hipotansiyonu ağırlaştırabilir.', d: true, n: 'Karşılanmamış β etkileri hipotansiyonu ve taşikardiyi ağırlaştırır. [[K3 s. 228]]' },
    { t: 'Hızlı intravenöz infüzyon sonrasında konvülsiyon bildirilmiştir.', d: true, n: 'Belirgin sedasyon olağandır, hızlı intravenöz infüzyon sonrası konvülsiyon da bildirilmiştir. [[K3 s. 228]]' }
  ]
};
VERI.sorular['far14a-3'] = {
  no: 3, kagit: 'Paper A · Farmakoloji', kok: 'Prazosin ve yohimbin', kaynak: '[[K3 s. 228–229]]',
  onermeler: [
    { t: 'Prazosin ilk dozda senkopa yol açabilir.', d: true, n: 'İlk doz sonrasında ağır postüral hipotansiyon ve senkop görülebilir. [[K3 s. 228]]' },
    { t: 'Prazosinin başlıca atılım yolu idrardır.', d: false, n: 'Prazosin büyük ölçüde safrayla atılır. [[K3 s. 229]]' },
    { t: 'Prazosin idrarda VMA taramasında yalancı pozitiflik yapabilir.', d: true, n: 'VMA ve MHPG için yapılan idrar taraması yalancı pozitif çıkabilir. [[K3 s. 228]]' },
    { t: 'Yohimbin selektif bir α₁ antagonistidir.', d: false, n: 'Yohimbin selektif α₂ blokajı yapar. [[K3 s. 229]]' },
    { t: 'Yohimbin in vitro klonidinin hipotansif yanıtını engeller.', d: true, n: 'Klonidinin hipotansif yanıtının blokajı in vitro gösterilmiştir. [[K3 s. 229]]' }
  ]
};

const A14A_NAV = [
  ['reseptor', 'Reseptörler'], ['fentolamin', 'Fentolamin'], ['fenoksibenzamin', 'Fenoksibenzamin'],
  ['selektif', 'Selektif blokaj'], ['p1', 'Part I'], ['p2', 'Part II'], ['ozet', 'Özet']
];

SAYFALAR['dersler/farmakoloji/14a'] = {
  grup: 'dersler', eyebrow: 'Farmakoloji · Kısım 3 · Bölüm 14 · Ders 14a', baslik: 'α-adrenoseptör antagonistleri',
  lede: 'α-blokerler sempatomimetik ilaçların α-adrenoseptörlerdeki etkilerini önler. [[K3 s. 226]]',
  html: `
<nav class="wrap ders-nav" aria-label="Bu derste">${A14A_NAV.map(([id, ad], i) => `<button type="button" data-scroll="a14a-${id}"><span>${String(i + 1).padStart(2, '0')}</span>${ad}</button>`).join('')}</nav>

<section class="wrap blk ders-sec" id="a14a-reseptor">
<h2>Hangi reseptör, hangi yanıt?</h2>
<p class="intro">α₂ uyarısının etkisi, reseptörün presinaptik ya da postsinaptik yerleşimine göre değişir. [[K3 s. 227]]</p>
<div class="viz"><div class="viz-head"><h3>Reseptör uyarıldığında</h3></div><div data-viz="a14a_uyari"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel · Uyarılma yanıtları. [[K3 s. 227]]</p></div>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Blokaj</th><th>İlaç</th></tr></thead><tbody>
<tr><td>Nonselektif (α₁ ve α₂)</td><td>Fentolamin ve fenoksibenzamin [[K3 s. 226]]</td></tr>
<tr><td>Selektif α₁</td><td>Prazosin [[K3 s. 226]]</td></tr>
<tr><td>Selektif α₂</td><td>Yohimbin [[K3 s. 226]]</td></tr>
</tbody></table></div></section>

<section class="wrap blk ders-sec" id="a14a-fentolamin">
<h2>Fentolamin</h2><p class="intro">Bir imidazolon olarak anılan fentolamin kompetitif, nonselektif bir α-blokerdir. [[K3 s. 226]] α₁ reseptörüne afinitesi α₂ afinitesinin üç katıdır. [[K3 s. 226]]</p>
<div class="viz"><div class="viz-head"><h3>Basınç düşerken kalp debisi neden artar?</h3></div><div data-viz="a14a_fentolamin"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel · İki reseptörün blokaja katkısı. [[K3 s. 226]]</p></div>
<div class="a14a-kartlar"><div class="card"><h3>Sunum ve zamanlama</h3><ul>
<li>Berrak, soluk sarı çözeltinin 1 ml’sinde 10 mg fentolamin mesilat bulunur. [[K3 s. 226]]</li>
<li>İntravenöz (İV) 1–5 mg etkiye göre titre edilir. [[K3 s. 226]] Etki 1–2 dakikada başlar, 5–20 dakika sürer. [[K3 s. 226]]</li></ul></div>
<div class="card"><h3>Kullanım alanları</h3><ul>
<li>Fentolamin, aşırı sempatomimetik kullanımı veya monoamin oksidaz inhibitörü–tiramin reaksiyonuna bağlı hipertansif krizlerde kullanılır. [[K3 s. 226]] Feokromositomada özellikle tümör manipülasyonu sırasındaki krizde kullanılır. [[K3 s. 226]]</li>
<li>Sempatik aracılı kronik ağrının değerlendirilmesinde kullanılır. [[K3 s. 226]]</li>
<li>Daha önce pulmoner hipertansiyonda kullanılmıştır. [[K3 s. 226]] Erektil yetersizliğe bağlı impotansta korpus kavernozuma enjeksiyonu da kullanılmıştır. [[K3 s. 226]]</li></ul></div>
<div class="card"><h3>Diğer etkiler</h3><ul>
<li>Pulmoner arter basıncı düşer. [[K3 s. 226]]</li>
<li>Ampuldeki sülfit, duyarlı astımlılarda akut bronkospazmla seyreden aşırı duyarlılık reaksiyonuna yol açabilir. [[K3 s. 226]]</li>
<li>Gastrointestinal sekresyon ve motilite artar. [[K3 s. 226]]</li>
<li>İnsülin salınımındaki artış hipoglisemiyi tetikleyebilir. [[K3 s. 227]]</li></ul></div></div>
<div class="note plain"><b>Atlas notu.</b> Kitap fentolamini imidazolon olarak anar; fentolamin kimyasal olarak bir imidazolin türevidir.</div></section>

<section class="wrap blk ders-sec" id="a14a-fenoksibenzamin">
<h2>Fenoksibenzamin</h2><p class="intro">Fenoksibenzamin uzun etkili, nonselektif bir α-blokerdir ve α₁ afinitesi yüksektir. [[K3 s. 227]]</p>
<div class="viz"><div class="viz-head"><h3>Blokaj plazma yarılanma ömrünü nasıl aşar?</h3></div><div data-viz="a14a_bag"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel · Bağlanmadan reseptör yenilenmesine. [[K3 s. 227–228]]</p></div>
<p>Fenoksibenzamin ayrıca katekolaminlerin hem nöronal hem ekstranöronal geri alımını engeller. [[K3 s. 227]]</p>
<div class="a14a-kartlar"><div class="card"><h3>Preparat ve uygulama</h3><ul>
<li>10 mg kapsül veya 100 mg/2 ml fenoksibenzamin hidroklorür içeren berrak, açık saman sarısı enjeksiyon çözeltisi bulunur. [[K3 s. 227]] Çözelti etil alkol, hidroklorik asit ve propilen glikol içerir. [[K3 s. 227]]</li>
<li>Oral başlangıç 10 mg’dır. [[K3 s. 227]] Hipertansiyon kontrol edilene dek doz her gün artırılır, olağan doz 1–2 mg/kg/gün’dür. [[K3 s. 227]]</li>
<li>Olağan İV doz 1 mg/kg/gün, en az 200 ml %0.9 serum fizyolojik içinde santral kanülden yavaş infüzyonla verilir. [[K3 s. 227]]</li></ul></div>
<div class="card"><h3>Kullanım alanları</h3><ul>
<li>Feokromositoma ameliyatı öncesinde intravasküler hacmin genişlemesine olanak verir. [[K3 s. 227]]</li>
<li>Kalp cerrahisi uygulanan bazı yenidoğanlarda perioperatif dönemde ve hipertansif krizlerde kullanılır. [[K3 s. 227]]</li>
<li>Ağır şokta bazen yardımcı tedavidir. [[K3 s. 227]]</li></ul></div>
<div class="card"><h3>Dolaşım ve doz aşımı</h3><ul>
<li>Hipotansiyon ortostatik olabilir ve refleks taşikardi tipiktir. [[K3 s. 228]] Taşikardiyi sınırlamak için β-blokaj gerekebilir. [[K3 s. 227]]</li>
<li>Kalp debisi, deri ve iç organ kan akımı artar. [[K3 s. 228]] Nazal mukozada artan akım burun tıkanıklığı yapar. [[K3 s. 228]]</li>
<li>Doz aşımında noradrenalin kullanılır. [[K3 s. 228]] Adrenalinin karşılanmamış β etkileri hipotansiyon ve taşikardiyi ağırlaştırır. [[K3 s. 228]]</li></ul></div>
<div class="card"><h3>Diğer etkiler</h3><ul>
<li>Genellikle belirgin sedasyon yapar, hızlı İV infüzyondan sonra konvülsiyon bildirilmiştir. [[K3 s. 228]]</li>
<li>Miyozis, impotans ve kontakt dermatit görülebilir. [[K3 s. 228]]</li></ul></div></div>
<h3>Nonselektif blokerlerin kinetiği</h3><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Özellik</th><th>Fentolamin</th><th>Fenoksibenzamin</th></tr></thead><tbody>
<tr><th>Emilim</th><td>Oral kullanım nadir, biyoyararlanım %20 [[K3 s. 227]]</td><td>Bağırsaktan eksik ve değişken emilim, oral biyoyararlanım yaklaşık %25 [[K3 s. 228]]</td></tr>
<tr><th>Yarılanma ömrü</th><td>Eliminasyon 20 dakika [[K3 s. 227]]</td><td>Plazmada yaklaşık 24 saat, İV dozdan sonra maksimum etki 1 saatte [[K3 s. 228]]</td></tr>
<tr><th>Metabolizma ve atılım</th><td>Plazma proteinlerine %50 bağlanma, yaygın metabolizma, yaklaşık %10’u idrarda değişmeden [[K3 s. 227]]</td><td>Karaciğerde metabolizma, idrar ve safrayla atılım [[K3 s. 228]]</td></tr>
</tbody></table></div></section>

<section class="wrap blk ders-sec" id="a14a-selektif">
<h2>Selektif blokaj · Prazosin ve yohimbin</h2><p class="intro">Kinazolin türevi prazosin α₁ için çok seçicidir. [[K3 s. 228]] Yohimbin ise α₂ reseptörünü bloke eder. [[K3 s. 229]]</p>
<div class="viz"><div class="viz-head"><h3>Seçilen ilaçla dolaşım yanıtı nasıl değişir?</h3></div><div data-viz="a14a_selektif"></div><p class="viz-cap" aria-live="polite"></p><p class="viz-foot">Şematik/nitel · Dolaşım yanıtlarının karşılaştırması. [[K3 s. 228–229]]</p></div>
<div class="a14a-kartlar"><div class="card"><h3>Prazosin · Kullanım ve doz</h3><ul>
<li>Esansiyel hipertansiyon, konjestif kalp yetmezliği, Raynaud sendromu ve benign prostat hipertrofisinde kullanılır. [[K3 s. 228]]</li>
<li>Tabletler 0.5–2 mg’dır. [[K3 s. 228]] Günde üç kez 0.5 mg ile başlanır, günlük doz 20 mg’a kadar artırılabilir. [[K3 s. 228]]</li></ul></div>
<div class="card"><h3>Prazosin · Klinik etkiler</h3><ul>
<li>İlk doz ağır postüral hipotansiyon ve senkop yapabilir. [[K3 s. 228]] Kalp yetmezliğinde dolum basınçlarının düşmesiyle kalp debisi artabilir. [[K3 s. 228]]</li>
<li>Trigon ve mesane sfinkterinin gevşemesi benign prostat hipertrofisinde idrar akımını iyileştirir. [[K3 s. 228]] İmpotans ve priapizm bildirilmiştir. [[K3 s. 228]]</li>
<li>Yorgunluk, baş ağrısı, vertigo ve bulantı tedavi sürdükçe azalır. [[K3 s. 228]]</li>
<li>Feokromositoma için idrarda noradrenalin metabolitleri (VMA, MHPG) aranırken yalancı pozitiflik görülebilir. [[K3 s. 228]]</li></ul></div>
<div class="card"><h3>Prazosin · Kinetik</h3><ul>
<li>Oral dozla plazma doruğu yaklaşık 90 dakikada görülür, biyoyararlanım %50–80’dir. [[K3 s. 228]]</li>
<li>Başlıca albümine olmak üzere proteinlere yüksek oranda bağlanır. [[K3 s. 228]] Karaciğerde demetilasyon ve konjugasyonla yaygın biçimde metabolize edilir. [[K3 s. 228–229]]</li>
<li>Bazı metabolitleri aktiftir, plazma yarılanma ömrü 3 saattir. [[K3 s. 229]] Başlıca safrayla atıldığı için böbrek fonksiyon bozukluğunda güvenle kullanılabilir. [[K3 s. 229]]</li></ul></div>
<div class="card"><h3>Yohimbin · Köken ve etkiler</h3><ul>
<li>Yohimbe ağacı kabuğunun başlıca alkaloididir, hidroklorür preparatı impotansta kullanılmıştır. [[K3 s. 229]]</li>
<li>İn vitro klonidinin hipotansif yanıtını bloke eder. [[K3 s. 229]]</li>
<li>Antidiüretik etki gösterir, anksiyete ve manik reaksiyonlara yol açabilir. [[K3 s. 229]]</li>
<li>Böbrek veya karaciğer hastalığında kontrendikedir. [[K3 s. 229]]</li></ul></div></div></section>

<section class="wrap blk ders-sec" id="a14a-p1"><h2>Part I · Çoklu doğru–yanlış</h2>
<div class="viz"><div data-viz="mtf" data-q="far14a-1"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far14a-2"></div></div>
<div class="viz"><div data-viz="mtf" data-q="far14a-3"></div></div></section>
<section class="wrap blk ders-sec" id="a14a-p2"><h2>Part II · SOE 2 (farmakoloji)</h2>
<div class="card soe-soru"><span class="tag basic">Açılış sorusu</span><p><b>Feokromositomada ameliyat öncesi hazırlık ile tümör manipülasyonu sırasındaki hipertansif krizi karşılaştırın. Hangi α-blokeri hangi özelliği için seçersiniz?</b></p></div>
<h3>Cevap iskeleti</h3><ol class="iskelet">
<li>Ameliyat öncesinde fenoksibenzamin intravasküler hacmin genişlemesine olanak verir. [[K3 s. 227]] Refleks taşikardiyi sınırlamak için β-blokaj gerekebilir. [[K3 s. 227]]</li>
<li>Kovalent bağla gelişen geri dönüşümsüz blokaj, yeni reseptörler sentezlenirken 3 gün sürebilir. [[K3 s. 227–228]]</li>
<li>Tümör manipülasyonu sırasındaki krizde fentolamin kullanılır. [[K3 s. 226]] Kompetitif blokajın İV başlangıcı 1–2 dakika, süresi 5–20 dakikadır. [[K3 s. 226]]</li>
<li>İV fentolamin 1–5 mg aralığında yanıta göre titre edilir. [[K3 s. 226]]</li></ol>
<div class="cols"><div class="note"><b>Çizin.</b> α₁ ve α₂ için iki sütun açın. Fentolamin, fenoksibenzamin, prazosin ve yohimbini bloke ettikleri reseptörlere bağlayın. [[K3 s. 226]]</div>
<div class="note plain"><b>Olası ek sorular.</b> Fenoksibenzamin doz aşımında adrenalin dolaşım bulgularını neden ağırlaştırır? [[K3 s. 228]] Prazosinin ilk dozundan sonra hangi bulgular görülebilir? [[K3 s. 228]]</div></div></section>
<section class="wrap blk ders-sec" id="a14a-ozet"><h2>Özet</h2><ul class="ozet">
<li>Fentolaminle α₁ blokajı basıncı düşürür, α₂ blokajı noradrenalin salınımını kolaylaştırır. [[K3 s. 226]]</li>
<li>Fenoksibenzaminin kovalent bağı uzun süreli blokajı açıklar. [[K3 s. 227–228]]</li>
<li>Prazosinle ilk dozda ağır postüral hipotansiyon ve senkop görülebilir. [[K3 s. 228]]</li>
<li>Yohimbin kalp hızını ve basıncı artırır, ancak ortostatik hipotansiyon da yapabilir. [[K3 s. 229]]</li></ul>
<div data-viz="tamam" data-modul="farmakoloji" data-bolum="14a"></div>
<nav class="ders-gec" aria-label="Dersler arasında"><a href="#/dersler/farmakoloji/13c">← 13c · Diğer inotropik ajanlar</a><a href="#/dersler/farmakoloji/14b">Sonraki: 14b · β-adrenoseptör antagonistleri →</a></nav></section>`
};
