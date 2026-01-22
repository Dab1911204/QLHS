import { useState } from "react";
import Modal from "../../common/Model";
import Tab from "../Tag";

const ModelDetailEmployee = ({ data, isOpen, onClose }) => {
  const [tab, setTab] = useState("task");
  if (!isOpen || !data) return null;
  return (
    <Modal
      title="Thông tin chi tiết nhân sự"
      isOpen={isOpen}
      onClose={onClose}
      type={"detail"}
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="grid grid-cols-3 gap-0">
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 space-y-4 border-r border-gray-100">
            <div>
              <h3 className="font-bold text-2xl text-gray-900">{data.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Nhân viên</p>
            </div>
            <div className="space-y-3 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Vai trò:</span>
                <span className="font-semibold text-gray-900">{data.role}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold text-blue-600">
                  {data.email}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">SĐT:</span>
                <span className="font-semibold text-gray-900">{data.phone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tham gia:</span>
                <span className="font-semibold text-gray-900">
                  {data.startDate}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg hover:from-red-600 hover:to-red-700 font-semibold transition"
            >
              Đóng
            </button>
          </div>

          
          <div className="col-span-2 p-8">
            <div className="flex gap-6 border-b border-gray-200 mb-6">
              <Tab
                label="Task"
                active={tab === "task"}
                onClick={() => setTab("task")}
              />
              <Tab
                label="Effort"
                active={tab === "effort"}
                onClick={() => setTab("effort")}
              />
              <Tab
                label="Chấm công"
                active={tab === "attendance"}
                onClick={() => setTab("attendance")}
              />
              <Tab
                label="Đánh giá"
                active={tab === "review"}
                onClick={() => setTab("review")}
              />
            </div>

            <div className="mt-6">
              {tab === "task" && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 text-gray-600 min-h-64">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Danh sách task đang làm
                  </h4>
                  <p className="text-sm">Không có task nào</p>
                </div>
              )}
              {tab === "effort" && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 text-gray-600 min-h-64">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Số giờ làm theo ngày / task
                  </h4>
                  <p className="text-sm">Chưa có dữ liệu</p>
                </div>
              )}
              {tab === "attendance" && (
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-6 text-gray-600 min-h-64">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Bảng chấm công
                  </h4>
                  <p className="text-sm">(ngày, giờ vào, giờ ra)</p>
                </div>
              )}
              {tab === "review" && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 text-gray-600 min-h-64">
                  <h4 className="font-semibold text-gray-900 mb-4">Đánh giá</h4>
                  <p className="text-sm">Điểm hiệu suất & nhận xét PM</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModelDetailEmployee;
