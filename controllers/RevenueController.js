const { Op } = require("sequelize");
const { Payment, ReturnRecord, Booking, Sequelize } = require("../models");

const getRevenue = async (req, res, next) => {
  try {
    const { groupBy = "daily", startDate, endDate } = req.query;

    let dateFormat;

    switch (groupBy) {
      case "monthly":
        dateFormat = "month";
        break;
      case "yearly":
        dateFormat = "year";
        break;
      default:
        dateFormat = "day";
    }

    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.created_at = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    const revenueData = await Booking.findAll({
      attributes: [
        [
          Sequelize.fn(
            "DATE_TRUNC",
            dateFormat,
            Sequelize.col("Booking.created_at")
          ),
          "period",
        ],
        [
          Sequelize.literal(
            `SUM("Booking"."total_price" + COALESCE("return_data"."late_fee", 0))`
          ),
          "totalRevenue",
        ],
      ],
      include: [
        {
          model: ReturnRecord,
          as: "return_data",
          attributes: [],
        },
      ],
      where: {
        status: {
          [Op.in]: ["Paid", "Completed"],
        },
        ...dateFilter,
      },
      group: ["period"],
      order: [[Sequelize.col("period"), "ASC"]],
      raw: true,
    });

    res.status(200).json({
      is_success: true,
      message: "Data pendapatan berhasil di fetch",
      data: {
        revenueData,
        groupBy: groupBy,
      },
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRevenue,
};
