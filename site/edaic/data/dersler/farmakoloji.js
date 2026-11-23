/* Farmakoloji modülü. Kaynak kitap: K3 = Peck & Harris, Pharmacology for Anaesthesia and Intensive Care, 5. baskı (2021).
   SAYFA NUMARALARI Türkçe çalışma çevirisinin basılı sayfalarıdır (pdf sayfası − 14); özgün İngilizce baskının sayfalarıyla AYNI DEĞİLDİR
   (fark bölüme göre ≈18–66 sayfa; ör. Diüretikler çeviride s. 328, özgün baskıda s. 299). Uzun bölümler,
   kitabın kendi başlıklarına göre birden çok derse bölünür: kimlik 'NN' (tek ders) ya da 'NNa', 'NNb'…
   Ders metinleri, örnek sorular ve animasyonlar bu atlas için yazılır; kitaptan metin ya da şekil kopyalanmaz.
   Bu dosya tools/farmakoloji-uret.py ile tools/farmakoloji-birimler.json'dan üretilir; elle değiştirme. */
window.FARMAKOLOJI = {
  // b: [bölüm no, bölüm adı, [[ders kimliği, ders adı, ilk sayfa, son sayfa], …]]
  kisimlar: [
    { no: 1, ad: "Temel ilkeler", b: [
      [1, "İlaçların hücre zarından geçişi", [["01", "İlaçların hücre zarından geçişi", 1, 8]]],
      [2, "Emilim, dağılım, metabolizma ve atılım", [["02a", "Emilim ve uygulama yolları", 9, 15], ["02b", "Dağılım ve metabolizma", 15, 21], ["02c", "Atılım, hastalık ve yaşamın uç dönemleri", 21, 25]]],
      [3, "İlaç etkisi", [["03a", "Etki mekanizmaları ve reseptör türleri", 26, 32], ["03b", "İlaç–reseptör etkileşimi: agonizm, antagonizm, tolerans", 32, 39]]],
      [4, "İlaç etkileşimi", [["04", "İlaç etkileşimi", 40, 45]]],
      [5, "İzomerizm", [["05", "İzomerizm", 46, 51]]],
      [6, "Farmakokinetik modelleme", [["06a", "Matematiksel kavramlar", 52, 57], ["06b", "Kompartıman modelleri", 57, 65], ["06c", "Kompartımansız modeller ve parametrelerin ölçülmesi", 65, 74]]],
      [7, "Uygulamalı farmakokinetik modeller", [["07a", "Propofol, remifentanil ve manuel TİVA", 75, 79], ["07b", "Hedef kontrollü infüzyon ve bağlama duyarlı yarılanma süresi", 79, 88]]],
      [8, "Medisinal kimya", [["08a", "Kimyasal yapılar ve ilaç sınıfları", 89, 95], ["08b", "Medisinal kimya mini sözlüğü", 95, 104]]]
    ] },
    { no: 2, ad: "Anestezi uygulamasında temel ilaçlar", b: [
      [9, "Genel anestezik ajanlar", [["09a", "Genel anestezik etkinin mekanizmaları", 105, 108], ["09b", "İntravenöz anestezikler: barbitüratlar ve propofol", 108, 116], ["09c", "Ketamin ve etomidat", 116, 119], ["09d", "İnhalasyon ajanları: MAK, fiziksel özellikler ve kinetik", 119, 123], ["09e", "İnhalasyon ajanlarının farmakolojisi ve tek tek ajanlar", 123, 133], ["09f", "Ksenon ve anestezik olmayan tıbbi gazlar", 133, 138]]],
      [10, "Analjezikler", [["10a", "Opioidler: fizyoloji, reseptörler ve morfin", 139, 146], ["10b", "Diğer opioidler ve opioid antagonistleri", 146, 153], ["10c", "NSAİİ'ler: etki mekanizması, nonspesifik COX inhibitörleri ve parasetamol", 153, 161], ["10d", "Tek tek NSAİİ'ler ve COX-2 inhibitörleri", 161, 169]]],
      [11, "Lokal anestezikler", [["11a", "Lokal anesteziklerin fizyolojisi, etkisi ve toksisitesi", 170, 177], ["11b", "Tek tek lokal anestezikler", 177, 181]]],
      [12, "Kas gevşeticiler ve geri döndürücü ajanlar", [["12a", "Nöromüsküler kavşak ve blok monitörizasyonu", 182, 186], ["12b", "Depolarizan kas gevşeticiler", 186, 191], ["12c", "Nondepolarizan kas gevşeticiler", 191, 199], ["12d", "Geri döndürücü ajanlar", 199, 205]]]
    ] },
    { no: 3, ad: "Kardiyovasküler ilaçlar", b: [
      [13, "Sempatomimetikler", [["13a", "Adrenerjik fizyoloji ve doğal katekolaminler", 206, 213], ["13b", "Sentetik sempatomimetikler", 213, 220], ["13c", "Diğer inotropik ajanlar", 220, 225]]],
      [14, "Adrenoseptör antagonistleri", [["14a", "α-adrenoseptör antagonistleri", 226, 229], ["14b", "β-adrenoseptör antagonistleri", 229, 237]]],
      [15, "Antiaritmikler", [["15a", "Aritmiler, sınıflama ve supraventriküler taşiaritmi ilaçları", 238, 247], ["15b", "Ventriküler ve karma etkili antiaritmikler", 247, 256]]],
      [16, "Vazodilatörler", [["16a", "Nitrovazodilatörler ve potasyum kanal aktivatörleri", 257, 262], ["16b", "Kalsiyum kanal antagonistleri ve diğer vazodilatörler", 262, 268]]],
      [17, "Antihipertansifler", [["17", "Antihipertansifler", 269, 278]]]
    ] },
    { no: 4, ad: "Diğer önemli ilaçlar", b: [
      [18, "Merkezi sinir sistemi", [["18a", "Hipnotikler ve anksiyolitikler", 279, 284], ["18b", "Antidepresanlar", 284, 289], ["18c", "Antikonvülzanlar", 289, 294]]],
      [19, "Antiemetikler ve ilişkili ilaçlar", [["19a", "Bulantı-kusma fizyolojisi ve dopamin antagonistleri", 295, 300], ["19b", "Antikolinerjikler, antihistaminikler ve diğer antiemetikler", 300, 305]]],
      [20, "Bağırsak üzerine etkili ilaçlar", [["20", "Bağırsak üzerine etkili ilaçlar", 306, 312]]],
      [21, "İntravenöz sıvılar, mineraller ve beslenme", [["21a", "Sıvı kompartımanları ve kristalloidler", 313, 319], ["21b", "Kolloidler, bikarbonat, mineraller ve beslenme", 319, 327]]],
      [22, "Diüretikler", [["22", "Diüretikler", 328, 334]]],
      [23, "Antimikrobiyaller", [["23a", "Bakteriler ve antibiyotik tedavisinin ilkeleri", 335, 342], ["23b", "Beta-laktam antibiyotikler", 342, 347], ["23c", "Diğer antibakteriyel ilaçlar", 347, 359], ["23d", "Direnç, antiviraller ve antifungaller", 359, 370]]],
      [24, "Koagülasyonu etkileyen ilaçlar", [["24a", "Koagülasyon fizyolojisi ve antitrombositler", 371, 376], ["24b", "Heparinler, protamin ve varfarin", 376, 380], ["24c", "Doğrudan oral antikoagülanlar ve etkilerinin geri döndürülmesi", 380, 385], ["24d", "Antifibrinolitikler", 385, 388]]],
      [25, "Diabetes mellitusta kullanılan ilaçlar", [["25a", "Diyabet ve insülinler", 389, 393], ["25b", "Oral antidiyabetikler ve diyabetik hastanın perioperatif bakımı", 393, 400]]],
      [26, "Kortikosteroidler ve diğer hormon preparatları", [["26a", "Kortikosteroidler", 401, 405], ["26b", "Tiroit ilaçları ve diğer hormon preparatları", 405, 411]]]
    ] },
  ],
};
