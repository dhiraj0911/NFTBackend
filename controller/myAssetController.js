const MyAsset = require("../models/myAsset");
const Asset = require("../models/asset");

const getMyAssets = async (req, res) => {
 try {
  const myAssets = await MyAsset.find({ userId: req.user._id });
  res.json(myAssets);
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: "Server Error" });
 }
};

const getMyAssetById = async (req, res) => {
 try {
  const myAsset = await MyAsset.findOne({
   _id: req.params.id,
   userId: req.user._id,
  });

  if (!myAsset) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(myAsset);
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: "Server Error" });
 }
};

const createMyAsset = async (req, res) => {
 try {
  const newMyAsset = new MyAsset({
   userId: req.user._id,
   assetId: req.body.assetId,
  });

  await newMyAsset.save();
  res.json(newMyAsset);
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: "Server Error" });
 }
};

const updateMyAsset = async (req, res) => {
 try {
  const myAsset = await MyAsset.findOne({
   _id: req.params.id,
   userId: req.user._id,
  });

  if (!myAsset) {
    return res.status(404).json({ message: "Not found" });
  }

  myAsset.assetId = req.body.assetId;

  await myAsset.save();
  res.json(myAsset);
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: "Server Error" });
 }
};

const deleteMyAsset = async (req, res) => {
 try {
  const myAsset = await MyAsset.findOne({
   _id: req.params.id,
   userId: req.user._id,
  });

  if (!myAsset) {
    return res.status(404).json({ message: "Not found" });
  }

  await myAsset.delete();
  res.json({ message: "Deleted" });
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: "Server Error" });
 }
};

module.exports = {
 getMyAssets,
 getMyAssetById,
 createMyAsset,
 updateMyAsset,
 deleteMyAsset,
};