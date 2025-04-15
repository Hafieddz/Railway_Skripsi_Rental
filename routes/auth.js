const {
  checkEmail,
  sendOtp,
  verifyEmail,
} = require("../controllers/AuthController");

const router = require("express").Router();

router.post("/register", checkEmail, sendOtp, verifyEmail);

module.exports = router;
