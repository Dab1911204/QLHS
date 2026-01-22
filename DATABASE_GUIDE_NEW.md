# 📚 Hướng Dẫn Sử Dụng Database Tập Trung

## 📝 Giới Thiệu

File `src/data/data.js` chứa toàn bộ dữ liệu của hệ thống quản lý nhân sự như một **database tập trung**. Tất cả các trang (Nhân sự, Bảng lương, Chấm công, v.v.) đều lấy dữ liệu từ đây và có thể **thêm, sửa, xóa** dữ liệu một cách logic.

---

## 🏗️ Cấu Trúc Dữ Liệu

### 1. **Nhân Viên (Employees)**
```javascript
{
  id: number,
  name: string,
  email: string,
  phone: string,
  password: string,         // Mật khẩu login (min 6 chars) - Bắt buộc
  role: string,             // "Manager", "Leader", "Support", "Employee"
  startDate: string,        // "DD/MM/YYYY" - Ngày bắt đầu làm việc
  status: "Đang tham gia" | "Đã rút",
  avatar: null | string     // URL ảnh đại diện (hiện tại: null)
}
```

### 2. **Bảng Lương (Payrolls)**
- **Liên kết với**: Nhân viên qua `employeeId`
- **Mối quan hệ**: 1 nhân viên → nhiều bảng lương (1 tháng = 1 bảng lương)

```javascript
{
  id: number,
  employeeId: number,           // Liên kết tới nhân viên
  month: string,                // "12/2025"
  baseSalary: number,           // Lương cơ bản
  bonus: number,                // Tiền thưởng
  deduction: number,            // Khấu trừ
  netSalary: number,            // Lương ròng (tự động tính)
  workHours: number,            // ✨ NEW - Giờ làm thực tế
  status: "Đã thanh toán" | "Đang xử lý",
  paidDate: null | string       // Ngày thanh toán
}
```

**🔴 QUAN TRỌNG - Tính lương tự động:**
```
Công thức: netSalary = (baseSalary ÷ 176) × workHours + bonus - deduction

Ví dụ:
- Lương cơ bản: 15,000,000
- Giờ làm thực tế: 46.5 giờ (từ attendance records)
- Thưởng: 500,000
- Khấu trừ: 100,000

netSalary = (15,000,000 ÷ 176) × 46.5 + 500,000 - 100,000
          = 85,227 × 46.5 + 400,000
          = 3,962,861 + 400,000
          = 4,362,861 đồng
```

### 3. **Chấm Công (Attendance)**
- **Liên kết với**: Nhân viên qua `employeeId`
- **Mối quan hệ**: 1 nhân viên → nhiều ngày chấm công

```javascript
{
  id: number,
  employeeId: number,           // Liên kết tới nhân viên
  date: string,                 // "2025-12-15"
  checkIn: string,              // "08:00" - giờ vào
  checkOut: string,             // "17:30" - giờ ra
  status: "present" | "absent" | "late",
  workHours: number,            // ✨ Tự động tính từ checkIn/Out
  workDescription: string,      // Mô tả công việc
  productQuantity: number,      // Số lượng sản phẩm
  unit: string                  // "module", "bug", "endpoint", etc
}
```

**📌 Cách tính workHours:**
```
// Tự động tính từ checkIn và checkOut
// VD: checkIn="08:00", checkOut="17:30"
// → workHours = (17 + 30/60) - (8 + 0/60) = 9.5 giờ

// Status tự động:
// - Nếu checkIn < "08:30" → "present"
// - Nếu checkIn >= "08:30" → "late"
// - Nếu checkOut null → "absent"
```

### 4. **Tài Liệu (Documents)**
- **Liên kết với**: Nhân viên qua `employeeId`
- **Mối quan hệ**: 1 nhân viên → nhiều tài liệu

```javascript
{
  id: number,
  employeeId: number,           // Liên kết tới nhân viên
  title: string,                // Tên tài liệu
  type: string,                 // "contract", "certificate", "id", etc
  uploadDate: string,           // Ngày tải lên
  expiryDate: null | string,    // Ngày hết hạn (nếu có)
  status: string,               // "Có hiệu lực", "Hết hạn"
  fileUrl: null | string        // URL file (tương lai)
}
```

---

## 📦 Các Hàm Có Sẵn

### **READ Operations** (Lấy dữ liệu)

```javascript
import initialData, {
  getAllEmployees,
  getEmployeeById,
  getPayrollsByEmployeeId,
  getAllPayrolls,
  getAttendanceByEmployeeId,
  getAllAttendance,
  getDocumentsByEmployeeId,
  getAllDocuments,
  // ✨ NEW - Thống kê
  getEmployeeStats,
  getPayrollStats,
  getAttendanceStats,
  getTopSalaryEmployee,
  getTotalHoursByEmployeeAndMonth
} from '../../data/data';

// Ví dụ sử dụng
const employees = getAllEmployees(data);
const emp = getEmployeeById(data, 1);
const payrolls = getPayrollsByEmployeeId(data, 1);
const stats = getEmployeeStats(data);
```

### **CREATE Operations** (Thêm dữ liệu mới)

```javascript
import {
  addEmployee,
  addPayroll,
  addAttendance,
  addDocument
} from '../../data/data';

// Thêm nhân viên
const newData = addEmployee(data, {
  name: "Tên nhân viên",
  email: "email@example.com",
  phone: "0123456789",
  password: "password123",      // Bắt buộc (min 6 chars)
  role: "Developer",
  startDate: "2025-01-22",
  avatar: null
});
setData(newData);
```

### **UPDATE Operations** (Cập nhật dữ liệu)

```javascript
import {
  updateEmployee,
  updatePayroll,
  updateAttendance,
  updateDocument
} from '../../data/data';

// Cập nhật nhân viên
const newData = updateEmployee(data, employeeId, {
  name: "Tên mới",
  role: "Leader",
  status: "Đã rút",
  password: "newpassword123"    // Có thể cập nhật password
});
setData(newData);

// Cập nhật lương
const newData = updatePayroll(data, payrollId, {
  bonus: 1000000,
  deduction: 200000,
  status: "Đã thanh toán"
});
setData(newData);
```

### **DELETE Operations** (Xóa dữ liệu)

```javascript
import {
  deleteEmployee,
  deletePayroll,
  deleteAttendance,
  deleteDocument
} from '../../data/data';

// Xóa nhân viên (cũng xóa tất cả bảng lương, chấm công, tài liệu của họ)
const newData = deleteEmployee(data, employeeId);
setData(newData);

// Xóa bảng lương
const newData = deletePayroll(data, payrollId);
setData(newData);
```

### **CALCULATION Functions** (✨ NEW - Tính toán)

```javascript
import {
  calculateSalaryByHours,       // Tính lương từ giờ làm
  updatePayrollByHours,         // Cập nhật lương toàn hệ thống
  getTotalHoursByEmployeeAndMonth
} from '../../data/data';

// Tính lương cho 1 nhân viên
const netSalary = calculateSalaryByHours(
  baseSalary: 15000000,
  workHours: 46.5,
  bonus: 500000,
  deduction: 100000
);
// Result: 4,362,861

// Cập nhật lương tất cả nhân viên theo giờ làm (tháng 12, năm 2025)
const newData = updatePayrollByHours(data, 12, 2025);
setData(newData);
// Tự động:
// - Lấy tất cả nhân viên
// - Tính total workHours từ attendance records
// - Tính lương = (baseSalary ÷ 176) × workHours
// - Cập nhật payroll netSalary
```

---

## 🔗 Mối Quan Hệ Dữ Liệu

### Relational Model
```
Nhân Viên (Employee)
  ├─ Bảng Lương (Payroll)
  │   ├─ 12/2025 - netSalary từ 46.5 workHours
  │   ├─ 11/2025 - netSalary từ 44.0 workHours
  │   └─ 10/2025 - netSalary từ 48.0 workHours
  │
  ├─ Chấm Công (Attendance)
  │   ├─ 2025-12-15 - 9.5 workHours (08:00 → 17:30)
  │   ├─ 2025-12-16 - 8.0 workHours (08:00 → 16:00)
  │   └─ 2025-12-17 - 9.0 workHours (08:30 → 17:30) [muộn]
  │
  └─ Tài Liệu (Document)
      ├─ Hợp đồng lao động
      └─ Bằng cấp chuyên môn
```

**Quy tắc quan trọng:**
- **Xóa nhân viên** → Tất cả dữ liệu liên quan (bảng lương, chấm công, tài liệu) sẽ bị xóa (cascade delete)
- **Xóa bảng lương/chấm công** → Chỉ xóa cái đó, nhân viên vẫn tồn tại

---

## 🎯 Những Trang Đã Sử Dụng Database

✅ **Trang Chủ** (Home) - Hiển thị thống kê tổng quan  
✅ **Quản Lý Nhân Sự** (Employee) - CRUD nhân viên  
✅ **Quản Lý Bảng Lương** (Payroll) - CRUD bảng lương, tính lương tự động  
✅ **Quản Lý Chấm Công** (Attendance) - Chấm công, xem chi tiết  
✅ **Quản Lý Tài Liệu** (Documents) - CRUD tài liệu  
✅ **Hồ Sơ Người Dùng** (User Profile) - ✨ NEW - Xem/sửa thông tin

---

## 🔐 Authentication & User State

### Lưu trữ trong Redux + localStorage
```javascript
// Redux state (src/redux/slices/userInfo.js)
const userInfo = {
  id: 1,
  name: "Nguyễn Văn A",
  email: "a@gmail.com",
  password: "password123",
  isLoggedIn: true,           // 🔑 Key flag
};

// Tự động lưu vào localStorage qua redux-persist
localStorage["persist:root"] = JSON.stringify({userInfo})
```

---

**Last Updated**: 23/01/2026 | **Version**: 2.0
