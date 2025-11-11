# 🚀 Deploy ke GitHub Pages - Panduan Lengkap

## ⚠️ Error yang Anda Alami:

```
Error: Get Pages site failed. Please verify that the repository has Pages enabled
```

**Penyebab**: GitHub Pages belum di-enable di repository settings.

---

## ✅ Solusi: Enable GitHub Pages (2 Cara)

### 🎯 CARA 1: Setup Manual via GitHub Website (RECOMMENDED)

#### Step 1: Buka Repository Settings

1. Buka browser → https://github.com/AdenSahwaludin/bivisualizer
2. Click tab **"Settings"** (pojok kanan atas)
3. Scroll down di sidebar kiri, cari **"Pages"**
4. Click **"Pages"**

#### Step 2: Enable GitHub Pages

Di halaman Pages settings:

1. **Source**: Pilih **"GitHub Actions"** (BUKAN "Deploy from a branch")
   
   ```
   Source: [GitHub Actions ▼]  ← PILIH INI
   ```

2. Save (otomatis tersimpan)

#### Step 3: Push Workflow File

Workflow file sudah dibuat di `.github/workflows/static.yml`

```bash
cd "d:\Sinta Jurnal Scrappping\jurnal-visualizer"

# Add workflow file
git add .github/workflows/static.yml

# Commit
git commit -m "ci: Add GitHub Pages deployment workflow"

# Push
git push origin main
```

#### Step 4: Tunggu Deployment

1. Buka https://github.com/AdenSahwaludin/bivisualizer/actions
2. Lihat workflow "Deploy static content to Pages" berjalan
3. Tunggu ~1-2 menit hingga ✅ hijau
4. Website live di: **https://adensahwaludin.github.io/bivisualizer/**

---

### 🎯 CARA 2: Setup via GitHub CLI (Alternative)

Jika punya GitHub CLI installed:

```bash
# Install GitHub CLI dulu (skip jika sudah punya)
winget install GitHub.cli

# Enable Pages via CLI
gh api repos/AdenSahwaludin/bivisualizer/pages -X POST -f source[path]=/ -f source[branch]=main

# Push workflow
git add .github/workflows/static.yml
git commit -m "ci: Add GitHub Pages deployment workflow"
git push origin main
```

---

## 📋 Checklist Deployment:

### ☑️ Pre-Deployment:
- [x] Repository: `bivisualizer` (sudah ada)
- [x] Branch: `main` (sudah ada)
- [x] Website files: `index.html`, `analytics.html`, `about.html` (✅)
- [x] Data file: `data/db_jurnal.json` (✅)
- [x] JavaScript files: `js/app.js`, `js/analytics.js` (✅)
- [x] Workflow file: `.github/workflows/static.yml` (✅ BARU DIBUAT)

### ☑️ GitHub Settings:
- [ ] **MUST DO**: Enable Pages di Settings → Pages
- [ ] **Source**: Set to "GitHub Actions"
- [ ] Push workflow file

### ☑️ Post-Deployment:
- [ ] Check Actions tab (workflow running)
- [ ] Wait for green checkmark ✅
- [ ] Visit: https://adensahwaludin.github.io/bivisualizer/
- [ ] Test website fully functional

---

## 🔧 Troubleshooting:

### Issue 1: "Pages not enabled"
**Solution**:
1. Go to Settings → Pages
2. Select "GitHub Actions" as source
3. Save & push workflow file

### Issue 2: Workflow tidak berjalan
**Solution**:
1. Check file location: `.github/workflows/static.yml` (harus tepat)
2. Verify file ada di repository (git push)
3. Check Actions tab → Workflow harus muncul

### Issue 3: Deployment gagal (red X)
**Solution**:
1. Click workflow → View logs
2. Check error message
3. Common fix: Re-enable Pages di Settings

### Issue 4: 404 Not Found setelah deploy
**Solution**:
1. Tunggu 5 menit (propagation)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Try incognito mode

### Issue 5: Data tidak muncul
**Solution**:
- Check `data/db_jurnal.json` ada di repository
- Verify file path di JavaScript benar: `data/db_jurnal.json`
- Check browser console (F12) untuk errors

---

## 📝 Step-by-Step Commands:

Jalankan commands ini satu per satu:

```powershell
# 1. Masuk ke folder project
cd "d:\Sinta Jurnal Scrappping\jurnal-visualizer"

# 2. Check status
git status

# 3. Add workflow file
git add .github/workflows/static.yml

# 4. Add migration files (optional)
git add CHANGELOG.md MIGRATION_COMPLETE.md CLEANUP_OPTIONAL.md

# 5. Commit
git commit -m "ci: Add GitHub Pages deployment workflow

- Add static.yml for GitHub Actions deployment
- Remove Python dependency from deployment
- Pure static site, no build process needed"

# 6. Push
git push origin main

# 7. Open GitHub Actions (di browser)
start https://github.com/AdenSahwaludin/bivisualizer/actions
```

---

## 🌐 Expected Result:

Setelah workflow selesai:

✅ **Website URL**: https://adensahwaludin.github.io/bivisualizer/

✅ **Features Working**:
- Dashboard dengan 310 jurnal
- Search & filter
- Pagination
- Export CSV/JSON
- Analytics charts
- Mobile responsive

---

## 📊 Workflow Details:

File `.github/workflows/static.yml` berisi:

```yaml
name: Deploy static content to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Pages
        uses: actions/configure-pages@v5
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
          
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

**Penjelasan**:
- ✅ **No Python** - Pure static deployment
- ✅ **No Build** - Langsung upload semua file
- ✅ **Auto Deploy** - Setiap push ke main
- ✅ **Fast** - Deploy < 2 menit

---

## 🎯 Quick Reference:

| Action | Command/URL |
|--------|-------------|
| **Enable Pages** | Settings → Pages → GitHub Actions |
| **Push Workflow** | `git add .github && git commit && git push` |
| **Check Status** | https://github.com/AdenSahwaludin/bivisualizer/actions |
| **Live Site** | https://adensahwaludin.github.io/bivisualizer/ |
| **Force Redeploy** | Actions tab → Re-run workflow |

---

## ⚡ What's Different from Python Deployment?

| Aspect | Python (Old) | GitHub Actions (New) |
|--------|--------------|----------------------|
| **Server** | Flask backend | No server (static) |
| **Hosting** | Requires Python runtime | GitHub Pages (free) |
| **Deployment** | Manual via Heroku/etc | Auto via GitHub Actions |
| **Build** | `pip install` needed | No build needed |
| **Speed** | Slow (backend startup) | Fast (static files) |
| **Cost** | Paid hosting | FREE |

---

## 🎉 Summary:

### Yang Perlu Anda Lakukan:

1. **Buka GitHub** → Settings → Pages
2. **Set Source** → GitHub Actions
3. **Run Commands**:
   ```bash
   cd "d:\Sinta Jurnal Scrappping\jurnal-visualizer"
   git add .github/workflows/static.yml
   git commit -m "ci: Add GitHub Pages deployment"
   git push origin main
   ```
4. **Tunggu 2 menit**
5. **Visit**: https://adensahwaludin.github.io/bivisualizer/

---

## 📞 Need Help?

Jika ada error:
1. Screenshot error message
2. Check Actions tab → Click failed workflow → View logs
3. Verify Settings → Pages → Source = "GitHub Actions"

---

**🚀 Website Akan Live di GitHub Pages (Gratis, Cepat, No Python)!**
