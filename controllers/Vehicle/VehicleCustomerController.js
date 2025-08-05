const { Op, Model } = require("sequelize");
const { Vehicle, Car, Motorcycle, Booking } = require("../../models");

const getRentalMotorcycleList = async (req, res, next) => {
  try {
    const {
      name,
      brand,
      manufacture_year,
      color,
      transmission_type,
      limit = 5,
      page = 1,
      rentalStartDate,
      rentalEndDate,
    } = req.query;

    const offset = (page - 1) * limit;

    const where = {};

    const motorcycleWhere = {};

    const allowedTransmissions = ["Automatic", "Manual"];

    // Filter Khusus Vehicles
    where.vehicle_type = "Motorcycle";
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

    // Filter Khusus Cars
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

    const unavailableVehicleIds = await Booking.findAll({
      attributes: ["vehicle_id"],
      where: {
        [Op.or]: [
          {
            booking_date: {
              [Op.lte]: rentalEndDate,
            },
            return_date: {
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

    const motorcycles = await Vehicle.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: Motorcycle,
          as: "motorcycle_data",
          where: motorcycleWhere,
          attributes: {
            exclude: ["created_at", "updated_at"],
          },
          required: true,
        },
      ],
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });

    const totalPage = Math.ceil(motorcycles.count / limit);

    if (motorcycles.length < 1)
      throw new ApiError(404, "Data motor tidak ada..");

    res.status(200).json({
      is_success: true,
      message: "Motorcycles Data",
      data: {
        page,
        total_data: motorcycles.length,
        motorcycle_data: motorcycles,
        totalPage: totalPage ? totalPage : 0,
      },
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const getRentalCarList = async (req, res, next) => {
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
    } = req.query;

    const offset = (page - 1) * limit;

    const where = {};

    const carWhere = {};

    const allowedTransmissions = ["Automatic", "Manual"];
    const allowedType = ["Sedan", "MPV", "SUV"];

    // Filter Khusus Vehicles
    where.vehicle_type = "Car";
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

    // Filter Khusus Cars
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
    if (allowedType.includes(type)) {
      carWhere.type = type;
    }
    if (passenger_capacity) {
      carWhere.passenger_capacity = { [Op.iLike]: `%${passenger_capacity}%` };
    }

    const unavailableVehicleIds = await Booking.findAll({
      attributes: ["vehicle_id"],
      where: {
        [Op.or]: [
          {
            booking_date: {
              [Op.lte]: rentalEndDate,
            },
            return_date: {
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

    (carWhere);

    const cars = await Vehicle.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: Car,
          as: "car_data",
          where: carWhere,
          attributes: {
            exclude: ["created_at", "updated_at"],
          },
          required: true,
        },
      ],
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });

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

module.exports = {
  getRentalCarList,
  getRentalMotorcycleList,
};
