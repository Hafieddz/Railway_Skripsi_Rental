const { Op } = require("sequelize");
const { Booking, Sequelize, ReturnRecord } = require("../../models");

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

    (dateFilter);

    const revenueData = await Booking.findAll({
      attributes: [
        [
          Sequelize.fn(
            "DATE_TRUNC",
            dateFormat,
            Sequelize.col("Booking.booking_date")
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
          [Op.in]: ["Paid", "Completed", "Active"],
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
        total_data: revenueData.length,
        revenueData,
        groupBy: groupBy,
      },
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const getThisMonthRevenue = async (req, res, next) => {
  try {
    const date = new Date();
    const firstDayThisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayNextMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      1
    );

    const dateFilter = {};

    dateFilter.created_at = {
      [Op.between]: [firstDayThisMonth, firstDayNextMonth],
    };

    const thisMonthRevenue = await Booking.findAll({
      attributes: [
        [
          Sequelize.fn(
            "DATE_TRUNC",
            "month",
            Sequelize.col("Booking.booking_date")
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
          [Op.in]: ["Paid", "Active", "Completed"],
        },
        ...dateFilter,
      },
      group: ["period"],
      order: [[Sequelize.col("period"), "ASC"]],
      raw: true,
    });

    res.status(200).json({
      is_success: true,
      data: {
        revenue: thisMonthRevenue[0].totalRevenue,
      },
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRevenue,
  getThisMonthRevenue,
};
