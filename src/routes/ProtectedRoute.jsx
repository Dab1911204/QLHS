import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { userInfoSelector } from "../redux/slices/userInfo";

const ProtectedRoute = () => {
  const userInfo = useSelector(userInfoSelector);
  const [shouldRedirect, setShouldRedirect] = useState(false);

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
