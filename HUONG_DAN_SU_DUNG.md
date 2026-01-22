# 📋 Hướng dẫn sử dụng Hệ thống Quản lý Nhân sự (QLHS)

## 🎯 Tổng quan hệ thống

Hệ thống QLHS là một ứng dụng quản lý toàn diện bao gồm:
- **Quản lý nhân viên** (Employee Management)
- **Quản lý lương** (Payroll Management) - **Tự động tính từ giờ làm thực tế**
- **Chấm công & Tracking giờ làm** (Attendance & Hours Tracking)
- **Dashboard thống kê** (Statistics Dashboard)

---

## 🔄 Luồng dữ liệu chính

```
Chấm công (Attendance)
    ↓ [Auto] Tính giờ làm từ check-in/out
    ↓
Bảng lương (Payroll)
    ↓ [Auto] Tính lương = giờ làm × giá giờ
    ↓
Dashboard (Home)
    ↓ Hiển thị thống kê tổng hợp
```

---

## 📝 Chi tiết từng module

### 1️⃣ **QUẢN LÝ NHÂN VIÊN** (Employee)

#### ✅ Thêm nhân viên mới
1. Nhấn nút **"+ Thêm nhân sự"** (màu đỏ)
2. Điền thông tin bắt buộc (*):
   - **Họ tên** - Tên đầy đủ nhân viên
   - **Email** - Địa chỉ email làm việc
   - **Vị trí** - Chọn từ danh sách (Leader, Developer, Tester, Intern, ...)
3. Điền thông tin tùy chọn:
   - Điện thoại
   - Vai trò (Leader, Support, Developer, Intern)
   - Ngày bắt đầu/kết thúc
   - % đóng góp (0-100)
   - Phòng ban
4. Nhấn **"+ Thêm nhân sự"** → Dữ liệu cập nhật tự động vào database

#### ✏️ Sửa thông tin nhân viên
1. Tìm nhân viên trong bảng → Nhấn biểu tượng **"Sửa"** (bút)
2. Modal mở ra với thông tin hiện tại
3. Thay đổi các trường cần sửa
4. Nhấn **"✓ Cập nhật"** → Lưu ngay vào database

#### ❌ Xóa nhân viên
1. Nhấn **"Xóa"** (thùng rác) trong hàng nhân viên
2. Xác nhận xóa
3. **⚠️ LƯU Ý**: Xóa nhân viên sẽ xóa tất cả dữ liệu liên quan:
   - Tất cả bảng lương
   - Tất cả bản ghi chấm công
   - Tất cả tài liệu

---

### 2️⃣ **QUẢN LÝ LƯƠNG** (Payroll)

#### 🔑 **NGUYÊN TẮC QUAN TRỌNG**
> **Lương được tính TỰ ĐỘNG từ giờ làm thực tế của nhân viên**
> 
> Công thức: `Lương = (Lương cơ bản ÷ 176) × Giờ làm thực tế + Thưởng - Khấu trừ`
> 
> - 176 = số giờ làm tiêu chuẩn trong 1 tháng (22 ngày × 8 giờ/ngày)

#### ➕ Thêm bảng lương mới
1. Nhấn **"+ Thêm bảng lương"** (màu xanh)
2. Điền thông tin:
   - **Mã nhân viên** (ID) - số hiệu nhân viên
   - **Tháng** - Chọn tháng/năm
   - **Lương cơ bản** - Tùy chọn:
     - Nhập số tiền → Tính cố định
     - **TRỐNG hoặc 0 → Tính TỰ ĐỘNG từ giờ làm** ⭐
   - **Thưởng** - Số tiền thưởng (nếu có)
   - **Khấu trừ** - Số tiền khấu trừ (nếu có)
3. Nhấn **"✓ Thêm"** → Cập nhật ngay vào database

#### 🔄 **Tính lại lương theo giờ làm (QUAN TRỌNG!)**
1. Nhấn nút **"🔄 Cập nhật lương theo giờ làm"** (màu tím)
2. Hệ thống sẽ:
   - Lấy tất cả nhân viên hiện tại
   - Tính giờ làm thực tế từ chấm công (tháng 12/2025)
   - Tính lương = (lương cơ bản ÷ 176) × giờ thực tế
   - Cập nhật tất cả bảng lương ngay
3. Thông báo "✅ Đã cập nhật lương tất cả nhân viên"

#### ✏️ Sửa/Cập nhật lương
1. Nhấn **"Sửa"** (bút vàng) trên hàng payroll
2. Thay đổi:
   - Lương cơ bản
   - Thưởng/Khấu trừ
   - Trạng thái (Đang xử lý / Đã thanh toán)
3. Xem ngay **"Lương ròng"** được tính toán
4. Nhấn **"✓ Cập nhật"** → Lưu vào database

#### 📊 Xem chi tiết lương
- Nhấn **"Xem"** (mắt) để xem chi tiết đầy đủ
- Hiển thị: Mã NV, Tên, Vị trí, Lương cơ bản, Thưởng, Khấu trừ, Lương ròng

---

### 3️⃣ **CHẤM CÔNG & TRACKING GIỜ LÀM** (Attendance)

#### 🎯 **HỆ THỐNG CHẤM CÔNG TỰ ĐỘNG TÍNH GIỜ LÀM**

#### ✅ Chấm công hàng ngày
1. **Nút chấm công cá nhân** (gradient xanh):
   - Hiển thị tên + vị trí người dùng hiện tại
   - Nhấn **"✓ Chấm công"** để mở modal
2. Điền thông tin:
   - **Giờ vào** - VD: "08:00" (định dạng HH:MM)
   - **Giờ ra** - VD: "17:30" (định dạng HH:MM)
   - **Mô tả công việc** - VD: "Coding feature login"
   - **Số lượng** - VD: "5" (sản phẩm, task, ...)
3. **Hệ thống TỰ ĐỘNG**:
   - Tính giờ làm = (17:30 - 08:00) = **9.5 giờ**
   - Phát hiện muộn: Nếu giờ vào > 08:30 → Status = "late"
   - Nếu < 08:30 → Status = "present"
4. Nhấn **"✓ Chấm công"**
   - **Alert hiển thị**:
     ```
     ✅ Chấm công thành công!
     ⏰ Giờ vào: 08:00
     ⏰ Giờ ra: 17:30
     📝 Mô tả: Coding feature login
     📊 Số lượng: 5
     ⌛ Giờ làm: 9.5h
     ```
   - Dữ liệu lưu vào database ngay

#### 🔍 Xem lịch sử chấm công
1. Bảng **"Danh sách chấm công"** hiển thị:
   - Nhân viên
   - Vị trí
   - Có mặt, Vắng, Muộn (số lần)
   - **Tổng giờ làm** (tự động cộng từ tất cả bản ghi)
2. **Lọc theo tháng/năm**:
   - Chọn tháng (1-12) và năm
   - Danh sách cập nhật tự động
3. Nhấn **"Chi tiết"** (mắt) để xem chi tiết từng nhân viên:
   - Tất cả bản ghi chấm công của nhân viên đó
   - Tổng giờ làm theo tháng

---

### 4️⃣ **DASHBOARD & THỐNG KÊ** (Home)

#### 📊 Các chỉ số hiển thị
1. **Nhân sự** (9 stat cards):
   - Tổng số nhân viên
   - Đang tham gia
   - Đã rút
   - Tổng lương, Đã thanh toán, Đang xử lý
   - Chấm công: Có mặt, Vắng, Muộn

2. **Chi tiết**:
   - **Nhân viên lương cao nhất**: Hiển thị tên, vị trí, lương ròng
   - **Biểu đồ Attendance Rate**: % Có mặt / Vắng / Muộn
   - **Danh sách nhân viên**: Bảng tóm tắt

---

## 💡 **WORKFLOW CHUẨN**

### Quy trình thêm mới nhân viên
```
1. Employee → Thêm nhân viên
2. Payroll → Thêm bảng lương (lương cơ bản để trống)
3. Attendance → Nhân viên chấm công hàng ngày
4. Payroll → "Cập nhật lương theo giờ làm" (tính lương từ attendance)
5. Home → Xem thống kê tổng hợp
```

### Quy trình tính lương tự động
```
Chấm công (attendance.workHours)
         ↓
    [Auto] calculateSalaryByHours(baseSalary, workHours)
         ↓
    [Auto] updatePayrollByHours()
         ↓
   Lương ròng = Lương cơ bản × (workHours ÷ 176) + Thưởng - Khấu trừ
```

---

## ⚙️ **CÔNG THỨC TÍNH TOÁN**

### Tính giờ làm
```
Giờ làm = (Giờ ra + Phút ra/60) - (Giờ vào + Phút vào/60)
Ví dụ: 17:30 - 08:00 = (17 + 30/60) - (8 + 0/60) = 9.5 giờ
```

### Tính giá một giờ làm
```
Giá/giờ = Lương cơ bản ÷ 176
Với lương 15,000,000: 15,000,000 ÷ 176 = ~85,227 đồng/giờ
```

### Tính lương thực tế
```
Lương thực tế = (Lương cơ bản ÷ 176) × Giờ làm thực tế + Thưởng - Khấu trừ

Ví dụ:
- Lương cơ bản: 15,000,000
- Giờ làm: 46.5 giờ (tháng 12/2025)
- Thưởng: 500,000
- Khấu trừ: 100,000

Lương thực tế = (15,000,000 ÷ 176) × 46.5 + 500,000 - 100,000
              = 85,227 × 46.5 + 400,000
              = 3,962,861 + 400,000
              = 4,362,861 đồng
```

---

## 🔐 **Các nút chức năng (Action Buttons)**

| Nút | Màu | Chức năng | Nơi dùng |
|-----|-----|----------|---------|
| **+ Thêm** | Xanh/Đỏ | Thêm bản ghi mới | All pages |
| **Sửa** (✏️) | Vàng | Chỉnh sửa bản ghi | All pages |
| **Xóa** (🗑️) | Đỏ | Xóa bản ghi | All pages |
| **Chi tiết** (👁️) | Xanh nhạt | Xem chi tiết | All pages |
| **🔄 Cập nhật lương** | Tím | Tính lương tự động từ giờ làm | Payroll page |
| **✓ Chấm công** | Xanh | Thêm bản ghi chấm công | Attendance page |

---

## ⚠️ **Lưu ý quan trọng**

1. **Dữ liệu cập nhật TỰ ĐỘNG**: 
   - Không cần nhấn "Save" riêng biệt
   - Khi nhấn "Thêm/Cập nhật/Xóa" thì data được lưu ngay vào database

2. **Tính lương phải từ giờ làm thực tế**:
   - Không nên nhập lương cơ bản tùy ý
   - Hãy để trống/0 rồi nhấn "Cập nhật lương theo giờ làm"

3. **Chấm công phải có giờ ra**:
   - Nếu không nhập giờ ra, hệ thống tính giờ = hiện tại
   - Luôn nhập đầy đủ giờ vào/ra để chính xác

4. **Xóa nhân viên là xóa vĩnh viễn**:
   - Sẽ xóa tất cả: lương, chấm công, tài liệu
   - Không thể hoàn tác → Xác nhận kỹ trước khi xóa

5. **Dữ liệu hiện tại là tháng 12/2025**:
   - Attendance records từ ngày 15-18/12/2025
   - Khi xem attendance, chọn tháng 12, năm 2025

---

## 🚀 **Tips sử dụng hiệu quả**

✅ **Làm theo thứ tự**:
1. Thêm nhân viên → 2. Thêm lương → 3. Chấm công → 4. Cập nhật lương → 5. Xem kết quả

✅ **Kiểm tra trước khi xóa**: Xem chi tiết bản ghi trước khi xóa

✅ **Dùng filters**: Tìm kiếm + Lọc để dễ quản lý với dữ liệu nhiều

✅ **Xem dashboard hàng ngày**: Kiểm tra thống kê để nắm tình hình nhân sự

---

## 📞 **Hỗ trợ**

Nếu gặp lỗi:
1. **Refresh page**: F5 hay Ctrl+R
2. **Kiểm tra console**: F12 → Console tab
3. **Xóa cache**: Ctrl+Shift+Delete

---

**Cập nhật lần cuối**: 22/01/2026
**Phiên bản**: 1.0.0
