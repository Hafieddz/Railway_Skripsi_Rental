const {
  getNotifications,
  notifyUser,
} = require("../controllers/NotificationController");
const { authenticate, authorizeRoles } = require("../middlwares/authenticate");

const router = require("express").Router();

router.get("/", authenticate, getNotifications);

router.post(
  "/notify-booking/:user_id",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  notifyUser
);

module.exports = router;
