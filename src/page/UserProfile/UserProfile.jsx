import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserInfo, updateUserPassword, userInfoSelector } from "../../redux/slices/userInfo";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("info");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(userInfoSelector);

  // Tab 1: Sửa thông tin cá nhân
  const [infoForm, setInfoForm] = useState({
    name: userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
    status: userInfo.status,
  });

  // Tab 2: Đổi mật khẩu
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setInfoForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateInfo = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    dispatch(updateUserInfo(infoForm));
    setMessage("✅ Cập nhật thông tin cá nhân thành công!");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Validate old password
    if (passwordForm.oldPassword !== userInfo.password) {
      setError("Mật khẩu cũ không chính xác!");
      return;
    }

    // Validate new password
    if (passwordForm.newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }

    // Validate confirm password
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    // Update password
    dispatch(updateUserPassword(passwordForm.newPassword));
    setMessage("✅ Cập nhật mật khẩu thành công!");
    setPasswordForm({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setTimeout(() => setMessage(""), 3000);
  };

  if (!userInfo.isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Chưa đăng nhập</h2>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Quay lại đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-3xl">
              {userInfo.avatar ? (
                <img
                  src={userInfo.avatar}
                  alt={userInfo.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                userInfo.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{userInfo.name}</h1>
              <p className="text-gray-600 text-lg">{userInfo.position || userInfo.role}</p>
              <p className="text-gray-500">{userInfo.email}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tab Buttons */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("info")}
              className={`flex-1 py-4 px-6 font-semibold transition ${
                activeTab === "info"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>Thông tin cá nhân</span>
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`flex-1 py-4 px-6 font-semibold transition ${
                activeTab === "password"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>Đổi mật khẩu</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {message && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                {message}
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* Tab 1: Thông tin cá nhân */}
            {activeTab === "info" && (
              <form onSubmit={handleUpdateInfo} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Họ tên */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Họ tên
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={infoForm.name}
                      onChange={handleInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={infoForm.email}
                      onChange={handleInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Điện thoại */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={infoForm.phone}
                      onChange={handleInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>


                  {/* Trạng thái */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Trạng thái
                    </label>
                    <select
                      name="status"
                      value={infoForm.status}
                      onChange={handleInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="Đang tham gia">Đang tham gia</option>
                      <option value="Đã rút">Đã rút</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
                >
                  ✓ Cập nhật thông tin
                </button>
              </form>
            )}

            {/* Tab 2: Đổi mật khẩu */}
            {activeTab === "password" && (
              <form onSubmit={handleUpdatePassword} className="space-y-6 max-w-md">
                {/* Mật khẩu cũ */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mật khẩu cũ *
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwordForm.oldPassword}
                    onChange={handlePasswordChange}
                    placeholder="Nhập mật khẩu cũ"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Mật khẩu mới */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mật khẩu mới *
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Xác nhận mật khẩu */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Xác nhận mật khẩu *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Xác nhận mật khẩu mới"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
                >
                  🔐 Cập nhật mật khẩu
                </button>

                <p className="text-sm text-gray-600 mt-4">
                  💡 <strong>Lưu ý:</strong> Mật khẩu phải có ít nhất 6 ký tự
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
