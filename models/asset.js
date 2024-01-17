const mongoose = require("mongoose");

const assetSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    uri: {
      type: String,
      required: true,
      unique: true
    },
    isForSale: {
      type: Boolean,
      default: false
    },
    isForRent: {
      type: Boolean,
      default: false
    },
    price: {
      type: Number
    },
    rentPrice: {
      type: Number
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
  },
  { timestamps: true }
);

const Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;
