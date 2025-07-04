const { v4: uuidv4 } = require("uuid");
const calculateEndDate = require("../utils/calculateEndDate");
const {
  Vehicle,
  Car,
  Motorcycle,
  Booking,
  Notification,
  sequelize,
  VehicleAvailability,
  Payment,
} = require("../models");
const ApiError = require("../lib/ApiError");
const { where, Op } = require("sequelize");
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
  const { rental_start_date, rental_end_date, vehicle_id, total_price } =
    req.body;

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

    if (vehicle.vehicle_type === "Car") {
      vehicle_data = await Car.findOne({
        where: {
          vehicle_id: vehicle.vehicle_id,
        },
      });
    } else if (vehicle.vehicle_type === "Motorcycle") {
      vehicle_data = await Motorcycle.findOne({
        where: {
          vehicle_id: vehicle.vehicle_id,
        },
      });
    }

    if (!vehicle_data || !vehicle_data.is_available) {
      throw new ApiError(400, "Kendaraan tidak dapat di booking.");
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
          name: vehicle_data.name,
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
    const createBooking = await sequelize.transaction(async (t) => {
      const updateVehicle = await vehicle_data.update(
        { is_available: false, updated_at: new Date() },
        { transaction: t }
      );

      await Payment.create(
        {
          payment_id,
          user_id,
          booking_id,
          payment_method: "Transfer",
          payment_status: "Pending",
          payment_token: midtrans_token,
          payment_date: new Date(),
          total_price,
          transaction_id: booking_id,
        },
        { transaction: t }
      );

      const booking = await Booking.create(
        {
          booking_id,
          user_id,
          payment_id,
          vehicle_id,
          booking_date: rental_start_date,
          return_date: rental_end_date,
          status: "Pending",
          total_price,
          payment_expires_at,
        },
        { transaction: t }
      );

      const vehicleAvailability = await VehicleAvailability.create({
        vehicle_availability_id,
        vehicle_id,
        unavailable_start_time: rental_start_date,
        unavailable_end_time: rental_end_date,
        status: "Booked",
        created_at: now,
        updated_at: now,
      });

      const notification = await Notification.create(
        {
          notification_id: uuidv4(),
          booking_id,
          user_id,
          notification_details: `Anda telah memesan kendaraan ${vehicle_data.name} dengan total ${total_price}. Silahkan proses pembayaran sebelum 30 Menit agar pesanan anda tidak kami batalakan.`,
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
  try {
    const targetBook = await Booking.findByPk(id);

    if (!targetBook) {
      throw new ApiError(404, "Data pesanan tidak ditemukan");
    }

    if (
      updateStatus === "Pending" ||
      updateStatus === "Paid" ||
      updateStatus === "Expired" ||
      updateStatus === "Active" ||
      updateStatus === "Completed"
    ) {
      const updatedBook = await Booking.update(
        {
          status: updateStatus,
        },
        {
          where: {
            booking_id: id,
          },
        }
      );
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

    console.log(status);

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

    const books = await Booking.findAll({
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
      ],
    });

    if (books.length < 1) {
      throw new ApiError(404, "Data pesanan tidak ada..");
    }

    res.status(200).json({
      is_success: true,
      message: "Data pesanan berhasil di fetch.",
      data: {
        total_data: books.length,
        books,
      },
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
};
