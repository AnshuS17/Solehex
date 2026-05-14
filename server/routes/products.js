const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const {
  getProducts, getFeatured, getProduct,
  createProduct, updateProduct, deleteProduct, addReview,
  uploadImage
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_.]/g, '');
    cb(null, `${Date.now()}-${safeName}`);
  },
});
const upload = multer({ storage });

router.get('/', getProducts);
router.get('/featured', getFeatured);
router.post('/upload', protect, admin, upload.single('image'), uploadImage);
router.get('/:slug', getProduct);
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);
router.post('/:id/reviews', protect, addReview);

module.exports = router;
