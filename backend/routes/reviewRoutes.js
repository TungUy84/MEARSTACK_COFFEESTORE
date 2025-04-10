const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// Lấy tất cả đánh giá của một sản phẩm
router.get('/product/:id', reviewController.getProductReviews);

// Thêm đánh giá mới (yêu cầu đăng nhập)
router.post('/', protect, reviewController.createReview);

// Xóa đánh giá (yêu cầu đăng nhập)
router.delete('/:id', protect, reviewController.deleteReview);

module.exports = router;
