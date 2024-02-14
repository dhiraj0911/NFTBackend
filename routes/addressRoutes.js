const express = require("express");
const router = express.Router();
const { getAddresses, getAddressById, findOneFromVendorAndCreateAddress } = require("../controller/addressController");

router.get("/", getAddresses);
router.get("/:id", getAddressById);
router.post("/", findOneFromVendorAndCreateAddress);

module.exports = router;