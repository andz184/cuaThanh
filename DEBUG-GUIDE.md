# 🔍 Hướng Dẫn Debug Lỗi Google Sheets

## Lỗi hiện tại:
```
Missing required parameters: spreadsheetId
```

## 🔧 Các bước debug:

### Bước 1: Kiểm tra Console Logs
1. Mở Developer Tools (F12)
2. Vào tab Console
3. Thử thêm xe mới
4. Xem logs để kiểm tra:
   - `SHEET_CONFIG` có được định nghĩa đúng không
   - `sheetId` có được truyền đúng không
   - Request body có đầy đủ thông tin không

### Bước 2: Kiểm tra Network Tab
1. Vào tab Network
2. Thử thêm xe mới
3. Xem request đến `/api/google-sheets`
4. Kiểm tra:
   - Request payload có đúng không
   - Response có lỗi gì không

### Bước 3: Test API trực tiếp
1. Truy cập: `https://your-vercel-url.vercel.app/test-api.html`
2. Click "Test API"
3. Xem kết quả

### Bước 4: Kiểm tra Environment Variable
1. Vào Vercel Dashboard
2. Settings → Environment Variables
3. Kiểm tra `GOOGLE_API_SERVICES` có được set đúng không

## 🎯 Các nguyên nhân có thể:

1. **SHEET_CONFIG không được định nghĩa**
   - Kiểm tra console log `SHEET_CONFIG`
   - Đảm bảo có đầy đủ `VEHICLE_SHEET_ID`

2. **Environment Variable chưa được set**
   - Kiểm tra Vercel Dashboard
   - Redeploy sau khi thêm env var

3. **Google Sheets chưa được chia sẻ**
   - Chia sẻ với: `sgiholding@ansha-462603.iam.gserviceaccount.com`
   - Cấp quyền "Editor"

4. **API endpoint có lỗi**
   - Kiểm tra Vercel function logs
   - Test với file `test-api.html`

## ✅ Sau khi debug:
- Xóa file `test-api.html` và `DEBUG-GUIDE.md`
- Xóa debug logs trong code
