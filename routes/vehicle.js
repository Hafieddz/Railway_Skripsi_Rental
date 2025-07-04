const uploadImage = require("../controllers/ImageController");
const {
  getCarList,
  getMotorcycleList,
  createMotorcycle,
  updateCar,
  getCarById,
  createCar,
} = require("../controllers/VehicleController");
const { authenticate } = require("../middlwares/authenticate");
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

//Route Cars
router.get("/cars", getCarList);

router.get("/car/:id", getCarById);

router.post(
  "/car",
  authenticate,
  checkAdmin,
  upload.single("image_url"),
  validateBody(createCarSchema),
  uploadImage,
  createCar
);

router.put("/car/:id", authenticate, checkAdmin, updateCar);

//Route Motorcyles
router.get("/motorcycles", getMotorcycleList);
router.get("/car/:id", getCarById);

router.post(
  "/motorcycles",
  authenticate,
  checkAdmin,
  upload.single("image_url"),
  validateBody(createMotorcycleSchema),
  uploadImage,
  createMotorcycle
);

module.exports = router;
