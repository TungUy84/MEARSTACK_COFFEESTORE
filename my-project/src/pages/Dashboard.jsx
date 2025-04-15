import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Dữ liệu cho biểu đồ đường
  const lineChartData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
    datasets: [
      {
        label: "Doanh Thu",
        data: [1500, 3000, 2000, 4500, 4000, 6000, 5000, 7000, 6500, 5500, 6000, 5000],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Dữ liệu cho danh sách bán hàng gần đây
  const recentSales = [
    { id: 1, name: "Olivia Martin", email: "olivia.martin@email.com", amount: "1.500.000₫" },
    { id: 2, name: "James Smith", email: "james.smith@email.com", amount: "2.000.000₫" },
    { id: 3, name: "Sophia Brown", email: "sophia.brown@email.com", amount: "4.000.000₫" },
    { id: 4, name: "Noah Wilson", email: "noah.wilson@email.com", amount: "3.000.000₫" },
  ];

  // Dữ liệu cho bảng đơn hàng
  const orders = [
    {
      id: 1,
      product: "Tai Nghe Không Dây",
      description: "Tai nghe không dây chất lượng cao chống ồn.",
      price: "2.300.000₫",
      status: "Còn Hàng",
      rating: 4.5,
    },
    {
      id: 2,
      product: "Điện Thoại Thông Minh",
      description: "Điện thoại 5G mới nhất với camera chất lượng cao.",
      price: "18.500.000₫",
      status: "Còn Hàng",
      rating: 4.7,
    },
    {
      id: 3,
      product: "Laptop Gaming",
      description: "Laptop gaming mạnh mẽ với đồ họa cao cấp.",
      price: "30.000.000₫",
      status: "Còn Hàng",
      rating: 4.8,
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Tiêu đề */}
      <h1 className="text-3xl font-bold text-[#3d1f00] mb-6">Bảng Điều Khiển</h1>

      {/* Thẻ thông tin */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4 border border-[#3d1f00]">
          <h2 className="text-lg font-semibold text-[#3d1f00]">Tổng Sản Phẩm</h2>
          <p className="text-3xl font-bold text-blue-600">25,154</p>
          <p className="text-sm text-green-500">↑ 25%</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 border border-[#3d1f00]">
          <h2 className="text-lg font-semibold text-[#3d1f00]">Tổng Đơn Hàng Đã Thanh Toán</h2>
          <p className="text-3xl font-bold text-blue-600">16.000.000₫</p>
          <p className="text-sm text-red-500">↓ 12%</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 border border-[#3d1f00]">
          <h2 className="text-lg font-semibold text-[#3d1f00]">Tổng Khách Hàng</h2>
          <p className="text-3xl font-bold text-blue-600">15.400</p>
          <p className="text-sm text-green-500">↑ 15%</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 border border-[#3d1f00]">
          <h2 className="text-lg font-semibold text-[#3d1f00]">Doanh Số</h2>
          <p className="text-3xl font-bold text-blue-600">12.340</p>
          <p className="text-sm text-green-500">↑ 19%</p>
        </div>
      </div>

      {/* Biểu đồ và danh sách bán hàng */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4 border border-[#3d1f00]">
          <h2 className="text-lg font-semibold text-[#3d1f00] mb-4">Tổng Quan</h2>
          <Line data={lineChartData} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 border border-[#3d1f00]">
          <h2 className="text-lg font-semibold text-[#3d1f00] mb-4">Bán Hàng Gần Đây</h2>
          <ul className="space-y-4">
            {recentSales.map((sale) => (
              <li key={sale.id} className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-[#3d1f00]">{sale.name}</p>
                  <p className="text-sm text-[#3d1f00]">{sale.email}</p>
                </div>
                <p className="font-bold text-[#3d1f00]">{sale.amount}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bảng đơn hàng */}
      <div className="bg-white shadow-md rounded-lg p-4 border border-[#3d1f00]">
        <h2 className="text-lg font-semibold text-[#3d1f00] mb-4">Đơn Hàng Nổi Bật</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fdf8f0]">
              <th className="p-4">#</th>
              <th className="p-4">Sản Phẩm</th>
              <th className="p-4">Giá</th>
              <th className="p-4">Trạng Thái</th>
              <th className="p-4">Đánh Giá</th>
              <th className="p-4">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-4">{order.id}</td>
                <td className="p-4">
                  <p className="font-bold text-[#3d1f00]">{order.product}</p>
                  <p className="text-sm text-[#3d1f00]">{order.description}</p>
                </td>
                <td className="p-4">{order.price}</td>
                <td className="p-4 text-green-600">{order.status}</td>
                <td className="p-4 text-yellow-500">★ {order.rating}</td>
                <td className="p-4">
                  <button className="text-blue-600 hover:underline mr-2">✏️</button>
                  <button className="text-red-600 hover:underline">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;