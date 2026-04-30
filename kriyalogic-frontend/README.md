# KriyaLogic Frontend

## Prasyarat

Sebelum menjalankan frontend, pastikan Anda sudah menginstal:

- Node.js (LTS direkomendasikan)
- npm

## Instalasi

1. Masuk ke folder frontend:
    ```bash
    cd kriyalogic-frontend
    ```

2. Install dependensi:
    ```bash
    npm install
    ```

## Menjalankan Aplikasi

### Mode Development
Jalankan aplikasi dengan hot reload:
```bash
npm run dev
```

Lalu buka browser di alamat yang ditampilkan, biasanya `http://localhost:5173`.

### Build Produksi
Untuk membangun bundle produksi yang dioptimalkan:
```bash
npm run build
```

## Struktur Folder

- `src/` — kode sumber aplikasi
  - `components/` — reusable React components
  - `pages/` — halaman utama aplikasi
  - `hooks/` — custom hooks
  - `utils/` — utility functions
- `public/` — aset statis
- `index.html` — titik masuk aplikasi
- `vite.config.js` — konfigurasi Vite
- `tailwind.config.js` — konfigurasi Tailwind CSS

## Analytics Report Page

Halaman analytics terletak di:
- `src/pages/AnalyticsReport.jsx`

Fitur halaman:
- 4 KPI cards: `Total Revenue`, `Net Profit`, `Delivery Profit (15%)`, `Total Commission Expenses`
- Leaderboards untuk `Top Selling Products`, `Top Performing Tour Guides`, dan `Top Performing Artisans`
- Recharts bar chart untuk visualisasi produk terlaris
- Fetch data dari endpoint `GET /api/v1/analytics/summary`
- Tampilan fallback mock data saat API belum tersedia

## Pengaturan API

Frontend mengambil data dari API yang dikonfigurasi pada `VITE_API_URL`.
Jika tidak ditentukan, default akan menggunakan:
```bash
http://localhost:5000/api/v1
```

## Notes

Pastikan backend sudah berjalan sebelum membuka halaman analytics agar data live dapat dimuat.

## Kontribusi

1. Checkout branch baru
2. Buat perubahan di dalam `src/`
3. Commit dan push
4. Buat pull request
