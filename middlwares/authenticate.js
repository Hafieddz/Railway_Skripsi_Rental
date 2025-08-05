const { User, Admin } = require("../models");

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

      ("Next Authenticate");
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
    ("Next Roles");

    next();
  };
};

const isAdminActive = async (req, res, next) => {
  const { user_id } = req.user;

  const admin_data = await Admin.findOne({
    where: {
      user_id,
    },
  });

  if (!admin_data) {
    throw new ApiError(404, "Data admin tidak ada...");
  }

  if (admin_data.status !== "Active") {
    throw new ApiError(
      401,
      "Status anda tidak aktif, silahkan minta akses ke pemilik usaha"
    );
  }
  next();
};

module.exports = {
  authenticate,
  authorizeRoles,
  isAdminActive,
};
