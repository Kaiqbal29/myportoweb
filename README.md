# MyPorto

MyPorto adalah starter project **portfolio website builder** yang dibuat dengan React. Pengguna dapat mengisi informasi pribadi, skills, dan project lalu melihat hasilnya secara langsung melalui live preview.

## Fitur yang sudah tersedia

- Form untuk informasi utama, bio, lokasi, email, dan foto profil
- Contoh teks muncul sebagai placeholder ber-opacity rendah, bukan sebagai data awal
- Upload foto profil lokal JPG, PNG, atau WEBP dengan batas 2 MB
- Upload foto untuk setiap project dengan preview langsung
- Live preview portfolio
- Tambah dan hapus skills
- Tambah, edit, dan hapus project
- Tambah, edit, dan hapus pengalaman kerja
- Tambah, edit, dan hapus beberapa sertifikasi
- Lima tema desain: Clean, Midnight, Ocean, Lavender, dan Sunset
- Tambah social media custom dan kontrol tampil/sembunyikan
- Export portfolio ke PDF melalui dialog print browser
- Penyimpanan otomatis menggunakan `localStorage`
- Tampilan responsive untuk desktop dan mobile

## Cara menjalankan project

Pastikan Node.js sudah ter-install. Kemudian buka terminal di folder project ini dan jalankan:

```bash
npm install
npm run dev
```

Buka URL yang muncul di terminal, biasanya:

```text
http://localhost:5173
```

Untuk membuat versi production:

```bash
npm run build
npm run preview
```

## Struktur folder

```text
MyPorto/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    └── components/
        ├── EditorForm.jsx
        └── PortfolioPreview.jsx
```

## Cara memahami kode

### 1. `src/main.jsx`

File ini adalah titik awal aplikasi. React memasang komponen `App` ke elemen HTML yang memiliki id `root`.

### 2. `src/App.jsx`

File ini mengatur state utama portfolio:

- `portfolio`: data nama, bio, skills, project, dan lainnya
- `mode`: tampilan editor atau preview pada mobile
- `theme`: tema terang atau gelap

Beberapa konsep React yang digunakan:

- `useState` untuk menyimpan data yang berubah
- `useEffect` untuk menyimpan data ke `localStorage`
- props untuk mengirim data ke komponen anak
- `map` untuk menampilkan array skills dan project

### 3. `src/components/EditorForm.jsx`

Berisi form input. Setiap input adalah **controlled component**, artinya nilainya dikontrol oleh state React.

Contoh pola yang penting:

```jsx
<input
  value={portfolio.name}
  onChange={(event) => updateField('name', event.target.value)}
/>
```

### 4. `src/components/PortfolioPreview.jsx`

Berisi tampilan portfolio yang dilihat pengunjung. Komponen ini menerima data dari `App` melalui props dan otomatis ikut berubah ketika form diedit.

### 5. `src/styles.css`

Berisi seluruh desain MyPorto, termasuk responsive layout, tema terang, tema gelap, form, card, dan preview portfolio.

## Latihan berikutnya

Kerjakan satu per satu, jangan semuanya sekaligus:

1. Tambahkan form untuk mengedit pengalaman kerja.
2. Tambahkan tombol untuk menghapus semua data `localStorage`.
3. Tambahkan validasi email dan link project.
4. Tambahkan tiga template portfolio yang berbeda.
5. Tambahkan drag-and-drop untuk mengubah urutan section.
6. Tambahkan fitur export ke PDF.
7. Pindahkan penyimpanan dari `localStorage` ke Supabase.
8. Tambahkan login dan halaman portfolio publik.

## Catatan portfolio

Saat project ini sudah lebih matang, tulis README yang menjelaskan:

- Masalah apa yang ingin diselesaikan
- Fitur utama
- Teknologi yang digunakan
- Tantangan teknis yang kamu temui
- Screenshot aplikasi
- Link demo live

Jangan hanya menulis bahwa kamu menggunakan React. Jelaskan keputusan teknis dan proses belajarmu.
