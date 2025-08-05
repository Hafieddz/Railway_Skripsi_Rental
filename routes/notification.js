const {
  getNotifications,
  notifyUser,
} = require("../controllers/NotificationController");
const {
  authenticate,
  authorizeRoles,
  isAdminActive,
} = require("../middlwares/authenticate");

const router = require("express").Router();

router.get("/", authenticate, getNotifications);

router.post(
  "/notify-booking/:user_id",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  isAdminActive,
  notifyUser
);

module.exports = router;
