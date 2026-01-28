import { useState } from "react";
import Modal from "../../common/Model";
import { Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";

const ModelAddEmployee = ({ onClose, isOpen, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "Support",
    startDate: "",
    status: "Đang tham gia",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Vui lòng điền đầy đủ thông tin: Họ tên, Email, Mật khẩu!");
      return;
    }

    if (formData.password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    const newEmployee = {
      ...formData,
      phone: formData.phone || "",
      startDate: formData.startDate || new Date().toISOString().split("T")[0],
      endDate: formData.endDate || null,
      department: formData.department || "General",
    };

    if (onAdd) {
      onAdd(newEmployee);
    }

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "Support",
      startDate: "",
      endDate: "",
      contribution: 0,
      status: "Đang tham gia",
      department: "",
    });
  };

  return (
    <Modal
      title="Thêm nhân viên mới"
      onClose={onClose}
      isOpen={isOpen}
      type="add"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Họ tên */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Họ tên *
          </label>
          <Input
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Nguyễn Văn A"
            required
          />
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email *
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="user@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Điện thoại
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="0123456789"
            />
          </div>
        </div>

        {/* Mật khẩu */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Mật khẩu *
          </label>
          <Input.Password
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
            required
          />
        </div>

        {/* Vai trò + Trạng thái */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Vai trò
            </label>
            <Select
              value={formData.role}
              onChange={(value) => handleChange("role", value)}
              className="w-full"
              options={[
                { value: "Manager", label: "Manager" },
                { value: "Leader", label: "Leader" },
                { value: "Support", label: "Support" },
                { value: "Employee", label: "Employee" },
              ]}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Trạng thái
            </label>
            <Select
              value={formData.status}
              onChange={(value) => handleChange("status", value)}
              className="w-full"
              options={[
                { value: "Đang tham gia", label: "Đang tham gia" },
                { value: "Đã rút", label: "Đã rút" },
              ]}
            />
          </div>
        </div>

        {/* Ngày bắt đầu */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ngày bắt đầu
          </label>
          <DatePicker
            className="w-full"
            value={formData.startDate ? dayjs(formData.startDate) : null}
            onChange={(date) =>
              handleChange(
                "startDate",
                date ? date.format("YYYY-MM-DD") : ""
              )
            }
          />
        </div>

        {/* Action buttons */}
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
    </Modal>
  );
};

export default ModelAddEmployee;
