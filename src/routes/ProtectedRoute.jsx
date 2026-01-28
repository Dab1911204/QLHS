import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userInfoSelector } from "../redux/slices/userInfo";

const ProtectedRoute = () => {
  const userInfo = useSelector(userInfoSelector);
  const location = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Kiểm tra quyền truy cập: Employee không được vào /employees
  const isPermissionDenied = 
    userInfo.isLoggedIn && 
    userInfo.role === "Employee" && 
    location.pathname === "/employees";

  // Nếu chưa đăng nhập
  useEffect(() => {
    if (!userInfo.isLoggedIn) {
      // Delay 2 giây rồi redirect
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [userInfo.isLoggedIn]);

  // Nếu không có quyền, auto redirect sau 3 giây
  useEffect(() => {
    if (isPermissionDenied) {
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isPermissionDenied]);

  // Nếu không có quyền truy cập
  if (isPermissionDenied) {
    if (shouldRedirect) {
      return <Navigate to="/" replace />;
    }

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 z-50">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-40 h-40 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-40 h-40 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-40 h-40 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <div className="mb-8">
            <svg
              className="mx-auto h-24 w-24 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="opacity-25"></circle>
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                className="opacity-75"
              ></path>
            </svg>
          </div>

          <h2 className="text-5xl font-bold text-red-600 mb-4">
            Không đủ quyền truy cập
          </h2>

          <p className="text-xl text-gray-700 mb-2">
            Bạn không có quyền truy cập trang này
          </p>

          <p className="text-lg text-gray-600 mb-8">
            Chỉ quản lý mới có thể xem danh sách nhân viên
          </p>

          {/* Progress bar */}
          <div className="w-64 mx-auto bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-red-600 h-full rounded-full animate-pulse" style={{ animation: "shrink 2s linear forwards" }}></div>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            (Chuyển hướng về trang chủ sau 3 giây)
          </p>

          <button
            onClick={() => setShouldRedirect(true)}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
          >
            Quay lại trang chủ ngay
          </button>
        </div>

        <style>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          @keyframes shrink {
            0% { width: 100%; }
            100% { width: 0%; }
          }
        `}</style>
      </div>
    );
  }

  // Nếu chưa đăng nhập
  if (!userInfo.isLoggedIn) {
    // Hiển thị message trong 2 giây
    if (shouldRedirect) {
      return <Navigate to="/login" replace />;
    }

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 z-50">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-40 h-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <div className="mb-8">
            <svg
              className="mx-auto h-24 w-24 text-red-500 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>

          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Yêu cầu đăng nhập
          </h2>

          <p className="text-xl text-gray-700 mb-2">
            Bạn cần đăng nhập để truy cập trang này
          </p>

          <p className="text-lg text-gray-600 mb-8">
            Đang chuyển hướng về trang đăng nhập...
          </p>

          {/* Progress bar */}
          <div className="w-64 mx-auto bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gray-600 h-full rounded-full animate-pulse" style={{ animation: "shrink 2s linear forwards" }}></div>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            (Tự động chuyển hướng sau 2 giây)
          </p>
        </div>

        <style>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          @keyframes shrink {
            0% { width: 100%; }
            100% { width: 0%; }
          }
        `}</style>
      </div>
    );
  }

  // Nếu đã đăng nhập, cho vào route
  return <Outlet />;
};

export default ProtectedRoute;
