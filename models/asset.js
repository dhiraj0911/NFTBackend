const mongoose = require("mongoose");

const assetSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  uri: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
  },
  rentPrice: {
    type: Number,
  },
  owner: {
    type: String,
    required: true
  },
  seller: {
    type: String,
    required: true
  }
});

const Asset = mongoose.model("asset", assetSchema);

module.exports = Asset;
