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
        as: "customers",
      });
      User.belongsTo(models.Auth, {
        foreignKey: "auth_id",
        as: "auths",
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
      gender: {
        type: DataTypes.ENUM,
        values: ["Male", "Female"],
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        values: ["Admin", "Customer"],
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
