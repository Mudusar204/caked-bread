// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  // phone: { type: String, required: true },
  // email: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  // planStartDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
