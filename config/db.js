require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI ||
      "mongodb://localhost:27017/game-asset",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )

    console.log('MongoDB connected SUCCESSFULLY!!')
  } catch (error) {
    console.error('MongoDB connection FAIL')
    process.exit(1)
  }
}

module.exports = {connectDB}
