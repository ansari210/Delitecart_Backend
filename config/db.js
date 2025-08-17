const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MongoDB URI is missing in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);


    console.log(`✅ MongoDB Connected to: ${mongoose.connection.name}`);
  } catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
    process.exit(1); 
  }

  mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
  });
};

module.exports = connectDB;
