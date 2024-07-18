const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { ProductDetails } = require("./BaseSchema");

const HomeandkitchenSchema = new Schema();

const HomeandkitchenProducts = ProductDetails.discriminator("HomeandkitchenProducts", HomeandkitchenSchema);

module.exports = HomeandkitchenProducts;
