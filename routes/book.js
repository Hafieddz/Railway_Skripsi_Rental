const { createBook, getBooks } = require("../controllers/BookController");
const { authenticate, authorizeRoles } = require("../middlwares/authenticate");

const router = require("express").Router();

router.post("/", authenticate, authorizeRoles("Customer"), createBook);
router.get("/", authenticate, getBooks);

module.exports = router;
