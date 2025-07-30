const { User } = require("../models");

const jwt = require("jsonwebtoken");
const ApiError = require("../lib/ApiError");

const authenticate = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findByPk(decoded.user_id);

      next();
    } catch (error) {
      throw new ApiError(401, "Format Token Invalid / Masa Token Habis");
    }
  }
  if (!token) {
    throw new ApiError(401, "Token Tidak Ada");
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Anda Tidak Memiliki Akses!");
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorizeRoles,
};
