## Deskripsi Tujuan
Membuat website portofolio statis berkelompok menggunakan HTML, CSS, dan JS murni. Proyek menerapkan *clean code* dengan arsitektur folder rapi dan desain premium yang autentik, *custom*, dan tidak terlihat seperti template standar atau hasil *generate* AI (*anti AI-slop*).

## Keputusan Desain & Tipografi
> [!TIP]
> Tema dan font telah ditentukan agar terlihat modern dan profesional.

- **Tema Desain:** Modern Dark Mode dengan layout *Bento Grid* (memberikan kesan rapi, kekinian, dan premium). Desain harus terlihat orisinal (*anti AI-slop*), menghindari elemen *generic* yang sering dihasilkan secara instan oleh AI.
- **Responsivitas & Konsistensi:** Wajib sepenuhnya *mobile-responsive*. Layout kartu (*card*) harus memiliki dimensi yang konsisten dan menangani teks berlebih (panjang) dengan rapi. Gunakan teknik seperti *line-clamp* (teks terpotong dengan elipsis `...`) atau tinggi tetap agar kartu tidak memanjang/melebar secara tidak beraturan.
- **Font Utama (Heading):** `Space Grotesk` (Kesan modern, tech-savvy, unik).
- **Font Teks (Body):** `Inter` (Sangat bersih, minimalis, dan mudah dibaca).
- **Warna Dominan:** Latar belakang gelap (`#121212`) dengan aksen warna neon tipis (misal ungu atau biru elektrik).

## Fitur Utama
1. **Hero Section:** Perkenalan nama kelompok dengan animasi teks sederhana.
2. **Member Grid:** Kartu profil untuk setiap anggota (Bento grid style).
3. **Profil Detail:**
   - Foto & Nama
   - "Tentang Saya" & Motivasi
   - Tautan Sosial (LinkedIn, Instagram, GitHub).
   - Galeri Sertifikat (Klik untuk pop-up/modal).

## Proposed Changes (Arsitektur Folder & File)
Proyek akan menggunakan pemisahan data dan tampilan agar mudah dikembangkan.

### Root Directory
#### [NEW] index.html
Struktur utama semantic HTML5.

### Assets & Styling
#### [NEW] css/style.css
Variabel global (warna, font Google), reset, dan layout utama.
#### [NEW] css/components.css
Styling khusus untuk kartu member, modal, dan tombol.
#### [NEW] assets/images/
Folder untuk foto profil dan gambar sertifikat anggota.

### Data & Logika
#### [NEW] js/members.js
Penyimpanan data tiap anggota dalam format Array.
#### [NEW] js/main.js
Logika DOM untuk memuat data dari `members.js` dan fungsionalitas interaktif (seperti modal sertifikat).

## Verification Plan
### Manual Verification
1. Buka `index.html` di browser lokal.
2. Verifikasi tipografi (Space Grotesk & Inter) termuat dengan benar.
3. Periksa layout tidak pecah di ukuran mobile dan desktop.
4. Uji klik tautan sosial dan klik gambar sertifikat (harus memicu modal).