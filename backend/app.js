const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path")

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/db/config.env" });
  }

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

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

// Catch-all handler for API routes
app.get("*", (req, res) => {
    res.status(404).json({ 
        error: "API endpoint not found",
        message: "Please check your API endpoint URL"
    });
});
 
module.exports = app;
