const { Op } = require("sequelize");
const ApiError = require("../lib/ApiError");
const {
  Payment,
  Booking,
  sequelize,
  Notification,
  User,
} = require("../models");
const { v4: uuidv4 } = require("uuid");

const checkPayment = async (req, res, next) => {
  const { user_id } = req.user;
  const { order_id, status_code, transaction_status } = req.query;
  const bufferAuthorization = Buffer.from(
    process.env.MIDTRANS_SERVER_KEY + ":"
  ).toString("base64");

  console.log(user_id);

  try {
    const response = await fetch(
      `https://api.sandbox.midtrans.com/v2/${order_id}/status`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${bufferAuthorization}`,
        },
      }
    );
    const data = await response.json();

    if (data.status_code === "401") {
      throw new ApiError(401, "Anda tidak memiliki akses");
    }

    if (data.status_code !== "200") {
      throw new ApiError(400, "Terjadi error, pembayaran tidak dapat diproses");
    }

    await sequelize.transaction(async (t) => {
      const paymentData = await Payment.findOne({
        where: {
          transaction_id: order_id,
        },
        include: [
          {
            model: Booking,
            as: "payment_data",
          },
        ],
        transaction: t,
      });

      if (paymentData.status === "Paid") {
        return;
      }

      if (paymentData.user_id !== user_id) {
        throw new ApiError(
          401,
          "Data pembayaran tidak sama dengan user yang login."
        );
      }

      await Payment.update(
        {
          payment_status: "Paid",
        },
        {
          where: {
            transaction_id: order_id,
          },
        },
        { transaction: t }
      );

      await Booking.update(
        {
          status: "Paid",
        },
        {
          where: {
            payment_id: paymentData.payment_id,
          },
        },
        { transaction: t }
      );

      await Notification.create(
        {
          notification_id: uuidv4(),
          user_id,
          payment_id: paymentData.payment_id,
          is_read: false,
          notification_details: `Pesanan anda dengan booking_id : ${paymentData.payment_data.booking_id} telah terbayar. Silahkan tunggu admin menghubungi anda melalui whatsapp untuk informasi selanjutnya.`,
        },
        { transaction: t }
      );

      const adminUsers = await User.findAll(
        {
          where: {
            role: {
              [Op.or]: ["Super Admin", "Admin"],
            },
          },
          attributes: ["user_id"],
        },
        { transaction: t }
      );

      const adminIds = adminUsers.map((item) => item.user_id);

      const createNotifications = adminIds.map((id) => ({
        notification_id: uuidv4(),
        user_id: id,
        payment_id: paymentData.payment_id,
        notification_details: `Terdapat pesanan yang telah berhasil dibayar. Silahkan konfirmasi pesanan ke pelanggan.`,
      }));

      await Notification.bulkCreate(createNotifications, {
        transaction: t,
      });
    });

    res.status(200).json({
      is_success: true,
      message: "Pembayaran berhasil",
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const sendNotificationToAdmin = async (req, res, next) => {
  try {
    await sequelize.transaction(async (t) => {
      const adminUsers = await User.findAll({
        where: {
          role: {
            [Op.or]: ["Super Admin", "Admin"],
          },
        },
        attributes: ["user_id"],
        transaction: t,
      });

      const adminIds = adminUsers.map((item) => item.user_id);

      const createNotifications = adminIds.map((id) => ({
        notification_id: uuidv4(),
        user_id: id,
        notification_details: `Terdapat pesanan yang telah berhasil dibayar. Silahkan konfirmasi pesanan ke pelanggan.`,
      }));

      await Notification.bulkCreate(createNotifications, {
        transaction: t,
      });
    });

    res.status(200).json({
      message: "Notifikasi Dikirimkan",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkPayment,
  sendNotificationToAdmin,
};
