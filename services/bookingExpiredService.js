const { Op } = require("sequelize");
const { Booking, sequelize, Car, Notification } = require("../models");
const { v4: uuidv4 } = require("uuid");
const booking = require("../models/booking");

const updateExpiredBookings = async () => {
  const now = new Date();
  console.log(now);

  let updatedBookingCount = 0;

  console.log(`\x1b[33mCheck Expired Bookings...\x1b[0m`);

  try {
    await sequelize.transaction(async (t) => {
      const expiredBookings = await Booking.findAll(
        {
          where: {
            status: "Pending",
            payment_expires_at: { [Op.lte]: now },
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
            updatedBookingCount += bookingUpdated;

            await Notification.create(
              {
                notification_id: uuidv4(),
                booking_id: v.booking_id,
                user_id: v.user_id,
                notification_details: `Pesanan anda dengan booking_id : ${v.booking_id} telah keladuwarsa.`,
              },
              { transaction: t }
            );
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

    console.log(`\x1b[33mCheck Expired Bookings Completed.\x1b[0m`);

    return updatedBookingCount;
  } catch (error) {
    console.log(
      `\x1b[31mError When Updating / Checking Expired Booking.\x1b[0m`
    );
    console.log(`\x1b[31mError : ${error}\x1b[0m`);
  }
};

const notifyUserBeforeExpired = async () => {
  const now = new Date();
  const fiveMinutes = new Date(now.getTime() + 5 * 60 * 1000);
  let userNotified = 0;

  console.log(`\x1b[33mCheck Booking That Almost Expire...\x1b[0m`);

  try {
    await sequelize.transaction(async (t) => {
      const almostExpireBookings = await Booking.findAll(
        {
          where: {
            status: "Pending",
            is_payment_almost_expired_notified: false,
            payment_expires_at: {
              [Op.gt]: now,
              [Op.lte]: fiveMinutes,
            },
          },
        },
        { transaction: t }
      );

      await Promise.all(
        almostExpireBookings.map(async (v) => {
          const createNotification = await Notification.create(
            {
              notification_id: uuidv4(),
              booking_id: v.booking_id,
              user_id: v.user_id,
              notification_details: `Pesanan anda dengan booking_id : ${v.booking_id} akan kedaluwarsa dalam 5 menit, silahkan selesaikan pembayaran untuk menyelesaikan pesanan anda.`,
            },
            { transaction: t }
          );

          await Booking.update(
            {
              is_payment_almost_expired_notified: true,
            },
            {
              where: {
                booking_id: v.booking_id,
              },
              transaction: t,
            }
          );
          userNotified++;
        })
      );
    });

    console.log(`\x1b[33mCheck Bookings That Almost Expire Completed.\x1b[0m`);

    return userNotified;
  } catch (error) {
    console.log(`\x1b[31mError When Notify / Checking User .\x1b[0m`);
    console.log(`\x1b[31mError : ${error}\x1b[0m`);
  }
};

module.exports = { updateExpiredBookings, notifyUserBeforeExpired };
