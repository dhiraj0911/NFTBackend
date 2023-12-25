const express = require('express')
const {
 getMyAssets,
 getMyAssetById,
 createMyAsset,
 updateMyAsset,
 deleteMyAsset,
} = require('../controller/myAssetController')
const {verifyUser} = require('../middleware/middleware')
const router = express.Router()

router
  .route('/')
  .get(verifyUser, getMyAssets)
  .post(verifyUser, createMyAsset)

router
  .route('/:id')
  .get(verifyUser, getMyAssetById)
  .put(verifyUser, updateMyAsset)
  .delete(verifyUser, deleteMyAsset)

module.exports = router