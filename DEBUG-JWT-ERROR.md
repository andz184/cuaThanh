# 🔍 Debug JWT Signature Error

## ❌ Lỗi Hiện Tại
```
{"ok":false,"error":"Error: invalid_grant: Invalid JWT Signature."}
```

## 🔧 Các Bước Kiểm Tra

### 1. **Kiểm Tra Environment Variable trong Vercel**

1. Vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project `cua-thanh-vsy6`
3. Vào **Settings** → **Environment Variables**
4. Kiểm tra có biến nào sau đây:
   - `GOOGLE_SERVICE_ACCOUNT_JSON` ✅ (Mới)
   - `GOOGLE_API_SERVICES` ❌ (Cũ)

### 2. **Cập Nhật Environment Variable**

**Nếu có `GOOGLE_API_SERVICES`:**
- Xóa biến `GOOGLE_API_SERVICES`
- Thêm biến mới: `GOOGLE_SERVICE_ACCOUNT_JSON`
- Copy toàn bộ nội dung file JSON service account

**Nếu chưa có biến nào:**
- Thêm biến: `GOOGLE_SERVICE_ACCOUNT_JSON`
- Value: Toàn bộ nội dung file `ansha-462603-21b679e96ff4.json`

### 3. **Kiểm Tra Format JSON**

JSON phải có cấu trúc như sau:
```json
{
  "type": "service_account",
  "project_id": "ansha-462603",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "sgiholding@ansha-462603.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/sgiholding%40ansha-462603.iam.gserviceaccount.com"
}
```

### 4. **Kiểm Tra Google Sheets Sharing**

1. Mở [Google Sheets](https://docs.google.com/spreadsheets/d/1SbK_vKUJV7dTzDPmxmlEM-7MXBoh6guGRKU4dWvAiw4)
2. Click **Share** (Chia sẻ)
3. Thêm email: `sgiholding@ansha-462603.iam.gserviceaccount.com`
4. Cấp quyền **Editor**
5. Click **Send**

### 5. **Redeploy Project**

```bash
# Trong terminal
vercel --prod
```

Hoặc trong Vercel Dashboard:
- Vào **Deployments**
- Click **Redeploy** trên deployment mới nhất

### 6. **Kiểm Tra Logs**

1. Vào Vercel Dashboard
2. Chọn project
3. Vào **Functions** tab
4. Click vào function `google-sheets`
5. Xem **Logs** để kiểm tra:
   - "Service account parsed successfully"
   - "JWT authentication successful" hoặc "GoogleAuth authentication successful"

## 🚨 Các Lỗi Thường Gặp

### Lỗi 1: "Missing environment variable"
- **Nguyên nhân:** Chưa set biến môi trường
- **Giải pháp:** Thêm `GOOGLE_SERVICE_ACCOUNT_JSON`

### Lỗi 2: "Invalid JSON format"
- **Nguyên nhân:** JSON bị lỗi format
- **Giải pháp:** Copy lại toàn bộ file JSON, không thêm dấu ngoặc kép

### Lỗi 3: "Invalid JWT Signature"
- **Nguyên nhân:** Service account không đúng hoặc chưa được chia sẻ
- **Giải pháp:** Kiểm tra lại JSON và chia sẻ Google Sheets

### Lỗi 4: "Permission denied"
- **Nguyên nhân:** Google Sheets chưa được chia sẻ
- **Giải pháp:** Chia sẻ với email service account

## ✅ Kiểm Tra Thành Công

Khi thành công, bạn sẽ thấy trong logs:
```
Service account parsed successfully: {
  type: 'service_account',
  project_id: 'ansha-462603',
  client_email: 'sgiholding@ansha-462603.iam.gserviceaccount.com'
}
JWT authentication successful
```

## 🔄 Test API

Sau khi cập nhật, test bằng cách:
1. Mở ứng dụng
2. Thử thêm xe mới
3. Kiểm tra console không có lỗi
4. Kiểm tra dữ liệu xuất hiện trong Google Sheets

---

**📞 Nếu vẫn lỗi:** Gửi screenshot Vercel logs để debug tiếp.
