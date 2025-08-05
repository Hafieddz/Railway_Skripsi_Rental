const uploadImage = require("../controllers/ImageController");
const {
  getCarById,
  getMotorcycleById,
  favouriteVehicle,
} = require("../controllers/Vehicle/VehicleController");
const {
  getRentalCarList,
  getRentalMotorcycleList,
} = require("../controllers/Vehicle/VehicleCustomerController");
const {
  getCarList,
  getMotorcycleList,
  createMotorcycle,
  updateCar,
  createCar,
  countAllVehicles,
  getVehicles,
  getVehicleById,
  updateVehicleFeature,
  updateVehicleDetails,
} = require("../controllers/VehicleController");
const {
  authenticate,
  authorizeRoles,
  isAdminActive,
} = require("../middlwares/authenticate");
const checkAdmin = require("../middlwares/checkAdmin");
const upload = require("../middlwares/upload");
const validateBody = require("../middlwares/validateBody");
const {
  createCarSchema,
  updateCarSchema,
} = require("../validations/carValidation");
const {
  createMotorcycleSchema,
} = require("../validations/motorcycleValidation");

const router = require("express").Router();

//Route Vehicles
router.get("/customer/cars", getRentalCarList);
router.get("/customer/motorcycles", getRentalMotorcycleList);

// Vehicle Details
router.get("/car/:vehicle_id", getCarById);
router.get("/motorcycle/:vehicle_id", getMotorcycleById);

// update feature
router.put(
  "/update-feature/:vehicle_id",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  isAdminActive,
  updateVehicleFeature
);

// update details kendaraan (manufacture year, passenger, fuel, details, condition, etc)
router.put(
  "/update-details/:vehicle_id",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  isAdminActive,
  updateVehicleDetails
);

// fetch untuk list kendaraan admin
router.get(
  "/vehicles",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  getVehicles
);

// dashboard jumlah kendaraan
router.get(
  "/countVehicles",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  countAllVehicles
);

// landing page
router.get("/favourite-vehicle", favouriteVehicle);

// buat data motor
router.post(
  "/motorcycles",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  isAdminActive,
  upload.single("image_url"),
  validateBody(createMotorcycleSchema),
  uploadImage,
  createMotorcycle
);

router.get("/cars", getCarList);

// buat data mobil
router.post(
  "/car",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  isAdminActive,
  upload.single("image_url"),
  validateBody(createCarSchema),
  uploadImage,
  createCar
);

router.get("/motorcycles", getMotorcycleList);

router.get("/:vehicle_id", authenticate, getVehicleById);
router.get("/car/:id", getCarById);
router.put("/car/:id", authenticate, checkAdmin, updateCar);
router.get("/car/:id", getCarById);

module.exports = router;
