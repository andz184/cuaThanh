# ✅ Checklist Kiểm Tra Lỗi Google Sheets

## 🔍 Kiểm tra từng bước:

### 1. ✅ SHEET_CONFIG đã đúng
- Sheet ID: `1SbK_vKUJV7dTzDPmxmlEM-7MXBoh6guGRKU4dWvAiw4` ✅
- Sheet Name: "Xe" ✅
- Đã được định nghĩa trong code ✅

### 2. ❓ Environment Variable trong Vercel
- [ ] Vào Vercel Dashboard
- [ ] Settings → Environment Variables  
- [ ] Kiểm tra có biến `GOOGLE_API_SERVICES` không
- [ ] Value phải là JSON service account đầy đủ

### 3. ❓ Google Sheets đã được chia sẻ
- [ ] Mở Google Sheets: https://docs.google.com/spreadsheets/d/1SbK_vKUJV7dTzDPmxmlEM-7MXBoh6guGRKU4dWvAiw4
- [ ] Click "Share" (nút chia sẻ)
- [ ] Thêm email: `sgiholding@ansha-462603.iam.gserviceaccount.com`
- [ ] Cấp quyền "Editor"
- [ ] Click "Send"

### 4. ❓ Test API
- [ ] Deploy project lên Vercel
- [ ] Truy cập: `https://your-vercel-url.vercel.app/test-api.html`
- [ ] Click "Test API"
- [ ] Xem kết quả

### 5. ❓ Kiểm tra Console Logs
- [ ] Mở Developer Tools (F12)
- [ ] Vào tab Console
- [ ] Thử thêm xe mới
- [ ] Xem logs:
  - `SHEET_CONFIG` có hiển thị không
  - `sheetId` có giá trị không
  - Request body có đầy đủ không

## 🎯 Nguyên nhân có thể:

1. **Environment Variable chưa được set** (90% khả năng)
2. **Google Sheets chưa được chia sẻ** với service account
3. **Service account JSON không đúng format**

## 🚀 Cách sửa nhanh:

1. **Set Environment Variable:**
   ```
   Name: GOOGLE_API_SERVICES
   Value: [Paste toàn bộ JSON service account]
   ```

2. **Chia sẻ Google Sheets:**
   - Email: `sgiholding@ansha-462603.iam.gserviceaccount.com`
   - Quyền: Editor

3. **Redeploy:**
   ```bash
   vercel --prod
   ```
