const { Op, where } = require("sequelize");
const ApiError = require("../lib/ApiError");
const {
  Car,
  Motorcycle,
  Vehicle,
  sequelize,
  User,
  Customer,
  Booking,
  VehicleAvailability,
  Review,
} = require("../models");
const { v4: uuidv4, parse } = require("uuid");
const { raw } = require("express");

const getCarById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const car = await Car.findOne({
      where: {
        vehicle_id: id,
      },
    });

    if (!car) {
      throw new ApiError(404, "Data mobil tidak ditemukan");
    }

    const getBookingIds = await Booking.findAll({
      where: {
        vehicle_id: id,
      },
      attributes: ["booking_id"],
    });

    const bookingIds = await getBookingIds.map((item) => item.booking_id);

    const getReview = await Review.findAndCountAll({
      where: {
        booking_id: {
          [Op.in]: bookingIds,
        },
      },
      include: [
        {
          model: User,
          as: "user_data",
          include: [
            {
              model: Customer,
              as: "customer",
            },
          ],
        },
      ],
    });

    console.log(getReview);

    res.status(200).json({
      is_success: true,
      car_data: car,
      review_data: getReview,
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const getCarList = async (req, res, next) => {
  try {
    const {
      name,
      brand,
      manufacture_year,
      color,
      transmission_type,
      passenger_capacity,
      type,
      limit = 5,
      page = 1,
      rentalStartDate,
      rentalEndDate,
      is_available,
    } = req.query;

    console.log(req.query);

    const offset = (page - 1) * limit;

    const where = {};
    let cars;

    console.log(where);

    const allowedTransmissions = ["Automatic", "Manual"];
    const allowedType = ["Sedan", "MPV", "SUV"];

    if (transmission_type) {
      const fix_enum_tranmission_type =
        transmission_type.charAt(0).toUpperCase() +
        transmission_type.slice(1).toLowerCase();

      if (!allowedTransmissions.includes(fix_enum_tranmission_type)) {
        throw new ApiError(
          400,
          "Tipe transmisi harus 'Automatic' atau 'Manual'"
        );
      }

      where.transmission_type = fix_enum_tranmission_type;
    }

    if (!allowedType.includes(type)) {
      where.type = ["Sedan", "SUV", "MPV"];
    }

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }
    if (brand) {
      where.brand = { [Op.iLike]: `%${brand}%` };
    }

    if (!isNaN(manufacture_year)) {
      where.manufacture_year = manufacture_year;
    }
    if (color) {
      where.color = { [Op.iLike]: `%${color}%` };
    }
    if (passenger_capacity) {
      where.passenger_capacity = { [Op.iLike]: `%${passenger_capacity}%` };
    }
    if (is_available) {
      where.is_available = is_available === "true" ? true : false;
    }

    if (rentalStartDate && rentalEndDate) {
      const unavailableVehicleIds = await VehicleAvailability.findAll({
        attributes: ["vehicle_id"],
        where: {
          [Op.or]: [
            {
              unavailable_start_time: {
                [Op.lte]: rentalEndDate,
              },
              unavailable_end_time: {
                [Op.gte]: rentalStartDate,
              },
            },
          ],
        },
        group: ["vehicle_id"],
        raw: true,
      });

      const excludedVehicleIds = unavailableVehicleIds.map(
        (item) => item.vehicle_id
      );

      if (excludedVehicleIds) {
        where.vehicle_id = {
          [Op.notIn]: excludedVehicleIds,
        };
      }
      cars = await Car.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });
    } else {
      cars = await Car.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });
    }

    const totalPage = Math.ceil(cars.count / limit);

    if (cars.length < 1) throw new ApiError(404, "Data mobil tidak ada..");

    res.status(200).json({
      is_success: true,
      message: "Car Data",
      data: {
        page,
        total_data: cars.length,
        car_data: cars,
        totalPage: totalPage ? totalPage : 0,
      },
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const getMotorcycleId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const motorcycle = await Motorcycle.findByPk(id);

    if (!motorcycle) {
      throw new ApiError(404, "Data motor tidak ditemukan");
    }

    res.status(200).json({
      is_success: true,
      motorcycle_data: motorcycle,
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const getMotorcycleList = async (req, res, next) => {
  try {
    const {
      name,
      brand,
      manufacture_year,
      color,
      transmission_type,
      limit = 5,
      page = 1,
    } = req.query;

    const where = {};

    const offset = (page - 1) * limit;

    const allowedTransmissionsType = ["Automatic", "Manual"];

    if (transmission_type) {
      const fix_enum_tranmission_type =
        transmission_type.charAt(0).toUpperCase() +
        transmission_type.slice(1).toLowerCase();

      if (!allowedTransmissionsType.includes(fix_enum_tranmission_type)) {
        throw new ApiError(
          400,
          "Tipe transmisi harus 'Automatic' atau 'Manual'"
        );
      }

      where.transmission_type = fix_enum_tranmission_type;
    }

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }
    if (brand) {
      where.brand = { [Op.iLike]: `%${brand}%` };
    }
    if (color) {
      where.color = { [Op.iLike]: `%${color}%` };
    }
    if (!manufacture_year(isNaN)) {
      where.manufacture_year = manufacture_year;
    }

    const motorcycle = await Motorcycle.findAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    if (motorcycle.length < 1)
      throw new ApiError(
        404,
        "Tidak dapat mengambil data motor, silahkan coba lagi.."
      );

    res.status(200).json({
      is_success: true,
      message: "Data Motor",
      data: {
        page,
        total_data: motorcycle.length,
        motorcycle_data: motorcycle,
      },
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const getAllVehicle = async (req, res, next) => {
  try {
  } catch (error) {}
};

const createCar = async (req, res, next) => {
  try {
    const {
      license_plate,
      name,
      brand,
      details,
      manufacture_year,
      color,
      transmission_type,
      price_per_day,
      fuel_type,
      condition_description,
      baggage_capacity,
      type,
      passenger_capacity,
    } = req.body;

    const image_url = res.locals.vehicleImgFilename;
    console.log(req.body);
    console.log(image_url);

    await sequelize.transaction(async (t) => {
      const vehicle = await Vehicle.create(
        {
          vehicle_id: uuidv4(),
          vehicle_type: "Car",
          created_at: new Date(),
          updated_at: new Date(),
        },
        { transaction: t }
      );
      await Car.create(
        {
          car_id: uuidv4(),
          vehicle_id: vehicle.vehicle_id,
          license_plate,
          name,
          brand,
          details,
          color,
          transmission_type,
          fuel_type,
          condition_description,
          manufacture_year: parseInt(manufacture_year),
          baggage_capacity: parseInt(baggage_capacity),
          price_per_day: parseInt(price_per_day),
          passenger_capacity: parseInt(passenger_capacity),
          is_available: true,
          type,
          image_url,
          created_at: new Date(),
          updated_at: new Date(),
        },
        { transaction: t }
      );
    });

    res.status(201).json({
      is_success: true,
      message: "Data mobil berhasil dibuat",
      status_code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const createMotorcycle = async (req, res, next) => {
  try {
    const {
      license_plate,
      name,
      brand,
      details,
      manufacture_year,
      color,
      transmission_type,
      price_per_day,
      is_available,
    } = req.body;

    const image_url = res.locals.vehicleImgFilename;

    await sequelize.transaction(async (t) => {
      const vehicle = await Vehicle.create(
        {
          vehicle_id: uuidv4(),
          vehicle_type: "Motorcycle",
          created_at: new Date(),
          updated_at: new Date(),
        },
        { transaction: t }
      );
      await Motorcycle.create(
        {
          motorcycle_id: uuidv4(),
          vehicle_id: vehicle.vehicle_id,
          license_plate,
          name,
          brand,
          details,
          manufacture_year,
          color,
          transmission_type,
          price_per_day,
          is_available,
          image_url,
        },
        { transaction: t }
      );
    });

    res.status(201).json({
      is_success: true,
      message: "Data motor berhasil dibuat!",
      status_code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const updateCar = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { details, price_per_day, is_available, image_url } = req.query;
    let status = {};

    if (details) {
      status.details = details;
    }

    if (price_per_day) {
      status.price_per_day = price_per_day;
    }

    if (is_available) {
      status.is_available = is_available;
    }

    if (image_url) {
      status.image_url = image_url;
    }

    const car = await Car.findByPk(req.params.id);

    if (!car) throw new ApiError(404, "Data mobil tidak ditemukan..");

    await Car.update(status, {
      where: {
        car_id: id,
      },
    });

    res.status(200).json({
      is_success: true,
      message: "Data mobil berhasil di update",
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const countAllVehicles = async (req, res, next) => {
  try {
    const countVehicles = await Vehicle.count({
      group: ["vehicle_type"],
    });

    res.status(200).json({
      is_success: true,
      data: countVehicles,
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const getVehicles = async (req, res, next) => {
  const { limit = 20, page = 1, name, license_plate, vehicle_type } = req.query;
  try {
    const offset = (page - 1) * limit;
    const where = {};

    if (name) {
      where[Op.or] = [
        { "$car_data.name$": { [Op.iLike]: `%${name}%` } },
        { "$motorcycle_data.name$": { [Op.iLike]: `%${name}%` } },
      ];
    }

    if (license_plate) {
      where[Op.or] = [
        { "$car_data.license_plate$": { [Op.iLike]: `%${license_plate}%` } },
        {
          "$motorcycle_data.license_plate$": {
            [Op.iLike]: `%${license_plate}%`,
          },
        },
      ];
    }

    if (vehicle_type) {
      where.vehicle_type = vehicle_type;
    }

    const vehicles = await Vehicle.findAndCountAll({
      limit,
      offset,
      where,
      include: [
        {
          model: Car,
          as: "car_data",
        },
        {
          model: Motorcycle,
          as: "motorcycle_data",
        },
      ],
      distinct: true,
    });

    res.status(200).json({
      is_success: true,
      data: vehicles,
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const getVehicleById = async (req, res, next) => {
  const { vehicle_id } = req.params;
  try {
    const vehicleData = await Vehicle.findByPk(vehicle_id, {
      include: [
        {
          model: Car,
          as: "car_data",
        },
        {
          model: Motorcycle,
          as: "motorcycle_data",
        },
      ],
    });

    if (!vehicleData) {
      throw new ApiError(404, "Tidak dapat menemukan data kendaraan");
    }

    res.status(200).json({
      is_success: true,
      data: vehicleData,
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const getFavouriteVehicles = async (req, res, next) => {
  const limit = 4;
  try {
  } catch (error) {
    next(error);
  }
};

const updateVehicleFeature = async (req, res, next) => {
  const { vehicle_id } = req.params;
  const { updatedFeature } = req.body;

  try {
    const updateFeature = await Car.update(
      {
        features: updatedFeature,
      },
      {
        where: {
          vehicle_id,
        },
      }
    );

    res.status(201).json({
      is_success: true,
      message: "Fitur mobil berhasil di-update",
      status_code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const updateVehicleDetails = async (req, res, next) => {
  const { vehicle_id } = req.params;
  const {
    passenger_capacity,
    transmission_type,
    baggage_capacity,
    fuel_type,
    manufacture_year,
    price_per_day,
    details,
    condition_description,
  } = req.body;
  try {
    const values = {};
    if (passenger_capacity) {
      values.passenger_capacity = passenger_capacity;
    }
    if (transmission_type) {
      values.transmission_type = transmission_type;
    }
    if (baggage_capacity) {
      values.baggage_capacity = baggage_capacity;
    }
    if (fuel_type) {
      values.fuel_type = fuel_type;
    }
    if (manufacture_year) {
      values.manufacture_year = manufacture_year;
    }
    if (price_per_day) {
      values.price_per_day = price_per_day;
    }
    if (details) {
      values.details = details;
    }
    if (condition_description) {
      values.condition_description = condition_description;
    }

    const vehicleType = await Vehicle.findByPk(vehicle_id);

    if (vehicleType.vehicle_type === "Car") {
      const updateDetails = await Car.update(values, {
        where: {
          vehicle_id,
        },
      });

      if (updateDetails === 0) {
        throw new ApiError(401, "Data tidak berhasil di-update");
      }
    } else {
      const updateDetails = await Motorcycle.update(values, {
        where: {
          vehicle_id,
        },
      });
      console.log(updateDetails);
      if (updateDetails === 0) {
        throw new ApiError(401, "Data tidak berhasil di-update");
      }
    }

    res.status(201).json({
      is_success: true,
      message: "Data berhasil di-update",
      status_code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const favouriteVehicle = async (req, res, next) => {
  try {
    const favourite = await Booking.findAll({
      attributes: [
        "vehicle_id",
        [
          sequelize.fn("COUNT", sequelize.col("Booking.vehicle_id")),
          "booking_count",
        ],
      ],
      include: [
        {
          model: Vehicle,
          as: "vehicle_data",
          attributes: ["vehicle_id"],
        },
      ],
      group: ["Booking.vehicle_id", "vehicle_data.vehicle_id"],
      order: [[sequelize.literal("booking_count"), "DESC"]],
      limit: 4,
    });

    const favouriteIds = await favourite.map((item) => item.vehicle_id);

    const vehicleData = await Vehicle.findAll({
      where: {
        vehicle_id: {
          [Op.in]: favouriteIds,
        },
      },
      include: [
        {
          model: Car,
          as: "car_data",
        },
        {
          model: Motorcycle,
          as: "motorcycle_data",
        },
      ],
    });

    res.status(200).json({
      is_success: true,
      data: vehicleData,
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCarList,
  getMotorcycleList,
  createCar,
  createMotorcycle,
  updateCar,
  getCarById,
  getMotorcycleId,
  countAllVehicles,
  getVehicles,
  getVehicleById,
  updateVehicleFeature,
  updateVehicleDetails,
  favouriteVehicle,
};
