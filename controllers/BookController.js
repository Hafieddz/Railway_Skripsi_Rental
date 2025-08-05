const { v4: uuidv4 } = require("uuid");
const calculateEndDate = require("../utils/calculateEndDate");
const {
  Vehicle,
  Car,
  Motorcycle,
  Booking,
  Notification,
  sequelize,
  User,
  VehicleAvailability,
  Payment,
  Customer,
  Auth,
  ReturnRecord,
  Review,
} = require("../models");
const ApiError = require("../lib/ApiError");
const { where, Op, Model, literal } = require("sequelize");
const snap = require("../config/snap");

const getBookById = async (req, res, next) => {
  const { id } = req.params;
  const { user_id } = req.user;
  try {
    const book = await Booking.findByPk(id);

    if (book.user_id !== user_id) {
      throw new Error(403, "Anda tidak memiliki akses pada pesanan ini!");
    }

    if (!book) {
      throw new Error(404, "Pesanan tidak ditemukan.");
    }

    res.status(200).json({
      is_success: true,
      message: "Data pesanan ready.",
      book_data: book,
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const createBook = async (req, res, next) => {
  const { user_id } = req.user;
  const {
    rental_start_date,
    rental_end_date,
    vehicle_id,
    total_price,
    rental_duration,
  } = req.body;

  try {
    const booking_id = uuidv4();
    const payment_id = uuidv4();
    const vehicle_availability_id = uuidv4();
    const now = new Date();
    const payment_expires_at = new Date(now.getTime() + 30 * 60 * 1000);
    let vehicle_data;
    let midtrans_token;
    let midtrans_redirect_url;

    const vehicle = await Vehicle.findByPk(vehicle_id);

    if (!vehicle) {
      throw new ApiError(404, "Kendaraan tidak ditemukan.");
    }

    let parameter = {
      transaction_details: {
        order_id: booking_id,
        gross_amount: total_price,
      },
      item_details: [
        {
          id: vehicle_id,
          price: total_price,
          quantity: 1,
          name: vehicle.name,
        },
      ],
      customer_details: {
        first_name: "Hafiedz",
        last_name: "Hasmy Hamid",
        email: "hasmy41@gmail.com",
      },
      callbacks: {
        finish: `http://localhost:5173/`,
        error: "http://localhost:5173/",
        pending: "http://localhost:5173/",
        unfinish: "http://localhost:5173/",
      },
      expiry: {
        unit: "minute",
        duration: 30,
      },
    };

    try {
      const midtrans_transaction = await snap.createTransaction(parameter);

      midtrans_token = midtrans_transaction.token;
      midtrans_redirect_url = midtrans_transaction.redirect_url;
    } catch (midtransError) {
      console.error(midtransError);
      throw new ApiError(500, "Gagal memproses transaksi pembayaran");
    }
    await sequelize.transaction(async (t) => {
      await Booking.create(
        {
          booking_id,
          user_id,
          vehicle_id,
          booking_date: rental_start_date,
          return_date: rental_end_date,
          status: "Pending",
          total_price,
          payment_expires_at,
          rental_duration,
        },
        { transaction: t }
      );
      
      await Payment.create(
        {
          payment_id,
          user_id,
          booking_id,
          payment_status: "Pending",
          payment_token: midtrans_token,
          payment_date: new Date(),
          total_price,
        },
        { transaction: t }
      );

      await Notification.create(
        {
          notification_id: uuidv4(),
          booking_id,
          user_id,
          notification_details: `Anda telah memesan kendaraan ${vehicle.name} dengan total ${total_price}. Silahkan proses pembayaran sebelum 30 Menit agar pesanan anda tidak kami batalakan.`,
        },
        { transaction: t }
      );
    });

    res.status(200).json({
      is_success: true,
      message: "Kendaraan Berhasil Di Booking",
      data: {
        midtrans_token,
        midtrans_redirect_url,
      },
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

// Update Status Booking (Failed, Completed, Etc !- BERDASARKAN QUERY ?updateStatus=${status} -!)
const updateBookId = async (req, res, next) => {
  const { id } = req.params;
  const { updateStatus } = req.query;

  const { returnDate, lateFee, lateDays } = req.body;
  try {
    const targetBook = await Booking.findByPk(id);

    if (!targetBook) {
      throw new ApiError(404, "Data pesanan tidak ditemukan");
    }

    if (updateStatus === "Completed") {
      const returnRecordId = uuidv4();
      await sequelize.transaction(async (t) => {
        await ReturnRecord.create(
          {
            return_id: returnRecordId,
            return_date: returnDate,
            late_days: 0,
            late_fee: 0,
          },
          { transaction: t }
        );
        await Booking.update(
          {
            status: "Completed",
            return_id: returnRecordId,
            updated_at: new Date(),
          },
          {
            where: {
              booking_id: id,
            },
          },
          { transaction: t }
        );
      });
    } else if (updateStatus === "Late") {
      const returnRecordId = uuidv4();
      await sequelize.transaction(async (t) => {
        await ReturnRecord.create(
          {
            return_id: returnRecordId,
            return_date: returnDate,
            late_days: lateDays,
            late_fee: lateFee,
          },
          { transaction: t }
        );
        await Booking.update(
          {
            status: "Completed",
            return_id: returnRecordId,
            updated_at: new Date(),
          },
          {
            where: {
              booking_id: id,
            },
          },
          { transaction: t }
        );
      });
    } else if (
      updateStatus === "Pending" ||
      updateStatus === "Paid" ||
      updateStatus === "Expired" ||
      updateStatus === "Active"
    ) {
      await Booking.update(
        {
          status: updateStatus,
          updated_at: new Date(),
        },
        {
          where: {
            booking_id: id,
          },
        }
      );
    } else {
      throw new ApiError(401, "Jenis status tidak diterima!");
    }

    res.status(201).json({
      is_success: true,
      message: "Pesanan berhasil di update",
      status_code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const getBooks = async (req, res, next) => {
  const { status, limit = 5, page = 1 } = req.query;
  const { user_id, role } = req.user;
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

    if (role === "Customer") {
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

// For Admin (Dashboard)

const getBookStatus = async (req, res, next) => {
  try {
    const bookStatus = await Booking.findAll({
      attributes: [
        "status",
        [sequelize.fn("COUNT", sequelize.col("status")), "total"],
      ],
      group: ["status"],
    });

    res.status(200).json({
      is_success: true,
      data: bookStatus,
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

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
      order = [
        [
          literal(
            'COALESCE("vehicle_data->car_data"."name", "vehicle_data->motorcycle_data"."name")'
          ),
          `${orderBy}`,
        ],
      ];
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
          attributes: ["vehicle_type", "vehicle_id"],
          include: [
            {
              model: Car,
              as: "car_data",
              attributes: [
                "name",
                "image_url",
                "car_id",
                "license_plate",
                "price_per_day",
              ],
            },
            {
              model: Motorcycle,
              as: "motorcycle_data",
              attributes: [
                "name",
                "image_url",
                "motorcycle_id",
                "license_plate",
                "price_per_day",
              ],
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
          attributes: ["user_id", "image_url"],
          include: [
            {
              model: Customer,
              as: "customer",
              attributes: ["firstname", "lastname"],
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
  createBook,
  getBookById,
  updateBookId,
  getBooks,
  getBookStatus,
  getRecentBooks,
};
