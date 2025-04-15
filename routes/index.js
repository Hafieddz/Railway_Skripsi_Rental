const { index_page } = require("../controllers/index_controller");

const router = require("express").Router();

router.get("/", index_page);

module.exports = router;
