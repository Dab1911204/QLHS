import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/userInfo";
import initialData from "../../data/data";

const ClientLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Tìm user trong database
    const user = initialData.employees.find(
      (emp) => emp.email === email && emp.password === password
    );

    if (!user) {
      setError("Email hoặc mật khẩu không chính xác!");
      setLoading(false);
      return;
    }

    // Lưu vào Redux
    dispatch(
      setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
        role: user.role,
        startDate: user.startDate,
        endDate: user.endDate,
        status: user.status,
        avatar: user.avatar,
      })
    );

    setLoading(false);
    navigate("/");
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center bg-gradient-to-tr from-sky-100 to-cyan-200">
      <div className="flex w-4/7 h-3/4 rounded-3xl bg-gradient-to-r from-[#fe4444] to-[#ff0308] shadow-xl overflow-hidden relative z-1">
        {/* LEFT FORM */}
        {isLogin && (
          <div className="absolute w-4/7 px-12 flex flex-col left-0 top-[20%] z-20">
            <h2 className="text-3xl text-white font-bold text-center mb-10">
              Đăng nhập
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="mb-6">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full py-2 px-1 text-xl text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                    className="w-full py-2 px-1 text-xl text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Nhớ mật khẩu</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-gray-500 py-2 cursor-pointer text-white font-semibold hover:bg-gray-600 transition disabled:opacity-50"
              >
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Demo: a@gmail.com / password
            </p>
          </div>
        )}

        {/* RIGHT FORM */}
        {!isLogin && (
          <div className="absolute w-4/7 px-12 flex flex-col right-0 top-[20%] z-20">
            <h2 className="text-3xl text-white font-bold text-center mb-10">
              Đăng ký
            </h2>

            <div className="mb-6">
              <div className="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full py-2 px-1 text-xl text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  className="w-full py-2 px-1 text-xl text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  className="w-full py-2 px-1 text-xl text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
              </div>
            </div>

            <button className="w-full rounded-md bg-gray-500 py-2 cursor-pointer text-white font-semibold hover:bg-gray-600 transition">
              Đăng ký
            </button>
          </div>
        )}

        {/* RIGHT - DECORATION PANEL */}
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

export default ClientLogin;
