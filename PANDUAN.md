# Aplikasi Keuangan YPI Ulul Albab

Aplikasi ini membuka web app Sistem Keuangan YPI Ulul Albab Tarakan dalam bentuk aplikasi yang bisa diinstal di laptop dan HP, dengan ikon logo yayasan dan tampilan layar penuh.

Data tetap tersimpan di Google Sheets. Setiap perubahan pada web app Apps Script langsung ikut tampil di aplikasi tanpa perlu instal ulang.

## Isi folder

| Berkas | Fungsi |
|---|---|
| `index.html` | Layar pembuka dan tampilan aplikasi |
| `manifest.webmanifest` | Nama, warna, dan ikon aplikasi |
| `sw.js` | Agar aplikasi bisa diinstal dan tetap terbuka saat offline |
| `icons/` | Ikon dan logo yayasan |

## Bila alamat web app berubah

Alamat web app tertulis di `index.html`, pada baris `const APP_URL = ...`.

Kalau suatu saat membuat **deployment baru** di Apps Script, ganti alamat itu dengan URL web app yang baru, lalu simpan di GitHub. Kalau hanya memperbarui versi deployment yang sudah ada, alamatnya tidak berubah dan tidak perlu diganti.

## Syarat di Apps Script

Pada **Terapkan → Kelola deployment**, bagian **Siapa yang memiliki akses** harus **Siapa saja**. Aplikasi sudah punya halaman login sendiri, jadi pengguna tetap harus masuk dengan username dan password.
