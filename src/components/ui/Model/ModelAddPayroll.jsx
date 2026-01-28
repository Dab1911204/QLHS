import { useState } from "react";
import Model from "../../common/Model";
import { InputNumber, DatePicker, Input } from "antd";
import dayjs from "dayjs";

const ModelAddPayroll = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    employeeId: "",
    month: "",
    baseSalary: "",
    bonus: "0",
    deduction: "0",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
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
          <InputNumber
            className="w-full"
            value={formData.employeeId ? Number(formData.employeeId) : null}
            onChange={(value) =>
              handleChange("employeeId", value !== null ? String(value) : "")
            }
            placeholder="Nhập mã nhân viên"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tháng *
          </label>
          <DatePicker
            picker="month"
            className="w-full"
            value={formData.month ? dayjs(formData.month, "MM/YYYY") : null}
            onChange={(date) =>
              handleChange("month", date ? date.format("MM/YYYY") : "")
            }
            placeholder="Chọn tháng"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lương cơ bản (VND)
            </label>
            <InputNumber
              className="w-full"
              value={formData.baseSalary ? Number(formData.baseSalary) : null}
              onChange={(value) =>
                handleChange(
                  "baseSalary",
                  value !== null ? String(value) : ""
                )
              }
              placeholder="Nhập lương cơ bản (0 = tính từ giờ làm)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thưởng (VND)
            </label>
            <InputNumber
              className="w-full"
              value={formData.bonus ? Number(formData.bonus) : 0}
              onChange={(value) =>
                handleChange("bonus", value !== null ? String(value) : "0")
              }
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Khấu trừ (VND)
          </label>
          <InputNumber
            className="w-full"
            value={formData.deduction ? Number(formData.deduction) : 0}
            onChange={(value) =>
              handleChange(
                "deduction",
                value !== null ? String(value) : "0"
              )
            }
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
