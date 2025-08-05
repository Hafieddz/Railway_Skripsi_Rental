"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.belongsTo(models.Booking, {
        foreignKey: "payment_id",
        as: "booking_data",
      });
      Payment.hasMany(models.Notification, {
        foreignKey: "payment_id",
        as: "payment_notification",
      });
    }
  }
  Payment.init(
    {
      payment_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      booking_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Booking",
          key: "booking_id",
        },
      },
      payment_status: {
        type: DataTypes.ENUM,
        values: ["Pending", "Paid", "Expired"],
        allowNull: false,
      },
      payment_token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payment_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      total_price: {
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
      modelName: "Payment",
      timestamps: false,
    }
  );
  return Payment;
};
