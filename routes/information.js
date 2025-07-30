const {
  getFAQ,
  getTnC,
  createFAQ,
  updateFaq,
  createTnC,
  deleteFAQ,
} = require("../controllers/InformationController");
const { authenticate, authorizeRoles } = require("../middlwares/authenticate");

const router = require("express").Router();

router.get("/faq", authenticate, getFAQ);
router.get("/terms-and-conditions", authenticate, getTnC);
router.post(
  "/faq",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  createFAQ
);

router.post(
  "/terms-and-conditions",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  createTnC
);

router.put(
  "/faq/:faq_id",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  updateFaq
);

router.delete(
  "/faq/:faq_id",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  deleteFAQ
);

module.exports = router;
