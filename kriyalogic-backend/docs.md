# Dokumentasi API KriyaLogic

## Base URL
`http://localhost:5000/api/v1`

## Endpoints

### 1. General

#### Root Endpoint
- **URL**: `/`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Welcome to KriyaLogic API v1",
    "version": "1.0.0"
  }
  ```

### 2. Authentication

#### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "admin@kriyalogic.com",
    "password": "password123"
  }
  ```
- **Response Success**:
  ```json
  {
    "success": true,
    "token": "ey...",
    "user": {
      "id": "60d0...",
      "username": "Admin User",
      "email": "admin@kriyalogic.com",
      "role": "admin"
    }
  }
  ```

#### Forgot Password
- **URL**: `/auth/forgot-password`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@kriyalogic.com"
  }
  ```

#### Reset Password
- **URL**: `/auth/reset-password/:resettoken`
- **Method**: `PUT`
- **Body**:
  ```json
  {
    "password": "newpassword123"
  }
  ```

### 3. Analytics

#### Summary
Menampilkan ringkasan analytics yang digunakan oleh halaman Analytics Report frontend.

- **URL**: `/analytics/summary`
- **Method**: `GET`
- **Response Success (200)**:
  ```json
  {
    "success": true,
    "data": {
      "totalRevenue": 178500000,
      "totalCommissionExpenses": 24250000,
      "netProfit": 94500000,
      "deliveryProfit": 18200000,
      "topSellingProducts": [
        {"productName": "Patung Garuda Wisnu", "totalQuantity": 72},
        {"productName": "Patung Ganesha", "totalQuantity": 55}
      ],
      "topPerformingTourGuides": [
        {"tourGuide": "Adi Putra", "totalSales": 42000000}
      ],
      "topPerformingArtisans": [
        {"artisanName": "Sari Dewi", "totalQuantity": 84}
      ]
    }
  }
  ```

### 4. Seeder & Data Models

#### Seeder Script
Script CSV seeding ditambahkan di backend:
- `src/scripts/seed_analytics.js`

Script ini melakukan:
- Pembacaan CSV
- Pembersihan nilai moneter dari format `Rp1,900,000`, spasi, dan angka desimal tidak normal
- Penyimpanan ke collection MongoDB `analyticsrecords` dan `deliveryrecords`

#### Models
- `src/models/AnalyticsRecord.js`
  - `date`, `productName`, `artisanName`, `tourGuide`, `quantity`, `totalSales`, `artisanCommission`, `guideCommission`, `netProfit`
- `src/models/DeliveryRecord.js`
  - `date`, `productName`, `recipientName`, `originalCourierCost`, `storeProfit15Percent`, `totalShippingPrice`

### 5. API Notes

- Semua endpoint menggunakan prefix `/api/v1`
- Endpoint analytics summary tidak membutuhkan body
- Jika response error, server mengembalikan objek `success: false` dan pesan error

## Cara Menjalankan Backend

1. Install dependencies
```bash
npm install
```

2. Jalankan server
```bash
npm start
```

3. Jalankan seeder analytics
```bash
node src/scripts/seed_analytics.js
```

## Catatan Teknis

- Route analytics terpasang di `src/routes/analyticsRoutes.js`
- Controller summary berada di `src/controllers/analyticsController.js`
- Schema MongoDB didefinisikan di `src/models/AnalyticsRecord.js` dan `src/models/DeliveryRecord.js`
- Backend terhubung dengan MongoDB melalui `src/config/db.js`

## Referensi

Untuk frontend, gunakan `kriyalogic-frontend/README.md`.

- **URL**: `/artisans`
- **Method**: `POST`
- **Headers**:
  - `Authorization`: `Bearer <admin_token>`
- **Body**:
  ```json
  {
    "fullName": "Budi Santoso",
    "phoneNumber": "081234567890",
    "commissionRate": 10,
    "bankAccount": "BCA 1234567890",
    "address": "Jl. Merdeka No. 10, Jakarta"
  }
  ```
- **Response Success (201)**:
  ```json
  {
    "success": true,
    "data": {
      "fullName": "Budi Santoso",
      "phoneNumber": "081234567890",
      "commissionRate": 10,
      "bankAccount": "BCA 1234567890",
      "address": "Jl. Merdeka No. 10, Jakarta",
      "_id": "60d0...",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "__v": 0
    }
  }
  ```
- **Response Error (400)**:
  ```json
  {
    "success": false,
    "message": "Phone number already exists"
  }
  ```

#### Get All Artisans
Mengambil semua data artisan. Hanya bisa diakses oleh Admin.

- **URL**: `/artisans`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer <admin_token>`
- **Response Success (200)**:
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "fullName": "Budi Santoso",
        "phoneNumber": "081234567890",
        "commissionRate": 10,
        "bankAccount": "BCA 1234567890",
        "address": "Jl. Merdeka No. 10, Jakarta",
        "_id": "60d0...",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "__v": 0
      }
    ]
  }
  ```

#### Update Artisan
Memperbarui data artisan. Hanya bisa diakses oleh Admin.

- **URL**: `/artisans/:id`
- **Method**: `PUT`
- **Headers**:
  - `Authorization`: `Bearer <admin_token>`
- **Body** (optional):
  ```json
  {
    "fullName": "New Name",
    "phoneNumber": "08123456789",
    "commissionRate": 15,
    "bankAccount": "BCA 1234567890",
    "address": "New Address"
  }
  ```
- **Response Success (200)**:
  ```json
  {
    "success": true,
    "data": {
      "fullName": "New Name",
      "phoneNumber": "08123456789",
      "commissionRate": 15,
      "bankAccount": "BCA 1234567890",
      "address": "New Address",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "_id": "60d0..."
    }
  }
  ```
- **Response Error (404)**:
  ```json
  {
    "success": false,
    "message": "Artisan not found"
  }
  ```
- **Response Error (400)**:
  ```json
  {
    "success": false,
    "message": "Phone number already exists"]
  }
  ```

#### Delete Artisan
Menghapus data artisan. Hanya bisa diakses oleh Admin.

- **URL**: `/artisans/:id`
- **Method**: `DELETE`
- **Headers**:
  - `Authorization`: `Bearer <admin_token>`
- **Response Success (200)**:
  ```json
  {
    "success": true,
    "message": "Artisan deleted successfully"
  }
  ```
- **Response Error (404)**:
  ```json
  {
    "success": false,
    "message": "Artisan not found"]
  }
  ```

### 5. Guides

#### Create Guide
Membuat data guide baru. Hanya bisa diakses oleh Admin.

- **URL**: `/guides`
- **Method**: `POST`
- **Headers**:
  - `Authorization`: `Bearer <admin_token>`
- **Body**:
  ```json
  {
    "guideName": "Guide One",
    "agency": "Travel Agency A",
    "commissionRate": 15,
    "contact": "081298765432"
  }
  ```
- **Response Success (201)**:
  ```json
  {
    "success": true,
    "data": {
      "guideName": "Guide One",
      "agency": "Travel Agency A",
      "commissionRate": 15,
      "contact": "081298765432",
      "_id": "60d0...",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "__v": 0
    }
  }
  ```
- **Response Error (400)**:
  ```json
  {
    "success": false,
    "message": "Please provide all required fields"
  }
  ```


#### Update Guide
Mengupdate data guide. Hanya bisa diakses oleh Admin.

- **URL**: `/guides/:id`
- **Method**: `PUT`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <admin_token>`
- **Body**:
  ```json
  {
    "guideName": "Budi Santoso Update",
    "agency": "Bali Tours Update",
    "commissionRate": 15,
    "contact": "081234567890"
  }
  ```
- **Response Success (200)**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "60d0fe4f5311236168a109ca",
      "guideName": "Budi Santoso Update",
      "agency": "Bali Tours Update",
      "commissionRate": 15,
      "contact": "081234567890",
      "createdAt": "2021-06-21T10:00:00.000Z",
      "__v": 0
    }
  }
  ```
- **Response Error (404)**:
  ```json
  {
    "success": false,
    "message": "Guide not found"
  }
  ```


#### Get All Guides
Mengambil semua data guide. Hanya bisa diakses oleh Admin.

- **URL**: `/guides`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer <admin_token>`
- **Response Success (200)**:
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "guideName": "Guide One",
        "agency": "Travel Agency A",
        "commissionRate": 15,
        "contact": "081298765432",
        "_id": "60d0...",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "__v": 0
      }
    ]
  }
  ```

#### Delete Guide
Menghapus data guide. Hanya bisa diakses oleh Admin.

- **URL**: `/guides/:id`
- **Method**: `DELETE`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <admin_token>`
- **Response Success (200)**:
  ```json
  {
    "success": true,
    "message": "Guide deleted successfully"
  }
  ```
- **Response Error (404)**:
  ```json
  {
    "success": false,
    "message": "Guide not found"
  }
  ```
