import { Link } from "react-router-dom";
import logo from "../../../assets/food-logo.png";
const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-muted mx-auto md:p-10 px-56">
      <div className="w-max mb-20">
        <div className="w-max flex items-center">
          <div className="w-[180px] h-[180px] overflow-hidden flex items-center rounded-full shadow-lg border">
            <img src={logo} alt="logo" />
          </div>
          <p className="ml-4 text-5xl font-bold">WOLSOM</p>
        </div>
        <p className="w-3/4 mt-10 text-lg">
        Wolsom là quán cà phê mang đến không gian thư giãn và lý tưởng, kết hợp với những tách cà phê đậm đà. Chúng tôi cam kết
        mang lại trải nghiệm tuyệt vời, nơi bạn có thể tận hưởng những phút giây thư thái cùng bạn bè và người thân.
        </p>
      </div>
      <form className="min-w-[500px] w-[500px] py-5 px-10">
        <div className="flex flex-col space-y-4 shadow-2xl rounded-2xl border-2 border-gray-200 p-4">
          <div className="mb-2">
            <input
              type="text"
              className="my-2 p-2 w-full border border-borderColor rounded-md outline-none focus:border-primary transition-all ease-out"
              placeholder="Email hoặc số điện thoại"
              //   value={email}
              //   onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              className="my-2 p-2 w-full border border-borderColor rounded-md outline-none focus:border-primary transition-all ease-out"
              placeholder="Mật khẩu"
              //   value={password}
              //   onChange={({ target }) => setPassword(target.value)}
            />
            {/* {error && <p className="text-xs text-red-600 mt-4">{error}</p>} */}
          </div>
          <button
            // onClick={handleSubmit}
            className="p-2 w-full bg-blue-500 border rounded-lg text-lg text-white font-bold transition-all ease-linear hover:bg-blue-600 shadow-md cursor-pointer"
          >
            Đăng nhập
          </button>
          <p className="mt-6 text-sm text-center">
            Bạn chưa có tài khoản?{" "}
            <Link to="/signin" className="text-blue-500 mr-4">
              Đăng ký
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
