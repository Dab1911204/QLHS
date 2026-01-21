const CheckInModal = ({
  isOpen,
  currentUser,
  checkInTime,
  checkOutTime,
  workDescription,
  productQuantity,
  workResults,
  onCheckInTimeChange,
  onCheckOutTimeChange,
  onWorkDescriptionChange,
  onProductQuantityChange,
  onSubmit,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 flex justify-between items-center sticky top-0">
          <h2 className="text-2xl font-bold">Kết quả làm việc</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:text-green-600 w-8 h-8 rounded-full flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Thông tin nhân viên */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <h3 className="font-bold text-lg text-gray-900">{currentUser.name}</h3>
            <p className="text-gray-600">{currentUser.position}</p>
            <p className="text-sm text-gray-500 mt-2">{currentUser.email}</p>
            <p className="text-sm text-green-600 font-semibold mt-3">
              📅 Ngày: {new Date().toLocaleDateString("vi-VN")}
            </p>
          </div>

          {/* Form chấm công */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Giờ vào
                </label>
                <input
                  type="time"
                  value={checkInTime}
                  onChange={(e) => onCheckInTimeChange(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Giờ ra
                </label>
                <input
                  type="time"
                  value={checkOutTime}
                  onChange={(e) => onCheckOutTimeChange(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📝 Mô tả công việc
              </label>
              <textarea
                value={workDescription}
                onChange={(e) => onWorkDescriptionChange(e.target.value)}
                placeholder="Mô tả chi tiết công việc đã làm trong hôm nay..."
                rows="4"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📦 Số lượng sản phẩm hoàn thành
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

            {checkInTime && productQuantity && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-sm text-gray-700">
                  ✓ Tổng giờ làm:{" "}
                  <span className="font-bold text-blue-600">
                    {checkOutTime
                      ? (
                          (new Date(`2000-01-01 ${checkOutTime}`) -
                            new Date(`2000-01-01 ${checkInTime}`)) /
                          3600000
                        ).toFixed(1)
                      : "Chưa xác định"}
                    h
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Dữ liệu sản phẩm */}
          {workResults.length > 0 && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <h4 className="font-bold text-lg text-gray-900 mb-4">📊 Dữ liệu sản phẩm hoàn thành</h4>
              <div className="space-y-3">
                {workResults.map((result, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg border border-purple-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{result.name}</p>
                        <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                      </div>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-bold">
                        {result.quantity} {result.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-purple-200">
                <p className="text-sm text-gray-600">
                  Tổng: <span className="font-bold text-purple-600">
                    {workResults.reduce((sum, r) => sum + r.quantity, 0)} sản phẩm
                  </span>
                </p>
              </div>
            </div>
          )}

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
      </div>
    </div>
  );
};

export default CheckInModal;
