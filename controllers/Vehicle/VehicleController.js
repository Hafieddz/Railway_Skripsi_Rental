const { Op } = require("sequelize");
const {
  Vehicle,
  Car,
  Motorcycle,
  Booking,
  Review,
  User,
  Customer,
  sequelize,
} = require("../../models");

// url : /vehicle/car/:vehicle_id
const getCarById = async (req, res, next) => {
  try {
    const { vehicle_id } = req.params;

    const car = await Vehicle.findOne({
      where: {
        vehicle_id,
      },
      include: [
        {
          model: Car,
          as: "car_data",
          attributes: {
            exclude: ["created_at", "updated_at"],
          },
        },
      ],
    });

    if (!car) {
      throw new ApiError(404, "Data mobil tidak ditemukan");
    }

    const getBookingIds = await Booking.findAll({
      where: {
        vehicle_id,
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

    (getReview);

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

// url : /vehicle/motorcycle/:vehicle_id
const getMotorcycleById = async (req, res, next) => {
  try {
    const { vehicle_id } = req.params;

    const motorcycle = await Vehicle.findOne({
      where: {
        vehicle_id,
      },
      include: [
        {
          model: Motorcycle,
          as: "motorcycle_data",
          attributes: {
            exclude: ["created_at", "updated_at"],
          },
        },
      ],
    });

    if (!motorcycle) {
      throw new ApiError(404, "Data motor tidak ditemukan");
    }

    const getBookingIds = await Booking.findAll({
      where: {
        vehicle_id,
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

    res.status(200).json({
      is_success: true,
      motorcycle_data: motorcycle,
      review_data: getReview,
      status_code: 200,
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
  getCarById,
  getMotorcycleById,
  favouriteVehicle,
};
