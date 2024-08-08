const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const productController = require('../controllers/productController');

router.post('/create', auth, productController.createProduct);
router.get('/:id', productController.getProduct);  // No auth middleware for browsing
router.get('/category/:category', productController.getProductsByCategory);  // Browse by category
router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;
