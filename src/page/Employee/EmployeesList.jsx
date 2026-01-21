import { useState } from "react";
import ModelAddEmployee from "../../components/ui/Model/ModelAddEmployee";
import ModelDetailEmployee from "../../components/ui/Model/ModelDetailEmployee";
import ModelEditEmployee from "../../components/ui/Model/ModelEditEmployee";
import ModelDelete from "../../components/ui/Model/ModelDelete";

const EmployeesList = () => {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDetal, setShowModalDetal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
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

  // Tính toán số liệu thống kê
  const totalMembers = records.length;
  const activeMembers = records.filter(r => r.status === "Đang tham gia").length;
  const withdrawnMembers = records.filter(r => r.status === "Đã rút").length;
  
  const handleShowDelete = (e) => {
    setShowModalDelete(true);
    setSelectedEmployee(e);
  };

  const handleShowEdit = (e) => {
    setShowModalEdit(true);
    setSelectedEmployee(e);
  }

  const handleShowDetail = (e) => {
    setShowModalDetal(true);
    setSelectedEmployee(e);
  }

  // Lọc dữ liệu theo search, role, status
  const filteredRecords = records.filter(record => {
    const matchSearch = record.name.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" || record.type === filterRole;
    const matchStatus = filterStatus === "all" || record.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ===== Thống kê ===== */}
        <div className="grid grid-cols-3 gap-8">
          <StatCard title="Tổng nhân sự" value={totalMembers} bgColor="from-blue-500 to-blue-600" />
          <StatCard title="Đang tham gia" value={activeMembers} bgColor="from-green-500 to-green-600" />
          <StatCard title="Đã rút" value={withdrawnMembers} bgColor="from-red-500 to-red-600" />
        </div>

        {/* ===== Tìm kiếm ===== */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm nhân sự..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* ===== Bộ lọc ===== */}
        <div className="flex gap-4 flex-wrap">
          <select 
            value={filterRole} 
            onChange={(e) => setFilterRole(e.target.value)}
            className="border-2 border-gray-200 rounded-lg px-4 py-2 bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="Leader">Leader</option>
            <option value="Suport">Support</option>
            <option value="Intern">Intern</option>
            <option value="Developer">Developer</option>
          </select>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border-2 border-gray-200 rounded-lg px-4 py-2 bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="Đang tham gia">Đang tham gia</option>
            <option value="Đã rút">Đã rút</option>
          </select>
          <button
            onClick={() => setShowModalAdd(true)}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg hover:from-red-600 hover:to-red-700 cursor-pointer ml-auto font-semibold shadow-md hover:shadow-lg transition transform hover:scale-105"
          >
            + Thêm nhân sự
          </button>
        </div>

        {/* ===== Bảng danh sách ===== */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <tr>
                <th className="p-4 text-left font-semibold">Mã NV</th>
                <th className="p-4 text-left font-semibold">Họ tên</th>
                <th className="p-4 text-left font-semibold">Vai trò</th>
                <th className="p-4 text-left font-semibold">% tham gia</th>
                <th className="p-4 text-left font-semibold">Trạng thái</th>
                <th className="p-4 text-left font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((employee, idx) => (
                <tr key={employee.id} className={`border-b border-gray-100 hover:bg-blue-50 transition ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="p-4 font-medium text-gray-700">#{employee.id}</td>
                  <td className="p-4 font-medium text-gray-900">{employee.name}</td>
                  <td className="p-4">
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                      {employee.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                        style={{ width: employee.contribution }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 mt-1 block">{employee.contribution}</span>
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
                        Chi tiết
                      </button>
                      <button
                        onClick={() => handleShowEdit(employee)}
                        className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-3 py-1 rounded-lg text-sm font-medium transition"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleShowDelete(employee)}
                        className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-lg text-sm font-medium transition"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      {/* ===== Chi tiết nhân sự ===== */}
      {selectedMember && <MemberDetail data={selectedMember} onClose={() => setSelectedMember(null)} />}

      {/* ===== Modals ===== */}
      <ModelAddEmployee isOpen={showModalAdd} onClose={() => setShowModalAdd(false)} />
      <ModelDetailEmployee data={selectedEmployee} isOpen={showModalDetal} onClose={() => setShowModalDetal(false)} />
      <ModelEditEmployee data={selectedEmployee} isOpen={showModalEdit} onClose={() => setShowModalEdit(false)} />
      <ModelDelete 
        title="Xóa nhân sự" 
        content="Bạn có chắc chắn muốn xoá nhân sự này không?" 
        isOpen={showModalDelete} 
        onClose={() => setShowModalDelete(false)}
      />
      </div>
    </div>
  );
};

// Component StatCard
function StatCard({ title, value, bgColor }) {
  return (
    <div className={`bg-gradient-to-br ${bgColor} rounded-2xl shadow-lg p-4 text-white transform hover:scale-105 transition`}>
      <p className="text-sm font-medium opacity-90">{title}</p>
      <p className="text-4xl font-bold mt-2">{value}</p>
      <div className="mt-4 h-1 w-12 bg-white opacity-50 rounded-full"></div>
    </div>
  );
}

// Component MemberDetail
function MemberDetail({ data, onClose }) {
  const [tab, setTab] = useState("task");

  if (!data) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="grid grid-cols-3 gap-0">
        {/* Info card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 space-y-4 border-r border-gray-100">
          <div>
            <h3 className="font-bold text-2xl text-gray-900">{data.name}</h3>
            <p className="text-sm text-gray-500 mt-1">Nhân viên</p>
          </div>
          <div className="space-y-3 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Vai trò:</span>
              <span className="font-semibold text-gray-900">{data.type}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Email:</span>
              <span className="font-semibold text-blue-600">{data.name.toLowerCase().replace(/\s/g, '.')}@gmail.com</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">SĐT:</span>
              <span className="font-semibold text-gray-900">090xxxxxxx</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tham gia:</span>
              <span className="font-semibold text-gray-900">{data.startDate}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-gray-600">Allocation:</span>
              <span className="font-bold text-green-600 text-lg">{data.contribution}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="mt-6 w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg hover:from-red-600 hover:to-red-700 font-semibold transition"
          >
            Đóng
          </button>
        </div>

        {/* Tabs */}
        <div className="col-span-2 p-8">
          <div className="flex gap-6 border-b border-gray-200 mb-6">
            <Tab label="Task" active={tab === "task"} onClick={() => setTab("task")} />
            <Tab label="Effort" active={tab === "effort"} onClick={() => setTab("effort")} />
            <Tab label="Chấm công" active={tab === "attendance"} onClick={() => setTab("attendance")} />
            <Tab label="Đánh giá" active={tab === "review"} onClick={() => setTab("review")} />
          </div>

          <div className="mt-6">
            {tab === "task" && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 text-gray-600 min-h-64">
                <h4 className="font-semibold text-gray-900 mb-4">Danh sách task đang làm</h4>
                <p className="text-sm">Không có task nào</p>
              </div>
            )}
            {tab === "effort" && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 text-gray-600 min-h-64">
                <h4 className="font-semibold text-gray-900 mb-4">Số giờ làm theo ngày / task</h4>
                <p className="text-sm">Chưa có dữ liệu</p>
              </div>
            )}
            {tab === "attendance" && (
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-6 text-gray-600 min-h-64">
                <h4 className="font-semibold text-gray-900 mb-4">Bảng chấm công</h4>
                <p className="text-sm">(ngày, giờ vào, giờ ra)</p>
              </div>
            )}
            {tab === "review" && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 text-gray-600 min-h-64">
                <h4 className="font-semibold text-gray-900 mb-4">Đánh giá</h4>
                <p className="text-sm">Điểm hiệu suất & nhận xét PM</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Component Tab
function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`pb-3 px-1 font-medium transition ${
        active 
          ? "border-b-2 border-blue-600 text-blue-600" 
          : "text-gray-600 hover:text-gray-900"
      }`}
    >
      {label}
    </button>
  );
};

export default EmployeesList;
