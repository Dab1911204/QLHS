import { useMemo, useState } from "react";
import ModelAddPayroll from "../../components/ui/Model/ModelAddPayroll";
import ModelPayrollDetail from "../../components/ui/Model/ModelPayrollDetail";
import ModelUpdatePayroll from "../../components/ui/Model/ModelUpdatePayroll";
import PayrollBody from "../../components/Tables/Body/PayrollBody";
import Header from "../../components/Tables/Header";
import initialData, {
  getAllPayrolls,
  addPayroll,
  updatePayroll,
  updatePayrollByHours,
} from "../../data/data";

const hearderTitles = [
  "Mã NV",
  "Nhân viên",
  "Vai trò",
  "Lương cơ bản",
  "Thưởng",
  "Khấu trừ",
  "Lương ròng",
  "Trạng thái",
  "Hành động",
];

const PayrollList = () => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [filterPosition, setFilterPosition] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);

  const allPayrollRecords = getAllPayrolls(data)

  const records = useMemo(() => {
    return allPayrollRecords.filter((record) => {
      const matchSearch = record.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchPosition =
        filterPosition === "all" || record.position === filterPosition;

      const matchStatus =
        filterStatus === "all" || record.status === filterStatus;

      return matchSearch && matchPosition && matchStatus;
    });
  }, [search, filterPosition, filterStatus, allPayrollRecords]);

  const handleShowAdd = () => {
    setSelectedPayroll(null);
    setShowModalAdd(true);
  };

  const handleShowDetail = (payroll) => {
    setSelectedPayroll(payroll);
    setShowDetailModal(true);
  };

  const handleShowUpdate = (payroll) => {
    setSelectedPayroll(payroll);
    setShowUpdateModal(true);
  };

  const handleAddPayroll = (newPayroll) => {
    // Nếu không có baseSalary (tính từ giờ làm)
    if (!newPayroll.baseSalary || newPayroll.baseSalary === 0) {
      const [month, year] = newPayroll.month.split("/");
      const updatedData = updatePayrollByHours(
        data,
        newPayroll.employeeId,
        parseInt(month),
        parseInt(year),
        newPayroll.bonus || 0,
        newPayroll.deduction || 0
      );
      setData(updatedData);
    } else {
      // Thêm bảng lương thông thường
      const updatedData = addPayroll(data, newPayroll);
      setData(updatedData);
    }
    setShowModalAdd(false);
  };

  const handleUpdatePayroll = (payrollId, updatedData) => {
    const newData = updatePayroll(data, payrollId, updatedData);
    setData(newData);
    setShowUpdateModal(false);
  };

  const handleRecalculateAllPayroll = () => {
    // Cập nhật lương tất cả nhân viên cho tháng 12/2025 dựa trên giờ làm thực tế
    let updatedData = data;
    const employees = data.employees;
    
    for (const emp of employees) {
      updatedData = updatePayrollByHours(updatedData, emp.id, 12, 2025, 0, 0);
    }
    
    setData(updatedData);
    alert("✅ Đã cập nhật lương tất cả nhân viên theo giờ làm thực tế tháng 12/2025!");
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ===== Tìm kiếm ===== */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm nhân viên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* ===== Bộ lọc ===== */}
        <div className="flex gap-4 flex-wrap">
          <select
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className="border-2 border-gray-200 rounded-lg px-4 py-2 bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
          >
            <option value="all">Tất cả vị trí</option>
            <option value="Leader">Leader</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Developer">Developer</option>
            <option value="Tester">Tester</option>
            <option value="Intern">Intern</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border-2 border-gray-200 rounded-lg px-4 py-2 bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="Đã thanh toán">Đã thanh toán</option>
            <option value="Đang xử lý">Đang xử lý</option>
          </select>
          <button
            onClick={handleShowAdd}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 font-medium transition shadow-md"
          >
            + Thêm bảng lương
          </button>
          <button
            onClick={handleRecalculateAllPayroll}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 font-medium transition shadow-md"
          >
            🔄 Cập nhật lương theo giờ làm
          </button>
        </div>

        {/* ===== Bảng lương ===== */}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <table className="w-full">
            <Header titles={hearderTitles} />
            <PayrollBody
              items={records}
              onViewDetail={handleShowDetail}
              onUpdatePayroll={handleShowUpdate}
            />
          </table>
        </div>

        {/* Modal thêm bảng lương */}
        {showModalAdd && (
          <ModelAddPayroll
            isOpen={showModalAdd}
            onClose={() => setShowModalAdd(false)}
            onAdd={handleAddPayroll}
          />
        )}

        {/* Modal xem chi tiết */}
        {showDetailModal && (
          <ModelPayrollDetail
            isOpen={showDetailModal}
            onClose={() => setShowDetailModal(false)}
            payroll={selectedPayroll}
          />
        )}

        {/* Modal cập nhật lương */}
        {showUpdateModal && (
          <ModelUpdatePayroll
            isOpen={showUpdateModal}
            onClose={() => setShowUpdateModal(false)}
            payroll={selectedPayroll}
            onUpdate={handleUpdatePayroll}
          />
        )}
      </div>
    </div>
  );
};

export default PayrollList;
