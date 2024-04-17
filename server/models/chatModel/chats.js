const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    seen: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
