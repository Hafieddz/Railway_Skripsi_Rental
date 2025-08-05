const {
  checkEmail,

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

const login = require("../controllers/Auth/LoginController");
const {
  register,
  verifyEmail,
} = require("../controllers/Auth/RegisterController");
const router = require("express").Router();

router.post("/login", login);
router.post("/register", validateBody(registerUserSchema), register);
router.post("/verify-otp", validateBody(verifyEmailSchema), verifyEmail);
router.get("/me", authenticate, checkUser);

// router.post("/register/send-otp", validateBody(registerUserSchema), sendOtp);
// router.post("/verify-otp", validateBody(verifyEmailSchema), verifyEmail);
// router.post("/login", login);
// router.post(
//   "/forgot-password",
//   validateBody(forgotPasswordSchema),
//   requestForgotPassword
// );
// router.get("/forgot-password", checkForgotPasswordToken);
// router.post("/forgot-password/change-password", useForgotPasswordToken);


module.exports = router;
