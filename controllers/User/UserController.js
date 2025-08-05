const { Auth, User, Admin, Customer } = require("../../models");
const bcrypt = require("bcrypt");

// url : /user/update-data
const updateUserData = async (req, res, next) => {
  const { user_id } = req.user;
  const { firstname, lastname, gender, address } = req.query;
  const updatedData = {};

  try {
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

    await User.update(updatedData, {
      where: {
        user_id,
      },
    });

    if (address !== "NO_ADDRESS") {
      await Customer.update(updatedData, {
        where: {
          user_id,
        },
      });
    }

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

    if (checkDuplicatePhoneNumber.length > 0) {
      throw new ApiError(
        401,
        "Nomor sudah digunakan, silahkan gunakan nomor lain..."
      );
    }

    if (customer.phone_number === null) {
      await Customer.update(
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
    await Customer.update(
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

// url : /user/check-password
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

// url : /user/change-password
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

    await Auth.update(
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

module.exports = {
  updateUserData,
  addAddress,
  addPhoneNumber,
  checkPassword,
  changePassword,
};
