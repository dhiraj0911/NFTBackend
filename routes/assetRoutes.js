const express = require("express");
const router = express.Router();
const {
    getAssets,
    getAssetById,
} = require("../controller/assetController");

router.get("/", getAssets);
router.get("/:id", getAssetById);

module.exports = router;