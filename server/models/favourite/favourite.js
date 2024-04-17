const mongoose = require("mongoose");

const favouritesSchema = new mongoose.Schema(
  {
    favId: {
      type: [String],
      default: [],
    },
    userId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favourite", favouritesSchema);
