const express = require('express')
const {
  signUpVendor,
  signInVendor,
  getVendor,
} = require('../controller/vendorController')
const {verifyUser} = require('../middleware/middleware')
const router = express.Router()

router.post('/signup', signUpVendor)
router.post('/signin', signInVendor)

router.route('/me').get([verifyUser], getVendor)

module.exports = router
