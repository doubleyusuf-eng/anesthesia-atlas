/* Fizik ve klinik ölçüm modülü. Kaynak kitap: K6 = Middleton, Phillips & Stacey, Physics in Anaesthesia, 2. baskı (2021).
   SAYFA NUMARALARI kitabın PDF sürümünün fiziksel sayfalarıdır.
   Uzun bölümler kitabın kendi başlıklarına göre birden çok derse bölünür: kimlik 'NN' (tek ders) ya da 'NNa', 'NNb'…
   Ders metinleri, sorular ve şekiller bu atlas için yazılır/üretilir; kitaptan metin ya da şekil kopyalanmaz.
   Bu dosya tools/fizik-uret.py ile tools/fizik-birimler.json'dan üretilir; elle değiştirme. */
window.FIZIK = {
  // b: [bölüm no, bölüm adı, [[ders kimliği, ders adı, ilk sayfa, son sayfa], …]]
  bolumler: [
    [1, "Atomlar ve madde", [["01", "Atomlar ve madde", 19, 28]]],
    [2, "Basit mekanik", [["02", "Basit mekanik: kuvvet, basınç, viskozite ve yüzey gerilimi", 29, 42]]],
    [3, "Enerji ve güç", [["03", "Enerji ve güç: solunum ve kalbin yaptığı iş", 43, 55]]],
    [4, "Sıcaklık ve ısı", [["04a", "Isı, sıcaklık, ısı aktarımı ve siyah cisim ışıması", 56, 64], ["04b", "Vücut sıcaklığının düzenlenmesi, sıcaklık ölçümü ve termodinamik yasaları", 64, 75]]],
    [5, "Dalgalar", [["05a", "Dalgaların özellikleri, ses ve elektromanyetik dalgalar", 76, 85], ["05b", "Basit harmonik hareket, rezonans ve sönüm, Fourier analizi, Doppler etkisi", 85, 95]]],
    [6, "Basınç ölçümü", [["06a", "Mutlak ve bağıl basınç, manometreler, basınç valfleri ve sifon etkisi", 96, 112], ["06b", "Kan basıncı: noninvaziv ve invaziv ölçüm", 112, 120]]],
    [7, "Nem", [["07", "Nem, nemlendirme ve nebülizörler", 121, 135]]],
    [8, "Gaz akımının ölçümü", [["08a", "Akım: laminer ve türbülanslı akım", 136, 146], ["08b", "Bernoulli, Venturi ve Coanda etkileri; hacim ve akım ölçümü", 146, 158]]],
    [9, "Gaz yasaları", [["09a", "İdeal gaz, Avogadro yasası ve kısmi basınç", 159, 166], ["09b", "Boyle, Charles ve Gay-Lussac yasaları; birleşik ve evrensel gaz yasası", 166, 178]]],
    [10, "Difüzyon, ozmoz ve çözünürlük", [["10", "Difüzyon, ozmoz ve çözünürlük", 179, 194]]],
    [11, "Gaz ve buhar derişimlerinin ölçümü", [["11a", "Solunum gazı izlemi, kızılötesi spektroskopi ve kapnografi", 195, 199], ["11b", "Paramanyetik oksijen analizörü, elektrokimyasal hücreler ve kan gazı elektrotları", 199, 210]]],
    [12, "Vaporizatörler", [["12", "Vaporizatörler", 211, 220]]],
    [13, "Tıbbi gaz kaynakları", [["13", "Tıbbi gaz kaynakları: tüpler, merkezi sistem, vakum ve yanma riski", 221, 237]]],
    [14, "Solunum sistemleri ve ventilasyon", [["14a", "Solunum devreleri: halka sistem ve Mapleson sınıflaması", 238, 252], ["14b", "Ventilatörler ve ventilasyon modları", 252, 260]]],
    [15, "Optik", [["15a", "Kırılma, optik lifler ve fiberoptik endoskoplar", 261, 268], ["15b", "Beer yasası, hemoglobin spektrumları, puls oksimetri, NIRS ve CO-oksimetri", 268, 274]]],
    [16, "Kan akımı ölçümü", [["16", "Kan akımı ölçümü: indikatör dilüsyonu, termodilüsyon ve Doppler", 275, 289]]],
    [17, "Ekipman yönetimi", [["17", "Ekipman yönetimi: kalibrasyon, temizlik ve sterilizasyon", 290, 301]]],
    [18, "Elektriğin temelleri", [["18", "Elektriğin temelleri ve Wheatstone köprüsü", 302, 314]]],
    [19, "Elektromanyetizma ve alternatif akım", [["19", "Elektromanyetizma, alternatif akım ve transformatörler", 315, 328]]],
    [20, "Elektrik çarpması ve güvenlik", [["20", "Elektrik çarpması, topraklama, mikroşok ve elektrocerrahi", 329, 344]]],
    [21, "Elektrokardiyografi, pacing ve defibrilasyon", [["21a", "Kapasitans ve defibrilatörler", 345, 351], ["21b", "Biyolojik potansiyeller: EKG, EMG, EEG ve kalp pilleri", 351, 364]]],
    [22, "Sinyal işleme, saklama ve gösterim", [["22", "Sinyal işleme, saklama ve gösterim", 365, 376]]],
    [23, "Ultrason", [["23", "Ultrason", 377, 392]]],
    [24, "Lazerler", [["24", "Lazerler", 393, 401]]],
    [25, "Manyetik rezonans görüntüleme", [["25", "Manyetik rezonans görüntüleme", 402, 411]]],
    [26, "Nükleer fizik ve radyasyon", [["26", "Nükleer fizik, radyasyon ve görüntüleme", 412, 425]]],
    [27, "Temel matematik kavramlar", [["27", "Temel matematik kavramlar: fonksiyonlar, kalkülüs, üstel büyüme ve azalma", 426, 444]]],
    [28, "Fiziksel nicelikler ve SI birimleri", [["28", "Fiziksel nicelikler ve SI birimleri", 445, 451]]],
    [29, "İstatistik", [["29", "İstatistik", 452, 472]]],
  ],
};
