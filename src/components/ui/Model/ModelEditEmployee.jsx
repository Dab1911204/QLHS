import Modal from "../../common/Model";

const ModelEditEmployee = ({ onClose, isOpen,data,submit }) => {
  return (
    <Modal title="Sửa thông tin nhân viên" onClose={onClose} isOpen={isOpen} type={"edit"}>
      <form className="space-y-4">
        {/* Họ tên */}
        <div>
          <label className="block text-sm font-medium mb-1">Họ tên</label>
          <input
            type="text"
            placeholder="Nhập họ tên"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Vai trò trong dự án */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Vai trò trong dự án
          </label>
          <input
            type="text"
            placeholder="VD: Backend, Frontend, Tester..."
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Ngày bắt đầu */}
        <div>
          <label className="block text-sm font-medium mb-1">Ngày bắt đầu</label>
          <input type="date" className="w-full border rounded px-3 py-2" />
        </div>

        {/* Ngày kết thúc */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Ngày kết thúc (nếu có)
          </label>
          <input type="date" className="w-full border rounded px-3 py-2" />
        </div>

        {/* % tham gia */}
        <div>
          <label className="block text-sm font-medium mb-1">
            % tham gia (Allocation)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            placeholder="VD: 50"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Trạng thái */}
        <div>
          <label className="block text-sm font-medium mb-1">Trạng thái</label>
          <select className="w-full border rounded px-3 py-2">
            <option value="active">Đang tham gia</option>
            <option value="inactive">Đã rút</option>
          </select>
        </div>

        {/* Thao tác */}
        <div className="flex justify-end gap-2 pt-4">
          <button type="button" className="px-4 py-2 border rounded bg-red-400 text-white hover:bg-red-500 cursor-pointer">
            Hủy
          </button>

          <button
            type="button"
            className="px-4 py-2 border rounded bg-yellow-400 text-white hover:bg-yellow-500 cursor-pointer"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModelEditEmployee;
