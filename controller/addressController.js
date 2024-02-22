const Address = require("../models/address");
const Vendor = require("../models/vendor");

const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find().populate('vendorId');
        res.json(addresses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const getAddressById = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id).populate('vendorId');
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }
        res.status(201).json(address);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const findOneFromVendorAndCreateAddress = async (req, res) => {
    try {
        const address = await Address.findOne({ vendorId: req.params.vendorId });
        if (address) {
            return res.status(200).json({ message: "Address Already Store" });
        }
        const newAddress = new Address(req.body);
        await newAddress.save();
        res.status(201).json(newAddress);
        // const address = await Address.create({ vendorId: req.body.vendorId, address: req.body.address });
        // res.json(address);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const getVendorInfofromAddress = async (req, res) => {
    try {
        const address = await Address.findOne({ address: req.params.address }).populate('vendorId');
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }
        // If you want to return only vendor data
        res.status(200).json(address.vendorId);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = {
    getAddresses,
    getAddressById,
    findOneFromVendorAndCreateAddress,
    getVendorInfofromAddress,
};