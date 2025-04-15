"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OTP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OTP.init(
    {
      otp_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      otp_code: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      expires_at: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["Used", "Pending", "Expired"],
        defaultValue: "Pending",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW(),
      },
    },
    {
      sequelize,
      modelName: "OTP",
      timestamps: false,
    }
  );
  return OTP;
};
