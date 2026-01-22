# 🏛️ Technical Architecture - Hệ Thống Quản Lý Nhân Sự

## 📋 Mục Lục
1. [Tổng Quan Hệ Thống](#tổng-quan)
2. [Công Nghệ Sử Dụng](#công-nghệ)
3. [Architecture Overview](#architecture)
4. [Data Flow](#data-flow)
5. [State Management](#state-management)
6. [Authentication Flow](#authentication)
7. [Data Operations](#data-operations)
8. [Điểm Đầu Đến Điểm Cuối Dữ Liệu](#điểm-đầu-cuối)

---

## 📊 Tổng Quan Hệ Thống {#tổng-quan}

### Mục Đích
Xây dựng một hệ thống quản lý nhân sự **toàn diện**, **tự động hóa** với:
- ✅ Quản lý nhân viên (CRUD)
- ✅ Tính lương **tự động** từ giờ làm thực tế
- ✅ Chấm công & tracking giờ làm
- ✅ Authentication & Authorization
- ✅ Dashboard thống kê

### Đặc Điểm Chính
1. **Dữ liệu tập trung** - Tất cả lưu trong `src/data/data.js`
2. **Tính toán tự động** - Lương = (lương cơ bản ÷ 176) × giờ thực tế
3. **State management** - Redux + redux-persist (localStorage)
4. **Authentication** - Email/password, lưu vào Redux
5. **Route protection** - Chỉ logged-in user mới vào được
6. **Data persistence** - Tự động lưu vào localStorage

---

## 🛠️ Công Nghệ Sử Dụng {#công-nghệ}

### Frontend Stack

#### **React 18+** → Xây dựng UI & quản lý component state
- **useState**: Quản lý state local (form data, modal open/close)
  - VD: `const [employees, setEmployees] = useState(initialData.employees)`
  - Dùng để: Lưu dữ liệu tạm trong component, hiển thị/ẩn modal
- **useEffect**: Chạy code khi component mount/unmount
  - VD: `useEffect(() => { loadData() }, [])` chạy 1 lần khi load trang
  - Dùng để: Fetch data từ localStorage, setup event listeners
- **Hooks**: Viết custom logic tái sử dụng

#### **React Router DOM v6** → Điều hướng giữa các trang
- **BrowserRouter**: Wrapper chính cho routing
  - Nằm ở [src/main.jsx](src/main.jsx) bọc toàn bộ `<App />`
- **Routes, Route**: Định nghĩa path → component
  - [src/routes/index.jsx](src/routes/index.jsx): Liệt kê tất cả route
  - VD: `<Route path="/employees" element={<EmployeesList />} />`
- **Navigate**: Redirect đến trang khác
  - VD: `navigate("/login")` quay về login nếu chưa đăng nhập
- **ProtectedRoute**: Custom component bảo vệ route
  - [src/routes/ProtectedRoute.jsx](src/routes/ProtectedRoute.jsx): Kiểm tra `isLoggedIn`
  - Nếu chưa login → hiển thị warning 2 giây → redirect `/login`

#### **Redux Toolkit + React-Redux** → Quản lý global state
- **Nằm ở**: [src/redux/](src/redux/) folder
- **Làm gì**: Lưu trạng thái login globally (không cần prop drilling)
- **Cấu trúc**:
  ```
  src/redux/
  ├── store.js              → Tạo Redux store + redux-persist config
  └── slices/
      └── userInfo.js       → Redux slice cho user login state
  ```
- **Cách dùng**:
  ```javascript
  // 1️⃣ Trong Login page: Lưu user vào Redux khi login
  dispatch(setUser(userObject))
  
  // 2️⃣ Trong Header: Lấy user từ Redux để hiển thị
  const userInfo = useSelector(userInfoSelector)
  
  // 3️⃣ Trong Logout: Xóa user từ Redux
  dispatch(clearUser())
  ```
- **Selectors** (file [src/redux/slices/userInfo.js](src/redux/slices/userInfo.js)):
  ```javascript
  export const userInfoSelector = (state) => state.userInfo
  // Dùng: const user = useSelector(userInfoSelector)
  ```

#### **Redux Persist** → Lưu Redux state vào localStorage
- **Nằm ở**: [src/redux/store.js](src/redux/store.js) + [src/main.jsx](src/main.jsx)
- **Làm gì**: Tự động lưu Redux state vào `localStorage` khi state thay đổi
- **Cấu hình**:
  ```javascript
  const persistConfig = {
    key: "root",              // Key trong localStorage
    storage,                  // localStorage (not sessionStorage)
    whitelist: ["userInfo"]   // Chỉ persist userInfo slice
  };
  const persistor = persistStore(store);
  ```
- **Dùng trong main.jsx**:
  ```jsx
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
  ```
- **Kết quả**: Khi tải lại trang → Redux state được restore từ localStorage

#### **Tailwind CSS** → Styling UI components
- **Nằm ở**: [tailwind.config.js](tailwind.config.js)
- **Làm gì**: Cung cấp classes để style (bg-blue-500, p-4, rounded-lg, etc)
- **Dùng**:
  - Classes: `<div className="bg-gradient-to-r from-blue-50 to-pink-50">`
  - Responsive: `<div className="md:flex lg:grid-cols-3">`
  - Animation: Custom animation trong [src/style/index.css](src/style/index.css)
```

### Architecture Pattern
```
Component-based Architecture
├── Pages (Presentational)
├── Components (Reusable UI)
├── Contexts (Shared state)
├── Redux (Global state)
└── Services (Data layer)
```

---

## 🏗️ Architecture Overview {#architecture}

### Directory Structure
```
src/
├── data/
│   └── data.js                    # 🔴 Dữ liệu tập trung (CRUD functions)
│
├── redux/
│   ├── store.js                   # Redux store config + persistor
│   └── slices/
│       └── userInfo.js            # User authentication state
│
├── routes/
│   ├── index.jsx                  # Route definitions
│   └── ProtectedRoute.jsx         # Route guard component
│
├── layout/
│   ├── Header.jsx                 # App header + user dropdown
│   ├── Sidebar.jsx                # Navigation sidebar
│   └── Layout.jsx                 # Main layout wrapper
│
├── page/
│   ├── Auth/
│   │   └── index.jsx              # Login page
│   ├── Home/
│   │   └── index.jsx              # Dashboard & statistics
│   ├── Employee/
│   │   ├── index.jsx              # Employee pages wrapper
│   │   ├── EmployeesList.jsx      # List all employees
│   │   ├── AttendanceList.jsx     # Attendance tracking
│   │   └── PayrollList.jsx        # Payroll management
│   ├── Documents/
│   │   └── index.jsx              # Document management
│   └── UserProfile/
│       ├── index.jsx              # Profile wrapper
│       └── UserProfile.jsx        # Edit profile + change password
│
├── components/
│   ├── ui/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Field/
│   │   ├── Model/                 # Modal components (CRUD forms)
│   │   ├── Tag/
│   │   ├── UserDropdown.jsx       # User menu dropdown
│   │   └── Tables/                # Table components
│   └── common/
│       ├── PageBreadcrumb.jsx
│       └── Modal.jsx
│
├── style/
│   └── index.css                  # Global styles
│
├── main.jsx                       # Entry point (Redux + Router)
└── App.jsx                        # Main app component
```

### Layer Architecture
```
┌─────────────────────────────────────────────┐
│           UI LAYER (React Components)       │ ← User interactions
├─────────────────────────────────────────────┤
│         STATE MANAGEMENT LAYER (Redux)      │ ← Global state
│                                             │   (userInfo, theme, etc)
├─────────────────────────────────────────────┤
│      DATA LAYER (src/data/data.js)          │ ← CRUD operations
│                                             │   (addEmployee, updatePayroll)
├─────────────────────────────────────────────┤
│      STORAGE LAYER (localStorage)           │ ← Persistence
│                                             │   (redux-persist)
└─────────────────────────────────────────────┘
```

---

## 🔄 Data Flow {#data-flow}

### Complete Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERACTION                         │
└─────────────────┬───────────────────────────────────────────┘
                  │ (Click "Thêm nhân viên")
                  ▼
┌─────────────────────────────────────────────────────────────┐
│            REACT COMPONENT (EmployeesList.jsx)              │
│  - Form input: name, email, phone, password, role, etc      │
│  - onClick → handleAddEmployee()                            │
└─────────────────┬───────────────────────────────────────────┘
                  │ (Gather form data)
                  ▼
┌─────────────────────────────────────────────────────────────┐
│           DATA LAYER (src/data/data.js)                     │
│  addEmployee(data, newEmployee)                             │
│  - Generate new ID                                          │
│  - Add to employees array                                   │
│  - Return updated data object                               │
└─────────────────┬───────────────────────────────────────────┘
                  │ (Return newData)
                  ▼
┌─────────────────────────────────────────────────────────────┐
│         REACT STATE (useState)                              │
│  setData(newData)                                           │
│  - Component re-renders                                     │
│  - UI updates to show new employee                          │
└─────────────────┬───────────────────────────────────────────┘
                  │ (Auto sync)
                  ▼
┌─────────────────────────────────────────────────────────────┐
│    LOCAL STORAGE (via redux-persist if using Redux)        │
│  JSON.stringify(data) stored in localStorage                │
│  - Persists across page refreshes                           │
│  - Survives browser close/reopen                            │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow dengan Redux (Authentication)

```
┌──────────────────────┐
│   Login Form         │
│ (email, password)    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────────────────────────────┐
│ handleLogin()                                │
│ - Find user in data.employees                │
│ - Validate email & password match            │
└──────────┬───────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────┐
│ dispatch(setUser(userObject))                │
│ (Redux Action)                               │
└──────────┬───────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────┐
│ Redux Reducer (userInfo.js)                  │
│ state = { ...action.payload, isLoggedIn: true }
└──────────┬───────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────┐
│ redux-persist                                │
│ Serialize state → localStorage               │
│ Key: "persist:root"                          │
└──────────┬───────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────┐
│ Browser localStorage                         │
│ {                                            │
│   "persist:root": {                          │
│     "userInfo": {                            │
│       "id": 1,                               │
│       "name": "...",                         │
│       "isLoggedIn": true,                    │
│       ...                                    │
│     }                                        │
│   }                                          │
│ }                                            │
└──────────────────────────────────────────────┘
```

---

## 📦 State Management {#state-management}

### Redux Structure

```javascript
// src/redux/slices/userInfo.js
const initialState = {
  id: null,
  name: "",
  email: "",
  phone: "",
  password: "",          // Lưu mật khẩu (để xác thực)
  role: "",              // Manager, Leader, Support, Employee
  startDate: "",
  status: "",
  avatar: null,
  isLoggedIn: false,      // 🔑 Key flag - Kiểm tra user đã login chưa
};

const actions = {
  setUser,                 // Login
  updateUserInfo,         // Edit profile
  updateUserPassword,     // Change password
  clearUser,              // Logout
};
```

### State Persistence (redux-persist)

```javascript
// src/redux/store.js
const persistConfig = {
  key: "root",
  storage,                    // localStorage
  whitelist: ["userInfo"],    // Persist userInfo slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const persistor = persistStore(store);
```

**Storage Flow:**
```
Redux State
    ↓ (on change)
persistReducer
    ↓
JSON serialize
    ↓
localStorage["persist:root"]
    ↓ (on refresh)
persistor.rehydrate()
    ↓
Redux State restored
```

---

## 🔐 Authentication Flow {#authentication}

### Login Flow

```
1. User visits /login
   ↓
2. Enters email + password
   ↓
3. Click "Đăng nhập" button
   ↓
4. handleLogin() function
   - Search initialData.employees for match
   - Check: email === employee.email && password === employee.password
   ↓
5a. IF FOUND:
   - dispatch(setUser(employeeObject))
   - Redux: state.userInfo = {...employee, isLoggedIn: true}
   - redux-persist: save to localStorage
   - navigate("/")
   - ProtectedRoute check: isLoggedIn = true ✅
   - Show Header with UserDropdown
   ↓
5b. IF NOT FOUND:
   - Show error: "Email hoặc mật khẩu không chính xác!"
   - Stay on /login page
```

### Route Protection Flow

```
User tries to access /employees
   ↓
ProtectedRoute component checks:
if (!userInfo.isLoggedIn) {
   - Show warning message
   - Wait 2 seconds
   - Navigate("/login")
} else {
   - Render <Outlet /> (child routes)
   - User can access page
}
```

### Logout Flow

```
User clicks "Đăng xuất" in UserDropdown
   ↓
handleLogout() function:
1. dispatch(clearUser())
   - Redux: state.userInfo = initialState
2. localStorage.removeItem("persist:root")
   - Clear localStorage data
3. navigate("/login")
   - Redirect to login page
   ↓
ProtectedRoute checks again:
if (!userInfo.isLoggedIn) {
   - Show warning + redirect
}
```

---

## 🔧 Data Operations {#data-operations}

### CRUD Operations Pattern

```javascript
// All functions in src/data/data.js follow this pattern:

// READ
getAllEmployees(data)           // Get all items
getEmployeeById(data, id)       // Get one by ID

// CREATE
addEmployee(data, newItem)      // Add new, return updated data
// Pattern: return [...data.employees, newItem]

// UPDATE
updateEmployee(data, id, changes)  // Update one, return updated data
// Pattern: map employees, replace matching ID with new data

// DELETE
deleteEmployee(data, id)        // Delete one, return updated data
// Pattern: filter employees, remove matching ID
// ⚠️ Also deletes related payrolls, attendance, documents
```

### Example: Salary Calculation

```javascript
// Scenario: Employee "A" works 9.5 hours on 15/12/2025

// Step 1: Chấm công (Attendance)
addAttendance(data, {
  employeeId: 1,
  date: "2025-12-15",
  checkIn: "08:00",
  checkOut: "17:30",
  workHours: 9.5  // Auto-calculated from timestamps
});

// Step 2: Calculate salary from work hours
// In Payroll page, click "🔄 Cập nhật lương theo giờ làm"
updatePayrollByHours(data, month, year)
// For each employee:
//   totalWorkHours = sum of workHours for month
//   hourlyRate = baseSalary / 176
//   netSalary = (baseSalary / 176) * totalWorkHours + bonus - deduction

// Step 3: Update payroll
updatePayroll(data, payrollId, {
  netSalary: calculatedAmount,
  workHours: totalWorkHours
});

// Result in database: salary automatically reflects actual hours worked
```

---

## 🔄 Điểm Đầu Đến Điểm Cuối Dữ Liệu {#điểm-đầu-cuối}

### Lifecycle của Một Employee Record

```
START: User fills form to add employee
  ↓
INPUT: Component (ModelAddEmployee.jsx)
  - Gather: name, email, phone, role, startDate, password
  - Validate: required fields, email format, password min 6 chars
  ↓
PROCESS: handleSubmit()
  - Call: addEmployee(data, newEmployee)
  - src/data/data.js: generate newId, add to array
  - Return: updatedData with new employee
  ↓
STORAGE: setData(updatedData)
  - React state update: state.employees now includes new record
  - Component re-render: table shows new employee
  ↓
PERSISTENCE: (If using Redux - OPTIONAL)
  - redux-persist auto-syncs
  - localStorage["persist:root"] updated
  ↓
DISPLAY: Home page / Employee page
  - getAllEmployees(data) fetches all
  - Component renders in table/list
  - Shows name, email, phone, role, startDate, status, etc
  ↓
UPDATE: User edits employee
  - Click "Sửa" button
  - Modal opens with current data
  - Call: updateEmployee(data, employeeId, changes)
  - src/data/data.js: map array, replace matching record
  - Return: updatedData with modified employee
  - Sync: localStorage updated again
  ↓
DELETE: User clicks "Xóa"
  - Confirm dialog
  - Call: deleteEmployee(data, employeeId)
  - src/data/data.js:
    - Remove from employees array
    - Remove all payrolls with employeeId
    - Remove all attendance with employeeId
    - Remove all documents with employeeId
  - Return: updatedData (cleaned)
  - Display: Employee removed from all tables
  ↓
END: Employee record completely removed from system
```

### Lifecycle của Salary Calculation

```
DAY 1-31 (December 2025):
  ↓
Employee 1: Check in 08:00, Check out 17:30
  └─> Add Attendance Record:
      {id: 1, employeeId: 1, date: "2025-12-15", workHours: 9.5, ...}
  ↓
Employee 1: Check in 08:10, Check out 17:45
  └─> Add Attendance Record:
      {id: 2, employeeId: 1, date: "2025-12-16", workHours: 9.58, ...}
  ↓
... (repeat for each day)
  ↓
END OF MONTH (31/12/2025):
  ↓
Click "🔄 Cập nhật lương theo giờ làm"
  ├─> Calculate totalWorkHours for employee 1:
  │   sum(46.5 hours for December)
  │   ↓
  ├─> Calculate hourlyRate:
  │   baseSalary 15,000,000 ÷ 176 = ~85,227/hour
  │   ↓
  ├─> Calculate netSalary:
  │   (15,000,000 ÷ 176) × 46.5 + 500,000 - 100,000
  │   = 85,227 × 46.5 + 400,000
  │   = 3,962,861 + 400,000
  │   = 4,362,861 ✅
  │   ↓
  ├─> updatePayroll(data, payrollId, {
  │     baseSalary: 15,000,000,
  │     workHours: 46.5,
  │     bonus: 500,000,
  │     deduction: 100,000,
  │     netSalary: 4,362,861,
  │     status: "Đang xử lý"
  │   })
  │   ↓
  └─> Result: Database updated, Payroll table shows correct salary
  ↓
Manager Reviews Payroll (Payroll page):
  - See all payrolls calculated from actual work hours
  - Can edit bonus/deduction if needed
  - Click "Đã thanh toán" to mark as paid
  ↓
Dashboard (Home page):
  - Shows stats:
    * Total salary paid: 4,362,861
    * Pending salary: ...
    * Employee "A": 4,362,861 (highest/lowest, etc)
```

### Complete Data Journey Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER INTERFACE LAYER                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │  Login   │ │ Employee │ │ Payroll  │ │ Dashboard│          │
│  │  Page    │ │  Manager │ │  Tracker │ │   View   │          │
│  └─────┬────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘          │
└────────┼──────────┼────────────┼────────────┼──────────────────┘
         │          │            │            │
         ▼          ▼            ▼            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   REACT COMPONENTS                              │
│  - State management (useState)                                  │
│  - Event handlers (onClick, onSubmit)                           │
│  - Form validation                                              │
│  - Modal/Dialog management                                      │
└──────────────────────┬────────────────────────────────────────┘
                       │ (dispatch actions, call functions)
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│            REDUX + REDUX-PERSIST LAYER                          │
│  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐    │
│  │ userInfo slice │  │  Actions:      │  │ Middleware:   │    │
│  │ (auth state)   │  │ - setUser      │  │ - serialization
│  │                │  │ - clearUser    │  │ - localStorage│    │
│  │ isLoggedIn     │  │ - updateUser   │  │ - hydration   │    │
│  └────────────────┘  └────────────────┘  └───────────────┘    │
└──────────────────────┬────────────────────────────────────────┘
                       │ (for auth only, other data uses local state)
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                   DATA LAYER (src/data/data.js)                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│  │   READ       │ │   CREATE     │ │   UPDATE     │           │
│  │ getAll       │ │ add          │ │ update       │           │
│  │ getById      │ │ (generate ID)│ │ (replace)    │           │
│  │ getByType    │ │              │ │              │           │
│  └──────────────┘ └──────────────┘ └──────────────┘           │
│  ┌──────────────┐ ┌──────────────────────────────────────┐    │
│  │   DELETE     │ │   CALCULATE (Business Logic)        │    │
│  │ delete       │ │ calculateSalary                      │    │
│  │ (cascade)    │ │ calculateWorkHours                   │    │
│  │              │ │ updatePayrollByHours                 │    │
│  └──────────────┘ └──────────────────────────────────────┘    │
└──────────────────────┬────────────────────────────────────────┘
                       │ (return updated data object)
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                   IN-MEMORY STATE                               │
│  - initialData object                                           │
│  - employees[], payrolls[], attendance[], documents[]           │
│  - All data stored in memory (for demo)                         │
└──────────────────────┬────────────────────────────────────────┘
                       │ (can be synced to DB)
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│              BROWSER STORAGE (localStorage)                     │
│  Key: "persist:root"                                            │
│  Value: JSON-serialized Redux userInfo state                    │
│  Purpose: Persist login state across page refreshes             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Key Concepts

### Immutability Pattern
```javascript
// ❌ WRONG - mutates original
data.employees.push(newEmployee);

// ✅ RIGHT - returns new object (all functions follow this)
return {
  ...data,
  employees: [...data.employees, newEmployee]
};
```

### Relational Data (Foreign Keys)
```javascript
// Employees table
{id: 1, name: "A", ...}

// Payrolls table
{id: 1, employeeId: 1, month: "12/2025", ...}  // Links to employee 1

// When deleting employee 1:
// - Remove employee record
// - Cascade delete: remove all payrolls where employeeId === 1
// - Cascade delete: remove all attendance where employeeId === 1
```

### Automatic Calculations
```javascript
// Salary is NOT stored as static number
// It's CALCULATED on demand from:
// workHours (from attendance records) × hourlyRate (baseSalary / 176)

// Example:
const calculateSalary = (baseSalary, workHours) => {
  const hourlyRate = baseSalary / 176;
  return hourlyRate * workHours;
};
```

---

## 🔌 Integration Points

### Frontend ↔ Backend (Future)
```javascript
// Current: All data in-memory (state)
initialData → Component state

// Future: Connect to backend
API Server ← HTTP requests ← Component actions
Database ← Stored data
```

### Redux ↔ localStorage
```javascript
// Current: Redux + redux-persist for userInfo only
Redux State → persistReducer → localStorage

// Future: Could persist all data
Redux State → persistReducer → localStorage → Backend API
```

---

## 📈 Performance Considerations

1. **Data Structure**: O(n) lookup by ID
   - For large datasets, use hash map/ID index

2. **Cascade Deletes**: O(n × m) complexity
   - Deleting 1 employee scans payrolls, attendance, documents
   - Optimized by reducing array operations

3. **Calculations**: O(n) sum operations
   - getTotalHours loops through all attendance records
   - Could be optimized with pre-computed values

---

## 🚀 Future Enhancements

- [ ] Backend API integration (Node.js/Express)
- [ ] Database (MongoDB/PostgreSQL)
- [ ] Real authentication (JWT tokens)
- [ ] Pagination & infinite scroll
- [ ] Advanced filtering & sorting
- [ ] Export to Excel/PDF
- [ ] Email notifications
- [ ] Audit logging
- [ ] Role-based access control (RBAC)

---

**Last Updated**: 23/01/2026  
**Architecture Version**: 2.0 (with Redux + Authentication)
