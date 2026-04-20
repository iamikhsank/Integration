# KriyaLogic Integration System

## Deskripsi

Sistem integrasi lengkap untuk forecasting penjualan toko menggunakan AI (Facebook Prophet), dengan backend Node.js/Express, frontend React/Vite, dan engine AI Python.

## Fitur Utama

- **Analytics Report**: Dashboard analitik dengan KPI penjualan, grafik trend, dan visualisasi data historis
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

## Fitur Aplikasi

### Admin Dashboard
- **Analytics Report**: Analisis penjualan dengan KPI, grafik trend harian, distribusi metode pembayaran, dan tabel transaksi terbaru
- **Inventory Management**: Kelola produk master, child product, dan kategori
- **Forecasting**: Prediksi penjualan 30 hari ke depan berdasarkan produk
- **User Management**: Kelola pengguna admin dan cashier
- **Partner Management**: Kelola artisan dan tour guide

### Cashier Dashboard
- **POS System**: Proses transaksi penjualan dengan receipt generation
- **Receipt History**: Riwayat transaksi dengan filter dan export PDF
- **Delivery Management**: (Dalam pengembangan)
- **Transaction Reports**: (Dalam pengembangan)

## Halaman Forecasting

Halaman Forecasting menyediakan dashboard interaktif untuk memprediksi penjualan produk menggunakan AI Facebook Prophet dengan visualisasi yang komprehensif.

### 🎯 Fitur Utama

#### 1. **Product Selector**
- Dropdown untuk memilih produk parent yang ingin di-forecast
- Produk tersedia: Patung Buddha, Patung Ganesha, Patung Naga, dll.
- Real-time update forecast saat produk berubah

#### 2. **KPI Cards**
- **Total Predicted Demand**: Total prediksi penjualan untuk 30 hari ke depan
- **Average Confidence Range**: Rata-rata margin error prediksi
- **Trend Analysis**: Analisis trend (Growing/Declining/Stable) dengan indikator visual

#### 3. **Grafik Forecasting**
- **Composed Chart** dengan 3 layer:
  - **Area Chart**: Menampilkan confidence interval (upper & lower bounds)
  - **Line Chart**: Prediksi utama (predicted demand)
  - **Visual Uncertainty**: Area berwarna menunjukkan tingkat ketidakpastian

#### 4. **Interactive Features**
- **Custom Tooltip**: Hover untuk detail prediksi per tanggal
- **Responsive Design**: Chart menyesuaikan ukuran layar
- **Loading States**: Indikator loading saat fetch data
- **Error Handling**: Pesan error yang informatif

#### 5. **Data Integration**
- **Real-time API**: Fetch data dari `/api/forecast/:parent_code`
- **MongoDB Integration**: Data forecast disimpan di database
- **Authentication**: Protected route untuk admin only

### 📊 Cara Kerja

1. **Pilih Produk**: User memilih produk dari dropdown
2. **Fetch Data**: Sistem mengambil data forecast dari backend
3. **Calculate KPI**: Hitung total demand, confidence range, dan trend
4. **Render Chart**: Tampilkan grafik dengan area confidence dan line prediksi
5. **Interactive**: User dapat hover untuk detail per hari

### 🎨 Design Elements

- **Color Scheme**: Blue primary (#3B82F6), Green untuk positive (#10B981), Red untuk negative (#EF4444)
- **Icons**: Lucide React icons (DollarSign, Target, TrendingUp/Down, BarChart3)
- **Typography**: Clean, modern dengan hierarchy yang jelas
- **Layout**: Grid responsive dengan spacing konsisten
- **Charts**: Recharts library untuk visualisasi data

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
