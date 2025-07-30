const { where } = require("sequelize");
const { User, Customer, Auth, Booking } = require("../models");
const ApiError = require("../lib/ApiError");
const bcrypt = require("bcrypt");

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
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
    });

    res.status(200).json({
      is_success: true,
      message: "Data user berhasil di fetch",
      data: user,
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserImage = async (req, res, next) => {
  const { user_id } = req.user;
  try {
    const updatedUser = await User.update(
      {
        image_url: res.locals.userImgFilename,
      },
      {
        where: {
          user_id,
        },
      }
    );

    res.status(200).json({
      is_success: true,
      message: "Foto Profil berhasil di update",
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserData = async (req, res, next) => {
  const { user_id } = req.user;
  const { firstname, lastname, gender, address } = req.query;
  const updatedData = {};

  try {
    const customer = await Customer.findOne({
      where: {
        user_id,
      },
    });

    if (firstname) {
      updatedData.firstname = firstname;
    }
    if (lastname) {
      updatedData.lastname = lastname;
    }
    if (gender) {
      updatedData.gender = gender;
    }
    if (address !== "NO_ADDRESS") {
      updatedData.address = address;
    }

    const updateCustomer = await Customer.update(updatedData, {
      where: {
        user_id,
      },
    });

    res.status(201).json({
      is_success: true,
      message: "Data berhasil diupdate",
      status_code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const addPhoneNumber = async (req, res, next) => {
  try {
    const { phone_number } = req.body;
    const { user_id } = req.user;

    const customer = await Customer.findOne({
      where: {
        user_id,
      },
    });

    const formattedPhoneNumber = `+62${phone_number}`;

    const checkDuplicatePhoneNumber = await Customer.findAll({
      where: {
        phone_number: formattedPhoneNumber,
      },
    });

    console.log(checkDuplicatePhoneNumber);

    if (checkDuplicatePhoneNumber.length > 0) {
      throw new ApiError(
        401,
        "Nomor sudah digunakan, silahkan gunakan nomor lain..."
      );
    }

    if (customer.phone_number === null) {
      const updatedCustomer = await Customer.update(
        {
          phone_number: formattedPhoneNumber,
        },
        {
          where: {
            user_id,
          },
        }
      );
    } else {
      throw new ApiError(400, "Anda sudah mempunyai nomor hp!");
    }

    res.status(200).json({
      is_success: true,
      message: "Berhasil menambahkan nomor hp",
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const addAddress = async (req, res, next) => {
  const { user_id } = req.user;
  const { address } = req.body;

  try {
    const updateAddress = await Customer.update(
      {
        address,
      },
      {
        where: {
          user_id,
        },
      }
    );

    res.status(201).json({
      is_success: true,
      message: "Berhasil menambahkan data alamat",
      status_code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const checkPassword = async (req, res, next) => {
  const { auth_id } = req.user;
  const { password } = req.body;

  try {
    const auth = await Auth.findByPk(auth_id);

    const checkPassword = bcrypt.compareSync(password, auth.password);

    if (!checkPassword) {
      throw new ApiError(401, "Password anda salah");
    }

    res.status(200).json({
      is_success: true,
      message: "Password benar",
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  const { auth_id } = req.user;
  const { oldPassword, inputPassword, inputConfirmPassword } = req.body;

  try {
    if (oldPassword === inputPassword) {
      throw new ApiError(
        400,
        "Password tidak boleh sama dengan password sebelumnya"
      );
    }

    if (inputPassword !== inputConfirmPassword) {
      throw new ApiError(
        401,
        "Password baru dan konfirmasi password harus sama!"
      );
    }

    const hashedNewPassword = await bcrypt.hash(inputPassword, 10);

    const updateAuth = await Auth.update(
      {
        password: hashedNewPassword,
      },
      {
        where: {
          auth_id,
        },
      }
    );

    res.status(201).json({
      is_success: true,
      message: "Ganti password berhasil!",
      status_code: 201,
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

  console.log(customer);

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

const getCustomerBooks = async (req, res, next) => {
  const { page, limit = 10 } = req.query;
  try {
    const offset = (page - 1) * limit;

    const customerBooks = await Booking.findAndCountAll({
      where: {
        status: "Active",
      },
      include: [
        {
          model: User,
          as: "user",
          include: [
            {
              model: Customer,
              as: "customer",
            },
          ],
        },
      ],
      limit,
      offset,
    });

    const totalPage = Math.ceil(customerBooks.count / limit);

    console.log(customerBooks);

    res.status(200).json({
      is_success: true,
      data: customerBooks.rows,
      totalPage,
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserById,
  updateUserImage,
  updateUserData,
  addPhoneNumber,
  addAddress,
  changePassword,
  checkPassword,
  updateUserVerificationStatus,
  getCustomers,
};
