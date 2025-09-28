# 🔧 Fix Lỗi Vercel: "Environment Variable references Secret"

## Lỗi gặp phải:
```
Environment Variable "GOOGLE_API_SERVICES" references Secret "google_api_services", which does not exist.
```

## ✅ Cách sửa:

### Bước 1: Xóa file vercel.json (nếu có)
```bash
rm vercel.json
```

### Bước 2: Deploy lại
```bash
vercel
```

### Bước 3: Cấu hình Environment Variable trong Vercel Dashboard
1. Vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project của bạn
3. Vào "Settings" → "Environment Variables"
4. Click "Add New" → "Environment Variable"
5. Điền:
   - **Name**: `GOOGLE_API_SERVICES`
   - **Value**: Paste toàn bộ nội dung file JSON service account
   - **Environment**: Chọn tất cả (Production, Preview, Development)
6. Click "Save"

### Bước 4: Redeploy
1. Vào "Deployments" tab
2. Click "Redeploy" trên deployment mới nhất
3. Hoặc chạy: `vercel --prod`

## 🎯 Nguyên nhân:
- File `vercel.json` có cấu hình `"env": {"GOOGLE_API_SERVICES": "@google_api_services"}` 
- Vercel tìm kiếm secret tên "google_api_services" nhưng không tìm thấy
- Cần xóa cấu hình này và dùng Environment Variables thông thường

## ✅ Sau khi sửa:
- Environment variable sẽ hoạt động bình thường
- API endpoint `/api/google-sheets` sẽ có thể truy cập được
- Google Sheets integration sẽ hoạt động
