const mongoose = require('mongoose');
const { Schema } = mongoose;

const vendorSchema = new Schema({
  vendor_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobile_number: {type: String},
  address: {type: String},
  email: {type: String},
  gst_number: {type: String},
  pan_number: {type: String},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Vendor', vendorSchema);