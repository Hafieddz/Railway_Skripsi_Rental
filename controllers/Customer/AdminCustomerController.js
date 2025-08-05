const ApiError = require("../../lib/ApiError");
const { Auth, User, Customer } = require("../../models");

const getCustomers = async (req, res, next) => {
  const { page = 1, limit = 20 } = req.query;
  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await User.findAndCountAll({
      where: {
        role: "Customer",
      },
      include: [
        {
          model: Customer,
          as: "customer",
        },
        {
          model: Auth,
          as: "auths",
        },
      ],
      limit,
      offset,
    });

    const totalPage = Math.ceil(count / limit);

    res.status(200).json({
      is_success: true,
      data: rows,
      totalPage,
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserVerificationStatus = async (req, res, next) => {
  const { type } = req.query;
  const { user_id } = req.params;

  const allowedVerificationStatus = ["Verified", "Pending", "Not Verified"];

  if (!allowedVerificationStatus.includes(type)) {
    throw new ApiError(401, "Format status salah!");
  }

  const customer = await Customer.findOne({
    where: {
      user_id,
    },
  });

  if (customer.phone_number === null && customer.address === null) {
    throw new ApiError(401, "Customer belum memasukkan nomor hp dan alamat!");
  }

  try {
    await Customer.update(
      {
        verification_status: type,
      },
      {
        where: {
          user_id,
        },
      }
    );

    res.status(201).json({
      is_success: true,
      message: "Data status berhasil di-update",
      status_code: 201,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCustomers,
  updateUserVerificationStatus,
};
