const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { ProductDetails } = require("./BaseSchema");

const SportsAndFitnessProductsSchema = new Schema({
    Material: { type: String },
    Color: [{ type: String }],
    Weight: { type: String },
    Size: [{ type: String }]
});

const SportsAndFitnessProducts = ProductDetails.discriminator("SportsAndFitnessProducts", SportsAndFitnessProductsSchema);

module.exports = SportsAndFitnessProducts;
