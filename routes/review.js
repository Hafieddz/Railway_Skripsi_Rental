const {
  createReview,
  getReviewByVehicleId,
  getReviews,
} = require("../controllers/ReviewController");
const { authenticate, authorizeRoles } = require("../middlwares/authenticate");

const router = require("express").Router();

router.get("/", authenticate, getReviews);

router.post(
  "/:booking_id",
  authenticate,
  authorizeRoles("Customer"),
  createReview
);
router.get("/:vehicle_id", authenticate, getReviewByVehicleId);

module.exports = router;
