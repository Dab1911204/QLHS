import { useState } from "react";
import Modal from "../../common/Model";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Họ tên */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Họ tên *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nguyễn Văn A"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                       focus:outline-none focus:ring-2 focus:ring-green-400
                       focus:border-transparent transition"
          />
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                         focus:outline-none focus:ring-2 focus:ring-green-400
                         focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Điện thoại
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0123456789"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                         focus:outline-none focus:ring-2 focus:ring-green-400
                         focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Mật khẩu */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Mật khẩu *
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                       focus:outline-none focus:ring-2 focus:ring-green-400
                       focus:border-transparent transition"
          />
        </div>

        {/*Vai trò + Trạng thái*/}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Vai trò
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                         focus:outline-none focus:ring-2 focus:ring-green-400
                         focus:border-transparent transition bg-white"
            >
              <option value="Manager">Manager</option>
              <option value="Leader">Leader</option>
              <option value="Support">Support</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Trạng thái
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                         focus:outline-none focus:ring-2 focus:ring-green-400
                         focus:border-transparent transition bg-white"
            >
              <option value="Đang tham gia">Đang tham gia</option>
              <option value="Đã rút">Đã rút</option>
            </select>
          </div>
        </div>

        {/* Ngày bắt đầu */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Ngày bắt đầu
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                       focus:outline-none focus:ring-2 focus:ring-green-400
                       focus:border-transparent transition"
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-gray-300
                       text-gray-600 hover:bg-gray-100 transition"
          >
            Hủy
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r
                       from-green-500 to-green-600 text-white font-semibold
                       hover:from-green-600 hover:to-green-700
                       shadow-md hover:shadow-lg transition"
          >
            + Thêm nhân sự
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModelAddEmployee;
