const User = require('../models/User');
const { validationResult } = require('express-validator');

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, email, mobile, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.status(422).json({ error: 'Passwords do not match' });
  }

  try {
    let user = await User.findOne({ $or: [{ email }, { mobile }] });
    if (user) {
      return res.status(422).json({ error: 'User with this email or mobile number already exists' });
    }

    user = new User({
      name,
      email,
      mobile,
      password
    });

    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { emailOrMobile, password } = req.body;

  try {
    let user = await User.findOne({ $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }] });

    if (!user) {
      return res.status(422).json({ error: 'Invalid credentials' });
    }

    // For simplicity, assuming password comparison directly without bcrypt
    if (password !== user.password) {
      return res.status(422).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { registerUser, loginUser };
