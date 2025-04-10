const Review = require('../models/Review');
const Product = require('../models/Product');

// Tạo đánh giá mới
exports.createReview = async (req, res) => {
    try {
        const { rating, comment, productId } = req.body;

        // Kiểm tra sản phẩm tồn tại
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }

        // Kiểm tra người dùng đã đánh giá sản phẩm này chưa
        const alreadyReviewed = await Review.findOne({
            user: req.user._id,
            product: productId
        });

        if (alreadyReviewed) {
            return res.status(400).json({ message: 'Bạn đã đánh giá sản phẩm này rồi' });
        }

        // Tạo đánh giá mới
        const review = new Review({
            user: req.user._id,
            product: productId,
            rating: Number(rating),
            comment
        });

        await review.save();

        res.status(201).json({
            message: 'Đánh giá đã được thêm',
            review
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy tất cả đánh giá của một sản phẩm
exports.getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.id })
            .populate('user', 'name');

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa đánh giá
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
        }

        // Chỉ cho phép người dùng xóa đánh giá của họ hoặc admin
        if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Không được phép thực hiện' });
        }

        await review.remove();
        res.json({ message: 'Đã xóa đánh giá' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
