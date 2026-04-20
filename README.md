# KriyaLogic Integration System

## Deskripsi

Sistem integrasi lengkap untuk forecasting penjualan toko menggunakan AI (Facebook Prophet), dengan backend Node.js/Express, frontend React/Vite, dan engine AI Python.

## Fitur Utama

- **Forecasting Penjualan**: Prediksi penjualan harian menggunakan model Prophet
- **Manajemen Produk**: CRUD untuk master product, child product, kategori
- **Manajemen User**: Sistem autentikasi dengan role admin dan cashier
- **POS System**: Point of Sale untuk transaksi penjualan
- **Dashboard**: Antarmuka web untuk monitoring dan forecasting
- **Database**: MongoDB untuk penyimpanan data

## Struktur Proyek

```
Integration/
├── ai_engine/                 # Engine AI untuk forecasting
│   ├── ml_forecasting.py     # Modul forecasting terintegrasi dengan MongoDB
│   ├── requirements.txt      # Dependencies Python
│   └── seed_data.py          # Script seeding data dari Excel
├── kriyalogic-backend/        # Backend API Node.js
│   ├── src/
│   │   ├── controllers/       # Controller untuk setiap endpoint
│   │   ├── models/           # Model MongoDB
│   │   ├── routes/           # Routing API
│   │   ├── middleware/       # Middleware auth, dll
│   │   └── utils/            # Utility functions
│   ├── package.json
│   └── docs.md               # Dokumentasi API
├── kriyalogic-frontend/       # Frontend React
│   ├── src/
│   │   ├── components/       # Komponen React
│   │   ├── pages/           # Halaman aplikasi
│   │   ├── hooks/           # Custom hooks
│   │   └── utils/           # Utility functions
│   └── package.json
├── sistem_peramalan_(forecasting)_penjualan_toko.py  # Script forecasting standalone
├── models/                   # Folder untuk model atau data tambahan
└── README.md
```

## Prerequisites

- Node.js (v16+)
- Python 3.8+
- MongoDB (local atau cloud)
- npm atau yarn

## Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/iamikhsank/Integration.git
cd Integration
```

### 2. Setup Backend
```bash
cd kriyalogic-backend
npm install
# Setup .env file dengan MONGO_URI dan JWT_SECRET
npm run seed  # Seed data awal
```

### 3. Setup Frontend
```bash
cd ../kriyalogic-frontend
npm install
```

### 4. Setup AI Engine
```bash
cd ../ai_engine
pip install -r requirements.txt
```

## Menjalankan Sistem

### Jalankan Semua Komponen
```bash
# Terminal 1: Backend
cd kriyalogic-backend && npm start

# Terminal 2: Frontend
cd kriyalogic-frontend && npm run dev

# Terminal 3: Forecasting (jika perlu)
cd ai_engine && python ml_forecasting.py
```

### Akses Aplikasi
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api/v1

## API Endpoints

Lihat [docs.md](kriyalogic-backend/docs.md) untuk dokumentasi API lengkap.

## Forecasting

### Menggunakan Script Standalone
```bash
python sistem_peramalan_\(forecasting\)_penjualan_toko.py
```

### Menggunakan Engine Terintegrasi
Script `ml_forecasting.py` terhubung langsung ke MongoDB untuk forecasting real-time.

## Dependencies

### Backend
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- exceljs
- resend

### Frontend
- react
- react-dom
- react-router-dom
- tailwindcss
- lucide-react
- recharts
- file-saver
- html2canvas-pro
- jspdf
- xlsx

### AI Engine
- pandas
- prophet
- pymongo
- python-dotenv
- openpyxl
- scikit-learn
- matplotlib
- plotly

## Kontribusi

1. Fork repository
2. Buat branch fitur baru
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request

## Lisensi

ISC

## Kontak

Untuk pertanyaan atau dukungan, hubungi maintainer repository.
