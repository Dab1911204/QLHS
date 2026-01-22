import { useState } from "react";
import AttendanceDetailModal from "../../components/ui/Model/AttendanceDetailModal";
import CheckInModal from "../../components/ui/Model/CheckInModal";
import Header from "../../components/Tables/Header";
import AttendanceBody from "../../components/Tables/Body/AttendanceBody";

const hearerLabels = [
  "STT",
  "Họ tên",
  "Vị trí",
  "Có mặt",
  "Vắng",
  "Muộn",
  "Tổng giờ",
  "Thao tác",
];

const AttendanceList = () => {
  const [search, setSearch] = useState("");
  const [filterMonth, setFilterMonth] = useState(new Date().getMonth() + 1);
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [currentUser] = useState({
    id: 1,
    name: "Nguyễn Văn A",
    position: "Developer",
    email: "a@gmail.com",
  });
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [workDescription, setWorkDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [workResults, setWorkResults] = useState([
    {
      name: "Giao diện User Dashboard",
      description: "Thiết kế và phát triển dashboard người dùng",
      quantity: 1,
      unit: "module",
    },
    {
      name: "API Authentication",
      description: "Xây dựng hệ thống xác thực người dùng",
      quantity: 3,
      unit: "endpoint",
    },
  ]);

  const [employees] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      position: "Developer",
      email: "a@gmail.com",
    },
    {
      id: 2,
      name: "Nguyễn Văn B",
      position: "Designer",
      email: "b@gmail.com",
    },
    {
      id: 3,
      name: "Nguyễn Văn C",
      position: "Product Manager",
      email: "c@gmail.com",
    },
    {
      id: 4,
      name: "Trần Thị D",
      position: "QA",
      email: "d@gmail.com",
    },
  ]);

  const [attendanceRecords] = useState([
    {
      id: 1,
      employeeId: 1,
      date: "2025-01-15",
      checkIn: "08:00",
      checkOut: "17:30",
      status: "present",
      workHours: 9.5,
    },
    {
      id: 2,
      employeeId: 1,
      date: "2025-01-16",
      checkIn: "08:15",
      checkOut: "17:45",
      status: "present",
      workHours: 9.5,
    },
    {
      id: 3,
      employeeId: 1,
      date: "2025-01-17",
      checkIn: null,
      checkOut: null,
      status: "absent",
      workHours: 0,
    },
    {
      id: 4,
      employeeId: 2,
      date: "2025-01-15",
      checkIn: "08:30",
      checkOut: "17:00",
      status: "present",
      workHours: 8.5,
    },
    {
      id: 5,
      employeeId: 2,
      date: "2025-01-16",
      checkIn: "08:00",
      checkOut: "17:30",
      status: "present",
      workHours: 9.5,
    },
  ]);

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()),
  );

  const getEmployeeAttendance = (employeeId) => {
    return attendanceRecords.filter(
      (record) => record.employeeId === employeeId,
    );
  };

  const getAttendanceStats = (employeeId) => {
    const records = getEmployeeAttendance(employeeId);
    const present = records.filter((r) => r.status === "present").length;
    const absent = records.filter((r) => r.status === "absent").length;
    const late = records.filter((r) => r.status === "late").length;
    const totalHours = records.reduce((sum, r) => sum + r.workHours, 0);

    return { present, absent, late, totalHours };
  };

  const handleViewDetail = (employee) => {
    setSelectedEmployee(employee);
    setShowDetailModal(true);
  };

  const handleOpenCheckIn = () => {
    setShowCheckInModal(true);
    setCheckInTime("");
    setCheckOutTime("");
    setWorkDescription("");
    setProductQuantity("");
  };

  const handleSubmitCheckIn = () => {
    if (!checkInTime || !workDescription || !productQuantity) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    alert(
      `Chấm công thành công!\nGiờ vào: ${checkInTime}\nGiờ ra: ${checkOutTime || "Chưa chấm"}\nMô tả: ${workDescription}\nSố lượng sản phẩm: ${productQuantity}`,
    );
    setShowCheckInModal(false);
  };

  return (
    <div>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* ===== Bộ lọc ===== */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tìm kiếm nhân sự
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tháng
                </label>
                <select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(parseInt(e.target.value))}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Tháng {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Năm
                </label>
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(parseInt(e.target.value))}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  {Array.from({ length: 5 }, (_, i) => {
                    const year = new Date().getFullYear() - 2 + i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  &nbsp;
                </label>
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 font-semibold shadow-md hover:shadow-lg transition">
                  Xuất báo cáo
                </button>
              </div>
            </div>
          </div>

          {/* ===== Nút chấm công cá nhân ===== */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-lg font-semibold">👤 {currentUser.name}</div>
              <div className="h-6 w-px bg-white opacity-30"></div>
              <div className="text-sm opacity-90">{currentUser.position}</div>
            </div>
            <button
              onClick={handleOpenCheckIn}
              className="bg-white text-green-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition transform hover:scale-105 shadow-md"
            >
              ✓ Chấm công
            </button>
          </div>
          {/* ===== Bảng danh sách ===== */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <table className="w-full">
              <Header titles={hearerLabels} />
              <AttendanceBody
                filteredEmployees={filteredEmployees}
                getAttendanceStats={getAttendanceStats}
                onViewDetail={handleViewDetail}
              />
            </table>
          </div>

          {/* ===== Modal Chi tiết ===== */}
          <AttendanceDetailModal
            isOpen={showDetailModal}
            selectedEmployee={selectedEmployee}
            filterMonth={filterMonth}
            filterYear={filterYear}
            getAttendanceStats={getAttendanceStats}
            getEmployeeAttendance={getEmployeeAttendance}
            onClose={() => setShowDetailModal(false)}
          />
        </div>
      </div>

      {/* ===== Modal Chấm công ===== */}
      <CheckInModal
        isOpen={showCheckInModal}
        currentUser={currentUser}
        checkInTime={checkInTime}
        checkOutTime={checkOutTime}
        workDescription={workDescription}
        productQuantity={productQuantity}
        workResults={workResults}
        onCheckInTimeChange={setCheckInTime}
        onCheckOutTimeChange={setCheckOutTime}
        onWorkDescriptionChange={setWorkDescription}
        onProductQuantityChange={setProductQuantity}
        onSubmit={handleSubmitCheckIn}
        onClose={() => setShowCheckInModal(false)}
      />
    </div>
  );
};

export default AttendanceList;
