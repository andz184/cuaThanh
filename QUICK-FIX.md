# 🚀 Quick Fix cho Vercel Deployment

## Lỗi: Function Runtimes must have a valid version

### ✅ Giải pháp nhanh:

1. **Xóa file vercel.json:**
   ```bash
   rm vercel.json
   ```

2. **Deploy lại:**
   ```bash
   vercel
   ```

3. **Cấu hình Environment Variable:**
   - Vào Vercel Dashboard → Settings → Environment Variables
   - Thêm `GOOGLE_API_SERVICES` với JSON service account

### 🎯 Tại sao?
- Vercel tự động detect Node.js runtime từ `package.json`
- Không cần file `vercel.json` cho project đơn giản
- API functions sẽ tự động được detect từ thư mục `api/`

### 📁 Cấu trúc project tối thiểu:
```
├── index.html
├── api/
│   └── google-sheets.js
├── package.json (đơn giản: googleapis + Node.js 18.x)
└── README.md
```

### ✅ Sau khi sửa:
- Không còn lỗi runtime
- API endpoint hoạt động bình thường
- Google Sheets integration hoạt động
