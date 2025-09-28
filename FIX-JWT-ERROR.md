# 🔧 Sửa Lỗi "Invalid JWT Signature"

## Lỗi hiện tại:
```
{"success": false, "error": "invalid_grant: Invalid JWT Signature."}
```

## 🎯 Nguyên nhân:
1. **Service Account JSON không đúng format**
2. **Google Sheets chưa được chia sẻ với service account**
3. **Environment Variable chưa được set đúng**

## ✅ Cách sửa:

### Bước 1: Kiểm tra Service Account JSON
1. Vào [Google Cloud Console](https://console.cloud.google.com/)
2. IAM & Admin → Service Accounts
3. Tạo Service Account mới hoặc sử dụng cũ
4. Tạo Key → JSON
5. **Copy toàn bộ nội dung file JSON**

### Bước 2: Cấu hình Environment Variable trong Vercel
1. Vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project → Settings → Environment Variables
3. Thêm biến mới:
   - **Name**: `GOOGLE_API_SERVICES`
   - **Value**: Paste toàn bộ JSON (không cần dấu ngoặc kép)
   - **Environment**: Chọn tất cả (Production, Preview, Development)
4. Click "Save"

### Bước 3: Chia sẻ Google Sheets
1. Mở [Google Sheets](https://docs.google.com/spreadsheets/d/1SbK_vKUJV7dTzDPmxmlEM-7MXBoh6guGRKU4dWvAiw4)
2. Click "Share" (nút chia sẻ)
3. Thêm email: `sgiholding@ansha-462603.iam.gserviceaccount.com`
4. Cấp quyền "Editor"
5. Click "Send"

### Bước 4: Redeploy
```bash
vercel --prod
```

## 🔍 Kiểm tra Service Account JSON đúng format:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "your-service@project.iam.gserviceaccount.com",
  "client_id": "client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-service%40project.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
```

## 🚨 Lưu ý quan trọng:
- **Không được thay đổi format JSON**
- **Phải copy toàn bộ nội dung file**
- **Không được thêm dấu ngoặc kép bên ngoài**
- **Google Sheets phải được chia sẻ với service account**

## ✅ Sau khi sửa:
- API sẽ trả về `{"success": true}` thay vì lỗi JWT
- Có thể thêm xe mới vào Google Sheets
- Console sẽ hiển thị logs thành công
