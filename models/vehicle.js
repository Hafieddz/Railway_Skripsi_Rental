"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vehicle.hasOne(models.Motorcycle, {
        foreignKey: "vehicle_id",
        as: "motorcycle_data",
      });
      Vehicle.hasOne(models.Car, {
        foreignKey: "vehicle_id",
        as: "car_data",
      });
      Vehicle.hasMany(models.Booking, {
        foreignKey: "vehicle_id",
        as: "booking_data",
      });
      Vehicle.hasMany(models.VehicleAvailability, {
        foreignKey: "vehicle_id",
        as: "vehicle_availability_data",
      });
    }
  }
  Vehicle.init(
    {
      vehicle_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      vehicle_type: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["Car", "Motorcycle"],
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      license_plate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      manufacture_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      condition_description: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      details: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price_per_day: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Vehicle",
      timestamps: false,
    }
  );
  return Vehicle;
};
