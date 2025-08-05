"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Car.belongsTo(models.Vehicle, {
        foreignKey: "vehicle_id",
        as: "vehicle_data",
      });
    }
  }
  Car.init(
    {
      car_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      vehicle_id: {
        type: DataTypes.UUID,
        unique: true,
      },
      transmission_type: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["Automatic", "Manual"],
      },
      type: {
        type: DataTypes.ENUM,
        values: ["Sedan", "MPV", "SUV"],
        allowNull: false,
      },
      fuel_type: {
        type: DataTypes.ENUM,
        values: [
          "Pertamax",
          "Pertalite",
          "Pertamax Turbo",
          "Dexlite",
          "Pertamina Dex",
        ],
        allowNull: false,
        defaultValue: "Pertamax",
      },
      baggage_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
      },
      features: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      passenger_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Car",
      timestamps: false,
    }
  );
  return Car;
};
