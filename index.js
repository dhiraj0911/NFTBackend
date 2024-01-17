require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const FormData = require('form-data');

const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkZWQ1N2Y5YS03ZmNiLTQ0MDUtYTkzMy0zNjAzYjg3NDI4ZjciLCJlbWFpbCI6Im5lenVrbzE5NDlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjI3MzNjNTUyYjE1ZTkzYzhiYmY2Iiwic2NvcGVkS2V5U2VjcmV0IjoiZjBhYTEwNjNmZjJlMWIwY2UwMTU5MGUxM2IwYWM5Y2FjZjMxOGJkZDE0NTliOTIzYjc2ZjU1ZGUzMThiNjRlNSIsImlhdCI6MTcwNTMyMzE4OX0.rOhUMLkh_50sKLNkB702yhwbwP8m-xaYqbCR1VhkxsU';

const vendorRoutes = require('./routes/vendorRoutes');
const assetRoutes = require('./routes/assetRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const activityLogRoutes = require('./routes/activityLogRoutes');
const rentalRoutes = require('./routes/rentalRoutes');

const {
  connectDB
} = require("./config/db");

connectDB();
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API running..."
  });
});

app.use('/api/vendor', vendorRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/transaction/', transactionRoutes);
app.use("/api/rental", rentalRoutes);
app.use('/api/logs', activityLogRoutes);

app.get('/games', async (req, res) => {
  try {
    const game = fs.readFileSync('game.json');
    const gameData = JSON.parse(game);
    res.json(gameData);
  } catch (error) {
    console.error('Error in fetch-assets:', error.message);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

app.post('/mint-asset', async (req, res) => {
  try {
    let data = req.body;
    let formData = new FormData();

    const buffer = Buffer.from(JSON.stringify(data));
    formData.append('file', buffer, { filename: `${data.id}.json`});

    const ipfsResult = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      headers: {
        'Authorization': JWT
      }
    })
    console.log(ipfsResult.data);
    return res.json({
      ipfsResult: ipfsResult.data
    });
  } catch (error) {
    console.error('Error in pining to IPFS:', error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});