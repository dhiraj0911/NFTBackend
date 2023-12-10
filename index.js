require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const IPFS = require('ipfs-api');

const app = express();
const port = 3001;
app.use(cors());

const projectId = "2PGfyuOFHN2WvcmenzYdipJ7LrY";
const projectSecret = "1f5798a2398f8ac8e2c9e465a5abe053";

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = new IPFS({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

app.use(express.json());

// Use a dynamic route parameter to receive the API endpoint from the frontend
app.post('/fetch-assets/:endpoint', async (req, res) => {
  try {
    const { endpoint } = req.params;
    const decodedEndpoint = decodeURIComponent(endpoint);

    // Make a request to the provided API endpoint
    const response = await axios.get(decodedEndpoint);
    let dataItems = response.data;

    // Ensure dataItems is always an array
    if (!Array.isArray(dataItems)) {
      dataItems = [dataItems];
    }

    // Process each data point and save metadata to IPFS
    const deployedAssets = await Promise.all(dataItems.map(async (data) => {
      const gameAsset = {
        name: data.name,
        description: data.description,
        id: data.id,
      };

      // Upload JSON to IPFS
      const buffer = Buffer.from(JSON.stringify(gameAsset));
      const ipfsResult = await ipfs.files.add(buffer);

      // Return an object including the name, id, and ipfsHash
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
