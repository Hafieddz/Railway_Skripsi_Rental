const ApiError = require("../lib/ApiError");
const { Auth, User, Admin, Customer, sequelize } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const getAdminList = async (req, res, next) => {
  try {
    const adminDatas = await User.findAll({
      where: {
        role: "Admin",
      },
      include: {
        model: Admin,
        as: "admin_data",
        attributes: ["firstname", "lastname"],
      },
      raw: true,
      nest: true,
    });

    res.status(200).json({
      is_success: true,
      admin_data: adminDatas,
      status_code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const registerNewAdmin = async (req, res, next) => {
  try {
    const { email, password, firstname, lastname, gender } = req.body;

    const hash_password = await bcrypt.hash(password, 10);

    await sequelize.transaction(async (t) => {
      const auth = await Auth.create(
        {
          auth_id: uuidv4(),
          email,
          password: hash_password,
        },
        { transaction: t }
      );

      const user = await User.create(
        {
          auth_id: auth.auth_id,
          user_id: uuidv4(),
          role: "Admin",
          gender,
        },
        { transaction: t }
      );

      const admin = await Admin.create(
        {
          user_id: user.user_id,
          admin_id: uuidv4(),
          firstname,
          lastname,
          status: "Active",
        },
        { transaction: t }
      );
    });

    res.status(201).json({
      is_success: true,
      message: "Admin created successfully",
      status_code: 201,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminList,
  registerNewAdmin,
};
