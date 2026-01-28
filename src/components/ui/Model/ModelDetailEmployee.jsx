import { useState } from "react";
import Modal from "../../common/Model";
import Tab from "../Tag";

const ModelDetailEmployee = ({ data, isOpen, onClose }) => {
  const [tab, setTab] = useState("info");
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
                label="Thông tin"
                active={tab === "info"}
                onClick={() => setTab("info")}
              />
              <Tab
                label="Tài khoản ngân hàng"
                active={tab === "bank"}
                onClick={() => setTab("bank")}
              />
            </div>

            <div className="mt-6">
              {tab === "info" && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 text-gray-600 min-h-64 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-xs text-gray-500 mb-1">Nơi ở</p>
                      <p className="font-semibold text-gray-900">{data.address || "Chưa cập nhật"}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-xs text-gray-500 mb-1">Số căn cước</p>
                      <p className="font-semibold text-gray-900">{data.idCard || "Chưa cập nhật"}</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="font-semibold text-gray-900">{data.email}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Điện thoại</p>
                    <p className="font-semibold text-gray-900">{data.phone}</p>
                  </div>
                </div>
              )}
              {tab === "bank" && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 text-gray-600 min-h-64 space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Tên ngân hàng</p>
                    <p className="font-semibold text-gray-900">{data.bankName || "Chưa cập nhật"}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Số tài khoản</p>
                    <p className="font-semibold text-gray-900">{data.bankAccount || "Chưa cập nhật"}</p>
                  </div>
                  <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
                    <p className="text-sm text-blue-700">💡 Cập nhật thông tin tài khoản ngân hàng tại quản lý hồ sơ cá nhân</p>
                  </div>
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
