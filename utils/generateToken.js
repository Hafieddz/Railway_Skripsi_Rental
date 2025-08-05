require("dotenv").config();
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const generateAccessToken = async (
  user_id,
  email,
  firstname,
  lastname,
  role,
) => {
  const token = jwt.sign(
    {
      user_id,
      email,
      firstname,
      lastname,
      role,
      type: "Access",
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED,
    }
  );

  return token;
};

const generateAdminToken = async (
  user_id,
  email,
  firstname,
  lastname,
  role
) => {
  const token = jwt.sign(
    {
      user_id,
      email,
      firstname,
      lastname,
      role,
      type: "Access",
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED,
    }
  );

  return token;
};

const generateForgotPasswordToken = async (email) => {
  (process.env.JWT_FORGOT_PASSWORD_TOKEN_EXPIRED);

  const token = jwt.sign(
    {
      email,
      jti: uuidv4(),
      used_for: "reset-password",
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_FORGOT_PASSWORD_TOKEN_EXPIRED,
    }
  );
  return token;
};

module.exports = {
  generateAccessToken,
  generateAdminToken,
  generateForgotPasswordToken,
};
