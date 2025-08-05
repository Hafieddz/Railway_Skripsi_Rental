"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notification.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user_data",
      });
      Notification.belongsTo(models.Booking, {
        foreignKey: "booking_id",
        as: "booking_notification",
      });
      Notification.belongsTo(models.Payment, {
        foreignKey: "payment_id",
        as: "payment_notification",
      });
    }
  }
  Notification.init(
    {
      notification_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      booking_id: {
        type: DataTypes.UUID,
      },
      payment_id: {
        type: DataTypes.UUID,
      },
      user_id: {
        type: DataTypes.UUID,
      },
      notification_details: {
        type: DataTypes.TEXT,
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
      modelName: "Notification",
      timestamps: false,
    }
  );
  return Notification;
};
