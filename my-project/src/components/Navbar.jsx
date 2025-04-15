import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/food-logo.png";

const Navbar = () => {
  return (
    <nav className="bg-[#fdf8f0] text-[#3d1f00] p-4 shadow-md border-b border-[#e2d1b5]">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Website Name */}
        <div className="flex items-center gap-4">
          <img
            src={Logo}
            alt="Logo"
            className="w-12 h-12 object-cover rounded-full border-4 border-[#3d1f00]"
          />
          <span className="font-bold text-2xl sm:text-3xl text-[#3d1f00]">
            ADMIN WOLSOM
          </span>
        </div>

        {/* Navigation Links */}
        <ul className="flex gap-8 text-lg font-medium">
          <li>
            <Link
              to="/dashboard"
              className="relative hover:text-[#7a4b27] transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#7a4b27] after:transition-all after:duration-300 hover:after:w-full"
            >
              Tổng Quan
            </Link>
          </li>
          <li>
            <Link
              to="/customers"
              className="relative hover:text-[#7a4b27] transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#7a4b27] after:transition-all after:duration-300 hover:after:w-full"
            >
              Khách Hàng
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="relative hover:text-[#7a4b27] transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#7a4b27] after:transition-all after:duration-300 hover:after:w-full"
            >
              Sản Phẩm
            </Link>
          </li>
          <li>
            <Link
              to="/reviews"
              className="relative hover:text-[#7a4b27] transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#7a4b27] after:transition-all after:duration-300 hover:after:w-full"
            >
              Đánh Giá
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="relative hover:text-[#7a4b27] transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#7a4b27] after:transition-all after:duration-300 hover:after:w-full"
            >
              Cài Đặt
            </Link>
          </li>
          <button>
            <Link
             to ="/login"
             className="bg-[#3d1f00] text-white px-4 py-2 rounded-md hover:bg-[#7a4b27] transition">
                Đăng Nhập 
            </Link>
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;