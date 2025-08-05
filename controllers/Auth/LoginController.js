const { Auth, User, Customer, Admin } = require("../../models");
const ApiError = require("../../lib/ApiError");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateAdminToken,
} = require("../../utils/generateToken");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let accessToken;

    ("MASUKK");

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
        accessToken = await generateAccessToken(
          user.user_id,
          email,
          user.firstname,
          user.lastname,
          user.role
        );
      } else {
        accessToken = await generateAdminToken(
          user.user_id,
          email,
          user.firstname,
          user.lastname,
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

module.exports = login;
