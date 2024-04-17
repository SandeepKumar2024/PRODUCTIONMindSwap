const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: { type: String },
    text: { type: String },
    seenMsg:{
      type: Boolean,
      default: false
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
