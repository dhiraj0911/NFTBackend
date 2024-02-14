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
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

const Vendor = mongoose.model('Vendor', vendorSchema)
module.exports = Vendor
