const mongoose = require('mongoose')

const myAssetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'vendor',
      required: true,
    },
    assetId: {
      type: mongoose.Types.ObjectId,
      ref: 'asset',
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const MyAsset = mongoose.model('myAsset', myAssetSchema)
module.exports = MyAsset
