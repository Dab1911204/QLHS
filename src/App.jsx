import { useState } from "react";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";

function App() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [records, setRecords] = useState([
    {
      id: 1,
      name: "Hồ sơ nhân sự",
      type: "PDF",
      date: "01/11/2025",
      status: "Đã số hóa",
    },
    {
      id: 2,
      name: "Hồ sơ hợp đồng",
      type: "Word",
      date: "05/11/2025",
      status: "Đang xử lý",
    },
    {
      id: 3,
      name: "Hồ sơ đào tạo",
      type: "PDF",
      date: "10/11/2025",
      status: "Lưu trữ",
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
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 p-8">
        {/* HEADER TRÊN CÙNG */}
        <Header />

        {/* Quản lý hồ sơ */}
        <div className="flex justify-between items-center mb-6 mt-6">
          <h1 className="text-3xl font-bold">Quản lý hồ sơ</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
          >
            + Thêm hồ sơ
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm hồ sơ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">STT</th>
                <th className="p-4 text-left">Tên hồ sơ</th>
                <th className="p-4 text-left">Loại</th>
                <th className="p-4 text-left">Ngày tạo</th>
                <th className="p-4 text-left">Trạng thái</th>
                <th className="p-4 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {records
                .filter((r) =>
                  r.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((record, index) => (
                  <tr key={record.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{record.name}</td>
                    <td className="p-4">{record.type}</td>
                    <td className="p-4">{record.date}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                        {record.status}
                      </span>
                    </td>
                    <td className="p-4 space-x-2">
                      <button className="px-3 py-1 border rounded-lg">Xem</button>
                      <button className="px-3 py-1 border rounded-lg">Sửa</button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Thêm hồ sơ</h2>
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
                  onClick={() => setShowModal(false)}
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
    </div>
  );
}

export default App;
