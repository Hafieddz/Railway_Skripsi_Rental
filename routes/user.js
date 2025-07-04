const uploadImage = require("../controllers/ImageController");
const {
  getUserById,
  updateUserImage,
} = require("../controllers/UserController");
const { authenticate } = require("../middlwares/authenticate");
const upload = require("../middlwares/upload");

const router = require("express").Router();

router.get("/:id", authenticate, getUserById);
router.post(
  "/:id",
  authenticate,
  upload.single("user_image"),
  uploadImage,
  updateUserImage
);

module.exports = router;
