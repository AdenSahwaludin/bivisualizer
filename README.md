# 📚 Jurnal Visualizer - Pure Static Website

**Platform visualisasi database jurnal ilmiah Indonesia dengan akreditasi SINTA S5 dan S6**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?logo=github&logoColor=white)

🌐 **Live Demo**: [Your GitHub Pages URL]

---

## ✨ Fitur Utama

- 🔍 **Pencarian Advanced** - Real-time search dengan debounce
- 🎯 **Filter Dinamis** - Filter by SINTA, Scopus, bidang ilmu
- 📊 **Visualisasi Interaktif** - Chart.js untuk analytics
- 💾 **Export Data** - Download CSV atau JSON
- 📱 **Responsive Design** - Mobile-friendly
- ⚡ **Static Site** - No backend, pure HTML/CSS/JS
- 🚀 **GitHub Pages Ready** - Deploy gratis

---

## 🚀 Quick Start

### Method 1: Live Server (VS Code)

1. Install extension **Live Server** di VS Code
2. Right-click `index.html`
3. Pilih **Open with Live Server**
4. Browser akan otomatis buka

### Method 2: Python HTTP Server

```bash
# Python 3
python -m http.server 8000

# Buka browser: http://localhost:8000
```

### Method 3: Node.js HTTP Server

```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server

# Buka browser: http://localhost:8080
```

### Method 4: Direct Open

Double-click `index.html` (some features may not work due to CORS)

---

## 📁 Struktur Proyek

```
jurnal-visualizer/
│
├── index.html              # Homepage + Dashboard
├── analytics.html          # Analytics + Charts
├── about.html              # About page
│
├── js/
│   ├── app.js             # Main application logic
│   └── analytics.js       # Analytics page logic
│
├── data/
│   └── db_jurnal.json     # Database (310 jurnal) - JSON format
│
├── README.md              # Documentation
└── .gitignore            # Git ignore rules
```

---

## 🌐 Deploy ke GitHub Pages

### Step 1: Create Repository

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/jurnal-visualizer.git
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to repository **Settings**
2. Scroll to **Pages**
3. Source: **Deploy from branch**
4. Branch: **main** → `/root`
5. Click **Save**

### Step 3: Access Website

Your site will be live at:

```
https://username.github.io/jurnal-visualizer/
```

---

## 📊 Database Info

| Info              | Detail                  |
| ----------------- | ----------------------- |
| **Total Records** | 310 jurnal              |
| **Sumber**        | SINTA (halaman 224-256) |
| **Akreditasi**    | S5 dan S6               |
| **Fields**        | 13 kolom lengkap        |
| **Format**        | UTF-8 CSV               |
| **Size**          | ~100 KB                 |

### Fields:

- No.
- Nama Jurnal
- Singkatan Nama Jurnal
- Link Jurnal
- ISSN
- E ISSN
- Bidang
- Bidang Ilmu
- Sinta
- Masa aktif Sinta
- Scopus
- Masa aktif Scopus
- Penerbit
- Kota Terbit

---

## 🛠️ Technology Stack

### Core

- **HTML5** - Semantic markup
- **CSS3** - Modern styling
- **JavaScript (ES6+)** - Client-side logic

### Libraries (CDN)

- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Interactive charts
- **PapaParse** - CSV parsing
- **Font Awesome** - Icons

### Advantages

✅ No build process required  
✅ No Node.js dependencies  
✅ No backend server needed  
✅ No database required  
✅ Fast loading time  
✅ SEO-friendly  
✅ Easy to deploy

---

## 💡 How It Works

### 1. Data Loading

```javascript
// Load JSON data
const response = await fetch("data/db_jurnal.json");
const data = await response.json();
```

### 2. Filtering

```javascript
// Client-side filtering (no API calls)
filteredJournals = allJournals.filter((journal) => {
  // Apply search & filter logic
});
```

### 3. Rendering

```javascript
// Dynamic HTML generation
journals.forEach((journal) => {
  html += createJournalCard(journal);
});
```

---

## 🎨 Customization

### Change Colors

Edit CSS variables in HTML `<style>` section:

```css
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Change to your colors */
}
```

### Add More Filters

1. Add select element in `index.html`
2. Add filter logic in `js/app.js` → `applyFilters()`
3. Test filtering

### Modify Charts

Edit `js/analytics.js`:

```javascript
// Change chart type, colors, or data
new Chart(ctx, {
    type: 'bar', // or 'line', 'pie', etc.
    data: {...},
    options: {...}
});
```

---

## 📱 Browser Support

| Browser | Minimum Version |
| ------- | --------------- |
| Chrome  | 90+             |
| Firefox | 88+             |
| Safari  | 14+             |
| Edge    | 90+             |
| Opera   | 76+             |

---

## 🔧 Configuration

### Change Per Page Default

Edit `js/app.js`:

```javascript
let perPage = 50; // Change from 20 to 50
```

### Modify Search Debounce

```javascript
setTimeout(() => {
  applyFilters();
}, 300); // Change from 500ms to 300ms
```

---

## 🚀 Performance

| Metric          | Value   |
| --------------- | ------- |
| Initial Load    | < 2s    |
| JSON Parse      | < 100ms |
| Filter Response | < 100ms |
| Chart Render    | < 300ms |
| Export          | < 200ms |

---

## 📦 No Installation Required

This is a **static website** that runs entirely in the browser:

✅ No `npm install`  
✅ No `pip install`  
✅ No build process  
✅ No backend server  
✅ No database setup

Just open `index.html` in a browser (via local server)!

---

## 🌍 Alternative Hosting

### Netlify

1. Drag & drop folder to [Netlify Drop](https://app.netlify.com/drop)
2. Done! Instant HTTPS URL

### Vercel

```bash
npm i -g vercel
vercel
```

### Firebase Hosting

```bash
firebase init hosting
firebase deploy
```

---

## 📝 License

MIT License - Free to use and modify

---

## 🙏 Credits

- **Data Source**: SINTA (Kemdikbudristek)
- **CSS Framework**: Tailwind CSS
- **Charts**: Chart.js
- **Data Format**: JSON
- **Icons**: Font Awesome

---

## 🐛 Known Limitations

1. ❌ No server-side search (client-side only)
2. ❌ Large datasets (>10k records) may be slow
3. ❌ Excel export requires additional library
4. ❌ No authentication/authorization
5. ❌ No real-time data updates

---

## 🚧 Future Enhancements

- [ ] Add more chart types
- [ ] Implement advanced search operators
- [ ] Add print functionality
- [ ] Dark mode support
- [ ] PWA (offline support)
- [ ] Multi-language support

---

## 📞 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/username/jurnal-visualizer/issues)
- 📧 **Email**: your-email@example.com
- 📖 **Docs**: This README

---

## ⭐ Star This Project

If you find this useful, please star the repository!

**Made with ❤️ for Indonesian Researchers**
