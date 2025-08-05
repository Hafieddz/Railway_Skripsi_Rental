const { Op } = require("sequelize");
const { Booking, Car, sequelize, VehicleAvailability } = require("../models");

const updateBookingAndCars = async (req, res, next) => {
  try {
    const now = new Date();
    let updatedBooking = 0;
    await sequelize.transaction(async (t) => {
      const expiredBookings = await Booking.findAll(
        {
          where: {
            status: "Pending",
            payment_expires_at: { [Op.gte]: now },
          },
        },
        { transaction: t }
      );

      await Promise.all(
        expiredBookings.map(async (v) => {
          const [bookingUpdated] = await Booking.update(
            {
              status: "Expired",
            },
            {
              where: {
                booking_id: v.booking_id,
              },
              transaction: t,
            }
          );

          if (bookingUpdated > 0) {
            updatedBooking += bookingUpdated;
          }

          await Car.update(
            {
              is_available: true,
            },
            {
              where: {
                vehicle_id: v.vehicle_id,
              },
              transaction: t,
            }
          );
        })
      );
    });

    (`Jumlah pesanan yang expired : ${updatedBooking}`);

    res.status(200).json({
      is_success: true,
      message: "Updated",
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const makeAllVehicleAvailable = async (req, res, next) => {
  try {
    const allCars = await Car.update(
      {
        is_available: true,
      },
      {
        where: {
          is_available: false,
        },
      }
    );
    res.status(200).json({
      is_success: true,
      message: "Updated",
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const testingBookQuery = async (req, res, next) => {
  try {
    const { rentalStartDate, rentalEndDate, limit = 20, page = 1 } = req.query;
    let cars;
    const offset = (page - 1) * limit;

    const where = {};

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

    cars = await Car.findAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });

    res.status(200).json({
      message: "Testing Query",
      data: {
        unavailableVehicleIds,
        cars,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateBookingAndCars,
  makeAllVehicleAvailable,
  testingBookQuery,
};
