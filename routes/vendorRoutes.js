const express = require('express')
const {
  signUpVendor,
  signInVendor,
  verifyVendor
  // getVendor,
} = require('../controller/vendorController')
const router = express.Router()

router.post('/signup', signUpVendor)
router.post('/signin', signInVendor)
router.post('/verify', verifyVendor)

// router.post('/me', getVendor)

module.exports = router
