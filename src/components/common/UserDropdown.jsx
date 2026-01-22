import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser, userInfoSelector } from "../../redux/slices/userInfo";
import { FaCaretDown, FaRegUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(userInfoSelector);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("persist:root"); // Xóa Redux persist state từ localStorage
    setIsOpen(false);
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/user-profile");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Avatar/Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 cursor-pointer"
      >
        <span className="text-white text-sm font-medium hidden sm:inline">
          {userInfo.name}
        </span>
        <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-sm">
          {userInfo.avatar ? (
            <img
              src={userInfo.avatar}
              alt={userInfo.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getInitials(userInfo.name)
          )}
        </div>
        {/* Arrow */}
        <span
          className={`text-white transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <FaCaretDown />
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 overflow-hidden border border-gray-200">
          {/* Header với thông tin user */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b">
            <p className="font-semibold text-gray-900">{userInfo.name}</p>
            <p className="text-sm text-gray-600">{userInfo.email}</p>
            <p className="text-xs text-gray-500 mt-1">{userInfo.position || userInfo.role}</p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={handleProfileClick}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-50 transition flex items-center gap-3"
            >
              <FaRegUserCircle />
              <span>Thông tin cá nhân</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition flex items-center gap-3"
            >
              <IoIosLogOut />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      )}

      {/* Close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default UserDropdown;
