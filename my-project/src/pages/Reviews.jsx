import React, { useState } from "react";

const initialReviews = [
  { id: 1, name: "John Doe", email: "john@example.com", title: "Sản phẩm tuyệt vời", content: "Ngon và sảng khoái!", rating: 5 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", title: "Cà phê đậm đà", content: "Hương vị mạnh mẽ và đậm đà.", rating: 4 },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", title: "Cân bằng hoàn hảo", content: "Cân bằng hoàn hảo giữa độ ngọt.", rating: 5 },
  { id: 4, name: "Bob Brown", email: "bob@example.com", title: "Quá ngọt", content: "Hơi ngọt quá so với khẩu vị của tôi.", rating: 3 },
];

const Reviews = () => {
  const [reviews, setReviews] = useState(initialReviews);

  const handleDeleteReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? "text-yellow-500" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      {/* Tiêu đề */}
      <h1 className="text-4xl font-bold text-[#3d1f00] mb-6">Quản Lý Đánh Giá</h1>

      {/* Danh sách đánh giá */}
      <div className="bg-[#fdf8f0] shadow-md rounded-lg p-6 border border-[#3d1f00]">
        <h2 className="text-2xl font-semibold text-[#3d1f00] mb-4">Tất Cả Đánh Giá</h2>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
            >
              <h3 className="text-lg font-semibold text-[#3d1f00]">{review.title}</h3>
              <p className="text-sm text-[#3d1f00]">
                <span className="font-bold">{review.name}</span> - {review.email}
              </p>
              <p className="text-[#3d1f00]">{review.content}</p>
              <div className="flex items-center mt-2">
                <span className="text-sm font-semibold text-[#3d1f00] mr-2">Đánh giá:</span>
                {renderStars(review.rating)}
              </div>
              <div className="mt-2">
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition mr-4"
                >
                  Xóa
                </button>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                  Chỉnh sửa
                </button>
              </div>
            </div>
          ))}
          {reviews.length === 0 && (
            <p className="text-[#3d1f00] text-center">Không có đánh giá nào.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;