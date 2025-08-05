const {
  getAdminList,
  createAdmin,
  deleteAdmin,
  updateAdminStatus,
} = require("../controllers/Admin/AdminController");
const { authenticate, authorizeRoles } = require("../middlwares/authenticate");

const router = require("express").Router();

router.get(
  "/admin-list",
  authenticate,
  authorizeRoles("Super Admin"),
  getAdminList
);

router.post(
  "/add-admin",
  authenticate,
  authorizeRoles("Super Admin"),
  createAdmin
);

router.delete(
  "/delete-admin/:user_id",
  authenticate,
  authorizeRoles("Super Admin"),
  deleteAdmin
);

router.put(
  "/update-status/:admin_id",
  authenticate,
  authorizeRoles("Super Admin"),
  updateAdminStatus
);

module.exports = router;
