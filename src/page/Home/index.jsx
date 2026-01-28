import StatCard from "../../components/ui/Card";
import {
  getAllEmployees,
  getAllAttendance,
  getEmployeeStats,
  getPayrollStats,
  getAttendanceStats,
  getTopSalaryEmployee,
} from "../../data/data";
import { useData } from "../../contexts/Data/DataContext";

const HomePage = () => {
  const { data } = useData();

  const allEmployees = getAllEmployees(data);
  const allAttendanceRecords = getAllAttendance(data);

  // Thống kê
  const { total: totalMembers, active: activeMembers, withdrawn: withdrawnMembers } = getEmployeeStats(data);
  const { total: totalPayroll, paid: paidCount, pending: pendingCount } = getPayrollStats(data);
  const { present: presentCount, absent: absentCount, late: lateCount, totalHours } = getAttendanceStats(data);

  const topSalaryEmployee = getTopSalaryEmployee(data);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8 p-8">
        {/* ===== Tiêu đề ===== */}
        <div className="mb-8">
          <p className="text-gray-600">
            Tổng quan chi tiết về quản lý nhân sự, bảng lương và chấm công
          </p>
        </div>

        {/* ===== Thống kê NHÂN SỰ ===== */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Quản Lý Nhân Sự
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Tổng Nhân Sự"
              value={totalMembers}
              bgColor="bg-blue-500"
            />
            <StatCard
              title="Đang Tham Gia"
              value={activeMembers}
              bgColor="bg-green-500"
            />
            <StatCard
              title="Đã Rút"
              value={withdrawnMembers}
              bgColor="bg-red-500"
            />
          </div>
        </div>

        {/* ===== Thống kê BẢNG LƯƠNG ===== */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Quản Lý Bảng Lương
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Tổng Lương Phải Trả"
              value={`${(totalPayroll / 1000000).toFixed(1)}M`}
              bgColor="bg-purple-500"
            />
            <StatCard
              title="Đã Thanh Toán"
              value={paidCount}
              bgColor="bg-green-500"
            />
            <StatCard
              title="Đang Xử Lý"
              value={pendingCount}
              bgColor="bg-orange-500"
            />
          </div>
        </div>

        {/* ===== Thống kê CHẤM CÔNG ===== */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Quản Lý Chấm Công
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              title="Có Mặt"
              value={presentCount}
              bgColor="bg-green-500"
            />
            <StatCard
              title="Vắng"
              value={absentCount}
              bgColor="bg-red-500"
            />
            <StatCard
              title="Muộn"
              value={lateCount}
              bgColor="bg-yellow-500"
            />
            <StatCard
              title="Tổng Giờ Làm"
              value={totalHours.toFixed(1)}
              bgColor="bg-indigo-500"
            />
          </div>
        </div>

        {/* ===== Thông tin nổi bật ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nhân viên lương cao nhất */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Nhân Viên Lương Cao Nhất
                </h3>
                {topSalaryEmployee && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tên:</span>
                      <span className="font-bold text-gray-800">
                        {topSalaryEmployee.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Vị trí:</span>
                      <span className="font-bold text-gray-800">
                        {topSalaryEmployee.position}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Lương ròng:</span>
                      <span className="font-bold text-green-600 text-lg">
                        {(topSalaryEmployee.netSalary / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tỉ lệ chấm công */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Tỉ Lệ Chấm Công
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tỷ lệ có mặt:</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full"
                      style={{
                        width: `${allAttendanceRecords.length > 0 ? (presentCount / allAttendanceRecords.length) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                  <span className="font-bold text-gray-800 w-10">
                    {allAttendanceRecords.length > 0
                      ? ((presentCount / allAttendanceRecords.length) * 100).toFixed(
                          0,
                        )
                      : 0}
                    %
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tỷ lệ vắng:</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-red-500 h-3 rounded-full"
                      style={{
                        width: `${allAttendanceRecords.length > 0 ? (absentCount / allAttendanceRecords.length) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                  <span className="font-bold text-gray-800 w-10">
                    {allAttendanceRecords.length > 0
                      ? ((absentCount / allAttendanceRecords.length) * 100).toFixed(
                          0,
                        )
                      : 0}
                    %
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Giờ làm trung bình:</span>
                <span className="font-bold text-gray-800">
                  {allAttendanceRecords.length > 0
                    ? (totalHours / allAttendanceRecords.length).toFixed(1)
                    : 0}{" "}
                  giờ
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Danh sách nhân viên hoạt động ===== */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Danh Sách Nhân Viên Hoạt Động
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Tên
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Vai Trò
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    % Tham Gia
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Trạng Thái
                  </th>
                </tr>
              </thead>
              <tbody>
                {allEmployees.map((emp) => (
                  <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-800">{emp.name}</td>
                    <td className="py-3 px-4 text-gray-600">{emp.role}</td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                        {emp.contribution}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;