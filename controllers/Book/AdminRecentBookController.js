const {
  Booking,
  Vehicle,
  Car,
  Motorcycle,
  Payment,
  User,
  Customer,
  Auth,
  ReturnRecord,
} = require("../../models");

const getRecentBooks = async (req, res, next) => {
  const { limit = 5, page = 1, orderTarget, orderBy } = req.query;
  const where = {};
  const offset = (page - 1) * limit;
  let order = [["created_at", "DESC"]];

  if (orderTarget) {
    if (orderTarget === "customer") {
      order = [["user", "customer", "firstname", `${orderBy}`]];
    }
    if (orderTarget === "status") {
      order = [["status", `${orderBy}`]];
    }
    if (orderTarget === "name") {
      order = [[literal('COALESCE("vehicle_data"."name")'), `${orderBy}`]];
    }
    if (orderTarget === "type") {
      order = [["vehicle_data", "vehicle_type", `${orderBy}`]];
    }
    if (orderTarget === "total_price") {
      order = [["total_price", `${orderBy}`]];
    }
    if (orderTarget === "booking_date") {
      order = [["booking_date", `${orderBy}`]];
    }
    if (orderTarget === "return_date") {
      order = [["return_data", "return_date", `${orderBy}`]];
    }
  }

  try {
    const recentBooks = await Booking.findAndCountAll({
      where,
      attributes: [
        "status",
        "booking_id",
        "total_price",
        "booking_date",
        "rental_duration",
        "return_date",
        "created_at",
      ],
      offset,
      limit,
      include: [
        {
          model: Vehicle,
          as: "vehicle_data",
          attributes: [
            "vehicle_type",
            "vehicle_id",
            "name",
            "image_url",
            "license_plate",
            "price_per_day",
          ],
          include: [
            {
              model: Car,
              as: "car_data",
              attributes: ["car_id"],
            },
            {
              model: Motorcycle,
              as: "motorcycle_data",
              attributes: ["motorcycle_id"],
            },
          ],
        },
        {
          model: Payment,
          as: "payment_data",
        },
        {
          model: User,
          as: "user",
          attributes: ["user_id", "image_url", "firstname", "lastname"],
          include: [
            {
              model: Customer,
              as: "customer",
              attributes: ["customer_id"],
            },
            {
              model: Auth,
              as: "auths",
              attributes: ["email"],
            },
          ],
        },
        {
          model: ReturnRecord,
          as: "return_data",
          attributes: ["return_id", "return_date", "late_fee", "late_days"],
        },
      ],
      order,
    });

    (recentBooks);

    const totalPage = Math.ceil(recentBooks.count / limit);

    res.status(200).json({
      is_success: true,
      data: recentBooks,
      totalPage,
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecentBooks,
};
