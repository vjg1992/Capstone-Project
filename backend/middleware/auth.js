const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ msg: 'User not found, authorization denied' });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error('Something wrong with auth middleware', err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = auth;
