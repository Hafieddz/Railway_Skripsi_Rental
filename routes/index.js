const { index_page } = require("../controllers/IndexController");

const router = require("express").Router();
const authRouter = require("./auth");

router.get("/", index_page);
router.use("/api/v1/auth", authRouter);

module.exports = router;
