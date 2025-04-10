// server.js - File khởi tạo server với API trực tiếp
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');


// Import models
const User = require('./models/UserModels');
const Product = require('./models/ProductModels');
const Review = require('./models/ReviewModels');
const Cart = require('./models/CartModels');
const Order = require('./models/OrderModels');

// Import middlewares
const { protect, admin } = require('./middleware/authMiddleware');

// Load env vars
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(`MongoDB connection error: ${err.message}`));

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Cấu hình multer để upload file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Chỉ chấp nhận file ảnh (jpg, jpeg, png, webp)'));
    }
});

// API test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API đang hoạt động!' });
});

// ===== USER API =====
// Đăng ký
app.post('/api/users/register', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Kiểm tra email đã tồn tại
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email đã được sử dụng' });
        }

        // Tạo user mới
        const user = await User.create({
            name,
            email,
            password,
            phone
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Dữ liệu người dùng không hợp lệ' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Đăng nhập
app.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tìm user theo email
        const user = await User.findOne({ email });
        
        // Kiểm tra user và mật khẩu
        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lấy thông tin người dùng
app.get('/api/users/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ===== PRODUCT API =====
// Lấy tất cả sản phẩm
app.get('/api/products', async (req, res) => {
    try {
        const pageSize = 10;
        const page = Number(req.query.page) || 1;
        
        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: 'i'
                }
            }
            : {};
            
        const category = req.query.category ? { category: req.query.category } : {};
        
        const count = await Product.countDocuments({ ...keyword, ...category });
        
        const products = await Product.find({ ...keyword, ...category })
            .limit(pageSize)
            .skip(pageSize * (page - 1));
            
        res.json({
            products,
            page,
            pages: Math.ceil(count / pageSize),
            totalProducts: count
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lấy sản phẩm nổi bật
app.get('/api/products/featured', async (req, res) => {
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).limit(8);
        res.json(featuredProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lấy chi tiết một sản phẩm
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Tạo sản phẩm mới (Admin)
app.post('/api/products', protect, admin, upload.array('images', 5), async (req, res) => {
    try {
        // Lấy các đường dẫn ảnh đã upload
        const imageUrls = req.files ? req.files.map(file => `/${file.path}`) : [];
        
        const { name, description, price, category, stock, isFeatured } = req.body;
        
        const isFeatureBoolean = isFeatured === 'true' || isFeatured === true;

        const product = new Product({
            name,
            description,
            price: Number(price),
            imageUrl: imageUrls.length > 0 ? imageUrls : req.body.imageUrl,
            category,
            stock: Number(stock),
            isFeatured: isFeatureBoolean
        });
        
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ===== REVIEW API =====
// Lấy đánh giá của một sản phẩm
app.get('/api/reviews/product/:id', async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.id })
            .populate('user', 'name');
            
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Thêm đánh giá mới
app.post('/api/reviews', protect, async (req, res) => {
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
});

// ===== CART API =====
// Lấy giỏ hàng
app.get('/api/cart', protect, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        
        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] });
            await cart.save();
        }
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Thêm sản phẩm vào giỏ hàng
app.post('/api/cart/add', protect, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        
        // Kiểm tra sản phẩm tồn tại
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
        
        // Kiểm tra số lượng hàng tồn kho
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Sản phẩm không đủ số lượng' });
        }
        
        // Tìm hoặc tạo giỏ hàng
        let cart = await Cart.findOne({ user: req.user._id });
        
        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] });
        }
        
        // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        
        if (itemIndex > -1) {
            // Sản phẩm đã có trong giỏ hàng
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Thêm sản phẩm mới vào giỏ hàng
            cart.items.push({
                product: productId,
                quantity,
                price: product.price
            });
        }
        
        await cart.save();
        
        // Populate thông tin sản phẩm
        await cart.populate('items.product');
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Cập nhật số lượng sản phẩm trong giỏ hàng
app.put('/api/cart/update', protect, async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Kiểm tra số lượng hợp lệ
        if (quantity < 1) {
            return res.status(400).json({ message: 'Số lượng phải lớn hơn 0' });
        }

        // Kiểm tra sản phẩm tồn tại
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }

        // Kiểm tra số lượng tồn kho
        if (product.stock < quantity) {
            return res.status(400).json({ 
                message: `Sản phẩm chỉ còn ${product.stock} trong kho` 
            });
        }

        // Tìm giỏ hàng của user
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });
        }

        // Tìm sản phẩm trong giỏ hàng
        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Sản phẩm không có trong giỏ hàng' });
        }

        // Cập nhật số lượng
        cart.items[itemIndex].quantity = quantity;

        await cart.save();
        await cart.populate('items.product');

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ===== ORDER API =====
// Tạo đơn hàng mới
app.post('/api/orders', protect, async (req, res) => {
    try {
        const { shippingAddress } = req.body;
        
        // Tìm giỏ hàng
        const cart = await Cart.findOne({ user: req.user._id });
        
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Giỏ hàng trống' });
        }
        
        // Kiểm tra số lượng tồn kho
        for (const item of cart.items) {
            const product = await Product.findById(item.product);
            
            if (!product) {
                return res.status(404).json({ 
                    message: `Không tìm thấy sản phẩm với ID: ${item.product}` 
                });
            }
            
            if (product.stock < item.quantity) {
                return res.status(400).json({ 
                    message: `Sản phẩm ${product.name} chỉ còn ${product.stock} sản phẩm` 
                });
            }
        }
        
        // Tạo danh sách sản phẩm cho đơn hàng
        const orderItems = await Promise.all(cart.items.map(async (item) => {
            const product = await Product.findById(item.product);
            
            // Cập nhật số lượng tồn kho
            product.stock -= item.quantity;
            await product.save();
            
            return {
                product: item.product,
                name: product.name,
                quantity: item.quantity,
                price: item.price
            };
        }));
        
        // Tính tổng tiền
        const totalAmount = cart.items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        
        // Tạo đơn hàng mới
        const order = new Order({
            user: req.user._id,
            items: orderItems,
            totalAmount,
            shippingAddress,
            paymentMethod: 'cod',
            orderStatus: 'pending'
        });
        
        const createdOrder = await order.save();
        
        // Xóa giỏ hàng sau khi đặt hàng
        cart.items = [];
        await cart.save();
        
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lấy đơn hàng của người dùng
app.get('/api/orders/myorders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .sort('-createdAt');
            
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lấy chi tiết đơn hàng
app.get('/api/orders/:id', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        // Kiểm tra đơn hàng tồn tại
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }
        
        // Kiểm tra quyền truy cập (chỉ admin hoặc chủ đơn hàng)
        if (req.user.role !== 'admin' && order.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Không được phép truy cập' });
        }
        
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Hàm tạo token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API đang chạy...');
    });
}

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy ở cổng ${PORT} trong chế độ ${process.env.NODE_ENV}`);
});