import Model from "../../common/Model";
import { TimePicker, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";

const UNIT_OPTIONS = [
  { value: "phiếu", label: "Nhập tài liệu" },
  { value: "bug", label: "Scan" },
];

const CheckInModal = ({
  isOpen,
  currentUser,
  checkInTime,
  checkOutTime,
  workDescription,
  productQuantity,
  workUnit = "module",
  onCheckInTimeChange,
  onCheckOutTimeChange,
  onWorkDescriptionChange,
  onProductQuantityChange,
  onWorkUnitChange,
  onSubmit,
  onClose,
}) => {
  if (!isOpen) return null;

  // Tính giờ làm nếu có cả giờ vào và giờ ra (trừ thời gian nghỉ trưa 12h-13h)
  let workHours = 0;
  if (checkInTime && checkOutTime) {
    const [inHour, inMin] = checkInTime.split(":").map(Number);
    const [outHour, outMin] = checkOutTime.split(":").map(Number);
    const checkInDecimal = inHour + inMin / 60;
    const checkOutDecimal = outHour + outMin / 60;

    if (checkOutDecimal > checkInDecimal) {
      const rawHours = checkOutDecimal - checkInDecimal;
      const breakStart = 12;
      const breakEnd = 13;
      const overlap =
        Math.max(0, Math.min(checkOutDecimal, breakEnd) - Math.max(checkInDecimal, breakStart));
      workHours = rawHours - overlap;
    } else {
      workHours = 0;
    }
  }

  // Kiểm tra xem có muộn không (sau 8:30)
  let isLate = false;
  if (checkInTime) {
    const [inHour, inMin] = checkInTime.split(":").map(Number);
    isLate = inHour > 8 || (inHour === 8 && inMin > 30);
  }

  return (
    <Model isOpen={isOpen} onClose={onClose} type="check" title="Chấm công">
      <div className="p-8 space-y-6">
        {/* Thông tin nhân viên */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
          <h3 className="font-bold text-lg text-gray-900">
            {currentUser.name}
          </h3>
          <p className="text-gray-600">{currentUser.position}</p>
          <p className="text-sm text-gray-500 mt-2">{currentUser.email}</p>
          <p className="text-sm text-green-600 font-semibold mt-3">
            📅 Ngày: {new Date().toLocaleDateString("vi-VN")}
          </p>
        </div>

        {/* Form chấm công */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Giờ vào - TimePicker antd */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ⏰ Giờ vào
              </label>
              <TimePicker
                value={checkInTime ? dayjs(checkInTime, "HH:mm") : null}
                onChange={(time) => {
                  onCheckInTimeChange(time ? time.format("HH:mm") : "");
                }}
                format="HH:mm"
                className="w-full"
              />
              {isLate && checkInTime && (
                <p className="text-xs text-orange-600 mt-1">
                  ⚠️ Vào muộn (sau 8:00)
                </p>
              )}
            </div>

            {/* Giờ ra - TimePicker antd */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ⏰ Giờ ra
              </label>
              <TimePicker
                value={checkOutTime ? dayjs(checkOutTime, "HH:mm") : null}
                onChange={(time) => {
                  onCheckOutTimeChange(time ? time.format("HH:mm") : "");
                }}
                format="HH:mm"
                className="w-full"
              />
            </div>
          </div>

          {/* Hiển thị tổng giờ làm */}
          {checkInTime && checkOutTime && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="text-sm text-gray-700">
                ✓ Tổng giờ làm:{" "}
                <span className="font-bold text-green-600">{workHours.toFixed(1)}h</span>
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📝 Mô tả công việc
            </label>
            <Input.TextArea
              value={workDescription}
              onChange={(e) => onWorkDescriptionChange(e.target.value)}
              placeholder="Mô tả chi tiết công việc đã làm trong hôm nay..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📊 Số lượng hoàn thành
              </label>
              <InputNumber
                value={productQuantity}
                onChange={(value) => onProductQuantityChange(value ?? "")}
                placeholder="Nhập số lượng..."
                min={0}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📦 Công việc
              </label>
              <Select
                value={workUnit}
                onChange={(value) => onWorkUnitChange(value)}
                className="w-full"
                options={UNIT_OPTIONS.map((option) => ({
                  label: option.label,
                  value: option.value,
                }))}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-end pt-4 sticky bottom-0 bg-white border-t">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-semibold transition"
          >
            Hủy
          </button>
          <button
            onClick={onSubmit}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-green-700 font-semibold transition"
          >
            ✓ Xác nhận
          </button>
        </div>
      </div>
    </Model>
  );
};

export default CheckInModal;
