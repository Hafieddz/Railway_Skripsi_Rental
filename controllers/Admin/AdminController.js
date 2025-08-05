const { User, Admin, Auth, sequelize } = require("../../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const ApiError = require("../../lib/ApiError");

const getAdminList = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const offset = (page - 1) * 1;
    const adminList = await User.findAndCountAll({
      where: {
        role: "Admin",
      },
      include: [
        {
          model: Admin,
          as: "admin_data",
          attributes: {
            exclude: ["created_at", "updated_at", "user_id"],
          },
        },
        {
          model: Auth,
          as: "auths",
          attributes: {
            exclude: ["created_at", "updated_at", "password"],
          },
        },
      ],
      offset,
      limit,
      order: [["created_at", "DESC"]],
    });

    const totalPage = Math.ceil(adminList.count / limit);

    (adminList);

    res.status(200).json({
      is_success: true,
      data: {
        count: adminList.count,
        row: adminList.rows,
        totalPage,
      },
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const createAdmin = async (req, res, next) => {
  const { firstname, lastname, gender, email, password, status } = req.body;

  (req.body);

  try {
    const hashed_password = bcrypt.hashSync(password, 10);

    await sequelize.transaction(async (transaction) => {
      const auth = await Auth.create(
        {
          auth_id: uuidv4(),
          email,
          password: hashed_password,
        },
        { transaction }
      );
      const user = await User.create(
        {
          auth_id: auth.auth_id,
          user_id: uuidv4(),
          firstname: firstname,
          lastname: lastname ? lastname : null,
          role: "Admin",
          gender,
        },
        { transaction }
      );
      await Admin.create(
        {
          admin_id: uuidv4(),
          user_id: user.user_id,
          status: status,
        },
        { transaction }
      );
    });

    res.status(201).json({
      is_success: true,
      message: "Data admin berhasil dibuat!",
      status_code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAdmin = async (req, res, next) => {
  const { user_id } = req.params;
  const { email } = req.query;

  (user_id);

  try {
    await sequelize.transaction(async (transaction) => {
      // admin data
      const admin = await Admin.findOne(
        {
          where: {
            user_id,
          },
        },
        { transaction }
      );

      (admin);

      if (admin) {
        await admin.destroy({ transaction });
      } else {
        throw new ApiError(404, "Data admin tidak ditemukan");
      }
      const user = await User.findByPk(user_id, { transaction });
      if (user) {
        await user.destroy({ transaction });
      } else {
        throw new ApiError(404, "Data user tidak ditemukan");
      }

      const auth = await Auth.findOne(
        {
          where: {
            email,
          },
        },
        { transaction }
      );
      if (auth) {
        await auth.destroy({ transaction });
      } else {
        throw new ApiError(404, "Data auth tidak ditemukan");
      }
    });

    res.status(201).json({
      is_success: true,
      message: "Data admin berhasil dihapus!",
      status_code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const updateAdminStatus = async (req, res, next) => {
  const { admin_id } = req.params;
  const { status } = req.query;
  try {
    await Admin.update(
      {
        status,
      },
      {
        where: {
          admin_id,
        },
      }
    );
    res.status(201).json({
      is_success: true,
      message: "Data admin berhasil diupdate!",
      status_code: 201,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminList,
  createAdmin,
  deleteAdmin,
  updateAdminStatus,
};
