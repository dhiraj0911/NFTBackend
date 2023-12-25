const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: String,
    ethAddress: {
        type: String,
        required: true,
        unique: true,
    },
  },
  {
    timestamps: true,
  },
)

const Vendor = mongoose.model('vendor', vendorSchema)
module.exports = Vendor
