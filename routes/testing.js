const updateBookingAndCars = require("../controllers/TestingController");

const router = require("express").Router();

router.get("/", updateBookingAndCars.updateBookingAndCars);
router.get("/update", updateBookingAndCars.makeAllVehicleAvailable);
router.get("/query-book", updateBookingAndCars.testingBookQuery);

module.exports = router;
