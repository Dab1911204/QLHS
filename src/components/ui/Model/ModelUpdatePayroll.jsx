import { useState, useEffect } from "react";
import Model from "../../common/Model";

const ModelUpdatePayroll = ({ isOpen, onClose, payroll, onUpdate }) => {
  const [formData, setFormData] = useState({
    baseSalary: "",
    bonus: "0",
    deduction: "0",
    status: "Đang xử lý",
  });

  useEffect(() => {
    if (payroll && isOpen) {
      setFormData({
        baseSalary: payroll.baseSalary || "",
        bonus: payroll.bonus || "0",
        deduction: payroll.deduction || "0",
        status: payroll.status || "Đang xử lý",
      });
    }
  }, [payroll, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (onUpdate && payroll) {
      const updatedData = {
        baseSalary: formData.baseSalary ? parseInt(formData.baseSalary) : 0,
        bonus: formData.bonus ? parseInt(formData.bonus) : 0,
        deduction: formData.deduction ? parseInt(formData.deduction) : 0,
        status: formData.status,
      };
      onUpdate(payroll.id, updatedData);
    }
  };

  if (!isOpen || !payroll) return null;

  const netSalary =
    (formData.baseSalary ? parseInt(formData.baseSalary) : 0) +
    (formData.bonus ? parseInt(formData.bonus) : 0) -
    (formData.deduction ? parseInt(formData.deduction) : 0);

  return (
    <Model
      isOpen={isOpen}
      onClose={onClose}
      title="Cập nhật bảng lương"
      type="edit"
    >
      <p className="text-gray-600 mb-6 font-semibold">Nhân viên: {payroll.name}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lương cơ bản (VND)
          </label>
          <input
            type="number"
            name="baseSalary"
            value={formData.baseSalary}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thưởng (VND)
            </label>
            <input
              type="number"
              name="bonus"
              value={formData.bonus}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Khấu trừ (VND)
            </label>
            <input
              type="number"
              name="deduction"
              value={formData.deduction}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Lương ròng</p>
          <p className="text-2xl font-bold text-blue-600">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
              maximumFractionDigits: 0,
            }).format(netSalary)}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trạng thái
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="Đang xử lý">Đang xử lý</option>
            <option value="Đã thanh toán">Đã thanh toán</option>
          </select>
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
