const { checkPayment } = require("../controllers/PaymentController");
const { authenticate } = require("../middlwares/authenticate");

const router = require("express").Router();

router.post("/verify-payment", authenticate, checkPayment);
router.get("/verify-payment", authenticate, checkPayment);

module.exports = router;
    