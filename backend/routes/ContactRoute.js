const express = require("express");
const {
  sendContactMessage
} = require("../controller/ContactCont");

const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Public routes
router.route("/contact/send").post(sendContactMessage);

module.exports = router;
