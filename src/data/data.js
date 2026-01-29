// ============================================================
// DATABASE TẬP TRUNG - HỆ THỐNG QUẢN LÝ NHÂN SỰ
// ============================================================

// Lưu trữ dữ liệu trong state toàn cục (sử dụng với Context API hoặc Redux)
const initialData = {
  // ===== NHÂN VIÊN =====
  employees: [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "a@gmail.com",
      phone: "0123456789",
      password: "123456",
      role: "Manager",
      startDate: "01/01/2025",
      status: "Đang tham gia",
      avatar: null,
      address: "",
      idCard: "",
      bankAccount: "",
      bankName: "",
    },
    {
      id: 2,
      name: "Nguyễn Văn B",
      email: "b@gmail.com",
      phone: "0987654321",
      password: "123456",
      role: "Leader",
      startDate: "01/02/2025",
      status: "Đang tham gia",
      avatar: null,
      address: "",
      idCard: "",
      bankAccount: "",
      bankName: "",
    },
    {
      id: 3,
      name: "Nguyễn Văn C",
      email: "c@gmail.com",
      phone: "0912345678",
      password: "123456",
      role: "Support",
      startDate: "01/03/2025",
      status: "Đang tham gia",
      avatar: null,
      address: "",
      idCard: "",
      bankAccount: "",
      bankName: "",
    },
    {
      id: 4,
      name: "Trần Thị D",
      email: "d@gmail.com",
      phone: "0902345678",
      password: "123456",
      role: "Employee",
      startDate: "01/04/2025",
      status: "Đang tham gia",
      avatar: null,
      address: "",
      idCard: "",
      bankAccount: "",
      bankName: "",
    },
    {
      id: 5,
      name: "Lê Văn E",
      email: "e@gmail.com",
      phone: "0932345678",
      password: "123456",
      role: "Employee",
      startDate: "01/05/2025",
      status: "Đang tham gia",
      avatar: null,
      address: "",
      idCard: "",
      bankAccount: "",
      bankName: "",
    },
  ],

  // ===== BẢNG LƯƠNG (Liên kết với nhân viên qua employeeId) =====
  // baseSalary được tính tự động từ giờ làm hoặc phiếu tùy chức vụ dựa trên attendance
  payrolls: [
    {
      id: 1,
      employeeId: 1,
      month: "12/2025",
      baseSalary: 1460000,
      bonus: 2000000,
      deduction: 500000,
      netSalary: 2960000,
      totalHours: 36.5,
      totalProducts: 0,
      status: "Đã thanh toán",
      paidDate: "2025-12-31",
    },
    {
      id: 2,
      employeeId: 2,
      month: "12/2025",
      baseSalary: 1460000,
      bonus: 1500000,
      deduction: 400000,
      netSalary: 2560000,
      totalHours: 36.5,
      totalProducts: 0,
      status: "Đang xử lý",
      paidDate: null,
    },
    {
      id: 3,
      employeeId: 3,
      month: "12/2025",
      baseSalary: 1120000,
      bonus: 1000000,
      deduction: 300000,
      netSalary: 1820000,
      totalHours: 28,
      totalProducts: 0,
      status: "Đã thanh toán",
      paidDate: "2025-12-31",
    },
    {
      id: 4,
      employeeId: 4,
      month: "12/2025",
      baseSalary: 4500,
      bonus: 800000,
      deduction: 250000,
      netSalary: 554500,
      totalHours: 0,
      totalProducts: 25,
      status: "Đang xử lý",
      paidDate: null,
    },
    {
      id: 5,
      employeeId: 5,
      month: "12/2025",
      baseSalary: 540,
      bonus: 300000,
      deduction: 150000,
      netSalary: 150540,
      totalHours: 0,
      totalProducts: 3,
      status: "Đã thanh toán",
      paidDate: "2025-12-31",
    },
  ],

  // ===== CHẤM CÔNG (Liên kết với nhân viên qua employeeId) =====
  attendance: [
    // Nguyễn Văn A - Tháng 12/2025
    {
      id: 1,
      employeeId: 1,
      date: "2025-12-15",
      checkIn: "08:00",
      checkOut: "17:30",
      status: "present",
      workHours: 8.5,
      workDescription: "Phát triển tính năng dashboard",
      productQuantity: 1,
      productQuantityOT: 3,
      unit: "Nhập liệu",
    },
    {
      id: 2,
      employeeId: 1,
      date: "2025-12-16",
      checkIn: "08:15",
      checkOut: "17:45",
      status: "present",
      workHours: 8.5,
      workDescription: "Fix bug giao diện",
      productQuantity: 3,
      productQuantityOT: 1,
      unit: "Scan",
    },
    {
      id: 3,
      employeeId: 1,
      date: "2025-12-17",
      checkIn: "09:00",
      checkOut: "17:00",
      status: "absent",
      workHours: 0,
      workDescription: null,
      productQuantity: 0,
      productQuantityOT: 0,
      unit: "Nhập liệu",
    },
    {
      id: 4,
      employeeId: 1,
      date: "2025-12-18",
      checkIn: "09:00",
      checkOut: "17:00",
      status: "late",
      workHours: 7,
      workDescription: "Meeting với client",
      productQuantity: 1,
      productQuantityOT: 0,
      unit: "Nhập liệu",
    },
    {
      id: 5,
      employeeId: 1,
      date: "2025-12-19",
      checkIn: "08:00",
      checkOut: "17:30",
      status: "present",
      workHours: 8.5,
      workDescription: "Code review",
      productQuantity: 2,
      productQuantityOT: 1,
      unit: "Nhập liệu",
    },
    // Nguyễn Văn B - Tháng 12/2025
    {
      id: 6,
      employeeId: 2,
      date: "2025-12-15",
      checkIn: "08:30",
      checkOut: "17:00",
      status: "present",
      workHours: 7.5,
      workDescription: "Code review",
      productQuantity: 5,
      productQuantityOT: 0,
      unit: "Nhập liệu",
    },
    {
      id: 7,
      employeeId: 2,
      date: "2025-12-16",
      checkIn: "08:00",
      checkOut: "17:30",
      status: "present",
      workHours: 8.5,
      workDescription: "Phát triển API authentication",
      productQuantity: 3,
      productQuantityOT: 1,
      unit: "Nhập liệu",
    },
    {
      id: 8,
      employeeId: 2,
      date: "2025-12-17",
      checkIn: "08:00",
      checkOut: "17:00",
      status: "present",
      workHours: 8,
      workDescription: "Unit testing",
      productQuantity: 10,
      productQuantityOT: 0,
      unit: "Nhập liệu",
    },
    {
      id: 9,
      employeeId: 2,
      date: "2025-12-18",
      checkIn: "08:00",
      checkOut: "17:30",
      status: "present",
      workHours: 8.5,
      workDescription: "Deploy to production",
      productQuantity: 1,
      productQuantityOT: 1,
      unit: "Nhập liệu",
    },
    // Nguyễn Văn C - Tháng 12/2025
    {
      id: 10,
      employeeId: 3,
      date: "2025-12-15",
      checkIn: "08:00",
      checkOut: "17:30",
      status: "present",
      workHours: 8.5,
      workDescription: "Xây dựng giao diện",
      productQuantity: 2,
      productQuantityOT: 0,
      unit: "Nhập liệu",
    },
    {
      id: 11,
      employeeId: 3,
      date: "2025-12-16",
      checkIn: "08:30",
      checkOut: "17:30",
      status: "present",
      workHours: 8,
      workDescription: "Responsive design",
      productQuantity: 1,
      productQuantityOT: 0,
      unit: "Nhập liệu",
    },
    {
      id: 12,
      employeeId: 3,
      date: "2025-12-17",
      checkIn: "08:00",
      checkOut: "17:30",
      status: "present",
      workHours: 8.5,
      workDescription: "Component refactoring",
      productQuantity: 5,
      productQuantityOT: 1,
      unit: "Nhập liệu",
    },
    // Trần Thị D - Tháng 12/2025
    {
      id: 13,
      employeeId: 4,
      date: "2025-12-15",
      checkIn: "09:00",
      checkOut: "17:00",
      status: "late",
      workHours: 7,
      workDescription: "Testing new feature",
      productQuantity: 8,
      productQuantityOT: 0,
      unit: "Check scan",
    },
    {
      id: 14,
      employeeId: 4,
      date: "2025-12-16",
      checkIn: "08:00",
      checkOut: "16:30",
      status: "present",
      workHours: 7.5,
      workDescription: "Bug report",
      productQuantity: 5,
      productQuantityOT: 0,
      unit: "Scan",
    },
    {
      id: 15,
      employeeId: 4,
      date: "2025-12-17",
      checkIn: "08:00",
      checkOut: "17:00",
      status: "present",
      workHours: 8,
      workDescription: "Regression testing",
      productQuantity: 12,
      productQuantityOT: 0,
      unit: "Nhập liệu",
    },
    // Lê Văn E - Tháng 12/2025
    {
      id: 16,
      employeeId: 5,
      date: "2025-12-15",
      checkIn: "08:00",
      checkOut: "17:00",
      status: "present",
      workHours: 8,
      workDescription: "Learning React",
      productQuantity: 0,
      productQuantityOT: 0,
      unit: "Check nhập liệu",
    },
    {
      id: 17,
      employeeId: 5,
      date: "2025-12-16",
      checkIn: "08:00",
      checkOut: "17:00",
      status: "present",
      workHours: 8,
      workDescription: "Practice coding",
      productQuantity: 1,
      productQuantityOT: 0,
      unit: "Nhập liệu",
    },
    {
      id: 18,
      employeeId: 5,
      date: "2025-12-17",
      checkIn: "08:00",
      checkOut: "17:30",
      status: "present",
      workHours: 8.5,
      workDescription: "Complete assignment",
      productQuantity: 2,
      productQuantityOT: 4,
      unit: "Check scan",
    },
  ],
};

// ============================================================
// UTILITY FUNCTIONS - Các hàm để quản lý dữ liệu
// ============================================================

/**
 * Lấy tất cả nhân viên
 */
export const getAllEmployees = (data) => data.employees;

/**
 * Lấy nhân viên theo ID
 */
export const getEmployeeById = (data, employeeId) => {
  return data.employees.find((emp) => emp.id === employeeId);
};

/**
 * Lấy bảng lương của một nhân viên
 */
export const getPayrollsByEmployeeId = (data, employeeId) => {
  return data.payrolls.filter((payroll) => payroll.employeeId === employeeId);
};

/**
 * Lấy bảng lương theo ID
 */
export const getPayrollById = (data, payrollId) => {
  return data.payrolls.find((p) => p.id === payrollId);
};

/**
 * Lấy tất cả bảng lương (với tính toán động từ attendance)
 */
export const getAllPayrolls = (data) => {
  return data.payrolls.map((payroll) => {
    const employee = getEmployeeById(data, payroll.employeeId);
    if (!employee) return payroll;

    // Tính toán lại giờ/phiếu từ attendance
    const month = parseInt(payroll.month.split("/")[0]);
    const year = parseInt(payroll.month.split("/")[1]);
    
    let totalHours = 0;
    let totalProducts = 0;

    if (["Manager", "Leader", "Support"].includes(employee.role)) {
      totalHours = getTotalHoursByEmployeeAndMonth(data, employee.id, month, year);
    } else if (employee.role === "Employee") {
      totalHours = getTotalHoursByEmployeeAndMonth(data, employee.id, month, year);
      totalProducts = getTotalProductsByEmployeeAndMonth(data, employee.id, month, year);
    }

    // Tính lương dựa trên attendance
    let baseSalary = 0;
    if (["Manager", "Leader", "Support"].includes(employee.role)) {
      baseSalary = calculateSalaryByHours(totalHours);
    } else if (employee.role === "Employee") {
      // Lấy danh sách attendance của tháng để tính lương theo unit
      const attendanceRecords = data.attendance.filter((att) => {
        const attDate = new Date(att.date);
        return (
          att.employeeId === employee.id &&
          attDate.getMonth() + 1 === month &&
          attDate.getFullYear() === year
        );
      });
      baseSalary = calculateSalaryByProductsWithUnit(attendanceRecords);
    }

    // Tính netSalary = baseSalary + bonus - deduction
    const netSalary = baseSalary + (payroll.bonus || 0) - (payroll.deduction || 0);

    return {
      ...payroll,
      name: employee?.name,
      role: employee?.role,
      baseSalary,
      netSalary,
      totalHours,
      totalProducts,
    };
  });
};

/**
 * Lấy chấm công của một nhân viên
 */
export const getAttendanceByEmployeeId = (data, employeeId) => {
  return data.attendance.filter((att) => att.employeeId === employeeId);
};

/**
 * Lấy chấm công theo ID
 */
export const getAttendanceById = (data, attendanceId) => {
  return data.attendance.find((a) => a.id === attendanceId);
};

/**
 * Lấy tất cả chấm công
 */
export const getAllAttendance = (data) => {
  return data.attendance.map((att) => {
    const employee = getEmployeeById(data, att.employeeId);
    return {
      ...att,
      name: employee?.name,
      position: employee?.position,
    };
  });
};

// ============================================================
// CREATE OPERATIONS - Thêm dữ liệu mới
// ============================================================

/**
 * Thêm nhân viên mới
 */
export const addEmployee = (data, newEmployee) => {
  const nextId =
    data.employees.length > 0
      ? Math.max(...data.employees.map((e) => e.id)) + 1
      : 1;

  const employee = {
    id: nextId,
    name: newEmployee.name,
    email: newEmployee.email,
    phone: newEmployee.phone,
    password: newEmployee.password,
    role: newEmployee.role,
    startDate: newEmployee.startDate,
    status: newEmployee.status || "Đang tham gia",
    avatar: newEmployee.avatar || null,
    address: newEmployee.address || "",
    idCard: newEmployee.idCard || "",
    bankAccount: newEmployee.bankAccount || "",
    bankName: newEmployee.bankName || "",
  };

  return {
    ...data,
    employees: [...data.employees, employee],
  };
};

/**
 * Thêm bảng lương mới (baseSalary được tính tự động từ giờ làm hoặc sản phẩm)
 */
export const addPayroll = (data, newPayroll) => {
  const nextId =
    data.payrolls.length > 0
      ? Math.max(...data.payrolls.map((p) => p.id)) + 1
      : 1;

  const payroll = {
    id: nextId,
    employeeId: newPayroll.employeeId,
    month: newPayroll.month,
    baseSalary: newPayroll.baseSalary,
    bonus: newPayroll.bonus || 0,
    deduction: newPayroll.deduction || 0,
    netSalary: newPayroll.netSalary,
    totalHours: newPayroll.totalHours || 0,
    totalProducts: newPayroll.totalProducts || 0,
    status: newPayroll.status || "Đang xử lý",
    paidDate: newPayroll.paidDate || null,
  };

  return {
    ...data,
    payrolls: [...data.payrolls, payroll],
  };
};

/**
 * Thêm chấm công mới
 */
export const addAttendance = (data, newAttendance) => {
  const nextId =
    data.attendance.length > 0
      ? Math.max(...data.attendance.map((a) => a.id)) + 1
      : 1;

  const attendance = {
    id: nextId,
    employeeId: newAttendance.employeeId,
    date: newAttendance.date,
    checkIn: newAttendance.checkIn,
    checkOut: newAttendance.checkOut || null,
    status: newAttendance.status,
    workHours: newAttendance.workHours,
    workDescription: newAttendance.workDescription || null,
    productQuantity: newAttendance.productQuantity || 0,
    unit: newAttendance.unit || null,
  };

  return {
    ...data,
    attendance: [...data.attendance, {
      ...attendance,
      productQuantityOT: newAttendance.productQuantityOT || 0,
    }],
  };
};

// ============================================================
// UPDATE OPERATIONS - Cập nhật dữ liệu
// ============================================================

/**
 * Cập nhật nhân viên
 */
export const updateEmployee = (data, employeeId, updatedData) => {
  return {
    ...data,
    employees: data.employees.map((emp) =>
      emp.id === employeeId ? { ...emp, ...updatedData } : emp,
    ),
  };
};

/**
 * Cập nhật bảng lương
 */
export const updatePayroll = (data, payrollId, updatedData) => {
  return {
    ...data,
    payrolls: data.payrolls.map((payroll) =>
      payroll.id === payrollId ? { ...payroll, ...updatedData } : payroll,
    ),
  };
};

/**
 * Cập nhật chấm công
 */
export const updateAttendance = (data, attendanceId, updatedData) => {
  return {
    ...data,
    attendance: data.attendance.map((att) =>
      att.id === attendanceId ? { ...att, ...updatedData } : att,
    ),
  };
};

// ============================================================
// DELETE OPERATIONS - Xóa dữ liệu
// ============================================================

/**
 * Xóa nhân viên (cũng xóa tất cả dữ liệu liên quan)
 */
export const deleteEmployee = (data, employeeId) => {
  return {
    ...data,
    employees: data.employees.filter((emp) => emp.id !== employeeId),
    payrolls: data.payrolls.filter((p) => p.employeeId !== employeeId),
    attendance: data.attendance.filter((a) => a.employeeId !== employeeId),
    documents: data.documents.filter((d) => d.employeeId !== employeeId),
  };
};

/**
 * Xóa bảng lương
 */
export const deletePayroll = (data, payrollId) => {
  return {
    ...data,
    payrolls: data.payrolls.filter((p) => p.id !== payrollId),
  };
};

/**
 * Xóa chấm công
 */
export const deleteAttendance = (data, attendanceId) => {
  return {
    ...data,
    attendance: data.attendance.filter((a) => a.id !== attendanceId),
  };
};

// ============================================================
// ANALYTICAL FUNCTIONS - Hàm phân tích dữ liệu
// ============================================================

/**
 * Lấy thống kê nhân viên
 */
export const getEmployeeStats = (data) => {
  const total = data.employees.length;
  const active = data.employees.filter(
    (e) => e.status === "Đang tham gia",
  ).length;
  const withdrawn = data.employees.filter((e) => e.status === "Đã rút").length;

  return { total, active, withdrawn };
};

/**
 * Lấy thống kê bảng lương
 */
export const getPayrollStats = (data) => {
  const total = data.payrolls.reduce((sum, p) => sum + p.netSalary, 0);
  const paid = data.payrolls.filter((p) => p.status === "Đã thanh toán").length;
  const pending = data.payrolls.filter(
    (p) => p.status === "Đang xử lý",
  ).length;

  return { total, paid, pending };
};

/**
 * Lấy thống kê chấm công
 */
export const getAttendanceStats = (data) => {
  const present = data.attendance.filter(
    (a) => a.status === "present",
  ).length;
  const absent = data.attendance.filter((a) => a.status === "absent").length;
  const late = data.attendance.filter((a) => a.status === "late").length;
  const totalHours = data.attendance.reduce((sum, a) => sum + a.workHours, 0);

  return { present, absent, late, totalHours };
};

/**
 * Lấy nhân viên có lương cao nhất
 */
export const getTopSalaryEmployee = (data) => {
  if (data.payrolls.length === 0) return null;

  const topPayroll = data.payrolls.reduce((max, p) =>
    p.netSalary > max.netSalary ? p : max,
  );

  const employee = getEmployeeById(data, topPayroll.employeeId);

  return {
    ...employee,
    ...topPayroll,
  };
};

/**
 * Tính tổng giờ làm của nhân viên trong tháng
 */
export const getTotalHoursByEmployeeAndMonth = (data, employeeId, month, year) => {
  return data.attendance
    .filter((att) => {
      const attDate = new Date(att.date);
      return (
        att.employeeId === employeeId &&
        attDate.getMonth() + 1 === month &&
        attDate.getFullYear() === year
      );
    })
    .reduce((sum, att) => sum + att.workHours, 0);
};

/**
 * Tính tổng số phiếu/sản phẩm của nhân viên trong tháng
 * Gồm cả productQuantity (8h) và productQuantityOT (OT)
 */
export const getTotalProductsByEmployeeAndMonth = (data, employeeId, month, year) => {
  return data.attendance
    .filter((att) => {
      const attDate = new Date(att.date);
      return (
        att.employeeId === employeeId &&
        attDate.getMonth() + 1 === month &&
        attDate.getFullYear() === year
      );
    })
    .reduce((sum, att) => sum + (att.productQuantity || 0) + (att.productQuantityOT || 0), 0);
};

/**
 * Tính lương theo giờ làm (cho Manager, Leader, Support)
 * - Đủ 8 tiếng: baseSalary
 * - Vượt quá 8 tiếng: baseSalary + (hourlyRate × giờ_vượt × 1.4)
 */
export const calculateSalaryByHours = (totalHours, hourlyRate = 40000) => {
  if (totalHours <= 8) {
    return Math.floor(totalHours * hourlyRate);
  }
  
  // Tính lương 8 tiếng cơ bản + phần vượt với hệ số 1.4
  const baseHours = 8;
  const overtimeHours = totalHours - baseHours;
  const baseSalary = Math.floor(baseHours * hourlyRate);
  const overtimeSalary = Math.floor(overtimeHours * hourlyRate * 1.4);
  
  return baseSalary + overtimeSalary;
};

/**
 * Tính lương theo sản phẩm/KPI (cho Employee)
 * Công thức: Lương = (180k / 650) × KPI_8h + (180k / 650) × KPI_OT × 1.4
 * KPI mặc định tổng = 650
 * 
 * Ví dụ:
 * - KPI 8 tiếng = 500
 * - KPI OT = 150
 * - Tổng KPI = 650
 * - Lương = (180k/650) × 500 + (180k/650) × 150 × 1.4
 */
/**
 * Map unit thành KPI tương ứng
 */
const UNIT_KPI_MAP = {
  "Nhập liệu": 650,
  "Check nhập liệu": 900,
  "Scan": 1700,
  "Check scan": 2200,
};

/**
 * Tính lương theo sản phẩm/KPI với unit khác nhau
 * @param {Array} attendanceRecords - Danh sách chấm công của tháng
 * @returns {Number} Tổng lương được tính toán
 */
export const calculateSalaryByProductsWithUnit = (attendanceRecords) => {
  const dailyRate = 180000; // 180k một ngày
  const standardHours = 8;
  
  if (!attendanceRecords || attendanceRecords.length === 0) return 0;

  let totalSalary = 0;

  attendanceRecords.forEach((record) => {
    const { productQuantity = 0, productQuantityOT = 0, unit = "Nhập liệu", workHours = 0 } = record;
    
    // Tổng sản phẩm = sản phẩm làm trong 8h + sản phẩm làm trong OT
    const totalProducts = productQuantity + productQuantityOT;
    if (totalProducts === 0) return;

    // Lấy KPI tương ứng với unit
    const kpi = UNIT_KPI_MAP[unit] || 650;
    const ratePerKPI = dailyRate / kpi;

    // Tính lương dựa trên giờ làm
    let daySalary = 0;
    if (workHours <= standardHours) {
      // Không có OT - tất cả sản phẩm được tính trong 8h
      daySalary = Math.floor(ratePerKPI * totalProducts);
    } else {
      // Có OT - tính riêng từng phần
      // productQuantity: lương bình thường
      const salary8h = Math.floor(ratePerKPI * productQuantity);
      // productQuantityOT: lương OT (hệ số 1.4)
      const salaryOT = Math.floor(ratePerKPI * productQuantityOT * 1.4);

      daySalary = salary8h + salaryOT;
    }

    totalSalary += daySalary;
  });

  return totalSalary;
};

export const calculateSalaryByProducts = (totalHours, totalProducts) => {
  const dailyRate = 180000; // 180k một ngày
  const standardHours = 8;
  const defaultKPI = 650; // KPI mặc định tổng
  
  // Nếu không có sản phẩm
  if (totalProducts === 0 || !totalProducts) return 0;
  
  // Chia KPI theo tỉ lệ giờ làm (8h vs OT)
  let kpiIn8Hours = 0;
  let kpiInOT = 0;
  
  if (totalHours <= standardHours) {
    // Không có OT, tất cả KPI là trong 8 tiếng
    kpiIn8Hours = totalProducts;
    kpiInOT = 0;
  } else {
    // Có OT, chia KPI tỉ lệ với giờ làm
    const ratio8h = standardHours / totalHours;
    
    kpiIn8Hours = Math.floor(totalProducts * ratio8h);
    kpiInOT = totalProducts - kpiIn8Hours;
  }
  
  // Tính lương = (180k / 650) × kpi_8h + (180k / 650) × kpi_OT × 1.4
  const ratePerKPI = dailyRate / defaultKPI;
  const salary8h = Math.floor(ratePerKPI * kpiIn8Hours);
  const salaryOT = Math.floor(ratePerKPI * kpiInOT * 1.4);
  
  return salary8h + salaryOT;
};

/**
 * Tính lương tháng dựa trên chức vụ
 * - Manager, Leader, Support: Tính theo giờ (40,000/giờ)
 * - Employee: Tính theo KPI và hệ số OT (180k/ngày)
 */
export const calculateMonthlyPayroll = (data, employeeId, month, year, bonus = 0, deduction = 0) => {
  const employee = getEmployeeById(data, employeeId);
  if (!employee) return null;

  const monthStr = `${String(month).padStart(2, "0")}/${year}`;
  let baseSalary = 0;
  let totalHours = 0;
  let totalProducts = 0;

  // Kiểm tra chức vụ
  if (["Manager", "Leader", "Support"].includes(employee.role)) {
    // Tính lương theo giờ làm
    totalHours = getTotalHoursByEmployeeAndMonth(data, employeeId, month, year);
    baseSalary = calculateSalaryByHours(totalHours);
  } else if (employee.role === "Employee") {
    // Tính lương theo sản phẩm/KPI với unit khác nhau
    totalHours = getTotalHoursByEmployeeAndMonth(data, employeeId, month, year);
    totalProducts = getTotalProductsByEmployeeAndMonth(data, employeeId, month, year);
    
    // Lấy danh sách attendance để tính lương theo unit
    const attendanceRecords = data.attendance.filter((att) => {
      const attDate = new Date(att.date);
      return (
        att.employeeId === employeeId &&
        attDate.getMonth() + 1 === month &&
        attDate.getFullYear() === year
      );
    });
    baseSalary = calculateSalaryByProductsWithUnit(attendanceRecords);
  }

  const netSalary = baseSalary + bonus - deduction;

  return {
    employeeId,
    month: monthStr,
    baseSalary,
    bonus,
    deduction,
    netSalary: Math.max(netSalary, 0),
    totalHours,
    totalProducts,
    status: "Đang xử lý",
    paidDate: null,
  };
};

/**
 * Cập nhật bảng lương theo giờ làm thực tế
 */
export const updatePayrollByHours = (data, employeeId, month, year, bonus = 0, deduction = 0) => {
  const newPayroll = calculateMonthlyPayroll(data, employeeId, month, year, bonus, deduction);
  if (!newPayroll) return data;

  // Kiểm tra bảng lương tháng này đã tồn tại chưa
  const existingIndex = data.payrolls.findIndex(
    (p) => p.employeeId === employeeId && p.month === newPayroll.month
  );

  if (existingIndex >= 0) {
    // Cập nhật bảng lương hiện tại
    const updatedPayrolls = [...data.payrolls];
    updatedPayrolls[existingIndex] = {
      ...updatedPayrolls[existingIndex],
      ...newPayroll,
    };
    return { ...data, payrolls: updatedPayrolls };
  } else {
    // Thêm bảng lương mới
    return addPayroll(data, newPayroll);
  }
};

/**
 * Lấy vai trò/position của nhân viên từ payroll
 * @param {Object} data - Database object
 * @param {Number} payrollId - ID của bảng lương
 * @returns {Object|null} - {role, position, name, email, phone, department} hoặc null nếu không tìm thấy
 */
export const getEmployeeRoleByPayroll = (data, payrollId) => {
  const payroll = getPayrollById(data, payrollId);
  if (!payroll) return null;

  const employee = getEmployeeById(data, payroll.employeeId);
  if (!employee) return null;

  return {
    role: employee.role,
    position: employee.position,
    name: employee.name,
    email: employee.email,
    phone: employee.phone,
    department: employee.department,
  };
};

/**
 * Lấy đầy đủ thông tin nhân viên từ payroll ID
 * @param {Object} data - Database object
 * @param {Number} payrollId - ID của bảng lương
 * @returns {Object|null} - Thông tin nhân viên đầy đủ hoặc null
 */
export const getEmployeeDetailsByPayroll = (data, payrollId) => {
  const payroll = getPayrollById(data, payrollId);
  if (!payroll) return null;

  const employee = getEmployeeById(data, payroll.employeeId);
  if (!employee) return null;

  return {
    ...employee,
    payrollData: {
      month: payroll.month,
      baseSalary: payroll.baseSalary,
      bonus: payroll.bonus,
      deduction: payroll.deduction,
      netSalary: payroll.netSalary,
      status: payroll.status,
    },
  };
};

export default initialData;
