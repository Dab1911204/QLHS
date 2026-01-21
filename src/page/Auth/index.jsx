import { useState } from "react";

const ClientLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex w-screen h-screen items-center justify-center bg-linear-to-tr from-sky-100 to-cyan-200">
      <div className="flex w-4/7 h-3/4 rounded-3xl bg-linear-to-r from-[#fe4444] to-[#ff0308] shadow-xl overflow-hidden relative z-1">
        {/* LEFT - LOGIN FORM */}
        {isLogin ? (
          <>
            <div className="absolute w-4/7 px-12 flex flex-col left-0 top-[20%]">
              <h2 className="text-3xl text-white font-bold text-center mb-10">
                Đăng nhập
              </h2>

              {/* Email */}
              <div className="mb-6">
                <div
                  className="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300
                            focus-within:outline-2 focus-within:outline-indigo-600"
                >
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full py-2 px-1 text-xl text-gray-900 placeholder:text-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <div
                  className="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300
                            focus-within:outline-2 focus-within:outline-indigo-600"
                >
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="w-full py-2 px-1 text-xl text-gray-900 placeholder:text-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Nhớ mật khẩu</span>
              </div>

              {/* Button */}
              <button
                className="w-full rounded-md bg-gray-500 py-2 cursor-pointer text-white font-semibold
                        hover:bg-gray-600 transition"
              >
                Đăng nhập
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="absolute w-4/7 px-12 flex flex-col right-0 top-[20%]">
              <h2 className="text-3xl text-white font-bold text-center mb-10">
                Đăng ký
              </h2>

              {/* Email */}
              <div className="mb-6">
                <div
                  className="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300
                            focus-within:outline-2 focus-within:outline-indigo-600"
                >
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full py-2 px-1 text-xl text-gray-900 placeholder:text-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <div
                  className="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300
                            focus-within:outline-2 focus-within:outline-indigo-600"
                >
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="w-full py-2 px-1 text-xl text-gray-900 placeholder:text-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <div
                  className="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300
                            focus-within:outline-2 focus-within:outline-indigo-600"
                >
                  <input
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    className="w-full py-2 px-1 text-xl text-gray-900 placeholder:text-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Button */}
              <button
                className="w-full rounded-md bg-gray-500 py-2 cursor-pointer text-white font-semibold
                        hover:bg-gray-600 transition"
              >
                Đăng ký
              </button>
            </div>
          </>
        )}

        {/* RIGHT - DECORATION */}
        <div
          className={`
                        absolute top-0 right-0 h-full w-3/7 bg-white
                        flex flex-col items-center justify-center
                        transition-transform duration-500 ease-in-out z-10
                        ${isLogin ? "translate-x-0 rounded-l-[100px] rounded-r-3xl" : "-translate-x-[133.5%] rounded-r-[100px] rounded-l-3xl"}
                    `}
        >
          <img src="/logo_TDS.png" alt="logo" className="w-80 h-40" />

          <button
            className="bg-red-700 text-white p-2 text-3xl cursor-pointer font-bold text-center px-6 outline-2 rounded-2xl"
            onClick={() => setIsLogin(!isLogin)}
          >
            {!isLogin ? "Đăng nhập" : "Đăng ký"}
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 *
 */

export default ClientLogin;
