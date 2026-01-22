import Modal from "../../common/Model";

const ModelEditEmployee = ({ onClose, isOpen, data, submit }) => {
  return (
    <Modal
      title="Sửa thông tin nhân viên"
      onClose={onClose}
      isOpen={isOpen}
      type={"edit"}
    >
      <form className="space-y-5">
        {/* Họ tên */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Họ tên
          </label>
          <input
            type="text"
            placeholder="Nguyễn Văn A"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                       focus:outline-none focus:ring-2 focus:ring-green-400
                       focus:border-transparent transition"
          />
        </div>

        {/* Vai trò */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Vai trò trong dự án
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                       focus:outline-none focus:ring-2 focus:ring-green-400
                       focus:border-transparent transition"
          >
            <option value="">-- Chọn vai trò --</option>
            <option value="Leader">Leader</option>
            <option value="Developer">Developer</option>
            <option value="Tester">Tester</option>
            <option value="Intern">Intern</option>
          </select>
        </div>

        {/* Ngày bắt đầu + kết thúc */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Ngày bắt đầu
            </label>
            <input
              type="date"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                         focus:outline-none focus:ring-2 focus:ring-green-400
                         focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Ngày kết thúc
            </label>
            <input
              type="date"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                         focus:outline-none focus:ring-2 focus:ring-green-400
                         focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Allocation + Trạng thái */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              % tham gia
            </label>
            <input
              type="number"
              min="0"
              max="100"
              placeholder="VD: 50"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                         focus:outline-none focus:ring-2 focus:ring-green-400
                         focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Trạng thái
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                         focus:outline-none focus:ring-2 focus:ring-green-400
                         focus:border-transparent transition"
            >
              <option value="Đang tham gia">Đang tham gia</option>
              <option value="Đã rút">Đã rút</option>
            </select>
          </div>
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
                       from-yellow-500 to-yellow-600 text-white font-semibold
                       hover:from-yellow-600 hover:to-yellow-700
                       shadow-md hover:shadow-lg transition"
          >
            + Sửa nhân sự
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModelEditEmployee;
