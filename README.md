# 🌍 GempaWoi

GempaWoi adalah aplikasi web real-time untuk memantau aktivitas gempa bumi di Indonesia. Aplikasi ini menggunakan data resmi dari BMKG (Badan Meteorologi, Klimatologi, dan Geofisika) untuk memberikan informasi terkini tentang gempa bumi.

## ✨ Fitur

- 🔄 Update data gempa secara real-time
- 🗺️ Tampilan peta shakemap dari BMKG
- 📊 Informasi detail gempa terkini:
  - Magnitude
  - Lokasi dan koordinat
  - Kedalaman
  - Potensi tsunami
  - Area yang merasakan gempa
- 📱 Responsive design (mobile-friendly)
- 📜 Riwayat 15 gempa terakhir
- 🎨 UI modern dengan efek glassmorphism

## 🚀 Teknologi yang Digunakan

- HTML5
- CSS3 dengan Tailwind CSS
- JavaScript (Vanilla)
- API BMKG untuk data gempa

## 🔗 API yang Digunakan

- Gempa Terkini: `https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json`
- Riwayat Gempa: `https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json`
- Shakemap: `https://static.bmkg.go.id/[shakemap_code].jpg`

## 💻 Cara Penggunaan

1. Clone repository ini:
   ```bash
   git clone https://github.com/gaffaq/gempawoi.git
   ```

2. Buka folder project:
   ```bash
   cd gempawoi
   ```

3. Jalankan dengan live server atau buka `index.html` di browser

## 🎯 Fitur Utama

### Gempa Terkini
- Menampilkan informasi gempa terbaru dalam card utama
- Dilengkapi dengan peta shakemap
- Informasi lengkap termasuk koordinat, kedalaman, dan potensi tsunami

### Riwayat Gempa
- Menampilkan 15 gempa terakhir dalam card-card yang informatif
- Warna magnitude yang berbeda berdasarkan kekuatan gempa:
  - Merah: ≥ 6.0 SR
  - Kuning: ≥ 5.0 SR
  - Hijau: < 5.0 SR
- Informasi kedalaman dengan indikator warna:
  - Ungu: ≥ 100 km
  - Biru: ≥ 50 km
  - Cyan: < 50 km

## 🎨 Desain

- Modern UI dengan efek glassmorphism
- Animasi smooth untuk loading dan transisi
- Gradient dan efek visual yang menarik
- Dark theme untuk kenyamanan mata
- Layout responsif untuk semua ukuran layar

## 🔄 Auto-Update

Data akan diperbarui secara otomatis, dan pengguna juga dapat memperbarui data secara manual dengan tombol "Segarkan".

## 👨‍💻 Dibuat Oleh

[Gaffa](https://github.com/gaffaq)

## 📝 Lisensi

Project ini dilisensikan di bawah [MIT License](LICENSE)

## 🙏 Kredit

Data gempa disediakan oleh [BMKG Indonesia](https://www.bmkg.go.id/) 
