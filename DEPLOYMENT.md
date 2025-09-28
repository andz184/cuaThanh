# 🚀 Hướng Dẫn Deploy Lên Vercel

## Bước 1: Chuẩn bị Service Account

### 1.1 Tạo Service Account
1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Enable Google Sheets API:
   - Vào "APIs & Services" → "Library"
   - Tìm "Google Sheets API" → Enable

### 1.2 Tạo Service Account
1. Vào "IAM & Admin" → "Service Accounts"
2. Click "Create Service Account"
3. Điền thông tin:
   - Name: `eco-transport-service`
   - Description: `Service account for ECO Transport Management`
4. Click "Create and Continue"
5. Skip role assignment (click "Continue")
6. Click "Done"

### 1.3 Tạo Key cho Service Account
1. Click vào service account vừa tạo
2. Vào tab "Keys"
3. Click "Add Key" → "Create new key"
4. Chọn "JSON" → "Create"
5. File JSON sẽ được tải xuống

## Bước 2: Deploy lên Vercel

### 2.1 Cài đặt Vercel CLI
```bash
npm install -g vercel
```

### 2.2 Login vào Vercel
```bash
vercel login
```

### 2.3 Deploy project
```bash
vercel
```

### 2.4 Cấu hình Environment Variable
1. Vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project vừa deploy
3. Vào "Settings" → "Environment Variables"
4. Thêm biến mới:
   - **Name**: `GOOGLE_API_SERVICES`
   - **Value**: Paste toàn bộ nội dung file JSON service account
   - **Environment**: Production, Preview, Development (chọn tất cả)

## Bước 3: Cấu hình Google Sheets

### 3.1 Chia sẻ Google Sheets
1. Mở Google Sheets của bạn
2. Click "Share" (nút chia sẻ)
3. Thêm email service account: `sgiholding@ansha-462603.iam.gserviceaccount.com`
4. Cấp quyền "Editor"
5. Click "Send"

### 3.2 Cập nhật Sheet ID (nếu cần)
1. Mở file `index.html`
2. Tìm `SHEET_CONFIG`
3. Cập nhật `SHEET_ID` với ID thực của Google Sheets

## Bước 4: Test Deployment

### 4.1 Kiểm tra cơ bản
1. Truy cập URL Vercel của bạn
2. Vào tab "Quản Lý Xe"
3. Thử thêm xe mới
4. Kiểm tra dữ liệu trong Google Sheets

### 4.2 Kiểm tra API
1. Mở Developer Tools (F12)
2. Vào tab "Network"
3. Thực hiện thao tác thêm xe
4. Kiểm tra request đến `/api/google-sheets`

## Bước 5: Troubleshooting

### Lỗi 401 Unauthorized
- Kiểm tra service account có quyền truy cập Google Sheets
- Đảm bảo Google Sheets đã được chia sẻ với service account

### Lỗi 403 Forbidden
- Kiểm tra Google Sheets API đã được enable
- Kiểm tra service account có đúng quyền

### Lỗi Environment Variable
- Kiểm tra `GOOGLE_API_SERVICES` đã được set trong Vercel
- Đảm bảo JSON format đúng

### Lỗi CORS
- Kiểm tra API endpoint có CORS headers
- Kiểm tra request URL đúng

## Bước 6: Production Checklist

- [ ] Service account đã được tạo và có key JSON
- [ ] Google Sheets API đã được enable
- [ ] Google Sheets đã được chia sẻ với service account
- [ ] Environment variable `GOOGLE_API_SERVICES` đã được set
- [ ] Project đã được deploy lên Vercel
- [ ] Test thêm xe mới thành công
- [ ] Test xếp bill cho xe thành công
- [ ] Test sửa/xóa dữ liệu thành công

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra Console logs trong browser
2. Kiểm tra Vercel function logs
3. Kiểm tra Google Cloud Console logs
4. Đảm bảo tất cả bước cấu hình đã được thực hiện đúng
