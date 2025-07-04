const {
  checkEmail,
  sendOtp,
  verifyEmail,
  login,
  requestForgotPassword,
  checkForgotPasswordToken,
  useForgotPasswordToken,
  checkUser,
} = require("../controllers/AuthController");
const {
  registerUserSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
} = require("../validations/authValidations");
const validateBody = require("../middlwares/validateBody");
const { authenticate } = require("../middlwares/authenticate");

const router = require("express").Router();

router.post("/register", validateBody(registerUserSchema), checkEmail, sendOtp);
router.post("/register/send-otp", validateBody(registerUserSchema), sendOtp);
router.post("/verify-otp", validateBody(verifyEmailSchema), verifyEmail);
router.post("/login", login);
router.post(
  "/forgot-password",
  validateBody(forgotPasswordSchema),
  requestForgotPassword
);
router.get("/forgot-password", checkForgotPasswordToken);
router.post("/forgot-password/change-password", useForgotPasswordToken);
router.get("/me", authenticate, checkUser);

module.exports = router;
