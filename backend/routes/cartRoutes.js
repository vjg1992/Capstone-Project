const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cartController = require('../controllers/cartController');

router.post('/add', auth, cartController.addToCart);
router.post('/remove', auth, cartController.removeFromCart);
router.put('/update', auth, cartController.updateCartItem);
router.get('/', auth, cartController.getCart);

module.exports = router;
