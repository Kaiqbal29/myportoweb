# MyPorto

MyPorto adalah starter project **portfolio website builder** yang dibuat dengan React. Pengguna dapat mengisi informasi pribadi, skills, dan project lalu melihat hasilnya secara langsung melalui live preview.

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
