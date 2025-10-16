const app = require("./app.js");
const dotenv = require('dotenv')
const connect = require("./db/connect.js");
const cloudinary = require("cloudinary");

// Load environment variables - try both local and Vercel
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: "backend/db/config.env" });
}

// Connect to database with proper error handling
const initializeDB = async () => {
  try {
    console.log("🔗 Attempting to connect to MongoDB...");
    console.log("📍 DB_URI exists:", !!process.env.DB_URI);
    
    if (!process.env.DB_URI) {
      console.error("❌ DB_URI environment variable is not set!");
      return false;
    }
    
    await connect();
    console.log("✅ Database connected successfully");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    return false;
  }
};

// Initialize database connection
initializeDB();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});

const PORT = process.env.PORT || 4000;

// For Vercel serverless functions, export the app directly
if (process.env.NODE_ENV === 'production') {
  module.exports = app;
} else {
  // For local development, start the server
  const server = app.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}`);
  });
}
