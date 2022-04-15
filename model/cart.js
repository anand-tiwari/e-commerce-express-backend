const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is require for updating cart"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product id is required for updating cart"],
    },
    quantity: {
      type: Number,
      default: 1,
      min: [1, "Minimum quantity is 1"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
