# 🚀 QUICK START - Jurnal Visualizer

## Cara Menjalankan Website

### ✅ Method 1: Live Server (VS Code) - RECOMMENDED

1. Install extension **Live Server** di VS Code
2. Right-click file `index.html`
3. Pilih **"Open with Live Server"**
4. Browser akan otomatis terbuka di `http://localhost:5500`

---

### ✅ Method 2: Python HTTP Server

```powershell
# Buka PowerShell di folder ini
python -m http.server 8000
```

Lalu buka browser: **http://localhost:8000**

---

### ✅ Method 3: Node.js HTTP Server

```powershell
# Install http-server (sekali saja)
npm install -g http-server

# Run server
http-server
```

Lalu buka browser: **http://localhost:8080**

---

### ⚠️ Method 4: Double-Click (Tidak Disarankan)

Double-click `index.html` langsung akan buka di browser, TAPI beberapa fitur mungkin tidak berfungsi karena CORS policy.

**Gunakan local server (method 1-3) untuk pengalaman terbaik.**

---

## 📱 Cara Menggunakan Website

### 1. Dashboard (Homepage)

- ✅ Lihat 4 statistik cards di atas
- ✅ Gunakan **search bar** untuk cari jurnal
- ✅ Pilih **filter** (SINTA, Scopus, Bidang Ilmu)
- ✅ Klik **Export CSV** atau **Export JSON** untuk download
- ✅ Navigate dengan **pagination** di bawah
- ✅ Ubah **Per Halaman** untuk tampilkan lebih banyak

### 2. Analytics

- ✅ Lihat **5 interactive charts**:
  - Pie chart: Distribusi SINTA S5/S6
  - Pie chart: Status Scopus
  - Bar chart: Top 10 Bidang Ilmu
  - Bar chart: Top 10 Kota
  - Bar chart: Top 10 Penerbit
- ✅ Hover mouse di chart untuk detail

### 3. About

- ✅ Baca tentang fitur & teknologi yang digunakan

---

## 🌐 Deploy ke GitHub Pages

### Step 1: Upload ke GitHub

```powershell
# Di folder ini
git init
git add .
git commit -m "Initial commit - Jurnal Visualizer"

# Ganti dengan repo Anda
git remote add origin https://github.com/username/jurnal-visualizer.git
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Buka repository di GitHub
2. Klik **Settings**
3. Scroll ke **Pages** (sidebar kiri)
4. Source: **Deploy from a branch**
5. Branch: **main** → folder: **/root**
6. Klik **Save**

### Step 3: Akses Website

Tunggu 1-2 menit, lalu buka:

```
https://username.github.io/jurnal-visualizer/
```

✅ **Website Anda sudah LIVE dan GRATIS!**

---

## 💡 Tips

1. **Search**: Ketik kata kunci dan tunggu 0.5 detik (auto-search)
2. **Filter**: Combine beberapa filter untuk hasil spesifik
3. **Export**: Hanya download data yang terfilter
4. **Mobile**: Website responsive, bisa dibuka di HP
5. **Offline**: Setelah load pertama, data ter-cache di browser

---

## 🔧 Troubleshooting

### Data tidak muncul?

- ✅ Pastikan menggunakan **local server** (method 1-3)
- ✅ Cek file `data/db_jurnal.csv` ada
- ✅ Buka **Console** (F12) untuk lihat error

### Chart tidak render?

- ✅ Pastikan internet aktif (Chart.js dari CDN)
- ✅ Clear browser cache

### Export tidak jalan?

- ✅ Pastikan browser allow downloads
- ✅ Cek popup blocker

---

## 📂 File Structure

```
jurnal-visualizer/
├── index.html           ← Homepage
├── analytics.html       ← Analytics
├── about.html          ← About
├── js/
│   ├── app.js         ← Main logic
│   └── analytics.js   ← Charts logic
├── data/
│   └── db_jurnal.csv  ← Database
└── README.md          ← Full docs
```

---

## 🎯 Next Steps

1. ✅ Run local server
2. ✅ Test semua fitur
3. ✅ Customize colors (optional)
4. ✅ Deploy ke GitHub Pages
5. ✅ Share link dengan teman!

---

**Happy Exploring! 🎉**

Baca dokumentasi lengkap di **README.md**
