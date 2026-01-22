import { FaRegEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VscTools } from "react-icons/vsc";

const EmployeesBody = ({
  items,
  handleShowDelete,
  handleShowDetail,
  handleShowEdit,
}) => {
  return (
    <>
      <tbody>
        {items.map((employee, idx) => (
          <tr
            key={employee.id}
            className={`border-b border-gray-100 hover:bg-blue-50 transition ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
          >
            <td className="p-4 font-medium text-gray-700">#{employee.id}</td>
            <td className="p-4 font-medium text-gray-900">{employee.name}</td>
            <td className="p-4">
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {employee.role}
              </span>
            </td>
            <td className="p-4">
              {employee.status === "Đang tham gia" ? (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  ✓ {employee.status}
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  ✕ {employee.status}
                </span>
              )}
            </td>
            <td className="p-4">
              <div className="flex gap-3">
                <button
                  onClick={() => handleShowDetail(employee)}
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-lg text-sm font-medium transition"
                >
                  <div className="flex flex-row items-center gap-1">
                    <FaRegEye />
                    <span>Xem</span>
                  </div>
                </button>
                <button
                  onClick={() => handleShowEdit(employee)}
                  className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-3 py-1 rounded-lg text-sm font-medium transition"
                >
                  <div className="flex flex-row items-center gap-1">
                    <VscTools />
                    <span>Sửa</span>
                  </div>
                </button>
                <button
                  onClick={() => handleShowDelete(employee)}
                  className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-lg text-sm font-medium transition"
                >
                  <div className="flex flex-row items-center gap-1">
                    <RiDeleteBin6Line />
                    <span>Xóa</span>
                  </div>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default EmployeesBody;
