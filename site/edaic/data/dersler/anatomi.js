/* Anatomi modülü. Kaynak kitap: K5 = Ellis & Lawson, Anatomy for Anaesthetists, 9. baskı (2014); kullanıcının Türkçe çevirisi.
   Çeviri özgün baskının sayfalamasını korur; SAYFA NUMARALARI basılı kitap sayfasıdır (pdf sayfası − 18).
   Uzun bölümler kitabın kendi başlıklarına göre birden çok derse bölünür: kimlik 'NN' (tek ders) ya da 'NNa', 'NNb'…
   Ders metinleri, sorular ve şekiller bu atlas için yazılır/üretilir; kitaptan metin ya da şekil kopyalanmaz.
   Bu dosya tools/anatomi-uret.py ile tools/anatomi-birimler.json'dan üretilir; elle değiştirme. */
window.ANATOMI = {
  // b: [bölüm no, bölüm adı, [[ders kimliği, ders adı, ilk sayfa, son sayfa], …]]
  bolumler: [
    [1, "Solunum yolu, akciğerler, göğüs duvarı ve diyafram", [["01a", "Ağız, damak ve burun", 3, 15], ["01b", "Farinks ve yutma", 15, 24], ["01c", "Larinks", 24, 42], ["01d", "Trakea, ana bronşlar, plevra ve göğüs duvarı", 42, 56], ["01e", "Mediasten ve akciğerler", 56, 72], ["01f", "Diyafram", 72, 78]]],
    [2, "Kalp ve boynun büyük venleri", [["02a", "Perikard ve kalp", 81, 92], ["02b", "Kalbin gelişimi, fetal dolaşım ve boynun büyük venleri", 92, 105]]],
    [3, "Vertebral kanal ve içindeki yapılar", [["03a", "Servikal, torasik ve lomber vertebralar", 109, 120], ["03b", "Sakrum, omur anomalileri ve omurlar arası bağlar", 120, 130], ["03c", "Spinal meninksler, BOS ve omurilik", 130, 146]]],
    [4, "Periferik sinirler", [["04a", "Spinal sinirler, servikal pleksus ve stellat gangliyon", 149, 165], ["04b", "Brakiyal pleksus: oluşum, komşuluk ve blok yaklaşımları", 165, 174], ["04c", "Brakiyal pleksus dalları ve üst ekstremite segmental innervasyonu", 174, 190], ["04d", "Torakal sinirler ve lomber pleksus", 190, 201], ["04e", "Sakral pleksus ve siyatik sinir", 201, 209], ["04f", "Popliteal fossa, bacak–ayak sinirleri ve alt ekstremite dermatomları", 209, 221]]],
    [5, "Otonom sinir sistemi", [["05", "Otonom sinir sistemi", 225, 241]]],
    [6, "Kraniyal sinirler", [["06a", "Kraniyal sinirlere giriş ve I–IV. sinirler", 245, 254], ["06b", "Trigeminal sinir: gangliyon, oftalmik ve maksiller dallar", 254, 268], ["06c", "Mandibular sinir ve ilişkili bloklar", 268, 275], ["06d", "Abdusens, fasiyal ve vestibülokoklear sinirler", 275, 281], ["06e", "Glossofaringeal, vagus, aksesuar ve hipoglossal sinirler", 281, 291]]],
    [7, "Diğer ilgi alanları", [["07a", "Toraks girişi ve antekübital fossa", 295, 303], ["07b", "Orbita ve içeriği", 303, 314], ["07c", "Karın duvarı", 314, 320]]],
    [8, "Ağrının anatomisi", [["08", "Ağrının anatomisi", 323, 333]]],
  ],
};
