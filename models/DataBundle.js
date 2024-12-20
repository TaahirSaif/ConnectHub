const mongoose = require('mongoose');

const dataBundleSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bundleSize: { type: Number, required: true }, // e.g., MB or GB
  price: { type: Number, required: true },
  status: { type: String, enum: ['available', 'sold'], default: 'available' },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DataBundle', dataBundleSchema);
