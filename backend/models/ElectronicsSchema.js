const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { ProductDetails } = require("./BaseSchema");

const ElectronicsSchema = new Schema({
  Model_number: { type: String },
  Release_date: { type: Date },
  Warranty: { type: String },
  Specifications: {
    color: {type: String},
    display_size: {type: String},
    resolution: {type: String},
    processor: {type: String},
    ram: {type: String},
    storage: {type: String},
    battery: {type: String},
    operating_system: {type: String},
    camera: {type: String},
    connectivity: {type: String},
    dimensions: {type: String},
    weight: {type: String},
  },
});

const ElectronicsProducts = ProductDetails.discriminator("ElectronicsProducts", ElectronicsSchema);

module.exports = ElectronicsProducts;
