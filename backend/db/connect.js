const mongoose = require("mongoose");

const connect = async () => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      console.log("✅ MongoDB already connected");
      return;
    }
    
    console.log("🔗 Connecting to MongoDB...");
    console.log("📍 DB_URI:", process.env.DB_URI ? "Set" : "Not set");
    
    if (!process.env.DB_URI) {
      throw new Error("DB_URI environment variable is not set");
    }
    
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferMaxEntries: 0, // Disable mongoose buffering
      bufferCommands: false, // Disable mongoose buffering
    });
    
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
};

module.exports = connect;
