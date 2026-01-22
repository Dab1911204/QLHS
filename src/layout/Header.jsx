import { useSelector } from "react-redux";
import { userInfoSelector } from "../redux/slices/userInfo";
import UserDropdown from "../components/common/UserDropdown";

function Header() {
  const userInfo = useSelector(userInfoSelector);

  return (
    <header className="h-20 bg-linear-to-r from-[#ff0000] to-[#c40003] shadow flex items-center justify-end px-6">
      {/* Thông tin user và Dropdown */}
      {userInfo.isLoggedIn ? (
        <UserDropdown />
      ) : (
        <div className="text-white text-sm">Chưa đăng nhập</div>
      )}
    </header>
  );
}

export default Header;
