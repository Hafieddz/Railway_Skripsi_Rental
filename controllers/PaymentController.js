const ApiError = require("../lib/ApiError");
const { Payment, Booking, sequelize } = require("../models");

const checkPayment = async (req, res, next) => {
  const { order_id, status_code, transaction_status } = req.query;
  const bufferAuthorization = Buffer.from(
    process.env.MIDTRANS_SERVER_KEY + ":"
  ).toString("base64");

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
      const paymentData = await Payment.findOne(
        {
          where: {
            transaction_id: order_id,
          },
        },
        { transaction: t }
      );

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

module.exports = {
  checkPayment,
};
