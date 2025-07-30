const uploadImage = require("../controllers/ImageController");
const {
  getCarList,
  getMotorcycleList,
  createMotorcycle,
  updateCar,
  getCarById,
  createCar,
  countAllVehicles,
  getVehicles,
  getVehicleById,
  updateVehicleFeature,
  updateVehicleDetails,
  favouriteVehicle,
} = require("../controllers/VehicleController");
const { authenticate, authorizeRoles } = require("../middlwares/authenticate");
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
router.put(
  "/update-feature/:vehicle_id",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  updateVehicleFeature
);

router.put(
  "/update-details/:vehicle_id",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  updateVehicleDetails
);

router.get(
  "/vehicles",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  getVehicles
);

router.get(
  "/countVehicles",
  authenticate,
  authorizeRoles("Super Admin", "Admin"),
  countAllVehicles
);

router.get("/favourite-vehicle", authenticate, favouriteVehicle);
router.post(
  "/motorcycles",
  authenticate,
  checkAdmin,
  upload.single("image_url"),
  validateBody(createMotorcycleSchema),
  uploadImage,
  createMotorcycle
);

router.get("/cars", getCarList);

router.post(
  "/car",
  authenticate,
  checkAdmin,
  upload.single("image_url"),
  validateBody(createCarSchema),
  uploadImage,
  createCar
);
router.get("/motorcycles", getMotorcycleList);

//Route Cars

router.get("/:vehicle_id", authenticate, getVehicleById);
router.get("/car/:id", getCarById);
router.put("/car/:id", authenticate, checkAdmin, updateCar);
router.get("/car/:id", getCarById);

module.exports = router;
