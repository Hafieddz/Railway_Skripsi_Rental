const ApiError = require("../lib/ApiError");

module.exports = async (req, res, next) => {
  try {
    if (req.user.role !== "Customer") {
      next();
    } else {
      throw new ApiError(401, "Akses tidak diterima!");
    }
  } catch (error) {
    next(error);
  }
};
