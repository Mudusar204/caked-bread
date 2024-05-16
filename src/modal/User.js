// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  referralCode: { type: String, required: true, unique: true },
  rewardPoints: { type: Number, default: 0 },
  beans: { type: Number, default: 0 },
  reBakes: { type: Number, default: 0 },
  referredBy: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
