const Asset = require("../models/asset");

const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find({});
    res.json(assets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    res.json(asset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
    getAssets,
    getAssetById,
};
