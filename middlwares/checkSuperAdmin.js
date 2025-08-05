const ApiError = require("../lib/ApiError");

module.exports = async (req, res, next) => {
  try {
    (req.payload);

    if (req.user.role !== "Admin" && req.user.role !== "Customer") {
      next();
    } else {
      throw new ApiError(401, "Akses tidak diterima!");
    }
  } catch (error) {
    next(error);
  }
};
