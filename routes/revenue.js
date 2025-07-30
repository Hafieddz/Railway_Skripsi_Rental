const router = require("express").Router();
const { getRevenue } = require("../controllers/RevenueController");
const { authenticate, authorizeRoles } = require("../middlwares/authenticate");

router.get(
  "/summary",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  getRevenue
);

module.exports = router;
