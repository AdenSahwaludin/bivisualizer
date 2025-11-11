# Script untuk Clean Up (Optional)

## Jika mau hapus file CSV setelah yakin JSON bekerja dengan baik:

### Windows PowerShell:

```powershell
# Hapus file CSV (backup dulu jika perlu)
cd "d:\Sinta Jurnal Scrappping\jurnal-visualizer"
Remove-Item data\db_jurnal.csv

# Verify hanya JSON yang tersisa
Get-ChildItem data\
```

### Linux/Mac:

```bash
cd /path/to/jurnal-visualizer
rm data/db_jurnal.csv

# Verify
ls -la data/
```

## ⚠️ PERHATIAN:

- CSV adalah backup asli
- JSON di-generate dari CSV
- Jika hapus CSV, tidak bisa regenerate kecuali scraping ulang
- **Recommendation**: Keep CSV for at least 1-2 weeks

## ✅ Kapan Aman Hapus CSV?

1. Sudah test website minimal 1 minggu
2. Semua fitur berjalan normal
3. JSON data verified correct (310 records)
4. Sudah deploy ke production (GitHub Pages)
5. User feedback positive

## 🔄 Jika Perlu Convert Ulang CSV → JSON:

```python
import pandas as pd

# Read CSV
df = pd.read_csv('data/db_jurnal.csv')

# Save as JSON
df.to_json('data/db_jurnal.json', orient='records', indent=2, force_ascii=False)

print(f"Converted {len(df)} records")
```

## 📦 Space Savings:

```
Before (both files):
- db_jurnal.csv:  ~120 KB
- db_jurnal.json: ~145 KB
Total: ~265 KB

After (JSON only):
- db_jurnal.json: ~145 KB
Total: ~145 KB

Savings: ~120 KB (45% less)
```

---

**Note**: This is OPTIONAL. CSV dapat tetap disimpan sebagai backup.
