import React, { useState } from "react";

const initialProducts = [
  {
    name: "MATCHA LATTE",
    description: "Delicious matcha latte",
    price: "60.000",
    category: "Trà",
    quantity: 10,
    image: "matcha.png",
    featured: false,
  },
  {
    name: "Cà phê đen",
    description: "Strong black coffee",
    price: "35.000",
    category: "Cà Phê",
    quantity: 20,
    image: "capheden.png",
    featured: false,
  },
];

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "Trà", // Default to "Trà"
    quantity: "",
    image: null,
    featured: false,
  });
  const itemsPerPage = 5;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

  const formatCurrency = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handlePriceChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const formattedValue = rawValue ? formatCurrency(rawValue) : "";
    setNewProduct({ ...newProduct, price: formattedValue });
  };

  const handleAddProduct = () => {
    if (
      newProduct.name &&
      newProduct.description &&
      newProduct.price &&
      newProduct.category &&
      newProduct.quantity &&
      newProduct.image
    ) {
      const newProductWithImage = {
        ...newProduct,
        image: URL.createObjectURL(newProduct.image),
      };
      setProducts([...products, newProductWithImage]);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "Trà",
        quantity: "",
        image: null,
        featured: false,
      });
    } else {
      alert("Vui lòng điền đầy đủ thông tin!");
    }
  };

  const handleFileChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  const toggleFeatured = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].featured = !updatedProducts[index].featured;
    setProducts(updatedProducts);
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      {/* Tiêu đề */}
      <h1 className="text-4xl font-semibold text-[#3d1f00] mb-8">Quản Lý Sản Phẩm</h1>

      {/* Thêm sản phẩm mới */}
      <div className="bg-[#fdf8f0] shadow-lg rounded-lg p-6 mb-8 border border-[#3d1f00]">
        <h2 className="text-2xl font-semibold text-[#3d1f00] mb-6">
          Thêm Sản Phẩm Mới
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Tên sản phẩm"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="p-3 border border-[#3d1f00] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3d1f00]"
          />
          <textarea
            placeholder="Mô tả sản phẩm"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="p-3 border border-[#3d1f00] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3d1f00]"
          />
          <input
            type="text"
            placeholder="Giá sản phẩm"
            value={newProduct.price}
            onChange={handlePriceChange}
            className="p-3 border border-[#3d1f00] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3d1f00]"
          />
          <select
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="p-3 border border-[#3d1f00] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3d1f00]"
          >
            <option value="Trà">Trà</option>
            <option value="Cà Phê">Cà Phê</option>
          </select>
          <input
            type="number"
            placeholder="Số lượng sản phẩm"
            value={newProduct.quantity}
            onChange={(e) =>
              setNewProduct({ ...newProduct, quantity: e.target.value })
            }
            className="p-3 border border-[#3d1f00] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3d1f00]"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="p-3 border border-[#3d1f00] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3d1f00]"
          />
        </div>
        <button
          onClick={handleAddProduct}
          className="mt-6 bg-[#3d1f00] text-white px-6 py-3 rounded-md hover:bg-[#602b1a] transition"
        >
          Thêm Sản Phẩm
        </button>
      </div>

      {/* Bảng sản phẩm */}
      <div className="bg-[#fdf8f0] shadow-lg rounded-lg overflow-hidden border border-[#3d1f00]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#3d1f00] text-white">
              <th className="p-4">Hình Ảnh</th>
              <th className="p-4">Tên Sản Phẩm</th>
              <th className="p-4">Mô Tả</th>
              <th className="p-4">Giá (VND)</th>
              <th className="p-4">Danh Mục</th>
              <th className="p-4">Số Lượng</th>
              <th className="p-4">Nổi Bật</th>
              <th className="p-4">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="p-4 text-[#3d1f00]">{product.name}</td>
                <td className="p-4 text-[#3d1f00]">{product.description}</td>
                <td className="p-4 text-[#3d1f00]">{product.price}</td>
                <td className="p-4 text-[#3d1f00]">{product.category}</td>
                <td className="p-4 text-[#3d1f00]">{product.quantity}</td>
                <td className="p-4 text-center">
                  <input
                    type="checkbox"
                    checked={product.featured}
                    onChange={() => toggleFeatured(startIndex + index)}
                    className="w-5 h-5"
                  />
                </td>
                <td className="p-4 flex gap-4">
                  <button
                   className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition mr-2"
                    onClick={() => alert("Sửa sản phẩm")}
                  >
                    Sửa
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                    onClick={() => alert("Xóa sản phẩm")}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-10 h-10 rounded-full border text-sm flex items-center justify-center ${
              currentPage === i + 1
                ? "bg-[#3d1f00] text-white"
                : "bg-white text-[#3d1f00]"
            }`}
          >
            {i + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="w-10 h-10 rounded-full border bg-white text-[#3d1f00] text-sm flex items-center justify-center"
          >
            &rarr;
          </button>
        )}
      </div>
    </div>
  );
};

export default Products;
