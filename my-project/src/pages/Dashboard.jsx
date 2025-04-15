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
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: [1500, 3000, 2000, 4500, 4000, 6000, 5000, 7000, 6500, 5500, 6000, 5000],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Dữ liệu cho danh sách bán hàng gần đây
  const recentSales = [
    { id: 1, name: "Olivia Martin", email: "olivia.martin@email.com", amount: "$1500" },
    { id: 2, name: "James Smith", email: "james.smith@email.com", amount: "$2000" },
    { id: 3, name: "Sophia Brown", email: "sophia.brown@email.com", amount: "$4000" },
    { id: 4, name: "Noah Wilson", email: "noah.wilson@email.com", amount: "$3000" },
  ];

  // Dữ liệu cho bảng đơn hàng
  const orders = [
    {
      id: 1,
      product: "Wireless Headphones",
      description: "High-quality noise-canceling wireless headphones.",
      price: "$99.99",
      status: "In Stock",
      rating: 4.5,
    },
    {
      id: 2,
      product: "Smartphone",
      description: "Latest 5G smartphone with excellent camera features.",
      price: "$799.99",
      status: "In Stock",
      rating: 4.7,
    },
    {
      id: 3,
      product: "Gaming Laptop",
      description: "Powerful gaming laptop with high-end graphics.",
      price: "$1299.99",
      status: "In Stock",
      rating: 4.8,
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Tiêu đề */}
      <h1 className="text-3xl font-bold text-[#3d1f00] mb-6">Dashboard</h1>

      {/* Thẻ thông tin */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4 border border-[#3d1f00]">
          <h2 className="text-lg font-semibold text-[#3d1f00]">Total Products</h2>
          <p className="text-3xl font-bold text-blue-600">25,154</p>
          <p className="text-sm text-green-500">↑ 25%</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 border border-[#3d1f00]">
          <h2 className="text-lg font-semibold text-[#3d1f00]">Total Paid Orders</h2>
          <p className="text-3xl font-bold text-blue-600">$16,000</p>
          <p className="text-sm text-red-500">↓ 12%</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 border border-[#3d1f00]">
          <h2 className="text-lg font-semibold text-[#3d1f00]">Total Customers</h2>
          <p className="text-3xl font-bold text-blue-600">15,400k</p>
          <p className="text-sm text-green-500">↑ 15%</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 border border-[#3d1f00]">
          <h2 className="text-lg font-semibold text-[#3d1f00]">Sales</h2>
          <p className="text-3xl font-bold text-blue-600">12,340</p>
          <p className="text-sm text-green-500">↑ 19%</p>
        </div>
      </div>

      {/* Biểu đồ và danh sách bán hàng */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4 border border-[#3d1f00]">
          <h2 className="text-lg font-semibold text-[#3d1f00] mb-4">Overview</h2>
          <Line data={lineChartData} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 border border-[#3d1f00]">
          <h2 className="text-lg font-semibold text-[#3d1f00] mb-4">Recent Sales</h2>
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
        <h2 className="text-lg font-semibold text-[#3d1f00] mb-4">Top Orders</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fdf8f0]">
              <th className="p-4">#</th>
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Actions</th>
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