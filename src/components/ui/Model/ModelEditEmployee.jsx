import { useState } from "react";
import Modal from "../../common/Model";
import { Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";

const ModelEditEmployee = ({ onClose, isOpen, data, onUpdate }) => {
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "Support",
    startDate: "",
    status: "Đang tham gia",
  };

  // ✅ Khởi tạo form từ data props (key prop sẽ reset component)
  const [formData, setFormData] = useState(() => {
    if (!data) return initialFormData;
    return {
      name: data.name ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
      password: data.password ?? "",
      role: data.role ?? "Support",
      startDate: data.startDate ?? "",
      status: data.status ?? "Đang tham gia",
    };
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Vui lòng điền đầy đủ thông tin: Họ tên, Email!");
      return;
    }

    if (formData.password && formData.password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    if (onUpdate && data) {
      onUpdate(data.id, formData);
    }
  };

  if (!data) {
    return (
      <Modal
        title="Sửa thông tin nhân viên"
        onClose={onClose}
        isOpen={isOpen}
        type="edit"
      >
        <p className="text-gray-600">Chọn nhân viên để sửa</p>
      </Modal>
    );
  }

  return (
    <Modal
      title="Sửa thông tin nhân viên"
      onClose={onClose}
      isOpen={isOpen}
      type="edit"
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
            Mật khẩu
          </label>
          <Input.Password
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="Nhập mật khẩu mới (để trống nếu không thay đổi)"
          />
          <p className="text-xs text-gray-500 mt-1.5">Tối thiểu 6 ký tự</p>
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
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium
                       hover:bg-blue-700 transition shadow-sm"
          >
            ✓ Cập nhật
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModelEditEmployee;
