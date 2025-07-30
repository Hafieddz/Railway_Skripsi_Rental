"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Customer, {
        foreignKey: "user_id",
        as: "customer",
      });
      User.hasOne(models.Admin, {
        foreignKey: "user_id",
        as: "admin_data",
      });
      User.belongsTo(models.Auth, {
        foreignKey: "auth_id",
        as: "auths",
      });
      User.hasMany(models.Notification, {
        foreignKey: "user_id",
        as: "user_data",
      });
      User.hasMany(models.Booking, {
        foreignKey: "user_id",
        as: "booking",
      });
      User.hasMany(models.Review, {
        foreignKey: "user_id",
        as: "review_data",
      });
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      auth_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          key: "auth_id",
          model: "Auth",
        },
        onDelete: "CASCADE",
      },
      image_url: {
        type: DataTypes.STRING,
        defaultValue: "userDefault.jpg",
      },
      gender: {
        type: DataTypes.ENUM,
        values: ["Male", "Female"],
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        values: ["Super Admin", "Admin", "Customer"],
        defaultValue: "Customer",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
    }
  );
  return User;
};
