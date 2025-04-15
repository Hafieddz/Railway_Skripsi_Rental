const { where } = require("sequelize");
const { OTP, User, Customer, Auth } = require("../models");
const bcrypt = require("bcrypt");
const {
  transporter,
  sender_email,
  htmlRegister,
} = require("../utils/mailSender");

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
    const { email } = req.body;

    const otp_code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires_at = new Date(Date.now() + 5 * 60 * 1000);
    const bcrypt_otp = await bcrypt.hash(otp_code, 10);

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
      otp_code: bcrypt_otp,
      expires_at,
    });

    res.status(201).json({
      is_success: true,
      message: `Kode OTP anda : ${otp_code}`,
      status_code: 201,
    });

    next();
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
  } catch (error) {
    
  }
};

module.exports = {
  checkEmail,
  sendOtp,
  verifyEmail
};
