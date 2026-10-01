export type TopicId =
  | 'konsep-rasio'
  | 'persamaan-rasio'
  | 'rasio-satuan'
  | 'penerapan-rasio';

export interface TopicModule {
  id: TopicId;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  learningGoals: string[];
  keyConcepts: {
    heading: string;
    body: string;
    formula?: string;
    exampleTitle: string;
    exampleSteps: string[];
  }[];
  realWorldContext: string;
}

export interface PracticeQuestion {
  id: string;
  topicId: TopicId;
  topicLabel: string;
  difficulty: 'Dasar' | 'Menengah' | 'Mahir';
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  solutionSteps: string[];
}

export interface QuizQuestion {
  id: number;
  topicId: TopicId;
  topicLabel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const TEACHER_INFO = {
  appName: 'MATH KARANGPETE',
  teacherName: 'Gilang Syahrir Ramdani',
  schoolName: 'SDN Karangpete',
  grade: 'Kelas 6 SD',
  curriculum: 'Kurikulum Merdeka · Bab Rasio',
  welcomeQuote:
    'Selamat datang di ruang belajar digital MATH KARANGPETE! Mari kita pelajari konsep perbandingan (rasio) melalui simulasi visual interaktif, latihan bertahap, dan kuis menyenangkan. Matematika itu mudah ketika kita bisa melihat dan mempraktikkannya langsung!',
};

export const TOPIC_MODULES: TopicModule[] = [
  {
    id: 'konsep-rasio',
    number: '01',
    title: 'Konsep Rasio',
    subtitle: 'Membandingkan dua besaran dalam kehidupan sehari-hari',
    summary:
      'Rasio adalah cara matematika untuk membandingkan dua nilai atau jumlah benda yang sejenis. Dengan rasio, kita bisa mengetahui hubungan banyak benda pertama terhadap benda kedua secara jelas.',
    learningGoals: [
      'Memahami arti rasio sebagai perbandingan dua besaran.',
      'Menuliskan rasio dalam tiga bentuk: titik dua (a : b), kata ("a banding b"), dan pecahan (a/b).',
      'Membedakan rasio bagian terhadap bagian (part-to-part) dan bagian terhadap keseluruhan (part-to-whole).',
      'Menyederhanakan rasio menggunakan Faktor Persekutuan Terbesar (FPB).',
    ],
    keyConcepts: [
      {
        heading: 'Cara Menuliskan Rasio',
        body: 'Jika di meja guru Pak Gilang terdapat 3 spidol biru dan 5 spidol hitam, maka perbandingan banyak spidol biru terhadap spidol hitam dapat ditulis dalam tiga cara yang bermakna sama:',
        formula: 'a : b   atau   "a banding b"   atau   a / b',
        exampleTitle: 'Contoh di Kelas 6 SDN Karangpete',
        exampleSteps: [
          'Bentuk titik dua: 3 : 5 (urutan tidak boleh terbalik!).',
          'Bentuk kalimat: 3 banding 5.',
          'Bentuk pecahan: 3/5 (artinya banyak spidol biru adalah 3/5 dari spidol hitam).',
        ],
      },
      {
        heading: 'Bagian ke Bagian vs Bagian ke Keseluruhan',
        body: 'Perhatikan kata kunci pada soal! Kita bisa membandingkan satu kelompok benda dengan kelompok lainnya, atau satu kelompok benda dengan total seluruh benda.',
        formula: 'Rasio ke Total = Bagian A : (Bagian A + Bagian B)',
        exampleTitle: 'Contoh Keranjang Buah Sekolah',
        exampleSteps: [
          'Misalkan ada 4 apel merah dan 6 jeruk manis (Total = 4 + 6 = 10 buah).',
          'Rasio apel terhadap jeruk (bagian ke bagian) = 4 : 6, disederhanakan menjadi 2 : 3.',
          'Rasio apel terhadap seluruh buah (bagian ke keseluruhan) = 4 : 10, disederhanakan menjadi 2 : 5.',
        ],
      },
    ],
    realWorldContext:
      'Digunakan saat menghitung perbandingan siswa laki-laki dan perempuan di kelas, jumlah bibit tanaman di taman sekolah, hingga koleksi buku cerita dan buku sains di perpustakaan SDN Karangpete.',
  },
  {
    id: 'persamaan-rasio',
    number: '02',
    title: 'Persamaan Rasio',
    subtitle: 'Menemukan rasio senilai (ekuivalen) dengan perkalian dan pembagian',
    summary:
      'Dua rasio dikatakan sama atau ekuivalen jika memiliki nilai perbandingan paling sederhana yang sama. Kita dapat membuat rasio yang senilai dengan mengalikan atau membagi kedua bilangan rasio dengan angka yang sama (bukan nol).',
    learningGoals: [
      'Menentukan rasio yang senilai (ekuivalen) menggunakan perkalian atau pembagian.',
      'Melengkapi Tabel Rasio untuk memperbesar atau memperkecil takaran resep.',
      'Membuktikan apakah dua rasio bernilai sama melalui penyederhanaan.',
    ],
    keyConcepts: [
      {
        heading: 'Prinsip Rasio Senilai (Ekuivalen)',
        body: 'Sama seperti pecahan senilai, jika suku pertama dan suku kedua pada rasio dikalikan atau dibagi dengan bilangan bulat positif yang sama, nilai perbandingannya tetap tidak berubah.',
        formula: 'a : b  =  (a × k) : (b × k)  =  (a ÷ n) : (b ÷ n)',
        exampleTitle: 'Contoh Resep Sirup Melon Sekolah',
        exampleSteps: [
          'Untuk membuat 1 gelas es sirup yang pas manisnya, dibutuhkan 2 sendok sirup dan 5 sendok air (Rasio 2 : 5).',
          'Jika ingin membuat 3 gelas dengan rasa manis yang persis sama, kalikan keduanya dengan 3.',
          'Sirup = 2 × 3 = 6 sendok, dan Air = 5 × 3 = 15 sendok. Jadi 2 : 5 senilai dengan 6 : 15!',
        ],
      },
      {
        heading: 'Menggunakan Tabel Rasio',
        body: 'Tabel rasio membantu kita menyusun pasangan angka yang senilai secara rapi saat menyelesaikan soal perbandingan bertahap.',
        formula: '2 : 5   →   4 : 10   →   6 : 15   →   8 : 20',
        exampleTitle: 'Cara Mengecek Dua Rasio Senilai',
        exampleSteps: [
          'Apakah rasio 6 : 9 senilai dengan 10 : 15?',
          'Sederhanakan 6 : 9 dengan membagi 3 → hasilnya 2 : 3.',
          'Sederhanakan 10 : 15 dengan membagi 5 → hasilnya 2 : 3. Karena bentuk sederhananya sama-sama 2 : 3, keduanya EKUIVALEN!',
        ],
      },
    ],
    realWorldContext:
      'Sangat berguna ketika kita ingin menggandakan resep makanan/minuman untuk acara kelas, mencampur cat warna di pelajaran seni rupa, atau menakar pupuk cair untuk kebun sekolah.',
  },
  {
    id: 'rasio-satuan',
    number: '03',
    title: 'Rasio Satuan',
    subtitle: 'Membandingkan besaran terhadap 1 satuan untuk memilih yang terbaik',
    summary:
      'Rasio satuan adalah perbandingan di mana salah satu besarannya bernilai tepat 1 (satu) satuan. Rasio satuan memudahkan kita membandingkan harga barang per buah, kecepatan tempuh per jam, atau isi per kemasan.',
    learningGoals: [
      'Mengubah rasio dua besaran menjadi rasio satuan (per 1 satuan).',
      'Menghitung harga satuan barang untuk menentukan pilihan belanja paling hemat.',
      'Membandingkan laju atau kecepatan (misal halaman per menit atau km per liter).',
    ],
    keyConcepts: [
      {
        heading: 'Apa Itu Rasio Satuan?',
        body: 'Pada rasio biasa, kita membandingkan sembarang angka (misal 4 buku seharga Rp16.000). Pada rasio satuan, kita membagi kedua besaran agar besaran pembaginya menjadi angka 1.',
        formula: 'Rasio Satuan = (Besaran Pertama ÷ b) : (b ÷ b) = (a / b) : 1',
        exampleTitle: 'Contoh Harga Buku di Koperasi SDN Karangpete',
        exampleSteps: [
          'Paket A berisi 4 buku tulis dengan harga Rp16.000.',
          'Harga 1 buku tulis (rasio satuan) = Rp16.000 ÷ 4 = Rp4.000 per 1 buku.',
          'Dengan tahu harga 1 buku, kita bisa langsung menghitung harga 7 buku: 7 × Rp4.000 = Rp28.000.',
        ],
      },
      {
        heading: 'Membandingkan Dua Pilihan dengan Rasio Satuan',
        body: 'Jangan terkecoh dengan harga total yang tampak murah! Hitunglah nilai per 1 satuannya terlebih dahulu sebelum mengambil keputusan.',
        formula: 'Nilai per 1 Satuan = Total Nilai ÷ Banyak Satuan',
        exampleTitle: 'Contoh Lomba Membaca Cepat',
        exampleSteps: [
          'Raka membaca 45 halaman dalam 15 menit → 45 ÷ 15 = 3 halaman/menit.',
          'Dinda membaca 40 halaman dalam 10 menit → 40 ÷ 10 = 4 halaman/menit.',
          'Kesimpulan: Dinda membaca lebih cepat karena rasio satuannya 4 halaman per 1 menit.',
        ],
      },
    ],
    realWorldContext:
      'Digunakan saat berbelanja di koperasi sekolah atau minimarket, menghitung konsumsi bensin kendaraan (km/liter), dan mengukur kecepatan lari saat olahraga di lapangan SDN Karangpete.',
  },
  {
    id: 'penerapan-rasio',
    number: '04',
    title: 'Penerapan Rasio',
    subtitle: 'Menyelesaikan soal cerita jumlah, selisih, dan skala peta dengan model batang',
    summary:
      'Dalam soal cerita matematika Kelas 6 SD, rasio sering digabungkan dengan informasi jumlah keseluruhan, selisih dua benda, atau skala denah. Cara paling mudah dan bebas salah adalah menggunakan metode Kotak Unit (Model Batang).',
    learningGoals: [
      'Menyelesaikan soal rasio jika diketahui JUMLAH kedua besaran.',
      'Menyelesaikan soal rasio jika diketahui SELISIH kedua besaran.',
      'Menghitung jarak sebenarnya dan jarak pada peta menggunakan rasio SKALA.',
    ],
    keyConcepts: [
      {
        heading: 'Rumus Kotak Unit: Diketahui Jumlah vs Selisih',
        body: 'Anggap angka rasio sebagai banyaknya "kotak unit" yang berukuran sama. Cari dulu nilai untuk 1 kotak unit!',
        formula:
          'Jika diketahui JUMLAH: 1 Unit = Total ÷ (a + b)   |   Jika diketahui SELISIH: 1 Unit = Selisih ÷ |a - b|',
        exampleTitle: 'Contoh Soal Cerita Kelereng',
        exampleSteps: [
          'Rasio kelereng Budi : Andi adalah 2 : 3. Jumlah kelereng mereka adalah 35 butir.',
          'Total kotak unit = 2 + 3 = 5 kotak. Nilai 1 kotak = 35 ÷ 5 = 7 butir.',
          'Kelereng Budi = 2 × 7 = 14 butir. Kelereng Andi = 3 × 7 = 21 butir. (Cek: 14 + 21 = 35, tepat!).',
        ],
      },
      {
        heading: 'Penerapan pada Skala Denah & Peta',
        body: 'Skala adalah rasio antara ukuran pada gambar/denah (cm) dengan ukuran sebenarnya di lapangan (yang diubah ke cm terlebih dahulu).',
        formula: 'Skala = Jarak Peta : Jarak Sebenarnya   (1 m = 100 cm, 1 km = 100.000 cm)',
        exampleTitle: 'Contoh Denah Halaman SDN Karangpete',
        exampleSteps: [
          'Denah SDN Karangpete memiliki skala 1 : 200 (artinya 1 cm di gambar mewakili 200 cm atau 2 meter sebenarnya).',
          'Jika panjang lapangan upacara pada denah adalah 8 cm, maka panjang sebenarnya = 8 × 200 cm = 1.600 cm = 16 meter.',
        ],
      },
    ],
    realWorldContext:
      'Membantu membagi tugas piket kelas secara adil, menghitung pembagian tabungan bersama, membaca peta Kabupaten/Provinsi, serta merancang denah ruang kelas 6 SDN Karangpete.',
  },
];

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'lat-1',
    topicId: 'konsep-rasio',
    topicLabel: 'Konsep Rasio',
    difficulty: 'Dasar',
    question:
      'Di perpustakaan SDN Karangpete terdapat 12 buku cerita rakyat dan 18 buku ensiklopedia sains. Berapakah rasio paling sederhana dari banyak buku cerita rakyat terhadap buku ensiklopedia sains?',
    options: ['2 : 3', '3 : 2', '6 : 9', '2 : 5'],
    correctIndex: 0,
    hint: 'Tulis rasio sesuai urutan kalimat (12 : 18), lalu bagi kedua bilangan dengan FPB dari 12 dan 18 yaitu 6.',
    solutionSteps: [
      'Urutan yang diminta adalah Buku Cerita Rakyat : Buku Ensiklopedia Sains = 12 : 18.',
      'Cari Faktor Persekutuan Terbesar (FPB) dari 12 dan 18, yaitu 6.',
      'Bagi kedua suku dengan 6 → (12 ÷ 6) : (18 ÷ 6) = 2 : 3.',
    ],
  },
  {
    id: 'lat-2',
    topicId: 'konsep-rasio',
    topicLabel: 'Konsep Rasio',
    difficulty: 'Dasar',
    question:
      'Dalam satu kelompok belajar Kelas 6 terdapat 6 siswa laki-laki dan 9 siswa perempuan. Berapakah rasio banyak siswa laki-laki terhadap SELURUH siswa dalam kelompok tersebut?',
    options: ['2 : 3', '3 : 5', '2 : 5', '6 : 9'],
    correctIndex: 2,
    hint: 'Hitung dulu jumlah seluruh siswa (laki-laki + perempuan), kemudian bandingkan siswa laki-laki terhadap total tersebut.',
    solutionSteps: [
      'Jumlah seluruh siswa dalam kelompok = 6 + 9 = 15 siswa.',
      'Rasio siswa laki-laki terhadap seluruh siswa = 6 : 15.',
      'Sederhanakan dengan membagi kedua angka dengan 3 → (6 ÷ 3) : (15 ÷ 3) = 2 : 5.',
    ],
  },
  {
    id: 'lat-3',
    topicId: 'konsep-rasio',
    topicLabel: 'Konsep Rasio',
    difficulty: 'Menengah',
    question:
      'Pak Gilang membawa kotak kapur tulis berisi kapur putih dan kapur warna. Jika total seluruh kapur ada 24 batang dan 8 di antaranya adalah kapur putih, berapakah rasio kapur putih terhadap kapur warna?',
    options: ['1 : 3', '1 : 2', '2 : 3', '1 : 4'],
    correctIndex: 1,
    hint: 'Hati-hati! Cari dulu banyak kapur warna dengan mengurangi total kapur (24) dengan kapur putih (8).',
    solutionSteps: [
      'Banyak kapur warna = Total kapur − Kapur putih = 24 − 8 = 16 batang.',
      'Rasio kapur putih : kapur warna = 8 : 16.',
      'Bagi kedua bilangan dengan 8 → (8 ÷ 8) : (16 ÷ 8) = 1 : 2.',
    ],
  },
  {
    id: 'lat-4',
    topicId: 'persamaan-rasio',
    topicLabel: 'Persamaan Rasio',
    difficulty: 'Dasar',
    question:
      'Untuk membuat adonan kue tradisional, rasio tepung beras dan gula pasir adalah 4 : 3. Jika Ibu menggunakan 20 sendok makan tepung beras, berapa sendok makan gula pasir yang diperlukan agar rasanya tetap sama?',
    options: ['12 sendok makan', '15 sendok makan', '16 sendok makan', '18 sendok makan'],
    correctIndex: 1,
    hint: 'Perhatikan perubahan tepung beras dari 4 menjadi 20 (dikalikan 5). Kalikan bagian gula pasir dengan angka yang sama!',
    solutionSteps: [
      'Rasio awal Tepung : Gula = 4 : 3.',
      'Tepung berubah dari 4 menjadi 20, artinya dikalikan 5 (karena 20 ÷ 4 = 5).',
      'Maka banyak gula pasir juga dikalikan 5 → 3 × 5 = 15 sendok makan.',
    ],
  },
  {
    id: 'lat-5',
    topicId: 'persamaan-rasio',
    topicLabel: 'Persamaan Rasio',
    difficulty: 'Menengah',
    question:
      'Manakah di antara pasangan rasio berikut ini yang EKUIVALEN (senilai) dengan rasio 15 : 25?',
    options: ['6 : 12', '9 : 15', '12 : 15', '20 : 30'],
    correctIndex: 1,
    hint: 'Sederhanakan 15 : 25 terlebih dahulu menjadi bentuk paling kecil, lalu cari pilihan jawaban yang memiliki bentuk sederhana sama.',
    solutionSteps: [
      'Sederhanakan 15 : 25 dengan membagi keduanya dengan 5 → didapat 3 : 5.',
      'Sekarang uji pilihan jawaban: jika 3 : 5 dikalikan 3 pada kedua sukunya → (3 × 3) : (5 × 3) = 9 : 15.',
      'Jadi rasio yang ekuivalen dengan 15 : 25 adalah 9 : 15.',
    ],
  },
  {
    id: 'lat-6',
    topicId: 'persamaan-rasio',
    topicLabel: 'Persamaan Rasio',
    difficulty: 'Menengah',
    question:
      'Kebun sekolah SDN Karangpete membutuhkan pupuk organik dan tanah kompos dengan rasio 2 : 7. Jika tersedia 28 ember tanah kompos, berapa ember pupuk organik yang harus dicampurkan?',
    options: ['6 ember', '8 ember', '10 ember', '14 ember'],
    correctIndex: 1,
    hint: 'Angka tanah kompos adalah suku kedua (7). Dari 7 menjadi 28 itu dikalikan berapa?',
    solutionSteps: [
      'Rasio Pupuk Organik : Tanah Kompos = 2 : 7.',
      'Faktor pengali = 28 ÷ 7 = 4.',
      'Banyak pupuk organik = 2 × 4 = 8 ember.',
    ],
  },
  {
    id: 'lat-7',
    topicId: 'rasio-satuan',
    topicLabel: 'Rasio Satuan',
    difficulty: 'Dasar',
    question:
      'Siti membeli 6 buah pensil gambar di koperasi sekolah dengan harga total Rp15.000. Berapakah harga satuan (harga untuk 1 buah pensil gambar)?',
    options: ['Rp2.000', 'Rp2.500', 'Rp3.000', 'Rp3.500'],
    correctIndex: 1,
    hint: 'Bagi total harga dengan jumlah pensil yang dibeli Siti.',
    solutionSteps: [
      'Diketahui 6 pensil = Rp15.000.',
      'Harga 1 pensil (rasio satuan) = Rp15.000 ÷ 6 = Rp2.500 per pensil.',
    ],
  },
  {
    id: 'lat-8',
    topicId: 'rasio-satuan',
    topicLabel: 'Rasio Satuan',
    difficulty: 'Menengah',
    question:
      'Koperasi menyediakan dua paket susu kotak. Paket Cerdas berisi 4 kotak susu seharga Rp18.000, sedangkan Paket Sehat berisi 5 kotak susu seharga Rp21.000. Pernyataan manakah yang benar?',
    options: [
      'Paket Cerdas lebih hemat karena harga totalnya Rp18.000',
      'Paket Sehat lebih hemat karena harga satuannya Rp4.200 per kotak',
      'Kedua paket memiliki harga satuan yang sama persis',
      'Paket Cerdas memiliki harga satuan Rp4.000 per kotak',
    ],
    correctIndex: 1,
    hint: 'Hitung harga 1 kotak susu pada Paket Cerdas (18.000 ÷ 4) dan Paket Sehat (21.000 ÷ 5), lalu bandingkan mana yang lebih murah per kotaknya.',
    solutionSteps: [
      'Harga satuan Paket Cerdas = Rp18.000 ÷ 4 = Rp4.500 per kotak.',
      'Harga satuan Paket Sehat = Rp21.000 ÷ 5 = Rp4.200 per kotak.',
      'Karena Rp4.200 lebih murah daripada Rp4.500, maka Paket Sehat lebih hemat!',
    ],
  },
  {
    id: 'lat-9',
    topicId: 'rasio-satuan',
    topicLabel: 'Rasio Satuan',
    difficulty: 'Mahir',
    question:
      'Mesin cetak di ruang tata usaha SDN Karangpete mampu mencetak 120 lembar soal ujian dalam waktu 4 menit. Dengan kecepatan yang sama, berapa lembar soal yang dapat dicetak dalam waktu 7 menit?',
    options: ['180 lembar', '200 lembar', '210 lembar', '240 lembar'],
    correctIndex: 2,
    hint: 'Cari dulu rasio satuannya (berapa lembar per 1 menit), lalu kalikan dengan 7 menit.',
    solutionSteps: [
      'Rasio satuan kecepatan cetak = 120 lembar ÷ 4 menit = 30 lembar per 1 menit.',
      'Banyak cetakan dalam 7 menit = 30 lembar/menit × 7 menit = 210 lembar.',
    ],
  },
  {
    id: 'lat-10',
    topicId: 'penerapan-rasio',
    topicLabel: 'Penerapan Rasio',
    difficulty: 'Menengah',
    question:
      'Rasio banyak pohon mangga dan pohon jambu di halaman SDN Karangpete adalah 3 : 5. Jika JUMLAH seluruh pohon mangga dan jambu adalah 40 pohon, berapakah banyak pohon jambu?',
    options: ['15 pohon', '20 pohon', '24 pohon', '25 pohon'],
    correctIndex: 3,
    hint: 'Karena yang diketahui adalah JUMLAH pohon, jumlahkan angka rasionya (3 + 5 = 8 kotak unit) untuk mencari nilai 1 kotak unit.',
    solutionSteps: [
      'Jumlah kotak unit = 3 + 5 = 8 kotak unit.',
      'Nilai 1 kotak unit = 40 pohon ÷ 8 = 5 pohon.',
      'Banyak pohon jambu (5 kotak unit) = 5 × 5 = 25 pohon.',
    ],
  },
  {
    id: 'lat-11',
    topicId: 'penerapan-rasio',
    topicLabel: 'Penerapan Rasio',
    difficulty: 'Menengah',
    question:
      'Perbandingan uang tabungan Fajar dan Gilang adalah 7 : 4. Jika SELISIH uang tabungan mereka adalah Rp15.000, berapakah jumlah uang tabungan Fajar?',
    options: ['Rp20.000', 'Rp28.000', 'Rp35.000', 'Rp55.000'],
    correctIndex: 2,
    hint: 'Karena yang diketahui adalah SELISIH, kurangkan angka rasionya (7 − 4 = 3 kotak unit) untuk mencari nilai 1 kotak unit.',
    solutionSteps: [
      'Selisih kotak unit = 7 − 4 = 3 kotak unit.',
      'Nilai 1 kotak unit = Rp15.000 ÷ 3 = Rp5.000.',
      'Tabungan Fajar (7 kotak unit) = 7 × Rp5.000 = Rp35.000.',
    ],
  },
  {
    id: 'lat-12',
    topicId: 'penerapan-rasio',
    topicLabel: 'Penerapan Rasio',
    difficulty: 'Mahir',
    question:
      'Denah sekolah SDN Karangpete digambar dengan skala 1 : 300. Jika lebar gedung kelas 6 pada denah adalah 6 cm, berapakah lebar gedung kelas 6 yang sebenarnya dalam satuan meter?',
    options: ['12 meter', '15 meter', '18 meter', '24 meter'],
    correctIndex: 2,
    hint: 'Kalikan ukuran pada denah (6 cm) dengan angka skala (300), kemudian ubah dari cm ke meter (dibagi 100).',
    solutionSteps: [
      'Skala 1 : 300 berarti 1 cm pada denah mewakili 300 cm sebenarnya.',
      'Lebar sebenarnya (dalam cm) = 6 cm × 300 = 1.800 cm.',
      'Ubah ke satuan meter (1 m = 100 cm) → 1.800 ÷ 100 = 18 meter.',
    ],
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topicId: 'konsep-rasio',
    topicLabel: 'Konsep Rasio',
    question:
      'Di taman bacaan Kelas 6 SDN Karangpete terdapat 15 buku komik edukasi dan 20 buku cerita bergambar. Bentuk rasio paling sederhana dari banyak buku komik edukasi terhadap buku cerita bergambar adalah...',
    options: ['4 : 3', '3 : 4', '3 : 7', '5 : 4'],
    correctIndex: 1,
    explanation:
      'Buku komik : Buku cerita = 15 : 20. Bagi kedua bilangan dengan FPB-nya yaitu 5, sehingga diperoleh (15 ÷ 5) : (20 ÷ 5) = 3 : 4.',
  },
  {
    id: 2,
    topicId: 'konsep-rasio',
    topicLabel: 'Konsep Rasio',
    question:
      'Dalam sebuah keranjang piknik terdapat 8 buah apel merah dan 12 buah apel hijau. Rasio banyak apel merah terhadap SELURUH apel di dalam keranjang adalah...',
    options: ['2 : 3', '3 : 5', '2 : 5', '4 : 5'],
    correctIndex: 2,
    explanation:
      'Total seluruh apel = 8 + 12 = 20 buah. Rasio apel merah terhadap seluruh apel = 8 : 20. Disederhanakan dengan dibagi 4 menjadi 2 : 5.',
  },
  {
    id: 3,
    topicId: 'persamaan-rasio',
    topicLabel: 'Persamaan Rasio',
    question:
      'Perhatikan persamaan rasio berikut: 5 : 8 = 35 : n. Nilai pengganti huruf n yang tepat agar kedua rasio tersebut ekuivalen adalah...',
    options: ['40', '48', '56', '64'],
    correctIndex: 2,
    explanation:
      'Suku pertama berubah dari 5 menjadi 35 (dikalikan 7). Maka suku kedua juga harus dikalikan 7 → n = 8 × 7 = 56.',
  },
  {
    id: 4,
    topicId: 'persamaan-rasio',
    topicLabel: 'Persamaan Rasio',
    question:
      'Untuk membuat minuman jahe hangat, rasio takaran sari jahe dan air hangat adalah 2 : 9. Jika Ibu membuat minuman menggunakan 54 gelas air hangat, berapa gelas sari jahe yang dibutuhkan?',
    options: ['10 gelas', '12 gelas', '14 gelas', '18 gelas'],
    correctIndex: 1,
    explanation:
      'Rasio Jahe : Air = 2 : 9. Karena air hangat yang digunakan 54 gelas, faktor pengalinya adalah 54 ÷ 9 = 6. Maka sari jahe = 2 × 6 = 12 gelas.',
  },
  {
    id: 5,
    topicId: 'rasio-satuan',
    topicLabel: 'Rasio Satuan',
    question:
      'Ayah mengendarai sepeda motor sejauh 135 km dan menghabiskan 3 liter bensin. Berapakah rasio satuan jarak tempuh sepeda motor Ayah per 1 liter bensin?',
    options: ['35 km/liter', '40 km/liter', '45 km/liter', '50 km/liter'],
    correctIndex: 2,
    explanation:
      'Rasio satuan = Total jarak ÷ Total liter bensin = 135 km ÷ 3 liter = 45 km per 1 liter bensin (45 km/liter).',
  },
  {
    id: 6,
    topicId: 'rasio-satuan',
    topicLabel: 'Rasio Satuan',
    question:
      'Toko Alat Tulis Makmur menjual dua kemasan pulpen. Kemasan A berisi 3 pulpen seharga Rp10.500, sedangkan Kemasan B berisi 5 pulpen seharga Rp16.000. Berapakah selisih harga 1 buah pulpen antara Kemasan A dan Kemasan B?',
    options: ['Rp200', 'Rp300', 'Rp400', 'Rp500'],
    correctIndex: 1,
    explanation:
      'Harga satuan Kemasan A = Rp10.500 ÷ 3 = Rp3.500/pulpen. Harga satuan Kemasan B = Rp16.000 ÷ 5 = Rp3.200/pulpen. Selisihnya = Rp3.500 − Rp3.200 = Rp300.',
  },
  {
    id: 7,
    topicId: 'penerapan-rasio',
    topicLabel: 'Penerapan Rasio',
    question:
      'Rasio umur Kakak dan Adik saat ini adalah 5 : 3. Jika jumlah umur mereka berdua adalah 24 tahun, berapakah umur Kakak saat ini?',
    options: ['9 tahun', '12 tahun', '15 tahun', '18 tahun'],
    correctIndex: 2,
    explanation:
      'Jumlah kotak unit = 5 + 3 = 8 unit. Nilai 1 unit = 24 tahun ÷ 8 = 3 tahun. Umur Kakak (5 unit) = 5 × 3 = 15 tahun.',
  },
  {
    id: 8,
    topicId: 'penerapan-rasio',
    topicLabel: 'Penerapan Rasio',
    question:
      'Perbandingan banyak bibit bunga mawar dan bunga melati di taman SDN Karangpete adalah 4 : 9. Jika selisih banyak kedua bibit bunga tersebut adalah 30 tanaman, berapakah jumlah SELURUH bibit bunga mawar dan melati jika digabungkan?',
    options: ['54 tanaman', '66 tanaman', '78 tanaman', '90 tanaman'],
    correctIndex: 2,
    explanation:
      'Selisih unit = 9 − 4 = 5 unit. Nilai 1 unit = 30 ÷ 5 = 6 tanaman. Jumlah seluruh unit = 4 + 9 = 13 unit. Total tanaman = 13 × 6 = 78 tanaman.',
  },
  {
    id: 9,
    topicId: 'penerapan-rasio',
    topicLabel: 'Penerapan Rasio',
    question:
      'Jarak antara rumah Rina dan SDN Karangpete pada peta berskala 1 : 15.000 adalah 4 cm. Berapakah jarak sebenarnya dari rumah Rina ke sekolah dalam satuan meter?',
    options: ['450 meter', '600 meter', '750 meter', '1.500 meter'],
    correctIndex: 1,
    explanation:
      'Jarak sebenarnya = 4 cm × 15.000 = 60.000 cm. Ubah ke meter dengan membagi 100 → 60.000 ÷ 100 = 600 meter.',
  },
  {
    id: 10,
    topicId: 'penerapan-rasio',
    topicLabel: 'Penerapan Rasio',
    question:
      'Untuk menyelesaikan proyek hasta karya kelas 6, rasio pita merah, kuning, dan hijau yang diperlukan adalah 2 : 3 : 4. Jika panjang pita kuning yang digunakan adalah 18 meter, berapakah total panjang ketiga pita tersebut?',
    options: ['48 meter', '54 meter', '60 meter', '72 meter'],
    correctIndex: 1,
    explanation:
      'Pita kuning = 3 unit = 18 meter, sehingga 1 unit = 18 ÷ 3 = 6 meter. Total seluruh unit = 2 + 3 + 4 = 9 unit. Total panjang pita = 9 × 6 meter = 54 meter.',
  },
];
