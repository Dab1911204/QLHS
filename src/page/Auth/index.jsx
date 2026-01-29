import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Checkbox, Button } from "antd";
import { setUser } from "../../redux/slices/userInfo";
import { useData } from "../../contexts/Data/DataContext";

const ClientLogin = () => {
  const {data} = useData();
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
    const user = data.employees.find(
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
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    size="large"
                    required
                  />
                </div>

                <div className="mb-4">
                  <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                    size="large"
                    required
                  />
                </div>

                <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
                  <Checkbox />
                  <span>Nhớ mật khẩu</span>
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                  className="w-full bg-gray-500 hover:bg-gray-600"
                >
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
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
              <Input
                type="email"
                placeholder="Email"
                size="large"
              />
            </div>

            <div className="mb-4">
              <Input.Password
                placeholder="Mật khẩu"
                size="large"
              />
            </div>

            <div className="mb-4">
              <Input.Password
                placeholder="Nhập lại mật khẩu"
                size="large"
              />
            </div>

            <Button
              type="primary"
              size="large"
              className="w-full bg-gray-500 hover:bg-gray-600"
            >
              Đăng ký
            </Button>
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
