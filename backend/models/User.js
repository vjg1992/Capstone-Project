// models/User.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  landmark: { type: String }
});

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  addresses: [addressSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
