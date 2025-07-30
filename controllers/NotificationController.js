const ApiError = require("../lib/ApiError");
const {
  Vehicle,
  Car,
  Motorcycle,
  Booking,
  Notification,
  sequelize,
  User,
} = require("../models");
const { v4: uuidv4 } = require("uuid");

const getNotifications = async (req, res, next) => {
  const { user_id } = req.user;
  const { limit = 10 } = req.query;
  try {
    const notifications = await Notification.findAll({
      where: {
        user_id,
      },
      limit: parseInt(limit),
      order: [["created_at", "DESC"]],
    });

    if (notifications.length < 1) {
      return res.status(200).json({
        is_success: true,
        message: "Anda tidak memiliki notifikasi.",
        status_code: 200,
      });
    }

    res.status(200).json({
      is_success: true,
      message: "Data notifikasi ready.",
      notifications_data: notifications,
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const updateNotifications = async (req, res, next) => {
  const { user_id } = req.user;
  const { id } = req.params;

  try {
    await Notification.update(
      { is_read: true },
      {
        where: {
          notification_id: id,
        },
      }
    );
  } catch (error) {
    next(error);
  }
};

const notifyUser = async (req, res, next) => {
  const { user_id } = req.params;
  const { booking_id, vehicle_name } = req.body;
  try {
    const notification_id = uuidv4();
    const notification_details = `Pesanan anda dengan kendaraan ${vehicle_name} akan segera berakhir. Mohon pastikan kendaraan dikembalikan tepat waktu untuk menghindari biaya keterlambatan.`;
    const notify = await Notification.create({
      notification_id,
      booking_id,
      user_id,
      is_read: false,
      notification_details,
    });

    res.status(201).json({
      is_success: true,
      message: "Notifikasi berhasil dikirim ke customer",
      status_code: 201,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  updateNotifications,
  notifyUser,
};
