# 📁 Hướng Dẫn Cấu Trúc - Thư Mục & Tổ Chức Code

## 🎯 Mục Đích File Này

File này giải thích **chi tiết** về:
1. **Cấu trúc thư mục** (folder organization) - Tại sao lại chia thành những thư mục này?
2. **Tổ chức code** (code organization) - File nào nằm ở đâu & tại sao?
3. **Mối quan hệ** - Các file/folder liên quan với nhau như thế nào?
4. **Flow dữ liệu** - Dữ liệu chảy qua các thư mục theo thứ tự nào?

---

## 🏗️ Cấu Trúc Thư Mục - Toàn Cảnh

```
QLHS/
│
├── 📚 Tài Liệu & Config (Root files)
│   ├── package.json                  # Danh sách package (React, Redux, etc)
│   ├── vite.config.js                # Config build tool (Vite)
│   ├── tailwind.config.js            # Config Tailwind CSS
│   ├── eslint.config.js              # Config linter
│   ├── index.html                    # HTML chính
│   ├── README.md                     # Mô tả project
│   └── 📖 Documentation Files (Hướng dẫn)
│       ├── HUONG_DAN_SU_DUNG.md      # Hướng dẫn dùng cho người dùng
│       ├── DATABASE_GUIDE_NEW.md     # Hướng dẫn database cho developer
│       ├── TECHNICAL_ARCHITECTURE.md # Kiến trúc hệ thống cho tech lead
│       ├── TECHNOLOGY_GUIDE.md       # Giải thích công nghệ dùng
│       ├── STRUCTURE_GUIDE.md        # File này - giải thích cấu trúc
│       ├── README_DOCS.md            # Index của tất cả tài liệu
│       └── UPDATES_SUMMARY.md        # Tóm tắt các thay đổi
│
├── 📂 public/                        # Static files (ảnh, font, v.v)
│   └── images, icons, etc
│
└── 📂 src/                           # ⭐ CODE CHÍNH - Toàn bộ app logic
    │
    ├── 📦 data/
    │   └── data.js                   # 🔴 DATABASE TẬP TRUNG
    │
    ├── 🎨 redux/                     # State management
    │   ├── store.js                  # Tạo Redux store
    │   └── slices/
    │       └── userInfo.js           # User login state
    │
    ├── 🛣️ routes/                    # Routing & navigation
    │   ├── index.jsx                 # Định nghĩa tất cả route
    │   └── ProtectedRoute.jsx        # Component bảo vệ route
    │
    ├── 🎭 layout/                    # Layout components
    │   ├── Header.jsx                # Header (top bar)
    │   ├── Sidebar.jsx               # Sidebar (navigation)
    │   └── Layout.jsx                # Main layout wrapper
    │
    ├── 📄 page/                      # Các trang chính
    │   ├── Auth/
    │   │   └── index.jsx             # 🔐 Login page
    │   │
    │   ├── Home/
    │   │   └── index.jsx             # 📊 Dashboard & thống kê
    │   │
    │   ├── Employee/
    │   │   ├── index.jsx             # Wrapper cho employee pages
    │   │   ├── EmployeesList.jsx     # 👥 Danh sách nhân viên
    │   │   ├── AttendanceList.jsx    # ⏰ Chấm công
    │   │   └── PayrollList.jsx       # 💰 Quản lý lương
    │   │
    │   ├── Documents/
    │   │   └── index.jsx             # 📋 Quản lý tài liệu
    │   │
    │   └── UserProfile/
    │       ├── index.jsx             # Wrapper
    │       └── UserProfile.jsx       # 👤 Hồ sơ người dùng
    │
    ├── 🧩 components/                # Reusable UI components
    │   ├── ui/
    │   │   ├── Button/
    │   │   │   └── index.jsx         # Button component
    │   │   │
    │   │   ├── Card/
    │   │   │   └── index.jsx         # Card component
    │   │   │
    │   │   ├── Field/
    │   │   │   └── index.jsx         # Input field component
    │   │   │
    │   │   ├── Model/                # Modal/Dialog components
    │   │   │   ├── ModelAddEmployee.jsx      # Add employee modal
    │   │   │   ├── ModelEditEmployee.jsx     # Edit employee modal
    │   │   │   ├── ModelDeleteEmployee.jsx   # Delete confirm modal
    │   │   │   ├── ModelAddPayroll.jsx       # Add payroll modal
    │   │   │   ├── ModelUpdatePayroll.jsx    # Edit payroll modal
    │   │   │   ├── ModelPayrollDetail.jsx    # View payroll details
    │   │   │   ├── ModelDetailEmployee.jsx   # View employee details
    │   │   │   ├── CheckInModal.jsx          # Check-in modal
    │   │   │   └── AttendanceDetailModal.jsx # View attendance details
    │   │   │
    │   │   ├── Tag/
    │   │   │   └── index.jsx         # Tag/badge component
    │   │   │
    │   │   ├── Tables/
    │   │   │   ├── Header.jsx        # Table header
    │   │   │   ├── AttendanceTable.jsx
    │   │   │   └── Body/
    │   │   │       ├── AttendanceBody.jsx
    │   │   │       ├── EmployeesBody.jsx
    │   │   │       ├── PayrollBody.jsx
    │   │   │       └── DocumentsBody.jsx
    │   │   │
    │   │   └── UserDropdown.jsx      # User menu dropdown
    │   │
    │   └── common/
    │       ├── PageBreadcrumb.jsx    # Breadcrumb navigation
    │       └── Modal.jsx             # Generic modal wrapper
    │
    ├── 🎯 contexts/                  # React Context (không dùng trong version này)
    │   └── Sidebar/
    │       ├── SidebarContext.jsx
    │       └── SidebarProvider.jsx
    │
    ├── 🎨 style/
    │   └── index.css                 # Global styles + custom animations
    │
    ├── main.jsx                      # 🔴 ENTRY POINT - Khởi động app
    └── App.jsx                       # App component chính
```

---

## 📊 Giải Thích Chi Tiết - Từng Thư Mục

### 1️⃣ **src/data/** - ⭐ DATABASE TẬP TRUNG

#### Mục đích
- Lưu trữ **tất cả dữ liệu** của hệ thống
- Cung cấp **CRUD functions** để thêm, sửa, xóa dữ liệu
- Là **data layer** - nơi tất cả logic xử lý dữ liệu nằm ở

#### File: `data.js`
```javascript
const initialData = {
  // 👥 Nhân viên
  employees: [
    { id: 1, name: "A", email: "a@gmail.com", ... },
    { id: 2, name: "B", email: "b@gmail.com", ... }
  ],
  
  // 💰 Bảng lương
  payrolls: [
    { id: 1, employeeId: 1, month: "12/2025", netSalary: 16500000, ... }
  ],
  
  // ⏰ Chấm công
  attendance: [
    { id: 1, employeeId: 1, date: "2025-12-15", workHours: 9.5, ... }
  ],
  
  // 📋 Tài liệu
  documents: [
    { id: 1, employeeId: 1, title: "Hợp đồng", ... }
  ]
};

// 🔴 CRUD Functions - Lấy dữ liệu
getAllEmployees(data)        // Lấy tất cả nhân viên
getEmployeeById(data, id)    // Lấy 1 nhân viên

// 🟢 CRUD Functions - Thêm dữ liệu
addEmployee(data, newEmployee)    // Thêm nhân viên

// 🟡 CRUD Functions - Sửa dữ liệu
updateEmployee(data, id, changes) // Sửa nhân viên

// 🔵 CRUD Functions - Xóa dữ liệu
deleteEmployee(data, id)          // Xóa nhân viên

// ⭐ CALCULATION Functions - Tính toán
calculateSalaryByHours(baseSalary, workHours, bonus, deduction)
updatePayrollByHours(data, month, year)
```

#### Dùng trong component như thế nào
```javascript
// ✅ Đúng cách
import { getAllEmployees, addEmployee } from '../../data/data';

// Component
const [data, setData] = useState(initialData);

const handleAddEmployee = (newEmp) => {
  const newData = addEmployee(data, newEmp); // Call function
  setData(newData);                          // Update state
};
```

---

### 2️⃣ **src/redux/** - 🎨 STATE MANAGEMENT

#### Mục đích
- Quản lý **global state** (user login info)
- Thay vì prop drilling, dùng Redux để share state
- Persist user state vào localStorage (không cần reload lại login)

#### Cấu trúc
```
redux/
├── store.js
│   - Tạo Redux store
│   - Config redux-persist (lưu vào localStorage)
│   - Export: store, persistor
│
└── slices/
    └── userInfo.js
        - Redux slice (state + reducers + selectors)
        - Quản lý: id, name, email, isLoggedIn
        - Actions: setUser (login), clearUser (logout), updateUserInfo
```

#### Ví dụ sử dụng

**1. Lưu user khi login:**
```javascript
// File: src/page/Auth/index.jsx
const dispatch = useDispatch();

dispatch(setUser({
  id: 1,
  name: "Nguyễn Văn A",
  email: "a@gmail.com",
  isLoggedIn: true
}));
// Redux state bây giờ có user info
// localStorage["persist:root"] tự động được cập nhật
```

**2. Lấy user info:**
```javascript
// File: src/layout/Header.jsx
const userInfo = useSelector(userInfoSelector);

<span>{userInfo.name}</span>  // Hiển thị "Nguyễn Văn A"
```

**3. Logout:**
```javascript
// File: src/components/ui/UserDropdown.jsx
const dispatch = useDispatch();

dispatch(clearUser());
localStorage.removeItem("persist:root");
navigate("/login");
```

---

### 3️⃣ **src/routes/** - 🛣️ ROUTING & NAVIGATION

#### Mục đích
- Định nghĩa tất cả **routes** (đường dẫn)
- Bảo vệ route (ProtectedRoute)
- Kiểm tra user đã login chưa trước khi vào trang

#### File: `index.jsx`
```javascript
<Routes>
  {/* 🔓 PUBLIC - Không cần login */}
  <Route path="/login" element={<LoginPage />} />
  
  {/* 🔐 PROTECTED - Cần login */}
  <Route path="/" element={<ProtectedRoute />}>
    <Route index element={<HomePage />} />
    <Route path="/employees" element={<EmployeesList />} />
    <Route path="/payroll" element={<PayrollList />} />
    <Route path="/attendance" element={<AttendanceList />} />
    <Route path="/documents" element={<DocumentsList />} />
    <Route path="/profile" element={<UserProfile />} />
  </Route>
</Routes>
```

#### File: `ProtectedRoute.jsx`
```javascript
// Component này bảo vệ route
// Nếu user chưa login → hiển thị warning 2 giây → redirect /login

const ProtectedRoute = () => {
  const userInfo = useSelector(userInfoSelector);
  const navigate = useNavigate();
  
  if (!userInfo.isLoggedIn) {
    // Hiển thị warning UI
    // Sau 2 giây: navigate("/login")
  }
  
  return <Outlet />; // Cho phép vào route
};
```

---

### 4️⃣ **src/layout/** - 🎭 LAYOUT COMPONENTS

#### Mục đích
- Định nghĩa **layout chung** cho toàn app
- Header, Sidebar, Footer (nếu có)
- Các component này lặp lại trên **tất cả trang**

#### File: `Header.jsx`
```javascript
// Header nằm ở top của mỗi trang
// Hiển thị:
// - Logo
// - User name + avatar
// - Logout button
// - Thay đổi theme (nếu có)

import { useSelector } from 'react-redux';
import { userInfoSelector } from '../../redux/slices/userInfo';

const Header = () => {
  const userInfo = useSelector(userInfoSelector);
  
  return (
    <div className="header">
      <h1>QLHS</h1>
      <div className="user-info">
        <span>{userInfo.name}</span>
        <UserDropdown />
      </div>
    </div>
  );
};
```

#### File: `Sidebar.jsx`
```javascript
// Sidebar nằm ở trái, hiển thị menu navigation
// Link đến các trang:
// - Home
// - Employee
// - Payroll
// - Attendance
// - Documents
// - Profile
```

#### File: `Layout.jsx`
```javascript
// Layout wrapper - đặt Header + Sidebar + Content

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="content-wrapper">
        <Sidebar />
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
};
```

---

### 5️⃣ **src/page/** - 📄 CÁC TRANG CHÍNH

#### Mục đích
- Định nghĩa tất cả **trang chính** của app
- Mỗi trang thường có:
  - Danh sách dữ liệu (table)
  - Nút thêm/sửa/xóa
  - Modal forms

#### Cấu trúc mỗi trang
```
page/Auth/
├── index.jsx           # 🔐 Login page

page/Home/
├── index.jsx           # 📊 Dashboard + thống kê

page/Employee/
├── index.jsx           # Wrapper (Layout + routes)
├── EmployeesList.jsx   # 👥 Danh sách nhân viên
├── AttendanceList.jsx  # ⏰ Chấm công
└── PayrollList.jsx     # 💰 Quản lý lương
```

#### Ví dụ: `EmployeesList.jsx`
```javascript
import { useState } from 'react';
import { getAllEmployees, addEmployee, updateEmployee, deleteEmployee } 
  from '../../data/data';
import ModelAddEmployee from '../../components/ui/Model/ModelAddEmployee';
import ModelEditEmployee from '../../components/ui/Model/ModelEditEmployee';

const EmployeesList = () => {
  // 📊 State
  const [data, setData] = useState(initialData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  // 🔴 Hàm xử lý
  const handleAddEmployee = (newEmp) => {
    const newData = addEmployee(data, newEmp);
    setData(newData); // Table tự động update
    setShowAddModal(false);
  };
  
  const handleEditEmployee = (id, changes) => {
    const newData = updateEmployee(data, id, changes);
    setData(newData);
  };
  
  const handleDeleteEmployee = (id) => {
    const newData = deleteEmployee(data, id);
    setData(newData);
  };
  
  // 🎨 Render
  return (
    <div className="employees-page">
      <button onClick={() => setShowAddModal(true)}>
        ➕ Thêm nhân viên
      </button>
      
      <EmployeesTable
        employees={data.employees}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
      />
      
      {showAddModal && (
        <ModelAddEmployee
          onSubmit={handleAddEmployee}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};
```

---

### 6️⃣ **src/components/** - 🧩 REUSABLE COMPONENTS

#### Mục đích
- Chứa các **UI components tái sử dụng**
- Button, Card, Field, Modal, Table, v.v.
- Chia thành: `ui/` (UI base) và `common/` (common components)

#### Ví dụ: `components/ui/Button/index.jsx`
```javascript
// Reusable Button component

const Button = ({ 
  text, 
  onClick, 
  variant = "primary", 
  disabled = false 
}) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
```

**Dùng ở nhiều chỗ:**
```javascript
// page/Employee/EmployeesList.jsx
<Button 
  text="➕ Thêm nhân viên" 
  onClick={handleAdd}
/>

// page/Payroll/PayrollList.jsx
<Button 
  text="💰 Cập nhật lương" 
  onClick={handleUpdate}
/>
```

#### Ví dụ: `components/ui/Model/ModelAddEmployee.jsx`
```javascript
// Modal để thêm nhân viên

const ModelAddEmployee = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: ""
  });
  
  const handleSubmit = () => {
    // Validate
    if (!formData.name || !formData.email) return;
    
    // Submit
    onSubmit(formData);
    onClose();
  };
  
  return (
    <Modal isOpen={true} onClose={onClose}>
      <h2>Thêm Nhân Viên</h2>
      <Input
        placeholder="Tên"
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      <Input
        placeholder="Email"
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      {/* More inputs... */}
      <Button text="Lưu" onClick={handleSubmit} />
    </Modal>
  );
};
```

---

### 7️⃣ **src/style/** - 🎨 STYLING & ANIMATIONS

#### File: `index.css`
```css
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
  background-color: #f5f5f5;
}

/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-in;
}

.slide-down {
  animation: slideDown 0.3s ease-in;
}
```

---

## 🔄 FLOW DỮ LIỆU - Dữ Liệu Chảy Qua Các Thư Mục Như Thế Nào?

### Scenario: Thêm Nhân Viên Mới

```
1️⃣ User Interaction
   └─> Trang EmployeesList.jsx - User click "Thêm nhân viên"

2️⃣ Modal Mở
   └─> ModelAddEmployee.jsx - Hiển thị form
   └─> User fill: name, email, phone, password, role

3️⃣ Form Submit
   └─> handleAddEmployee() chạy ở EmployeesList.jsx

4️⃣ Data Layer
   └─> import { addEmployee } from 'src/data/data.js'
   └─> const newData = addEmployee(data, newEmployee)
   └─> data.js trả về object: { employees: [..., newEmp], payrolls, ... }

5️⃣ State Update
   └─> setData(newData)
   └─> React re-render EmployeesList

6️⃣ UI Update
   └─> components/ui/Tables/Body/EmployeesBody.jsx
   └─> Hiển thị bảng với nhân viên mới
   └─> Dùng Tailwind CSS để style

7️⃣ Storage (Optional)
   └─> Nếu dùng Redux, có thể persist vào localStorage
   └─> redux-persist tự động lưu state
```

### Scenario: Login

```
1️⃣ User Visit
   └─> routes/index.jsx - Chuyển hướng /login

2️⃣ Login Page
   └─> page/Auth/index.jsx - Hiển thị form login

3️⃣ User Input
   └─> User nhập: email, password

4️⃣ Validate
   └─> import { getAllEmployees } from 'src/data/data.js'
   └─> Tìm employee với email & password khớp

5️⃣ Dispatch Redux
   └─> dispatch(setUser(userObject))
   └─> Redux state: { userInfo: {...}, isLoggedIn: true }

6️⃣ Redux Persist
   └─> redux-persist tự động lưu vào localStorage["persist:root"]
   └─> Nếu reload trang, state sẽ được restore

7️⃣ Navigate Home
   └─> navigate("/")
   └─> ProtectedRoute check isLoggedIn = true ✅
   └─> Cho phép vào HomePage

8️⃣ Header Update
   └─> layout/Header.jsx
   └─> useSelector(userInfoSelector) lấy user info
   └─> Hiển thị "Xin chào, Nguyễn Văn A"
```

---

## 📚 TÓNG HỢP - BẢNG SO SÁNH

| Thư Mục | Mục Đích | File Chính | Dùng Cho |
|---------|---------|-----------|----------|
| **data/** | Database tập trung | data.js | CRUD, Calculate |
| **redux/** | Global state | store.js, userInfo.js | User login state |
| **routes/** | Routing & protection | index.jsx, ProtectedRoute.jsx | Navigation, Auth |
| **layout/** | Layout chung | Header.jsx, Sidebar.jsx | UI structure |
| **page/** | Các trang chính | EmployeesList, PayrollList | Main pages |
| **components/** | UI reusable | Button, Card, Modal | UI building blocks |
| **style/** | Styling & animation | index.css | Global styles |
| **contexts/** | React Context | SidebarContext | Shared state (unused) |

---

## 🎯 KHI NÀO THÊM FILE MỚI?

### ✅ Thêm trang mới
→ Tạo file trong `src/page/NewPage/index.jsx`
- VD: Trang báo cáo → `src/page/Reports/index.jsx`

### ✅ Thêm component tái sử dụng
→ Tạo file trong `src/components/ui/NewComponent/index.jsx`
- VD: Component Avatar → `src/components/ui/Avatar/index.jsx`

### ✅ Thêm modal mới
→ Tạo file trong `src/components/ui/Model/ModelNewFeature.jsx`
- VD: Modal báo cáo → `src/components/ui/Model/ModelReport.jsx`

### ✅ Thêm table body mới
→ Tạo file trong `src/components/ui/Tables/Body/NewBody.jsx`
- VD: ReportsBody → `src/components/ui/Tables/Body/ReportsBody.jsx`

### ✅ Thêm data entity mới
→ Thêm vào `src/data/data.js`
```javascript
const initialData = {
  employees: [...],
  payrolls: [...],
  attendance: [...],
  documents: [...],
  reports: [...]  // ✅ Entity mới
};

// Thêm CRUD functions
export const getAllReports = (data) => data.reports;
export const addReport = (data, newReport) => ({ ...data, reports: [...data.reports, newReport] });
// ...
```

### ✅ Thêm Redux slice mới
→ Tạo file `src/redux/slices/newSlice.js`
- VD: Theme slice → `src/redux/slices/theme.js`
- Rồi import vào `src/redux/store.js`

---

## 💡 BEST PRACTICES

### 1️⃣ **One Responsibility**
- Mỗi file chỉ làm **một việc**
- EmployeesList.jsx chỉ hiển thị danh sách
- ModelAddEmployee.jsx chỉ xử lý add form
- data.js chỉ CRUD logic

### 2️⃣ **Import/Export Rõ Ràng**
```javascript
// ✅ Rõ ràng
import { addEmployee, getAllEmployees } from '../../data/data';

// ❌ Mơ hồ
import * as dataFunctions from '../../data/data';
```

### 3️⃣ **Folder Organization**
```javascript
// ✅ Dễ tìm
src/
├── page/Auth/index.jsx
├── page/Employee/EmployeesList.jsx
├── components/ui/Model/ModelAddEmployee.jsx

// ❌ Khó tìm
src/
├── pages/Auth.jsx
├── pages/EmployeesList.jsx
├── modals/AddEmployee.jsx
```

### 4️⃣ **Use Index.jsx for Imports**
```javascript
// ✅ Dễ import
import Button from '../../components/ui/Button';
// Tự động tìm Button/index.jsx

// ❌ Dài dòng
import Button from '../../components/ui/Button/Button.jsx';
```

---

## 🚀 TÓNG HỢP

**Cấu trúc folder giúp:**
- 🏗️ Organize code một cách logic
- 🔍 Dễ tìm file cần sửa
- ♻️ Tái sử dụng code (components)
- 🧹 Dễ bảo trì (mỗi thư mục một trách nhiệm)
- 📈 Dễ mở rộng (thêm feature mới)

**Các folder chính:**
1. **data/** - Business logic (CRUD, Calculate)
2. **redux/** - Global state (User login)
3. **routes/** - Navigation & Protection
4. **layout/** - Layout chung (Header, Sidebar)
5. **page/** - Trang chính (Home, Employee, Payroll)
6. **components/** - UI building blocks (Button, Modal, Table)
7. **style/** - Global styling & animations

---

**Last Updated**: 23/01/2026  
**Language**: Tiếng Việt  
**Version**: 1.0 - Structure Guide
