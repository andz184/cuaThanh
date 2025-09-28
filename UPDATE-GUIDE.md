# 🔄 Hướng Dẫn Cập Nhật API

## ✅ Đã Cập Nhật Thành Công!

File `google-sheets.js` đã được cập nhật với cấu trúc API mới. File `index.html` đã được điều chỉnh để tương thích.

## 🔧 Thay Đổi Chính

### 1. **Biến Môi Trường Mới**
- **Cũ:** `GOOGLE_API_SERVICES`
- **Mới:** `GOOGLE_SERVICE_ACCOUNT_JSON`

### 2. **Cấu Trúc API Mới**
- **Action:** `update` (thay vì `append`)
- **Data Format:** Object (thay vì Array)
- **Delete:** Sử dụng ID (thay vì rowIndex)

### 3. **Các Hàm Đã Cập Nhật**
- ✅ `saveToGoogleSheets()` - Chuyển sang action 'update'
- ✅ `saveVehicleToSheet()` - Chuyển đổi array thành object
- ✅ `saveAssignmentToSheet()` - Chuyển đổi array thành object
- ✅ `updateAssignmentInSheet()` - Chuyển đổi array thành object
- ✅ `deleteFromGoogleSheets()` - Sử dụng ID thay vì rowIndex
- ✅ `readFromGoogleSheets()` - Sử dụng Google Sheets API trực tiếp

## 🚀 Bước Tiếp Theo

### 1. **Cập Nhật Vercel Environment Variable**
```bash
# Vào Vercel Dashboard
# Settings → Environment Variables
# Xóa: GOOGLE_API_SERVICES
# Thêm: GOOGLE_SERVICE_ACCOUNT_JSON
# Value: Toàn bộ nội dung file JSON service account
```

### 2. **Redeploy Project**
```bash
vercel --prod
```

### 3. **Kiểm Tra Hoạt Động**
- Mở ứng dụng
- Thử thêm xe mới
- Kiểm tra console để xem log
- Xác nhận dữ liệu được lưu vào Google Sheets

## 🔍 Cấu Trúc Dữ Liệu Mới

### Vehicle Object
```javascript
{
  ID: "V001",
  NgayXuat: "2024-01-01",
  TrangThai: "Đang vận chuyển",
  GhiChu: "Ghi chú xe",
  NgayDuKien: "2024-01-02",
  TenNhaCungCap: "Nhà cung cấp",
  TrangThaiThanhToan: "Đã thanh toán",
  BienKiemSoat: "ABC-123",
  LaiXe: "Nguyễn Văn A",
  SBTLaiXe: "SBT123",
  GhiChuXe: "Ghi chú chi tiết"
}
```

### Assignment Object
```javascript
{
  ID: "A001",
  Bill_ID: "B001",
  Vehicle_ID: "V001",
  Order: "Order123",
  Quantity: 10,
  Weight: 100.5,
  COD: 500000,
  Status: "Active",
  Created_Date: "2024-01-01",
  Notes: "Ghi chú assignment"
}
```

## ⚠️ Lưu Ý Quan Trọng

1. **Environment Variable:** Đảm bảo sử dụng `GOOGLE_SERVICE_ACCOUNT_JSON`
2. **Google Sheets Sharing:** Chia sẻ với service account email
3. **Redeploy:** Bắt buộc phải redeploy sau khi thay đổi environment variable
4. **Testing:** Kiểm tra kỹ các chức năng thêm/sửa/xóa

## 🎯 Kết Quả Mong Đợi

- ✅ Không còn lỗi JWT Signature
- ✅ Dữ liệu được lưu chính xác vào Google Sheets
- ✅ Các chức năng CRUD hoạt động ổn định
- ✅ Tương thích với Vercel deployment

---

**📞 Hỗ Trợ:** Nếu gặp vấn đề, kiểm tra console log và Vercel function logs để debug.
