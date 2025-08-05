const { Auth, Token, User, Customer, Admin } = require("../models");
const bcrypt = require("bcrypt");
const {
  transporter,
  sender_email,
  htmlForgotPassword,
  htmtInvalidEmail,
} = require("../utils/mailSender");
const ApiError = require("../lib/ApiError");
const { generateForgotPasswordToken } = require("../utils/generateToken");
const jwt = require("jsonwebtoken");

//  url : /auth/me
const checkUser = async (req, res, next) => {
  const { user_id } = req.user;

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

  (req.body);

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

module.exports = {
  requestForgotPassword,
  checkForgotPasswordToken,
  useForgotPasswordToken,
  checkUser,
};
