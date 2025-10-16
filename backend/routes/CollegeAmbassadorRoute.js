const express = require("express");
const {
  registerAmbassador,
  getAllAmbassadors,
  getSingleAmbassador,
  getAmbassadorByEmail,
  getAmbassadorsByCity,
  getAmbassadorsByCollege,
  updateAmbassador,
  updateAmbassadorStatus,
  deleteAmbassador,
  getAmbassadorStats,
  searchAmbassadors
} = require("../controller/CollegeAmbassadorCont");

const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Public routes
router.route("/ambassador/register").post(registerAmbassador);
router.route("/ambassador/search").get(searchAmbassadors);

// Protected routes (require authentication)
router.route("/ambassador/:id").get(isAuthenticatedUser, getSingleAmbassador);
router.route("/ambassador/email/:email").get(isAuthenticatedUser, getAmbassadorByEmail);
router.route("/ambassador/city/:city").get(isAuthenticatedUser, getAmbassadorsByCity);
router.route("/ambassador/college/:collegeName").get(isAuthenticatedUser, getAmbassadorsByCollege);

// Admin routes
router.route("/admin/ambassadors").get(getAllAmbassadors);
router.route("/admin/ambassador/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateAmbassador);
router.route("/admin/ambassador/:id/status").put(isAuthenticatedUser, authorizeRoles("admin"), updateAmbassadorStatus);
router.route("/admin/ambassador/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteAmbassador);
router.route("/admin/ambassadors/stats").get(isAuthenticatedUser, authorizeRoles("admin"), getAmbassadorStats);

module.exports = router;

