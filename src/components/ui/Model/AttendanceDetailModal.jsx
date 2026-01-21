const AttendanceDetailModal = ({
  isOpen,
  selectedEmployee,
  filterMonth,
  filterYear,
  getAttendanceStats,
  getEmployeeAttendance,
  onClose,
}) => {
  if (!isOpen || !selectedEmployee) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Chi tiết chấm công</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:text-blue-600 w-8 h-8 rounded-full flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-3 gap-6">
            {/* Info card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 space-y-4 border border-gray-200 rounded-xl">
              <div>
                <h3 className="font-bold text-2xl text-gray-900">
                  {selectedEmployee.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">Nhân viên</p>
              </div>
              <div className="space-y-3 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Vị trí:</span>
                  <span className="font-semibold text-gray-900">
                    {selectedEmployee.position}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold text-blue-600 text-sm">
                    {selectedEmployee.email}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-200 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tháng/Năm:</span>
                    <span className="font-bold text-blue-600">
                      {filterMonth}/{filterYear}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="mt-6 w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg hover:from-red-600 hover:to-red-700 font-semibold transition"
              >
                Đóng
              </button>
            </div>

            {/* Details and Stats */}
            <div className="col-span-2">
              {/* Thống kê */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4">
                  <p className="text-sm opacity-90">Có mặt</p>
                  <p className="text-3xl font-bold">
                    {getAttendanceStats(selectedEmployee.id).present}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-4">
                  <p className="text-sm opacity-90">Vắng</p>
                  <p className="text-3xl font-bold">
                    {getAttendanceStats(selectedEmployee.id).absent}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4">
                  <p className="text-sm opacity-90">Muộn</p>
                  <p className="text-3xl font-bold">
                    {getAttendanceStats(selectedEmployee.id).late}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4">
                  <p className="text-sm opacity-90">Tổng giờ</p>
                  <p className="text-3xl font-bold">
                    {getAttendanceStats(selectedEmployee.id).totalHours.toFixed(1)}h
                  </p>
                </div>
              </div>

              {/* Bảng chi tiết */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-gray-300">
                      <th className="p-3 text-left font-semibold">Ngày</th>
                      <th className="p-3 text-center font-semibold">Giờ vào</th>
                      <th className="p-3 text-center font-semibold">Giờ ra</th>
                      <th className="p-3 text-center font-semibold">Giờ làm</th>
                      <th className="p-3 text-center font-semibold">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getEmployeeAttendance(selectedEmployee.id).map(
                      (record, idx) => (
                        <tr
                          key={record.id}
                          className={`border-b hover:bg-blue-50 transition ${
                            idx % 2 === 0 ? "bg-gray-50" : ""
                          }`}
                        >
                          <td className="p-3 font-medium">
                            {new Date(record.date).toLocaleDateString("vi-VN")}
                          </td>
                          <td className="p-3 text-center text-gray-700">
                            {record.checkIn ? (
                              <span
                                className={
                                  record.checkIn > "08:30"
                                    ? "text-orange-600 font-semibold"
                                    : ""
                                }
                              >
                                {record.checkIn}
                              </span>
                            ) : (
                              <span className="text-red-600">—</span>
                            )}
                          </td>
                          <td className="p-3 text-center text-gray-700">
                            {record.checkOut ? (
                              record.checkOut
                            ) : (
                              <span className="text-red-600">—</span>
                            )}
                          </td>
                          <td className="p-3 text-center font-semibold text-blue-600">
                            {record.workHours > 0
                              ? `${record.workHours}h`
                              : "0h"}
                          </td>
                          <td className="p-3 text-center">
                            {record.status === "present" && (
                              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                                ✓ Có mặt
                              </span>
                            )}
                            {record.status === "absent" && (
                              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                                ✕ Vắng
                              </span>
                            )}
                            {record.status === "late" && (
                              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold">
                                ⏱ Muộn
                              </span>
                            )}
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDetailModal;
