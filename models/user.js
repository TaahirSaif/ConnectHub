const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wallet: { type: Number, default: 0 }, // Airtime balance
  referralCode: { type: String, unique: true },
  referredBy: { type: String },
});

module.exports = mongoose.model('User', userSchema);
