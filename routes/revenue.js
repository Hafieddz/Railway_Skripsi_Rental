const router = require("express").Router();
const {
  getRevenue,
  getThisMonthRevenue,
} = require("../controllers/Book/AdminRevenueController");
// const { getRevenue } = require("../controllers/RevenueController");
const { authenticate, authorizeRoles } = require("../middlwares/authenticate");

router.get(
  "/summary",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  getRevenue
);

router.get(
  "/summary-this-month",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  getThisMonthRevenue
);

module.exports = router;
