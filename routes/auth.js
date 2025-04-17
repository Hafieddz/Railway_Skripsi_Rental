const {
  checkEmail,
  sendOtp,
  verifyEmail,
  login,
} = require("../controllers/AuthController");

const router = require("express").Router();

router.post("/register", checkEmail, sendOtp, verifyEmail);
router.post("/verify-otp", verifyEmail);
router.post("/login", login);

module.exports = router;
