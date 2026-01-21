import { FaRegEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VscTools } from "react-icons/vsc";

const EmployeesBody = ({ items, search, handleShowDelete,handleShowDetail,handleShowEdit }) => {
  return (
    <>
      <tbody>
        {items
          .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
          .map((record, index) => (
            <tr key={record.id} className="border-t hover:bg-gray-50">
              <td className="p-4">{index + 1}</td>
              <td className="p-4">{record.name}</td>
              <td className="p-4">{record.type}</td>
              <td className="p-4">{record.startDate}</td>
              <td className="p-4">{record.startDate}</td>
              <td className="p-4">{record.contribution}</td>
              <td className="p-4">
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                  {record.status}
                </span>
              </td>
              <td className="p-4 space-x-1">
                <button className="px-2 py-1 rounded-lg text-white bg-sky-500 hover:bg-sky-600 cursor-pointer" onClick={() => handleShowDetail(record)}>
                  <div className="flex items-center gap-1">
                    <FaRegEye />
                    <span>Xem</span>
                  </div>
                </button>
                <button className="px-2 py-1 rounded-lg text-white bg-yellow-500 hover:bg-yellow-600 cursor-pointer" onClick={() => handleShowEdit(record)}>
                  <div className="flex items-center gap-1">
                    <VscTools />
                    <span>Sửa</span>
                  </div>
                </button>
                <button
                  onClick={() => handleShowDelete(record)}
                  className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg cursor-pointer"
                >
                  <div className="flex items-center gap-1">
                    <RiDeleteBin6Line />
                    <span>Xóa</span>
                  </div>
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default EmployeesBody;
