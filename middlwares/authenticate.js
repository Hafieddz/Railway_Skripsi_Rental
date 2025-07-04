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

// module.exports = async (req, res, next) => {
//   try {
//     const bearerToken = req.headers.authorization;

//     if (!bearerToken) throw new ApiError(401, "Token tidak ada!");

//     const token = bearerToken.split("Bearer ")[1];

//     let payload;

//     try {
//       payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     } catch (jwtError) {
//       if (jwtError instanceof jwt.TokenExpiredError) {
//         throw new ApiError(400, "Token Expired");
//       } else {
//         throw new ApiError(401, "Token Invalid");
//       }
//     }

//     const user = await User.findByPk(payload.user_id);

//     if (!user) {
//       throw new ApiError(404, "User tidak ditemukan");
//     }

//     req.user = user;
//     req.payload = payload;

//     next();
//   } catch (error) {
//     next(error);
//   }
// };
