const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path")

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "backend/db/config.env" });
  }

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Database connection middleware (temporarily disabled for debugging)
app.use(async (req, res, next) => {
  const mongoose = require('mongoose');
  const connect = require('./db/connect.js');
  
  // Skip database check for health and db-status endpoints
  if (req.path === '/api/health' || req.path === '/api/db-status') {
    return next();
  }
  
  // If not connected, try to connect
  if (mongoose.connection.readyState !== 1) {
    try {
      console.log("🔄 Attempting to reconnect to database...");
      await connect();
      console.log("✅ Database reconnected successfully");
    } catch (error) {
      console.error("❌ Database reconnection failed:", error.message);
      return res.status(503).json({
        error: 'Database connection failed',
        message: 'Please check your database configuration',
        debug: {
          connectionState: mongoose.connection.readyState,
          hasDbUri: !!process.env.DB_URI,
          error: error.message
        }
      });
    }
  }
  next();
});

const product = require("./routes/ProdectRoute");
const user = require("./routes/UserRoute");
const order = require("./routes/OrderRoute");
const coupon = require("./routes/CouponRoute");
const cart = require("./routes/CartRoute");
const collegeAmbassador = require("./routes/CollegeAmbassadorRoute");
const contact = require("./routes/ContactRoute");

app.use("/api/v3", product);
app.use("/api/v3", user);
app.use("/api/v3", order);
app.use("/api/v3", coupon);
app.use("/api/v3", cart);
app.use("/api/v3", collegeAmbassador);
app.use("/api/v3", contact);

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "../public")));

// API health check endpoint
app.get("/api/health", (req, res) => {
    res.json({ 
        status: "OK", 
        message: "SoleStyle Backend API is running",
        timestamp: new Date().toISOString()
    });
});

// Database status check endpoint
app.get("/api/db-status", async (req, res) => {
    const mongoose = require('mongoose');
    const connect = require('./db/connect.js');
    
    try {
        const dbStatus = {
            environment: process.env.NODE_ENV || 'not set',
            dbUri: process.env.DB_URI ? 'Set' : 'Not set',
            connectionState: mongoose.connection.readyState,
            connectionStates: {
                0: 'disconnected',
                1: 'connected',
                2: 'connecting',
                3: 'disconnecting'
            }
        };
        
        // Try to connect if not connected
        if (mongoose.connection.readyState !== 1) {
            try {
                await connect();
                dbStatus.connectionState = mongoose.connection.readyState;
                dbStatus.message = 'Database connected successfully';
            } catch (error) {
                dbStatus.message = 'Database connection failed: ' + error.message;
                dbStatus.error = error.message;
            }
        } else {
            dbStatus.message = 'Database already connected';
        }
        
        res.json(dbStatus);
    } catch (error) {
        res.status(500).json({
            error: 'Database check failed',
            message: error.message
        });
    }
});

// Catch-all handler for API routes
app.get("*", (req, res) => {
    res.status(404).json({ 
        error: "API endpoint not found",
        message: "Please check your API endpoint URL"
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        message: 'An error occurred while processing your request'
    });
});
 
module.exports = app;
