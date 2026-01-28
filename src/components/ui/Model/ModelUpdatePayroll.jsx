import { useState, useEffect } from "react";
import Model from "../../common/Model";
import { Input, InputNumber, Select } from "antd";
import { useData } from "../../../contexts/Data/DataContext";
import {
  getTotalHoursByEmployeeAndMonth,
  getTotalProductsByEmployeeAndMonth,
  calculateSalaryByHours,
  calculateSalaryByProducts,
} from "../../../data/data";

const formatCurrency = (value) => {
  if (value === null || value === undefined || isNaN(value)) return "0 ₫";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
};

const ModelUpdatePayroll = ({ isOpen, onClose, payroll, onUpdate }) => {
  const { data } = useData();
  const [formData, setFormData] = useState({
    bonus: "0",
    deduction: "0",
    status: "Đang xử lý",
  });

  // Lấy thông tin giờ/phiếu từ attendance
  const [payrollInfo, setPayrollInfo] = useState({
    totalHours: 0,
    totalProducts: 0,
    baseSalary: 0,
  });

  useEffect(() => {
    if (payroll && isOpen && data) {
      setFormData({
        bonus: payroll.bonus || "0",
        deduction: payroll.deduction || "0",
        status: payroll.status || "Đang xử lý",
      });

      // Tính toán giờ/phiếu từ attendance
      const month = parseInt(payroll.month.split("/")[0]);
      const year = parseInt(payroll.month.split("/")[1]);
      const employee = data.employees.find((e) => e.id === payroll.employeeId);

      if (employee) {
        let totalHours = 0;
        let totalProducts = 0;
        let baseSalary = 0;

        if (["Manager", "Leader", "Support"].includes(employee.role)) {
          totalHours = getTotalHoursByEmployeeAndMonth(data, payroll.employeeId, month, year);
          baseSalary = calculateSalaryByHours(totalHours);
        } else if (employee.role === "Employee") {
          totalProducts = getTotalProductsByEmployeeAndMonth(
            data,
            payroll.employeeId,
            month,
            year
          );
          baseSalary = calculateSalaryByProducts(totalProducts);
        }

        setPayrollInfo({ totalHours, totalProducts, baseSalary });
      }
    }
  }, [payroll, isOpen, data]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onUpdate && payroll) {
      const updatedData = {
        bonus: formData.bonus ? parseInt(formData.bonus) : 0,
        deduction: formData.deduction ? parseInt(formData.deduction) : 0,
        status: formData.status,
        baseSalary: payrollInfo.baseSalary,
        totalHours: payrollInfo.totalHours,
        totalProducts: payrollInfo.totalProducts,
      };
      onUpdate(payroll.id, updatedData);
    }
  };

  if (!isOpen || !payroll) return null;

  const netSalary =
    payrollInfo.baseSalary +
    (formData.bonus ? parseInt(formData.bonus) : 0) -
    (formData.deduction ? parseInt(formData.deduction) : 0);

  return (
    <Model
      isOpen={isOpen}
      onClose={onClose}
      title="Cập nhật bảng lương"
      type="edit"
    >
      <p className="text-gray-600 mb-2 font-semibold">Nhân viên: {payroll.name}</p>
      <p className="text-gray-500 mb-6 text-sm">Tháng: {payroll.month}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Hiển thị giờ/phiếu làm được */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-xs text-gray-600 mb-1">Giờ/Phiếu làm được</p>
          <p className="text-xl font-bold text-blue-600">
            {payroll.role && ["Manager", "Leader", "Support"].includes(payroll.role)
              ? `${payrollInfo.totalHours} giờ`
              : `${payrollInfo.totalProducts} phiếu`}
          </p>
        </div>

        {/* Hiển thị lương cơ bản (tính tự động, không cho edit) */}
        <div className="bg-gray-50 rounded-lg p-4 border">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lương cơ bản (VND) - Tính tự động từ giờ/phiếu
          </label>
          <Input
            disabled
            value={formatCurrency(payrollInfo.baseSalary)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thưởng (VND)
            </label>
            <InputNumber
              className="w-full"
              value={parseInt(formData.bonus || "0")}
              min={0}
              onChange={(value) =>
                handleChange("bonus", value !== null ? String(value) : "0")
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Khấu trừ (VND)
            </label>
            <InputNumber
              className="w-full"
              value={parseInt(formData.deduction || "0")}
              min={0}
              onChange={(value) =>
                handleChange("deduction", value !== null ? String(value) : "0")
              }
            />
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Lương ròng</p>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(netSalary)}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trạng thái
          </label>
          <Select
            value={formData.status}
            onChange={(value) => handleChange("status", value)}
            className="w-full"
            options={[
              { value: "Đang xử lý", label: "Đang xử lý" },
              { value: "Đã thanh toán", label: "Đã thanh toán" },
            ]}
          />
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-medium transition"
          >
            ✓ Cập nhật
          </button>
        </div>
      </form>
    </Model>
  );
};

export default ModelUpdatePayroll;
