const uploadImage = require("../controllers/ImageController");
const {
  getUserById,
  updateUserImage,
  updateUserData,
  addPhoneNumber,
  addAddress,
  changePassword,
  checkPassword,
  updateUserVerificationStatus,
  getCustomers,
} = require("../controllers/UserController");
const { authenticate, authorizeRoles } = require("../middlwares/authenticate");
const upload = require("../middlwares/upload");

const router = require("express").Router();

router.get(
  "/customers",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  getCustomers
);
router.post("/update-user", authenticate, updateUserData);
router.post("/add-phone", authenticate, addPhoneNumber);
router.post("/add-address", authenticate, addAddress);
router.post("/check-password", authenticate, checkPassword);
router.put("/change-password", authenticate, changePassword);

router.get("/:id", authenticate, getUserById);
router.post(
  "/:id",
  authenticate,
  upload.single("user_image"),
  uploadImage,
  updateUserImage
);

router.put(
  "/update-verification-status/:user_id",
  authenticate,
  updateUserVerificationStatus
);

module.exports = router;
