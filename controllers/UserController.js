const { where } = require("sequelize");
const { User, Customer, Auth } = require("../models");

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      include: [
        {
          model: Customer,
          as: "customer",
        },
        {
          model: Auth,
          as: "auths",
        },
      ],
    });

    res.status(200).json({
      is_success: true,
      message: "Data user berhasil di fetch",
      data: user,
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserImage = async (req, res, next) => {
  console.log(res.locals.userImgFilename);
  const { user_id } = req.user;
  try {
    const updatedUser = await User.update(
      {
        image_url: res.locals.userImgFilename,
      },
      {
        where: {
          user_id,
        },
      }
    );

    console.log(updatedUser);

    res.status(200).json({
      is_success: true,
      message: "Foto Profil berhasil di update",
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserById,
  updateUserImage,
};
