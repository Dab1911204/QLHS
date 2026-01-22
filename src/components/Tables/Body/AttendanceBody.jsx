const AttendanceBody = ({
  filteredEmployees,
  getAttendanceStats,
  onViewDetail,
}) => {
  return (
    <tbody>
      {filteredEmployees.map((employee, idx) => {
        const stats = getAttendanceStats(employee.id);
        return (
          <tr
            key={employee.id}
            className={`border-b border-gray-100 hover:bg-blue-50 transition ${
              idx % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            <td className="p-4 font-medium text-gray-700">{idx + 1}</td>
            <td className="p-4">
              <div>
                <p className="font-semibold text-gray-900">{employee.name}</p>
                <p className="text-sm text-gray-500">{employee.email}</p>
              </div>
            </td>
            <td className="p-4">
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {employee.role}
              </span>
            </td>
            <td className="p-4 text-center">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                {stats.present}
              </span>
            </td>
            <td className="p-4 text-center">
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                {stats.absent}
              </span>
            </td>
            <td className="p-4 text-center">
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                {stats.late}
              </span>
            </td>
            <td className="p-4 text-center">
              <span className="font-bold text-blue-600">
                {stats.totalHours.toFixed(1)}h
              </span>
            </td>
            <td className="p-4">
              <div className="flex gap-2">
                <button
                  onClick={() => onViewDetail(employee)}
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-lg text-sm font-medium transition"
                >
                  Chi tiết
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default AttendanceBody;
