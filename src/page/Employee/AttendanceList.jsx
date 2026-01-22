import { useState, useMemo } from "react";
import AttendanceDetailModal from "../../components/ui/Model/AttendanceDetailModal";
import CheckInModal from "../../components/ui/Model/CheckInModal";
import Header from "../../components/Tables/Header";
import AttendanceBody from "../../components/Tables/Body/AttendanceBody";
import initialData, {
  getAllEmployees,
  getAttendanceByEmployeeId,
  addAttendance,
} from "../../data/data";

const hearerLabels = [
  "STT",
  "Họ tên",
  "Vai trò",
  "Có mặt",
  "Vắng",
  "Muộn",
  "Tổng giờ",
  "Thao tác",
];

const AttendanceList = () => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [filterMonth, setFilterMonth] = useState(12); // Mặc định tháng 12 (dữ liệu hiện tại)
  const [filterYear, setFilterYear] = useState(2025); // Mặc định năm 2025
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [currentUser] = useState(() => {
    const emp = getAllEmployees(initialData)[0];
    return emp || { id: 1, name: "User", position: "Employee", email: "user@example.com" };
  });
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [workDescription, setWorkDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  const employees = getAllEmployees(data);

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, employees]);

  const getEmployeeAttendanceByMonth = (employeeId) => {
    return getAttendanceByEmployeeId(data, employeeId).filter((record) => {
      const attDate = new Date(record.date);
      return (
        attDate.getMonth() + 1 === filterMonth &&
        attDate.getFullYear() === filterYear
      );
    });
  };

  const getEmployeeAttendanceStats = (employeeId) => {
    const records = getEmployeeAttendanceByMonth(employeeId);
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

    // Tính giờ làm từ checkIn và checkOut
    let workHours = 0;
    let status = "present";

    if (checkOutTime) {
      const [inHour, inMin] = checkInTime.split(":").map(Number);
      const [outHour, outMin] = checkOutTime.split(":").map(Number);
      workHours = (outHour + outMin / 60) - (inHour + inMin / 60);
      
      // Kiểm tra đi muộn (sau 8:30)
      if (inHour > 8 || (inHour === 8 && inMin > 30)) {
        status = "late";
      }
    } else {
      // Nếu chưa checkout, tính tạm từ check in đến bây giờ
      const now = new Date();
      const [inHour, inMin] = checkInTime.split(":").map(Number);
      workHours = (now.getHours() + now.getMinutes() / 60) - (inHour + inMin / 60);
      if (inHour > 8 || (inHour === 8 && inMin > 30)) {
        status = "late";
      }
    }

    const today = new Date().toISOString().split("T")[0];
    const newAttendance = {
      employeeId: currentUser.id,
      date: today,
      checkIn: checkInTime,
      checkOut: checkOutTime || null,
      status,
      workHours: Math.max(0, Math.round(workHours * 10) / 10), // Làm tròn đến 0.1
      workDescription,
      productQuantity: parseInt(productQuantity),
      unit: "item",
    };

    const updatedData = addAttendance(data, newAttendance);
    setData(updatedData);

    alert(
      `✅ Chấm công thành công!\n⏰ Giờ vào: ${checkInTime}\n⏰ Giờ ra: ${checkOutTime || "Chưa chấm"}\n📝 Mô tả: ${workDescription}\n📊 Số lượng: ${productQuantity}\n⌛ Giờ làm: ${newAttendance.workHours}h`,
    );
    setShowCheckInModal(false);
  };

  return (
    <div>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* ===== Bộ lọc ===== */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="grid grid-cols-3 gap-8">
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
                getAttendanceStats={getEmployeeAttendanceStats}
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
            getAttendanceStats={getEmployeeAttendanceStats}
            getEmployeeAttendance={getEmployeeAttendanceByMonth}
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
