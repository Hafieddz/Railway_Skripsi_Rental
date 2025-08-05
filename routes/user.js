const router = require("express").Router();
const {
  getCustomers,
  updateUserVerificationStatus,
} = require("../controllers/Customer/AdminCustomerController");
const {
  updateUserData,
  addPhoneNumber,
  addAddress,
  checkPassword,
  changePassword,
} = require("../controllers/User/UserController");
const { getCustomerBooks } = require("../controllers/UserController");
const {
  authenticate,
  authorizeRoles,
  isAdminActive,
} = require("../middlwares/authenticate");

router.get(
  "/admin/customers",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  getCustomers
);

router.put(
  "/admin/update-verification-status/:user_id",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  isAdminActive,
  updateUserVerificationStatus
);

router.post("/update-user", authenticate, updateUserData);
router.post("/add-phone", authenticate, addPhoneNumber);
router.post("/add-address", authenticate, addAddress);
router.post("/check-password", authenticate, checkPassword);
router.put("/change-password", authenticate, changePassword);

// router.get(
//   "/customers",
//   authenticate,
//   authorizeRoles("Super Admin", "Admin"),
//   getCustomers
// );

// router.get("/:id", authenticate, getUserById);
// router.post(
//   "/:id",
//   authenticate,
//   upload.single("user_image"),
//   uploadImage,
//   updateUserImage
// );

// router.put(
//   "/update-verification-status/:user_id",
//   authenticate,
//   updateUserVerificationStatus
// );

module.exports = router;
