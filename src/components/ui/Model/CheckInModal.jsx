import Model from "../../common/Model";

const UNIT_OPTIONS = [
  { value: "module", label: "Module" },
  { value: "bug", label: "Bug" },
  { value: "file", label: "File" },
  { value: "test", label: "Test" },
  { value: "endpoint", label: "Endpoint" },
  { value: "screen", label: "Screen" },
  { value: "component", label: "Component" },
  { value: "test case", label: "Test Case" },
  { value: "deployment", label: "Deployment" },
  { value: "meeting", label: "Meeting" },
  { value: "exercise", label: "Exercise" },
  { value: "assignment", label: "Assignment" },
];

const CheckInModal = ({
  isOpen,
  currentUser,
  checkInTime,
  checkOutTime,
  workDescription,
  productQuantity,
  workUnit = "module",
  workResults = [],
  onCheckInTimeChange,
  onCheckOutTimeChange,
  onWorkDescriptionChange,
  onProductQuantityChange,
  onWorkUnitChange,
  onSubmit,
  onClose,
}) => {
  if (!isOpen) return null;

  // Tính giờ làm nếu có cả giờ vào và giờ ra
  let workHours = 0;
  if (checkInTime && checkOutTime) {
    const [inHour, inMin] = checkInTime.split(":").map(Number);
    const [outHour, outMin] = checkOutTime.split(":").map(Number);
    workHours = (outHour + outMin / 60) - (inHour + inMin / 60);
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
            {/* Giờ vào - Clock Picker */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ⏰ Giờ vào
              </label>
              <div className={`border-2 rounded-lg p-4 transition ${
                isLate
                  ? "border-orange-400 bg-orange-50"
                  : "border-gray-200 bg-white"
              }`}>
                <div className="flex items-center justify-center gap-2">
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => {
                        const [h, m] = checkInTime.split(":").map(Number);
                        const newHour = h === 23 ? 0 : h + 1;
                        onCheckInTimeChange(`${String(newHour).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
                      }}
                      className="text-gray-600 hover:text-gray-900 p-1"
                    >
                      ▲
                    </button>
                    <input
                      type="number"
                      value={checkInTime.split(":")[0]}
                      onChange={(e) => {
                        const hour = Math.max(0, Math.min(23, parseInt(e.target.value) || 0));
                        const [, m] = checkInTime.split(":").map(Number);
                        onCheckInTimeChange(`${String(hour).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
                      }}
                      className="w-12 text-center text-2xl font-bold border-0 bg-transparent focus:outline-none"
                      min="0"
                      max="23"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const [h, m] = checkInTime.split(":").map(Number);
                        const newHour = h === 0 ? 23 : h - 1;
                        onCheckInTimeChange(`${String(newHour).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
                      }}
                      className="text-gray-600 hover:text-gray-900 p-1"
                    >
                      ▼
                    </button>
                  </div>
                  <span className="text-2xl font-bold">:</span>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => {
                        const [h, m] = checkInTime.split(":").map(Number);
                        const newMin = m === 59 ? 0 : m + 5;
                        onCheckInTimeChange(`${String(h).padStart(2, "0")}:${String(newMin).padStart(2, "0")}`);
                      }}
                      className="text-gray-600 hover:text-gray-900 p-1"
                    >
                      ▲
                    </button>
                    <input
                      type="number"
                      value={checkInTime.split(":")[1]}
                      onChange={(e) => {
                        const min = Math.max(0, Math.min(59, parseInt(e.target.value) || 0));
                        const [h] = checkInTime.split(":").map(Number);
                        onCheckInTimeChange(`${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`);
                      }}
                      className="w-12 text-center text-2xl font-bold border-0 bg-transparent focus:outline-none"
                      min="0"
                      max="59"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const [h, m] = checkInTime.split(":").map(Number);
                        const newMin = m === 0 ? 59 : m - 5;
                        onCheckInTimeChange(`${String(h).padStart(2, "0")}:${String(newMin).padStart(2, "0")}`);
                      }}
                      className="text-gray-600 hover:text-gray-900 p-1"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>
              {isLate && checkInTime && (
                <p className="text-xs text-orange-600 mt-1">⚠️ Vào muộn (sau 8:30)</p>
              )}
            </div>

            {/* Giờ ra - Clock Picker */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ⏰ Giờ ra
              </label>
              <div className="border-2 border-gray-200 bg-white rounded-lg p-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => {
                        const [h, m] = checkOutTime.split(":").map(Number);
                        const newHour = h === 23 ? 0 : h + 1;
                        onCheckOutTimeChange(`${String(newHour).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
                      }}
                      className="text-gray-600 hover:text-gray-900 p-1"
                    >
                      ▲
                    </button>
                    <input
                      type="number"
                      value={checkOutTime.split(":")[0]}
                      onChange={(e) => {
                        const hour = Math.max(0, Math.min(23, parseInt(e.target.value) || 0));
                        const [, m] = checkOutTime.split(":").map(Number);
                        onCheckOutTimeChange(`${String(hour).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
                      }}
                      className="w-12 text-center text-2xl font-bold border-0 bg-transparent focus:outline-none"
                      min="0"
                      max="23"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const [h, m] = checkOutTime.split(":").map(Number);
                        const newHour = h === 0 ? 23 : h - 1;
                        onCheckOutTimeChange(`${String(newHour).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
                      }}
                      className="text-gray-600 hover:text-gray-900 p-1"
                    >
                      ▼
                    </button>
                  </div>
                  <span className="text-2xl font-bold">:</span>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => {
                        const [h, m] = checkOutTime.split(":").map(Number);
                        const newMin = m === 59 ? 0 : m + 5;
                        onCheckOutTimeChange(`${String(h).padStart(2, "0")}:${String(newMin).padStart(2, "0")}`);
                      }}
                      className="text-gray-600 hover:text-gray-900 p-1"
                    >
                      ▲
                    </button>
                    <input
                      type="number"
                      value={checkOutTime.split(":")[1]}
                      onChange={(e) => {
                        const min = Math.max(0, Math.min(59, parseInt(e.target.value) || 0));
                        const [h] = checkOutTime.split(":").map(Number);
                        onCheckOutTimeChange(`${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`);
                      }}
                      className="w-12 text-center text-2xl font-bold border-0 bg-transparent focus:outline-none"
                      min="0"
                      max="59"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const [h, m] = checkOutTime.split(":").map(Number);
                        const newMin = m === 0 ? 59 : m - 5;
                        onCheckOutTimeChange(`${String(h).padStart(2, "0")}:${String(newMin).padStart(2, "0")}`);
                      }}
                      className="text-gray-600 hover:text-gray-900 p-1"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>
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
            <textarea
              value={workDescription}
              onChange={(e) => onWorkDescriptionChange(e.target.value)}
              placeholder="Mô tả chi tiết công việc đã làm trong hôm nay..."
              rows="3"
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📊 Số lượng hoàn thành
              </label>
              <input
                type="number"
                value={productQuantity}
                onChange={(e) => onProductQuantityChange(e.target.value)}
                placeholder="Nhập số lượng..."
                min="0"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📦 Đơn vị sản phẩm
              </label>
              <select
                value={workUnit}
                onChange={(e) => onWorkUnitChange(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white"
              >
                {UNIT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
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
