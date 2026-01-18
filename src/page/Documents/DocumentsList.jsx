import { useState } from "react";
import Header from "../../components/Tables/Header";
import DocumentsBody from "../../components/Tables/Body/DocumentsBody";

const titles = ["STT","Tên hồ sơ","Loại","Ngày tạo","Trạng thái","Thao tác"]

const DocumentsList = () => {
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
    <>
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
        <div className="flex justify-start items-center my-4 mx-8">
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#ff0000] text-white px-4 py-2 rounded-xl hover:bg-[#b70000]"
          >
            + Thêm hồ sơ
          </button>
        </div>
        <table className="w-full">
          <Header titles={titles}/>
          <DocumentsBody items={records} search={search} handleDelete={handleDelete}/>
        </table>
      </div>
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
    </>
  );
};

export default DocumentsList;
