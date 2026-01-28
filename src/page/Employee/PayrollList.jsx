import { useMemo, useState } from "react";
import { Input, Select } from "antd";
import ModelAddPayroll from "../../components/ui/Model/ModelAddPayroll";
import ModelPayrollDetail from "../../components/ui/Model/ModelPayrollDetail";
import ModelUpdatePayroll from "../../components/ui/Model/ModelUpdatePayroll";
import PayrollBody from "../../components/Tables/Body/PayrollBody";
import Header from "../../components/Tables/Header";
import { useData } from "../../contexts/Data/DataContext";
import { getAllPayrolls, calculateMonthlyPayroll } from "../../data/data";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../redux/slices/userInfo";

const hearderTitles = [
  "Mã NV",
  "Nhân viên",
  "Vai trò",
  "Giờ/Phiếu",
  "Lương cơ bản",
  "Thưởng",
  "Khấu trừ",
  "Lương ròng",
  "Trạng thái",
  "Hành động",
];

const PayrollList = () => {
  const { data, addPayroll, updatePayroll } = useData();
  const [search, setSearch] = useState("");
  const userInfo = useSelector(userInfoSelector);
  const [filterPosition, setFilterPosition] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMonth, setFilterMonth] = useState(new Date().getMonth() + 1);
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);

  const allPayrollRecords = getAllPayrolls(data);

  const records = useMemo(() => {
    return allPayrollRecords.filter((record) => {
      const matchSearch = record.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchPosition =
        filterPosition === "all" || record.role === filterPosition;

      const matchStatus =
        filterStatus === "all" || record.status === filterStatus;

      // Parse month from "MM/YYYY" format
      const recordMonth = parseInt(record.month.split("/")[0]);
      const recordYear = parseInt(record.month.split("/")[1]);
      const matchMonth = filterMonth === "all" || recordMonth === filterMonth;
      const matchYear = filterYear === "all" || recordYear === filterYear;

      return (
        matchSearch && matchPosition && matchStatus && matchMonth && matchYear
      );
    });
  }, [
    search,
    filterPosition,
    filterStatus,
    filterMonth,
    filterYear,
    allPayrollRecords,
  ]);

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
    // Luôn tính lương cơ bản từ giờ làm thực tế
    const { month: monthStr, employeeId } = newPayroll;
    const monthValue = parseInt(monthStr.split("/")[0]);
    const yearValue = parseInt(monthStr.split("/")[1]);

    const calculatedPayroll = calculateMonthlyPayroll(
      data,
      employeeId,
      monthValue,
      yearValue,
      0,
      0,
    );

    if (calculatedPayroll) {
      // Kiểm tra xem bảng lương đã tồn tại chưa
      const existingPayroll = data.payrolls.find(
        (p) =>
          p.employeeId === employeeId && p.month === calculatedPayroll.month,
      );

      if (existingPayroll) {
        updatePayroll(existingPayroll.id, calculatedPayroll);
      } else {
        addPayroll(calculatedPayroll);
      }
    }
    setShowModalAdd(false);
  };

  const handleUpdatePayroll = (payrollId, updatedData) => {
    updatePayroll(payrollId, updatedData);
    setShowUpdateModal(false);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ===== Tìm kiếm ===== */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <Input
            placeholder="🔍 Tìm kiếm nhân viên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ===== Bộ lọc ===== */}
        <div className="flex gap-4 flex-wrap">
          <Select
            value={filterPosition}
            onChange={(value) => setFilterPosition(value)}
            className="min-w-[180px]"
            options={[
              { value: "all", label: "Tất cả vị trí" },
              { value: "Manager", label: "Manager" },
              { value: "Leader", label: "Leader" },
              { value: "Support", label: "Support" },
              { value: "Employee", label: "Employee" },
            ]}
          />
          <Select
            value={filterMonth}
            onChange={(value) => setFilterMonth(value)}
            className="min-w-[150px]"
            options={[
              { value: "all", label: "Tất cả tháng" },
              ...Array.from({ length: 12 }, (_, i) => ({
                value: i + 1,
                label: `Tháng ${i + 1}`,
              })),
            ]}
          />
          <Select
            value={filterYear}
            onChange={(value) => setFilterYear(value)}
            className="min-w-[120px]"
            options={[
              { value: "all", label: "Tất cả năm" },
              ...Array.from({ length: 5 }, (_, i) => {
                const year = new Date().getFullYear() - 2 + i;
                return { value: year, label: year.toString() };
              }),
            ]}
          />
          <Select
            value={filterStatus}
            onChange={(value) => setFilterStatus(value)}
            className="min-w-[200px]"
            options={[
              { value: "all", label: "Tất cả trạng thái" },
              { value: "Đã thanh toán", label: "Đã thanh toán" },
              { value: "Đang xử lý", label: "Đang xử lý" },
            ]}
          />
          {userInfo.role !== "Employee" && (
            <button
              onClick={handleShowAdd}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 font-medium transition shadow-md"
            >
              + Thêm bảng lương
            </button>
          )}
        </div>

        {/* ===== Bảng lương ===== */}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <table className="w-full">
            <Header titles={hearderTitles} />
            <PayrollBody
              items={records}
              onViewDetail={handleShowDetail}
              onUpdatePayroll={handleShowUpdate}
              userInfo={userInfo}
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
