const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { ProductDetails } = require("./BaseSchema");

const FashionSchema = new Schema({
  Material: { type: String },
  Color: [{ type: String }],
  Size: [{ type: String }]
});

const FashionProducts = ProductDetails.discriminator('FashionProducts', FashionSchema);

module.exports = FashionProducts;
