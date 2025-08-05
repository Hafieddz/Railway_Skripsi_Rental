const { index_page } = require("../controllers/IndexController");

const router = require("express").Router();
const authRouter = require("./auth");
const vehicleRouter = require("./vehicle");
const adminRouter = require("./admin");
const bookRouter = require("./book");
const userRouter = require("./user");
const testingRouter = require("./testing");
const notificationRouter = require("./notification");
const paymentRouter = require("./payment");
const revenueRouter = require("./revenue");
const reviewRouter = require("./review");
const informationRouter = require("./information");

router.get("/", index_page);
router.use("/api/v1/auth", authRouter);
router.use("/api/v1/vehicle", vehicleRouter);
router.use("/api/v1/admin", adminRouter);
router.use("/api/v1/book", bookRouter);
router.use("/api/v1/user", userRouter);
router.use("/api/v1/testing", testingRouter);
router.use("/api/v1/notification", notificationRouter);
router.use("/api/v1/payment", paymentRouter);
router.use("/api/v1/revenue", revenueRouter);
router.use("/api/v1/review", reviewRouter);
router.use("/api/v1/information", informationRouter);

module.exports = router;
