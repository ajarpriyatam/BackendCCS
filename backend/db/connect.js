const mongoose = require("mongoose");

const connect = async () => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB already connected");
      return;
    }
    
    console.log("Attempting to connect to MongoDB...");
    console.log("DB_URI:", process.env.DB_URI ? "Set" : "Not set");
    
    await mongoose.connect(process.env.DB_URI, {
      serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
};

module.exports = connect;
