"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.hasOne(models.Payment, {
        foreignKey: "booking_id",
        as: "payment_data",
      });
      Booking.hasOne(models.ReturnRecord, {
        foreignKey: "return_id",
        as: "return_data",
      });
      Booking.hasMany(models.Notification, {
        foreignKey: "booking_id",
        as: "booking_notification",
      });
      Booking.belongsTo(models.Vehicle, {
        foreignKey: "vehicle_id",
        as: "vehicle_data",
      });
      Booking.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Booking.hasOne(models.Review, {
        foreignKey: "booking_id",
        as: "review_data",
      });
    }
  }
  Booking.init(
    {
      booking_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      vehicle_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      booking_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      return_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["Pending", "Paid", "Expired", "Active", "Completed"],
      },
      total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      payment_expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      expires_notified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      rental_duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      modelName: "Booking",
      timestamps: false,
    }
  );
  return Booking;
};
