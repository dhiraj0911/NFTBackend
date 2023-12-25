require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const ipfs = require('./ipfs');
const fs = require('fs');
const vendorRoutes = require('./routes/vendorRoutes');
const assetRoutes = require('./routes/assetRoutes');
const myAssetRoutes = require('./routes/myAssetRoutes');
const { connectDB } = require("./config/db");

connectDB();
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

app.use('/api/vendor', vendorRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/myAsset', myAssetRoutes);

app.get('/games', async (req, res) => {
  try {
    const game = fs.readFileSync('game.json');
    const gameData = JSON.parse(game);
    res.json(gameData);
  } catch (error) {
    console.error('Error in fetch-assets:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/fetch-assets/:endpoint', async (req, res) => {
  try {
    const { endpoint } = req.params;
    const decodedEndpoint = decodeURIComponent(endpoint);

    const response = await axios.get(decodedEndpoint);
    let dataItems = response.data;

    if (!Array.isArray(dataItems)) {
      dataItems = [dataItems];
    }

    const deployedAssets = await Promise.all(dataItems.map(async (data) => {
      const gameAsset = {
        name: data.name,
        description: data.description,
        id: data.id,
      };

      const buffer = Buffer.from(JSON.stringify(gameAsset));
      const ipfsResult = await ipfs.files.add(buffer);

      return {
        name: gameAsset.name,
        description: gameAsset.description,
        id: gameAsset.id,
        ipfsHash: ipfsResult[0].hash
      };
    }));  

    res.json({ deployedAssets });
  } catch (error) {
    console.error('Error in fetch-assets:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});