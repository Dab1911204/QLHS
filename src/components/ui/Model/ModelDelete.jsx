import Modal from "../../common/Model";

const ModelDelete = ({
  title = "Xác nhận xoá",
  content = "Bạn có chắc chắn muốn xoá dữ liệu này không?",
  onClose,
  isOpen,
}) => {
  return (
    <Modal
      title={title}
      onClose={onClose}
      isOpen={isOpen}
      type="delete"
    >
      <div className="p-4">
        {/* Nội dung cảnh báo */}
        <p className="text-gray-700 mb-6">
          {content}
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Huỷ
          </button>

          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
          >
            Xoá
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModelDelete;
