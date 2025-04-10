const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// Tất cả routes đều yêu cầu đăng nhập
router.use(protect);

// Tạo đơn hàng mới
router.post('/', orderController.createOrder);

// Lấy đơn hàng của người dùng
router.get('/myorders', orderController.getMyOrders);

// Lấy chi tiết đơn hàng
router.get('/:id', orderController.getOrderById);

// Hủy đơn hàng
router.put('/cancel/:id', orderController.cancelOrder);

// Admin routes
router.get('/', admin, orderController.getAllOrders);
router.put('/:id/status', admin, orderController.updateOrderStatus);

module.exports = router;
