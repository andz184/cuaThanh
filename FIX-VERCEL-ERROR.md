# 🔧 Fix Lỗi Vercel

## Lỗi 1: Environment Variable references Secret
```
Environment Variable "GOOGLE_API_SERVICES" references Secret "google_api_services", which does not exist.
```

## Lỗi 2: Function Runtimes must have a valid version
```
Error: Function Runtimes must have a valid version, for example `now-php@1.0.0`.
```

## Lỗi 3: No Output Directory found
```
Error: No Output Directory named "public" found after the Build completed.
```

## Lỗi 4: Node.js version warning
```
Warning: Detected "engines": { "node": ">=18.0.0" } in your `package.json`
```

## ✅ Cách sửa:

### Bước 1: Sửa package.json
```json
{
  "engines": {
    "node": "18.x"
  }
}
```

### Bước 2: Tạo file vercel.json
```json
{
  "buildCommand": "echo 'No build step required'",
  "outputDirectory": ".",
  "functions": {
    "api/**/*.js": {
      "runtime": "nodejs18.x"
    }
  }
}
```

### Bước 3: Deploy lại
```bash
vercel
```

### Bước 4: Cấu hình Environment Variable trong Vercel Dashboard
1. Vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project của bạn
3. Vào "Settings" → "Environment Variables"
4. Click "Add New" → "Environment Variable"
5. Điền:
   - **Name**: `GOOGLE_API_SERVICES`
   - **Value**: Paste toàn bộ nội dung file JSON service account
   - **Environment**: Chọn tất cả (Production, Preview, Development)
6. Click "Save"

### Bước 5: Redeploy
1. Vào "Deployments" tab
2. Click "Redeploy" trên deployment mới nhất
3. Hoặc chạy: `vercel --prod`

## 🎯 Nguyên nhân:
- **Node.js version**: `>=18.0.0` gây warning, cần dùng `18.x`
- **Output Directory**: Vercel tìm thư mục "public" nhưng không có
- **Runtime**: Cần cấu hình đúng format cho API functions

## ✅ Sau khi sửa:
- Environment variable sẽ hoạt động bình thường
- API endpoint `/api/google-sheets` sẽ có thể truy cập được
- Google Sheets integration sẽ hoạt động
