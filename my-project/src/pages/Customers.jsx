import React, { useState } from "react";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      password: "password123",
      role: "Users",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "987-654-3210",
      password: "password456",
      role: "Admin",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "456-789-1234",
      password: "password789",
      role: "Users",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob@example.com",
      phone: "321-654-9870",
      password: "password321",
      role: "Users",
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "Users", // Mặc định là "Users"
  });
  const [editCustomer, setEditCustomer] = useState(null);

  // Lọc khách hàng dựa trên từ khóa tìm kiếm
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = () => {
    if (
      newCustomer.name &&
      newCustomer.email &&
      newCustomer.password &&
      newCustomer.phone
    ) {
      const newCustomerData = {
        id: customers.length + 1,
        name: newCustomer.name,
        email: newCustomer.email,
        phone: newCustomer.phone,
        password: newCustomer.password,
        role: newCustomer.role,
      };
      setCustomers([...customers, newCustomerData]);
      setNewCustomer({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "Users",
      });
      setShowAddForm(false);
    } else {
      alert("Vui lòng điền đầy đủ thông tin!");
    }
  };

  const handleSaveEditCustomer = () => {
    if (
      editCustomer.name &&
      editCustomer.email &&
      editCustomer.phone &&
      editCustomer.password
    ) {
      setCustomers(
        customers.map((customer) =>
          customer.id === editCustomer.id ? editCustomer : customer
        )
      );
      setEditCustomer(null);
    } else {
      alert("Vui lòng điền đầy đủ thông tin!");
    }
  };

  const handleDeleteCustomer = (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa khách hàng này?"
    );
    if (confirmDelete) {
      setCustomers(customers.filter((customer) => customer.id !== id));
    }
  };

  const handleRoleChange = (id, newRole) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === id ? { ...customer, role: newRole } : customer
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Tiêu đề và nút thêm khách hàng */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản Lý Khách Hàng</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#3d1f00] text-white px-4 py-2 rounded-md hover:bg-[#7a4b27] transition"
        >
          {showAddForm ? "Hủy" : "Thêm Khách Hàng"}
        </button>
      </div>

      {/* Form thêm khách hàng mới */}
      {showAddForm && (
        <div className="bg-[#fdf8f0] shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Thêm Khách Hàng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Họ và Tên"
              value={newCustomer.name}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, name: e.target.value })
              }
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={newCustomer.email}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, email: e.target.value })
              }
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Mật Khẩu"
              value={newCustomer.password}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, password: e.target.value })
              }
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Số Điện Thoại"
              value={newCustomer.phone}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, phone: e.target.value })
              }
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newCustomer.role}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, role: e.target.value })
              }
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Users">Users</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button
            onClick={handleAddCustomer}
            className="mt-4 bg-[#3d1f00] text-white px-4 py-2 rounded-md hover:bg-[#7a4b27] transition"
          >
            Lưu
          </button>
        </div>
      )}

      {/* Thanh tìm kiếm */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm khách hàng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Bảng danh sách khách hàng */}
      <div className="overflow-x-auto bg-[#fdf8f0] shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#3d1f00] text-white">
              <th className="p-4">ID</th>
              <th className="p-4">Họ và Tên</th>
              <th className="p-4">Email</th>
              <th className="p-4">Số Điện Thoại</th>
              <th className="p-4">Vai Trò</th>
              <th className="p-4">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-100">
                  <td className="p-4">{customer.id}</td>
                  <td className="p-4">{customer.name}</td>
                  <td className="p-4">{customer.email}</td>
                  <td className="p-4">{customer.phone}</td>
                  <td className="p-4">
                    <select
                      value={customer.role}
                      onChange={(e) =>
                        handleRoleChange(customer.id, e.target.value)
                      }
                      className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${
                        customer.role === "Admin"
                          ? "bg-yellow-100 text-red-600 font-bold"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      <option value="Users">Users</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setEditCustomer(customer)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition mr-2"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteCustomer(customer.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  Không tìm thấy khách hàng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
