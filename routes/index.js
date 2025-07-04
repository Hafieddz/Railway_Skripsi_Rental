const { index_page } = require("../controllers/IndexController");

const router = require("express").Router();
const authRouter = require("./auth");
const vehicleRouter = require("./vehicle");
const adminAuthRouter = require("./adminAuth");
const bookRouter = require("./book");
const userRouter = require("./user");
const testingRouter = require("./testing");
const notificationRouter = require("./notification");
const paymentRouter = require("./payment");

router.get("/", index_page);
router.use("/api/v1/auth", authRouter);
router.use("/api/v1/vehicle", vehicleRouter);
router.use("/admin/api/v1/auth", adminAuthRouter);
router.use("/api/v1/book", bookRouter);
router.use("/api/v1/user", userRouter);
router.use("/api/v1/testing", testingRouter);
router.use("/api/v1/notification", notificationRouter);
router.use("/api/v1/payment", paymentRouter);

module.exports = router;
