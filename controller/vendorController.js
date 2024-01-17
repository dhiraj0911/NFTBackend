const bcrypt = require('bcrypt');
const Vendor = require('../models/vendor');
const { sendResponseError } = require('../middleware/middleware');
const { checkPassword, newToken } = require('../utils/utilityFunction');

const signUpVendor = async (req, res) => {
  const { password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 8);
    await Vendor.create({...req.body ,password: hash});
    res.status(201).json({ message: 'Successfully created vendor account' });
    return;
  } catch (err) {
    console.log('Error: ', err);
    sendResponseError(500, 'Something wrong please try again', res);
    return;
  }
};

const signInVendor = async (req, res) => {
  const { password, email, ethAddress } = req.body;
  try {
    let vendor;
    if (email) {
      vendor = await Vendor.findOne({ email });
    } else if (ethAddress) {
      vendor = await Vendor.findOne({ ethAddress });
    }

    if (!vendor) {
      sendResponseError(400, 'No account found with the provided credentials. Please sign up first.', res);
      return;
    }
    const same = await checkPassword(password, vendor.password);
    if (same) {
      let token = newToken(vendor);
      let vendorId = vendor._id;
      res.status(200).send({ status: 'ok', token, vendorId });
      return;
    }
    sendResponseError(400, 'Invalid password!', res);
  } catch (err) {
    console.log('Error:', err);
    sendResponseError(500, `Error ${err}`, res);
  }
};

module.exports = { signUpVendor, signInVendor };
