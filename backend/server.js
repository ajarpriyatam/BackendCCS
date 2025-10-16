const app = require("./app.js");
const dotenv = require('dotenv')
const connect = require("./db/connect.js");
const cloudinary = require("cloudinary");

// Load environment variables - try both local and Vercel
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: "backend/db/config.env" });
}

// Configure Cloudinary with error handling
try {
  cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET,
  });
  console.log("Cloudinary configured successfully");
} catch (error) {
  console.error("Cloudinary configuration failed:", error.message);
}

// Connect to database (only for non-serverless environments)
if (process.env.NODE_ENV !== 'production') {
  connect().catch(error => {
    console.error("Failed to connect to database:", error.message);
    process.exit(1);
  });
}

const PORT = process.env.PORT || 4000;

// For Vercel serverless functions, export the app directly
if (process.env.NODE_ENV === 'production') {
  // Add error handling for production
  app.use((err, req, res, next) => {
    console.error('Production error:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong on our end'
    });
  });
  
  module.exports = app;
} else {
  // For local development, start the server
  const server = app.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}`);
  });
}
