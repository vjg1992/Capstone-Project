const express = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('mobile', 'Mobile number is required').isLength({ min: 10, max: 10 }),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  registerUser
);

router.post(
  '/login',
  [
    check('emailOrMobile', 'Please include a valid email or mobile number').not().isEmpty(),
    check('password', 'Password is required').exists()
  ],
  loginUser
);

module.exports = router;
