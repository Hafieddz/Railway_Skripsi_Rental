const {
  OTP,
  User,
  Customer,
  Admin,
  Auth,
  sequelize,
  Token,
} = require("../models");
const bcrypt = require("bcrypt");
const {
  transporter,
  sender_email,
  htmlRegister,
  htmlForgotPassword,
  htmtInvalidEmail,
} = require("../utils/mailSender");
const { v4: uuidv4 } = require("uuid");
const ApiError = require("../lib/ApiError");
const {
  generateAdminToken,
  generateAccessToken,
  generateRefreshToken,
  generateAdminRefreshToken,
  generateForgotPasswordToken,
} = require("../utils/generateToken");
const jwt = require("jsonwebtoken");
const { where, Model } = require("sequelize");

const checkEmail = async (req, res, next) => {
  try {
    const { email, password, confirm_password } = req.body;

    const checkUser = await Auth.findOne({
      where: { email },
    });

    if (checkUser) {
      throw new ApiError(
        409,
        "Email sudah digunakan, silahkan gunakan email lain!"
      );
    }

    if (password.length < 8) {
      throw new ApiError(422, "Password minimal harus 8 karakter!");
    }

    if (password !== confirm_password) {
      throw new ApiError(422, "Password tidak sama!");
    }

    next();
  } catch (error) {
    return next(error);
  }
};

const sendOtp = async (req, res, next) => {
  try {
    const { email, password, firstname, lastname, gender } = req.body;

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
      otp_code: bcrypt_otp,
      expires_at,
      hashed_password: hashPassword,
      firstname,
      lastname,
      gender,
    });

    console.log("3333");

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
          gender: checkValidOtp.gender,
          role: "Customer",
        },
        { transaction: t }
      );

      const customer = await Customer.create(
        {
          customer_id: uuidv4(),
          user_id,
          firstname: checkValidOtp.firstname,
          lastname: checkValidOtp.lastname,
        },
        { transaction: t }
      );
      const deleteOtp = await OTP.destroy(
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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let accessToken;

    const auth = await Auth.findOne({
      where: {
        email,
      },
    });

    if (!auth)
      throw new ApiError(
        401,
        "Email atau password yang anda masukkan salah, silahkan coba lagi!"
      );

    if (auth && bcrypt.compareSync(password, auth.password)) {
      const user = await User.findOne({
        where: {
          auth_id: auth.auth_id,
        },
      });

      if (user.role === "Customer") {
        const customer = await Customer.findOne({
          where: {
            user_id: user.user_id,
          },
        });

        console.log(customer.firstname);

        // TODO : GENERATE TOKEN HERE
        accessToken = await generateAccessToken(
          user.user_id,
          email,
          customer.firstname,
          customer.lastname,
          user.role,
          customer.is_verified
        );
      } else {
        const admin = await Admin.findOne({
          where: {
            user_id: user.user_id,
          },
        });

        accessToken = await generateAdminToken(
          user.user_id,
          email,
          admin.firstname,
          admin.lastname,
          user.role
        );
      }
    } else {
      throw new ApiError(
        401,
        "Email atau password yang anda masukkan salah, silahkan coba lagi!"
      );
    }
    res.status(200).json({
      is_success: true,
      message: {
        access_token: accessToken,
      },
      status_code: 200,
    });
  } catch (err) {
    next(err);
  }
};

const requestForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const isValid = await Auth.findOne({
      where: {
        email,
      },
    });

    if (isValid) {
      const token = await generateForgotPasswordToken(email);
      const expires_at = new Date(Date.now() + 25 * 60 * 1000);
      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

      await Token.create({
        jti: payload.jti,
        email,
        status: "Pending",
        used_for: "reset-password",
        expires_at,
      });

      transporter.sendMail({
        from: sender_email,
        to: email,
        subject: "Link Ganti Password Akun C3 Rental",
        html: htmlForgotPassword(token),
      });

      res.status(200).json({
        is_success: true,
        message: "Silahkan periksa email anda untuk mengganti password",
        token,
        status_code: 200,
      });
    } else {
      transporter.sendMail({
        from: sender_email,
        to: email,
        subject: "Link Ganti Password Akun C3 Rental",
        html: htmtInvalidEmail,
      });
      throw new ApiError(401, "Email anda tidak terdaftar");
    }
  } catch (error) {
    next(error);
  }
};

const checkForgotPasswordToken = async (req, res, next) => {
  try {
    // CHECK TOKEN
    const { token } = req.query;

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const time = new Date().toISOString();

    const request = await Token.findOne({
      where: {
        jti: payload.jti,
      },
    });

    if (time > request.expires_at) {
      await Token.update(
        { status: "Expired" },
        {
          where: {
            status: "Pending",
            expires_at: {
              [Op.lt]: time,
            },
          },
        }
      );
      throw new ApiError(
        400,
        "Link telah kedaluwarsa, silahkan request akses lagi"
      );
    }

    res.status(200).json({
      is_success: true,
      message: "Token ada",
      data: {
        email: request.email,
        token,
      },
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const useForgotPasswordToken = async (req, res, next) => {
  const { password, confirm_password } = req.body;

  console.log(req.body);

  try {
    res.status(200).json({
      is_success: true,
      message: "Passowrd berhasil diganti",
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const checkUser = async (req, res, next) => {
  const { user_id } = req.user;

  console.log(req.user);

  const user = await User.findByPk(user_id, {
    include: [
      {
        model: Customer,
        as: "customer",
      },
      {
        model: Auth,
        as: "auths",
      },
      {
        model: Admin,
        as: "admin_data",
      },
    ],
  });

  console.log(user);

  if (!user) {
    throw new ApiError(404, "User tidak ditemukan, Sesi Invalid");
  }
  try {
    res.status(200).json({
      message: "Sesi Valid!",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkEmail,
  sendOtp,
  verifyEmail,
  login,
  requestForgotPassword,
  checkForgotPasswordToken,
  useForgotPasswordToken,
  checkUser,
};
