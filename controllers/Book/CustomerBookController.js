const ApiError = require("../../lib/ApiError");
const {
  Vehicle,
  Car,
  Motorcycle,
  Booking,
  Payment,
  Review,
} = require("../../models");

// url : /book/customer/user_id
const getCustomerBooks = async (req, res, next) => {
  const { status, limit = 5, page = 1 } = req.query;
  const { user_id } = req.params;
  try {
    const offset = (page - 1) * limit;

    const where = {};

    const allowedStatus = ["Pending", "Paid", "Expired", "Completed", "Active"];

    if (status) {
      const fix_enum_status =
        status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

      if (!allowedStatus.includes(fix_enum_status)) {
        throw new ApiError(
          400,
          "Status harus 'Paid', 'Expired', 'Completed', 'Active' atau 'Pending'!"
        );
      }
      where.status = fix_enum_status;
    }

    if (user_id) {
      where.user_id = user_id;
    }

    const { count, rows } = await Booking.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: Vehicle,
          as: "vehicle_data",
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
        },
        {
          model: Payment,
          as: "payment_data",
        },
        {
          model: Review,
          as: "review_data",
        },
      ],
    });

    const totalPages = Math.ceil(count / limit);

    if (count < 1) {
      throw new ApiError(404, "Data pesanan tidak ada..");
    }

    res.status(200).json({
      is_success: true,
      message: "Data pesanan berhasil di fetch.",
      data: {
        total_data: count,
        books: rows,
        total_pages: totalPages,
      },
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCustomerBooks,
};
