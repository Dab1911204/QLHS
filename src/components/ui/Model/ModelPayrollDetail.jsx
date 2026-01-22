import { useMemo } from "react";
import Model from "../../common/Model";
import { getEmployeeRoleByPayroll } from "../../../data/data";

const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

const ModelPayrollDetail = ({ isOpen, onClose, payroll }) => {

  // Lấy thông tin nhân viên từ payroll - chỉ cần truyền id
  const employeeInfo = useMemo(() => {
    if (!payroll) return null;
    return getEmployeeRoleByPayroll(payroll.id);
  }, [payroll]);

  if (!isOpen || !payroll) return null;  

  const netSalary = payroll.baseSalary + payroll.bonus - payroll.deduction;
  const isPaid = payroll.status === "Đã thanh toán";

  return (
    <Model
      isOpen={isOpen}
      onClose={onClose}
      title="Chi tiết bảng lương"
      type="detail"
    >
      <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-1">
        {/* ===== Nhân viên ===== */}
        <div className="bg-gray-50 rounded-xl p-5 border">
          <h3 className="text-base font-semibold text-gray-800 mb-4">
            👤 Thông tin nhân viên
          </h3>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <Info label="Họ tên" value={payroll.name} />
            <Info label="Mã NV" value={`#${payroll.employeeId}`} />
            <Info label="Vai trò" value={employeeInfo?.role || "N/A"} />
            <Info label="Email" value={employeeInfo?.email || "N/A"} />
            <Info label="Tháng lương" value={payroll.month} />
            <Info label="Trạng thái" value={payroll.status} />
          </div>
        </div>

        {/* ===== Lương ===== */}
        <div className="bg-white rounded-xl p-5 border">
          <h3 className="text-base font-semibold text-gray-800 mb-4">
            💰 Chi tiết lương
          </h3>

          <SalaryRow label="Lương cơ bản" value={payroll.baseSalary} />
          <SalaryRow
            label="Thưởng"
            value={payroll.bonus}
            color="text-green-600"
            prefix="+"
          />
          <SalaryRow
            label="Khấu trừ"
            value={payroll.deduction}
            color="text-red-600"
            prefix="-"
          />

          <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <span className="font-semibold text-gray-800">Lương ròng</span>
            <span className="text-2xl font-bold text-blue-600">
              {formatCurrency(netSalary)}
            </span>
          </div>
        </div>

        {/* ===== Trạng thái ===== */}
        <div className="bg-gray-50 rounded-xl p-5 border flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-800">
              📌 Trạng thái thanh toán
            </h3>
            <p className="text-sm text-gray-500">Tình trạng xử lý bảng lương</p>
          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2
              ${
                isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
          >
            {isPaid ? "✔ Đã thanh toán" : "⏳ Chưa thanh toán"}
          </span>
        </div>
      </div>

      {/* ===== Footer ===== */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Đóng
        </button>
      </div>
    </Model>
  );
};

/* ===== Components nhỏ cho gọn ===== */
const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-semibold text-gray-900">{value}</p>
  </div>
);

const SalaryRow = ({ label, value, color = "text-gray-900", prefix = "" }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-gray-700">{label}</span>
    <span className={`font-semibold ${color}`}>
      {prefix}
      {formatCurrency(value)}
    </span>
  </div>
);

export default ModelPayrollDetail;
