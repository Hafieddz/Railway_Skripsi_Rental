const {
  createBook,
  getBooks,
  getBookStatus,
  getRecentBooks,
  updateBookId,
} = require("../controllers/BookController");
const { authenticate, authorizeRoles } = require("../middlwares/authenticate");

const router = require("express").Router();

router.post("/", authenticate, authorizeRoles("Customer"), createBook);
router.get("/", authenticate, getBooks);
router.get(
  "/book-status",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  getBookStatus
);
router.get(
  "/recent-books",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  getRecentBooks
);

router.put(
  "/update-book/:id",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  updateBookId
);

module.exports = router;
