const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const reviewController = require('../controllers/reviewController');

router.post('/add', auth, reviewController.addReview);
router.get('/product/:productId', reviewController.getReviewsByProduct);
router.get('/user', auth, reviewController.getReviewsByUser);

module.exports = router;
