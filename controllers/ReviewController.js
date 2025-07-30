const { v4: uuidv4 } = require("uuid");
const { Review, Booking, User, Customer } = require("../models");
const ApiError = require("../lib/ApiError");

const createReview = async (req, res, next) => {
  const { rating, review } = req.body;
  const { booking_id } = req.params;
  const { user_id } = req.user;

  try {
    const review_id = uuidv4();
    const createReview = await Review.create({
      review_id,
      user_id,
      booking_id,
      comment: review,
      rating,
    });

    res.status(201).json({
      is_success: true,
      message: "Review berhasil dibuat!",
      status_code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const getReviewByVehicleId = async (req, res, next) => {
  const { vehicle_id } = req.params;

  try {
    const reviews = await Review.findAll({
      order: [["created_at", "DESC"]],
      include: [
        {
          model: Booking,
          as: "book_data",
          attributes: [],
          required: true,
          where: {
            vehicle_id,
          },
        },
        {
          model: User,
          as: "user_data",
          attributes: ["image_url", "user_id"],
          include: [
            {
              model: Customer,
              as: "customer",
              attributes: ["firstname", "lastname"],
            },
          ],
        },
      ],
    });

    if (reviews.length === 0) {
      throw new ApiError(404, "Tidak ada data review!");
    }

    res.status(200).json({
      is_success: true,
      data: reviews,
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.findAll();

    if (reviews.length === 0) {
      throw new ApiError(404, "Tidak ada data review!");
    }

    res.status(200).json({
      is_success: true,
      data: reviews,
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getReviewByVehicleId,
  getReviews,
};
