const ApiError = require("../lib/ApiError");
const {
  Vehicle,
  Car,
  Motorcycle,
  Booking,
  Notification,
  sequelize,
} = require("../models");

const getNotifications = async (req, res, next) => {
  const { user_id } = req.user;
  const { limit = 5 } = req.query;
  try {
    const notifications = await Notification.findAll({
      where: {
        user_id,
      },
      limit: parseInt(limit),
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

module.exports = {
  getNotifications,
  updateNotifications,
};
