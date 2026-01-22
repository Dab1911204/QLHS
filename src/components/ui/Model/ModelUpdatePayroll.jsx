import { useState } from "react";
import Model from "../../common/Model";

const ModelUpdatePayroll = ({ isOpen, onClose, payroll }) => {
  const [rating, setRating] = useState(payroll?.rating || 5);
  const [comment, setComment] = useState(payroll?.comment || "");
  const [formData, setFormData] = useState({
    baseSalary: payroll?.baseSalary || "",
    bonus: payroll?.bonus || "",
    deduction: payroll?.deduction || "",
    status: payroll?.status || "Đang xử lý",
    rating: payroll?.rating || 5,
    comment: payroll?.comment || "",
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
    // Handle payroll update
    console.log("Payroll updated:", formData);
    onClose();
  };

  if (!isOpen || !payroll) return null;

  const netSalary =
    parseInt(formData.baseSalary || 0) +
    parseInt(formData.bonus || 0) -
    parseInt(formData.deduction || 0);

  return (
    <Model
      isOpen={isOpen}
      onClose={onClose}
      title="Cập nhật bảng lương"
      type="edit"
    >
      <p className="text-gray-600 mb-6">{payroll.name}</p>

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
            required
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
              required
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
              required
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Xếp hạng (1-10)
          </label>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`w-10 h-10 rounded-lg font-semibold transition ${
                  rating >= star
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {star}
              </button>
            ))}
          </div>
          <p className="text-center text-lg font-bold text-yellow-600">
            Đánh giá: {rating}/10
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nhận xét
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập nhận xét về hiệu suất làm việc"
            rows="4"
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
            Cập nhật
          </button>
        </div>
      </form>
    </Model>
  );
};

export default ModelUpdatePayroll;
