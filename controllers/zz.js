// controllers/bookingController.js (revisi bagian createBooking)
// ... (imports dan fungsi calculateTotalPrice)

exports.createBooking = async (req, res) => {
  const { vehicle_id, booking_date, return_date } = req.body;
  const user_id = req.user.user_id;

  try {
    const startDate = new Date(booking_date);
    const endDate = new Date(return_date);
    endDate.setHours(23, 59, 59, 999);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (startDate >= endDate || startDate < now) {
      return res
        .status(400)
        .json({ message: "Tanggal pemesanan tidak valid." });
    }

    // --- Cek Ketersediaan Kendaraan dengan Mempertimbangkan Booking Pending ---
    // Ini adalah bagian KRITIS.
    // Anda perlu memastikan bahwa kendaraan tidak hanya tidak memiliki booking "aktif/confirmed",
    // tetapi juga tidak memiliki booking "pending_payment" yang masih valid (belum kedaluwarsa).
    const existingBookings = await Booking.findAll({
      where: {
        vehicle_id,
        status: {
          [Op.in]: ["pending_payment", "confirmed", "active"], // Cek juga yang pending_payment
        },
        // Logic ini perlu disesuaikan untuk menangani kasus pending_payment:
        // Hanya booking pending_payment yang belum expired yang dianggap "mengunci" kendaraan.
        // Booking pending_payment yang sudah expired akan dianggap "terbuka" untuk booking baru.
        [Op.and]: [
          {
            [Op.or]: [
              { booking_date: { [Op.between]: [startDate, endDate] } },
              { return_date: { [Op.between]: [startDate, endDate] } },
              {
                booking_date: { [Op.lte]: startDate },
                return_date: { [Op.gte]: endDate },
              },
            ],
          },
          {
            // Tambahan kondisi untuk status pending_payment
            [Op.or]: [
              { status: { [Op.in]: ["confirmed", "active"] } }, // Selalu kunci untuk status ini
              {
                status: "pending_payment",
                payment_expires_at: { [Op.gt]: new Date() }, // Hanya kunci jika belum expired
              },
            ],
          },
        ],
      },
    });

    if (existingBookings.length > 0) {
      return res
        .status(409)
        .json({
          message: "Kendaraan tidak tersedia untuk tanggal yang dipilih.",
        });
    }

    const vehicle = await Vehicle.findByPk(vehicle_id);
    if (!vehicle) {
      return res.status(404).json({ message: "Kendaraan tidak ditemukan." });
    }

    let vehicleDetails;
    if (vehicle.vehicle_type === "car") {
      vehicleDetails = await Car.findOne({
        where: { vehicle_id: vehicle.vehicle_id },
      });
    } else if (vehicle.vehicle_type === "motorcycle") {
      vehicleDetails = await Motorcycle.findOne({
        where: { vehicle_id: vehicle.vehicle_id },
      });
    }

    if (!vehicleDetails || !vehicleDetails.price_per_day) {
      return res
        .status(500)
        .json({ message: "Tidak dapat menentukan harga kendaraan." });
    }

    const total_price = calculateTotalPrice(
      vehicleDetails.price_per_day,
      startDate,
      endDate
    );

    // --- Hitung waktu kedaluwarsa pembayaran ---
    const paymentExpiresAt = new Date(new Date().getTime() + 30 * 60 * 1000); // 30 menit dari sekarang

    // Buat Booking
    const booking = await Booking.create({
      user_id,
      vehicle_id,
      booking_date: startDate,
      return_date: endDate,
      total_price,
      status: "pending_payment",
      payment_id: null,
      return_id: null,
      payment_expires_at: paymentExpiresAt, // <-- SIMPAN WAKTU KEDALUWARSA
    });

    // Buat Notifikasi
    await Notification.create({
      user_id,
      booking_id: booking.booking_id,
      notification_details: `Pemesanan Anda untuk ${vehicleDetails.name} telah dibuat. Harap selesaikan pembayaran dalam 30 menit. Total: ${total_price}.`,
      is_read: false,
    });

    res.status(201).json({
      message: "Pemesanan berhasil dibuat, menunggu pembayaran.",
      booking_id: booking.booking_id,
      user_id: booking.user_id,
      vehicle_id: booking.vehicle_id,
      booking_date: booking.booking_date.toISOString(),
      return_date: booking.return_date.toISOString(),
      total_price: booking.total_price,
      status: booking.status,
      created_at: booking.created_at.toISOString(),
      payment_expires_at: booking.payment_expires_at.toISOString(), // <-- KIRIM KE FRONTEND
    });
  } catch (error) {
    console.error("Kesalahan saat membuat pemesanan:", error);
    res.status(500).json({ message: "Kesalahan server", error: error.message });
  }
};
