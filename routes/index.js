import { index_page } from "../controllers/index_controller";

const router = require("express").Router();

router.get("/", index_page);

module.exports = router;
