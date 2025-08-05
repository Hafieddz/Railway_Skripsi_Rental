const {
  getFAQ,
  getTnC,
  createFAQ,
  updateFaq,
  createTnC,
  deleteFAQ,
} = require("../controllers/InformationController");
const {
  authenticate,
  authorizeRoles,
  isAdminActive,
} = require("../middlwares/authenticate");

const router = require("express").Router();

router.get("/faq", authenticate, getFAQ);
router.get("/terms-and-conditions", authenticate, getTnC);
router.post(
  "/faq",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  isAdminActive,
  createFAQ
);

router.post(
  "/terms-and-conditions",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  isAdminActive,
  createTnC
);

router.put(
  "/faq/:faq_id",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  isAdminActive,
  updateFaq
);

router.delete(
  "/faq/:faq_id",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  isAdminActive,
  deleteFAQ
);

module.exports = router;
