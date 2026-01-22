import { useMemo, useState } from "react";
import StatCard from "../../components/ui/Card";
import ModelAddPayroll from "../../components/ui/Model/ModelAddPayroll";
import ModelPayrollDetail from "../../components/ui/Model/ModelPayrollDetail";
import ModelUpdatePayroll from "../../components/ui/Model/ModelUpdatePayroll";
import PayrollBody from "../../components/Tables/Body/PayrollBody";
import Header from "../../components/Tables/Header";

const allPayrollRecords = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    position: "Leader",
    baseSalary: 15000000,
    bonus: 2000000,
    deduction: 500000,
    netSalary: 16500000,
    month: "12/2025",
    status: "Đã thanh toán",
  },
  {
    id: 2,
    name: "Nguyễn Văn B",
    position: "Senior Developer",
    baseSalary: 12000000,
    bonus: 1500000,
    deduction: 400000,
    netSalary: 13100000,
    month: "12/2025",
    status: "Đang xử lý",
  },
  {
    id: 3,
    name: "Nguyễn Văn C",
    position: "Developer",
    baseSalary: 10000000,
    bonus: 1000000,
    deduction: 300000,
    netSalary: 10700000,
    month: "12/2025",
    status: "Đã thanh toán",
  },
  {
    id: 4,
    name: "Trần Thị D",
    position: "Tester",
    baseSalary: 8000000,
    bonus: 800000,
    deduction: 250000,
    netSalary: 8550000,
    month: "12/2025",
    status: "Đang xử lý",
  },
  {
    id: 5,
    name: "Lê Văn E",
    position: "Intern",
    baseSalary: 5000000,
    bonus: 300000,
    deduction: 150000,
    netSalary: 5150000,
    month: "12/2025",
    status: "Đã thanh toán",
  },
];

const hearderTitles = [
  "Mã NV",
  "Nhân viên",
  "Vị trí",
  "Lương cơ bản",
  "Thưởng",
  "Khấu trừ",
  "Lương ròng",
  "Trạng thái",
  "Hành động",
];

const PayrollList = () => {
  const [search, setSearch] = useState("");
  const [filterPosition, setFilterPosition] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);

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
  }, [search, filterPosition, filterStatus]);

  // Tính toán số liệu thống kê
  const totalPayroll = allPayrollRecords.reduce(
    (sum, r) => sum + r.netSalary,
    0,
  );
  const paidCount = allPayrollRecords.filter(
    (r) => r.status === "Đã thanh toán",
  ).length;
  const pendingCount = allPayrollRecords.filter(
    (r) => r.status === "Đang xử lý",
  ).length;

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

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ===== Thống kê ===== */}
        <div className="grid grid-cols-3 gap-8">
          <StatCard
            title="Tổng lương phải trả"
            value={`${(totalPayroll / 1000000).toFixed(1)}M`}
            bgColor="from-blue-500 to-blue-600"
          />
          <StatCard
            title="Đã thanh toán"
            value={paidCount}
            bgColor="from-green-500 to-green-600"
          />
          <StatCard
            title="Đang xử lý"
            value={pendingCount}
            bgColor="from-orange-500 to-orange-600"
          />
        </div>

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
          />
        )}
      </div>
    </div>
  );
};

export default PayrollList;
