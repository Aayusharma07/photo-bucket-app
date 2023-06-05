const { string } = require("joi");
const mongoose = require("mongoose");

const uploadedImageSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
    },
    orignalname: {
      type: String,
    },
    filepath: {
      type: String,
    },
    category: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("uploadedImages", uploadedImageSchema);
