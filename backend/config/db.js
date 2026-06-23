const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio";
  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected ✅ (${uri === process.env.MONGO_URI ? 'Atlas' : 'Local fallback'})`);
  } catch (error) {
    console.error("MongoDB connection error ❌:", error.message);
    console.log("Please install MongoDB locally or provide MONGO_URI in .env file.");
    process.exit(1);
  }
};

module.exports = connectDB;