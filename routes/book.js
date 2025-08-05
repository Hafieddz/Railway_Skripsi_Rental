const {
  getRecentBooks,
} = require("../controllers/Book/AdminRecentBookController");
const {
  getCustomerBooks,
} = require("../controllers/Book/CustomerBookController");
const {
  createBook,
  getBooks,
  getBookStatus,
  updateBookId,
} = require("../controllers/BookController");
const {
  authenticate,
  authorizeRoles,
  isAdminActive,
} = require("../middlwares/authenticate");

const router = require("express").Router();

//
router.get("/customer/:user_id", authenticate, getCustomerBooks);
router.get(
  "/admin/recent-books",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  getRecentBooks
);

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
  isAdminActive,
  updateBookId
);

module.exports = router;
