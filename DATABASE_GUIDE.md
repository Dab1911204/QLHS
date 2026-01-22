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
  position: string,
  role: string,
  startDate: string,
  status: "Đang tham gia" | "Đã rút",
  contribution: string, // "100%", "50%", etc
  department: string,
  avatar: null | string
}
```

### 2. **Bảng Lương (Payrolls)**
- **Liên kết với**: Nhân viên qua `employeeId`
- **Mối quan hệ**: 1 nhân viên → nhiều bảng lương (1 tháng = 1 bảng lương)

```javascript
{
  id: number,
  employeeId: number, // Liên kết tới nhân viên
  month: string, // "12/2025"
  baseSalary: number,
  bonus: number,
  deduction: number,
  netSalary: number,
  status: "Đã thanh toán" | "Đang xử lý",
  paidDate: null | string
}
```

### 3. **Chấm Công (Attendance)**
- **Liên kết với**: Nhân viên qua `employeeId`
- **Mối quan hệ**: 1 nhân viên → nhiều ngày chấm công

```javascript
{
  id: number,
  employeeId: number, // Liên kết tới nhân viên
  date: string, // "2025-01-15"
  checkIn: null | string, // "08:00"
  checkOut: null | string, // "17:30"
  status: "present" | "absent" | "late",
  workHours: number,
  workDescription: null | string,
  productQuantity: number,
  unit: null | string // "module", "bug", "endpoint", etc
}
```

### 4. **Tài Liệu (Documents)**
- **Liên kết với**: Nhân viên qua `employeeId`
- **Mối quan hệ**: 1 nhân viên → nhiều tài liệu

```javascript
{
  id: number,
  employeeId: number, // Liên kết tới nhân viên
  title: string,
  type: string, // "contract", "certificate"
  uploadDate: string,
  expiryDate: null | string,
  status: string,
  fileUrl: null | string
}
```

---

## 📦 Các Hàm Có Sẵn

### **READ Operations** (Lấy dữ liệu)

```javascript
import {
  getAllEmployees,
  getEmployeeById,
  getPayrollsByEmployeeId,
  getAllPayrolls,
  getAttendanceByEmployeeId,
  getAllAttendance,
  getDocumentsByEmployeeId,
  getAllDocuments
} from '../../data/data';

// Sử dụng
const employees = getAllEmployees(data);
const emp = getEmployeeById(data, 1);
const payrolls = getPayrollsByEmployeeId(data, 1);
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
  position: "Developer",
  role: "Developer",
  startDate: "2025-01-22",
  department: "Phát triển"
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
  status: "Đã rút"
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
```

### **ANALYTICAL Functions** (Thống kê dữ liệu)

```javascript
import {
  getEmployeeStats,
  getPayrollStats,
  getAttendanceStats,
  getTopSalaryEmployee,
  getTotalHoursByEmployeeAndMonth
} from '../../data/data';

// Thống kê nhân viên
const { total, active, withdrawn } = getEmployeeStats(data);

// Thống kê bảng lương
const { total: totalPayroll, paid, pending } = getPayrollStats(data);

// Thống kê chấm công
const { present, absent, late, totalHours } = getAttendanceStats(data);

// Nhân viên lương cao nhất
const topEmp = getTopSalaryEmployee(data);

// Tổng giờ làm theo tháng
const hours = getTotalHoursByEmployeeAndMonth(data, employeeId, 12, 2025);
```

---

## 💡 Cách Sử Dụng Trong Component

### **Ví dụ 1: Hiển thị danh sách nhân viên**

```javascript
import { useState } from 'react';
import initialData, { getAllEmployees, addEmployee } from '../../data/data';

const EmployeeList = () => {
  const [data, setData] = useState(initialData);
  const employees = getAllEmployees(data);

  const handleAddEmployee = (newEmp) => {
    const updatedData = addEmployee(data, newEmp);
    setData(updatedData);
  };

  return (
    <div>
      {employees.map(emp => (
        <div key={emp.id}>{emp.name} - {emp.position}</div>
      ))}
    </div>
  );
};
```

### **Ví dụ 2: Thêm bảng lương**

```javascript
import initialData, { addPayroll } from '../../data/data';

const handleAddPayroll = (payrollData) => {
  const updatedData = addPayroll(data, {
    employeeId: 1,
    month: "01/2026",
    baseSalary: 15000000,
    bonus: 2000000,
    deduction: 500000,
    netSalary: 16500000,
    status: "Đang xử lý"
  });
  setData(updatedData);
};
```

### **Ví dụ 3: Chấm công**

```javascript
import initialData, { addAttendance } from '../../data/data';

const handleCheckIn = () => {
  const today = new Date().toISOString().split('T')[0];
  const updatedData = addAttendance(data, {
    employeeId: currentUser.id,
    date: today,
    checkIn: "08:00",
    checkOut: "17:30",
    status: "present",
    workHours: 9.5,
    workDescription: "Phát triển feature",
    productQuantity: 1,
    unit: "module"
  });
  setData(updatedData);
};
```

---

## 🔗 Mối Quan Hệ Dữ Liệu

```
Nhân Viên (Employee)
  ├─ Bảng Lương (Payroll)
  │   ├─ 12/2025
  │   ├─ 11/2025
  │   └─ 10/2025
  │
  ├─ Chấm Công (Attendance)
  │   ├─ 2025-01-15
  │   ├─ 2025-01-16
  │   └─ 2025-01-17
  │
  └─ Tài Liệu (Document)
      ├─ Hợp đồng lao động
      └─ Bằng cấp chuyên môn
```

**Quy tắc quan trọng:**
- **Xóa nhân viên** → Tất cả dữ liệu liên quan (bảng lương, chấm công, tài liệu) sẽ bị xóa
- **Xóa bảng lương/chấm công** → Chỉ xóa cái đó, nhân viên vẫn tồn tại

---

## 🎯 Những Trang Đã Sử Dụng Database

✅ **Trang Chủ** - Hiển thị thống kê tổng quan
✅ **Quản Lý Nhân Sự** - CRUD nhân viên, liên kết với bảng lương & chấm công
✅ **Quản Lý Bảng Lương** - CRUD bảng lương, tìm kiếm theo nhân viên
✅ **Quản Lý Chấm Công** - Chấm công, xem chi tiết theo tháng

---

## 🚀 Mở Rộng Tương Lai

Để sử dụng **API thực tế** thay vì state:

1. Thay thế `initialData` bằng API call
2. Sử dụng Redux hoặc Context API để quản lý state toàn cục
3. Thêm validation trước khi lưu dữ liệu
4. Thêm xác thực người dùng (authentication)

---

## 📞 Hỗ Trợ

Nếu có vấn đề với dữ liệu, hãy:
1. Kiểm tra import đúng hàm từ `data.js`
2. Đảm bảo `employeeId` tồn tại trước khi thêm bảng lương/chấm công
3. Kiểm tra format dữ liệu đầu vào
