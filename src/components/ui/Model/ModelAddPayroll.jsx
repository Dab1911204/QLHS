import { useState } from "react";
import Model from "../../common/Model";

const ModelAddPayroll = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    employeeId: "",
    month: "",
    baseSalary: "",
    bonus: "0",
    deduction: "0",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.employeeId || !formData.month) {
      alert("Vui lòng chọn nhân viên và tháng!");
      return;
    }

    const payrollData = {
      employeeId: parseInt(formData.employeeId),
      month: formData.month,
      baseSalary: formData.baseSalary ? parseInt(formData.baseSalary) : 0,
      bonus: formData.bonus ? parseInt(formData.bonus) : 0,
      deduction: formData.deduction ? parseInt(formData.deduction) : 0,
    };

    if (onAdd) {
      onAdd(payrollData);
    }

    // Reset form
    setFormData({
      employeeId: "",
      month: "",
      baseSalary: "",
      bonus: "0",
      deduction: "0",
    });
  };

  if (!isOpen) return null;

  return (
    <Model isOpen={isOpen} onClose={onClose} title="Thêm bảng lương" type="add">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mã nhân viên *
          </label>
          <input
            type="number"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập mã nhân viên"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tháng *
          </label>
          <input
            type="month"
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
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
              placeholder="Nhập lương cơ bản (0 = tính từ giờ làm)"
            />
          </div>
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
              placeholder="0"
            />
          </div>
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
            placeholder="0"
          />
        </div>

        <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-600">
          <p>💡 Mẹo: Để trống "Lương cơ bản" hoặc nhập 0 để tính lương theo giờ làm thực tế</p>
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
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition"
          >
            ✓ Thêm
          </button>
        </div>
      </form>
    </Model>
  );
};

export default ModelAddPayroll;
