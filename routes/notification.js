const { getNotifications } = require("../controllers/NotificationController");
const { authenticate, authorizeRoles } = require("../middlwares/authenticate");

const router = require("express").Router();

router.get("/", authenticate, getNotifications);

module.exports = router;
