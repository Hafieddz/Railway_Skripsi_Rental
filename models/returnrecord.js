"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReturnRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReturnRecord.belongsTo(models.Booking, {
        foreignKey: "return_id",
        as: "booking_data",
      });
    }
  }
  ReturnRecord.init(
    {
      return_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      booking_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Booking",
          key: "booking_id",
        },
      },
      return_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      late_days: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      late_fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW(),
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW(),
      },
    },
    {
      sequelize,
      modelName: "ReturnRecord",
      timestamps: false,
    }
  );
  return ReturnRecord;
};
