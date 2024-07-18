const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: 'ProductDetails', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  rating: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
