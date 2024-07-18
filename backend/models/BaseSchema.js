const mongoose = require('mongoose');
const { Schema, model, Types: { ObjectId } } = mongoose;

const counterSchema = new Schema({
  category: { type: String, required: true, unique: true },
  sequence: { type: Number, default: 0 }
});

const CounterModel = model('CounterModel', counterSchema);

const getNextSequence = async (category) => {
  const counter = await CounterModel.findOneAndUpdate(
    { category },
    { $inc: { sequence: 1 } },
    { new: true, upsert: true }
  );
  return counter.sequence;
};

const generateProductID = async (category) => {
  const seq = await getNextSequence(category);
  const prefix = category.substring(0, 2).toUpperCase() + category.substring(category.length - 2).toUpperCase();
  const year = new Date().getFullYear().toString().slice(-2);
  const formattedSeq = seq.toString().padStart(4, '0');
  return `${prefix}${year}${formattedSeq}`;
};

const baseOptions = {
  discriminatorKey: 'category', 
  collection: 'products'
};

const BaseSchema = new Schema({
  ProductID: { type: String, required: true, unique: true, default: function() {
    return generateProductID(this.Category);}},
  ProductName: { type: String, required: true },
  Category: { type: String, required: true },
  SubCategory: { type: String, required: true },
  SubCategoryType: { type: String, required: true },
  Brand: { type: String, required: true },
  Description: { type: String, required: true },
  SKU: { type: String, required: true },
  Price: { type: Number, required: true },
  DiscountedPrice: { type: Number },
  StockQuantity: { type: Number, required: true },
  AvailabilityStatus: { type: String },
  Images: [{ type: String }],
  Videos: [{ type: String }],
  Rating: { type: Number },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date },
  UpdatedBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  Vendor: {vendor_id: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true }}
}, baseOptions);

const ProductDetails = mongoose.model('ProductDetails', BaseSchema);

module.exports = { ProductDetails, BaseSchema,generateProductID };