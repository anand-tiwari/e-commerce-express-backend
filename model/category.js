const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      maxlength: [40, "Name should be under 40 character"],
    },
    photo: {
      id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
