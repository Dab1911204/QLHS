import { useMemo, useState } from "react";
import ModelAddEmployee from "../../components/ui/Model/ModelAddEmployee";
import ModelDetailEmployee from "../../components/ui/Model/ModelDetailEmployee";
import ModelEditEmployee from "../../components/ui/Model/ModelEditEmployee";
import ModelDelete from "../../components/ui/Model/ModelDelete";
import Header from "../../components/Tables/Header";
import EmployeesBody from "../../components/Tables/Body/EmployeesBody";
import Tab from "../../components/ui/Tag";
import StatCard from "../../components/ui/Card";

const headerLabels = [
  "Mã NV",
  "Họ tên",
  "Vai trò",
  "% tham gia",
  "Trạng thái",
  "Thao tác",
];
const allRecords = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    type: "Leader",
    startDate: "01/11/2025",
    endDate: "01/12/2025",
    contribution: "100%",
    status: "Đang tham gia",
  },
  {
    id: 2,
    name: "Nguyễn Văn B",
    type: "Suport",
    startDate: "01/11/2025",
    endDate: "01/12/2025",
    contribution: "50%",
    status: "Đang tham gia",
  },
  {
    id: 3,
    name: "Nguyễn Văn C",
    type: "Intern",
    startDate: "01/11/2025",
    endDate: "01/12/2025",
    contribution: "100%",
    status: "Đang tham gia",
  },
];
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

  const records = useMemo(() => {
    return allRecords.filter((record) => {
      const matchSearch = record.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchRole = filterRole === "all" || record.type === filterRole;

      const matchStatus =
        filterStatus === "all" || record.status === filterStatus;

      return matchSearch && matchRole && matchStatus;
    });
  }, [search, filterRole, filterStatus]);

  // Tính toán số liệu thống kê
  const totalMembers = allRecords.length;
  const activeMembers = allRecords.filter(
    (r) => r.status === "Đang tham gia",
  ).length;
  const withdrawnMembers = allRecords.filter((r) => r.status === "Đã rút").length;

  const handleShowDelete = (e) => {
    setSelectedEmployee(e);
    setShowModalDelete(true);
  };

  const handleShowEdit = (e) => {
    setSelectedEmployee(e);
    setShowModalEdit(true);
  };

  const handleShowDetail = (e) => {
    setSelectedEmployee(e);
    setShowModalDetal(true);
  };
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ===== Thống kê ===== */}
        <div className="grid grid-cols-3 gap-8">
          <StatCard
            title="Tổng nhân sự"
            value={totalMembers}
            bgColor="from-blue-500 to-blue-600"
          />
          <StatCard
            title="Đang tham gia"
            value={activeMembers}
            bgColor="from-green-500 to-green-600"
          />
          <StatCard
            title="Đã rút"
            value={withdrawnMembers}
            bgColor="from-red-500 to-red-600"
          />
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
            <Header titles={headerLabels} />
            <EmployeesBody items={records} handleShowDelete={handleShowDelete} handleShowDetail={handleShowDetail} handleShowEdit={handleShowEdit}/>
          </table>
        </div>

        {/* ===== Modals ===== */}
        <ModelAddEmployee
          isOpen={showModalAdd}
          onClose={() => setShowModalAdd(false)}
        />
        <ModelDetailEmployee
          data={selectedEmployee}
          isOpen={showModalDetal}
          onClose={() => setShowModalDetal(false)}
        />
        <ModelEditEmployee
          data={selectedEmployee}
          isOpen={showModalEdit}
          onClose={() => setShowModalEdit(false)}
        />
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

export default EmployeesList;
