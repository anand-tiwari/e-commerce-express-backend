const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is require"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category Id is rerquired add a product"],
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },

    options: {
      frameType: {
        type: String,
        default: "",
      },
      frameShape: {
        type: String,
        default: "",
      },
      frameColor: {
        type: String,
        default: "",
      },
    },
    photos: [
      {
        id: {
          type: String,
          required: [true, "At least one product photo is required"],
        },
        secure_url: {
          type: String,
          required: [true, "At least one product photo is required"],
        },
      },
    ],

    tag: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    discount: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
