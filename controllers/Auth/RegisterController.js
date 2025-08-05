const { Auth, OTP, User, Customer, sequelize } = require("../../models");
const ApiError = require("../../lib/ApiError");
const bcrypt = require("bcrypt");
const {
  transporter,
  sender_email,
  htmlRegister,
} = require("../../utils/mailSender");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res, next) => {
  const { email, password, confirm_password } = req.body;
  try {
    const checkEmail = await Auth.findOne({
      where: {
        email,
      },
    });

    if (password !== confirm_password) {
      throw new ApiError(401, "Password tidak sama!");
    }

    if (checkEmail) {
      throw new ApiError(
        401,
        "Email sudah digunakan, silahkan gunakan email lain!"
      );
    }

    const otp_code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires_at = new Date(Date.now() + 5 * 60 * 1000);
    const bcrypt_otp = await bcrypt.hash(otp_code, 10);
    const hashPassword = await bcrypt.hash(password, 10);

    transporter.sendMail({
      from: sender_email,
      to: email,
      subject: "Kode OTP Register Rental C3 Collection",
      html: htmlRegister(otp_code),
    });

    await OTP.update(
      {
        status: "Expired",
      },
      {
        where: {
          status: "Pending",
        },
      }
    );

    await OTP.create({
      email,
      otp_code: bcrypt_otp,
      expires_at,
      hashed_password: hashPassword,
    });

    res.status(201).json({
      is_success: true,
      message: "Kode OTP Terkirim!",
      status_code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { otp, email } = req.body;

    const checkValidOtp = await OTP.findOne({
      where: {
        email,
        status: "Pending",
      },
    });

    const isValid = await bcrypt.compare(otp, checkValidOtp.otp_code);
    if (!isValid) {
      throw new ApiError(
        400,
        "OTP yang anda masukkan salah, silahkan coba lagi!"
      );
    }

    const auth_id = uuidv4();
    const user_id = uuidv4();

    const firstname = email.split("@")[0];

    await sequelize.transaction(async (t) => {
      await Auth.create(
        {
          auth_id,
          email,
          password: checkValidOtp.hashed_password,
        },
        { transaction: t }
      );

      await User.create(
        {
          user_id,
          auth_id,
          firstname,
          role: "Customer",
        },
        { transaction: t }
      );

      await Customer.create(
        {
          customer_id: uuidv4(),
          user_id,
        },
        { transaction: t }
      );
      await OTP.destroy(
        {
          where: {
            email,
          },
        },
        { transaction: t }
      );
    });

    res.status(200).json({
      is_success: true,
      message: "OTP Verified Successfully",
      status_code: 200,
    });
  } catch (error) {
    res.status(400).json({
      is_success: false,
      message: error.message,
      status_code: 400,
    });
  }
};

module.exports = {
  register,
  verifyEmail,
};
