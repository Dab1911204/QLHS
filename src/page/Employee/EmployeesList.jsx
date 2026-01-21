import { useState } from "react";
import Header from "../../components/Tables/Header";
import EmployeesBody from "../../components/Tables/Body/EmployeesBody";

const titles = ["Mã NV","Họ tên","Vai trò","Ngày bắt đầu","Ngày kết thúc","% tham gia","Trạng thái","Thao tác"]

const EmployeesList = () => {
  const [search, setSearch] = useState("");
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [records, setRecords] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      type: "Leader",
      startDate: "01/11/2025",
      endDate:"01/12/2025",
      contribution:"100%",
      status:"Đang tham gia",
    },
    {
      id: 2,
      name: "Nguyễn Văn B",
      type: "Suport",
      startDate: "01/11/2025",
      endDate:"01/12/2025",
      contribution:"50%",
      status:"Đang tham gia",
    },
    {
      id: 3,
      name: "Nguyễn Văn C",
      type: "Intern",
      startDate: "01/11/2025",
      endDate:"01/12/2025",
      contribution:"100%",
      status:"Đang tham gia",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    type: "PDF",
    status: "Đã số hóa",
  });

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa hồ sơ này không?")) {
      setRecords(records.filter((r) => r.id !== id));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      id: records.length + 1,
      name: formData.name,
      type: formData.type,
      date: new Date().toLocaleDateString("vi-VN"),
      status: formData.status,
    };

    setRecords([...records, newRecord]);
    setFormData({ name: "", type: "PDF", status: "Đã số hóa" });
    setShowModalAdd(false);
  };
  return (
    <>
      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm nhân sự..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>
      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="flex justify-start items-center my-4 mx-8">
          <button
            onClick={() => setShowModalAdd(true)}
            className="bg-[#ff0000] text-white px-4 py-2 rounded-xl hover:bg-[#b70000]"
          >
            + Thêm nhân sự
          </button>
        </div>
        <table className="w-full">
          <Header titles={titles}/>
          <EmployeesBody items={records} search={search} handleDelete={handleDelete}/>
        </table>
      </div>
      {/* Modal */}
      {showModalAdd && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Thêm nhân viên</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Tên hồ sơ"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option>PDF</option>
                <option>Word</option>
                <option>Excel</option>
              </select>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option>Đã số hóa</option>
                <option>Đang xử lý</option>
                <option>Lưu trữ</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModalAdd(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Hủy
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeesList;
