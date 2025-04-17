const { OTP, User, Customer, Auth, sequelize } = require("../models");
const bcrypt = require("bcrypt");
const {
  transporter,
  sender_email,
  htmlRegister,
} = require("../utils/mailSender");
const { v4: uuidv4 } = require("uuid");
const ApiError = require("../lib/ApiError");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");

const checkEmail = async (req, res, next) => {
  try {
    const { email, password, confirm_password } = req.body;

    const checkUser = await Auth.findOne({
      where: { email },
    });

    if (checkUser)
      throw new Error("Email sudah digunakan, silahkan gunakan email lain!");

    if (password.length < 8)
      throw new Error("Password minimal harus 8 karakter!");

    if (password !== confirm_password) throw new Error("Password tidak sama!");

    next();
  } catch (error) {
    res.status(400).json({
      is_success: false,
      message: error.message,
      status_code: 400,
    });
  }
};

const sendOtp = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const otp_code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires_at = new Date(Date.now() + 5 * 60 * 1000);
    const bcrypt_otp = await bcrypt.hash(otp_code, 10);

    const hashPassword = await bcrypt.hash(password, 10);

    const sendOtpToEmail = transporter.sendMail({
      from: sender_email,
      to: email,
      subject: "Kode OTP Register Rental C3 Collection",
      html: htmlRegister(otp_code),
    });

    const expireOtp = await OTP.update(
      {
        status: "Expired",
      },
      {
        where: {
          status: "Pending",
        },
      }
    );

    const createOtp = await OTP.create({
      email,
      hashed_password: hashPassword,
      otp_code: bcrypt_otp,
      expires_at,
    });

    res.status(201).json({
      is_success: true,
      message: `Kode OTP anda : ${otp_code}`,
      status_code: 201,
    });
  } catch (error) {
    res.status(400).json({
      is_success: false,
      message: error.message,
      status_code: 400,
    });
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { otp } = req.body;
    const { email, firstname, lastname, gender } = req.query;

    const checkValidOtp = await OTP.findOne({
      where: {
        email,
        status: "Pending",
      },
    });

    const isValid = await bcrypt.compare(otp, checkValidOtp.otp_code);

    console.log({ email, firstname, lastname, gender });

    if (!isValid)
      throw new Error("OTP yang anda masukkan salah, silahkan coba lagi!");

    console.log(gender);

    if (!["Male", "Female"].includes(gender)) {
      throw new Error("Registrasi tidak bisa diproses");
    }

    const auth_id = uuidv4();
    const user_id = uuidv4();

    // const createAuth = await Auth.create({
    //   auth_id,
    //   email,
    //   password: checkValidOtp.hashed_password,
    // });

    const createUser = await sequelize.transaction(async (t) => {
      const auth = await Auth.create(
        {
          auth_id,
          email,
          password: checkValidOtp.hashed_password,
        },
        { transaction: t }
      );

      const user = await User.create(
        {
          user_id,
          auth_id,
          gender,
          role: "Customer",
        },
        { transaction: t }
      );

      const customer = await Customer.create(
        {
          customer_id: uuidv4(),
          user_id,
          firstname,
          lastname,
        },
        { transaction: t }
      );
    });

    res.status(200).json({
      is_success: true,
      message: "OTP Route success!",
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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const auth = await Auth.findOne({
      where: {
        email,
      },
    });

    if (!auth)
      throw new ApiError(
        401,
        "User tidak ditemukan, silahkan cek ulang email dan password anda"
      );

    if (auth && bcrypt.compareSync(password, auth.password)) {
      const user = await User.findOne({
        where: {
          auth_id: auth.auth_id,
        },
      });

      const customer = await Customer.findOne({
        where: {
          user_id: user.user_id,
        },
      });

      const accessToken = jwt.sign(
        {
          user_id: user.user_id,
          email: auth.email,
          fullname: customer.fullname,
          lastname: customer.lastname,
          role: user.role,
          is_verified: user.is_verified,
          type: "Access",
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED,
        }
      );

      const refreshToken = jwt.sign(
        {
          user_id: user.user_id,
          email: auth.email,
          fullname: customer.fullname,
          lastname: customer.lastname,
          role: user.role,
          is_verified: user.is_verified,
          type: "Refresh",
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRED,
        }
      );
      res.status(200).json({
        is_success: true,
        message: {
          access_token: accessToken,
          refresh_token: refreshToken,
        },
        status_code: 200,
      });
    } else {
      throw new ApiError(
        401,
        "Password yang anda masukkan salah, silahkcan coba lagi"
      );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkEmail,
  sendOtp,
  verifyEmail,
  login,
};
