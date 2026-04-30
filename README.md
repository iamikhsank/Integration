# KriyaLogic Integration System

## Deskripsi

KriyaLogic adalah sistem ERP hybrid untuk forecasting penjualan, penjualan point-of-sale, dan analytics berbasis web. Proyek ini menggabungkan:

- Backend Node.js / Express untuk API dan manajemen data
- Frontend React / Vite dengan Tailwind CSS untuk dashboard modern
- Machine Learning engine Python untuk forecasting menggunakan Facebook Prophet
- MongoDB untuk penyimpanan data transaksi dan analytics

## Fitur Utama

- **Analytics Report**: Dashboard analitik lengkap dengan KPI, leaderboard, dan ringkasan bisnis
- **Forecasting Penjualan**: Prediksi permintaan produk 30 hari ke depan
- **Manajemen Produk**: CRUD untuk master product, child product, dan kategori
- **Manajemen User**: Role-based authentication untuk admin dan cashier
- **POS System**: Transaksi penjualan cash/QR dengan invoice dan riwayat
- **Delivery Analytics**: Pencatatan biaya pengiriman dan profit premium

## Struktur Proyek

```
Integration/
├── ai_engine/
│   ├── ml_forecasting.py
│   ├── requirements.txt
│   └── seed_data.py
├── kriyalogic-backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   ├── scripts/
│   │   └── utils/
│   ├── package.json
│   └── docs.md
├── kriyalogic-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── utils/
│   ├── package.json
│   └── README.md
├── sistem_peramalan_(forecasting)_penjualan_toko.py
└── README.md
```

## Prasyarat

- Node.js 16+ dan npm
- Python 3.8+
- MongoDB lokal atau cloud
- Akses terminal / shell

## Instalasi Cepat

### 1. Clone Repository
```bash
git clone https://github.com/iamikhsank/Integration.git
cd Integration
```

### 2. Backend
```bash
cd kriyalogic-backend
npm install
```

Buat file `.env` dengan setidaknya:
```bash
MONGO_URI=mongodb://localhost:27017/kriyalogic
JWT_SECRET=your_jwt_secret
```

### 3. Frontend
```bash
cd ../kriyalogic-frontend
npm install
```

### 4. AI Engine
```bash
cd ../ai_engine
pip install -r requirements.txt
```

## Menjalankan Sistem

### Backend
```bash
cd kriyalogic-backend
npm start
```

### Frontend
```bash
cd kriyalogic-frontend
npm run dev
```

### Forecasting Engine (Opsional)
```bash
cd ai_engine
python ml_forecasting.py
```

### Endpoint Dasar
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api/v1`

## Analytic Feature & Seeding

### Seeder CSV Analytics
Folder backend berisi script baru:
- `src/scripts/seed_analytics.js`

Script ini membaca dua CSV utama:
- `KriyaLogic_Final_Analytics_Report_v2.csv`
- `KriyaLogic_Delivery_Analytics_Premium_Price.csv`

Script membersihkan nilai moneter kotor seperti:
- `Rp1,900,000`
- ` 31350.000000000004 `
- spasi kosong dan karakter non-digit

Jalankan dengan:
```bash
cd kriyalogic-backend
node src/scripts/seed_analytics.js
```

### Model MongoDB Baru
- `src/models/AnalyticsRecord.js`
- `src/models/DeliveryRecord.js`

Model baru ini mendukung analytics rekaman penjualan dan delivery profit.

### API Analytics Summary
Endpoint baru:
- `GET /api/v1/analytics/summary`

Response berisi:
- `totalRevenue`
- `totalCommissionExpenses`
- `netProfit`
- `deliveryProfit`
- `topSellingProducts`
- `topPerformingTourGuides`
- `topPerformingArtisans`

Lihat dokumentasi API di `kriyalogic-backend/docs.md`.

## Halaman Analytics Frontend

Frontend sekarang memiliki halaman analytics yang terhubung ke API summary.

Fitur utama:
- 4 KPI card: revenue, profit, delivery profit, commission expenses
- Leaderboard untuk produk, tour guide, dan artisan
- Recharts bar chart untuk top selling products
- Fallback mock data saat API belum tersedia

Page berada di:
- `kriyalogic-frontend/src/pages/AnalyticsReport.jsx`

## Struktur Endpoint Utama

- `/api/v1/auth` - autentikasi
- `/api/v1/users` - manajemen user
- `/api/v1/artisans` - manajemen artisan
- `/api/v1/guides` - manajemen tour guide
- `/api/v1/master-products` - master product
- `/api/v1/categories` - kategori
- `/api/v1/child-items` - child product
- `/api/v1/sales` - transaksi penjualan
- `/api/v1/pos` - POS
- `/api/v1/forecast` - forecasting
- `/api/v1/analytics` - analytics summary

## Frontend Penggunaan

### Jalankan Development
```bash
cd kriyalogic-frontend
npm run dev
```

### Build Produksi
```bash
npm run build
```

## Dokumentasi Lebih Lanjut

- Backend API: `kriyalogic-backend/docs.md`
- Frontend README: `kriyalogic-frontend/README.md`

## Lisensi

ISC

## Kontak

Untuk dukungan atau pertanyaan, lihat maintainer repository.
