const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reciever: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  question: { type: String, default: "" },
  type: { type: String, enum: ["all", "specific"], default: 'specific' },
  url: { type: String, default: "" }
});
module.exports = mongoose.model("Notification", notificationSchema);
