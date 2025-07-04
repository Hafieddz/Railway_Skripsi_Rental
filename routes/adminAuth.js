const {
  getAdminList,
  registerNewAdmin,
} = require("../controllers/AdminAuthController");
const { authenticate, authorizeRoles } = require("../middlwares/authenticate");

const router = require("express").Router();

router.get(
  "/admin_list",
  authenticate,
  authorizeRoles("Super Admin"),
  getAdminList
);
router.post(
  "/register",
  authenticate,
  authorizeRoles("Super Admin"),
  registerNewAdmin
);

module.exports = router;
