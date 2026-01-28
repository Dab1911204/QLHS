import { useState } from "react";
import Model from "../../common/Model";
import { Select } from "antd";
import dayjs from "dayjs";
import { useData } from "../../../contexts/Data/DataContext";

const getInitialFormData = () => {
  const now = dayjs();
  return {
    employeeIds: [],
    month: now.month() + 1,
    year: now.year(),
  };
};

const ModelAddPayroll = ({ isOpen, onClose, onAdd }) => {
  const { data } = useData();
  const [formData, setFormData] = useState(getInitialFormData);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.employeeIds.length || !formData.month || !formData.year) {
      alert("Vui lòng chọn nhân viên và tháng!");
      return;
    }

    const monthStr = `${String(formData.month).padStart(2, "0")}/${formData.year}`;

    formData.employeeIds.forEach((employeeId) => {
      onAdd?.({
        employeeId,
        month: monthStr,
      });
    });

    // reset form sau khi submit
    setFormData(getInitialFormData());
    onClose();
  };

  // danh sách nhân viên đang tham gia
  const employeeOptions = data.employees
    .filter((emp) => emp.status === "Đang tham gia")
    .map((emp) => ({
      value: emp.id,
      label: `${emp.name} (${emp.role})`,
    }));

  if (!isOpen) return null;

  return (
    <Model isOpen={isOpen} onClose={onClose} title="Thêm bảng lương" type="add">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Chọn nhân viên *
          </label>
          <Select
            mode="multiple"
            className="w-full"
            value={formData.employeeIds}
            onChange={(value) => handleChange("employeeIds", value)}
            options={employeeOptions}
            placeholder="Chọn nhân viên cần thêm lương"
            maxTagCount="responsive"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tháng *
            </label>
            <Select
              className="w-full"
              value={formData.month}
              onChange={(value) => handleChange("month", value)}
              options={Array.from({ length: 12 }, (_, i) => ({
                value: i + 1,
                label: `Tháng ${i + 1}`,
              }))}
              placeholder="Chọn tháng"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Năm *
            </label>
            <Select
              className="w-full"
              value={formData.year}
              onChange={(value) => handleChange("year", value)}
              options={Array.from({ length: 5 }, (_, i) => {
                const year = new Date().getFullYear() - 2 + i;
                return { value: year, label: year.toString() };
              })}
              placeholder="Chọn năm"
            />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm text-gray-600">
          💡 Chọn nhân viên và tháng để thêm bảng lương. Thưởng/Khấu trừ sẽ được
          xử lý trong phần sửa.
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700
                       hover:bg-gray-100 font-medium transition"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium
                       hover:bg-green-700 transition shadow-sm"
          >
            ✓ Thêm
          </button>
        </div>
      </form>
    </Model>
  );
};

export default ModelAddPayroll;
