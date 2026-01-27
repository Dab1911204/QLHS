import { useMemo, useState } from "react";
import ModelAddEmployee from "../../components/ui/Model/ModelAddEmployee";
import ModelDetailEmployee from "../../components/ui/Model/ModelDetailEmployee";
import ModelEditEmployee from "../../components/ui/Model/ModelEditEmployee";
import ModelDelete from "../../components/ui/Model/ModelDelete";
import Header from "../../components/Tables/Header";
import EmployeesBody from "../../components/Tables/Body/EmployeesBody";
import { useData } from "../../contexts/DataContext";

const headerLabels = [
  "Mã NV",
  "Họ tên",
  "Vai trò",
  "Trạng thái",
  "Thao tác",
];

const EmployeesList = () => {
  const { data, addEmployee, updateEmployee, deleteEmployee } = useData();
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDetal, setShowModalDetal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const allRecords = data.employees;

  const records = useMemo(() => {
    return allRecords.filter((record) => {
      const matchSearch = record.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchRole = filterRole === "all" || record.role === filterRole;

      const matchStatus =
        filterStatus === "all" || record.status === filterStatus;

      return matchSearch && matchRole && matchStatus;
    });
  }, [search, filterRole, filterStatus, allRecords]);

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

  const handleAddEmployee = (newEmployee) => {
    addEmployee(newEmployee);
    setShowModalAdd(false);
  };

  const handleUpdateEmployee = (employeeId, updatedData) => {
    updateEmployee(employeeId, updatedData);
    setShowModalEdit(false);
  };

  const handleDeleteEmployee = () => {
    if (selectedEmployee) {
      deleteEmployee(selectedEmployee.id);
      setShowModalDelete(false);
      setSelectedEmployee(null);
    }
  };
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">

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
            <option value="Manager">Manager</option>
            <option value="Leader">Leader</option>
            <option value="Support">Support</option>
            <option value="Employee">Employee</option>
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
          onAdd={handleAddEmployee}
        />
        <ModelDetailEmployee
          data={selectedEmployee}
          isOpen={showModalDetal}
          onClose={() => setShowModalDetal(false)}
        />
        <ModelEditEmployee
          key={selectedEmployee?.id}
          data={selectedEmployee}
          isOpen={showModalEdit}
          onClose={() => setShowModalEdit(false)}
          onUpdate={handleUpdateEmployee}
        />
        <ModelDelete
          title="Xóa nhân sự"
          content="Bạn có chắc chắn muốn xoá nhân sự này không?"
          isOpen={showModalDelete}
          onClose={() => setShowModalDelete(false)}
          onDelete={handleDeleteEmployee}
        />
      </div>
    </div>
  );
};

export default EmployeesList;
