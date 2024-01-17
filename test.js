const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
require('dotenv').config()

const pinFileToIPFS = async () => {
  try {
    let data = new FormData()
    // data.append('file', fs.createReadStream('./test.js'))

    const gameAsset = {
      name: "Hi",
      description: "I love you",
      id: "two",
    };
    const buffer = Buffer.from(JSON.stringify(gameAsset));
    data.append('file', buffer, {
      filename: 'gameAsset.json'
    });

    console.log(data);
    const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkZWQ1N2Y5YS03ZmNiLTQ0MDUtYTkzMy0zNjAzYjg3NDI4ZjciLCJlbWFpbCI6Im5lenVrbzE5NDlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjI3MzNjNTUyYjE1ZTkzYzhiYmY2Iiwic2NvcGVkS2V5U2VjcmV0IjoiZjBhYTEwNjNmZjJlMWIwY2UwMTU5MGUxM2IwYWM5Y2FjZjMxOGJkZDE0NTliOTIzYjc2ZjU1ZGUzMThiNjRlNSIsImlhdCI6MTcwNTMyMzE4OX0.rOhUMLkh_50sKLNkB702yhwbwP8m-xaYqbCR1VhkxsU'
      }
    })
    console.log(res.data)
    console.log(`View the file here: https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`)
  } catch (error) {
    console.log(error)
  }
}

pinFileToIPFS()